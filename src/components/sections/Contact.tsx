"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Cinematic Blur System for the final scene
  const blurValue = useTransform(scrollYProgress, [0.3, 0.8], [6, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  const blurFilter = useMotionTemplate`blur(${blurValue}px)`;

  // Final ambient lift to unite the bottom of the page
  const lightFieldOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 0.015]);

  return (
    <>
      {/* Final Light Field Boundary */}
      <motion.div 
        className="fixed inset-0 pointer-events-none -z-40 flex items-end justify-center mix-blend-screen pb-40"
        style={{ opacity: lightFieldOpacity }}
        aria-hidden="true"
      >
        <div 
          className="w-[150vw] h-[100vh] rounded-full blur-[160px]" 
          style={{ backgroundColor: "var(--color-primary)" }} 
        />
      </motion.div>

      <motion.section
        ref={containerRef}
        id="contact"
        aria-label="Contact"
        className="relative flex flex-col items-center justify-center py-32 bg-transparent min-h-[60vh]"
        style={{ opacity: sectionOpacity, filter: blurFilter }}
      >
        <SectionEyebrow className="mb-4">Get in Touch</SectionEyebrow>
        <h2 className="text-headline mb-6 text-center">Let's build something.</h2>
        <p className="text-body text-center max-w-md text-[var(--color-text-secondary)]">
          This is a placeholder contact section to ensure the page scrolls correctly.
          We will design this properly in a later pass.
        </p>
      </motion.section>
    </>
  );
}
