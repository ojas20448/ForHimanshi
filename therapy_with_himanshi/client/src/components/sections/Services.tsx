import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Laptop, MapPin, Globe, Clock, IndianRupee, Users, Gift, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const serviceIcons: Record<string, typeof Laptop> = {
  "online-therapy": Laptop,
  "offline-therapy": MapPin,
  "nri-therapy": Globe,
  "gift-session": Gift,
};

const services = [
  {
    id: "online-therapy",
    title: "1:1 Online Therapy",
    description: "Personalized therapy sessions from the comfort of your own space via secure video call. Ideal for consistent, accessible care.",
    duration: 60,
    price: 1000,
  },
  {
    id: "offline-therapy",
    title: "1:1 Offline Therapy",
    description: "In-person therapy sessions available in Delhi/Noida for a deeper, face-to-face connection in a safe, held environment.",
    duration: 60,
    price: 1500,
  },
  {
    id: "nri-therapy",
    title: "1:1 Online Therapy (NRI)",
    description: "Tailored online therapy sessions for Non-Resident Indians, accommodating different time zones and cultural contexts.",
    duration: 60,
    price: 1500,
  },
  {
    id: "gift-session",
    title: "Gift a Session",
    description: "Give the gift of mental wellness. Purchase a therapy session for a loved one and help them begin their healing journey.",
    duration: 60,
    price: 1000,
  },
];

const concerns = [
  { icon: Brain, label: "Anxiety & Overwhelm" },
  { icon: Heart, label: "Depression & Low Mood" },
  { icon: Users, label: "Relationship Dynamics" },
  { icon: UserCheck, label: "Self-Relationship" },
  { icon: CloudRain, label: "Grief & Loss" },
  { icon: Shield, label: "Trauma & PTSD" },
];

import { UserCheck, CloudRain, Shield } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-muted/30 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-white/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">Offerings</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ways we can work together
          </h2>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            I offer a safe, non-judgmental space tailored to your unique needs, whether you prefer the comfort of home or an in-person connection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[service.id] || Laptop;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="glass-card h-full flex flex-col border-white/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group" data-testid={`card-service-${service.id}`}>
                  <CardHeader className="pb-2">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <IconComponent size={28} />
                    </div>
                    <CardTitle className="font-heading text-2xl leading-tight">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-grow">
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-sm text-foreground/80 bg-white/50 p-2 rounded-lg w-fit">
                        <Clock size={16} className="text-primary/70" />
                        <span>{service.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-semibold text-primary bg-primary/5 p-2 rounded-lg w-fit">
                        <IndianRupee size={16} />
                        <span>{service.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Link href={`/payment?service=${service.id}`} className="w-full">
                      <Button className="w-full rounded-xl h-12 text-base shadow-none hover:shadow-lg transition-all group-hover:bg-primary group-hover:text-white" variant="secondary" data-testid={`button-book-${service.id}`}>
                        Book Session <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Concerns Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/60 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/60 shadow-xl text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary/30 text-primary mb-6">
            <Sparkles size={24} />
          </div>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">
            Concerns I Hold Space For
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {concerns.map((concern, index) => {
              const IconComponent = concern.icon;
              return (
                <motion.div
                  key={concern.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
                  className="px-6 py-4 bg-white rounded-full shadow-sm border border-border/50 flex items-center gap-3 hover:border-primary/30 hover:shadow-md transition-all cursor-default"
                >
                  <IconComponent size={18} className="text-primary/70" />
                  <span className="text-base font-medium text-foreground/80">{concern.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
