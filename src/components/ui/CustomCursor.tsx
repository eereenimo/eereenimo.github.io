"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<"default" | "link" | "project">("default");
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Instant follow for the core
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dampened spring for the trailing ring
  const ringX = useSpring(mouseX, { mass: 0.1, stiffness: 400, damping: 28 });
  const ringY = useSpring(mouseY, { mass: 0.1, stiffness: 400, damping: 28 });

  useEffect(() => {
    // Disable entirely for coarse pointers (touch devices)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;

      if (!target) return;

      // Intelligent Context Detection
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest('input[type="button"]') ||
        target.closest('input[type="submit"]')
      ) {
        setVariant("link");
      } else if (target.closest("article")) {
        // Assuming `<article>` wrappers denote Featured Work modules
        setVariant("project");
      } else {
        setVariant("default");
      }
    };

    // Ensure cursor doesn't awkwardly drag outside bounds
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  // The 50% Rule: Keep ring visual extremely restrained
  const ringVariants = {
    default: { width: 36, height: 36, opacity: isDark ? 0.35 : 0.45 },
    // On link: expand slightly, soften intensity, act as a magnetic halo
    link:    { width: 44, height: 44, opacity: isDark ? 0.20 : 0.30 },
    // On project: expand massively to become a faint tracking ambient light
    project: { width: 120, height: 120, opacity: isDark ? 0.08 : 0.12 }
  };

  const coreVariants = {
    default: { scale: 1, opacity: 1 },
    // On link: pull inward into a sharp needle point
    link:    { scale: 0.4, opacity: 1 },
    // On project: softly expand but dim
    project: { scale: 1.5, opacity: 0.4 }
  };

  return (
    <>
      {/* Soft tracking aura */}
      <motion.div
        className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[var(--color-primary)] hidden md:block ${isDark ? 'mix-blend-screen' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: isDark 
            ? "0 0 20px rgba(108,142,255,0.25), inset 0 0 10px rgba(108,142,255,0.1)"
            : "0 0 15px rgba(108,142,255,0.15)"
        }}
        variants={ringVariants}
        animate={variant}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }} // Match global ease
      />

      {/* Intense solid core */}
      <motion.div
        className={`pointer-events-none fixed top-0 left-0 z-[10000] w-[5px] h-[5px] rounded-full hidden md:block ${isDark ? 'bg-white mix-blend-screen shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-[var(--color-primary)] shadow-[0_0_6px_var(--color-glow)]'}`}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={coreVariants}
        animate={variant}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
