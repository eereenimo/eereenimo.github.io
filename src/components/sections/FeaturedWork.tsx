"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { projectsByLocale, type Project } from "@/data/projects";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AnimatedReveal, StaggerContainer, staggerItem } from "@/components/ui/AnimatedReveal";
import { useLanguage } from "@/lib/i18n";
import { copy } from "@/data/translations";

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
          <motion.div variants={staggerItem} className="flex flex-wrap gap-2 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={[
                  "inline-flex items-center px-3 py-1.5",
                  "rounded-full font-mono text-[11px] tracking-[0.06em]",
                  "border border-[rgba(255,255,255,0.06)]",
                  "bg-[rgba(255,255,255,0.02)]",
                  "text-[var(--color-text-secondary)]",
                  "transition-all duration-200",
                  "hover:border-[rgba(108,142,255,0.3)] hover:text-[var(--color-primary)]",
                ].join(" ")}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div variants={staggerItem} className="flex items-center gap-6 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "group relative inline-flex items-center gap-2",
                  "text-sm font-medium text-[var(--color-text)]",
                  "hover:text-[var(--color-primary)]",
                  "transition-colors duration-300",
                ].join(" ")}
              >
                {t.live}
                {/* Subtle underline shimmer */}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-primary)] opacity-50 transition-[width] duration-300 group-hover:w-full" />
                <ExternalLink />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "group relative inline-flex items-center gap-2",
                  "text-sm font-medium text-[var(--color-text-secondary)]",
                  "hover:text-[var(--color-text)]",
                  "transition-colors duration-300",
                ].join(" ")}
              >
                {t.github}
                {/* Subtle underline expansion */}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[rgba(255,255,255,0.4)] transition-[width] duration-300 group-hover:w-full" />
                <ExternalLink />
              </a>
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
  // Very constrained 3D tilt limit on hover
  const tiltVariants = {
    rest: { scale: 1, rotateX: 0, rotateY: 0 },
    hover: { scale: 1.01, rotateX: 1.5, rotateY: -1.5 },
  };

  return (
    <motion.div
      className={[
        "relative rounded-2xl overflow-hidden group",
        "border border-[rgba(255,255,255,0.06)]",
        "bg-[var(--color-surface)]",
        "cursor-default select-none",
      ].join(" ")}
      initial="rest"
      whileHover="hover"
      variants={tiltVariants}
      transition={{ duration: 0.6, ease: EASE_EXPO as number[] }}
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

      {/* Route to specific bespoke visual */}
      {project.id === "tonepilot" && <TonePilotVisual project={project} />}
      {project.id === "barsan" && <BarsanVisual project={project} />}
      {project.id === "mobile-ai" && <MobileAIVisual project={project} />}

      {/* Fallback pattern for any missing IDs */}
      {!["tonepilot", "barsan", "mobile-ai"].includes(project.id) && (
        <GenericAbstractVisual project={project} />
      )}
    </motion.div>
  );
}

// ─── Bespoke Mockups ───────────────────────────────────────────────────────

function TonePilotVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] w-full bg-[#09090E] overflow-hidden flex flex-col p-6">
      {/* Glow */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_0%,rgba(108,142,255,0.08)_0%,transparent_40%)] pointer-events-none" />
      
      {/* Editor Mockup Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.04)] mb-6 z-10 relative">
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
        </div>
        <div className="px-3 py-1 bg-[rgba(108,142,255,0.06)] border border-[rgba(108,142,255,0.1)] rounded-md text-[10px] font-mono text-[var(--color-primary-dim)]">
          TonePilot Engine v2.4
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 rounded-xl bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.03)] p-6 relative overflow-hidden z-10 shadow-2xl">
        <div className="space-y-4">
          <div className="h-3 rounded-full bg-[rgba(255,255,255,0.06)] w-[85%]" />
          <div className="h-3 rounded-full bg-[rgba(255,255,255,0.06)] w-[65%]" />
          <div className="flex gap-3 items-center">
            <div className="h-3 rounded-full bg-[rgba(108,142,255,0.2)] w-[80%]" />
             <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] opacity-50 animate-pulse" />
          </div>
          <div className="h-3 rounded-full bg-[rgba(255,255,255,0.06)] w-[50%]" />
        </div>

        {/* Suggestion popover */}
        <div className="absolute -bottom-2 -right-2 w-52 bg-[rgba(15,15,22,0.95)] backdrop-blur-xl rounded-tl-xl border-l border-t border-[rgba(255,255,255,0.06)] p-4 shadow-[-8px_-8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 mb-3">
             <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] opacity-80" />
             <span className="text-[10px] text-[var(--color-text)] tracking-wide font-medium">Tone Realigned</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.1)] w-full" />
            <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.1)] w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BarsanVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] w-full bg-[#050508] overflow-hidden p-6 grid grid-cols-12 grid-rows-6 gap-3">
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      {/* Sidebar nav block */}
      <div className="row-span-6 col-span-3 border border-[rgba(255,255,255,0.04)] rounded-xl bg-[rgba(255,255,255,0.015)] p-4 flex flex-col gap-4">
        <div className="h-6 w-full rounded bg-[rgba(0,212,255,0.1)] mb-4" />
        <div className="space-y-3">
          <div className="h-1.5 rounded bg-[rgba(255,255,255,0.05)] w-full" />
          <div className="h-1.5 rounded bg-[rgba(255,255,255,0.05)] w-5/6" />
          <div className="h-1.5 rounded bg-[rgba(255,255,255,0.05)] w-4/5" />
        </div>
      </div>

      {/* Top metric block */}
      <div className="col-span-9 row-span-2 border border-[rgba(255,255,255,0.04)] rounded-xl bg-[rgba(255,255,255,0.015)] p-4 flex items-end">
         <div className="w-full flex items-end gap-2 h-full opacity-60">
            <div className="w-1/6 h-[30%] bg-[rgba(0,212,255,0.1)] rounded-t-sm" />
            <div className="w-1/6 h-[50%] bg-[rgba(0,212,255,0.15)] rounded-t-sm" />
            <div className="w-1/6 h-[80%] bg-[rgba(0,212,255,0.25)] rounded-t-sm" />
            <div className="w-1/6 h-[40%] bg-[rgba(0,212,255,0.15)] rounded-t-sm" />
            <div className="w-1/6 h-[100%] bg-[rgba(0,212,255,0.3)] rounded-t-sm" />
            <div className="w-1/6 h-[70%] bg-[rgba(0,212,255,0.2)] rounded-t-sm" />
         </div>
      </div>

      {/* Middle content list */}
      <div className="col-span-6 row-span-4 border border-[rgba(255,255,255,0.04)] rounded-xl bg-[rgba(255,255,255,0.015)] p-5 flex flex-col gap-4">
         {[1,2,3].map((i) => (
           <div key={i} className="flex gap-3 items-center">
             <div className="w-8 h-8 rounded bg-[rgba(255,255,255,0.04)] shrink-0" />
             <div className="flex-1 space-y-1.5">
               <div className="h-1.5 rounded bg-[rgba(255,255,255,0.08)] w-3/4" />
               <div className="h-1.5 rounded bg-[rgba(255,255,255,0.03)] w-1/2" />
             </div>
           </div>
         ))}
      </div>

      {/* Map/Highlight block */}
      <div className="col-span-3 row-span-4 border border-[rgba(255,255,255,0.04)] rounded-xl bg-[rgba(255,255,255,0.015)] relative overflow-hidden flex items-center justify-center">
         <div className="w-20 h-20 rounded-full border border-[rgba(0,212,255,0.1)]" />
         <div className="absolute w-12 h-12 rounded-full border border-[rgba(0,212,255,0.2)]" />
         <div className="absolute w-2 h-2 rounded-full bg-[rgba(0,212,255,0.6)]" />
         <div className="absolute bottom-0 right-0 w-24 h-24 bg-[rgba(0,212,255,0.08)] blur-2xl" />
      </div>
    </div>
  );
}

function MobileAIVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] w-full bg-[#050508] overflow-hidden flex items-center justify-center">
      {/* Subtle organic shape behind phone */}
      <div className="absolute w-[90%] h-[90%] bg-[rgba(139,92,246,0.04)] blur-[80px] rounded-full pointer-events-none" />

      {/* Phone Silhouette */}
      <div className="relative w-[32%] max-w-[180px] aspect-[9/19] rounded-[2.25rem] border-[3px] border-[rgba(255,255,255,0.03)] bg-[rgba(20,20,26,0.5)] backdrop-blur-xl shadow-[0_32px_64px_rgba(0,0,0,0.6)] p-2.5 flex flex-col items-center">
         {/* Dynamic Island */}
         <div className="w-14 h-4 bg-[rgba(0,0,0,0.6)] rounded-full mt-1.5 shadow-inner" />
         
         {/* App content skeleton */}
         <div className="flex-1 w-full mt-6 flex flex-col gap-3 px-1">
            {/* Visual focus element */}
            <div className="aspect-square rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] w-full relative overflow-hidden flex items-center justify-center mb-2">
               <div className="w-10 h-10 rounded-full bg-[rgba(139,92,246,0.15)] blur-md absolute" />
               <div className="w-6 h-6 rounded-full border border-[rgba(139,92,246,0.4)]" />
            </div>
            
            {/* Context chips */}
            <div className="flex gap-2">
               <div className="h-5 rounded-full bg-[rgba(255,255,255,0.04)] w-1/3" />
               <div className="h-5 rounded-full bg-[rgba(255,255,255,0.04)] w-1/4" />
            </div>

            {/* List items */}
            <div className="flex-1 space-y-2.5 mt-2">
               <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.01)] rounded-lg p-2 border border-[rgba(255,255,255,0.02)]">
                  <div className="w-6 h-6 rounded-md bg-[rgba(139,92,246,0.1)] shrink-0" />
                  <div className="flex-1 space-y-1">
                     <div className="h-1 rounded bg-[rgba(255,255,255,0.1)] w-3/4" />
                     <div className="h-1 rounded bg-[rgba(255,255,255,0.05)] w-1/2" />
                  </div>
               </div>
               <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.01)] rounded-lg p-2 border border-[rgba(255,255,255,0.02)]">
                  <div className="w-6 h-6 rounded-md bg-[rgba(255,255,255,0.02)] shrink-0" />
                  <div className="flex-1 space-y-1">
                     <div className="h-1 rounded bg-[rgba(255,255,255,0.08)] w-2/3" />
                     <div className="h-1 rounded bg-[rgba(255,255,255,0.04)] w-1/2" />
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom bar */}
         <div className="h-[2px] w-1/3 bg-[rgba(255,255,255,0.15)] rounded-full mt-3 mb-1" />
      </div>
    </div>
  );
}

function GenericAbstractVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] w-full bg-[#050508] overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(circle at center, ${project.accentColor} 0%, transparent 60%)`,
        }}
      />
      <span className="font-mono text-[var(--color-text-secondary)] opacity-20 text-[11px] tracking-widest uppercase">
        {project.visualLabel}
      </span>
    </div>
  );
}

// ─── Inline icons ───────────────────────────────────────────────────────────

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
