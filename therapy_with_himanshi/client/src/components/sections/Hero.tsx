import {
  ArrowDown,
  ArrowUpRight,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="site-container hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">
            A space to come
            <br />
            home to <em>yourself.</em>
          </h1>
          <p className="hero-intro">Counselling with Himanshi Sahni.</p>
          <div className="hero-credentials">
            <GraduationCap size={25} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>M.A. Applied Psychology</strong>
              <span>Clinical Specialisation · Adults 18–40</span>
            </div>
          </div>
          <p className="hero-description">
            A space to slow down, understand your inner landscape, and meet
            yourself with care, at your own pace.
          </p>
          <div className="hero-actions">
            <Link
              href="/book"
              className="action-button"
              data-testid="button-book-session"
            >
              Book a session <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a href="#about" className="text-link">
              Get to know Himanshi <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <ul className="hero-values" aria-label="Approach to therapy">
            <li>Trauma informed</li>
            <li>Queer affirmative</li>
          </ul>
        </div>
        <div className="hero-profile">
          <div className="profile-image-wrap">
            <img
              src="/images/himanshi-portrait-2542.webp"
              srcSet="/images/himanshi-portrait-2542-small.webp 480w, /images/himanshi-portrait-2542.webp 960w"
              sizes="(max-width: 480px) calc(135vw - 86px), 580px"
              alt="Himanshi Sahni outdoors in a garden"
              width="960"
              height="1280"
              fetchPriority="high"
              className="profile-image"
            />
            <span className="profile-location">Online & East Delhi</span>
          </div>
          <div className="profile-details">
            <div className="profile-name">
              <h2>Himanshi Sahni</h2>
              <span>she/her</span>
            </div>
            <p>Counselling Psychologist</p>
            <div className="profile-bottom">
              <span>
                Sessions from <strong>₹1,500</strong>
              </span>
              <Link
                href="/book"
                aria-label="Book a session with Himanshi Sahni"
              >
                <ArrowUpRight size={23} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="site-container hero-footnote">
        <span>
          <ShieldCheck size={16} aria-hidden="true" /> A thoughtful,
          confidential space to begin.
        </span>
        <a href="#about" aria-label="Explore Manzar Therapy">
          <ArrowDown size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
