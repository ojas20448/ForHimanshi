import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import image1 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.14_(1)_1765616014879.jpeg";
import image2 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.14_1765616014879.jpeg";
import image3 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.59_1765616014879.jpeg";
import image4 from "@assets/WhatsApp_Image_2025-12-11_at_01.01.21_1765616014879.jpeg";

const images = [image1, image2, image3, image4];

export function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">Our Philosophy</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Understanding the inner <span className="text-balance italic text-primary/80">landscape</span> you carry.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            Manzar is inward-facing. It is the memories that shaped us, the emotions we've learned to hold quietly, and the stories that continue to echo within.
          </p>
        </motion.div>

        {/* Content Block 1: The Concept */}
        <div className="grid md:grid-cols-12 gap-12 items-center mb-32">
          <motion.div
            className="md:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <img
                src={image4}
                alt="Abstract inner landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating decorative element */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/80 backdrop-blur-md rounded-full z-10 hidden md:block animate-pulse-slow" />
          </motion.div>

          <motion.div
            className="md:col-span-6 md:col-start-7 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-heading text-3xl md:text-4xl text-foreground">A Space for Shifts</h3>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                The intention here is twofold: to offer you a grounded, relational space to understand your inner landscape more deeply, and to support you to make the shifts you've been longing for.
              </p>
              <p>
                These are the kind of shifts that come from clarity, self-connection, and a gentle strengthening of your relationship with yourself.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content Block 2: About Himanshi */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div
            className="md:col-span-6 space-y-8 md:order-1 order-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium tracking-wide uppercase text-sm">About Me</span>
            <h3 className="font-heading text-3xl md:text-4xl text-foreground">Himanshi Sahni <span className="text-xl text-muted-foreground font-sans font-normal">(she/her)</span></h3>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a counselling psychologist who works from a deeply relational and person-centred space. I hold an MSc in Applied Psychology with a clinical specialisation, working with adults aged 18-40.
              </p>
              <p>
                My approach is <span className="text-foreground font-medium">trauma-informed</span>, <span className="text-foreground font-medium">queer-friendly</span>, and grounded in IFS, narrative work, and humanistic traditions.
              </p>
              <p>
                At its heart, my work is simple: I believe in people, in the wisdom of their bodies, the truths of their stories, and the possibility of steady inner shifts.
              </p>
            </div>
          </motion.div>

          {/* Interactive Image Slider */}
          <div className="md:col-span-5 md:col-start-8 md:order-2 order-1 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 ease-out border-4 border-white"
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Himanshi Sahni ${index + 1}`}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ${index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                    } ${index === 2 ? "object-contain bg-secondary/20 p-4" : "object-cover"}`}
                />
              ))}

              {/* Slider Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button onClick={goToPrevious} className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={goToNext} className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dots */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${index === currentIndex ? "bg-white w-6" : "bg-white/50 w-1.5 hover:bg-white/80"
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
