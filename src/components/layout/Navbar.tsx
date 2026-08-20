"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { copy } from "@/data/translations";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { locale, toggleLocale } = useLanguage();
  const t = copy[locale];

  const navLinks = [
    { label: t.nav.journey, href: "#journey" },
    { label: t.nav.vision, href: "#vision" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.contact, href: "#contact" },
  ];

  // Scroll depth → subtle glass/background shift
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 48);
  });

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.header
      role="banner"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Theme-aware glass backdrop */}
      <motion.div
        className={[
          "absolute inset-0",
          "border-b",
          "transition-all duration-300",
          scrolled
            ? "bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] backdrop-blur-xl"
            : "bg-transparent backdrop-blur-0",
          scrolled
            ? "border-[var(--color-border)]"
            : "border-transparent",
        ].join(" ")}
        animate={{
          backdropFilter: scrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px)",
          WebkitBackdropFilter: scrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px)",
        }}
        transition={{
          duration: 0.45,
          ease: EASE_OUT_EXPO as number[],
        }}
      />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#hero"
          aria-label="Erenimo — home"
          id="nav-logo"
          className="group flex items-center gap-2.5 select-none"
        >
          <span
            className={[
              "flex items-center justify-center",
              "w-8 h-8 rounded-lg",
              "bg-[var(--color-primary)] text-[#050508]",
              "text-xs font-bold tracking-tight",
              "transition-all duration-300",
              "group-hover:shadow-[0_0_20px_rgba(108,142,255,0.5)]",
              "group-hover:brightness-110",
            ].join(" ")}
          >
            ES
          </span>

          <span className="sm:hidden text-sm font-medium text-[var(--color-text)] opacity-75 transition-opacity duration-200 group-hover:opacity-100">
            Eren S.
          </span>

          <span className="hidden sm:block text-sm font-medium text-[var(--color-text)] opacity-75 transition-opacity duration-200 group-hover:opacity-100">
            Eren Serdaroğlu
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Site sections"
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);

            return (
              <NavLink
                key={link.href}
                href={link.href}
                isActive={isActive}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Language + Theme */}
        <div className="flex items-center gap-3">
          <LanguageSwitch
            locale={locale}
            onToggle={toggleLocale}
          />

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>

        {/* CTA */}
        <a
          id="nav-cta"
          href="mailto:serdaroglueren5@gmail.com"
          className={[
            "hidden md:inline-flex items-center gap-2",
            "text-xs font-mono tracking-[0.1em] uppercase",
            "text-[var(--color-primary)] opacity-80",
            "hover:opacity-100",
            "border border-[var(--color-border)]",
            "hover:border-[var(--color-border-hover)]",
            "hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)]",
            "rounded-full px-4 py-2",
            "transition-all duration-200",
          ].join(" ")}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-pulse)] animate-pulse" />

          {t.nav.available}
        </a>

        {/* Mobile Menu */}
        <MobileMenu navLinks={navLinks} />
      </div>
    </motion.header>
  );
}

// ─────────────────────────────────────────────────────────────
// NavLink
// ─────────────────────────────────────────────────────────────

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={[
        "relative text-sm py-1 transition-colors duration-200",

        isActive
          ? "text-[var(--color-text)]"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",

        // Underline
        "after:absolute after:bottom-0 after:left-0",
        "after:h-px after:w-full",
        "after:bg-[var(--color-primary)]",
        "after:origin-left after:scale-x-0",
        "after:transition-transform after:duration-300",
        "after:ease-out",

        "hover:after:scale-x-100",

        isActive ? "after:scale-x-100" : "",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile Menu
// ─────────────────────────────────────────────────────────────

function MobileMenu({
  navLinks,
}: {
  navLinks: { label: string; href: string }[];
}) {
  const { locale } = useLanguage();
  const t = copy[locale];

  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger */}
      <button
        id="mobile-menu-toggle"
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className={[
          "w-10 h-10",
          "flex flex-col items-center justify-center",
          "gap-1.5 rounded-lg",
          "hover:bg-[color-mix(in_srgb,var(--color-text)_5%,transparent)]",
          "transition-colors duration-200",
        ].join(" ")}
      >
        <motion.span
          className="block w-5 h-px bg-[var(--color-text)]"
          animate={
            open
              ? { rotate: 45, y: 6 }
              : { rotate: 0, y: 0 }
          }
          transition={{ duration: 0.25 }}
        />

        <motion.span
          className="block w-5 h-px bg-[var(--color-text)]"
          animate={
            open
              ? { opacity: 0, x: -6 }
              : { opacity: 1, x: 0 }
          }
          transition={{ duration: 0.2 }}
        />

        <motion.span
          className="block w-5 h-px bg-[var(--color-text)]"
          animate={
            open
              ? { rotate: -45, y: -6 }
              : { rotate: 0, y: 0 }
          }
          transition={{ duration: 0.25 }}
        />
      </button>

      {/* Fullscreen overlay */}
      <motion.div
        className={[
          "fixed inset-0 z-40",
          "bg-[color-mix(in_srgb,var(--color-bg)_97%,transparent)]",
          "backdrop-blur-xl",
          "flex flex-col items-center justify-center gap-8",
          open
            ? "pointer-events-auto"
            : "pointer-events-none",
        ].join(" ")}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden={!open}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={[
              "text-3xl font-semibold",
              "text-[var(--color-text)]",
              "hover:text-[var(--color-primary)]",
              "transition-colors duration-200",
            ].join(" ")}
            initial={{ opacity: 0, y: 16 }}
            animate={
              open
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{
              delay: i * 0.07,
              duration: 0.35,
              ease: EASE_OUT_EXPO as number[],
            }}
          >
            {link.label}
          </motion.a>
        ))}

        <motion.a
          href="mailto:serdaroglueren5@gmail.com"
          onClick={() => setOpen(false)}
          className="mt-4 text-sm font-mono text-[var(--color-primary)] opacity-70"
          initial={{ opacity: 0 }}
          animate={
            open
              ? { opacity: 0.7 }
              : { opacity: 0 }
          }
          transition={{
            delay: 0.3,
            duration: 0.3,
          }}
        >
          serdaroglueren5@gmail.com
        </motion.a>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Language Switch
// ─────────────────────────────────────────────────────────────

function LanguageSwitch({
  locale,
  onToggle,
}: {
  locale: "en" | "tr";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle language"
      className={[
        "inline-flex items-center",
        "h-9 rounded-full",

        // Theme-aware border/background
        "border border-[var(--color-border)]",
        "bg-[color-mix(in_srgb,var(--color-surface)_70%,transparent)]",
        "backdrop-blur-md",

        "px-1",
        "transition-all duration-300",
        "mr-2 md:mr-0",

        "hover:border-[var(--color-border-hover)]",
      ].join(" ")}
    >
      {/* TR */}
      <span
        className={[
          "px-2.5 py-1 rounded-full",
          "text-[10px] font-mono",
          "tracking-[0.14em] uppercase",
          "transition-all duration-300",

          locale === "tr"
            ? "bg-[rgba(108,142,255,0.22)] text-[var(--color-text)]"
            : "text-[var(--color-text-secondary)]",
        ].join(" ")}
      >
        TR
      </span>

      {/* EN */}
      <span
        className={[
          "px-2.5 py-1 rounded-full",
          "text-[10px] font-mono",
          "tracking-[0.14em] uppercase",
          "transition-all duration-300",

          locale === "en"
            ? "bg-[rgba(108,142,255,0.22)] text-[var(--color-text)]"
            : "text-[var(--color-text-secondary)]",
        ].join(" ")}
      >
        EN
      </span>
    </button>
  );
}