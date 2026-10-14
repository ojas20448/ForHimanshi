import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { Services } from "@/components/sections/Services";
import { SessionFinder } from "@/components/sections/SessionFinder";
import { Contact } from "@/components/sections/Contact";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { WorkshopsSection } from "@/components/sections/WorkshopsSection";
import { Concerns } from "@/components/sections/Concerns";

export default function Home() {
  return (
    <div className="home-page min-h-screen flex flex-col bg-background font-sans text-foreground">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Hero />
        <Concerns />
        <AboutSection />
        <Services />
        <WorkshopsSection />
        <SessionFinder />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
