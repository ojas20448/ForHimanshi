import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Clock, IndianRupee } from "lucide-react";
import himanshiImg from "@/assets/himanshi_1.jpeg";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center overflow-hidden py-12 lg:py-24">
      {/* Organic mesh background with animated ambient float */}
      <div className="absolute inset-0 w-full h-full bg-[#FCFBF9] overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[400px] lg:w-[650px] h-[400px] lg:h-[650px] rounded-full bg-[hsl(346,29%,83%)]/40 blur-[100px] lg:blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -right-40 w-[450px] lg:w-[750px] h-[450px] lg:h-[750px] rounded-full bg-[hsl(120,29%,25%)]/12 blur-[100px] lg:blur-[140px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] lg:w-[600px] h-[350px] lg:h-[600px] rounded-full bg-[hsl(40,20%,94%)]/80 blur-[90px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Value Prop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8"
          >
            {/* Live Availability Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/15 shadow-xs text-xs sm:text-sm font-medium text-primary"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Accepting Clients • Online & In-Person</span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-heading leading-[1.05] text-foreground tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-foreground block mb-1 font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight"
              >
                MANZAR
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-display font-light italic text-4xl sm:text-6xl lg:text-7xl tracking-wide block text-foreground/90"
              >
                Therapy Space
              </motion.span>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-base sm:text-lg lg:text-xl text-foreground/80 max-w-xl leading-relaxed font-normal text-balance"
            >
              Manzar is inward-facing. It is the memories that shaped us, the emotions we've learned to hold quietly, and the stories that continue to echo within.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4 w-full sm:w-auto justify-center lg:justify-start items-center"
            >
              <Link href="/book" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all" data-testid="button-book-session">
                    Book a Session <ArrowRight size={18} className="ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <a href="#services" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-base sm:text-lg border-primary/20 bg-white/70 backdrop-blur-md hover:bg-[hsl(var(--accent-pink))] hover:text-primary transition-all" data-testid="button-contact">
                    Explore Services
                  </Button>
                </motion.div>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap gap-3 sm:gap-4 pt-2 text-xs sm:text-sm text-muted-foreground font-medium justify-center lg:justify-start items-center"
            >
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3.5 py-2 rounded-full border border-primary/10 shadow-xs">
                <ShieldCheck size={16} className="text-primary" />
                <span>Trauma Informed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3.5 py-2 rounded-full border border-primary/10 shadow-xs">
                <HeartHandshake size={16} className="text-primary" />
                <span>Queer Affirmative</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3.5 py-2 rounded-full border border-primary/10 shadow-xs">
                <Clock size={16} className="text-primary" />
                <span>60-Min Sessions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Desktop Studio Snapshot Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl md:rounded-[2.5rem] border border-white/80 shadow-2xl relative overflow-hidden group">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-primary/10 shadow-md">
                <img
                  src={himanshiImg}
                  alt="Himanshi Sahni - Counselling Psychologist"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-heading text-xl font-bold">Himanshi Sahni</p>
                  <p className="text-xs text-white/80">Counselling Psychologist • M.A. Applied Psychology</p>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-secondary/30 p-3.5 rounded-xl border border-secondary/50">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">Online & Delhi/Noida</p>
                </div>
                <div className="bg-secondary/30 p-3.5 rounded-xl border border-secondary/50">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Session Fee</p>
                  <p className="text-sm font-bold text-primary flex items-center">
                    <IndianRupee size={14} /> 1,500 / Session
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Safe & Confidential Space</span>
                <Link href="/book" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
                  Book Directly <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
