"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavIcon from "@/app/components/NavIcon";
import KineticFooter from "@/app/components/KineticFooter";
import FitWidthLine from "@/components/project/FitWidthLine";
import { ABOUT_HEADLINE, ABOUT_PARAGRAPHS } from "@/data/aboutContent";

export default function AboutPageClient() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReducedMotion(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image peels up at a lagged rate — scrub: 1.5 creates the eased,
      // slightly-behind-scroll feel the user wants rather than 1:1 tracking
      gsap.to(mediaRef.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="home-page">
      <NavIcon />
      <section ref={heroRef} className="home-hero" aria-label="About Michael Charles Brown">
        <div ref={mediaRef} className="home-hero__media" aria-hidden="true">
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
                <FitWidthLine
                  text="COMPOSER///PRODUCER///RECORDING ARTIST"
                  textClassName="about-label-fit"
                />
                <FitWidthLine
                  text="M/C/B"
                  textClassName="about-monogram-fit"
                />
              </div>
              <div className="home-hero__cta">
                <div className="home-hero__cta-line">
                  <FitWidthLine text="Let's work" textClassName="home-hero__cta-fit" />
                  <FitWidthLine text="together." textClassName="home-hero__cta-fit" />
                </div>
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
