import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "What can I expect from our first session?",
    answer:
      "The first session is primarily about getting to know each other. We will discuss what brings you to therapy, your current challenges, and what you hope to achieve. It's a safe space for you to ask questions and see if we feel like a good fit.",
  },
  {
    question: "How long is each session?",
    answer:
      "Standard individual therapy sessions are 60 minutes long. This allows us enough time to settle in, explore significant themes, and close the session safely.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "I require at least 24 hours' notice for cancellations or rescheduling. This allows me to offer the slot to someone else who might need it. Cancellations made with less than 24 hours' notice are charged the full session fee.",
  },
  {
    question: "Is everything we discuss confidential?",
    answer:
      "Yes, confidentiality is a cornerstone of therapy. What you share in our sessions stays between us, with a few legal and ethical exceptions regarding immediate risk of harm to yourself or others, which we will discuss in our first meeting.",
  },
  {
    question: "How often should we meet?",
    answer:
      "Weekly sessions are typically recommended to build momentum and the therapeutic relationship, especially in the beginning. However, we can discuss a frequency that works best for your needs and circumstances.",
  },
  {
    question: "Do you offer a sliding scale?",
    answer:
      "I do offer a limited number of sliding scale slots for those with financial constraints. Please feel free to ask about availability during our initial contact.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="section-space faq-section"
      aria-labelledby="faq-title"
    >
      <div className="site-container faq-layout">
        <div className="faq-intro">
          <h2 id="faq-title">
            A little clarity,
            <br />
            <em>before you begin.</em>
          </h2>
          <p>
            It’s natural to have questions. Here are a few things that might
            help you feel more at ease.
          </p>
          <a
            href="https://wa.me/919599529780"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Ask Himanshi a question{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <Accordion type="single" collapsible className="faq-accordion">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={String(index)}
              className="faq-item"
            >
              <AccordionTrigger className="faq-trigger">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="faq-answer">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
