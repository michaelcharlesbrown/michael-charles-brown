"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = ["/test/1.jpg", "/test/2.jpg", "/test/3.jpg"];

const GRID_ROWS = 3;
const GRID_COLS = 3;

/**
 * Scale multiplier per grid position.
 * Center cell stretches most, edges less, corners least.
 *
 *   1.1  1.2  1.1
 *   1.2  1.8  1.2
 *   1.1  1.2  1.1
 */
const SCALE_MAP: number[][] = [
  [1.1, 1.2, 1.1],
  [1.2, 1.8, 1.2],
  [1.1, 1.2, 1.1],
];

export default function ElasticScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".elastic-slide");

      slides.forEach((slide) => {
        const cells = slide.querySelectorAll<HTMLElement>(".grid-cell");

        cells.forEach((cell) => {
          const row = Number(cell.dataset.row);
          const col = Number(cell.dataset.col);
          const maxScale = SCALE_MAP[row][col];

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

          gsap.fromTo(
            cell,
            { scaleY: maxScale },
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="elastic-gallery">
      {SLIDES.map((src, i) => (
        <Slide key={i} src={src} index={i} />
      ))}
    </div>
  );
}

function Slide({ src, index }: { src: string; index: number }) {
  const cells: { row: number; col: number }[] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      cells.push({ row: r, col: c });
    }
  }

  return (
    <section
      className="elastic-slide"
      style={{ height: "100vh", width: "100%", overflow: "hidden" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          width: "100%",
          height: "100%",
        }}
      >
        {cells.map(({ row, col }) => (
          <div
            key={`${row}-${col}`}
            className="grid-cell"
            data-row={row}
            data-col={col}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${GRID_COLS * 100}% ${GRID_ROWS * 100}%`,
              backgroundPosition: `${(col / (GRID_COLS - 1)) * 100}% ${(row / (GRID_ROWS - 1)) * 100}%`,
              willChange: "transform",
              transformOrigin: row === 0 ? "top" : row === 2 ? "bottom" : "center",
            }}
          />
        ))}
      </div>
    </section>
  );
}
