import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "What can I expect from our first session?",
        answer: "The first session is primarily about getting to know each other. We will discuss what brings you to therapy, your current challenges, and what you hope to achieve. It's a safe space for you to ask questions and see if we feel like a good fit."
    },
    {
        question: "How long is each session?",
        answer: "Standard individual therapy sessions are 60 minutes long. This allows us enough time to settle in, explore significant themes, and close the session safely."
    },
    {
        question: "What is your cancellation policy?",
        answer: "I require at least 24 hours' notice for cancellations or rescheduling. This allows me to offer the slot to someone else who might need it. Cancellations made with less than 24 hours' notice are charged the full session fee."
    },
    {
        question: "Is everything we discuss confidential?",
        answer: "Yes, confidentiality is a cornerstone of therapy. What you share in our sessions stays between us, with a few legal and ethical exceptions regarding immediate risk of harm to yourself or others, which we will discuss in our first meeting."
    },
    {
        question: "How often should we meet?",
        answer: "Weekly sessions are typically recommended to build momentum and the therapeutic relationship, especially in the beginning. However, we can discuss a frequency that works best for your needs and circumstances."
    },
    {
        question: "Do you offer a sliding scale?",
        answer: "I do offer a limited number of sliding scale slots for those with financial constraints. Please feel free to ask about availability during our initial contact."
    }
];

export function FAQ() {
    return (
        <section id="faq" className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <span className="text-primary font-medium tracking-wide uppercase text-sm mb-4 block">Common Questions</span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Clarifying the process to help you feel more at ease.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border border-border/60 rounded-xl px-6 bg-white/50 hover:bg-white transition-colors">
                                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
