import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, IndianRupee, Clock, Laptop, MapPin, Globe, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearch, Link } from "wouter";

interface ServiceInfo {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  icon: typeof Laptop;
}

const services: ServiceInfo[] = [
  {
    id: "online-therapy",
    title: "1:1 Online Therapy",
    description: "Personalized therapy sessions via secure video call.",
    duration: 60,
    price: 1000,
    icon: Laptop,
  },
  {
    id: "offline-therapy",
    title: "1:1 Offline Therapy",
    description: "In-person sessions in Delhi/Noida.",
    duration: 60,
    price: 1500,
    icon: MapPin,
  },
  {
    id: "nri-therapy",
    title: "1:1 Online Therapy (NRI)",
    description: "Online sessions for Non-Resident Indians.",
    duration: 60,
    price: 1500,
    icon: Globe,
  },
];

const CAL_LINK = "https://cal.com/himanshi-sahni/therapy-sessions";

function CalendarEmbed() {
  return (
    <iframe
      src={`${CAL_LINK}?embed=true&theme=light&layout=month_view`}
      className="w-full h-full border-0"
      style={{ minHeight: "550px" }}
      allow="camera; microphone; fullscreen"
      loading="lazy"
    />
  );
}

export default function Book() {
  const [accessStatus, setAccessStatus] = useState<"loading" | "authorized" | "browse">("loading");
  const [selectedService, setSelectedService] = useState<ServiceInfo | null>(null);
  
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const tokenFromUrl = params.get("token");
  const orderId = params.get("order_id");

  useEffect(() => {
    const checkAccess = async () => {
      if (orderId) {
        try {
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ orderId }),
          });
          
          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            setAccessStatus("authorized");
            return;
          }
        } catch (err) {
          console.error("Payment verification error:", err);
        }
      }

      try {
        const url = tokenFromUrl 
          ? `/api/book/access?token=${tokenFromUrl}`
          : "/api/book/access";
          
        const response = await fetch(url, {
          credentials: "include",
        });

        const data = await response.json();

        if (data.authorized) {
          setAccessStatus("authorized");
        } else {
          setAccessStatus("browse");
        }
      } catch (err) {
        setAccessStatus("browse");
      }
    };

    checkAccess();
  }, [tokenFromUrl, orderId]);

  if (accessStatus === "loading") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (accessStatus === "authorized") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow pt-8 pb-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm mb-4">
                <CheckCircle2 size={16} />
                Payment Verified
              </div>
              <h1 className="font-heading text-3xl font-bold mb-2">Book Your Session</h1>
              <p className="text-muted-foreground">Choose a time that works for you.</p>
            </div>
            
            <Card className="shadow-xl border-none overflow-hidden">
              <CardContent className="p-0" style={{ height: "600px" }}>
                <CalendarEmbed />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-8 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Book a Session</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse available time slots, select your preferred session type, and complete payment to confirm your booking.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <Card className="shadow-xl border-none overflow-hidden">
                <CardHeader className="bg-secondary/30 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    <CardTitle className="text-lg">Available Time Slots</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0" style={{ height: "550px" }}>
                  <CalendarEmbed />
                </CardContent>
              </Card>
              <div className="mt-3 text-center">
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                >
                  Having trouble? Open calendar in new tab <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="shadow-xl border-none sticky top-24">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Select Service</CardTitle>
                  <CardDescription>Choose your session type to proceed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {services.map((service) => {
                    const IconComponent = service.icon;
                    const isSelected = selectedService?.id === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          isSelected 
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                            : "hover:bg-secondary/20"
                        }`}
                        data-testid={`service-option-${service.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-primary text-white" : "bg-secondary/50"
                          }`}>
                            <IconComponent size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{service.title}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {service.duration} min
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-primary">
                                <IndianRupee size={12} /> {service.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 size={20} className="text-primary" />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-4 border-t">
                    {selectedService ? (
                      <Link href={`/payment?service=${selectedService.id}`}>
                        <Button 
                          className="w-full rounded-full h-12 text-base"
                          data-testid="button-pay-to-book"
                        >
                          Pay ₹{selectedService.price.toLocaleString()} to Book
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full rounded-full h-12 text-base" 
                        disabled
                      >
                        Select a service to continue
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment via Cashfree. After payment, you'll confirm your booking.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
