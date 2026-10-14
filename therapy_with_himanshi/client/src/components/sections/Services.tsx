import { ArrowUpRight, Globe, Laptop, MapPin, Gift } from "lucide-react";
import { Link } from "wouter";
import { services } from "@shared/services";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Laptop, MapPin, Globe, Gift];
export function Services() {
  return (
    <section
      id="services"
      className="section-space services-section"
      aria-labelledby="services-title"
    >
      <div className="site-container">
        <div className="section-heading-row">
          <h2 id="services-title">
            Support that meets you
            <br />
            <em>where you are.</em>
          </h2>
          <p>
            You don’t need to have it all figured out to begin. Choose a way of
            meeting that feels right for you.
          </p>
        </div>
        <Reveal className="service-list">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <Link
                key={service.id}
                href={`/book?service=${service.id}`}
                className="service-row"
                data-testid={`button-book-${service.id}`}
              >
                <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-price">
                  <strong>₹{service.price.toLocaleString("en-IN")}</strong>
                  <span>{service.duration} minutes</span>
                </div>
                <span className="service-arrow">
                  <ArrowUpRight size={23} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
