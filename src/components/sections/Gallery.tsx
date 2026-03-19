"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    src: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/dsc_1965-kopia.jpg",
    alt: "Wnętrze pałacu — elegancki salon",
    span: "md:col-span-1 md:row-span-2",
    aspect: "aspect-[4/3] md:aspect-[3/4]",
  },
  {
    src: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/dsc_8185_107.jpg",
    alt: "Ceremonia ślubna w parku pałacowym",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/alexey_pilipenko-431.jpg",
    alt: "Ogród pałacowy — letnie przyjęcie",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/na-strone_800.jpg",
    alt: "Pałac Pass — fasada od strony parku",
    span: "md:col-span-2 md:row-span-1",
    aspect: "aspect-[21/9]",
  },
  {
    src: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/rdyf_347.jpg",
    alt: "Sala balowa — spotkanie biznesowe",
    span: "col-span-1 row-span-1",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://uqkbgkxqwnyinzfgrwec.supabase.co/storage/v1/object/public/assets/images/hgjk_777.jpg",
    alt: "Detale architektoniczne pałacu",
    span: "col-span-1 row-span-1",
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
      className="py-16 sm:py-24 md:py-40 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-forest)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Galeria"
          title="Poznaj Pałac"
          subtitle="Eleganckie wnętrza, malowniczy park i unikatowa architektura."
          light
        />

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((image, i) => (
            <div
              key={i}
              className={`gallery-item img-zoom ${image.span}`}
              data-cursor="View"
            >
              <div className={`relative overflow-hidden ${image.aspect}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-forest/0 transition-colors duration-500 hover:bg-forest/20 flex items-end p-6">
                  <span
                    className="text-sm tracking-widest opacity-0 translate-y-4 transition-all duration-500"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-cream)",
                    }}
                  >
                    {image.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drone video section */}
        <div className="mt-16 md:mt-24">
          <div className="relative aspect-video overflow-hidden" data-cursor="Play">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source
                src="https://palacpass.pl/wp-content/uploads/2022/08/dji_0339_434.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-500 hover:scale-110"
                style={{ backgroundColor: "rgba(181, 154, 110, 0.3)" }}
              >
                <svg
                  className="w-4 h-4 md:w-6 md:h-6 ml-1"
                  fill="var(--color-cream)"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <p
            className="mt-4 text-center text-sm tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-gold)",
              opacity: 0.7,
            }}
          >
            Lot nad Pałacem Pass — widok z lotu ptaka
          </p>
        </div>
      </div>
    </section>
  );
}
