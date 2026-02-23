"use client";

import { useEffect, useRef } from "react";
import NavIcon from "@/app/components/NavIcon";
import AboutHeroSection from "@/app/components/AboutHeroSection";

export default function AboutPage() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  return (
    <div className="bg-white">
      <NavIcon />
      <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px]">

        {/* Hero — h1 sticks, h2 scrolls away naturally */}
        <div className="relative" style={{ minHeight: "80vh" }}>

          <h1
            ref={h1Ref}
            className="sticky text-4xl md:text-8xl font-bold uppercase tracking-tight text-black z-30"
            style={{ top: 100, lineHeight: "0.6" }}
          >
            <span className="block">MICHAEL</span>
            <span className="block mt-2 md:mt-4">CHARLES</span>
            <span className="block mt-2 md:mt-4">BROWN</span>
          </h1>

          {/* h2 — normal flow, bottom-right, scrolls away as you scroll down */}
          <div className="absolute bottom-0 right-0 text-right">
            <h2
              className="text-xl md:text-3xl font-normal uppercase tracking-tight text-black"
              style={{ lineHeight: "0.8" }}
            >
              <span className="block">COMPOSER///</span>
              <span className="block mt-1">RECORDING</span>
              <span className="block mt-1">ARTIST</span>
            </h2>
          </div>

        </div>

        {/* Image + bio scrolls up from below, behind the sticky h1 */}
        <AboutHeroSection />

      </main>
    </div>
  );
}