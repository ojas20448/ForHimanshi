import { motion, AnimatePresence } from "framer-motion";
import logo from "@assets/logo.png";
import { useEffect, useState } from "react";

export function Preloader() {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const tagline = "Honouring your inner landscape!";

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] grid place-items-center bg-[#FDFCFB]"
        >
            <div className="flex flex-col items-center justify-center p-4 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <img
                        src={logo}
                        alt="Manzar Therapy"
                        className="w-40 md:w-56 object-contain mb-8 mix-blend-multiply"
                    />
                </motion.div>

                <div className="h-8 overflow-hidden">
                    <AnimatePresence>
                        {showText && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-xl md:text-2xl font-medium text-primary tracking-wide"
                                style={{ fontFamily: "'Snell Roundhand', 'Brush Script MT', cursive" }}
                            >
                                {tagline}
                            </motion.h2>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
