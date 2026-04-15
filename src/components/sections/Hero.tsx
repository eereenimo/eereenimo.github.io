"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n";
import { copy } from "@/data/translations";

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
  const { locale } = useLanguage();
  const t = copy[locale].hero;

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
                  {t.availability}
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
                  {t.role}
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
              {t.statement}
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
                {t.workCta}
                <ArrowRight />
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                {t.contactCta}
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="mt-7 flex items-center gap-5"
              initial="hidden"
              animate="visible"
              variants={staggerVariants}
              transition={transition(0.7, 0.9)}
            >
              <SocialLink href="https://www.linkedin.com/in/eren-serdaroglu" label={t.linkedin}>
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href="https://github.com/eereenimo" label={t.github}>
                <GitHubIcon />
              </SocialLink>
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
          {t.scroll}
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

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.12em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-300"
    >
      <span className="opacity-65 group-hover:opacity-100 transition-opacity duration-300">
        {children}
      </span>
      <span className="relative">
        {label}
        <span className="absolute -bottom-1 left-0 h-px w-full bg-[var(--color-primary)] opacity-35 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
      </span>
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.94 8.5H3.5V20H6.94V8.5ZM7.17 4.95C7.17 3.95 6.42 3.2 5.22 3.2C4.03 3.2 3.28 3.95 3.28 4.95C3.28 5.93 4.01 6.7 5.18 6.7H5.2C6.42 6.7 7.17 5.93 7.17 4.95ZM20.72 13.39C20.72 9.89 18.85 8.26 16.35 8.26C14.34 8.26 13.44 9.37 12.94 10.15V8.5H9.5C9.54 9.59 9.5 20 9.5 20H12.94V13.58C12.94 13.23 12.97 12.89 13.07 12.64C13.34 11.95 13.96 11.23 15 11.23C16.36 11.23 16.9 12.26 16.9 13.78V20H20.34V13.39H20.72Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C6.48 2 2 6.6 2 12.26C2 16.79 4.87 20.63 8.84 21.98C9.34 22.08 9.52 21.76 9.52 21.49C9.52 21.24 9.51 20.41 9.5 19.52C6.73 20.14 6.14 18.3 6.14 18.3C5.68 17.08 5.03 16.75 5.03 16.75C4.12 16.11 5.1 16.12 5.1 16.12C6.1 16.19 6.63 17.18 6.63 17.18C7.52 18.75 8.96 18.3 9.54 18.03C9.63 17.37 9.89 16.92 10.18 16.66C7.97 16.4 5.65 15.5 5.65 11.47C5.65 10.32 6.04 9.38 6.69 8.63C6.59 8.37 6.25 7.31 6.79 5.87C6.79 5.87 7.63 5.59 9.5 6.9C10.29 6.68 11.14 6.57 12 6.57C12.86 6.57 13.71 6.68 14.5 6.9C16.37 5.59 17.21 5.87 17.21 5.87C17.75 7.31 17.41 8.37 17.31 8.63C17.96 9.38 18.35 10.32 18.35 11.47C18.35 15.51 16.03 16.39 13.81 16.65C14.17 16.98 14.5 17.61 14.5 18.57C14.5 19.95 14.49 21.15 14.49 21.49C14.49 21.76 14.67 22.09 15.18 21.98C19.15 20.63 22 16.79 22 12.26C22 6.6 17.52 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
