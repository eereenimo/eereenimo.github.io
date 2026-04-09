"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Work",         href: "#work"         },
  { label: "Capabilities", href: "#capabilities"  },
  { label: "About",        href: "#about"         },
  { label: "Contact",      href: "#contact"       },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const lastYRef                  = useRef(0);
  const [activeId,  setActiveId]  = useState("");

  // Scroll direction → hide/show nav
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 48);
    if (y > lastYRef.current && y > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastYRef.current = y;
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
          if (entry.isIntersecting) setActiveId(id);
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
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO as number[] }}
    >
      {/* Backdrop — transparent → blurred glass as user scrolls */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: scrolled
            ? "rgba(5, 5, 8, 0.72)"
            : "rgba(5, 5, 8, 0)",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
          WebkitBackdropFilter: scrolled
            ? "blur(20px) saturate(180%)"
            : "blur(0px)",
          borderBottomColor: scrolled
            ? "rgba(255, 255, 255, 0.055)"
            : "rgba(255, 255, 255, 0)",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO as number[] }}
      />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
        {/* Logo — initials mark */}
        <a
          href="#"
          aria-label="Eren Serdaroğlu — home"
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
          <span
            className={[
              "hidden sm:block text-sm font-medium",
              "text-[var(--color-text)] opacity-70",
              "transition-opacity duration-200",
              "group-hover:opacity-100",
            ].join(" ")}
          >
            Eren Serdaroğlu
          </span>
        </a>

        {/* Nav Links — desktop */}
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

        {/* CTA — desktop */}
        <a
          id="nav-cta"
          href="mailto:serdaroglueren5@gmail.com"
          className={[
            "hidden md:inline-flex items-center gap-2",
            "text-xs font-mono tracking-[0.1em] uppercase",
            "text-[var(--color-primary)] opacity-70",
            "hover:opacity-100",
            "border border-[rgba(108,142,255,0.2)]",
            "hover:border-[rgba(108,142,255,0.5)]",
            "hover:bg-[rgba(108,142,255,0.05)]",
            "rounded-full px-4 py-2",
            "transition-all duration-200",
          ].join(" ")}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-pulse)] animate-pulse" />
          Available
        </a>

        {/* Mobile menu — simplified anchor list */}
        <MobileMenu />
      </div>
    </motion.header>
  );
}

// ─── NavLink ────────────────────────────────────────────────────────────────

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
        // Underline: always rendered, animates via width
        "after:absolute after:bottom-0 after:left-0",
        "after:h-px after:w-full",
        "after:bg-[var(--color-primary)]",
        "after:origin-left after:scale-x-0",
        "after:transition-transform after:duration-300 after:ease-out",
        "hover:after:scale-x-100",
        isActive ? "after:scale-x-100" : "",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

// ─── Mobile Menu ────────────────────────────────────────────────────────────

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        id="mobile-menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
      >
        <motion.span
          className="block w-5 h-px bg-[var(--color-text)]"
          animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="block w-5 h-px bg-[var(--color-text)]"
          animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-5 h-px bg-[var(--color-text)]"
          animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
      </button>

      {/* Fullscreen overlay */}
      <motion.div
        className={[
          "fixed inset-0 z-40",
          "bg-[rgba(5,5,8,0.97)] backdrop-blur-xl",
          "flex flex-col items-center justify-center gap-8",
          open ? "pointer-events-auto" : "pointer-events-none",
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
            className="text-3xl font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-200"
            initial={{ opacity: 0, y: 16 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: i * 0.07, duration: 0.35, ease: EASE_OUT_EXPO as number[] }}
          >
            {link.label}
          </motion.a>
        ))}

        <motion.a
          href="mailto:serdaroglueren5@gmail.com"
          onClick={() => setOpen(false)}
          className="mt-4 text-sm font-mono text-[var(--color-primary)] opacity-60"
          initial={{ opacity: 0 }}
          animate={open ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          serdaroglueren5@gmail.com
        </motion.a>
      </motion.div>
    </div>
  );
}
