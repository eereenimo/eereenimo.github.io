"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useLanguage } from "@/lib/i18n";
import { copy } from "@/data/translations";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  const { locale } = useLanguage();
  const t = copy[locale].contact;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const lightFieldOpacity = useTransform(
    scrollYProgress,
    [0.4, 1],
    [0, 0.08]
  );

  return (
    <>
      {/* Ambient bottom light */}
      <motion.div
        className="fixed inset-0 pointer-events-none -z-40 flex items-end justify-center mix-blend-screen pb-40"
        style={{ opacity: lightFieldOpacity }}
        aria-hidden="true"
      >
        <div
          className="w-[150vw] h-[100vh] rounded-full blur-[160px]"
          style={{ backgroundColor: "var(--color-primary)" }}
        />
      </motion.div>

      <motion.section
        ref={containerRef}
        id="contact"
        aria-label="Contact"
        className="
          relative
          flex flex-col
          items-center
          justify-center
          py-32
          bg-transparent
          min-h-[70vh]
          scroll-mt-24
          md:scroll-mt-28
        "
      >
        {/* Eyebrow */}
        <SectionEyebrow className="mb-5">
          {t.eyebrow}
        </SectionEyebrow>

        {/* Title */}
        <h2
          className="
            text-headline
            mb-6
            text-center
            text-[var(--color-text)]
            font-semibold
          "
        >
          {t.title}
        </h2>

        {/* Description */}
        <p
          className="
            text-body
            text-center
            max-w-2xl
            mb-12
            text-[color-mix(in_srgb,var(--color-text)_82%,var(--color-text-secondary)_18%)]
          "
        >
          {t.body}
        </p>

        {/* Contact methods */}
        <div
          className="
            w-full
            max-w-3xl
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            px-6
            sm:px-0
          "
        >
          <ContactMethod
            href="mailto:erenserdaroglu01@gmail.com"
            label={t.email}
            value="erenserdaroglu01@gmail.com"
          >
            <EmailIcon />
          </ContactMethod>

          <ContactMethod
            href="https://www.linkedin.com/in/eren-serdaroglu"
            label={t.linkedin}
            value="linkedin.com/in/eren-serdaroglu"
          >
            <LinkedInIcon />
          </ContactMethod>

          <ContactMethod
            href="https://github.com/eereenimo"
            label={t.github}
            value="github.com/eereenimo"
          >
            <GitHubIcon />
          </ContactMethod>
        </div>

        {/* Contact form */}
        <div className="w-full max-w-3xl mt-8 px-6 sm:px-0">
          <form
            action={formEndpoint || undefined}
            method="POST"
            className="
              rounded-2xl
              border border-[rgba(255,255,255,0.12)]
              bg-[color-mix(in_srgb,var(--color-surface)_82%,transparent)]
              backdrop-blur-xl
              p-6 sm:p-8
              shadow-[0_24px_80px_rgba(0,0,0,0.20)]
              transition-all duration-300
              hover:border-[rgba(108,142,255,0.22)]
            "
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {/* Name */}
              <label className="block">
                <span
                  className="
                    block
                    text-[10px]
                    font-mono
                    tracking-[0.16em]
                    uppercase
                    text-[var(--color-primary)]
                    opacity-90
                    mb-2.5
                  "
                >
                  {t.name}
                </span>

                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="
                    w-full
                    rounded-xl
                    border border-[rgba(255,255,255,0.13)]
                    bg-[rgba(5,5,8,0.68)]
                    px-4
                    py-3
                    text-sm
                    text-[var(--color-text)]
                    placeholder:text-[color-mix(in_srgb,var(--color-text-secondary)_70%,white_30%)]
                    focus:outline-none
                    focus:border-[rgba(108,142,255,0.65)]
                    focus:ring-2
                    focus:ring-[rgba(108,142,255,0.12)]
                    transition-all
                    duration-200
                  "
                  placeholder={t.yourName}
                />
              </label>

              {/* Email */}
              <label className="block">
                <span
                  className="
                    block
                    text-[10px]
                    font-mono
                    tracking-[0.16em]
                    uppercase
                    text-[var(--color-primary)]
                    opacity-90
                    mb-2.5
                  "
                >
                  {t.email}
                </span>

                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="
                    w-full
                    rounded-xl
                    border border-[rgba(255,255,255,0.13)]
                    bg-[rgba(5,5,8,0.68)]
                    px-4
                    py-3
                    text-sm
                    text-[var(--color-text)]
                    placeholder:text-[color-mix(in_srgb,var(--color-text-secondary)_70%,white_30%)]
                    focus:outline-none
                    focus:border-[rgba(108,142,255,0.65)]
                    focus:ring-2
                    focus:ring-[rgba(108,142,255,0.12)]
                    transition-all
                    duration-200
                  "
                  placeholder={t.yourEmail}
                />
              </label>
            </div>

            {/* Message */}
            <label className="block mb-6">
              <span
                className="
                  block
                  text-[10px]
                  font-mono
                  tracking-[0.16em]
                  uppercase
                  text-[var(--color-primary)]
                  opacity-90
                  mb-2.5
                "
              >
                {t.message}
              </span>

              <textarea
                name="message"
                required
                rows={6}
                className="
                  w-full
                  rounded-xl
                  border border-[rgba(255,255,255,0.13)]
                  bg-[rgba(5,5,8,0.68)]
                  px-4
                  py-3
                  text-sm
                  text-[var(--color-text)]
                  placeholder:text-[color-mix(in_srgb,var(--color-text-secondary)_70%,white_30%)]
                  focus:outline-none
                  focus:border-[rgba(108,142,255,0.65)]
                  focus:ring-2
                  focus:ring-[rgba(108,142,255,0.12)]
                  transition-all
                  duration-200
                  resize-y
                "
                placeholder={t.messagePlaceholder}
              />
            </label>

            {/* Bottom row */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              "
            >
              <p
                className="
                  text-xs
                  text-[color-mix(in_srgb,var(--color-text-secondary)_85%,white_15%)]
                "
              >
                {formEndpoint
                  ? t.serviceReady
                  : t.serviceMissing}
              </p>

              <button
                type="submit"
                disabled={!formEndpoint}
                className={[
                  "inline-flex items-center justify-center",
                  "rounded-full px-6 py-3",
                  "text-xs font-mono tracking-[0.12em] uppercase",
                  "border",
                  "transition-all duration-300",
                  formEndpoint
                    ? [
                        "border-[rgba(108,142,255,0.45)]",
                        "text-[var(--color-text)]",
                        "bg-[rgba(108,142,255,0.08)]",
                        "hover:border-[rgba(108,142,255,0.75)]",
                        "hover:bg-[rgba(108,142,255,0.16)]",
                        "hover:shadow-[0_0_30px_rgba(108,142,255,0.12)]",
                        "hover:-translate-y-0.5",
                      ].join(" ")
                    : [
                        "border-[rgba(255,255,255,0.10)]",
                        "text-[var(--color-text-secondary)]",
                        "opacity-70",
                        "cursor-not-allowed",
                      ].join(" "),
                ].join(" ")}
              >
                {t.submit}
              </button>
            </div>
          </form>
        </div>

        {/* Availability */}
        <p
          className="
            mt-8
            text-[11px]
            font-mono
            tracking-[0.14em]
            uppercase
            text-[color-mix(in_srgb,var(--color-text-secondary)_85%,white_15%)]
            text-center
          "
        >
          {t.available}
        </p>
      </motion.section>
    </>
  );
}

