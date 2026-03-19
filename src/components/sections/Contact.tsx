"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    guests: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-info > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".form-field",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    fontFamily: "var(--font-sans)",
    backgroundColor: "transparent",
    borderBottom: "1px solid rgba(181, 154, 110, 0.4)",
    color: "var(--color-charcoal)",
    outline: "none",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-40 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Kontakt"
          title="Zaplanuj wydarzenie"
          subtitle="Opowiedz nam o swoim wymarzonym dniu. Odpowiemy w ciągu 24 godzin."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-16 md:gap-24">
          {/* Contact info */}
          <div className="contact-info lg:col-span-2 space-y-6 sm:space-y-10">
            <div>
              <h4
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-gold)",
                }}
              >
                Adres
              </h4>
              <p
                className="text-xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  color: "var(--color-forest)",
                }}
              >
                Pass 1<br />
                05-870 Błonie<br />
                Polska
              </p>
            </div>

            <div>
              <h4
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-gold)",
                }}
              >
                Telefon
              </h4>
              <a
                href="tel:+48785897157"
                className="text-xl transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  color: "var(--color-forest)",
                }}
              >
                +48 785 897 157
              </a>
            </div>

            <div>
              <h4
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-gold)",
                }}
              >
                Dyrektor
              </h4>
              <p
                className="text-xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 300,
                  color: "var(--color-forest)",
                }}
              >
                Dustin Nowak
              </p>
              <a
                href="mailto:dustin.nowak@palacpass.pl"
                className="text-sm mt-1 inline-block transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-charcoal-light)",
                }}
              >
                dustin.nowak@palacpass.pl
              </a>
            </div>

            <div>
              <h4
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-gold)",
                }}
              >
                Jak dojechać
              </h4>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 300,
                  color: "var(--color-charcoal-light)",
                }}
              >
                30 km od centrum Warszawy.
                <br />W pobliżu Żelazowej Woli — miejsca urodzenia Fryderyka
                Chopina.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            className="lg:col-span-3 space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-field">
                <label
                  className="block text-xs tracking-[0.2em] uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gold)",
                  }}
                >
                  Imię i nazwisko
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full py-3.5 text-base transition-all duration-300 focus:border-b-forest"
                  style={inputStyle}
                  placeholder="Anna Kowalska"
                />
              </div>
              <div className="form-field">
                <label
                  className="block text-xs tracking-[0.2em] uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gold)",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3.5 text-base transition-all duration-300"
                  style={inputStyle}
                  placeholder="anna@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-field">
                <label
                  className="block text-xs tracking-[0.2em] uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gold)",
                  }}
                >
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full py-3.5 text-base transition-all duration-300"
                  style={inputStyle}
                  placeholder="+48 000 000 000"
                />
              </div>
              <div className="form-field">
                <label
                  className="block text-xs tracking-[0.2em] uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gold)",
                  }}
                >
                  Rodzaj wydarzenia
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full py-3.5 text-base transition-all duration-300"
                  style={inputStyle}
                >
                  <option value="">Wybierz...</option>
                  <option value="wedding">Wesele</option>
                  <option value="corporate">Event korporacyjny</option>
                  <option value="photoshoot">Sesja zdjęciowa</option>
                  <option value="other">Inne</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-field">
                <label
                  className="block text-xs tracking-[0.2em] uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gold)",
                  }}
                >
                  Planowana data
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full py-3.5 text-base transition-all duration-300"
                  style={inputStyle}
                />
              </div>
              <div className="form-field">
                <label
                  className="block text-xs tracking-[0.2em] uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-gold)",
                  }}
                >
                  Liczba gości
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full py-3.5 text-base transition-all duration-300"
                  style={inputStyle}
                  placeholder="np. 120"
                />
              </div>
            </div>

            <div className="form-field">
              <label
                className="block text-xs tracking-[0.2em] uppercase mb-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-gold)",
                }}
              >
                Wiadomość
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full py-3.5 text-base transition-all duration-300 resize-none"
                style={inputStyle}
                placeholder="Opowiedz nam o swoim wydarzeniu..."
              />
            </div>

            <div className="form-field pt-4">
              <button
                type="submit"
                className="magnetic-btn w-full md:w-auto px-8 sm:px-12 py-5 text-sm tracking-[0.25em] uppercase transition-all duration-500"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  backgroundColor: "var(--color-forest)",
                  color: "var(--color-cream)",
                }}
                data-cursor="Send"
              >
                <span>Wyślij zapytanie</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
