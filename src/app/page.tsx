"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const SLIDES = ["/test/1.jpg", "/test/2.jpg", "/test/3.jpg"];

const ROWS = 3;
const COLS = 3;

/**
 * Scale multiplier per grid position.
 * Center cell stretches most, edges less, corners least.
 */
const SCALE_MAP: number[][] = [
  [1.1, 1.2, 1.1],
  [1.2, 1.8, 1.2],
  [1.1, 1.2, 1.1],
];

export default function ElasticScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    if (!gsapReady) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gsap = (window as any).gsap;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".elastic-slide");

      slides.forEach((slide: HTMLElement, i: number) => {
        const cells = slide.querySelectorAll<HTMLElement>(".grid-cell");

        cells.forEach((cell: HTMLElement) => {
          const row = Number(cell.dataset.row);
          const col = Number(cell.dataset.col);
          const maxScale = SCALE_MAP[row][col];

          // First slide is already in viewport on load — skip enter anim
          if (i > 0) {
            gsap.fromTo(
              cell,
              { scaleY: 1 },
              {
                scaleY: maxScale,
                ease: "none",
                scrollTrigger: {
                  trigger: slide,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                },
              }
            );
          }

          gsap.fromTo(
            cell,
            { scaleY: i === 0 ? 1 : maxScale },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, [gsapReady]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          const st = document.createElement("script");
          st.src =
            "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js";
          st.onload = () => setGsapReady(true);
          document.head.appendChild(st);
        }}
      />
      <div ref={containerRef} style={{ background: "#000" }}>
        {SLIDES.map((src, i) => (
          <Slide key={i} src={src} />
        ))}
      </div>
    </>
  );
}

function Slide({ src }: { src: string }) {
  const cellWidth = 100 / COLS;
  const cellHeight = 100 / ROWS;

  const cells: { row: number; col: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      cells.push({ row: r, col: c });
    }
  }

  return (
    <section
      className="elastic-slide"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {cells.map(({ row, col }) => (
        <div
          key={`${row}-${col}`}
          className="grid-cell"
          data-row={row}
          data-col={col}
          style={{
            position: "absolute",
            top: `${row * cellHeight}%`,
            left: `${col * cellWidth}%`,
            width: `${cellWidth}%`,
            height: `${cellHeight}%`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
            willChange: "transform",
            transformOrigin:
              row === 0 ? "top" : row === ROWS - 1 ? "bottom" : "center",
            transition: "none",
            margin: 0,
            padding: 0,
            border: "none",
          }}
        />
      ))}
    </section>
  );
}
