"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "O Pałacu", href: "#intro" },
  { label: "Przestrzenie", href: "#venues" },
  { label: "Galeria", href: "#gallery" },
  { label: "Historia", href: "#history" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        menuRef.current,
        { clipPath: "circle(0% at calc(100% - 3rem) 2rem)" },
        {
          clipPath: "circle(150% at calc(100% - 3rem) 2rem)",
          duration: 0.8,
          ease: "power4.inOut",
        }
      );
      gsap.fromTo(
        ".menu-link",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 3rem) 2rem)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
          isScrolled
            ? "bg-cream/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="/"
          className="relative z-50 flex flex-col items-start"
          data-cursor="Home"
        >
          <span
            className="text-2xl md:text-3xl tracking-tight"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              color: isScrolled || isOpen ? "var(--color-forest)" : "var(--color-cream)",
              transition: "color 0.5s",
            }}
          >
            Pałac Pass
          </span>
          <span
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: isScrolled ? "var(--color-gold)" : "var(--color-gold-light)",
              transition: "color 0.5s",
            }}
          >
            Est. 1830
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase transition-colors duration-300 hover:opacity-100"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                color: isScrolled ? "var(--color-charcoal)" : "var(--color-cream)",
                opacity: 0.8,
              }}
              data-cursor="View"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="magnetic-btn ml-4 px-6 py-3 border text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              fontFamily: "var(--font-sans)",
              borderColor: isScrolled ? "var(--color-forest)" : "var(--color-cream)",
              color: isScrolled ? "var(--color-forest)" : "var(--color-cream)",
            }}
            data-cursor="Book"
          >
            <span>Zapytaj o termin</span>
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex flex-col items-end gap-[6px] lg:hidden p-3"
          aria-label="Menu"
        >
          <span
            className={`block h-[1.5px] w-7 transition-all duration-500 ${
              isOpen ? "rotate-45 translate-y-[3.75px]" : ""
            }`}
            style={{
              backgroundColor: isOpen
                ? "var(--color-cream)"
                : isScrolled
                ? "var(--color-charcoal)"
                : "var(--color-cream)",
            }}
          />
          <span
            className={`block h-[1.5px] transition-all duration-500 ${
              isOpen ? "w-7 -rotate-45 -translate-y-[3.75px]" : "w-5"
            }`}
            style={{
              backgroundColor: isOpen
                ? "var(--color-cream)"
                : isScrolled
                ? "var(--color-charcoal)"
                : "var(--color-cream)",
            }}
          />
        </button>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "var(--color-forest)",
          clipPath: "circle(0% at calc(100% - 3rem) 2rem)",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="menu-link text-3xl sm:text-4xl md:text-6xl tracking-tight transition-colors duration-300"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                color: "var(--color-cream)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-4">
          <a
            href="tel:+48785897157"
            className="text-sm tracking-widest"
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-sans)" }}
          >
            +48 785 897 157
          </a>
          <p
            className="text-xs tracking-widest uppercase opacity-50"
            style={{ color: "var(--color-cream)", fontFamily: "var(--font-sans)" }}
          >
            Pass 1, 05-870 Błonie
          </p>
        </div>
      </div>
    </>
  );
}
