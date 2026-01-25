"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const PARALLAX_FACTOR = 0.25;
const IMAGE_PARALLAX_FACTOR = 0.08;

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [imageOffsetY, setImageOffsetY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isDesktop) {
        setOffsetY(0);
        setImageOffsetY(0);
        return;
      }
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;

      const scrolled = -rect.top;
      const clamped = Math.max(0, Math.min(scrolled, sectionHeight + viewportHeight));
      setOffsetY(clamped * PARALLAX_FACTOR);
      setImageOffsetY(clamped * IMAGE_PARALLAX_FACTOR);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const transform = isDesktop ? `translateY(${offsetY}px)` : 'none';
  const imageTransform = isDesktop ? `translateY(${imageOffsetY}px)` : 'none';

  return (
    <div ref={sectionRef} className="mb-16 md:mb-32 relative">
      <div
        className="relative w-full md:w-2/3 md:overflow-hidden"
        style={{ transform: imageTransform }}
      >
        <Image
          src="/images/michael-charles-brown.jpg"
          alt="Michael Charles Brown"
          width={2400}
          height={1600}
          className="w-full h-auto object-contain object-left"
          priority
        />
      </div>

      {/* Text Content - Stacked on mobile, overlapping on desktop */}
      <div
        className="mt-8 md:mt-0 md:absolute md:left-[45%] md:top-1/2 md:max-w-[50%] md:pl-8 lg:pl-12 md:z-10"
        style={{
          mixBlendMode: isDesktop ? "difference" : "normal",
          transform,
        }}
      >
        {/* Headline */}
        <h3
          className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-black md:text-white text-left mb-6 md:mb-8"
          style={{ lineHeight: "0.8" }}
        >
          MICHAEL CHARLES BROWN IS A COMPOSER AND RECORDING ARTIST BASED IN LOS
          ANGELES.
        </h3>

        {/* Body Copy */}
        <div className="space-y-6">
          <p className="text-sm md:text-base leading-relaxed text-black md:text-white">
            A composer whose work moves fluidly between film scoring and experimental atmospheric textures with bold rhythmic undercurrents, creating sound worlds that feel both cinematic and deeply personal.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-black md:text-white">
            Most recently, Brown completed the original score for Cancuncito (2025), a debut feature headed into festival circulation this year. The project highlights his instinct for sculpting immersive themes that heighten narrative and emotional depth, a style equally at home in fiction and documentary work.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-black md:text-white">
            As a recording artist, Brown has released a series of albums under various monikers and collaborative projects including Red Moon Apostles and Mad Denizen. These projects explore everything from meditative, minimalist soundscapes to raw, driving post-punk energy, reflecting the wide range of voices he brings to his scoring work.
          </p>
        </div>
      </div>
    </div>
  );
}
