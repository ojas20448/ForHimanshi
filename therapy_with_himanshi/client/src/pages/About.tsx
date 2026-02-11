import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import image1 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.14_(1)_1765616014879.jpeg";
import image2 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.14_1765616014879.jpeg";
import image3 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.59_1765616014879.jpeg";
import image4 from "@assets/WhatsApp_Image_2025-12-11_at_01.01.21_1765616014879.jpeg";

const images = [image1, image2, image3, image4];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 bg-gradient-soft">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                About <span className="text-primary">Manzar</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Understanding the inner landscape we all carry
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto space-y-6 text-muted-foreground leading-relaxed text-lg"
            >
              <p>
                Manzar usually refers to a view, something you witness from the
                outside.
              </p>
              <p>
                But for me, Manzar is inward-facing. It is the inner landscape
                each of us carries: the memories that shaped us, the emotions
                we've learned to hold quietly, the patterns that once protected
                us, the stories that continue to echo within us.
              </p>
              <p>
                The intention here is twofold: to offer you a grounded,
                relational space to understand your inner landscape more deeply,
                and to support and empower you to make the shifts you've been
                longing for; the kind of shifts that come from clarity,
                self-connection, and a gentle strengthening of your relationship
                with yourself.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group"
              >
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Himanshi Sahni ${index + 1}`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    } ${
                      index === 2
                        ? "object-contain bg-muted scale-95"
                        : "object-cover"
                    }`}
                  />
                ))}

                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? "bg-white w-6" : "bg-white/50"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  About Me
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm Himanshi Sahni (she/her), a counselling psychologist who
                    works from a deeply relational and person-centred space. I
                    hold an MSc in Applied Psychology with a clinical
                    specialisation, and I currently work with adults aged 18-40
                    navigating the many layers of emotional life.
                  </p>
                  <p>
                    My approach is trauma-informed, queer-friendly, and grounded
                    in IFS, narrative work, and humanistic traditions. At its
                    heart, my work is simple: I believe in people, in the wisdom
                    of their bodies, the truths of their stories, and the
                    possibility of steady inner shifts.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto p-8 bg-muted/30 rounded-2xl"
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                Therapy with Me
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Therapy with me is slow, relational, and collaborative. We
                  move at a pace that feels safe for your nervous system, never
                  rushed, never forced. I see therapy as opening a window into
                  your inner world, allowing space for what has been held
                  quietly.
                </p>
                <p>
                  We honour the protective parts that have carried you and make
                  room for truths you've quietened. This work isn't about
                  surface-level change; it's about deeper movements that reshape
                  how you relate to yourself. I hope that, over time, your
                  Manzar feels easier to navigate with compassion, care, and a
                  sense of home within yourself.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
