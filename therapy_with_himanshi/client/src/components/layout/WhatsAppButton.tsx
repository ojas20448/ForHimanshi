
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
            className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-md hover:bg-white text-primary p-3 rounded-full shadow-premium border border-primary/10 flex items-center justify-center transition-all duration-300 opacity-90 hover:opacity-100"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Chat on WhatsApp"
        >
            <WhatsAppIcon size={24} className="text-primary" />
        </motion.a>
    );
}
