"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { projectsByLocale, type Project } from "@/data/projects";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AnimatedReveal, StaggerContainer, staggerItem } from "@/components/ui/AnimatedReveal";
import { useLanguage } from "@/lib/i18n";
import { copy } from "@/data/translations";
import Image from "next/image";

const EASE_EXPO = [0.16, 1, 0.3, 1];

export function FeaturedWork() {
  const { locale } = useLanguage();
  const t = copy[locale].work;
  const projects = projectsByLocale[locale];

  return (
    <section
      id="work"
      aria-label="Featured projects"
      className="section-padding relative"
    >
      {/* Subtle top separator line */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        {/* Section header */}
        <AnimatedReveal className="mb-20 sm:mb-24">
          <SectionEyebrow className="mb-5">{t.eyebrow}</SectionEyebrow>
          <h2 className="text-headline max-w-md text-[var(--color-text)]">
            {t.titleStart}{" "}
            <span className="text-[var(--color-primary)] opacity-80">{t.titleShip}</span>
            {t.titleAnd ? <> {" "}{t.titleAnd} </> : " "}
            <span className="text-[var(--color-primary)] opacity-80">{t.titleScale}</span>
          </h2>
        </AnimatedReveal>

        {/* Project list */}
        <div className="flex flex-col gap-[20vh] sm:gap-[30vh]">
          {projects.map((project, index) => (
            <div key={project.id} className="relative z-10 w-full">
              <ProjectModule
                project={project}
                index={index}
                flip={index % 2 !== 0}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ProjectModule ─────────────────────────────────────────────────────────

interface ProjectModuleProps {
  project: Project;
  index: number;
  flip: boolean;
  locale: "en" | "tr";
}

function ProjectModule({ project, index, flip, locale }: ProjectModuleProps) {
  const containerRef = useRef<HTMLElement>(null);
  const t = copy[locale].work;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Very subtle parallax effect for the visual column
  const visualY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Cinematic Light Field System (Max 1.5% opacity per constraint)
  const lightFieldOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6, 0.8],
    [0, 0.015, 0.015, 0]
  );

  // Cinematic Blur System (Restrained: 3px blur max on entry/exit)
  const blurValue = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.65, 0.85],
    [3, 0, 0, 3]
  );
  
  // Cinematic Module Fade
  const moduleOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.7, 0.9],
    [0, 1, 1, 0]
  );

  // Combine blur for filter property
  const blurFilter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <>
      {/* Light Field Boundary (Fixed, controlled by this module's scroll progress) */}
      <motion.div 
        className="fixed inset-0 pointer-events-none -z-40 flex items-center justify-center mix-blend-screen"
        style={{ opacity: lightFieldOpacity }}
        aria-hidden="true"
      >
        <div 
          className="w-[200vw] h-[200vh] rounded-full blur-[140px]" 
          style={{ backgroundColor: project.accentColor }} 
        />
      </motion.div>

      <motion.article
        ref={containerRef}
        aria-label={`Project: ${project.title}`}
        style={{ opacity: moduleOpacity, filter: blurFilter }}
        className={[
          "relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
          "py-10",
          flip ? "lg:[direction:rtl]" : "",
        ].join(" ")}
      >
      {/* ── Text side ─────────────────────────────────────────────── */}
      <div className={flip ? "lg:[direction:ltr]" : ""}>
        <StaggerContainer className="flex flex-col gap-6">
          {/* Project number + tag */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-4"
          >
            <span
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-text-muted)]"
              aria-hidden="true"
            >
              {project.number}
            </span>
            <span className="h-px w-8 bg-[var(--color-text-muted)] opacity-40" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-text-secondary)]">
              {project.tag}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            variants={staggerItem}
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-[var(--color-text)] leading-tight"
          >
            {project.title}
          </motion.h3>

          {/* Problem */}
          <motion.div variants={staggerItem} className="space-y-1.5">
            <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-50">
              {t.problem}
            </p>
            <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
              {project.problem}
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div variants={staggerItem} className="space-y-1.5">
            <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-50">
              {t.solution}
            </p>
            <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
              {project.solution}
            </p>
          </motion.div>

          {/* Stack pills */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-2.5 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={[
                  "inline-flex items-center gap-2 px-4 py-2",
                  "rounded-full font-mono text-[13px] tracking-[0.04em]",
                  "border border-[var(--color-border)]",
                  "bg-[var(--color-surface)] backdrop-blur-sm",
                  "text-[var(--color-text-secondary)]",
                  "transition-all duration-300",
                  "hover:border-[var(--color-primary-dim)] hover:text-[var(--color-primary)] hover:shadow-[0_0_15px_var(--color-glow)]",
                ].join(" ")}
              >
                <TechIcon name={tech} />
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: `0 0 20px ${project.accentColor}30` 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25 
                }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-[var(--color-primary-dim)] bg-[var(--color-primary)] text-white shadow-lg transition-colors duration-300 hover:bg-transparent hover:text-[var(--color-primary)]"
              >
                <span>{t.live}</span>
                <ExternalLink />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: `0 0 20px rgba(108,142,255,0.15)` 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25 
                }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md text-[var(--color-text-secondary)] transition-colors duration-300 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.25)] hover:text-[var(--color-text)]"
              >
                <span>{t.github}</span>
                <ExternalLink />
              </motion.a>
            )}
          </motion.div>
        </StaggerContainer>
      </div>

      {/* ── Visual side ───────────────────────────────────────────── */}
      <motion.div
        style={{ y: visualY }}
        className={flip ? "lg:[direction:ltr]" : ""}
      >
        <AnimatedReveal
          direction={flip ? "left" : "right"}
          delay={0.15}
        >
          <ProjectVisual project={project} />
        </AnimatedReveal>
      </motion.div>
    </motion.article>
    </>
  );
}

