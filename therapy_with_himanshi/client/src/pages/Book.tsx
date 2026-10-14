import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Check,
  Copy,
  Sparkles,
  Clock,
  IndianRupee,
  Calendar as CalendarIcon,
  ExternalLink,
  Loader2,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { initializeCashfree } from "@/lib/cashfree";
import { services, type ServiceType } from "@shared/services";
import upiQrCode from "@assets/upi_qr_code.png";

export default function Book() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<ServiceType>(
    services[0],
  );
  const [bookingStep, setBookingStep] = useState<
    "scheduling" | "payment" | "confirmed"
  >("scheduling");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [calendlyLink, setCalendlyLink] = useState(
    "https://calendly.com/manzartherapy/30min",
  );
  const calendlyContainerRef = useRef<HTMLDivElement>(null);
  const [calendarStatus, setCalendarStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  // Customer info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerFormErrors, setCustomerFormErrors] = useState<
    Record<string, string>
  >({});

  // UPI Payments state
  const [upiSubmitting, setUpiSubmitting] = useState(false);
  const [transactionRef, setTransactionRef] = useState("");
  const [screenshotBase64, setScreenshotBase64] = useState<string | null>(null);
  const [screenshotError, setScreenshotError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(window.location.search);
    const serviceId = searchParams.get("service");
    const orderId = searchParams.get("order_id");

    const foundService = services.find((s) => s.id === serviceId);
    if (foundService) {
      setSelectedService(foundService);
    }

    // Handle redirect back from Cashfree payment gateway
    if (orderId) {
      verifyPayment(orderId);
    }

    // Fetch dynamic config from health endpoint
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.calendly?.link) {
          setCalendlyLink(data.calendly.link);
        }
      })
      .catch((err) => console.warn("Failed to fetch Calendly link", err));
  }, []);

  // Listen to Calendly events
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const calendarFrame =
        calendlyContainerRef.current?.querySelector("iframe");
      if (
        e.origin === "https://calendly.com" &&
        e.source === calendarFrame?.contentWindow &&
        e.data?.event === "calendly.event_scheduled"
      ) {
        setBookingStep("payment");
        toast({
          title: "Slot Reserved!",
          description: "Please complete your payment to finalize the booking.",
        });
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [toast]);

  // Keep calendar loading and provider failures recoverable.
  useEffect(() => {
    if (bookingStep !== "scheduling") return;
    let active = true;
    let frame: HTMLIFrameElement | null = null;
    setCalendarStatus("loading");
    const fail = () => {
      if (active) setCalendarStatus("error");
    };
    const ready = () => {
      if (active) setCalendarStatus("ready");
    };
    const timeout = window.setTimeout(() => {
      if (active)
        setCalendarStatus((current) =>
          current === "ready" ? current : "error",
        );
    }, 12000);
    if (
      !document.querySelector(
        'link[href="https://assets.calendly.com/assets/external/widget.css"]',
      )
    ) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    const initWidget = () => {
      const parent = calendlyContainerRef.current;
      if (!active || !parent || !(window as any).Calendly) return;
      try {
        const url = new URL(
          calendlyLink.startsWith("https://")
            ? calendlyLink
            : "https://calendly.com/" + calendlyLink.replace(/^\/+/, ""),
        );
        if (url.origin !== "https://calendly.com")
          throw new Error("Invalid calendar URL");
        url.searchParams.set("primary_color", "2d4f35");
        url.searchParams.set("utm_source", "manzar_website");
        url.searchParams.set("utm_medium", "website_embed");
        parent.replaceChildren();
        (window as any).Calendly.initInlineWidget({
          url: url.toString(),
          parentElement: parent,
          prefill: { name: customerName.trim(), email: customerEmail.trim() },
        });
        frame = parent.querySelector("iframe");
        if (frame) {
          frame.title = "Choose a therapy session time with Himanshi";
          frame.addEventListener("load", ready);
        }
      } catch {
        fail();
      }
    };
    let script = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    if ((window as any).Calendly) initWidget();
    else {
      const isNew = !script;
      if (!script) {
        script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
      }
      script.addEventListener("load", initWidget);
      script.addEventListener("error", fail);
      if (isNew) document.body.appendChild(script);
    }
    return () => {
      active = false;
      window.clearTimeout(timeout);
      script?.removeEventListener("load", initWidget);
      script?.removeEventListener("error", fail);
      frame?.removeEventListener("load", ready);
    };
  }, [bookingStep, calendlyLink, customerName, customerEmail]);

  const verifyPayment = async (orderId: string) => {
    setPaymentProcessing(true);
    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingStep("confirmed");
        if (data.email) setCustomerEmail(data.email);
        if (data.phone) setCustomerPhone(data.phone);
        if (data.serviceName) {
          const found = services.find((s) => s.title === data.serviceName);
          if (found) setSelectedService(found);
        }
        toast({
          title: "Booking Confirmed!",
          description: "Payment verified. Your session is fully secured.",
        });
      } else {
        throw new Error(data.error || "Payment verification failed");
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Could not verify payment status.",
        variant: "destructive",
      });
      setBookingStep("payment"); // Keep them on payment step if verification fails
    } finally {
      setPaymentProcessing(false);
    }
  };

  const validateCustomerForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      errors.name = "Please enter your name";
    }
    if (
      !customerEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
    ) {
      errors.email = "Please enter a valid email";
    }
    if (
      !customerPhone.trim() ||
      !/^\+?[0-9\s\-]{10,15}$/.test(customerPhone.replace(/\s/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    setCustomerFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setScreenshotError("File size must be less than 2MB");
      return;
    }

    setScreenshotError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpiSubmit = async () => {
    if (!validateCustomerForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your details before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!screenshotBase64) {
      setScreenshotError("Please upload your payment screenshot");
      toast({
        title: "Screenshot Required",
        description:
          "Please upload the payment screenshot to verify transaction.",
        variant: "destructive",
      });
      return;
    }

    setUpiSubmitting(true);
    try {
      const response = await fetch("/api/payments/submit-upi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: customerPhone.trim().replace(/\s/g, ""),
          transactionRef: transactionRef.trim(),
          screenshot: screenshotBase64,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Failed to submit payment verification",
        );
      }

      setBookingStep("confirmed");
      toast({
        title: "Booking Submitted!",
        description:
          "Your payment verification is received. Your session is secured.",
      });
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpiSubmitting(false);
    }
  };

  const handleCashfreePayment = async () => {
    if (!validateCustomerForm()) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in your details before proceeding to payment.",
        variant: "destructive",
      });
      return;
    }

    setPaymentProcessing(true);

    try {
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim().replace(/\s/g, ""),
          customerEmail: customerEmail.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create payment order");
      }

      const data = await response.json();

      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      };

      const cf = await initializeCashfree();
      const result = await cf.checkout(checkoutOptions);

      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      }

      if (result.paymentDetails) {
        setBookingStep("confirmed");
        toast({
          title: "Payment Successful!",
          description: "Your session is fully secured.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPaymentProcessing(false);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText("himanshisahni001@okicici");
    toast({
      title: "Copied!",
      description: "UPI ID copied to clipboard",
    });
  };

  return (
    <div className="booking-page min-h-screen bg-background flex flex-col font-sans">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />

      <main
        id="main-content"
        className="flex-grow pt-28 pb-24 relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-6 hover:bg-transparent -ml-4"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Button>

            {/* Header & Step Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
                {bookingStep === "confirmed"
                  ? "Booking Confirmed"
                  : "Book Your Session"}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                {bookingStep === "confirmed"
                  ? "Your session is fully secured."
                  : bookingStep === "payment"
                    ? "Step 2 of 2: Fill in your details & complete payment to secure your slot."
                    : "Step 1 of 2: Choose a convenient date and time below."}
              </p>

              {/* Step indicator pills */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    bookingStep === "scheduling"
                      ? "bg-primary text-white shadow-md"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  }`}
                >
                  {bookingStep !== "scheduling" ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <span>1</span>
                  )}
                  <span>Choose a time</span>
                </div>
                <div className="w-6 h-0.5 bg-gray-300" />
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    bookingStep === "payment"
                      ? "bg-primary text-white shadow-md"
                      : bookingStep === "confirmed"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {bookingStep === "confirmed" ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <span>2</span>
                  )}
                  <span>Details & payment</span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {bookingStep === "confirmed" ? (
                /* STEP 3: CONFIRMED */
                <motion.div
                  key="step3-confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-3xl mx-auto"
                >
                  <Card className="glass-panel border-emerald-300/80 shadow-xl bg-emerald-50/50 overflow-hidden">
                    <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 border border-emerald-300 shadow-xs">
                          <Check className="w-7 h-7 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950">
                            Booking Confirmed!
                          </h3>
                          <p className="text-sm text-emerald-800 mt-1">
                            {customerName ? (
                              <strong>{customerName}</strong>
                            ) : (
                              "You are registered"
                            )}{" "}
                            ({customerEmail || "email confirmed"}). Your slot is
                            secured and calendar invites will be sent shortly.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="bg-white/80 px-4 py-2 rounded-xl border border-emerald-200 text-right">
                          <p className="text-xs text-muted-foreground">
                            Selected Session
                          </p>
                          <p className="text-sm font-bold text-primary">
                            {selectedService.title} (₹{selectedService.price})
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : bookingStep === "scheduling" ? (
                /* STEP 1: SCHEDULING */
                <motion.div
                  key="step1-scheduling"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid lg:grid-cols-3 gap-8"
                >
                  {/* Left: Service Info & Summary */}
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="glass-card border-white/60 sticky top-24">
                      <CardHeader>
                        <CardTitle className="font-heading text-2xl">
                          {selectedService.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {selectedService.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Clock size={18} className="text-primary/70" />
                            <span className="font-medium">
                              {selectedService.duration} mins
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-2xl font-bold text-primary">
                            <IndianRupee size={22} />
                            <span>{selectedService.price}</span>
                          </div>
                        </div>

                        {/* Service Selector */}
                        <div className="pt-4 border-t space-y-2">
                          <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                            Change Session Type
                          </h4>
                          {services.map((service) => (
                            <button
                              key={service.id}
                              aria-pressed={selectedService.id === service.id}
                              onClick={() => setSelectedService(service)}
                              className={`w-full text-left p-3 rounded-xl text-sm transition-all ${
                                selectedService.id === service.id
                                  ? "bg-primary/10 border border-primary/30 font-medium"
                                  : "hover:bg-white/50 border border-transparent"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span>{service.title}</span>
                                <span className="text-primary font-medium">
                                  ₹{service.price}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                            <Sparkles size={16} className="text-primary" />
                            How it works
                          </h4>
                          <ol className="space-y-2.5 text-sm text-muted-foreground">
                            <li className="flex gap-2">
                              <span className="font-semibold text-primary">
                                1.
                              </span>
                              <span>Select a convenient date & time</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-semibold text-primary">
                                2.
                              </span>
                              <span>Fill your contact info & pay</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-semibold text-primary">
                                3.
                              </span>
                              <span className="font-medium text-foreground">
                                Session is fully confirmed
                              </span>
                            </li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right: Calendly Embed */}
                  <div className="lg:col-span-2">
                    <Card className="glass-panel border-white/80 shadow-2xl overflow-hidden">
                      <CardHeader className="bg-white/60 border-b border-white/40">
                        <CardTitle className="font-heading text-2xl flex items-center gap-2">
                          <CalendarIcon size={24} className="text-primary" />
                          Select Date & Time Slot
                        </CardTitle>
                        <CardDescription>
                          Click a date and choose an available time slot that
                          works best for you.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 bg-white">
                        <div
                          className={
                            calendarStatus === "ready"
                              ? "calendar-stage is-ready"
                              : "calendar-stage"
                          }
                        >
                          {calendarStatus === "loading" && (
                            <div className="calendar-status" role="status">
                              <Loader2
                                size={24}
                                className="animate-spin"
                                aria-hidden="true"
                              />
                              <p>Loading available times…</p>
                              <span>You can also open the calendar below.</span>
                            </div>
                          )}
                          {calendarStatus === "error" && (
                            <div
                              className="calendar-status calendar-fallback"
                              role="status"
                            >
                              <CalendarIcon size={30} aria-hidden="true" />
                              <h3>Let’s find a time together.</h3>
                              <p>
                                The calendar couldn’t load here. Message
                                Himanshi for help choosing a time, or open the
                                calendar in a new tab.
                              </p>
                              <a
                                className="action-button"
                                href="https://wa.me/919599529780?text=Hi%20Himanshi%2C%20I%27d%20like%20help%20booking%20a%20therapy%20session."
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Ask for a time on WhatsApp{" "}
                                <ExternalLink size={16} aria-hidden="true" />
                              </a>
                            </div>
                          )}
                          <div
                            ref={calendlyContainerRef}
                            className={
                              calendarStatus === "ready"
                                ? "calendar-frame is-ready"
                                : "calendar-frame"
                            }
                            aria-hidden={calendarStatus !== "ready"}
                            inert={calendarStatus !== "ready"}
                          />
                        </div>
                        <div className="calendar-direct">
                          <a
                            href={
                              calendlyLink.startsWith("https://calendly.com/")
                                ? calendlyLink
                                : "https://calendly.com/manzartherapy/30min"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link"
                          >
                            Open calendar in a new tab{" "}
                            <ExternalLink size={15} aria-hidden="true" />
                          </a>
                          <p>
                            If you book in another tab, message Himanshi to
                            arrange payment and confirmation.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ) : (
                /* STEP 2: PAYMENT & DETAILS */
                <motion.div
                  key="step2-payment"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid lg:grid-cols-3 gap-8"
                >
                  {/* Left: Customer Form */}
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="glass-card border-white/60 shadow-xl sticky top-24">
                      <CardHeader className="bg-white/40 border-b border-white/20 pb-4">
                        <CardTitle className="font-heading text-xl flex items-center gap-2">
                          <User size={20} className="text-primary" />
                          Your Details
                        </CardTitle>
                        <CardDescription>
                          Required for payment verification and invoice
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                              Full Name
                            </label>
                            <div className="relative">
                              <User
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                placeholder="Your full name"
                                value={customerName}
                                onChange={(e) => {
                                  setCustomerName(e.target.value);
                                  setCustomerFormErrors((p) => ({
                                    ...p,
                                    name: "",
                                  }));
                                }}
                                className={`h-12 rounded-xl pl-10 bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all ${customerFormErrors.name ? "border-red-400" : ""}`}
                              />
                            </div>
                            {customerFormErrors.name && (
                              <p className="text-red-500 text-xs mt-1">
                                {customerFormErrors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                value={customerEmail}
                                onChange={(e) => {
                                  setCustomerEmail(e.target.value);
                                  setCustomerFormErrors((p) => ({
                                    ...p,
                                    email: "",
                                  }));
                                }}
                                className={`h-12 rounded-xl pl-10 bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all ${customerFormErrors.email ? "border-red-400" : ""}`}
                              />
                            </div>
                            {customerFormErrors.email && (
                              <p className="text-red-500 text-xs mt-1">
                                {customerFormErrors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground/80 mb-1.5 block">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              />
                              <Input
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={customerPhone}
                                onChange={(e) => {
                                  setCustomerPhone(e.target.value);
                                  setCustomerFormErrors((p) => ({
                                    ...p,
                                    phone: "",
                                  }));
                                }}
                                className={`h-12 rounded-xl pl-10 bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all ${customerFormErrors.phone ? "border-red-400" : ""}`}
                              />
                            </div>
                            {customerFormErrors.phone && (
                              <p className="text-red-500 text-xs mt-1">
                                {customerFormErrors.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right: Payment Options */}
                  <div className="lg:col-span-2">
                    <Card className="glass-panel border-white/60 shadow-xl">
                      <CardHeader className="bg-white/40 border-b border-white/20">
                        <CardTitle className="font-heading text-2xl flex items-center justify-between">
                          <span>2. Complete Payment</span>
                          <span className="text-lg font-bold text-primary">
                            ₹{selectedService.price}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          Choose your preferred payment method to secure your
                          slot
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-6">
                        <Tabs defaultValue="gateway" className="w-full">
                          <TabsList className="grid w-full grid-cols-2 p-1 bg-secondary/30 rounded-xl mb-6">
                            <TabsTrigger value="gateway" className="rounded-lg">
                              Online Payment (Cards/UPI/Wallets)
                            </TabsTrigger>
                            <TabsTrigger value="upi" className="rounded-lg">
                              Direct UPI QR
                            </TabsTrigger>
                          </TabsList>

                          {/* Cashfree Gateway Tab */}
                          <TabsContent
                            value="gateway"
                            className="space-y-6 mt-0"
                          >
                            <div className="text-center py-6">
                              <div className="w-14 h-14 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <IndianRupee className="w-7 h-7 text-primary" />
                              </div>
                              <h3 className="font-heading text-xl font-bold mb-1">
                                Instant Online Checkout
                              </h3>
                              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                                Instant automated verification. Your session
                                will be fully confirmed immediately.
                              </p>
                            </div>

                            <Button
                              className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                              onClick={handleCashfreePayment}
                              disabled={paymentProcessing}
                            >
                              {paymentProcessing ? (
                                <>
                                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                  Opening Gateway...
                                </>
                              ) : (
                                `Pay ₹${selectedService.price} & Confirm Booking`
                              )}
                            </Button>
                          </TabsContent>

                          {/* Direct UPI Tab */}
                          <TabsContent value="upi" className="space-y-6 mt-0">
                            <div className="text-center py-2">
                              <p className="text-base font-semibold mb-1">
                                Scan & Pay via any UPI App
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Transfer{" "}
                                <strong>₹{selectedService.price}</strong> to the
                                UPI ID or scan the QR below, then attach the
                                screenshot.
                              </p>
                            </div>

                            <div className="flex justify-center my-2">
                              <div className="bg-white p-3 rounded-2xl shadow-md border border-border/50">
                                <img
                                  src={upiQrCode}
                                  alt="UPI QR Code"
                                  className="w-36 h-36 object-contain"
                                />
                              </div>
                            </div>

                            <div className="bg-secondary/30 p-3 rounded-xl flex items-center justify-between border border-secondary">
                              <span className="font-mono text-foreground font-medium text-sm">
                                himanshisahni001@okicici
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="hover:bg-white h-8 w-8"
                                onClick={copyUpiId}
                              >
                                <Copy size={16} />
                              </Button>
                            </div>

                            {/* UPI Proof Submission Form */}
                            <div className="space-y-4 pt-2 border-t">
                              <h4 className="font-semibold text-sm text-foreground/80">
                                Submit Payment Proof
                              </h4>

                              <div>
                                <label className="text-xs font-medium text-foreground/70 mb-1 block">
                                  Transaction Reference / UTR Number (Optional)
                                </label>
                                <Input
                                  placeholder="Enter 12-digit UTR number"
                                  value={transactionRef}
                                  onChange={(e) =>
                                    setTransactionRef(e.target.value)
                                  }
                                  className="h-10 rounded-lg bg-white/50 border-gray-200 focus:bg-white"
                                />
                              </div>

                              <div>
                                <label className="text-xs font-medium text-foreground/70 mb-1 block">
                                  Upload Screenshot (Max 2MB)
                                </label>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="h-10 rounded-lg bg-white/50 border-gray-200 focus:bg-white py-1.5 cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                                {screenshotError && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {screenshotError}
                                  </p>
                                )}
                                {screenshotBase64 && (
                                  <div className="mt-2.5 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-center gap-3 animate-in fade-in duration-300">
                                    <img
                                      src={screenshotBase64}
                                      alt="Screenshot preview"
                                      className="w-12 h-12 object-cover rounded-lg border border-emerald-300 shadow-xs shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-emerald-900 font-semibold text-xs flex items-center gap-1">
                                        ✔ Screenshot attached
                                      </p>
                                      <p className="text-emerald-700 text-[11px] truncate">
                                        Ready to submit and confirm booking
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <Button
                                className="w-full h-12 text-base rounded-xl shadow-md mt-2"
                                onClick={handleUpiSubmit}
                                disabled={upiSubmitting}
                              >
                                {upiSubmitting ? (
                                  <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Submitting proof...
                                  </>
                                ) : (
                                  "Submit Proof & Confirm Booking"
                                )}
                              </Button>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
