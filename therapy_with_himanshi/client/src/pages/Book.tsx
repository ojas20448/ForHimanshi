import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Copy, Sparkles, Clock, IndianRupee, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { initializeCashfree } from "./Payment";

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

export default function Book() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState(services[0]);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const searchParams = new URLSearchParams(window.location.search);
    const serviceId = searchParams.get("service");
    const foundService = services.find((s) => s.id === serviceId);
    if (foundService) {
      setSelectedService(foundService);
    }

    // Initialize Cal.com embed
    (async function () {
      try {
        const cal = await import("@calcom/embed-react") as any;
        cal.default("init", { debug: false });

        // Listen for booking submission
        cal.default("on", {
          action: "bookingSuccessful",
          callback: (e: any) => {
            console.log("Booking submitted:", e.detail);
            setBookingSubmitted(true);
            setTimeout(() => {
              const paymentSection = document.getElementById("payment-section");
              if (paymentSection) {
                paymentSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 300);
            toast({
              title: "Time Slot Reserved! ✅",
              description: "Please complete payment below to confirm your booking.",
            });
          },
        });
      } catch (error) {
        console.error("Cal.com initialization error:", error);
      }
    })();
  }, [toast]);

  const handleCashfreePayment = async () => {
    setPaymentProcessing(true);

    try {
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          customerName: "Client",
          customerPhone: "9999999999",
          customerEmail: "client@example.com",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment order");
      }

      const data = await response.json();

      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_modal",
      };

      const cf = await initializeCashfree();
      const result = await cf.checkout(checkoutOptions);

      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      }

      if (result.paymentDetails) {
        toast({
          title: "Payment Successful! 🎉",
          description: "Your session is confirmed. Check your email for details.",
        });

        // Redirect to home after 2 seconds
        setTimeout(() => {
          setLocation("/");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
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
    navigator.clipboard.writeText("himanshisahni@ybl");
    toast({
      title: "Copied! 📋",
      description: "UPI ID copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-28 pb-24 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-6 hover:bg-transparent -ml-4"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Button>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
                Book Your Session
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Select your preferred time slot, then complete payment to confirm
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Service Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1 space-y-6"
              >
                <Card className="glass-card border-white/60 sticky top-24">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">{selectedService.title}</CardTitle>
                    <CardDescription className="text-base">{selectedService.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock size={18} className="text-primary/70" />
                        <span className="font-medium">{selectedService.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-2xl font-bold text-primary">
                        <IndianRupee size={22} />
                        <span>{selectedService.price}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CalendarIcon size={16} />
                        How it works
                      </h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="font-semibold text-primary">1.</span>
                          <span>Pick your time slot from the calendar</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold text-primary">2.</span>
                          <span>Fill in your details</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold text-primary">3.</span>
                          <span>Complete payment to confirm</span>
                        </li>
                      </ol>
                    </div>

                    <AnimatePresence>
                      {bookingSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="font-semibold text-green-800">Slot Reserved!</p>
                            <p className="text-green-700 mt-1">Complete payment below to confirm</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right: Calendar + Payment */}
              <div className="lg:col-span-2 space-y-8">
                {/* Calendar Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass-panel border-white/60 shadow-xl overflow-hidden">
                    <CardHeader className="bg-white/40 border-b border-white/20">
                      <CardTitle className="font-heading text-2xl flex items-center gap-2">
                        <CalendarIcon size={24} className="text-primary" />
                        Select Your Time Slot
                      </CardTitle>
                      <CardDescription>Choose a convenient time for your therapy session</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full min-h-[650px] bg-white/20">
                        <iframe
                          src="https://cal.com/himanshi-sahni/therapy-sessions?embed=true&theme=light"
                          width="100%"
                          height="650"
                          frameBorder="0"
                          title="Book Session"
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Payment Section */}
                <motion.div
                  id="payment-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: bookingSubmitted ? 1 : 0.5, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className={`glass-panel border-white/60 shadow-xl ${!bookingSubmitted && 'pointer-events-none'}`}>
                    <CardHeader className="bg-white/40 border-b border-white/20">
                      <CardTitle className="font-heading text-2xl">
                        {bookingSubmitted ? "Complete Payment" : "Payment Options"}
                      </CardTitle>
                      <CardDescription>
                        {bookingSubmitted
                          ? "Choose your preferred payment method to confirm your booking"
                          : "Available after you select a time slot above"}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6">
                      <Tabs defaultValue="gateway" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 p-1 bg-secondary/30 rounded-xl mb-6">
                          <TabsTrigger value="gateway" className="rounded-lg">Cashfree Gateway</TabsTrigger>
                          <TabsTrigger value="upi" className="rounded-lg">Direct UPI</TabsTrigger>
                        </TabsList>

                        <TabsContent value="gateway" className="space-y-6 mt-0">
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <IndianRupee className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-2">Secure Online Payment</h3>
                            <p className="text-muted-foreground">
                              Pay safely using cards, UPI, wallets & more
                            </p>
                          </div>

                          <Button
                            className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                            onClick={handleCashfreePayment}
                            disabled={!bookingSubmitted || paymentProcessing}
                          >
                            {paymentProcessing ? (
                              <>
                                <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                Processing...
                              </>
                            ) : (
                              `Pay ₹${selectedService.price} Securely`
                            )}
                          </Button>
                        </TabsContent>

                        <TabsContent value="upi" className="space-y-6 mt-0">
                          <div className="text-center py-6">
                            <div className="w-20 h-20 bg-white rounded-2xl mx-auto shadow-sm flex items-center justify-center mb-4 border border-border/50">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
                                alt="UPI"
                                className="w-14 opacity-80"
                              />
                            </div>
                            <p className="text-lg font-medium mb-2">Pay via UPI</p>
                            <p className="text-muted-foreground text-sm">
                              Transfer <strong>₹{selectedService.price}</strong> to the UPI ID below
                            </p>
                          </div>

                          <div className="bg-secondary/30 p-4 rounded-xl flex items-center justify-between border border-secondary">
                            <span className="font-mono text-foreground font-medium text-lg">himanshisahni@ybl</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="hover:bg-white"
                              onClick={copyUpiId}
                              disabled={!bookingSubmitted}
                            >
                              <Copy size={18} />
                            </Button>
                          </div>

                          <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex gap-3">
                            <Sparkles size={18} className="shrink-0 text-yellow-600 mt-0.5" />
                            <p>
                              After payment, send a screenshot to <strong>himanshi.therapy@gmail.com</strong> or WhatsApp.
                              I'll confirm your booking manually.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