/* ============================================================
   CONTACT METHOD
   ============================================================ */

function ContactMethod({
  href,
  label,
  value,
  children,
}: {
  href: string;
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="
        group
        rounded-xl
        border border-[rgba(255,255,255,0.12)]
        bg-[color-mix(in_srgb,var(--color-surface)_82%,transparent)]
        backdrop-blur-xl
        px-5 py-5
        transition-all duration-300
        hover:border-[rgba(108,142,255,0.45)]
        hover:bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)]
        hover:-translate-y-1
        hover:shadow-[0_16px_45px_rgba(108,142,255,0.08)]
      "
      aria-label={label}
    >
      <div className="flex items-center gap-2.5 mb-2.5 text-[var(--color-text)]">
        <span className="text-[var(--color-primary)] opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          {children}
        </span>

        <span
          className="
            text-[10px]
            font-mono
            tracking-[0.16em]
            uppercase
            text-[var(--color-primary)]
            opacity-90
          "
        >
          {label}
        </span>
      </div>

      <span
        className="
          block
          text-sm
          text-[color-mix(in_srgb,var(--color-text)_76%,var(--color-text-secondary)_24%)]
          group-hover:text-[var(--color-text)]
          transition-colors duration-300
          break-all
        "
      >
        {value}
      </span>
    </a>
  );
}

/* ============================================================
   ICONS
   ============================================================ */

function EmailIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5ZM6.2 8L12 12.4L17.8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.94 8.5H3.5V20H6.94V8.5ZM7.17 4.95C7.17 3.95 6.42 3.2 5.22 3.2C4.03 3.2 3.28 3.95 3.28 4.95C3.28 5.93 4.01 6.7 5.18 6.7H5.2C6.42 6.7 7.17 5.93 7.17 4.95ZM20.72 13.39C20.72 9.89 18.85 8.26 16.35 8.26C14.34 8.26 13.44 9.37 12.94 10.15V8.5H9.5C9.54 9.59 9.5 20 9.5 20H12.94V13.58C12.94 13.23 12.97 12.89 13.07 12.64C13.34 11.95 13.96 11.23 15 11.23C16.36 11.23 16.9 12.26 16.9 13.78V20H20.34V13.39H20.72Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2C6.48 2 2 6.6 2 12.26C2 16.79 4.87 20.63 8.84 21.98C9.34 22.08 9.52 21.76 9.52 21.49C9.52 21.24 9.51 20.41 9.5 19.52C6.73 20.14 6.14 18.3 6.14 18.3C5.68 17.08 5.03 16.75 5.03 16.75C4.12 16.11 5.1 16.12 5.1 16.12C6.1 16.19 6.63 17.18 6.63 17.18C7.52 18.75 8.96 18.3 9.54 18.03C9.63 17.37 9.89 16.92 10.18 16.66C7.97 16.4 5.65 15.5 5.65 11.47C5.65 10.32 6.04 9.38 6.69 8.63C6.59 8.37 6.25 7.31 6.79 5.87C6.79 5.87 7.63 5.59 9.5 6.9C10.29 6.68 11.14 6.57 12 6.57C12.86 6.57 13.71 6.68 14.5 6.9C16.37 5.59 17.21 5.87 17.21 5.87C17.75 7.31 17.41 8.37 17.31 8.63C17.96 9.38 18.35 10.32 18.35 11.47C18.35 15.51 16.03 16.39 13.81 16.65C14.17 16.98 14.5 17.61 14.5 18.57C14.5 19.95 14.49 21.15 14.49 21.49C14.49 21.76 14.67 22.09 15.18 21.98C19.15 20.63 22 16.79 22 12.26C22 6.6 17.52 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}