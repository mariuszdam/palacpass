"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/videos/hero.mp4");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 2.8 }
      );

      gsap.to(mediaRef.current, {
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

  useEffect(() => {
    const video = mediaRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        setVideoSrc(
          "https://palacpass.pl/wp-content/uploads/2022/08/dji_0314_366.mp4"
        );
      }
    };

    void tryPlay();
  }, [videoSrc]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
        />
        <video
          ref={mediaRef}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nofullscreen noremoteplayback nodownload"
          preload="metadata"
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          poster="/images/hero-poster.jpg"
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          onError={() =>
            setVideoSrc("https://palacpass.pl/wp-content/uploads/2022/08/dji_0314_366.mp4")
          }
          style={{
            filter: "brightness(0.68) contrast(1.18) saturate(0.82) sepia(0.12)",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="video-overlay absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(242,235,223,0.08) 0%, rgba(53,58,44,0.08) 28%, rgba(22,18,15,0.58) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-40 md:h-56"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,11,10,0.42) 0%, rgba(13,11,10,0) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 md:h-72"
          style={{
            background:
              "linear-gradient(to top, rgba(13,11,10,0.72) 0%, rgba(13,11,10,0) 100%)",
          }}
        />
      </div>
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        <span
          className="text-[10px] uppercase tracking-[0.4em]"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-cream)",
            opacity: 0.6,
          }}
        >
          Przewin
        </span>
        <div
          className="h-12 w-px animate-pulse"
          style={{ backgroundColor: "var(--color-gold)", opacity: 0.6 }}
        />
      </div>
    </section>
  );
}
