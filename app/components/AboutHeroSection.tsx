"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const MONO = '"IBM Plex Mono", ui-monospace, monospace';

const SOCIAL_LINKS = [
  { label: "IMDB", href: "https://imdb.com" },
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "BANDCAMP", href: "https://bandcamp.com" },
  { label: "SPOTIFY", href: "https://spotify.com" },
  { label: "YOUTUBE", href: "https://youtube.com" },
];

export default function AboutHeroSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full mb-32">

      {/* Full-width image — parallax, behind everything */}
      <div className="relative w-full overflow-hidden">
        <div ref={imageRef} className="will-change-transform">
          <Image
            src="/images/michael-charles-brown.jpg"
            alt="Michael Charles Brown"
            width={2400}
            height={1600}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Social links — bottom-left over the image */}
        <div
          className="absolute bottom-6 left-0 flex flex-col"
          style={{ mixBlendMode: "difference", color: "white" }}
        >
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{
                fontFamily: MONO,
                fontSize: "28px",
                lineHeight: "1.1",
                fontWeight: "bold",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Headline + bio — right side, over the image */}
        <div
          className="absolute top-0 right-0 h-full flex flex-col justify-center px-8 md:px-12"
          style={{
            width: "55%",
            mixBlendMode: "difference",
            color: "white",
          }}
        >
          <h3
            className="font-bold uppercase mb-6"
            style={{
              fontFamily: MONO,
              fontSize: "clamp(1.4rem, 2.5vw, 2.4rem)",
              lineHeight: "0.88",
            }}
          >
            MICHAEL CHARLES BROWN IS A COMPOSER AND RECORDING ARTIST BASED IN LOS ANGELES.
          </h3>

          <div style={{ fontFamily: MONO, fontSize: "13px", lineHeight: "1.65" }} className="space-y-4">
            <p>
              A composer whose work moves fluidly between film scoring and experimental
              atmospheric textures with bold rhythmic undercurrents, creating sound worlds
              that feel both cinematic and deeply personal.
            </p>
            <p>
              Most recently, Brown completed the original score for Cancuncito (2025), a
              debut feature headed into festival circulation this year. The project highlights
              his instinct for sculpting immersive themes that heighten narrative and
              emotional depth, a style equally at home in fiction and documentary work.
            </p>
            <p>
              As a recording artist, Brown has released a series of albums under various
              monikers and collaborative projects including Red Moon Apostles and Mad Denizen.
              These projects explore everything from meditative, minimalist soundscapes to raw,
              driving post-punk energy, reflecting the wide range of voices he brings to his
              scoring work.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}