import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Copy, Sparkles, Clock, IndianRupee, Calendar as CalendarIcon, ExternalLink, Loader2, User, Mail, Phone, Lock, CheckCircle2 } from "lucide-react";
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
  const [selectedService, setSelectedService] = useState<ServiceType>(services[0]);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [calendlyLink, setCalendlyLink] = useState("https://calendly.com/manzartherapy/30min");
  const calendlyContainerRef = useRef<HTMLDivElement>(null);

  // Customer info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerFormErrors, setCustomerFormErrors] = useState<Record<string, string>>({});

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

  // Initialize Calendly inline widget when payment is completed / calendar unlocked
  useEffect(() => {
    if (!bookingSubmitted) return;

    // Inject stylesheet if needed
    if (!document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const initWidget = () => {
      if (calendlyContainerRef.current && (window as any).Calendly) {
        calendlyContainerRef.current.innerHTML = "";

        let url = calendlyLink.trim();
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = `https://calendly.com/${url.replace(/^\/+/, "")}`;
        }

        try {
          const urlObj = new URL(url);
          urlObj.searchParams.set("primary_color", "2f5730");
          urlObj.searchParams.set("hide_gdpr_banner", "1");
          urlObj.searchParams.set("utm_source", "manzar_website");
          urlObj.searchParams.set("utm_medium", "website_embed_gated");
          urlObj.searchParams.set("utm_campaign", "paid_booking");

          if (customerName.trim()) {
            urlObj.searchParams.set("name", customerName.trim());
          }
          if (customerEmail.trim()) {
            urlObj.searchParams.set("email", customerEmail.trim());
          }
          if (customerPhone.trim()) {
            urlObj.searchParams.set("a1", customerPhone.trim());
          }

          (window as any).Calendly.initInlineWidget({
            url: urlObj.toString(),
            parentElement: calendlyContainerRef.current,
            prefill: {
              name: customerName.trim(),
              email: customerEmail.trim(),
            },
            utm: {
              utmSource: "manzar_website",
              utmMedium: "website_embed_gated",
              utmCampaign: "paid_booking",
            },
          });
        } catch {
          (window as any).Calendly.initInlineWidget({
            url: url,
            parentElement: calendlyContainerRef.current,
            prefill: {
              name: customerName.trim(),
              email: customerEmail.trim(),
            },
            utm: {
              utmSource: "manzar_website",
              utmMedium: "website_embed_gated",
              utmCampaign: "paid_booking",
            },
          });
        }
      }
    };

    if ((window as any).Calendly) {
      initWidget();
    } else {
      let script = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener("load", initWidget);
      return () => {
        script.removeEventListener("load", initWidget);
      };
    }
  }, [bookingSubmitted, calendlyLink, customerName, customerEmail, customerPhone]);

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
        setBookingSubmitted(true);
        if (data.email) setCustomerEmail(data.email);
        if (data.phone) setCustomerPhone(data.phone);
        if (data.serviceName) {
          const found = services.find((s) => s.title === data.serviceName);
          if (found) setSelectedService(found);
        }
        toast({
          title: "Payment Confirmed!",
          description: "Payment verified. Please pick your date and time slot below.",
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
    } finally {
      setPaymentProcessing(false);
    }
  };

  const validateCustomerForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      errors.name = "Please enter your name";
    }
    if (!customerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      errors.email = "Please enter a valid email";
    }
    if (!customerPhone.trim() || !/^\+?[0-9\s\-]{10,15}$/.test(customerPhone.replace(/\s/g, ""))) {
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
        description: "Please upload the payment screenshot to verify transaction.",
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
        throw new Error(errorData.error || "Failed to submit payment verification");
      }

      setBookingSubmitted(true);
      toast({
        title: "Verification Submitted!",
        description: "Your payment verification is received and will be checked shortly.",
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
        description: "Please fill in your details before proceeding to payment.",
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
        setBookingSubmitted(true);
        toast({
          title: "Payment Successful!",
          description: "Your payment is confirmed.",
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

  // Cal.com setup

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-24 relative overflow-hidden">
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
                {bookingSubmitted ? "Pick Your Time Slot" : "Book Your Session"}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                {bookingSubmitted
                  ? "Your session is confirmed. Choose a convenient date and time below."
                  : "Step 1 of 2: Fill in your details & complete payment to unlock the scheduling calendar."}
              </p>

              {/* Step indicator pills */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    bookingSubmitted
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-primary text-white shadow-md"
                  }`}
                >
                  {bookingSubmitted ? <CheckCircle2 size={14} /> : <span>1</span>}
                  <span>1. Details & Payment</span>
                </div>
                <div className="w-6 h-0.5 bg-gray-300" />
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    bookingSubmitted
                      ? "bg-primary text-white shadow-md animate-pulse"
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                  }`}
                >
                  {bookingSubmitted ? <CalendarIcon size={14} /> : <Lock size={13} />}
                  <span>2. Schedule Time</span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {/* STEP 2: CALENDAR UNLOCKED (AFTER PAYMENT) */}
              {bookingSubmitted ? (
                <motion.div
                  key="step2-calendar"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Success Confirmation Card */}
                  <Card className="glass-panel border-emerald-300/80 shadow-xl bg-emerald-50/50 overflow-hidden">
                    <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 border border-emerald-300 shadow-xs">
                          <Check className="w-7 h-7 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl sm:text-2xl font-bold text-emerald-950">
                            Payment Confirmed!
                          </h3>
                          <p className="text-sm text-emerald-800 mt-1">
                            {customerName ? <strong>{customerName}</strong> : "You are registered"} ({customerEmail || "email confirmed"}).
                            {" "}Please select your date & time slot below.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="bg-white/80 px-4 py-2 rounded-xl border border-emerald-200 text-right">
                          <p className="text-xs text-muted-foreground">Selected Session</p>
                          <p className="text-sm font-bold text-primary">{selectedService.title} (₹{selectedService.price})</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Calendly Inline Embed */}
                  <Card className="glass-panel border-white/80 shadow-2xl overflow-hidden">
                    <CardHeader className="bg-white/60 border-b border-white/40">
                      <CardTitle className="font-heading text-2xl flex items-center gap-2">
                        <CalendarIcon size={24} className="text-primary" />
                        Select Date & Time Slot
                      </CardTitle>
                      <CardDescription>
                        Click a date and choose an available time slot that works best for you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 bg-white">
                      <div className="w-full relative min-h-[650px] md:min-h-[700px] flex items-center justify-center">
                        <div
                          ref={calendlyContainerRef}
                          className="w-full h-full min-h-[650px] md:min-h-[700px]"
                          style={{ minWidth: "320px", height: "700px" }}
                        />
                      </div>

                      {/* Fallback button if iframe fails */}
                      <div className="p-4 text-center border-t border-white/20 bg-gray-50/60">
                        <p className="text-sm text-gray-600 mb-2">Can't see the calendar?</p>
                        <a
                          href={`${calendlyLink.startsWith("http") ? calendlyLink : `https://calendly.com/${calendlyLink}`}${calendlyLink.includes("?") ? "&" : "?"}name=${encodeURIComponent(customerName)}&email=${encodeURIComponent(customerEmail)}&utm_source=manzar_website&utm_medium=website_button_gated`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-primary font-medium hover:underline bg-white px-5 py-2.5 rounded-full shadow-xs border border-primary/20"
                        >
                          Open Booking Page Directly <ExternalLink size={16} />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                /* STEP 1: PAYMENT & CLIENT DETAILS */
                <motion.div
                  key="step1-payment"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid lg:grid-cols-3 gap-8"
                >
                  {/* Left: Service Info & Summary */}
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="glass-card border-white/60 sticky top-24">
                      <CardHeader>
                        <CardTitle className="font-heading text-2xl">{selectedService.title}</CardTitle>
                        <CardDescription className="text-base">{selectedService.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Clock size={18} className="text-primary/70" />
                            <span className="font-medium">{selectedService.duration} mins</span>
                          </div>
                          <div className="flex items-center gap-3 text-2xl font-bold text-primary">
                            <IndianRupee size={22} />
                            <span>{selectedService.price}</span>
                          </div>
                        </div>

                        {/* Service Selector */}
                        <div className="pt-4 border-t space-y-2">
                          <h4 className="font-semibold text-sm text-muted-foreground mb-3">Change Session Type</h4>
                          {services.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => setSelectedService(service)}
                              className={`w-full text-left p-3 rounded-xl text-sm transition-all ${
                                selectedService.id === service.id
                                  ? "bg-primary/10 border border-primary/30 font-medium"
                                  : "hover:bg-white/50 border border-transparent"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span>{service.title}</span>
                                <span className="text-primary font-medium">₹{service.price}</span>
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
                              <span className="font-semibold text-primary">1.</span>
                              <span>Fill your contact info</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-semibold text-primary">2.</span>
                              <span>Complete payment (Cashfree or UPI)</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="font-semibold text-primary">3.</span>
                              <span className="font-medium text-foreground">Scheduling calendar unlocks instantly</span>
                            </li>
                          </ol>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right: Client Details Form + Payment Options */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Customer Info Section */}
                    <Card className="glass-panel border-white/60 shadow-xl">
                      <CardHeader className="bg-white/40 border-b border-white/20">
                        <CardTitle className="font-heading text-2xl flex items-center gap-2">
                          <User size={24} className="text-primary" />
                          1. Your Information
                        </CardTitle>
                        <CardDescription>Enter your contact info for the session and booking confirmation</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="text-sm font-medium text-foreground/80 mb-1.5 block">Full Name</label>
                            <div className="relative">
                              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                placeholder="Your full name"
                                value={customerName}
                                onChange={(e) => { setCustomerName(e.target.value); setCustomerFormErrors((p) => ({ ...p, name: "" })); }}
                                className={`h-12 rounded-xl pl-10 bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all ${customerFormErrors.name ? "border-red-400" : ""}`}
                              />
                            </div>
                            {customerFormErrors.name && <p className="text-red-500 text-xs mt-1">{customerFormErrors.name}</p>}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground/80 mb-1.5 block">Email Address</label>
                            <div className="relative">
                              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                value={customerEmail}
                                onChange={(e) => { setCustomerEmail(e.target.value); setCustomerFormErrors((p) => ({ ...p, email: "" })); }}
                                className={`h-12 rounded-xl pl-10 bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all ${customerFormErrors.email ? "border-red-400" : ""}`}
                              />
                            </div>
                            {customerFormErrors.email && <p className="text-red-500 text-xs mt-1">{customerFormErrors.email}</p>}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground/80 mb-1.5 block">Phone Number</label>
                            <div className="relative">
                              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={customerPhone}
                                onChange={(e) => { setCustomerPhone(e.target.value); setCustomerFormErrors((p) => ({ ...p, phone: "" })); }}
                                className={`h-12 rounded-xl pl-10 bg-white/50 border-gray-200 focus:border-primary/50 focus:bg-white transition-all ${customerFormErrors.phone ? "border-red-400" : ""}`}
                              />
                            </div>
                            {customerFormErrors.phone && <p className="text-red-500 text-xs mt-1">{customerFormErrors.phone}</p>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment Options Section */}
                    <Card className="glass-panel border-white/60 shadow-xl">
                      <CardHeader className="bg-white/40 border-b border-white/20">
                        <CardTitle className="font-heading text-2xl flex items-center justify-between">
                          <span>2. Complete Payment</span>
                          <span className="text-lg font-bold text-primary">₹{selectedService.price}</span>
                        </CardTitle>
                        <CardDescription>
                          Choose your preferred payment method to proceed to the calendar
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-6">
                        <Tabs defaultValue="gateway" className="w-full">
                          <TabsList className="grid w-full grid-cols-2 p-1 bg-secondary/30 rounded-xl mb-6">
                            <TabsTrigger value="gateway" className="rounded-lg">Online Payment (Cards/UPI/Wallets)</TabsTrigger>
                            <TabsTrigger value="upi" className="rounded-lg">Direct UPI QR</TabsTrigger>
                          </TabsList>

                          {/* Cashfree Gateway Tab */}
                          <TabsContent value="gateway" className="space-y-6 mt-0">
                            <div className="text-center py-6">
                              <div className="w-14 h-14 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                <IndianRupee className="w-7 h-7 text-primary" />
                              </div>
                              <h3 className="font-heading text-xl font-bold mb-1">Instant Online Checkout</h3>
                              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                                Instant automated verification. The scheduling calendar will unlock immediately after payment.
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
                                `Pay ₹${selectedService.price} & Unlock Calendar`
                              )}
                            </Button>
                          </TabsContent>

                          {/* Direct UPI Tab */}
                          <TabsContent value="upi" className="space-y-6 mt-0">
                            <div className="text-center py-2">
                              <p className="text-base font-semibold mb-1">Scan & Pay via any UPI App</p>
                              <p className="text-muted-foreground text-xs">
                                Transfer <strong>₹{selectedService.price}</strong> to the UPI ID or scan the QR below, then attach the screenshot.
                              </p>
                            </div>

                            <div className="flex justify-center my-2">
                              <div className="bg-white p-3 rounded-2xl shadow-md border border-border/50">
                                <img src={upiQrCode} alt="UPI QR Code" className="w-36 h-36 object-contain" />
                              </div>
                            </div>

                            <div className="bg-secondary/30 p-3 rounded-xl flex items-center justify-between border border-secondary">
                              <span className="font-mono text-foreground font-medium text-sm">himanshisahni001@okicici</span>
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
                              <h4 className="font-semibold text-sm text-foreground/80">Submit Payment Proof</h4>
                              
                              <div>
                                <label className="text-xs font-medium text-foreground/70 mb-1 block">Transaction Reference / UTR Number (Optional)</label>
                                <Input
                                  placeholder="Enter 12-digit UTR number"
                                  value={transactionRef}
                                  onChange={(e) => setTransactionRef(e.target.value)}
                                  className="h-10 rounded-lg bg-white/50 border-gray-200 focus:bg-white"
                                />
                              </div>

                              <div>
                                <label className="text-xs font-medium text-foreground/70 mb-1 block">Upload Screenshot (Max 2MB)</label>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  className="h-10 rounded-lg bg-white/50 border-gray-200 focus:bg-white py-1.5 cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                                {screenshotError && <p className="text-red-500 text-xs mt-1">{screenshotError}</p>}
                                {screenshotBase64 && (
                                  <div className="mt-2.5 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-center gap-3 animate-in fade-in duration-300">
                                    <img src={screenshotBase64} alt="Screenshot preview" className="w-12 h-12 object-cover rounded-lg border border-emerald-300 shadow-xs shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-emerald-900 font-semibold text-xs flex items-center gap-1">
                                        ✓ Screenshot attached
                                      </p>
                                      <p className="text-emerald-700 text-[11px] truncate">Ready to submit and unlock calendar</p>
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
                                  "Submit Proof & Unlock Calendar"
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
