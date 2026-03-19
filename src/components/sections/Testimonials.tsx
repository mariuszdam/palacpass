"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    text: "Magiczne miejsce z cudownym klimatem. Wnętrza pałacu są pięknie urządzone, a obsługa na najwyższym poziomie.",
    author: "Ania & Tomek",
    detail: "Wesele, 2024",
  },
  {
    text: "Czarna oranżeria robi wrażenie. Goście byli zachwyceni — to był nasz wymarzony ślub w bajkowym otoczeniu.",
    author: "Kasia & Michał",
    detail: "Wesele, 2023",
  },
  {
    text: "Profesjonalizm, elegancja i dbałość o każdy detal. Pałac Pass to miejsce, które zapada w pamięć na całe życie.",
    author: "Magdalena & Piotr",
    detail: "Wesele, 2023",
  },
  {
    text: "Organizowaliśmy tu konferencję — wnętrza pałacu nadały spotkaniu prestiżu, którego nie osiągnęlibyśmy nigdzie indziej.",
    author: "Marek W.",
    detail: "Event korporacyjny, 2024",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll marquee
      const marquee = marqueeRef.current;
      if (!marquee) return;

      gsap.to(marquee, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });

      // Pause on hover
      marquee.addEventListener("mouseenter", () => gsap.to(marquee, { timeScale: 0, duration: 0.5 }));
      marquee.addEventListener("mouseleave", () => gsap.to(marquee, { timeScale: 1, duration: 0.5 }));
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];
  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--color-alabaster)" }}
    >
      {/* Section label */}
      <div className="px-6 md:px-12 mb-10 sm:mb-16 text-center">
        <span
          className="text-xs tracking-[0.4em] uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-gold)",
          }}
        >
          Opinie
        </span>
        <h2
          className="mt-4 text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            color: "var(--color-forest)",
          }}
        >
          Co mówią nasi goście
        </h2>
      </div>

      {/* Mobile carousel */}
      <div className="relative px-6 md:hidden">
        <div
          className="mx-auto w-full max-w-sm border px-6 py-8 text-center"
          style={{
            borderColor: "rgba(181, 154, 110, 0.3)",
            backgroundColor: "var(--color-cream)",
          }}
        >
          <span
            className="mb-4 block text-6xl leading-none"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-gold)",
              opacity: 0.5,
            }}
          >
            &ldquo;
          </span>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              color: "var(--color-charcoal)",
            }}
          >
            {activeTestimonial.text}
          </p>
          <div className="mt-8 gold-line" />
          <div className="mt-6 flex flex-col items-center gap-2">
            <span
              className="text-sm tracking-wide"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--color-forest)",
              }}
            >
              {activeTestimonial.author}
            </span>
            <span
              className="text-xs uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-gold)",
              }}
            >
              {activeTestimonial.detail}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() =>
              setActiveIndex((current) =>
                current === 0 ? TESTIMONIALS.length - 1 : current - 1
              )
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border"
            style={{
              borderColor: "rgba(181, 154, 110, 0.35)",
              color: "var(--color-forest)",
            }}
            aria-label="Poprzednia opinia"
          >
            ‹
          </button>

          <div className="flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? "1.75rem" : "0.5rem",
                  backgroundColor:
                    activeIndex === i
                      ? "var(--color-gold)"
                      : "rgba(181, 154, 110, 0.3)",
                }}
                aria-label={`Przejdz do opinii ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setActiveIndex((current) => (current + 1) % TESTIMONIALS.length)
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border"
            style={{
              borderColor: "rgba(181, 154, 110, 0.35)",
              color: "var(--color-forest)",
            }}
            aria-label="Nastepna opinia"
          >
            ›
          </button>
        </div>
      </div>

      {/* Desktop marquee */}
      <div className="relative hidden md:block">
        <div ref={marqueeRef} className="flex gap-8 whitespace-nowrap">
          {allTestimonials.map((testimonial, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[500px] p-6 sm:p-8 md:p-12 border whitespace-normal"
              style={{
                borderColor: "rgba(181, 154, 110, 0.3)",
                backgroundColor: "var(--color-cream)",
              }}
            >
              {/* Quote mark */}
              <span
                className="block text-6xl leading-none mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-gold)",
                  opacity: 0.5,
                }}
              >
                &ldquo;
              </span>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  color: "var(--color-charcoal)",
                }}
              >
                {testimonial.text}
              </p>
              <div className="mt-8 gold-line" />
              <div className="mt-6 flex items-center justify-between">
                <span
                  className="text-sm tracking-wide"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    color: "var(--color-forest)",
                  }}
                >
                  {testimonial.author}
                </span>
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gold)",
                  }}
                >
                  {testimonial.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-star rating */}
      <div className="mt-16 text-center">
        <div className="flex items-center justify-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5"
              fill="var(--color-gold)"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p
          className="text-sm tracking-[0.2em] uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-charcoal-light)",
          }}
        >
          5/5 na Wedding.pl — 12 opinii
        </p>
      </div>
    </section>
  );
}
