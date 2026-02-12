import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@assets/logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // If not on homepage, navigate to homepage first
    if (location !== "/") {
      window.location.href = "/" + href;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 64; // Approx height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        <div onClick={scrollToTop} className="cursor-pointer flex items-center gap-3">
          <img src={logo} alt="Manzar Therapy" className="h-12 md:h-16 w-auto transition-transform hover:scale-105 object-contain mix-blend-multiply" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              data-testid={`nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <Link href="/book">
            <Button className="rounded-full px-6 shadow-md hover:shadow-lg transition-all" data-testid="nav-book-session">Book a Session</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 md:top-20 left-0 w-full bg-white border-b shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col p-6 gap-6 items-center text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-lg font-medium text-foreground hover:text-primary w-full py-2"
              >
                {link.name}
              </a>
            ))}
            <Link href="/payment" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full text-lg py-6" size="lg">Book a Session</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
