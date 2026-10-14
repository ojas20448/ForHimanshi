import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useChangeFeedback } from "@/hooks/useChangeFeedback";

const testimonials = [
  {
    id: 1,
    text: "I couldn't have asked for a better therapist. Himanshi is truly my Dr. Jug from Dear Zindagi. She has helped me understand so many things with nuance and beauty and shown me that I am capable of navigating life's complexities. Through our sessions, I've learned to see fear not just as something negative but also as a way of protection. With her kindness and empathy, she has helped me discover my potential, understand my emotions more clearly, and build a set of strategies I can turn to in difficult times. I am deeply grateful for her presence and guidance.",
    author: "Client A.",
  },
  {
    id: 2,
    text: "I have been in therapy for four months with Himanshi. In this time she has given me a safe and non judgemental space to express my emotions in various tough phases in my life. She has gradually helped me with my negative thought patterns and I have seen significant changes in how I face challenges in my life. Thank you Himanshi for the patience, care and understanding you provided in the therapeutic space.",
    author: "Client S.",
  },
  {
    id: 3,
    text: "I absolutely love Himanshi. She has been a ray of hope in moments when everything felt unclear. She listens without judgment and makes you feel safe, understood, and supported. She feels like a friend who genuinely cares and offers guidance that actually helps. I'm really grateful for the growth and clarity I've experienced through therapy with her.",
    author: "Client M.",
  },
  {
    id: 4,
    text: "I came to her when I was really struggling with depression, no job, and no routine - just a cycle of sleeping, eating, and overthinking. I couldn't imagine getting back on my feet or functioning normally again. She met me in that space with so much patience and compassion. She didn't rush my healing or invalidate my pain. Instead, she helped me slowly rebuild starting with small routines, small goals, and small steps that eventually became progress. Today, I feel more stable, I'm grateful for the safe and supportive space she has created for me.",
    author: "Client R.",
  },
  {
    id: 5,
    text: "I genuinely want to thank you from the bottom of my heart. Ever since we started working together, I’ve truly seen a positive change in myself. You have been such a great support, and I can clearly see how much I’ve grown as a person and overcome the issues I once struggled with all thanks to your guidance. Our sessions have always been incredibly meaningful, and I walk away from each one feeling lighter, stronger, and so much better than before. I’m truly grateful for the impact you’ve had on my journey. Thank you for everything",
    author: "Client",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reflectionRef = useChangeFeedback(index);
  const item = testimonials[index];
  return (
    <section
      className="section-space testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <div className="site-container">
        <div className="testimonial-header">
          <h2 id="testimonials-title">
            Small shifts.
            <br />
            <em>Meaningful stories.</em>
          </h2>
          <p>
            Reflections from people who have explored their inner landscape with
            Himanshi.
          </p>
        </div>
        <div
          className="testimonial-stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client reflections"
        >
            <div className="testimonial-controls">
              <span className="testimonial-label">In their words</span>
              <div className="testimonial-buttons">
                <span className="testimonial-count">
                  {index + 1} / {testimonials.length}
                </span>
                <button
                  type="button"
                  aria-label="Previous client reflection"
                  onClick={() =>
                    setIndex(
                      (index - 1 + testimonials.length) % testimonials.length,
                    )
                  }
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next client reflection"
                  onClick={() => setIndex((index + 1) % testimonials.length)}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          <div ref={reflectionRef} aria-live="polite" aria-atomic="true">
            <blockquote>“{item.text}”</blockquote>
            <p className="testimonial-author">{item.author}</p>
          </div>
          <p className="testimonial-note">
            Individual experiences of therapy vary. These reflections describe
            personal journeys.
          </p>
        </div>
      </div>
    </section>
  );
}
