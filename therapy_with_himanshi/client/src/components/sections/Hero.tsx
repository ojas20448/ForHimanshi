import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center overflow-hidden py-12 md:py-20">
      {/* Organic mesh background with animated ambient float */}
      <div className="absolute inset-0 w-full h-full bg-[#FCFBF9] overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-[hsl(346,29%,83%)]/40 blur-[100px] sm:blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -right-40 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full bg-[hsl(120,29%,25%)]/12 blur-[100px] sm:blur-[130px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[hsl(40,20%,94%)]/80 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-primary/10 shadow-xs text-xs sm:text-sm font-medium text-primary mb-2"
          >
            <Sparkles size={14} className="text-primary" />
            <span>Honouring your inner landscape</span>
          </motion.div>

          {/* Heading */}
          <h1 className="font-heading leading-[1.08] text-foreground tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-foreground block mb-1 font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight"
            >
              MANZAR
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-normal text-3xl sm:text-5xl md:text-6xl tracking-wide block text-foreground/90"
            >
              THERAPY
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base sm:text-lg md:text-xl text-foreground/75 max-w-2xl leading-relaxed font-normal px-2 text-balance"
          >
            Manzar is inward-facing. It is the memories that shaped us, the emotions we've learned to hold quietly, and the stories that continue to echo within.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6 w-full sm:w-auto justify-center items-center"
          >
            <Link href="/book" className="w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all" data-testid="button-book-session">
                  Book a Session <ArrowRight size={18} className="ml-2" />
                </Button>
              </motion.div>
            </Link>
            <a href="#contact" className="w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-base sm:text-lg border-primary/20 bg-white/60 backdrop-blur-md hover:bg-[hsl(var(--accent-pink))] hover:text-primary transition-all" data-testid="button-contact">
                  Contact Me
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap gap-4 sm:gap-8 pt-4 text-xs sm:text-sm text-muted-foreground font-medium justify-center items-center"
          >
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-primary/10">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Trauma Informed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-primary/10">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Queer Affirmative</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
