"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export interface MarqueeBarProps {
  href: string;
  text: string;
  direction: "left" | "right";
  variant: "dark" | "light";
  reducedMotion: boolean;
}

export default function MarqueeBar({
  href,
  text,
  direction,
  variant,
  reducedMotion,
}: MarqueeBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);

  const startDrift = useCallback(() => {
    const track = trackRef.current;
    if (!track || reducedMotion) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    tweenRef.current?.kill();
    const raw = (gsap.getProperty(track, "x") as number) || 0;
    const r = ((raw % half) + half) % half;
    if (direction === "left") {
      gsap.set(track, { x: -r });
      tweenRef.current = gsap.fromTo(
        track,
        { x: -r },
        { x: -r - half, duration: 26, ease: "none", repeat: -1 }
      );
    } else {
      gsap.set(track, { x: -half + r });
      tweenRef.current = gsap.fromTo(
        track,
        { x: -half + r },
        { x: r, duration: 26, ease: "none", repeat: -1 }
      );
    }
  }, [direction, reducedMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion) return;

    const init = () => {
      gsap.set(track, { x: direction === "left" ? 0 : -track.scrollWidth / 2 });
      startDrift();
    };
    requestAnimationFrame(init);

    let t: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(init, 80);
    });
    ro.observe(track);

    return () => {
      clearTimeout(t);
      ro.disconnect();
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [direction, reducedMotion, startDrift, text]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    tweenRef.current?.pause();
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    const cur = (gsap.getProperty(track, "x") as number) + dx;
    gsap.set(track, { x: cur });
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!draggingRef.current || reducedMotion) return;
    const track = trackRef.current;
    draggingRef.current = false;
    if (track) {
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      startDrift();
    }
  };

  const chunk = `${text} /// ${text} /// ${text} /// `;

  return (
    <a
      href={href}
      className={`marquee-bar ${variant === "dark" ? "marquee-bar--dark" : "marquee-bar--light"}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="overflow-hidden">
        <div ref={trackRef} className="marquee-track">
          <span className="marquee-item">{chunk}</span>
          <span className="marquee-item" aria-hidden>
            {chunk}
          </span>
        </div>
      </div>
    </a>
  );
}
