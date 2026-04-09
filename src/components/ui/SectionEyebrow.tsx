interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  /** Alignment — center needed for About/Contact sections */
  align?: "left" | "center";
}

export function SectionEyebrow({
  children,
  className = "",
  align = "left",
}: SectionEyebrowProps) {
  return (
    <div
      className={[
        // Layout
        "flex items-center gap-2.5",
        align === "center" ? "justify-center" : "",
        // Opacity on the container — consistent fading, not per-element
        "opacity-60 hover:opacity-80 transition-opacity duration-300",
        className,
      ].join(" ")}
    >
      {/* Dot */}
      <span
        className="flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[var(--color-primary)]"
        aria-hidden="true"
      />

      {/* Label — monospace, tightly tracked */}
      <span
        className={[
          "font-mono text-[10px] tracking-[0.20em] uppercase",
          "text-[var(--color-primary)]",
          "leading-none",
        ].join(" ")}
      >
        {children}
      </span>

      {/* Right rule — left-aligned only, fades to transparent */}
      {align === "left" && (
        <span
          className="flex-1 max-w-[72px] h-px bg-gradient-to-r from-[var(--color-primary)]/40 to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