// ─── ProjectVisual Routing ──────────────────────────────────────────────────

function ProjectVisual({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 20px 45px ${project.accentColor}20, 0 0 25px ${project.accentColor}12` 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }}
      className={[
        "relative rounded-2xl overflow-hidden group",
        "border border-[rgba(255,255,255,0.06)]",
        "bg-[var(--color-surface)]",
        "cursor-default select-none shadow-2xl",
      ].join(" ")}
      style={{ perspective: 1000 }}
    >
      {/* Shared Hover Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-[opacity,box-shadow] duration-700 pointer-events-none rounded-2xl z-10"
        style={{
          boxShadow: `inset 0 0 60px ${project.accentColor}10`,
        }}
        aria-hidden="true"
      />

      {/* Render the interactive screenshot carousel */}
      <ProjectCarousel project={project} />
    </motion.div>
  );
}

// ─── Bespoke Image Gallery Carousel ─────────────────────────────────────────

function ProjectCarousel({ project }: { project: Project }) {
  const images = project.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (images.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === "ArrowLeft") {
      handlePrev();
    }
  };

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // pixels
    if (diffX > swipeThreshold) {
      handleNext();
    } else if (diffX < -swipeThreshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Slide variants for smooth slider animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] w-full bg-[#050508] overflow-hidden flex items-center justify-center">
        <span className="font-mono text-[var(--color-text-secondary)] opacity-20 text-[11px] tracking-widest uppercase">
          {project.visualLabel}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={touchStartX => {} /* Handled via standard props */}
      onTouchStartCapture={handleTouchStart}
      onTouchMoveCapture={handleTouchMove}
      onTouchEndCapture={handleTouchEnd}
      className="relative w-full aspect-[4/3] overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
      style={{
        background: "#050508",
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* ── Background fill layer: blurred, scaled, low opacity ── */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={images[currentIndex]}
              alt=""
              width={1200}
              height={900}
              className="w-full h-full object-cover"
              style={{
                filter: "blur(40px)",
                transform: "scale(1.15)",
                opacity: 0.30,
              }}
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* ── Foreground: full screenshot, never cropped ── */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src={images[currentIndex]}
              alt={`${project.title} - Screenshot ${currentIndex + 1}`}
              width={1200}
              height={900}
              className="w-full h-full object-contain"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(15,15,22,0.65)] hover:bg-[rgba(15,15,22,0.9)] border border-[rgba(255,255,255,0.08)] text-white/70 hover:text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(15,15,22,0.65)] hover:bg-[rgba(15,15,22,0.9)] border border-[rgba(255,255,255,0.08)] text-white/70 hover:text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: idx === currentIndex ? "12px" : "6px",
                backgroundColor: idx === currentIndex ? project.accentColor : "rgba(255, 255, 255, 0.35)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

// ─── Inline icons ───────────────────────────────────────────────────────────

function TechIcon({ name }: { name: string }) {
  const iconSize = 14;
  const lowerName = name.toLowerCase();

  // Mapping technologies to simple SVG icons
  if (lowerName.includes("next")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" />
      </svg>
    );
  }
  if (lowerName.includes("react")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" /><path d="M12 2v2m0 16v2m8-10h2M2 12h2" /><path d="m19.07 4.93-1.41 1.41m-11.32 11.32-1.41 1.41m14.14 0-1.41-1.41M6.34 6.34 4.93 4.93" />
      </svg>
    );
  }
  if (lowerName.includes("type")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V4h16v3M9 20h6M12 4v16" />
      </svg>
    );
  }
  if (lowerName.includes("tail")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="22" />
      </svg>
    );
  }
  if (lowerName.includes("ai") || lowerName.includes("open")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /><circle cx="12" cy="12" r="4" />
      </svg>
    );
  }
  if (lowerName.includes("cms") || lowerName.includes("strap")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    );
  }
  if (lowerName.includes("dock")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 7.6L13 2 4 7.6v6.8L13 20l9-5.6V7.6z" /><path d="M13 13.4V2M4 7.6L13 12l9-4.4M8 10.1v4.4L13 17l5-2.5V10" />
      </svg>
    );
  }
  if (lowerName.includes("fire")) {
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 3.333 4 5 1.237 1.031 3 2.031 3 4a7 7 0 1 1-14 0c0-2 1.5-3.5 3-5.5.5 1.5 1.5 3 2.5 4Z" />
      </svg>
    );
  }

  // Default code icon
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ExternalLink() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M2 10L10 2M10 2H5M10 2V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
