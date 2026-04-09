"use client";

import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";

export function GlobalAtmosphere() {
  const { scrollYProgress, scrollY } = useScroll();
  
  // ── Scroll Indicator Velocity Fading ──
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  // Fade out completely when idle, very faint when scrolling
  const indicatorOpacity = useTransform(smoothVelocity, [-50, 0, 50], [0.2, 0.0, 0.2]);
  
  // Transform scroll progress to fill the vertical line
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // ── Seamless Atmosphere Variation ──
  // Hero (high contrast) -> Featured (calmer) -> Contact (minimal)
  const lightLeakOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.02, 0.008, 0.002]);
  const violetGlowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.005, 0.012, 0.008, 0.002]);
  const baseDimmer = useTransform(scrollYProgress, [0.7, 1], [0, 0.3]); // Darken the very end slightly

  return (
    <>
      {/* Fixed global background container */}
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none select-none -z-50">
        
        {/* Base dark bg */}
        <div className="absolute inset-0 bg-[#050508]" />

        {/* Dynamic Darkener for Contact Section */}
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: baseDimmer }} />

        {/* Global Cinema Light Leak */}
        <motion.div 
          className="absolute -top-[20vh] -left-[10vw] w-[120vw] h-[120vw] select-none" 
          style={{ 
            background: "radial-gradient(circle at center, rgba(108,142,255,0.4) 0%, transparent 60%)",
            animation: "mesh-shift 120s linear infinite",
            opacity: lightLeakOpacity
          }} 
        />
        
        {/* Global Soft Violet Glow */}
        <motion.div 
          className="absolute -bottom-[20vh] -right-[10vw] w-[100vw] h-[100vw] select-none" 
          style={{ 
            background: "radial-gradient(circle at center, rgba(139,92,246,0.3) 0%, transparent 60%)",
            opacity: violetGlowOpacity
          }} 
        />

        {/* Minimal structural grid site-wide */}
        <div 
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Soft global vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_10%,rgba(5,5,8,0.7)_100%)]" />
        
        {/* Cinematic noise overlay */}
        <div className="absolute inset-0 opacity-[0.012] mix-blend-overlay noise-overlay" />
      </div>

      {/* Cinematic Scroll Progress Indicator — Fixed to right screen edge */}
      <motion.div 
        className="fixed top-0 right-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.015)] pointer-events-none z-50 origin-right transition-opacity duration-500"
        style={{ opacity: indicatorOpacity }}
      >
        <motion.div 
          className="w-full bg-[var(--color-primary)] opacity-50 origin-top"
          style={{ scaleY, height: "100%" }}
        />
      </motion.div>
    </>
  );
}
