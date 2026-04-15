"use client";

import { useEffect, useRef } from "react";
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

  // ── Scroll-Linked Liquid Light Opacity ──
  // Hero (Atmospheric 85%) -> Featured (focus dimmed 45%) -> Contact (alive 62% presence)
  const liquidOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.85, 0.45, 0.45, 0.62]);

  // ── Phase 6: Full-Visibility Network Field Opacity ──
  // Stronger presence site-wide: Hero (32%) -> Featured (12%) -> Contact (22%)
  const networkOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.32, 0.12, 0.12, 0.22]);

  return (
    <>
      {/* Fixed global background container */}
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none select-none -z-50">
        
        {/* Base dark bg */}
        <div className="absolute inset-0 bg-[#050508]" />

        {/* ── Phase 3 & 4: Intelligent Network Field (Ghosted Intelligence) ── */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: networkOpacity }}
        >
          <NetworkField scrollYProgress={scrollYProgress} />
        </motion.div>

        {/* ── Liquid Light System ── */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: liquidOpacity }}
        >
          {/* Orb 1: Core Indigo */}
          <div 
             className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] mix-blend-screen opacity-[0.08]"
             style={{ 
               background: "radial-gradient(circle at center, rgba(99,102,241,1) 0%, transparent 60%)",
               filter: "blur(200px)",
               animation: "mesh-shift 83s linear infinite" 
             }}
          />
          {/* Orb 2: Aura Violet */}
          <div 
             className="absolute top-[20%] -right-[15%] w-[80vw] h-[60vw] mix-blend-screen opacity-[0.10]"
             style={{ 
               background: "radial-gradient(circle at center, rgba(139,92,246,1) 0%, transparent 60%)",
               filter: "blur(240px)",
               animation: "mesh-shift-2 107s linear infinite" 
             }}
          />
          {/* Orb 3: Highlight Cyan/Blue */}
          <div 
             className="absolute -bottom-[20%] left-[20%] w-[90vw] h-[50vw] mix-blend-screen opacity-[0.05]"
             style={{ 
               background: "radial-gradient(circle at center, rgba(56,189,248,1) 0%, transparent 60%)",
               filter: "blur(180px)",
               animation: "mesh-shift-3 131s linear infinite" 
             }}
          />
        </motion.div>

        {/* Minimal structural grid site-wide */}
        <div 
          className="absolute inset-0 opacity-[0.017]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(60deg, rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(-60deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px, 80px 80px, 160px 160px, 160px 160px"
          }}
        />
        
        {/* Soft global vignette */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_10%,rgba(5,5,8,0.7)_100%)]"
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [1, 0.65]) }}
        />
        
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

// ── Phase 4: NetworkField Engine with Ghosted Intelligence ──────────────────

interface NetworkFieldProps {
  scrollYProgress: MotionValue<number>;
}

function NetworkField({ scrollYProgress }: NetworkFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseVelRef = useRef({ x: 0, y: 0 });
  const ripplesRef = useRef<{ x: number, y: number, r: number, alpha: number, power: number }[]>([]);

  useEffect(() => {
    // Performance Guard: Skip on touch/low-power
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Sparse Config - Keeping same node count but increasing presence
    const pointCount = 34;
    const connectionRadius = 370; // Slight increase for richer structural geometry
    const points: { x: number; y: number; vx: number; vy: number; dx: number; dy: number; friction: number }[] = [];

    // Initialize sparse nodes
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15, 
        vy: (Math.random() - 0.5) * 0.15,
        dx: 0,
        dy: 0,
        friction: 0.90 + Math.random() * 0.04 // Slightly lower friction for more physical weight
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const sp = scrollYProgress.get();
      // Floor the intensity so Contact remains alive (min ~0.72)
      const globalIntensity = 1.0 - (sp * 0.28); 

      // Update & Filter Ripples
      ripplesRef.current = ripplesRef.current.filter(r => {
        r.r += 7; // Faster, high-energy pulse
        r.alpha *= 0.965; 
        return r.alpha > 0.01;
      });

      // Update positions & Draw
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // 1. Procedural Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // 2. High-Visibility Displacement (Interact/Drag)
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Larger interaction field
        if (dist < 300) {
          const force = (1 - dist / 300) * 18; // Pronounced 18px force displacement
          const angle = Math.atan2(dy, dx);
          
          p.dx += Math.cos(angle) * force * 0.12;
          p.dy += Math.sin(angle) * force * 0.12;
        }

        p.dx *= p.friction;
        p.dy *= p.friction;

        const renderX = p.x + p.dx;
        const renderY = p.y + p.dy;

        // 3. Tactile Perception: Activation Alpha
        let activationAlpha = 0;

        // Proximity Boost (Clearly perceivable 0.6 max)
        if (dist < 350) {
          activationAlpha += (1 - dist / 350) * 0.6;
        }

        // Ripple / Click Boost (High contrast pulse)
        for (const r of ripplesRef.current) {
          const rDx = renderX - r.x;
          const rDy = renderY - r.y;
          const rDist = Math.sqrt(rDx * rDx + rDy * rDy);
          const thickness = 140;
          if (Math.abs(rDist - r.r) < thickness) {
            const ripplePower = (1 - Math.abs(rDist - r.r) / thickness) * r.alpha;
            activationAlpha += ripplePower * 1.0;
            
            const rippleAngle = Math.atan2(rDy, rDx);
            p.dx += Math.cos(rippleAngle) * ripplePower * 8;
            p.dy += Math.sin(rippleAngle) * ripplePower * 8;
          }
        }

        // Final Node Rendering
        const finalNodeAlpha = (0.5 + (activationAlpha * 0.5)) * globalIntensity;
        ctx.fillStyle = `rgba(255, 255, 255, ${finalNodeAlpha})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, 1.4, 0, Math.PI * 2); // Larger, crisper nodes
        ctx.fill();

        // 4. Visible Connections
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const r2x = p2.x + p2.dx;
          const r2y = p2.y + p2.dy;
          const distNodes = Math.sqrt(Math.pow(renderX - r2x, 2) + Math.pow(renderY - r2y, 2));

          if (distNodes < connectionRadius) {
            const baseLineAlpha = (1 - distNodes / connectionRadius) * 0.52; // Slightly stronger baseline
            const finalLineAlpha = (baseLineAlpha + (activationAlpha * 0.5)) * globalIntensity;
            
            ctx.strokeStyle = `rgba(214, 224, 255, ${finalLineAlpha})`;
            ctx.lineWidth = 1.0 + (activationAlpha * 0.8); // High-visibility thickening
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(r2x, r2y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        return;
      }
      // Visible energy pulse on click
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 1.0, power: 1.0 });
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-70" // Slight master opacity limit to keep it premium
    />
  );
}
