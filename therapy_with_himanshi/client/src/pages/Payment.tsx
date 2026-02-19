import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { load } from "@cashfreepayments/cashfree-js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Copy, ExternalLink, Loader2, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import upiQrCode from "@assets/upi_qr_code.png";

// Initialize Cashfree SDK wrapper
let cashfree: any;
export const initializeCashfree = async () => {
  if (!cashfree) {
    cashfree = await load({
      mode: "production",
    });
  }
  return cashfree;
};

const services = [
  {
    id: "online-therapy",
    title: "1:1 Online Therapy",
    price: 1000,
    duration: "60 mins",
    description: "Secure video session from your personal space.",
  },
  {
    id: "offline-therapy",
    title: "1:1 Offline Therapy",
    price: 1500,
    duration: "60 mins",
    description: "In-person session in Delhi/Noida.",
  },
  {
    id: "nri-therapy",
    title: "1:1 Online Therapy (NRI)",
    price: 1500,
    duration: "60 mins",
    description: "Tailored for international time zones.",
  },
  {
    id: "gift-session",
    title: "Gift a Session",
    price: 1000,
    duration: "60 mins",
    description: "Gift mental wellness to a loved one.",
  },
];

export default function Payment() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState(services[0]);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "processing" | "success" | "failure">("idle");
  const [bookingStep, setBookingStep] = useState<"payment" | "scheduling">("payment");

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Parse query params
    const searchParams = new URLSearchParams(window.location.search);
    const serviceId = searchParams.get("service");
    const orderId = searchParams.get("order_id");

    // Select service if provided
    const foundService = services.find((s) => s.id === serviceId);
    if (foundService) {
      setSelectedService(foundService);
    }

    // Handle Redirect from Payment Gateway
    if (orderId) {
      verifyPayment(orderId);
    }

  }, []);

  const verifyPayment = async (orderId: string) => {
    setLoading(true);
    setOrderStatus("processing");
    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (data.success) {
        setOrderStatus("success");
        toast({
          title: "Payment Successful! 🎉",
          description: "Your session is confirmed. Please check your email.",
        });

        // Redirect to home after 2 seconds
        setTimeout(() => {
          setLocation("/");
        }, 2000);
      } else {
        throw new Error(data.error || "Payment verification failed");
      }
    } catch (error: any) {
      console.error("Verification Error:", error);
      setOrderStatus("failure");
      toast({
        title: "Verification Failed",
        description: error.message || "Could not verify payment status.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setOrderStatus("processing");

    try {
      console.log("Creating payment order for:", selectedService.id);
      // Create order
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          customerName: "Client", // In a real app, collect this from a form
          customerPhone: "9999999999", // In a real app, collect this
          customerEmail: "client@example.com", // In a real app, collect this
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Order creation failed:", data);
        throw new Error(data.error || "Failed to create order");
      }

      console.log("Order created successfully:", data.orderId);

      // Initialize payment
      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self", // Redirect to self to handle mobile/popup blocks better
      };

      console.log("Initializing Cashfree checkout...");
      const cf = await initializeCashfree();
      const result = await cf.checkout(checkoutOptions);
      
      if (result.error) {
        console.error("Cashfree checkout error:", result.error);
        setOrderStatus("failure");
        toast({
          title: "Payment Failed",
          description: result.error.message || "Something went wrong",
          variant: "destructive",
        });
        setLoading(false);
      }
      if (result.redirect) {
        console.log("Payment Redirect - waiting for callback");
      }
      return; // Don't setLoading(false) here as payment is in progress
    } catch (error: any) {
      console.error("Payment Error:", error);
      setOrderStatus("failure");
      toast({
        title: "Error",
        description: error.message || "Failed to initiate payment",
        variant: "destructive",
      });
      setLoading(false);
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
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Button
              variant="ghost"
              className="mb-8 hover:bg-transparent -ml-4"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Button>

            <div className="grid md:grid-cols-12 gap-12">
              {/* Left Column: Service Selection & Info */}
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Complete Booking</h1>
                  <p className="text-muted-foreground">Select your preferred session type and proceed to payment.</p>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        if (bookingStep !== "scheduling") setSelectedService(service);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedService.id === service.id
                        ? "bg-white border-primary shadow-md ring-1 ring-primary/20"
                        : "bg-white/50 border-transparent hover:bg-white hover:shadow-sm"
                        } ${bookingStep === "scheduling" ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-heading text-lg font-bold text-foreground">{service.title}</h3>
                        {selectedService.id === service.id && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                            <Check size={12} />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      <div className="flex items-center gap-4 text-xs font-medium">
                        <span className="flex items-center gap-1 text-primary"><Clock size={12} /> {service.duration}</span>
                        <span className="bg-secondary/50 px-2 py-0.5 rounded-full text-foreground/80">₹ {service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 flex gap-3">
                  <ShieldCheck size={20} className="shrink-0 text-blue-600" />
                  <p>Secure payment processing via Cashfree/Razorpay. Your transaction details are encrypted.</p>
                </div>
              </div>

              {/* Right Column: Payment/Booking Action */}
              <div className="md:col-span-7 md:col-start-6">
                <Card className="glass-panel border-white/60 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                  <CardHeader className="bg-white/40 border-b border-white/20 pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-heading text-2xl">
                          {bookingStep === "payment" ? "Payment Details" : "Schedule Session"}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                          {bookingStep === "payment"
                            ? `Total Amount: ₹${selectedService.price}`
                            : "Pick a time that works for you"}
                        </CardDescription>
                      </div>
                      {bookingStep === "payment" && (
                        <div className="px-4 py-2 bg-primary/10 rounded-lg">
                          <span className="font-bold text-primary text-xl">₹{selectedService.price}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 flex-grow relative">
                    {bookingStep === "payment" ? (
                      <Tabs defaultValue="upi" className="w-full h-full flex flex-col">
                        <div className="px-6 pt-6">
                          <TabsList className="grid w-full grid-cols-2 p-1 bg-secondary/30 rounded-xl">
                            <TabsTrigger value="upi" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Direct UPI</TabsTrigger>
                            <TabsTrigger value="gateway" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Online Gateway</TabsTrigger>
                          </TabsList>
                        </div>

                        <div className="flex-grow p-6">
                          <TabsContent value="upi" className="mt-0 space-y-6">
                            <div className="text-center py-8">
                              <div className="w-20 h-20 bg-white rounded-2xl mx-auto shadow-sm flex items-center justify-center mb-4 border border-border/50">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="w-12 opacity-80" />
                              </div>
                              <p className="text-lg font-medium text-foreground mb-2">Scan or Copy UPI ID</p>
                              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                Please make the payment of <strong>₹{selectedService.price}</strong> to the ID below.
                              </p>
                            </div>

                            <div className="flex justify-center mb-4">
                              <div className="bg-white p-4 rounded-2xl shadow-md border border-border/50">
                                <img src={upiQrCode} alt="UPI QR Code" className="w-48 h-48 object-contain" />
                              </div>
                            </div>

                            <div className="bg-secondary/30 p-4 rounded-xl flex items-center justify-between border border-secondary">
                              <span className="font-mono text-foreground font-medium">himanshisahni001@okicici</span>
                              <Button size="icon" variant="ghost" className="hover:bg-white" onClick={copyUpiId}>
                                <Copy size={18} />
                              </Button>
                            </div>

                            <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex gap-3">
                              <Sparkles size={18} className="shrink-0 text-yellow-600 mt-0.5" />
                              <p>After payment, please send a screenshot to <strong>manzartherapy@gmail.com</strong> or WhatsApp. I will confirm your slot manually.</p>
                            </div>
                          </TabsContent>

                          <TabsContent value="gateway" className="mt-0 space-y-6">
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                              <div className="p-4 bg-primary/5 rounded-full">
                                <ShieldCheck className="w-12 h-12 text-primary" />
                              </div>
                              <h3 className="font-heading text-xl font-bold">Secure Checkout</h3>
                              <p className="text-muted-foreground max-w-xs">
                                You will be redirected to proceed with payment securely.
                              </p>
                            </div>

                            <Button
                              className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20"
                              onClick={handlePayment}
                              disabled={loading || orderStatus === "processing"}
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                                </>
                              ) : (
                                `Pay ₹${selectedService.price} Securely`
                              )}
                            </Button>
                          </TabsContent>
                        </div>
                      </Tabs>
                    ) : (
                      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">Payment Successful!</h3>
                          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                            Your payment has been verified. You can now proceed to schedule your session on Cal.com.
                          </p>
                        </div>
                        <Button
                          size="lg"
                          className="w-full max-w-sm text-lg h-14 shadow-lg shadow-green-200"
                          onClick={() => {
                            // Fetch the secure link or use the public one if acceptable
                            fetch("/api/book/access")
                              .then(res => res.json())
                              .then(data => {
                                if (data.calLink) {
                                  window.location.href = data.calLink;
                                } else {
                                  toast({
                                    title: "Error",
                                    description: "Could not retrieve booking link.",
                                    variant: "destructive"
                                  });
                                }
                              })
                              .catch(err => {
                                console.error(err);
                                // Fallback if API fails
                                window.location.href = "https://cal.com/himanshi-sahni/therapy-sessions";
                              });
                          }}
                        >
                          Schedule Session <ExternalLink className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
