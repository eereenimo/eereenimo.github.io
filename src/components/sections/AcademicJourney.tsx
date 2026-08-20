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

      const maxTranslate = Math.max(
        0,
        trackWidth - viewportWidth
      );

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

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    xRange
  );

  return (
    <div
      ref={containerRef}
      id="journey"
      className="relative w-full h-[300vh] bg-transparent"
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Sticky viewport */}
      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
          flex
          flex-col
          justify-between
          py-8
          md:py-16
          bg-transparent
        "
      >
        {/* ======================================================
            TITLE
        ====================================================== */}

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 w-full flex-shrink-0">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <SectionEyebrow className="mb-1">
              {t.eyebrow}
            </SectionEyebrow>

            <h2 className="text-display text-[var(--color-text)]">
              {t.titleMain}
            </h2>

            <p
              className="
                text-subheading
                text-[var(--color-text-secondary)]
                max-w-2xl
                mt-1
                font-light
              "
            >
              {t.titleSub}
            </p>
          </div>
        </div>

        {/* ======================================================
            HORIZONTAL JOURNEY TRACK
        ====================================================== */}

        <div
          className="
            relative
            flex-1
            flex
            items-center
            overflow-hidden
            w-full
            my-4
            md:my-6
          "
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="
              flex
              flex-row
              items-center
              gap-8
              md:gap-20
              px-6
              md:pl-[calc((100vw-1200px)/2+2.5rem)]
              md:pr-[calc((100vw-1200px)/2+2.5rem)]
            "
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  flex-shrink-0
                  w-[82vw]
                  sm:w-[70vw]
                  md:w-[500px]
                  h-[300px]
                  md:h-[340px]

                  rounded-2xl
                  overflow-hidden
                  select-none

                  border
                  border-[rgba(255,255,255,0.10)]

                  bg-[color-mix(in_srgb,var(--color-surface)_82%,transparent)]

                  backdrop-blur-xl

                  p-6
                  md:p-8

                  flex
                  flex-col
                  justify-between

                  shadow-[0_20px_60px_rgba(0,0,0,0.14)]

                  transition-all
                  duration-300

                  hover:border-[rgba(108,142,255,0.32)]
                  hover:bg-[color-mix(in_srgb,var(--color-surface)_90%,transparent)]
                  hover:-translate-y-1
                "
              >
                {/* ==================================================
                    TOP ACCENT
                ================================================== */}

                <div
                  className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[var(--color-primary)]
                    to-transparent
                    opacity-0
                    group-hover:opacity-70
                    transition-opacity
                    duration-500
                  "
                  aria-hidden="true"
                />

                {/* ==================================================
                    TOP CONTENT
                ================================================== */}

                <div>
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-4
                      md:mb-6
                    "
                  >
                    {/* Number */}
                    <span
                      className="
                        font-mono
                        text-xs
                        md:text-sm
                        tracking-[0.16em]
                        uppercase
                        text-[var(--color-primary)]
                        opacity-80
                      "
                    >
                      {step.number}
                    </span>

                    {/* Period */}
                    <span
                      className="
                        font-mono
                        text-[10px]
                        md:text-xs
                        tracking-wider
                        text-[var(--color-text-secondary)]

                        bg-[rgba(255,255,255,0.045)]

                        px-2.5
                        py-1

                        rounded-full

                        border
                        border-[rgba(255,255,255,0.10)]
                      "
                    >
                      {step.period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      text-xl
                      md:text-2xl
                      font-black
                      tracking-tight
                      text-[var(--color-text)]
                      mb-1

                      transition-colors
                      duration-300

                      group-hover:text-[var(--color-primary)]
                    "
                  >
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="
                      text-[10px]
                      font-mono
                      tracking-wide
                      uppercase
                      text-[var(--color-text-muted)]
                      mb-3
                    "
                  >
                    {step.subtitle}
                  </p>
                </div>

                {/* ==================================================
                    DESCRIPTION
                ================================================== */}

                <p
                  className="
                    text-sm
                    md:text-[15px]
                    leading-relaxed
                    text-[color-mix(in_srgb,var(--color-text)_78%,var(--color-text-secondary)_22%)]
                    font-normal
                    max-w-[430px]
                  "
                >
                  {step.text}
                </p>

                {/* ==================================================
                    BACKGROUND NUMBER
                ================================================== */}

                <span
                  className="
                    absolute
                    -bottom-8
                    -right-4

                    font-mono
                    text-[10rem]
                    font-black
                    leading-none

                    text-[rgba(255,255,255,0.025)]

                    select-none
                    pointer-events-none

                    transition-all
                    duration-500

                    group-hover:scale-105
                    group-hover:text-[rgba(108,142,255,0.06)]
                  "
                >
                  {step.number}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ======================================================
            SCROLL PROGRESS
        ====================================================== */}

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 w-full flex-shrink-0">
          <div
            className="
              h-[2px]
              w-full
              bg-[rgba(255,255,255,0.08)]
              rounded-full
              overflow-hidden
              relative
            "
          >
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="
                absolute
                left-0
                top-0
                bottom-0
                right-0

                bg-gradient-to-r
                from-[var(--color-primary)]/50
                to-[var(--color-primary)]

                origin-left
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}