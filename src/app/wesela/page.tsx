"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const WEDDING_STYLES = [
  { name: "Glamour", description: "Kryształowe żyrandole, złote detale, elegancja na każdym kroku." },
  { name: "Romantyczny", description: "Pastelowe kwiaty, delikatne tkaniny, ciepłe światło świec." },
  { name: "Rustykalny", description: "Drewniane akcenty, naturalne materiały, urok wiejskiej rezydencji." },
  { name: "Boho", description: "Swobodna elegancja, makrama, suszone kwiaty, wolny duch." },
  { name: "Garden Party", description: "Przyjęcie pod gołym niebem w siedemnastohektarowym parku." },
  { name: "Vintage", description: "Antyczne meble, retro detale, nostalgiczny klimat pałacu." },
];

const SPACES = [
  {
    title: "Sale pałacowe",
    capacity: "do 60 gości",
    description: "Marmurowe posadzki, kryształowe żyrandole, ozdobne drzwi i zwierciadła. Idealne na kameralną uroczystość w królewskim stylu.",
    image: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/dsc_1965-kopia.jpg",
  },
  {
    title: "Czarna Oranżeria",
    capacity: "do 170 gości",
    description: "Ponad 375 m² eleganckiej przestrzeni w ogrodowym pawilonie. Duże, wyjątkowe przyjęcia w otoczeniu zieleni.",
    image: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/alexey_pilipenko-431.jpg",
  },
  {
    title: "Park pałacowy",
    capacity: "17 hektarów",
    description: "Angielski park krajobrazowy ze stawami, białymi altanami i pomnikami przyrody. Bajkowe tło dla ceremonii i sesji zdjęciowych.",
    image: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/na-strone_800.jpg",
  },
];

const CUISINE = [
  "Kuchnia polska",
  "Kuchnia śródziemnomorska",
  "Kuchnia fusion",
  "Kuchnia orientalna",
  "Opcje wegetariańskie i wegańskie",
];

export default function WeddingsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const stylesRef = useScrollReveal<HTMLDivElement>({ children: true, stagger: 0.1 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wedding-hero-text",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.15, delay: 0.3 }
      );

      gsap.utils.toArray<HTMLElement>(".space-card").forEach((card) => {
        const img = card.querySelector("img");
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 80%" },
          }
        );
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef as React.RefObject<HTMLDivElement>}>
      {/* Hero */}
      <section
        className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/dsc_8185_107.jpg"
            alt="Wesele w Pałacu Pass"
            className="h-full w-full object-cover"
          />
          <div className="video-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 text-center px-6">
          <span
            className="wedding-hero-text block text-xs tracking-[0.4em] uppercase mb-6 opacity-0"
            style={{ fontFamily: "var(--font-sans)", color: "var(--color-gold-light)" }}
          >
            Oferta weselna
          </span>
          <h1
            className="wedding-hero-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-0"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, color: "var(--color-cream)" }}
          >
            Twoje wymarzone
            <br />
            <span style={{ color: "var(--color-gold)" }}>wesele</span>
          </h1>
          <p
            className="wedding-hero-text mt-8 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300, color: "rgba(242,235,223,0.8)" }}
          >
            Dobre historie zaczynają się w miejscach, które zapamiętujemy na lata.
          </p>
        </div>
      </section>

      {/* Spaces */}
      <section className="py-16 sm:py-24 md:py-40 px-6 md:px-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Przestrzenie"
            title="Trzy wyjątkowe miejsca"
            subtitle="Każda przestrzeń opowiada inną historię. Wybierz tło dla swojego dnia."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {SPACES.map((space) => (
              <div key={space.title} className="space-card group">
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="h-full w-full object-cover scale-110 transition-transform duration-[1.5s] ease-[var(--ease-smooth)] group-hover:scale-100"
                  />
                </div>
                <span
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-sans)", color: "var(--color-gold)" }}
                >
                  {space.capacity}
                </span>
                <h3
                  className="mt-2 text-2xl md:text-3xl"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 300, color: "var(--color-forest)" }}
                >
                  {space.title}
                </h3>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300, color: "var(--color-charcoal-light)" }}
                >
                  {space.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding styles */}
      <section className="py-16 sm:py-24 md:py-40 px-6 md:px-12" style={{ backgroundColor: "var(--color-alabaster)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Style"
            title="Jaki styl Wam odpowiada?"
            subtitle="Pałac Pass dopasowuje się do Waszej wizji."
          />
          <div ref={stylesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WEDDING_STYLES.map((style) => (
              <div
                key={style.name}
                className="p-6 sm:p-8 border transition-all duration-500 hover:border-gold group"
                style={{ borderColor: "rgba(181, 154, 110, 0.2)" }}
              >
                <h4
                  className="text-2xl tracking-tight transition-colors duration-300 group-hover:text-forest"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 300, color: "var(--color-forest)" }}
                >
                  {style.name}
                </h4>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300, color: "var(--color-charcoal-light)" }}
                >
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisine */}
      <section className="py-16 sm:py-24 md:py-40 px-6 md:px-12" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            label="Kuchnia"
            title="Kulinarne doznania"
            subtitle="Menu dopasowane do stylu Waszego przyjęcia."
          />
          <div className="flex flex-wrap justify-center gap-4">
            {CUISINE.map((item) => (
              <span
                key={item}
                className="px-4 sm:px-6 py-3 text-sm tracking-[0.15em] uppercase border transition-all duration-300 hover:bg-forest hover:text-cream hover:border-forest"
                style={{
                  fontFamily: "var(--font-sans)",
                  borderColor: "var(--color-gold)",
                  color: "var(--color-forest)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 sm:py-24 md:py-40 px-6 md:px-12 text-center"
        style={{ backgroundColor: "var(--color-forest)" }}
      >
        <span
          className="text-xs tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-gold)" }}
        >
          Zarezerwuj termin
        </span>
        <h2
          className="mt-6 text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 300, color: "var(--color-cream)" }}
        >
          Twoja historia zaczyna się tutaj
        </h2>
        <a
          href="/#contact"
          className="magnetic-btn mt-8 sm:mt-10 inline-block px-8 sm:px-12 py-5 text-sm tracking-[0.15em] sm:tracking-[0.25em] uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            backgroundColor: "var(--color-gold)",
            color: "var(--color-forest)",
          }}
        >
          <span>Zapytaj o termin</span>
        </a>
        <p
          className="mt-8 text-base"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300, color: "rgba(242,235,223,0.6)" }}
        >
          +48 785 897 157 · dustin.nowak@palacpass.pl
        </p>
      </section>
    </div>
  );
}
