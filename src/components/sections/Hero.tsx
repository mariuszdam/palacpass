"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation (after preloader)
      const tl = gsap.timeline({ delay: 2.8 });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );

      // Parallax on scroll
      gsap.to(titleRef.current, {
        yPercent: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Video zoom on scroll
      gsap.to(videoRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          {/* Using existing drone footage as placeholder */}
          <source
            src="https://palacpass.pl/wp-content/uploads/2022/08/dji_0314_366.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight opacity-0"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            color: "var(--color-cream)",
          }}
        >
          Pałac
          <br />
          <span style={{ color: "var(--color-gold)" }}>Pass</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 text-sm md:text-base tracking-[0.35em] uppercase opacity-0"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "var(--color-cream)",
            opacity: 0,
          }}
        >
          Gdzie ponadczasowe historie mają swój początek
        </p>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto items-center">
          <a
            href="#venues"
            className="magnetic-btn px-6 sm:px-8 py-4 border text-sm tracking-[0.2em] uppercase transition-all duration-500 w-full sm:w-auto text-center"
            style={{
              fontFamily: "var(--font-sans)",
              borderColor: "rgba(242,235,223,0.4)",
              color: "var(--color-cream)",
            }}
            data-cursor="Explore"
          >
            <span>Odkryj pałac</span>
          </a>
          <a
            href="#contact"
            className="magnetic-btn px-6 sm:px-8 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-500 w-full sm:w-auto text-center"
            style={{
              fontFamily: "var(--font-sans)",
              backgroundColor: "var(--color-gold)",
              color: "var(--color-forest)",
            }}
            data-cursor="Book"
          >
            <span>Zapytaj o termin</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-cream)",
            opacity: 0.6,
          }}
        >
          Przewiń
        </span>
        <div
          className="h-12 w-px animate-pulse"
          style={{ backgroundColor: "var(--color-gold)", opacity: 0.6 }}
        />
      </div>
    </section>
  );
}
