"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

// Proper type for Framer's useInView margin (CSS shorthand px values only)
type InViewMargin = `${number}px` | `${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`;

// ─── Easing library ────────────────────────────────────────────────────────
// Named easing curves — no magic numbers in usage sites

const ease = {
  /** Cinematic — effortless, weighted drop to rest */
  outExpo:   [0.19, 1,    0.22,  1  ] as number[],
  /** Slightly softer — good for secondary elements */
  outQuart:  [0.25, 1,    0.5,  1  ] as number[],
  /** Subtle — text/opacity fades */
  outSine:   [0.39, 0.58, 0.57, 1  ] as number[],
};

// ─── Variant library ────────────────────────────────────────────────────────

type Direction = "up" | "down" | "left" | "right" | "none";

function buildVariants(
  direction: Direction,
  distance: number,
  blur: boolean
): Variants {
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const sign = direction === "down" || direction === "right" ? 1 : -1;

  const hidden: Record<string, unknown> = { opacity: 0 };
  if (direction !== "none") hidden[axis] = sign * distance;
  if (blur) hidden.filter = "blur(5px)";

  const visible: Record<string, unknown> = { opacity: 1 };
  if (direction !== "none") visible[axis] = 0;
  if (blur) visible.filter = "blur(0px)";

  return { hidden, visible };
}

// ─── AnimatedReveal ────────────────────────────────────────────────────────

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  blur?: boolean;
  duration?: number;
  /** Override inView trigger margin */
  margin?: string;
}

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  blur = true,
  duration = 0.6,
  margin = "-80px 0px",
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as InViewMargin });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={buildVariants(direction, distance, blur)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: ease.outExpo,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer ────────────────────────────────────────────────────────

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between children */
  stagger?: number;
  /** Initial delay before stagger begins */
  delayChildren?: number;
  margin?: string;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
  margin = "-80px 0px",
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: margin as InViewMargin });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger item variants (used on children of StaggerContainer) ──────────

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: ease.outExpo,
    },
  },
};

// ─── FadeIn — simple opacity-only, for subtle appearances ─────────────────

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: ease.outSine }}
    >
      {children}
    </motion.div>
  );
}
