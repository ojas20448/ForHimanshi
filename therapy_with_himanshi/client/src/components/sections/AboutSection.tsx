import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import image1 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.14_(1)_1765616014879.jpeg";
import image2 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.14_1765616014879.jpeg";
import image3 from "@assets/WhatsApp_Image_2025-12-11_at_00.59.59_1765616014879.jpeg";
import image4 from "@assets/WhatsApp_Image_2025-12-11_at_01.01.21_1765616014879.jpeg";
import shiftImage from "@assets/himanshi_1.jpeg";

export function AboutSection() {
  const images = [image1, image2, image3, image4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
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
      {/* Decorative background blur removed as per request */}

      <div className="container mx-auto px-4 md:px-6">
        {/* Intro Text */}
        <motion.div
          // ... (omitting unchanged lines for brevity in search match, but usually better to match precise block)
          // Actually, I'll allow multiple replacements in one go or just do two chunks.
          // Re-reading 'replace_file_content' documentation. I can't do multiple chunks with 'replace_file_content'.
          // I should use 'multi_replace_file_content' if I need to change the import AND the usage, as they are far apart.
          // Import is at line 3. Usage is at line 47.
          // So I will use `multi_replace_file_content`.
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center mb-24 relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-10"
          />
          <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">My Philosophy</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Understanding the inner <span className="text-balance italic text-primary">landscape</span> you carry.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            This is a space to slow down, turn inward, and meet yourself with curiosity rather than judgment — gently, at your own pace.
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
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden transition-transform duration-500 ease-out">
              <img
                src={shiftImage}
                alt="Abstract inner landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating decorative element */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/80 backdrop-blur-md rounded-full z-10 hidden md:block"
            />
          </motion.div>

          <motion.div
            className="md:col-span-6 md:col-start-7 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-display text-4xl md:text-5xl text-foreground">A Space for Shifts</h3>
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
            <h3 className="font-display text-4xl md:text-5xl text-foreground">Himanshi Sahni <span className="text-xl text-muted-foreground font-sans font-normal">(she/her)</span></h3>

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

          {/* Image - Slideshow */}
          <div className="md:col-span-5 md:col-start-8 md:order-2 order-1 relative group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-white"
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Himanshi Sahni ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-foreground" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-foreground" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
          </div>
        </div>
        {/* Therapy with Me Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto p-8 md:p-12 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl mt-32 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--accent-pink))]/30 rounded-full blur-3xl pointer-events-none" />
          <h4 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            Therapy with Me
          </h4>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Therapy with me is <span className="text-foreground font-medium">slow, relational, and collaborative</span>. We move at a pace that feels safe for your nervous system — never rushed, never forced. I see therapy as opening a window into your inner world, allowing space for what has been held quietly.
            </p>
            <p>
              We honour the protective parts that have carried you and make room for truths you've quietened. This work isn't about surface-level change; it's about deeper movements that reshape how you relate to yourself. I hope that, over time, your Manzar feels easier to navigate with compassion, care, and a sense of home within yourself.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
