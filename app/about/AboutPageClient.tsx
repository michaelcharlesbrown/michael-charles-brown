"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavIcon from "@/app/components/NavIcon";
import KineticFooter from "@/app/components/KineticFooter";

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS = [
  "A composer whose work moves fluidly between film scoring and experimental albums. His music blends atmospheric textures with bold rhythmic undercurrents, creating sound worlds that feel both cinematic and deeply personal.",
  "Most recently, Brown completed the original score for Cancuncito (2025), a debut feature headed into festival circulation this year. The project highlights his instinct for sculpting immersive themes that heighten narrative and emotional depth — a style equally at home in fiction and documentary work.",
  "As a recording artist, Brown has released a series of albums under various monikers and collaborative projects including Red Moon Apostles and Mad Denizen. These projects explore everything from meditative, minimalist soundscapes to raw, driving post-punk energy, reflecting the wide range of voices he brings to his scoring work.",
];

export default function AboutPageClient() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReducedMotion(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const fn = () => setIsMobile(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const section = sectionRef.current;
    const photo = photoRef.current;
    const cta = ctaRef.current;
    if (!section || !photo || !cta) return;

    const ctx = gsap.context(() => {
      gsap.set(cta, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const cap = 0.56;
          const photoY = -130 * Math.min(p / cap, 1);
          gsap.set(photo, { yPercent: photoY });
          const ctaOpacity = p < 0.52 ? 0 : Math.min((p - 0.52) / 0.28, 1);
          gsap.set(cta, { opacity: ctaOpacity, y: (1 - ctaOpacity) * 28 });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    const t = () => ScrollTrigger.refresh();
    window.addEventListener("load", t);
    return () => window.removeEventListener("load", t);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <NavIcon />
      <main className="about-main mx-auto w-full max-w-[2400px]">
        <section ref={sectionRef} className="about-isolate">
          <div className="about-scroll-inner">
            <div className="about-root">
              <div className="about-label">
                COMPOSER///PRODUCER///RECORDING ARTIST
              </div>

              <div className="about-monogram">M/C/B</div>

              <div className="about-right-wrap">
                <div className="about-right-inner">
                  <h1 className="about-headline">
                    MICHAEL CHARLES BROWN IS A COMPOSER AND RECORDING ARTIST BASED IN LOS ANGELES.
                  </h1>
                  <div className="about-body">
                    {PARAGRAPHS.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div ref={photoRef} className="about-photo-wrap">
                <div className="about-page-portrait">
                  <Image
                    src="/images/michael-charles-brown.jpg"
                    alt="Michael Charles Brown"
                    width={800}
                    height={1066}
                    className="about-photo w-full max-w-full h-auto grayscale"
                    sizes="(max-width: 768px) 100vw, min(960px, 40vw)"
                    priority
                  />
                </div>
              </div>

              <div
                ref={ctaRef}
                className="about-cta"
                style={
                  reducedMotion || isMobile
                    ? undefined
                    : { opacity: 0, transform: "translateY(20px)" }
                }
              >
                <p className="about-cta-line">
                  <span className="about-cta-line__row">Let&apos;s work</span>
                  <span className="about-cta-line__row">together.</span>
                </p>
                <a
                  href="mailto:hello@michaelcharlesbrown.com"
                  className="about-say-hello"
                >
                  Say hello
                </a>
              </div>
            </div>
          </div>
        </section>

        <KineticFooter reducedMotion={reducedMotion} />
      </main>
    </div>
  );
}
