import useEmblaCarousel from "embla-carousel-react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "I couldn't have asked for a better therapist. Himanshi is truly my Dr. Jug from Dear Zindagi. She has helped me understand so many things with nuance and beauty and shown me that I am capable of navigating life's complexities. Through our sessions, I've learned to see fear not just as something negative but also as a way of protection. With her kindness and empathy, she has helped me discover my potential, understand my emotions more clearly, and build a set of strategies I can turn to in difficult times. I am deeply grateful for her presence and guidance.",
    author: "Client A."
  },
  {
    id: 2,
    text: "I have been in therapy for four months with Himanshi. In this time she has given me a safe and non judgemental space to express my emotions in various tough phases in my life. She has gradually helped me with my negative thought patterns and I have seen significant changes in how I face challenges in my life. Thank you Himanshi for the patience, care and understanding you provided in the therapeutic space.",
    author: "Client S."
  },
  {
    id: 3,
    text: "I absolutely love Himanshi. She has been a ray of hope in moments when everything felt unclear. She listens without judgment and makes you feel safe, understood, and supported. She feels like a friend who genuinely cares and offers guidance that actually helps. I'm really grateful for the growth and clarity I've experienced through therapy with her.",
    author: "Client M."
  },
  {
    id: 4,
    text: "I came to her when I was really struggling with depression, no job, and no routine - just a cycle of sleeping, eating, and overthinking. I couldn't imagine getting back on my feet or functioning normally again. She met me in that space with so much patience and compassion. She didn't rush my healing or invalidate my pain. Instead, she helped me slowly rebuild starting with small routines, small goals, and small steps that eventually became progress. Today, I feel more stable, I'm grateful for the safe and supportive space she has created for me.",
    author: "Client R."
  },
  {
    id: 5,
    text: "I genuinely want to thank you from the bottom of my heart. Ever since we started working together, I’ve truly seen a positive change in myself. You have been such a great support, and I can clearly see how much I’ve grown as a person and overcome the issues I once struggled with all thanks to your guidance. Our sessions have always been incredibly meaningful, and I walk away from each one feeling lighter, stronger, and so much better than before. I’m truly grateful for the impact you’ve had on my journey. Thank you for everything",
    author: "Client"
  }
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-xs sm:text-sm mb-3 block">Kind Words</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Stories of Shifts
          </h2>
          <p className="text-muted-foreground font-light text-base sm:text-lg text-balance">
            Reflections from those who have journeyed through their inner landscape with me.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative px-0 sm:px-8 md:px-12" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing py-4" ref={emblaRef} aria-live="polite">
            <div className="flex -ml-4 md:-ml-8">
              {testimonials.map((item, index) => (
                <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_45%] pl-4 md:pl-8 min-w-0" key={item.id}>
                  <div className={`h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 border border-primary/10 relative group flex flex-col justify-between ${
                    index === selectedIndex ? "bg-white shadow-premium scale-100 opacity-100" : "bg-white/50 shadow-xs scale-[0.98] opacity-75 md:opacity-60"
                  }`}>
                    <Quote className="text-primary/15 absolute top-5 left-5 w-10 h-10 sm:w-12 sm:h-12 rotate-180 pointer-events-none" />

                    <div className="relative z-10 pt-4 flex flex-col h-full justify-between">
                      <p className="text-sm sm:text-base md:text-lg text-foreground/85 italic leading-relaxed mb-6 font-medium">
                        "{item.text}"
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="font-heading font-bold text-foreground text-sm sm:text-base">{item.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Dots */}
            <div className="flex items-center gap-2 mx-auto">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedIndex ? "w-6 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Next/Prev Floating Buttons */}
          <button
            onClick={scrollPrev}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 w-11 h-11 rounded-full bg-white/90 shadow-md items-center justify-center text-foreground hover:text-primary transition-colors z-20 border border-primary/10 min-w-[44px] min-h-[44px]"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={scrollNext}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 w-11 h-11 rounded-full bg-white/90 shadow-md items-center justify-center text-foreground hover:text-primary transition-colors z-20 border border-primary/10 min-w-[44px] min-h-[44px]"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
