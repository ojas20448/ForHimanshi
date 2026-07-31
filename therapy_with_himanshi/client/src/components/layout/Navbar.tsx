import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Manzar_cropped.svg";
import { motion, AnimatePresence } from "framer-motion";

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
      const offset = 72; // Height of navbar
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

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-primary/10 bg-white/85 backdrop-blur-md shadow-xs transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        <Link href="/" className="cursor-pointer flex items-center gap-3">
          <img src={logo} alt="Manzar Therapy" className="h-14 md:h-20 w-auto transition-transform hover:scale-105 object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
              data-testid={`nav-${link.name.toLowerCase()}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--accent-pink))] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Link href="/book">
            <Button className="rounded-full px-6 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95" data-testid="nav-book-session">
              Book a Session
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-3 rounded-full hover:bg-black/5 text-foreground transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Animated Mobile Glass Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[65px] bg-black/20 backdrop-blur-xs md:hidden z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-xl overflow-hidden z-50"
            >
              <div className="flex flex-col p-6 gap-5 items-center text-center">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-lg font-medium text-foreground hover:text-primary w-full py-2 rounded-xl transition-colors active:bg-primary/5 min-h-[44px] flex items-center justify-center"
                  >
                    {link.name}
                  </a>
                ))}
                <Link href="/book" onClick={() => setIsOpen(false)} className="w-full pt-2">
                  <Button className="w-full rounded-full text-base py-6 shadow-md" size="lg">
                    Book a Session
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
