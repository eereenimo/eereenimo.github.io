"use client";

import { motion, HTMLMotionProps, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import React, { useRef, useState } from "react";

// Easing curves — precise, not generic
const EASE_OUT_EXPO: number[] = [0.16, 1, 0.3, 1];

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  id?: string;
  target?: string;
  rel?: string;
  size?: "sm" | "md" | "lg";
}

// Visual configs — each variant is carefully tuned
const variantConfig = {
  primary: {
    base: [
      "relative overflow-hidden",
      "bg-[var(--color-primary)] text-[#050508]",
      // Explicit weight — overrides the shared font-medium below
      "font-semibold tracking-[-0.01em]",
      // Soft inner highlight via pseudo-element — layered above bg, below text
      "after:absolute after:inset-0 after:z-0 after:pointer-events-none",
      "after:bg-gradient-to-b after:from-white/[0.22] after:to-transparent",
      "after:opacity-0 after:transition-opacity after:duration-250",
      "hover:after:opacity-100",
      // Children must sit above the after pseudo-element
      "[&>*]:relative [&>*]:z-10",
      // Layered shadow: soft rest shadow → defined lift on hover
      "shadow-[0_4px_12px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)]",
      "hover:shadow-[0_12px_32px_rgba(108,142,255,0.25),0_0_0_1px_rgba(108,142,255,0.4)]",
      "transition-[box-shadow,filter,transform] duration-300",
      "hover:brightness-105 hover:-translate-y-0.5",
      // Focus ring
      "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]",
      // Subtle Signature Shimmer (EPHEMERAL)
      "before:absolute before:inset-0 before:z-0",
      "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      "before:translate-x-[-150%] before:skew-x-[-20deg] hover:before:animate-[shimmer-sweep_6s_infinite]",
    ].join(" "),
    motion: {
      hover: { scale: 1.022 },
      tap: { scale: 0.962 },
    },
  },
  secondary: {
    base: [
      "bg-transparent",
      // Text fades from muted → full on hover
      "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
      // Border: visible at rest, primary-tinted on hover
      "border border-[rgba(255,255,255,0.12)]",
      "hover:border-[rgba(108,142,255,0.38)]",
      // Tinted glass fill on hover
      "hover:bg-[rgba(108,142,255,0.06)]",
      // Ambient glow on hover
      "hover:shadow-[0_0_24px_rgba(108,142,255,0.14)]",
      // Smooth transition covering all changing properties
      "transition-[border-color,background-color,box-shadow,color] duration-300",
      // Focus ring
      "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]",
    ].join(" "),
    motion: {
      hover: { scale: 1.016 },
      tap: { scale: 0.974 },
    },
  },
  ghost: {
    base: [
      "bg-transparent text-[var(--color-text-secondary)]",
      "hover:text-[var(--color-text)]",
      // Animated underline — grows from center outward
      "relative",
      "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
      "after:h-px after:w-0 after:bg-[var(--color-primary)]",
      "after:transition-[width] after:duration-300 after:ease-out",
      "hover:after:w-full",
      "transition-colors duration-200",
      // Focus ring
      "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]",
    ].join(" "),
    motion: {
      // No scale — ghost is intentionally flat on hover
      tap: { scale: 0.97 },
    },
  },
};

const sizeConfig = {
  sm: "px-5 py-2.5 text-xs gap-1.5",
  md: "px-7 py-3.5 text-sm gap-2",
  lg: "px-9 py-4   text-base gap-2.5",
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  id,
  target,
  rel,
  size = "md",
}: ButtonProps) {
  const config = variantConfig[variant];
  const buttonRef = useRef<any>(null);

  // ── Magnetic & Glow Physics ──
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Weighty, physical spring for the structural magnetic stretch (outer element)
  const springConfig = { mass: 0.1, stiffness: 120, damping: 14 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Raw coordinates for the inner reactive glow (fast follow)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 40, stiffness: 600 });
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 600 });
  const glowEffect = useMotionTemplate`radial-gradient(80px circle at ${glowX}px ${glowY}px, rgba(255,255,255,0.12), transparent)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    
    // Magnetic Pull
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Attenuated distance to prevent heavy dragging (approx 10-15% of distance)
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.2);

    // Inner Glow Positioning
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0); // Snap back structurally
  };

  const combined = [
    // Base reset — shape and layout only, no inherited weight
    "inline-flex items-center justify-center rounded-full",
    "cursor-pointer select-none focus-visible:outline-none",
    // Weight set per-variant in variantConfig, font-medium as fallback
    "font-medium relative overflow-hidden",
    sizeConfig[size],
    config.base,
    className,
  ].join(" ");

  const motionProps: HTMLMotionProps<"div"> = {
    whileHover: config.motion.hover,
    whileTap: config.motion.tap,
    transition: { duration: 0.15, ease: EASE_OUT_EXPO },
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  // The dynamic interactive glow layer inside the button
  const ReactiveGlow = () => (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
      style={{
        background: glowEffect,
        opacity: isHovered && variant !== "ghost" ? 1 : 0
      }}
    />
  );

  if (href) {
    return (
      <motion.a
        id={id}
        ref={buttonRef}
        href={href}
        target={target}
        rel={rel}
        className={combined}
        {...(motionProps as HTMLMotionProps<"a">)}
      >
        <ReactiveGlow />
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      id={id}
      onClick={onClick}
      className={combined}
      {...(motionProps as HTMLMotionProps<"button">)}
    >
      <ReactiveGlow />
      {children}
    </motion.button>
  );
}
