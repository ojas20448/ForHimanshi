import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import crypto from "crypto";
import { URL } from "url";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const services = [
  { id: "online-therapy", title: "1:1 Online Therapy", description: "Personalized therapy sessions via secure video call", duration: 60, price: 1000 },
  { id: "offline-therapy", title: "1:1 Offline Therapy", description: "In-person therapy sessions in Delhi/Noida", duration: 60, price: 1500 },
  { id: "nri-therapy", title: "1:1 Online Therapy (NRI)", description: "Tailored sessions for Non-Resident Indians", duration: 60, price: 1500 },
];

function getCashfreeClient(): Cashfree | null {
  const clientId = process.env.CASHFREE_CLIENT_ID?.trim();
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET?.trim();
  
  if (!clientId || !clientSecret) {
    console.error("Cashfree credentials missing");
    return null;
  }
  
  return new Cashfree(CFEnvironment.PRODUCTION, clientId, clientSecret);
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

app.get("/api/health", (req, res) => {
  const clientId = process.env.CASHFREE_CLIENT_ID?.trim();
  res.json({
    status: "ok",
    cashfree: {
      configured: !!clientId && !!process.env.CASHFREE_CLIENT_SECRET,
      clientIdPrefix: clientId?.substring(0, 12) || "not set"
    }
  });
});

app.get("/api/services", (req, res) => {
  res.json(services);
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

    const bookingToken = crypto.randomBytes(32).toString("hex");

    res.cookie("booking_token", bookingToken, {
      httpOnly: true,
      secure: true,
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

app.get("/api/booking/verify", (req: Request, res: Response) => {
  const token = req.query.token as string || req.cookies?.booking_token;
  
  if (!token) {
    return res.status(401).json({ valid: false, error: "No booking token provided" });
  }

  if (token.length === 64) {
    return res.json({ valid: true });
  }
  
  return res.status(401).json({ valid: false, error: "Invalid token" });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default serverless(app);
