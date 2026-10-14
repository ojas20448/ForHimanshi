import { ArrowUpRight, Users } from "lucide-react";
import { Link } from "wouter";
import { workshopEnquiryUrl, workshopPhotos } from "@/content/workshops";
import { Reveal } from "@/components/ui/Reveal";

export function WorkshopsSection() {
  const photo = workshopPhotos[0];
  return (
    <section
      id="workshops"
      className="section-space workshop-preview"
      aria-labelledby="workshop-preview-title"
    >
      <Reveal className="site-container workshop-preview-layout">
        <div className="workshop-preview-copy">
          <h2 id="workshop-preview-title">
            Some conversations
            <br />
            are better <em>shared.</em>
          </h2>
          <p>
            Workshops open up space to pause, reflect, and talk about mental
            wellbeing together. Explore a conversation for your community,
            campus, or workplace.
          </p>
          <Link href="/workshops" className="text-link">
            Explore workshops <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        {photo ? (
          <div className="workshop-preview-photo">
            <Link
              href="/workshops"
              aria-label="See photographs from Himanshi’s workshops"
            >
              <img
                src={photo.src}
                srcSet={`${photo.smallSrc} 800w, ${photo.src} 1600w`}
                sizes="(max-width: 767px) calc(100vw - 40px), 520px"
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                loading="lazy"
              />
            </Link>
            <div className="workshop-preview-photo-meta">
              <p>{photo.caption}</p>
              <a
                href={workshopEnquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Plan a workshop <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <div className="workshop-invitation">
            <Users size={34} strokeWidth={1.3} aria-hidden="true" />
            <h3>
              Bring the conversation
              <br />
              to your community.
            </h3>
            <p>Start a conversation about a workshop for your group.</p>
            <a
              href={workshopEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button action-outline"
            >
              Enquire about a workshop{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        )}
      </Reveal>
    </section>
  );
}
