"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useLanguage } from "@/lib/i18n";
import { copy } from "@/data/translations";

export function AcademicJourney() {
  const { locale } = useLanguage();
  const t = copy[locale].journey;
  const steps = t.steps;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState<[string, string]>(["0px", "0px"]);

  useEffect(() => {
    const calculateScroll = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      // Calculate scroll distance to align the end of the track to the right viewport edge
      const maxTranslate = Math.max(0, trackWidth - viewportWidth);
      setXRange(["0px", `-${maxTranslate}px`]);
    };

    calculateScroll();

    const resizeObserver = new ResizeObserver(() => {
      calculateScroll();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", calculateScroll);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateScroll);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <div
      ref={containerRef}
      id="journey"
      className="relative w-full h-[300vh] bg-transparent"
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

      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 md:py-16 bg-transparent">
        {/* Title area */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 w-full flex-shrink-0">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <SectionEyebrow className="mb-1">{t.eyebrow}</SectionEyebrow>
            <h2 className="text-display text-[var(--color-text)]">
              {t.titleMain}
            </h2>
            <p className="text-subheading text-[var(--color-text-secondary)] max-w-2xl mt-1 font-light">
              {t.titleSub}
            </p>
          </div>
        </div>

        {/* Scrollable Track */}
        <div className="relative flex-1 flex items-center overflow-hidden w-full my-4 md:my-6">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex flex-row items-center gap-[40px] md:gap-[120px] px-6 md:pl-[calc((100vw-1200px)/2+2.5rem)] md:pr-[calc((100vw-1200px)/2+2.5rem)]"
          >
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group select-none
                    ${
                      isLast
                        ? "w-[90vw] md:w-[600px] h-[336px] md:h-[408px] border-[var(--color-primary)]/20 shadow-[0_0_50px_rgba(108,142,255,0.05)]"
                        : "w-[75vw] md:w-[500px] h-[280px] md:h-[340px]"
                    }
                  `}
                >
                  {/* Subtle top light effect (Liquid Light) */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  {/* Top content */}
                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-5">
                      <span className="font-mono text-xs md:text-sm tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-60">
                        {step.number}
                      </span>
                      <span className="font-mono text-[10px] md:text-xs tracking-wider text-[var(--color-text-muted)] bg-[rgba(255,255,255,0.03)] px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.04)]">
                        {step.period}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-[var(--color-text)] tracking-tight mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[10px] font-mono text-[var(--color-text-muted)] tracking-wide uppercase mb-3">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Body description */}
                  <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-text-secondary)] font-normal">
                    {step.text}
                  </p>

                  {/* Decorative background number */}
                  <span className="absolute -bottom-8 -right-4 font-mono text-[10rem] font-black leading-none text-[rgba(255,255,255,0.015)] select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:text-[rgba(255,255,255,0.025)]">
                    {step.number}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 w-full flex-shrink-0">
          <div className="h-[2px] w-full bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden relative">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute left-0 top-0 bottom-0 right-0 bg-gradient-to-r from-[var(--color-primary)]/50 to-[var(--color-primary)] origin-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

