"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { useLanguage } from "@/lib/i18n";
import { copy } from "@/data/translations";

export function AcademicJourney() {
  const { locale } = useLanguage();
  const t = copy[locale].journey;

  return (
    <section
      id="journey"
      aria-label="Academic journey"
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
          <h2 className="text-headline max-w-2xl text-[var(--color-text)]">
            {t.titleStart}{" "}
            <span className="text-[var(--color-primary)] opacity-80">{t.titleMid}</span> {t.titleEnd}{" "}
            <span className="text-[var(--color-primary)] opacity-80">{t.titleEndAccent}</span> {t.titleSuffix}
          </h2>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl p-7 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <article className="space-y-3">
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-60">
                  {t.baseTitle}
                </p>
                <p className="text-body text-[var(--color-text-secondary)]">
                  {t.baseText}
                </p>
              </article>

              <article className="space-y-3">
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-60">
                  {t.selfTitle}
                </p>
                <p className="text-body text-[var(--color-text-secondary)]">
                  {t.selfText}
                </p>
              </article>

              <article className="space-y-3">
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-60">
                  {t.currentTitle}
                </p>
                <p className="text-body text-[var(--color-text-secondary)]">
                  {t.currentText}
                </p>
              </article>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
