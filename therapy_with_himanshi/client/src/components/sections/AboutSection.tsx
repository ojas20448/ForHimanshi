import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, Heart, Shield, Sparkles } from "lucide-react";

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
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center mb-20 md:mb-28 relative"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">My Philosophy</span>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Understanding the inner <span className="text-balance font-display italic text-primary">landscape</span> you carry.
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light text-balance">
            This is a space to slow down, turn inward, and meet yourself with curiosity rather than judgment — gently, at your own pace.
          </p>
        </motion.div>

        {/* Content Block 1: A Space for Shifts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 md:mb-32">
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[3/4] rounded-3xl md:rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl group">
              <img
                src={shiftImage}
                alt="Therapy space concept"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30">
                <p className="font-heading font-semibold text-lg">A Space for Shifts</p>
                <p className="text-xs text-white/80 font-light">Grounding • Relational • Compassionate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              A Space for Shifts
            </h3>
            <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                The intention here is twofold: to offer you a grounded, relational space to understand your inner landscape more deeply, and to support you to make the shifts you've been longing for.
              </p>
              <p>
                These are the kind of shifts that come from clarity, self-connection, and a gentle strengthening of your relationship with yourself.
              </p>
            </div>

            {/* Approach Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-primary/10 shadow-xs">
                <Shield size={20} className="text-primary mb-2" />
                <p className="font-heading font-semibold text-sm text-foreground">Trauma Informed</p>
                <p className="text-xs text-muted-foreground mt-1">Safe nervous system pacing</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-primary/10 shadow-xs">
                <Heart size={20} className="text-primary mb-2" />
                <p className="font-heading font-semibold text-sm text-foreground">Queer Affirmative</p>
                <p className="text-xs text-muted-foreground mt-1">Inclusive & identity-aligned</p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-primary/10 shadow-xs">
                <Sparkles size={20} className="text-primary mb-2" />
                <p className="font-heading font-semibold text-sm text-foreground">Person-Centred</p>
                <p className="text-xs text-muted-foreground mt-1">IFS & Narrative traditions</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Block 2: About Himanshi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-xs sm:text-sm">About Me</span>
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Himanshi Sahni <span className="text-lg sm:text-2xl text-muted-foreground font-sans font-normal">(she/her)</span>
            </h3>

            <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                I am a counselling psychologist who works from a deeply relational and person-centred space. I hold an M.A. in Applied Psychology with a clinical specialisation, working with adults aged 18-40.
              </p>
              <p>
                My approach is <span className="text-foreground font-semibold">trauma-informed</span>, <span className="text-foreground font-semibold">queer-friendly</span>, and grounded in Internal Family Systems (IFS), narrative work, and humanistic traditions.
              </p>
              <p>
                At its heart, my work is simple: I believe in people, in the wisdom of their bodies, the truths of their stories, and the possibility of steady inner shifts.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-secondary/40 p-4 rounded-2xl border border-secondary/60 max-w-md">
              <Award size={24} className="text-primary shrink-0" />
              <div>
                <p className="font-heading font-semibold text-sm text-foreground">M.A. Applied Psychology</p>
                <p className="text-xs text-muted-foreground">Clinical Specialisation • Adults (18-40)</p>
              </div>
            </div>
          </motion.div>

          {/* Image Slideshow */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-3xl md:rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-white"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md min-w-[44px] min-h-[44px]"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-foreground" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md min-w-[44px] min-h-[44px]"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-foreground" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-white w-6" : "bg-white/50 w-2"
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
          className="max-w-4xl mx-auto p-6 sm:p-10 md:p-14 bg-white/80 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] border border-white/80 shadow-xl mt-20 md:mt-28 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--accent-pink))]/30 rounded-full blur-3xl pointer-events-none" />
          <h4 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Therapy with Me
          </h4>
          <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
            <p>
              Therapy with me is <span className="text-foreground font-semibold">slow, relational, and collaborative</span>. We move at a pace that feels safe for your nervous system — never rushed, never forced. I see therapy as opening a window into your inner world, allowing space for what has been held quietly.
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
