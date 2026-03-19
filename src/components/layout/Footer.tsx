"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const logoStrip = Array.from({ length: 10 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".footer-marquee-track", {
        xPercent: -100,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer style={{ backgroundColor: "var(--color-forest)" }}>
      <div
        ref={marqueeRef}
        className="overflow-hidden border-b py-8 sm:py-12 md:py-20"
        style={{ borderColor: "rgba(181, 154, 110, 0.15)" }}
      >
        <div className="footer-marquee-inner flex w-max items-center whitespace-nowrap">
          <div className="footer-marquee-track flex items-center">
            {logoStrip.map((_, i) => (
              <img
                key={`a-${i}`}
                src="/images/palacpass-logo-original.svg"
                alt=""
                aria-hidden="true"
                className="mx-4 h-10 w-auto flex-none opacity-70 sm:mx-6 sm:h-14 md:mx-8 md:h-20"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(75%) sepia(21%) saturate(509%) hue-rotate(356deg) brightness(89%) contrast(86%)",
                }}
              />
            ))}
          </div>
          <div className="flex items-center">
            {logoStrip.map((_, i) => (
              <img
                key={`b-${i}`}
                src="/images/palacpass-logo-original.svg"
                alt=""
                aria-hidden="true"
                className="mx-4 h-10 w-auto flex-none opacity-70 sm:mx-6 sm:h-14 md:mx-8 md:h-20"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(75%) sepia(21%) saturate(509%) hue-rotate(356deg) brightness(89%) contrast(86%)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="flex flex-col items-center">
            <h4
              className="mb-6 text-xs uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-gold)",
              }}
            >
              Lokalizacja
            </h4>
            <p
              className="text-lg leading-relaxed"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-cream)",
                opacity: 0.8,
              }}
            >
              Pass 1
              <br />
              05-870 Blonie
              <br />
              Polska
            </p>
            <p
              className="mt-4 text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-cream)",
                opacity: 0.5,
              }}
            >
              30 km od centrum Warszawy
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4
              className="mb-6 text-xs uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-gold)",
              }}
            >
              Kontakt
            </h4>
            <div className="space-y-3 text-center">
              <a
                href="tel:+48785897157"
                className="block text-lg transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-cream)",
                  opacity: 0.8,
                }}
              >
                +48 785 897 157
              </a>
              <a
                href="mailto:dustin.nowak@palacpass.pl"
                className="block text-lg transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-cream)",
                  opacity: 0.8,
                }}
              >
                dustin.nowak@palacpass.pl
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4
              className="mb-6 text-xs uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-gold)",
              }}
            >
              Social
            </h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/palacpass"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-lg transition-opacity duration-300 hover:opacity-100"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-cream)",
                  opacity: 0.8,
                }}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a
                href="https://facebook.com/PalacPass"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-lg transition-opacity duration-300 hover:opacity-100"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-cream)",
                  opacity: 0.8,
                }}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.5 21v-8.1h2.7l.4-3.2h-3.1V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.2v2.4H8v3.2h2.8V21h2.7z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-center justify-center gap-4 border-t pt-8 text-center"
          style={{ borderColor: "rgba(181, 154, 110, 0.15)" }}
        >
          <p
            className="text-xs uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-cream)",
              opacity: 0.4,
            }}
          >
            &copy; {new Date().getFullYear()} Palac Pass. Wszelkie prawa
            zastrzezone.
          </p>
        </div>
      </div>
    </footer>
  );
}
