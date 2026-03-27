"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NavIcon from "@/app/components/NavIcon";
import KineticFooter from "@/app/components/KineticFooter";
import { ABOUT_HEADLINE, ABOUT_PARAGRAPHS } from "@/data/aboutContent";

export default function HomePageClient() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReducedMotion(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <div className="home-page bg-black text-white">
      <NavIcon />
      <section className="home-hero" aria-label="Introduction">
        <div className="home-hero__media" aria-hidden="true">
          <Image
            src="/images/michael-charles-brown.jpg"
            alt=""
            fill
            className="home-hero__img object-cover object-center grayscale"
            sizes="100vw"
            priority
          />
          <div className="home-hero__scrim" />
        </div>

        <div className="home-hero__content">
          <div className="home-hero__grid">
            <div className="home-hero__left">
              <div className="home-hero__left-top">
                <p className="home-hero__label">COMPOSER///PRODUCER///RECORDING ARTIST</p>
                <p className="home-hero__monogram">M/C/B</p>
              </div>
              <div className="home-hero__cta">
                <p className="home-hero__cta-line">
                  <span className="home-hero__cta-row">Let&apos;s work</span>
                  <span className="home-hero__cta-row">together.</span>
                </p>
                <a href="mailto:hello@michaelcharlesbrown.com" className="home-hero__say-hello">
                  Say hello
                </a>
              </div>
            </div>

            <div className="home-hero__right">
              <h1 className="home-hero__headline">{ABOUT_HEADLINE}</h1>
              <div className="home-hero__body">
                {ABOUT_PARAGRAPHS.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <KineticFooter reducedMotion={reducedMotion} className="home-kinetic-footer" />
    </div>
  );
}
