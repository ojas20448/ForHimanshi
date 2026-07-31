import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Brain,
  Heart,
  UserCheck,
  CloudRain,
  Gift,
  Globe,
  MapPin,
  Laptop,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  IndianRupee,
} from "lucide-react";
import { services, Service } from "@shared/services";

interface Option {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof Brain;
  recommendedServiceId: string;
}

const finderOptions: Option[] = [
  {
    id: "anxiety",
    label: "Anxiety, Stress & Overwhelm",
    sublabel: "Seeking tools to manage racing thoughts, burnout, or emotional fatigue",
    icon: Brain,
    recommendedServiceId: "online-therapy",
  },
  {
    id: "relationships",
    label: "Relationships & Boundaries",
    sublabel: "Exploring communication patterns, attachment, and relational healing",
    icon: Heart,
    recommendedServiceId: "online-therapy",
  },
  {
    id: "inperson",
    label: "In-Person Sanctuary (Delhi/Noida)",
    sublabel: "Preferring a physical, quiet, and grounded face-to-face therapeutic space",
    icon: MapPin,
    recommendedServiceId: "offline-therapy",
  },
  {
    id: "nri",
    label: "Living Abroad (NRI / Global)",
    sublabel: "Navigating cultural displacement, diaspora experiences, and remote therapy",
    icon: Globe,
    recommendedServiceId: "nri-therapy",
  },
  {
    id: "grief",
    label: "Grief, Loss & Life Transitions",
    sublabel: "Holding space for heartaches, sudden shifts, and honoring painful chapters",
    icon: CloudRain,
    recommendedServiceId: "online-therapy",
  },
  {
    id: "gift",
    label: "Gift a Session to Someone",
    sublabel: "Sponsoring a therapy session as a caring, meaningful gesture of support",
    icon: Gift,
    recommendedServiceId: "gift-session",
  },
];

export function SessionFinder() {
  const [selectedOptionId, setSelectedOptionId] = useState<string>("anxiety");

  const currentOption = finderOptions.find((o) => o.id === selectedOptionId) || finderOptions[0];
  const recommendedService: Service =
    services.find((s) => s.id === currentOption.recommendedServiceId) || services[0];

  const getServiceHighlights = (serviceId: string) => {
    switch (serviceId) {
      case "offline-therapy":
        return [
          "Calm, private sanctuary space in Delhi/Noida",
          "Deep non-verbal somatic awareness & presence",
          "Confidential 60-minute face-to-face dialogue",
        ];
      case "nri-therapy":
        return [
          "Flexible scheduling across global time zones",
          "Culturally responsive diaspora-informed care",
          "Seamless international online video connection",
        ];
      case "gift-session":
        return [
          "Personalized digital voucher sent to recipient",
          "Valid for 60-minute individual session",
          "Thoughtful, stigma-free wellness gift",
        ];
      default: // online-therapy
        return [
          "Comfort of your own safe, familiar environment",
          "Trauma-informed & queer-affirmative approach",
          "Flexible 60-minute video session",
        ];
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#FCFBF9] relative overflow-hidden">
      {/* Background ambient radial glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[hsl(346,29%,83%)]/25 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/15 shadow-xs text-xs sm:text-sm font-semibold text-primary mb-4"
          >
            <Sparkles size={16} className="text-primary" />
            <span>Interactive Guidance</span>
          </motion.div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Path in Therapy
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed text-balance">
            Unsure where to begin? Select what you are currently holding, and explore how we can journey together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Options Selection Column */}
          <div className="lg:col-span-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
              Select what resonates with you right now:
            </p>

            {finderOptions.map((option) => {
              const IconComp = option.icon;
              const isSelected = option.id === selectedOptionId;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedOptionId(option.id)}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-start gap-4 border ${
                    isSelected
                      ? "bg-white shadow-premium border-primary/40 ring-2 ring-primary/20"
                      : "bg-white/60 hover:bg-white/90 border-primary/10 shadow-xs"
                  }`}
                  data-testid={`finder-option-${option.id}`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? "bg-primary text-white shadow-sm" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <IconComp size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-heading font-semibold text-base sm:text-lg text-foreground">
                        {option.label}
                      </h4>
                      {isSelected && (
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full shrink-0">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {option.sublabel}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Recommended Result Display Column */}
          <div className="lg:col-span-6 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={recommendedService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-3xl border border-primary/20 shadow-xl relative overflow-hidden"
              >
                {/* Accent top gradient stripe */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[hsl(var(--accent-pink))] via-primary to-primary/60" />

                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                  <Sparkles size={16} />
                  <span>Recommended Service</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {recommendedService.title}
                </h3>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {recommendedService.description}
                </p>

                {/* Key Benefits Checklist */}
                <div className="space-y-3 mb-6 bg-secondary/20 p-4 sm:p-5 rounded-2xl border border-secondary/40">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">
                    What this session includes:
                  </p>
                  {getServiceHighlights(recommendedService.id).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Duration Meta */}
                <div className="flex items-center justify-between py-4 border-t border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground/75">
                    <Clock size={18} className="text-primary/70" />
                    <span>{recommendedService.duration} Minutes</span>
                  </div>

                  <div className="flex items-center gap-1 text-2xl font-extrabold text-primary">
                    <IndianRupee size={22} />
                    <span>{recommendedService.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* CTA Action Button */}
                <Link href={`/book?service=${recommendedService.id}`} className="w-full">
                  <Button
                    size="lg"
                    className="w-full rounded-2xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    data-testid={`button-recommendation-book-${recommendedService.id}`}
                  >
                    Book {recommendedService.title} <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
