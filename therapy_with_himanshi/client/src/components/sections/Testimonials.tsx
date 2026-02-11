import useEmblaCarousel from "embla-carousel-react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
    {
        id: 1,
        text: "Himanshi creates such a safe, non-judgmental container. I felt truly heard for the first time in years. The IFS approach helped me understand parts of myself I used to fight against.",
        author: "Client A.",
        tag: "Online Therapy"
    },
    {
        id: 2,
        text: "The pacing of our sessions is exactly what I needed. Slow, intentional, and deeply respectful of my nervous system. I'm learning to be kinder to myself.",
        author: "Client S.",
        tag: "Trauma Informed"
    },
    {
        id: 3,
        text: "As a queer individual, finding a therapist who truly 'gets it' without me having to educate them was a relief. Himanshi affirmed my experience from day one.",
        author: "Client M.",
        tag: "Queer Affirmative"
    },
    {
        id: 4,
        text: "I was skeptical about online therapy, but Himanshi's presence transcends the screen. It feels just as intimate and holding as an in-person session.",
        author: "Client R.",
        tag: "Online Therapy"
    }
];

export function Testimonials() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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
        <section className="py-24 bg-gradient-to-b from-white to-secondary/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">Kind Words</span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Stories of Shifts
                    </h2>
                    <p className="text-muted-foreground font-light text-lg">
                        Reflections from those who have journeyed through their inner landscape with me.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto relative px-4 md:px-12">
                    <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                        <div className="flex -ml-4 md:-ml-8">
                            {testimonials.map((item, index) => (
                                <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] pl-4 md:pl-8 min-w-0" key={item.id}>
                                    <div className={`h-full p-8 rounded-3xl transition-all duration-300 border border-border/50 relative group ${index === selectedIndex ? "bg-white shadow-premium scale-100 opacity-100" : "bg-white/40 shadow-none scale-[0.98] opacity-60 blur-[0.5px]"
                                        }`}>
                                        <Quote className="text-primary/20 absolute top-6 left-6 w-12 h-12" />

                                        <div className="relative z-10 pt-4 flex flex-col h-full">
                                            <p className="text-lg text-foreground/80 italic leading-relaxed mb-6 font-medium">
                                                "{item.text}"
                                            </p>

                                            <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                                                <span className="font-heading font-bold text-foreground">{item.author}</span>
                                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-foreground/70">
                                                    {item.tag}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-foreground hover:text-primary transition-colors z-20 border border-border"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-foreground hover:text-primary transition-colors z-20 border border-border"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
