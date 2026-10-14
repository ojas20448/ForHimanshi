import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ArrowUpRight, Users } from "lucide-react";
import { Link } from "wouter";
import {
  workshopThemes,
  workshopPhotos,
  workshops,
  workshopEnquiryUrl,
} from "@/content/workshops";
import { Reveal } from "@/components/ui/Reveal";

export default function Workshops() {
  return (
    <div className="workshops-page">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <section className="workshop-page-hero section-space">
          <div className="site-container">
            <Link href="/" className="text-link back-link">
              <ArrowLeft size={16} aria-hidden="true" /> Back to Manzar
            </Link>
            <h1>
              Mental wellbeing.
              <br />
              <em>A shared conversation.</em>
            </h1>
            <div className="workshop-hero-bottom">
              <p>
                Workshops with Himanshi Sahni create room for conversations
                about how we feel, how we connect, and how we care for ourselves
                and each other.
              </p>
              <a
                href={workshopEnquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button"
              >
                Plan a workshop <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section className="section-space workshop-topics">
          <div className="site-container">
            <div className="section-heading-row">
              <h2>
                Conversations
                <br />
                <em>we could explore.</em>
              </h2>
              <p>
                These are starting points. Share your group, context, and what
                you hope to explore with Himanshi.
              </p>
            </div>
            <div className="topic-list">
              {workshopThemes.map((theme) => (
                <Reveal key={theme.title} className="topic-row">
                  <h3>{theme.title}</h3>
                  <p>{theme.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section
          className="section-space workshop-gallery"
          aria-labelledby="past-workshops-title"
        >
          <div className="site-container">
            <h2 id="past-workshops-title">
              From the <em>workshops.</em>
            </h2>
            {workshops.length > 0 ? (
              <div className="workshop-gallery-grid">
                {workshops.map((workshop) => (
                  <article key={workshop.id} className="workshop-entry">
                    <img
                      src={workshop.image}
                      alt={workshop.imageAlt}
                      width="800"
                      height="600"
                      loading="lazy"
                    />
                    <div>
                      <p className="workshop-entry-meta">
                        {workshop.organisation} ·{" "}
                        <time dateTime={workshop.date}>
                          {new Intl.DateTimeFormat("en-IN", {
                            dateStyle: "long",
                            timeZone: "Asia/Kolkata",
                          }).format(new Date(workshop.date))}
                        </time>
                      </p>
                      <h3>{workshop.title}</h3>
                      <p>{workshop.description}</p>
                      <p className="workshop-audience">
                        For {workshop.audience}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
            {workshopPhotos.length > 0 && (
              <div className="workshop-photo-grid">
                {workshopPhotos.map((photo) => (
                  <figure key={photo.src} className="workshop-photo">
                    <a
                      href={photo.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View full photograph: ${photo.caption}`}
                    >
                      <img
                        src={photo.src}
                        srcSet={`${photo.smallSrc} ${photo.width / 2}w, ${photo.src} ${photo.width}w`}
                        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 50vw, 660px"
                        width={photo.width}
                        height={photo.height}
                        alt={photo.alt}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            {workshops.length === 0 && workshopPhotos.length === 0 && (
              <div className="workshops-empty">
                <Users size={36} strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <h3>Stories from the room, coming soon.</h3>
                  <p>
                    We’re gathering workshop photographs and reflections to
                    share here. In the meantime, let’s talk about a workshop for
                    your group.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="workshop-enquire section-space">
          <div className="site-container">
            <h2>
              What would you like
              <br />
              to make <em>space for?</em>
            </h2>
            <p>
              Tell Himanshi about your group, the topic you have in mind, and
              your preferred date or format. You can shape the conversation
              together.
            </p>
            <div className="hero-actions">
              <a
                href={workshopEnquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button"
              >
                Enquire on WhatsApp{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a
                href="mailto:manzartherapy@gmail.com?subject=Workshop%20enquiry"
                className="text-link"
              >
                Send an email <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
