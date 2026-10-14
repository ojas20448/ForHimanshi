import { ArrowUpRight, Check, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { services } from "@shared/services";
import { useChangeFeedback } from "@/hooks/useChangeFeedback";

const options = [
  { label: "From my own space", id: "online-therapy" },
  { label: "In person, in East Delhi", id: "offline-therapy" },
  { label: "While living abroad", id: "nri-therapy" },
  { label: "A session for someone I care about", id: "gift-session" },
];
export function SessionFinder() {
  const [serviceId, setServiceId] = useState("online-therapy");
  const resultRef = useChangeFeedback(serviceId);
  const selected = services.find((service) => service.id === serviceId)!;
  return (
    <section
      className="session-finder section-space"
      aria-labelledby="finder-title"
    >
      <div className="site-container finder-layout">
        <div>
          <h2 id="finder-title">
            Find your path
            <br />
            <em>in therapy.</em>
          </h2>
          <p>Where would you feel most comfortable beginning?</p>
          <div
            className="finder-options"
            role="group"
            aria-label="Choose a session format"
          >
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setServiceId(option.id)}
                aria-pressed={serviceId === option.id}
                className={
                  serviceId === option.id
                    ? "finder-option is-selected"
                    : "finder-option"
                }
              >
                <span className="option-check">
                  {serviceId === option.id && (
                    <Check size={14} aria-hidden="true" />
                  )}
                </span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div ref={resultRef} className="finder-result" aria-live="polite" aria-atomic="true">
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <div className="finder-facts">
            <span>
              <Clock size={17} aria-hidden="true" /> {selected.duration} minutes
            </span>
            <span>
              <MapPin size={17} aria-hidden="true" />{" "}
              {selected.id === "offline-therapy" ? "East Delhi" : "Online"}
            </span>
          </div>
          <div className="finder-result-bottom">
            <div>
              <strong>₹{selected.price.toLocaleString("en-IN")}</strong>
              <span>per session</span>
            </div>
            <Link
              href={`/book?service=${selected.id}`}
              className="action-button"
            >
              Choose a time <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <p className="finder-note">
            Need a little clarity first?{" "}
            <a
              href="https://wa.me/919599529780"
              target="_blank"
              rel="noopener noreferrer"
            >
              You can always ask.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
