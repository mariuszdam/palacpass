"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const containerRef = useScrollReveal<HTMLDivElement>({
    children: true,
    stagger: 0.15,
    y: 40,
  });

  return (
    <div
      ref={containerRef}
      className={`mb-12 md:mb-24 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span
        className="inline-block text-xs tracking-[0.4em] uppercase mb-4"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-gold)",
        }}
      >
        {label}
      </span>
      <h2
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 300,
          color: light ? "var(--color-cream)" : "var(--color-forest)",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: light ? "rgba(242,235,223,0.7)" : "var(--color-charcoal-light)",
            marginLeft: align === "center" ? "auto" : undefined,
            marginRight: align === "center" ? "auto" : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
