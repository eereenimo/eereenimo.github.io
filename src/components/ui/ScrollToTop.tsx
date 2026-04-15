"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  
  // Smooth scroll progress for the ring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate dash offset: 140 (empty) to 0 (full)
  const dashOffset = useTransform(smoothProgress, [0, 1], [140, 0]);

  // Show button when scrolled down
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 300);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 40 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={[
            "fixed bottom-8 right-8 z-[100]",
            "w-12 h-12 rounded-full",
            "glass-card flex items-center justify-center",
            "group overflow-hidden",
            "md:bottom-12 md:right-12",
          ].join(" ")}
          aria-label="Scroll to top"
        >
          {/* Progress Ring (SVG) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="50%"
              cy="50%"
              r="22"
              className="stroke-[rgba(108,142,255,0.15)] fill-none"
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="22"
              className="stroke-[var(--color-primary)] fill-none"
              strokeWidth="2"
              strokeDasharray="140"
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>

          {/* Background Glow */}
          <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

          {/* Arrow Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-primary)] relative z-10 transition-transform duration-300 group-hover:-translate-y-1"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          
          {/* Atmospheric Pulse */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-[var(--color-primary)] blur-md -z-10"
            animate={{
              opacity: [0, 0.15, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
