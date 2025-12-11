"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

export default function ScrollToContact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const contactSection = document.getElementById("kontakt");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isContactVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (window.scrollY > 300 && !isContactVisible) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("kontakt");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToContact}
          className="fixed bottom-8 left-8 z-50 p-3 rounded-full bg-neutral-950/0 text-primary-foreground shadow-lg backdrop-blur-sm border border-blue-500/30 hover:bg-primary/90 hover:scale-110 transition-all duration-300 group"
          aria-label="Scroll to contact form"
        >
          <Mail className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}