export const services = [
  {
    id: "online-therapy",
    title: "1:1 Online Therapy",
    description: "Personalized therapy sessions from the comfort of your own space via secure video call.",
    duration: 60,
    price: 1000,
  },
  {
    id: "offline-therapy",
    title: "1:1 Offline Therapy",
    description: "In-person therapy sessions available in Delhi/Noida for a deeper, face-to-face connection.",
    duration: 60,
    price: 1500,
  },
  {
    id: "nri-therapy",
    title: "1:1 Online Therapy (NRI)",
    description: "Tailored online therapy sessions for Non-Resident Indians, accommodating different time zones.",
    duration: 60,
    price: 1500,
  },
  {
    id: "gift-session",
    title: "Gift a Session",
    description: "Give the gift of mental wellness. Purchase a therapy session for a loved one.",
    duration: 60,
    price: 1000,
  },
] as const;

export type ServiceType = (typeof services)[number];
