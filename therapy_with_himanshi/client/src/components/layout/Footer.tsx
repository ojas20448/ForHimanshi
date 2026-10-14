import { Instagram, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div className="footer-about">
            <Link href="/" className="footer-brand">
              MANZAR
            </Link>
            <p>
              The inner landscape each of us carries.
              <br />A space that honours your stories and the complexity of your
              journey.
            </p>
            <div className="footer-socials">
              <a
                href="https://instagram.com/manzartherapy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Manzar Therapy on Instagram"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href="mailto:manzartherapy@gmail.com"
                aria-label="Email Manzar Therapy"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/919599529780"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Manzar Therapy on WhatsApp"
              >
                <WhatsAppIcon size={19} />
              </a>
            </div>
          </div>
          <div className="footer-nav">
            <h3>Find your way</h3>
            <ul>
              <li>
                <a href="/#about">About Himanshi</a>
              </li>
              <li>
                <a href="/#services">Therapy & fees</a>
              </li>
              <li>
                <Link href="/workshops">Workshops</Link>
              </li>
              <li>
                <a href="/#faq">Common questions</a>
              </li>
              <li>
                <Link href="/book">
                  Book a session{" "}
                  <ArrowUpRight size={13} className="ml-2" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>A conversation starts here</h3>
            <ul>
              <li>
                <a href="mailto:manzartherapy@gmail.com">
                  manzartherapy@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919599529780"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 95995 29780
                </a>
              </li>
              <li>Online & in person · East Delhi</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Manzar Therapy. All rights reserved.
          </span>
          <span>Counselling with care. At your pace.</span>
        </div>
        <p className="footer-care-note">
          Manzar Therapy offers scheduled counselling and is not an emergency
          service. If you are in immediate danger, contact your local emergency
          services or go to the nearest emergency department.
        </p>
      </div>
    </footer>
  );
}
