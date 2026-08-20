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
      {/* Top separator */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.10) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <AnimatedReveal className="mb-12 sm:mb-14">
          <SectionEyebrow className="mb-5">
            {t.eyebrow}
          </SectionEyebrow>

          <h2 className="text-headline max-w-3xl text-[var(--color-text)]">
            {t.titleStart}{" "}
            <span className="text-[var(--color-primary)] opacity-90">
              {t.precise}
            </span>
            ,{" "}
            <span className="text-[var(--color-primary)] opacity-90">
              {t.human}
            </span>
            ,{" "}
            <span className="text-[var(--color-primary)] opacity-90">
              {t.durable}
            </span>
            .
          </h2>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          {/* Main Vision Card */}
          <div
            className="
              rounded-2xl
              border border-[var(--color-border-hover)]
              bg-[color-mix(in_srgb,var(--color-surface)_82%,transparent)]
              backdrop-blur-xl
              p-7 sm:p-10
              shadow-[0_20px_80px_rgba(0,0,0,0.22)]
              transition-all duration-300
              hover:border-[rgba(108,142,255,0.45)]
              hover:shadow-[0_20px_90px_rgba(108,142,255,0.08)]
            "
          >
            <p
              className="
                text-body
                max-w-3xl
                leading-relaxed
                text-[var(--color-text-secondary)]
              "
            >
              {t.body}
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {/* Product Clarity */}
              <div
                className="
                  rounded-xl
                  border border-[var(--color-border-hover)]
                  bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)]
                  p-5
                  transition-all duration-300
                  hover:border-[rgba(108,142,255,0.50)]
                  hover:bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)]
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_35px_rgba(108,142,255,0.07)]
                "
              >
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-100 mb-3">
                  {t.clarityTitle}
                </p>

                <p className="text-body text-[var(--color-text)]">
                  {t.clarityText}
                </p>
              </div>

              {/* Engineered Elegance */}
              <div
                className="
                  rounded-xl
                  border border-[var(--color-border-hover)]
                  bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)]
                  p-5
                  transition-all duration-300
                  hover:border-[rgba(108,142,255,0.50)]
                  hover:bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)]
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_35px_rgba(108,142,255,0.07)]
                "
              >
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-100 mb-3">
                  {t.eleganceTitle}
                </p>

                <p className="text-body text-[var(--color-text)]">
                  {t.eleganceText}
                </p>
              </div>

              {/* Long-Term Quality */}
              <div
                className="
                  rounded-xl
                  border border-[var(--color-border-hover)]
                  bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)]
                  p-5
                  transition-all duration-300
                  hover:border-[rgba(108,142,255,0.50)]
                  hover:bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)]
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_35px_rgba(108,142,255,0.07)]
                "
              >
                <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[var(--color-primary)] opacity-100 mb-3">
                  {t.qualityTitle}
                </p>

                <p className="text-body text-[var(--color-text)]">
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