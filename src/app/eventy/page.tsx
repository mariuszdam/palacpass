"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const EVENT_TYPES = [
  {
    title: "Konferencje",
    description: "Prestiżowe sale z pełnym wyposażeniem technicznym w zabytkowych wnętrzach.",
    icon: "🎤",
  },
  {
    title: "Szkolenia",
    description: "Skupiona atmosfera z dala od miejskiego zgiełku, w otoczeniu natury i historii.",
    icon: "📋",
  },
  {
    title: "Bankiety",
    description: "Gale, jubileusze i uroczyste kolacje w królewskiej oprawie.",
    icon: "🥂",
  },
  {
    title: "Integracje",
    description: "17 hektarów parku i pałacowe wnętrza — idealne na budowanie zespołu.",
    icon: "🤝",
  },
];

const FEATURES = [
  "3 sale konferencyjne",
  "Do 170 gości",
  "56 miejsc noclegowych",
  "Catering na miejscu",
  "Parking",
  "30 km od Warszawy",
  "Wi-Fi",
  "Park 17 ha",
];

export default function EventsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useScrollReveal<HTMLDivElement>({ children: true, stagger: 0.12 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".event-hero-text",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.15, delay: 0.3 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/rdyf_347.jpg"
            alt="Event w Pałacu Pass"
            className="h-full w-full object-cover"
          />
          <div className="video-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 text-center px-6">
          <span
            className="event-hero-text block text-xs tracking-[0.4em] uppercase mb-6 opacity-0"
            style={{ fontFamily: "var(--font-sans)", color: "var(--color-gold-light)" }}
          >
            Oferta biznesowa
          </span>
          <h1
            className="event-hero-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-0"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, color: "var(--color-cream)" }}
          >
            Prestiżowe
            <br />
            <span style={{ color: "var(--color-gold)" }}>spotkania</span>
          </h1>
          <p
            className="event-hero-text mt-8 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300, color: "rgba(242,235,223,0.8)" }}
          >
            Ważne decyzje zasługują na wyjątkową oprawę.
          </p>
        </div>
      </section>

      {/* Event types */}
      <section className="py-16 sm:py-24 md:py-40 px-6 md:px-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Rodzaje wydarzeń"
            title="Każde spotkanie ma swój charakter"
            subtitle="Dopasowujemy przestrzeń i obsługę do charakteru Waszego wydarzenia."
          />
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EVENT_TYPES.map((event) => (
              <div
                key={event.title}
                className="p-6 sm:p-10 md:p-14 border transition-all duration-500 hover:border-gold group"
                style={{ borderColor: "rgba(181, 154, 110, 0.2)" }}
              >
                <span className="text-4xl">{event.icon}</span>
                <h3
                  className="mt-6 text-2xl sm:text-3xl md:text-4xl tracking-tight"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 300, color: "var(--color-forest)" }}
                >
                  {event.title}
                </h3>
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300, color: "var(--color-charcoal-light)" }}
                >
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 md:py-40 px-6 md:px-12" style={{ backgroundColor: "var(--color-forest)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            label="Udogodnienia"
            title="Wszystko na miejscu"
            light
          />
          <div className="flex flex-wrap justify-center gap-4">
            {FEATURES.map((feature) => (
              <span
                key={feature}
                className="px-4 sm:px-6 py-3 text-sm tracking-[0.15em] uppercase border"
                style={{
                  fontFamily: "var(--font-sans)",
                  borderColor: "rgba(181, 154, 110, 0.4)",
                  color: "var(--color-cream)",
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 sm:py-24 md:py-40 px-6 md:px-12 text-center"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <SectionHeading
          label="Zaplanuj event"
          title="Zorganizuj spotkanie w pałacu"
          subtitle="Skontaktuj się z nami — przygotujemy indywidualną ofertę."
        />
        <a
          href="/#contact"
          className="magnetic-btn inline-block px-8 sm:px-12 py-5 text-sm tracking-[0.15em] sm:tracking-[0.25em] uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            backgroundColor: "var(--color-forest)",
            color: "var(--color-cream)",
          }}
        >
          <span>Zapytaj o ofertę</span>
        </a>
      </section>
    </div>
  );
}
