export type Workshop = {
  id: string;
  title: string;
  organisation: string;
  date: string; // ISO date, for example 2026-10-15
  audience: string;
  description: string;
  image: string; // Public URL, for example /images/workshops/event-name.webp
  imageAlt: string;
};

// Add verified workshop details when supplied by Himanshi.
export const workshops: Workshop[] = [];

// User-supplied workshop photographs. Add event details once confirmed.
export const workshopPhotos = [
  {
    src: "/images/workshops/workshop-group-3718.webp",
    smallSrc: "/images/workshops/workshop-group-3718-small.webp",
    width: 1600,
    height: 1200,
    alt: "Himanshi Sahni with workshop participants in a classroom",
    caption: "With workshop participants",
  },
  {
    src: "/images/workshops/workshop-appreciation-3724.webp",
    smallSrc: "/images/workshops/workshop-appreciation-3724-small.webp",
    width: 1200,
    height: 1600,
    alt: "Himanshi Sahni holding a letter of appreciation after a workshop",
    caption: "A note of appreciation",
  },
];

// Suggested conversation themes from the practice, not past events.
export const workshopThemes = [
  {
    title: "Understanding our emotions",
    description:
      "Making space for emotional awareness, self-understanding, and the feelings we often hold quietly.",
  },
  {
    title: "Stress, overwhelm & everyday care",
    description:
      "Opening a conversation about the pressures we carry and what looking after ourselves can mean.",
  },
  {
    title: "Relationships & boundaries",
    description:
      "Exploring how we relate to ourselves and others, and what feels important in our connections.",
  },
];
export const workshopEnquiryUrl = `https://wa.me/919599529780?text=${encodeURIComponent("Hi Himanshi, I'd like to enquire about a workshop. Our organisation / group is: ")}`;
