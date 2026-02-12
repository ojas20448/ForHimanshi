import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import heroImg1 from "@assets/himanshi_1.jpeg";
import heroImg2 from "@assets/himanshi_2.jpeg";
import heroImg3 from "@assets/himanshi_3.jpeg";

const heroImages = [heroImg1, heroImg2, heroImg3];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-80px)] mt-[80px] flex items-center bg-gradient-to-b from-white to-pink-50/50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 z-10"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-foreground">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-primary block mb-2"
              >
                Manzar
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Therapy
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-light"
            >
              A space that centres your lived experience and honours the complexity of your inner landscape.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 w-full md:w-auto"
            >
              <Link href="/book">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto" data-testid="button-book-session">
                  Book a Session
                </Button>
              </Link>
              <a href="#contact">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-primary/5 w-full sm:w-auto" data-testid="button-contact">
                  Contact Me
                </Button>
              </a>
            </motion.div>

            <div className="flex gap-8 pt-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Trauma Informed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Queer Affirmative</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image Slideshow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] md:h-[650px] w-full max-w-[400px] mx-auto md:ml-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white z-10"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentIndex}
                src={heroImages[currentIndex]}
                alt="Therapy session"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* Slide Indicators inside image */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 backdrop-blur-sm ${index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/40 w-2 hover:bg-white/60"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
