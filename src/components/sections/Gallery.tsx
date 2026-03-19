"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    src: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/dsc_8185_107.jpg",
    alt: "Ceremonia slubu w parku palacowym",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://palacpass.pl/wp-content/uploads/2020/11/as__7900_425.jpg",
    alt: "Palacowe wnetrze z kominkiem",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://palacpass.pl/wp-content/uploads/2020/11/as__7991_382.jpg",
    alt: "Rozowa sala jadalniana",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://palacpass.pl/wp-content/uploads/2022/07/dustin-magdalena-wedding-day-1_481-scaled.jpg",
    alt: "Przyjazd do palacu zabytkowym samochodem",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://palacpass.pl/wp-content/uploads/2021/10/rdyf_347.jpg",
    alt: "Wieczorne przyjecie w eleganckiej przestrzeni",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://palacpass.pl/wp-content/uploads/2022/07/alexey_pilipenko-100_628-2048x1365.jpg",
    alt: "Fasada Palacu Pass",
    aspect: "aspect-[4/3]",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            delay: (i % 3) * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="px-6 py-16 md:px-12 sm:py-24 md:py-40"
      style={{ backgroundColor: "var(--color-forest)" }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Galeria"
          title="Poznaj Palac"
          subtitle="Eleganckie wnetrza, malowniczy park i unikatowa architektura."
          light
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((image, i) => (
            <div
              key={i}
              className="gallery-item"
              data-cursor="View"
            >
              <div
                className={`group relative overflow-hidden ${image.aspect}`}
                style={{ backgroundColor: "rgba(242, 235, 223, 0.08)" }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-smooth)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <p
                className="mt-4 text-center text-sm uppercase tracking-[0.28em]"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-gold)",
                  opacity: 0.78,
                }}
              >
                {image.alt}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24">
          <div className="relative aspect-video overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              className="h-full w-full object-cover"
            >
              <source
                src="https://palacpass.pl/wp-content/uploads/2022/08/dji_0339_434.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p
            className="mt-4 text-center text-sm uppercase tracking-[0.3em]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-gold)",
              opacity: 0.7,
            }}
          >
            Lot nad Palacem Pass - widok z lotu ptaka
          </p>
        </div>
      </div>
    </section>
  );
}
