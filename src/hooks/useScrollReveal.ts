"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  children?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    y = 60,
    opacity = 0,
    duration = 1,
    delay = 0,
    stagger = 0.1,
    ease = "power3.out",
    start = "top 85%",
    children = false,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets = children ? element.children : element;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger: children ? stagger : 0,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [y, opacity, duration, delay, stagger, ease, start, children]);

  return ref;
}
