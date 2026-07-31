import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Laptop, MapPin, Globe, Clock, IndianRupee, Users, Gift, Sparkles, ArrowRight, UserCheck, CloudRain, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { services } from "@shared/services";

const serviceIcons: Record<string, typeof Laptop> = {
  "online-therapy": Laptop,
  "offline-therapy": MapPin,
  "nri-therapy": Globe,
  "gift-session": Gift,
};

const concerns = [
  { icon: Brain, label: "Anxiety & Overwhelm" },
  { icon: Heart, label: "Depression & Low Mood" },
  { icon: Users, label: "Relationship Dynamics" },
  { icon: UserCheck, label: "Self-Relationship" },
  { icon: CloudRain, label: "Grief & Loss" },
  { icon: Shield, label: "Trauma & PTSD" },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-white/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[hsl(var(--accent-pink))]/40 rounded-full blur-[100px] md:blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <span className="text-primary font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Offerings</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Ways we can work together
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed text-balance">
            I offer a safe, non-judgmental space tailored to your unique needs, whether you prefer the comfort of home or an in-person connection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 md:mb-32">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[service.id] || Laptop;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="h-full bg-white/90 backdrop-blur-md border border-primary/15 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 group flex flex-col rounded-2xl md:rounded-[2rem] overflow-hidden" data-testid={`card-service-${service.id}`}>
                  <CardHeader className="pb-2">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:scale-110 group-hover:bg-[hsl(var(--accent-pink))] transition-all duration-300">
                      <IconComponent size={24} className="sm:w-7 sm:h-7" />
                    </div>
                    <CardTitle className="font-heading text-xl sm:text-2xl leading-tight text-foreground/90">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 flex-grow">
                    <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                      {service.description}
                    </CardDescription>

                    <div className="space-y-2.5 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/75 font-medium">
                        <Clock size={16} className="text-primary/70 shrink-0" />
                        <span>{service.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-lg sm:text-xl font-bold text-primary">
                        <IndianRupee size={18} />
                        <span>{service.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-6 px-6">
                    <Link href={`/book?service=${service.id}`} className="w-full">
                      <Button className="w-full rounded-xl h-11 sm:h-12 text-sm sm:text-base font-medium border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 min-h-[44px]" variant="outline" data-testid={`button-book-${service.id}`}>
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
          className="bg-white/80 backdrop-blur-md rounded-3xl md:rounded-[3rem] p-6 sm:p-10 md:p-16 border border-white/80 shadow-xl text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary/40 text-primary mb-4 sm:mb-6">
            <Sparkles size={22} />
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-10">
            Concerns I Hold Space For
          </h3>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4">
            {concerns.map((concern, index) => {
              const IconComponent = concern.icon;
              return (
                <motion.div
                  key={concern.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-white/70 backdrop-blur-sm rounded-full shadow-xs border border-primary/10 flex items-center gap-2.5 sm:gap-3 hover:border-primary/40 hover:bg-white hover:shadow-md transition-all cursor-default min-h-[44px]"
                >
                  <IconComponent size={18} className="text-primary/80 shrink-0" />
                  <span className="text-xs sm:text-base font-medium text-foreground/85">{concern.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
