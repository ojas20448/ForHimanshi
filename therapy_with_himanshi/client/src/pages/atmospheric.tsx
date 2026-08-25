import { Link } from "wouter";
import { motion } from "framer-motion";
import "./atmospheric.css";

// Animation settings (Atmospheric genre: fade-in only, no slide, no bounce)
const fadeUp = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export default function AtmosphericLanding() {
  return (
    <div className="hm-atmospheric-body">
      
      {/* Nav N5 - Floating Pill */}
      <nav className="hm-nav-pill">
        <Link href="/" className="hm-nav-brand">Manzar Therapy</Link>
        <Link href="/book" className="hm-chip-cta">Book Session</Link>
      </nav>

      {/* H1 - Marquee Hero */}
      <section className="hm-hero-marquee">
        <motion.h1 
          className="hm-atmospheric-display text-balance"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Built for the <span className="hm-accent-text">dark</span>.
        </motion.h1>
      </section>

      <hr className="hm-thick-rule" />

      {/* F1 - Bento Grid */}
      <section className="hm-bento-section">
        <motion.div 
          className="hm-bento-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Main featured block */}
          <motion.div className="hm-bento-tile hm-bento-span-2x2" variants={fadeUp}>
            <h3 className="hm-bento-title">High-Functioning Anxiety</h3>
            <p className="hm-bento-desc">
              A canvas, then a tool. We explore the space between the performance you give the world, and the exhaustion you feel when the door closes. Generate, refine, and heal at your own pace.
            </p>
          </motion.div>

          <motion.div className="hm-bento-tile hm-bento-span-1x2" variants={fadeUp}>
            <h3 className="hm-bento-title">Grief & Loss</h3>
            <p className="hm-bento-desc">
              The instrument is dark. The output is yours. Moving through the empty space left behind, honoring what was while finding footing in what is.
            </p>
          </motion.div>

          <motion.div className="hm-bento-tile hm-bento-span-1x1" variants={fadeUp}>
            <h3 className="hm-bento-title">Relational Trauma</h3>
            <p className="hm-bento-desc">
              Breaking cycles. Building trust.
            </p>
          </motion.div>

          <motion.div className="hm-bento-tile hm-bento-span-2x1" variants={fadeUp}>
            <h3 className="hm-bento-title">Queer Affirmative Space</h3>
            <p className="hm-bento-desc">
              A single primitive that scales. Exist exactly as you are, without explanation or translation.
            </p>
          </motion.div>
          
          <motion.div className="hm-bento-tile hm-bento-span-1x1" variants={fadeUp}>
            <h3 className="hm-bento-title">Integration</h3>
            <p className="hm-bento-desc">
              Built to think in real time.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <hr className="hm-thick-rule" />

      {/* T3 - Single Huge Quote */}
      <section className="hm-quote-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <blockquote className="hm-huge-quote text-balance">
            "The page should feel like a place you could sit in. Therapy is no different."
          </blockquote>
          <div className="hm-quote-attr">Himanshi Singh</div>
        </motion.div>
      </section>

      {/* Ft5 - Statement Footer */}
      <footer className="hm-footer">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="hm-footer-statement text-balance">
            Generate, refine, heal — between Tuesday and Wednesday.
          </h2>
          <div className="hm-footer-meta">
            <span>Manzar Therapy</span>
            <span>&copy; {new Date().getFullYear()}</span>
            <span>Built for the dark.</span>
          </div>
        </motion.div>
      </footer>

    </div>
  );
}
