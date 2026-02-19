import { motion } from "framer-motion";

import aboutImage from "@assets/WhatsApp_Image_2025-12-11_at_00.59.14_(1)_1765616014879.jpeg";

export function AboutSection() {

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background blur removed as per request */}

      <div className="container mx-auto px-4 md:px-6">
        {/* Intro Text */}
        <motion.div
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
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden transition-transform duration-500 ease-out">
              <img
                src={aboutImage}
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

          {/* Image - Single Photo */}
          <div className="md:col-span-5 md:col-start-8 md:order-2 order-1 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden transition-transform duration-500 ease-out border-4 border-white shadow-2xl"
            >
              <img
                src={aboutImage}
                alt="Himanshi Sahni"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
