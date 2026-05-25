"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

const TRI_VIEW_W = 100;
const TRI_VIEW_H = (TRI_VIEW_W * Math.sqrt(3)) / 2;
const TRI_DISPLAY_W = 44;
const TRI_DISPLAY_H = (TRI_DISPLAY_W * TRI_VIEW_H) / TRI_VIEW_W;

type Phase = "loading" | "wiping" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const triRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("preloaded")) {
      setPhase("done");
    }
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const start = Date.now();
    const minDelay = new Promise<void>((r) => setTimeout(r, 600));

    const imageLoads = Promise.all(
      projects.map(
        (p) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = p.cardPoster;
          })
      )
    );

    const el = triRef.current;
    let rafId: number;

    if (el) {
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / 2000, 1);
        const duration = 45 - progress * 42;
        el.style.animationDuration = `${duration}s`;
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    Promise.all([document.fonts.ready, imageLoads, minDelay]).then(() => {
      cancelAnimationFrame(rafId!);
      if (el) el.style.animationDuration = "3s";
      sessionStorage.setItem("preloaded", "1");
      setTimeout(() => setPhase("wiping"), 100);
    });

    return () => cancelAnimationFrame(rafId!);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader${phase === "wiping" ? " preloader-wipe" : ""}`}
      onAnimationEnd={() => setPhase("done")}
    >
      <div ref={triRef} className="preloader-tri">
        <svg
          width={TRI_DISPLAY_W}
          height={TRI_DISPLAY_H}
          viewBox={`0 0 ${TRI_VIEW_W} ${TRI_VIEW_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={`M${TRI_VIEW_W / 2} 0 L${TRI_VIEW_W} ${TRI_VIEW_H} L0 ${TRI_VIEW_H} Z`}
            fill="white"
          />
        </svg>
        <div className="navTriOverlayWrap">
          <span className="navTriOverlay" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
