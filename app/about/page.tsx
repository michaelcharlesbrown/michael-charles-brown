"use client";

import NavIcon from "@/app/components/NavIcon";
import Image from "next/image";

const MONO = '"IBM Plex Mono", ui-monospace, monospace';

const SOCIAL_LINKS = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "IMDB", href: "https://imdb.com" },
  { label: "BANDCAMP", href: "https://bandcamp.com" },
  { label: "SPOTIFY", href: "https://spotify.com" },
  { label: "YOUTUBE", href: "https://youtube.com" },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <NavIcon />
      <main
        className="mx-auto w-full max-w-[1200px] px-6 md:px-12"
        style={{ paddingTop: "var(--content-top)", paddingBottom: "4rem" }}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Mobile: order 2. Desktop: left column — image + links */}
          <div className="order-2 md:order-1 flex flex-col gap-6 w-full md:w-auto flex-shrink-0">
            <div className="about-page-portrait">
              <Image
                src="/images/michael-charles-brown.jpg"
                alt="Michael Charles Brown"
                width={400}
                height={533}
                className="w-full max-w-[400px] h-auto grayscale rounded-none"
                style={{ borderRadius: 0 }}
                priority
              />
            </div>
            <div
              className="flex flex-col gap-1"
              style={{ fontFamily: MONO, lineHeight: "1" }}
            >
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold uppercase text-black hover:opacity-70 transition-opacity text-lg md:text-xl leading-none"
                  style={{ textDecoration: "none" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile: order 1 (first). Desktop: right column — heading + bio */}
          <div
            className="order-1 md:order-2 flex-1 min-w-0"
            style={{ fontFamily: MONO }}
          >
            <h1 className="font-bold uppercase text-black mb-6 text-lg md:text-xl leading-tight">
              MICHAEL CHARLES BROWN IS A COMPOSER AND RECORDING ARTIST BASED IN LOS ANGELES.
            </h1>
            <div className="text-black text-sm md:text-base leading-relaxed space-y-4">
              <p>
                A composer whose work moves fluidly between film scoring and experimental
                albums. His music blends atmospheric textures with bold rhythmic undercurrents,
                creating sound worlds that feel both cinematic and deeply personal.
              </p>
              <p>
                Most recently, Brown completed the original score for Cancuncito (2025), a
                debut feature headed into festival circulation this year. The project highlights
                his instinct for sculpting immersive themes that heighten narrative and
                emotional depth — a style equally at home in fiction and documentary work.
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
      </main>
    </div>
  );
}
