"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".footer-marquee-inner", {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer style={{ backgroundColor: "var(--color-forest)" }}>
      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="overflow-hidden py-8 sm:py-12 md:py-20 border-b"
        style={{ borderColor: "rgba(181, 154, 110, 0.15)" }}
      >
        <div className="footer-marquee-inner flex whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl sm:text-6xl md:text-9xl tracking-tight mx-4 sm:mx-8 md:mx-16"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                color: "transparent",
                WebkitTextStroke: "1px var(--color-gold)",
              }}
            >
              Pałac Pass
            </span>
          ))}
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-6"
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
              Pass 1<br />
              05-870 Błonie<br />
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

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-6"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-gold)",
              }}
            >
              Kontakt
            </h4>
            <div className="space-y-3">
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

          {/* Social */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-6"
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
                className="block text-lg transition-opacity duration-300 hover:opacity-100"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-cream)",
                  opacity: 0.8,
                }}
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/PalacPass"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg transition-opacity duration-300 hover:opacity-100"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-cream)",
                  opacity: 0.8,
                }}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(181, 154, 110, 0.15)" }}
        >
          <p
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-cream)",
              opacity: 0.4,
            }}
          >
            &copy; {new Date().getFullYear()} Pałac Pass. Wszelkie prawa
            zastrzeżone.
          </p>
          <p
            className="text-xs tracking-widest"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-cream)",
              opacity: 0.3,
            }}
          >
            Designed with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
