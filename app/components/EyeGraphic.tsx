"use client";

import { useRef, useEffect } from "react";

const STROKE = 1.25;
const SPOKE_STROKE = STROKE / 2;
const CX = 100;
const CY = 60;
const IRIS_R = 32;
const SPOKE_COUNT = 60;
const PUPIL_BASE_R = 16;
const PUPIL_HOVER_R = 26;
const ERASER_GAP = 2.25;
const IN_MS = 1200;
const OUT_MS = 1200;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

const toRad = (d: number) => (d * Math.PI) / 180;

export function EyeGraphic() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);
  const pupilEraserRef = useRef<SVGCircleElement>(null);
  const spokesRef = useRef<SVGGElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const spokes = spokesRef.current;
    if (!spokes) return;

    spokes.innerHTML = "";
    const rOuter = IRIS_R + 2;
    const rInner = 0;

    for (let i = 0; i < SPOKE_COUNT; i++) {
      const a = (i / SPOKE_COUNT) * 360;
      const cos = Math.cos(toRad(a));
      const sin = Math.sin(toRad(a));

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", (CX + rOuter * cos).toFixed(2));
      line.setAttribute("y1", (CY + rOuter * sin).toFixed(2));
      line.setAttribute("x2", (CX + rInner * cos).toFixed(2));
      line.setAttribute("y2", (CY + rInner * sin).toFixed(2));
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", String(SPOKE_STROKE));
      line.setAttribute("stroke-linecap", "butt");

      spokes.appendChild(line);
    }
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const pupil = pupilRef.current;
    const pupilEraser = pupilEraserRef.current;

    if (!svg || !pupil || !pupilEraser) return;

    const pupilEl = pupil;
    const pupilEraserEl = pupilEraser;

    function animateR(
      el: SVGCircleElement,
      toR: number,
      ms: number
    ) {
      const fromR = Number(el.getAttribute("r"));
      const a = el.animate([{ r: fromR }, { r: toR }], {
        duration: ms,
        easing: EASING,
        fill: "forwards",
      });
      a.onfinish = () => el.setAttribute("r", String(toR));
      return a;
    }

    function animatePupil(toR: number, ms: number) {
      animRef.current?.cancel();

      const toEraserR = toR + ERASER_GAP;

      const a1 = animateR(pupilEl, toR, ms);
      const a2 = animateR(pupilEraserEl, toEraserR, ms);

      animRef.current = a1;

      a2.onfinish = () => pupilEraserEl.setAttribute("r", String(toEraserR));
    }

    pupilEl.setAttribute("r", String(PUPIL_BASE_R));
    pupilEraserEl.setAttribute("r", String(PUPIL_BASE_R + ERASER_GAP));

    const onEnter = () => animatePupil(PUPIL_HOVER_R, IN_MS);
    const onLeave = () => animatePupil(PUPIL_BASE_R, OUT_MS);

    svg.addEventListener("mouseenter", onEnter);
    svg.addEventListener("mouseleave", onLeave);

    return () => {
      svg.removeEventListener("mouseenter", onEnter);
      svg.removeEventListener("mouseleave", onLeave);
      animRef.current?.cancel();
    };
  }, []);

  return (
    <div className="flex justify-center pb-8">
      <svg
        ref={svgRef}
        className="eye-graphic mx-auto w-full max-w-[260px] cursor-pointer select-none sm:max-w-[320px] md:max-w-[400px]"
        viewBox="0 0 200 120"
        role="img"
        aria-label="Eye"
      >
        <defs>
          <clipPath id="iris-clip">
            <circle cx={CX} cy={CY} r={IRIS_R} />
          </clipPath>
        </defs>

        <circle cx={CX} cy={CY} r={IRIS_R} fill="var(--background)" />

        <g ref={spokesRef} clipPath="url(#iris-clip)" />

        <circle
          cx={CX}
          cy={CY}
          r={IRIS_R}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
        />

        <circle
          ref={pupilEraserRef}
          id="pupilEraser"
          cx={CX}
          cy={CY}
          r={PUPIL_BASE_R + ERASER_GAP}
          fill="var(--background)"
        />

        <circle
          ref={pupilRef}
          id="pupil"
          cx={CX}
          cy={CY}
          r={PUPIL_BASE_R}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
