"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring, type MotionValue } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function GlobalAtmosphere() {
  const { scrollYProgress, scrollY } = useScroll();
  const { theme } = useTheme();
  
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
  // Adjusted for Light Theme to be more prominent
  const networkOpacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.8, 1], 
    theme === 'light' ? [0.65, 0.35, 0.35, 0.45] : [0.32, 0.12, 0.12, 0.22]
  );

  return (
    <>
      {/* Fixed global background container */}
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none select-none -z-50 bg-[var(--bg)] transition-colors duration-500">
        
        {/* ── Phase 3 & 4: Intelligent Network Field (Ghosted Intelligence) ── */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: networkOpacity }}
        >
          <NetworkField scrollYProgress={scrollYProgress} theme={theme} />
        </motion.div>

        {/* ── Liquid Light System ── */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: liquidOpacity }}
        >
          {/* Orb 1: Core Indigo / Slate */}
          <div 
             className="gradient-orb absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] opacity-[var(--orb-opacity,0.08)]"
             style={{ 
               background: "radial-gradient(circle at center, rgba(var(--orb-rgb-1), 1) 0%, transparent 60%)",
               filter: "blur(200px)",
               animation: "mesh-shift 83s linear infinite" 
             }}
          />
          {/* Orb 2: Aura Violet / Slate */}
          <div 
             className="gradient-orb absolute top-[20%] -right-[15%] w-[80vw] h-[60vw] opacity-[var(--orb-opacity,0.10)]"
             style={{ 
               background: "radial-gradient(circle at center, rgba(var(--orb-rgb-2), 1) 0%, transparent 60%)",
               filter: "blur(240px)",
               animation: "mesh-shift-2 107s linear infinite" 
             }}
          />
          {/* Orb 3: Highlight Cyan / Slate */}
          <div 
             className="gradient-orb absolute -bottom-[20%] left-[20%] w-[90vw] h-[50vw] opacity-[var(--orb-opacity,0.05)]"
             style={{ 
               background: "radial-gradient(circle at center, rgba(var(--orb-rgb-3), 1) 0%, transparent 60%)",
               filter: "blur(180px)",
               animation: "mesh-shift-3 131s linear infinite" 
             }}
          />
        </motion.div>

        {/* Minimal structural grid site-wide */}
        <div 
          className="absolute inset-0 opacity-[var(--grid-opacity,0.017)] transition-opacity duration-500"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px),
              linear-gradient(60deg, currentColor 1px, transparent 1px),
              linear-gradient(-60deg, currentColor 1px, transparent 1px)
            `,
            color: "var(--color-text)",
            backgroundSize: "80px 80px, 80px 80px, 160px 160px, 160px 160px"
          }}
        />
        
        {/* Soft global vignette */}
        <motion.div
          className="absolute inset-0"
          style={{ 
            background: "radial-gradient(ellipse at 50% 40%, transparent 10%, var(--bg) 100%)",
            opacity: useTransform(scrollYProgress, [0, 1], [0.7, 0.4]) 
          }}
        />
        
        {/* Cinematic noise overlay */}
        <div className="absolute inset-0 opacity-[0.012] noise-overlay" />
      </div>

      {/* Cinematic Scroll Progress Indicator — Fixed to right screen edge */}
      <motion.div 
        className="fixed top-0 right-0 bottom-0 w-[1px] bg-[var(--color-primary)] pointer-events-none z-50 origin-right transition-all duration-500"
        style={{ opacity: useTransform(indicatorOpacity, (v) => Number(v) + (theme === 'light' ? 0.05 : 0)) }}
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
  theme: string | undefined;
}

function NetworkField({ scrollYProgress, theme }: NetworkFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef<{ x: number, y: number, r: number, alpha: number, power: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const pointCount = 34;
    const connectionRadius = 370;
    const points: { x: number; y: number; vx: number; vy: number; dx: number; dy: number; friction: number }[] = [];

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15, 
        vy: (Math.random() - 0.5) * 0.15,
        dx: 0,
        dy: 0,
        friction: 0.90 + Math.random() * 0.04
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const sp = scrollYProgress.get();
      const globalIntensity = 1.0 - (sp * 0.28); 

      ripplesRef.current = ripplesRef.current.filter(r => {
        r.r += 7;
        r.alpha *= 0.965; 
        return r.alpha > 0.01;
      });

      // Theme-based colors
      const nodeRgb = theme === 'dark' ? '255, 255, 255' : '15, 23, 42';
      const lineRgb = theme === 'dark' ? '214, 224, 255' : '108, 142, 255';
      const rippleColor = theme === 'dark' ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,';

      // Draw Ripples (Actual visible circles)
      ripplesRef.current.forEach(r => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${rippleColor} ${r.alpha * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          const force = (1 - dist / 300) * 18;
          const angle = Math.atan2(dy, dx);
          p.dx += Math.cos(angle) * force * 0.12;
          p.dy += Math.sin(angle) * force * 0.12;
        }

        p.dx *= p.friction;
        p.dy *= p.friction;

        const renderX = p.x + p.dx;
        const renderY = p.y + p.dy;

        let activationAlpha = 0;
        if (dist < 350) activationAlpha += (1 - dist / 350) * (theme === 'light' ? 0.9 : 0.6);

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

        const finalNodeAlpha = (0.5 + (activationAlpha * 0.5)) * globalIntensity * (theme === 'light' ? 0.7 : 1);
        ctx.fillStyle = `rgba(${nodeRgb}, ${finalNodeAlpha})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, 1.4, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const r2x = p2.x + p2.dx;
          const r2y = p2.y + p2.dy;
          const distNodes = Math.sqrt(Math.pow(renderX - r2x, 2) + Math.pow(renderY - r2y, 2));

          if (distNodes < connectionRadius) {
            const baseLineAlpha = (1 - distNodes / connectionRadius) * 0.52;
            const finalLineAlpha = (baseLineAlpha + (activationAlpha * 0.5)) * globalIntensity * (theme === 'light' ? 0.6 : 1);
            ctx.strokeStyle = `rgba(${lineRgb}, ${finalLineAlpha})`;
            ctx.lineWidth = 1.0 + (activationAlpha * 0.8);
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
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) return;
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
  }, [scrollYProgress, theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${theme === 'light' ? 'opacity-100' : 'opacity-70'}`}
    />
  );
}
