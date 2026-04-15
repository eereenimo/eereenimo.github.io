"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { useLanguage } from "@/lib/i18n";
import { copy } from "@/data/translations";

export function Vision() {
  const { locale } = useLanguage();
  const t = copy[locale].vision;

  return (
    <section
      id="vision"
      aria-label="Vision"
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
        <AnimatedReveal className="mb-12 sm:mb-14">
          <SectionEyebrow className="mb-5">{t.eyebrow}</SectionEyebrow>
          <h2 className="text-headline max-w-3xl text-[var(--color-text)]">
            {t.titleStart}{" "}
            <span className="text-[var(--color-primary)] opacity-80">{t.precise}</span>,{" "}
            <span className="text-[var(--color-primary)] opacity-80">{t.human}</span>,{" "}
            <span className="text-[var(--color-primary)] opacity-80">{t.durable}</span>.
          </h2>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl p-7 sm:p-10">
            <p className="text-body text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
              {t.body}
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] p-5">
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-60 mb-2">
                  {t.clarityTitle}
                </p>
                <p className="text-body text-[var(--color-text-secondary)]">
                  {t.clarityText}
                </p>
              </div>
              <div className="rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] p-5">
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-60 mb-2">
                  {t.eleganceTitle}
                </p>
                <p className="text-body text-[var(--color-text-secondary)]">
                  {t.eleganceText}
                </p>
              </div>
              <div className="rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] p-5">
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-60 mb-2">
                  {t.qualityTitle}
                </p>
                <p className="text-body text-[var(--color-text-secondary)]">
                  {t.qualityText}
                </p>
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
