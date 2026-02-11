import { Instagram, Mail, Calendar, Heart, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white py-16 mt-auto relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-heading font-bold text-3xl text-primary-foreground/90">Manzar Therapy</h3>
            <p className="text-white/70 max-w-sm text-lg leading-relaxed font-light">
              "Manzar is the inner landscape each of us carries." <br />
              A space that centres your lived experience and honours the complexity of your journey.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://instagram.com/therapy.w.himanshi"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:himanshi.therapy@gmail.com"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading text-xl font-medium text-white/90">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-white/60 hover:text-primary-foreground transition-colors inline-block">About Me</a>
              </li>
              <li>
                <a href="#services" className="text-white/60 hover:text-primary-foreground transition-colors inline-block">Services</a>
              </li>
              <li>
                <a href="#faq" className="text-white/60 hover:text-primary-foreground transition-colors inline-block">FAQ</a>
              </li>
              <li>
                <Link href="/payment" className="text-white/60 hover:text-primary-foreground transition-colors inline-block">Book a Session</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading text-xl font-medium text-white/90">Contact</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 shrink-0" />
                <span className="text-sm">himanshi.therapy@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span className="text-sm">Online & In-person<br />(Delhi/Noida)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {currentYear} Manzar Therapy. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Designed with</span>
            <Heart size={14} className="text-primary-foreground fill-primary-foreground" />
            <span>for Healing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
