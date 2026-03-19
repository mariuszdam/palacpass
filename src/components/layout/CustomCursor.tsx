"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    if (!cursor || !cursorText) return;

    const moveCursor = gsap.quickTo(cursor, "css", {
      duration: 0.5,
      ease: "power3",
    });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 4);
      yTo(e.clientY - 4);
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const label = target.dataset.cursor || "";
      cursor.classList.add("expanded");
      if (label) {
        cursorText.textContent = label;
        cursorText.style.opacity = "1";
      }
    };

    const onMouseLeaveInteractive = () => {
      cursor.classList.remove("expanded");
      cursorText.style.opacity = "0";
      cursorText.textContent = "";
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("[data-cursor]");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    // Hide on touch devices
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    if (mediaQuery.matches) {
      cursor.style.display = "none";
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-dot hidden md:block">
      <span
        ref={cursorTextRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium uppercase tracking-widest opacity-0 transition-opacity duration-300 whitespace-nowrap"
        style={{ color: "var(--color-forest)" }}
      />
    </div>
  );
}
