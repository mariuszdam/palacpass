"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: "power2.inOut" }
    )
      .fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.3
      )
      .to(textRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        delay: 0.3,
      })
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--color-forest)" }}
    >
      <h1
        ref={textRef}
        className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tight opacity-0"
        style={{ color: "var(--color-gold)", fontFamily: "var(--font-serif)" }}
      >
        Pałac Pass
      </h1>
      <div
        ref={lineRef}
        className="mt-8 h-px w-32 sm:w-48 origin-left"
        style={{ backgroundColor: "var(--color-gold)", transform: "scaleX(0)" }}
      />
      <p
        className="mt-6 text-sm tracking-[0.3em] uppercase opacity-60"
        style={{ color: "var(--color-cream)", fontFamily: "var(--font-sans)" }}
      >
        Est. 1830
      </p>
    </div>
  );
}
