import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppButton() {
  const phoneNumber = "919599529780";
  const message = "Hi, I would like to know more about therapy sessions.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-white/90 backdrop-blur-md hover:bg-white text-primary p-3.5 rounded-full shadow-premium border border-primary/20 flex items-center justify-center transition-all duration-300 min-w-[48px] min-h-[48px] group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse Aura */}
      <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none -z-10 group-hover:hidden" />
      <WhatsAppIcon size={26} className="text-emerald-700 group-hover:scale-105 transition-transform" />
    </motion.a>
  );
}
