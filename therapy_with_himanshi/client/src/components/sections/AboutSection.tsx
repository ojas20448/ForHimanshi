import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-space about-section"
      aria-labelledby="about-title"
    >
      <div className="site-container">
        <Reveal className="philosophy-intro">
          <h2 id="about-title">
            Understanding the inner
            <br />
            <em>landscape you carry.</em>
          </h2>
          <p>
            Manzar is the inner landscape each of us carries. This is a space to
            turn inward and meet yourself with curiosity, gently, at your own
            pace.
          </p>
        </Reveal>
        <div className="about-layout">
          <div className="about-visual">
            <div className="about-photo-frame">
              <img
                src="/images/himanshi-about-0456.webp"
                srcSet="/images/himanshi-about-0456-small.webp 600w, /images/himanshi-about-0456.webp 1200w"
                sizes="(max-width: 767px) 100vw, 700px"
                alt="Himanshi Sahni sitting outdoors beside greenery"
                width="1200"
                height="1600"
                loading="lazy"
              />
            </div>
            <p>
              “I believe in people, in the wisdom of their bodies, the truths of
              their stories, and the possibility of steady inner shifts.”
            </p>
            <span>Himanshi Sahni</span>
          </div>
          <Reveal className="about-copy">
            <h3>
              Hi, I’m Himanshi.
              <br />
              <em>Let’s make room for you.</em>
            </h3>
            <p>
              I am a counselling psychologist who works from a deeply relational
              and compassionate space.
            </p>
            <p>
              My approach is trauma informed, queer affirmative, and grounded in
              Internal Family Systems (IFS), narrative work, and humanistic
              traditions.
            </p>
            <p>
              Therapy with me is slow, relational, and collaborative. We move at
              a pace that feels safe for your nervous system, with room for the
              protective parts that have carried you and the truths you’ve held
              quietly.
            </p>
            <Link href="/book" className="text-link">
              Begin a conversation <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
