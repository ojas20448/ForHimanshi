import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [location] = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      const readingLine = Math.min(window.innerHeight * 0.3, 220);
      const active = location === "/" ? ["about", "services", "contact"].find((id) => {
        const bounds = document.getElementById(id)?.getBoundingClientRect();
        return bounds && bounds.top <= readingLine && bounds.bottom > readingLine;
      }) : "";
      setActiveSection(active || "");
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [location]);
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      const links = Array.from(
        panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
      );
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === links[0]) {
          event.preventDefault();
          toggleRef.current?.focus();
        } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
          event.preventDefault();
          toggleRef.current?.focus();
        } else if (document.activeElement === toggleRef.current) {
          event.preventDefault();
          (event.shiftKey ? links.at(-1) : links[0])?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);
  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Therapy", href: "/#services" },
    { name: "Workshops", href: "/workshops" },
    { name: "Contact", href: "/#contact" },
  ];
  const current = (href: string) => {
    if (href === location) return "page" as const;
    if (location === "/" && activeSection && href === `/#${activeSection}`)
      return "location" as const;
    return undefined;
  };
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="site-container nav-inner" aria-label="Main navigation">
        <Link href="/" className="brand-link" aria-label="Manzar Therapy home">
          <img
            src="/images/manzar-logo.png"
            alt="Manzar Therapy"
            width="204"
            height="80"
          />
        </Link>
        <div className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={
                current(link.href)
                  ? "nav-link is-active"
                  : "nav-link"
              }
              aria-current={current(link.href)}
              data-testid={`nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/book"
            className="action-button nav-book"
            data-testid="nav-book-session"
          >
            Book a session <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mobile-nav-actions">
          <Link href="/book" className="mobile-book">
            Book a session
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setIsOpen((v) => !v)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <>
          <button
            className="menu-backdrop"
            aria-label="Close navigation"
            tabIndex={-1}
            onClick={() => {
              setIsOpen(false);
              toggleRef.current?.focus();
            }}
          />
          <div ref={panelRef} id="mobile-navigation" className="mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-current={current(link.href)}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ))}
            <Link
              href="/book"
              className="action-button"
              onClick={() => setIsOpen(false)}
            >
              Book a session <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <p>A little space. A new perspective.</p>
          </div>
        </>
      )}
    </header>
  );
}
