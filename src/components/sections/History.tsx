"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  {
    year: "1830",
    title: "Powstanie rezydencji",
    description:
      "Pałac zostaje wzniesiony jako jedna z najpiękniejszych klasycystycznych rezydencji na Mazowszu, otoczona angielskim parkiem krajobrazowym.",
  },
  {
    year: "XIX w.",
    title: "Właściciele: Halpertowie i Plater-Zyberowie",
    description:
      "Przez kolejne dekady pałac przechodzi przez ręce znamienitych rodzin — Ludwika i Borysa Halpert, Leontyny Halpert oraz hrabiego Kazimierza Plater-Zyberka.",
  },
  {
    year: "1939–45",
    title: "Losy wojenne",
    description:
      "Pałac przetrwał II wojnę światową, choć jego losy w tym okresie były burzliwe. Kolejne lata przyniosły zmiany własnościowe.",
  },
  {
    year: "2011",
    title: "Odrestaurowanie",
    description:
      "Obecny właściciel przywraca pałacowi dawny blask, odrestaurowując go z pietyzmem i dbałością o historyczny detal. Rezydencja otwiera się na ekskluzywne wydarzenia.",
  },
  {
    year: "Dziś",
    title: "Przestrzeń wydarzeń",
    description:
      "Pałac Pass łączy XIX-wieczną elegancję z nowoczesną obsługą — wesela, spotkania biznesowe i sesje zdjęciowe w ponadczasowym otoczeniu.",
  },
];

export default function History() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Animate each timeline item
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: item.dataset.side === "left" ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="history"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-40 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Historia"
          title="Prawie 200 lat historii"
          subtitle="Od klasycystycznej rezydencji po ekskluzywne miejsce spotkań."
        />

        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              backgroundColor: "var(--color-gold)",
              transform: "scaleY(0)",
            }}
          />

          {/* Timeline items */}
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`timeline-item relative grid grid-cols-1 md:grid-cols-2 gap-8 pl-12 md:pl-0`}
                data-side={i % 2 === 0 ? "left" : "right"}
              >
                {/* Dot on timeline */}
                <div
                  className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 w-[10px] h-[10px] rounded-full border-2 z-10"
                  style={{
                    borderColor: "var(--color-gold)",
                    backgroundColor: "var(--color-cream)",
                  }}
                />

                {/* Content */}
                <div
                  className={`${
                    i % 2 === 0
                      ? "md:text-right md:pr-16"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 300,
                      color: "var(--color-gold)",
                    }}
                  >
                    {item.year}
                  </span>
                  <h3
                    className="mt-3 text-xl md:text-2xl"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      color: "var(--color-forest)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 text-base leading-relaxed"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 300,
                      color: "var(--color-charcoal-light)",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
