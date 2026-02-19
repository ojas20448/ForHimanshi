import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

export function Hero() {

  return (
    <section className="relative min-h-[calc(100vh-80px)] mt-[80px] flex items-center bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[hsl(var(--accent-pink))]/70 rounded-full blur-[120px] opacity-90 mix-blend-multiply" />
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-0">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-8 z-10 max-w-4xl"
          >
            <h1 className="font-heading leading-[1.1] text-foreground">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-foreground block mb-2 font-bold text-6xl md:text-7xl lg:text-8xl tracking-tight"
              >
                MANZAR
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-normal text-4xl md:text-5xl lg:text-6xl tracking-wide block ml-1"
              >
                THERAPY
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-light"
            >
              A space that centres your lived experience and honours the complexity of your inner landscape!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-10 justify-center"
            >
              <Link href="/book">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" data-testid="button-book-session">
                  Book a Session
                </Button>
              </Link>
              <a href="#contact">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-[hsl(var(--accent-pink))] hover:text-primary hover:border-[hsl(var(--accent-pink))] transition-all" data-testid="button-contact">
                  Contact Me
                </Button>
              </a>
            </motion.div>

            <div className="flex flex-wrap gap-8 pt-4 text-sm text-muted-foreground font-medium justify-center">
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

        </div>
      </div>
    </section>
  );
}
