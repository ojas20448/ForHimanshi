import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, services } from "@shared/schema";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import crypto from "crypto";
import { URL } from "url";

function getCashfreeClient(): Cashfree | null {
  const clientId = process.env.CASHFREE_CLIENT_ID?.trim();
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET?.trim();
  
  if (!clientId || !clientSecret) {
    console.error("Cashfree credentials missing");
    return null;
  }
  
  return new Cashfree(CFEnvironment.PRODUCTION, clientId, clientSecret);
}

function generateBookingToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function resolveHttpsBaseUrl(req: Request): string | null {
  const rawBase =
    process.env.BASE_URL?.trim() ||
    (typeof req.headers.origin === "string" ? req.headers.origin.trim() : "");

  if (!rawBase) {
    return null;
  }

  try {
    const url = new URL(rawBase);
    if (url.protocol !== "https:") {
      url.protocol = "https:";
    }
    url.pathname = "";
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/services", async (req, res) => {
    res.json(services);
  });

  app.get("/api/health", async (req, res) => {
    const clientId = process.env.CASHFREE_CLIENT_ID?.trim();
    res.json({
      status: "ok",
      cashfree: {
        configured: !!clientId && !!process.env.CASHFREE_CLIENT_SECRET,
        clientIdPrefix: clientId?.substring(0, 12) || "not set"
      }
    });
  });

  app.post("/api/payments/create-order", async (req: Request, res: Response) => {
    try {
      const { serviceId, customerName, customerEmail, customerPhone } = req.body;

      const cashfree = getCashfreeClient();
      if (!cashfree) {
        return res.status(500).json({ error: "Payment gateway not configured" });
      }

      const service = services.find((s) => s.id === serviceId);
      if (!service) {
        return res.status(400).json({ error: "Invalid service selected" });
      }

      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const baseUrl = resolveHttpsBaseUrl(req);
      if (!baseUrl) {
        return res.status(400).json({ error: "Missing BASE_URL or Origin to build return URL" });
      }
      
      const orderRequest = {
        order_amount: service.price,
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_phone: customerPhone || "9999999999",
          customer_name: customerName || "Customer",
          customer_email: customerEmail || "customer@example.com"
        },
        order_meta: {
          return_url: `${baseUrl}/book?order_id={order_id}`
        },
        order_note: service.title
      };

      const response = await cashfree.PGCreateOrder(orderRequest);
      
      await storage.createPayment({
        razorpayOrderId: orderId,
        amount: service.price,
        serviceName: service.title,
        email: customerEmail || null,
        phone: customerPhone || null,
        status: "created",
      });

      res.json({
        orderId: orderId,
        paymentSessionId: response.data.payment_session_id,
        amount: service.price,
        currency: "INR",
        serviceName: service.title,
        serviceDuration: service.duration,
      });
    } catch (error: any) {
      console.error("Error creating order:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to create payment order";
      res.status(500).json({ error: errorMessage });
    }
  });

  app.post("/api/payments/verify", async (req: Request, res: Response) => {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: "Missing order ID" });
      }

      const cashfree = getCashfreeClient();
      if (!cashfree) {
        return res.status(500).json({ error: "Payment gateway not configured" });
      }

      const response = await cashfree.PGOrderFetchPayments(orderId);
      const payments = response.data;
      
      const successfulPayment = payments?.find(
        (p: any) => p.payment_status === "SUCCESS"
      );

      if (!successfulPayment) {
        return res.status(400).json({ error: "Payment not successful" });
      }

      const payment = await storage.getPaymentByOrderId(orderId);
      if (payment) {
        await storage.updatePayment(orderId, {
          razorpayPaymentId: successfulPayment.cf_payment_id?.toString(),
          status: "paid",
        });
      }

      const bookingToken = generateBookingToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      if (payment) {
        await storage.createBookingToken({
          paymentId: payment.id,
          token: bookingToken,
          expiresAt,
        });
      }

      res.cookie("booking_token", bookingToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        bookingToken,
        message: "Payment verified successfully",
      });
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  });

  app.get("/api/book/access", async (req: Request, res: Response) => {
    try {
      const token = req.cookies?.booking_token || req.query.token;

      if (!token) {
        return res.status(401).json({ 
          authorized: false, 
          error: "No booking token provided. Please complete payment first." 
        });
      }

      const bookingToken = await storage.getBookingToken(token);

      if (!bookingToken) {
        return res.status(401).json({ 
          authorized: false, 
          error: "Invalid or expired booking token. Please complete payment first." 
        });
      }

      res.json({
        authorized: true,
        calLink: "https://cal.com/himanshi-sahni/therapy-sessions?embed=true&theme=light",
      });
    } catch (error: any) {
      console.error("Error checking booking access:", error);
      res.status(500).json({ error: "Failed to check booking access" });
    }
  });

  app.post("/api/book/consume", async (req: Request, res: Response) => {
    try {
      const token = req.cookies?.booking_token || req.body.token;

      if (!token) {
        return res.status(401).json({ error: "No booking token provided" });
      }

      const consumedToken = await storage.consumeBookingToken(token);

      if (!consumedToken) {
        return res.status(400).json({ error: "Token already used or expired" });
      }

      res.clearCookie("booking_token");
      res.json({ success: true, message: "Booking token consumed" });
    } catch (error: any) {
      console.error("Error consuming token:", error);
      res.status(500).json({ error: "Failed to consume token" });
    }
  });

  return httpServer;
}
