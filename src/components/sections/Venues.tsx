"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const VENUES = [
  {
    title: "Wesela",
    subtitle: "Dobre historie zaczynają się w miejscach, które zapamiętujemy na lata",
    description:
      "Sale pałacowe na 60 osób oraz czarna oranżeria na 170 gości, otoczone siedemnastohektarowym parkiem. Idealnie na glamour, rustykalny, boho lub romantyczny ślub.",
    image: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/dsc_8185_107.jpg",
    features: ["Do 170 gości", "3 sale", "Park 17 ha", "56 noclegów"],
    href: "/wesela",
    cta: "Sprawdz oferte weselna",
  },
  {
    title: "Eventy",
    subtitle: "Prestiżowe miejsce na ważne spotkania i decyzje biznesowe",
    description:
      "Klasycystyczne wnętrza pałacu tworzą niepowtarzalną atmosferę dla konferencji, szkoleń, bankietów i spotkań integracyjnych.",
    image: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/rdyf_347.jpg",
    features: ["Konferencje", "Szkolenia", "Bankiety", "Integracje"],
    href: "/eventy",
    cta: "Sprawdz oferte biznesowa",
  },
];

export default function Venues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal reveal for each venue card
      gsap.utils.toArray<HTMLElement>(".venue-card").forEach((card, i) => {
        const image = card.querySelector(".venue-image");
        const content = card.querySelector(".venue-content");

        gsap.fromTo(
          image,
          { clipPath: i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
          }
        );

        gsap.fromTo(
          content?.children ?? [],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="venues"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-40 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-alabaster)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Przestrzenie"
          title="Dwa światy, jedno miejsce"
          subtitle="Romantyczne wesela i prestiżowe spotkania biznesowe w jednej z najpiękniejszych rezydencji pod Warszawą."
        />

        <div className="space-y-16 sm:space-y-24 md:space-y-40">
          {VENUES.map((venue, i) => (
            <div
              key={venue.title}
              className="venue-card grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Image */}
              <div
                className={`venue-image relative aspect-[4/3] overflow-hidden ${i % 2 !== 0 ? "lg:order-2" : ""}`}
                data-cursor="View"
              >
                <img
                  src={venue.image}
                  alt={venue.title}
                  className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[var(--ease-smooth)] hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className={`venue-content ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <span
                  className="text-xs tracking-[0.4em] uppercase"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gold)",
                  }}
                >
                  {venue.subtitle}
                </span>
                <h3
                  className="mt-4 text-3xl sm:text-4xl md:text-6xl tracking-tight"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 300,
                    color: "var(--color-forest)",
                  }}
                >
                  {venue.title}
                </h3>
                <p
                  className="mt-6 text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 300,
                    color: "var(--color-charcoal-light)",
                  }}
                >
                  {venue.description}
                </p>

                {/* Feature tags */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {venue.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-2 text-xs tracking-[0.15em] uppercase border"
                      style={{
                        fontFamily: "var(--font-sans)",
                        borderColor: "var(--color-gold)",
                        color: "var(--color-forest)",
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={venue.href}
                  className="mt-10 inline-flex items-center gap-3 group"
                  data-cursor={venue.cta}
                >
                  <span
                    className="text-sm tracking-[0.2em] uppercase transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-forest)",
                    }}
                  >
                    {venue.cta}
                  </span>
                  <span
                    className="block h-px w-12 transition-all duration-500 group-hover:w-20"
                    style={{ backgroundColor: "var(--color-gold)" }}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
