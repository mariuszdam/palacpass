"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: "1830", label: "Rok założenia" },
  { number: "17", label: "Hektarów parku" },
  { number: "170", label: "Gości w oranżerii" },
  { number: "56", label: "Miejsc noclegowych" },
];

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useScrollReveal<HTMLDivElement>({
    children: true,
    stagger: 0.15,
    y: 50,
  });
  const textRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      // Image parallax
      const img = imageRef.current?.querySelector("img");
      if (img) {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-40 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="O Pałacu"
          title="Ponadczasowe piękno"
          subtitle="Jedna z najpiękniejszych XIX-wiecznych rezydencji w okolicach Warszawy, odrestaurowana z dbałością o każdy detal."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <img
              src="https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/na-strone_800.jpg"
              alt="Pałac Pass — zabytkowa rezydencja z XIX wieku"
              className="h-full w-full object-cover scale-110"
            />
          </div>

          {/* Text */}
          <div ref={textRef}>
            <p
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "var(--color-charcoal-light)",
              }}
            >
              Pałac Pass to klasycystyczna rezydencja wzniesiona w 1830 roku,
              położona u zbiegu rzek Utraty i Rokitnicy. Otoczony
              siedemnastohektarowym parkiem krajobrazowym w stylu angielskim,
              stanowi enklawę ciszy i ptasiego śpiewu.
            </p>
            <p
              className="text-lg md:text-xl leading-relaxed mb-12"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                color: "var(--color-charcoal-light)",
              }}
            >
              Marmurowe posadzki, kryształowe żyrandole, ozdobne drzwi,
              zwierciadła, antyczne meble, obrazy i marmurowe rzeźby tworzą
              atmosferę, w której każde spotkanie staje się wyjątkowym
              wydarzeniem.
            </p>
            <div className="gold-line mb-12" />

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <span
                    className="block text-3xl sm:text-4xl md:text-5xl"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 300,
                      color: "var(--color-forest)",
                    }}
                  >
                    {stat.number}
                  </span>
                  <span
                    className="block mt-2 text-xs tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-gold)",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
