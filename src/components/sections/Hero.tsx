"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

// Easing — heavily dampened exponential ease-out for effortless motion
const EASE_EXPO = [0.19, 1, 0.22, 1];

const transition = (delay: number, duration = 1.2) => ({
  delay,
  duration,
  ease: EASE_EXPO as number[],
});

const staggerVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex items-center min-h-[100dvh] pt-24 pb-12 overflow-hidden bg-transparent"
    >


      {/* ── Main content ──────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10"
        style={{ y: contentY, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <motion.div
              className="mb-8"
              initial="hidden"
              animate="visible"
              variants={staggerVariants}
              transition={transition(0.1)}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-green-pulse)] opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-green-pulse)]"></span>
                </span>
                <span className="text-[11px] font-mono tracking-[0.1em] text-[var(--color-text-secondary)] uppercase">
                  Available for new opportunities
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              className="mb-6 xl:mb-8"
              initial="hidden"
              animate="visible"
              variants={staggerVariants}
              transition={transition(0.25)}
            >
              <h1 className="flex flex-col text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-[-0.04em] ml-[-0.02em] leading-[1.05]">
                <span className="text-[var(--color-text)]">
                  Eren Serdaroğlu.
                </span>
                <span className="text-[clamp(1.5rem,3vw,2.25rem)] text-[var(--color-text-secondary)] font-normal mt-4 leading-[1.1] tracking-[-0.02em]">
                  Full-Stack Engineer.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Statement */}
            <motion.p
              className="max-w-[520px] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65] text-[rgba(240,240,248,0.55)] font-light mb-10"
              initial="hidden"
              animate="visible"
              variants={staggerVariants}
              transition={transition(0.4)}
            >
              I architect and build digital products that balance elegant engineering with premium visual polish. Focused on performance, scalability, and exceptional user experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial="hidden"
              animate="visible"
              variants={staggerVariants}
              transition={transition(0.55)}
            >
              <Button href="#work" variant="primary" size="lg">
                View My Work
                <ArrowRight />
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Architecture Slab (Product Architecture) */}
          <div className="lg:col-span-5 hidden lg:flex justify-end items-center relative perspective-[1200px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, x: 20, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 2, ease: EASE_EXPO, delay: 0.4 }}
              className="relative w-full aspect-[4/5] max-w-[380px] ml-auto group"
            >
              {/* Sinusoidal Float Container */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Architecture Slab */}
                <div className="relative w-full h-full rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(13,13,20,0.2)] backdrop-blur-2xl shadow-[0_48px_96px_rgba(0,0,0,0.4),inset_0_1px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col p-8 font-mono section-eyebrow">
                  
                  {/* Subtle Code Glimpse (Reduced contrast for background hint feel) */}
                  <div className="space-y-4 opacity-[0.25] select-none pointer-events-none">
                    <div className="flex gap-4">
                      <span className="text-[rgba(255,255,255,0.05)] text-[10px]">01</span>
                      <p className="text-[12px] tracking-tight text-[rgba(255,255,255,0.2)]">
                        <span className="text-[rgba(255,255,255,0.1)]">export</span> <span className="text-[rgba(108,142,255,0.3)]">interface</span> AIProductEngine {"{"}
                      </p>
                    </div>
                    <div className="flex gap-4 pl-4">
                      <span className="text-[rgba(255,255,255,0.05)] text-[10px]">02</span>
                      <p className="text-[12px] tracking-tight text-[rgba(255,255,255,0.15)]">
                        model: <span className="text-[rgba(0,212,255,0.2)]">"TonePilot-01"</span>;
                      </p>
                    </div>
                    <div className="flex gap-4 pl-4">
                      <span className="text-[rgba(255,255,255,0.05)] text-[10px]">03</span>
                      <p className="text-[12px] tracking-tight text-[rgba(255,255,255,0.15)]">
                        integrity: <span className="text-[rgba(108,142,255,0.3)]">0.98</span>;
                      </p>
                    </div>
                    <div className="flex gap-4 pl-4">
                      <span className="text-[rgba(255,255,255,0.05)] text-[10px]">04</span>
                      <p className="text-[12px] tracking-tight text-[rgba(255,255,255,0.15)]">
                        optimized: <span className="text-[rgba(34,197,94,0.3)]">true</span>;
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[rgba(255,255,255,0.05)] text-[10px]">05</span>
                      <p className="text-[12px] tracking-tight text-[rgba(255,255,255,0.1)]">{"}"}</p>
                    </div>
                  </div>

                  {/* Surface Detail: Extremely subtle Prismatic Reflection */}
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.5)] to-transparent" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition(1.0)}
        style={{ opacity }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-text-secondary)] opacity-80">
          Scroll
        </span>
        <div 
          className="w-px h-12 bg-gradient-to-b from-[var(--color-text-secondary)] to-transparent" 
          style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
}

// ─── Inline SVG helpers ──────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
