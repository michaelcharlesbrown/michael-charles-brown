"use client";

import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

const MIN_PX = 6;
const MAX_PX = 5000;

function fitNavFontSize(nav: HTMLElement, maxWidth: number) {
  if (maxWidth <= 0) return;

  nav.style.fontSize = `${MAX_PX}px`;
  if (nav.scrollWidth <= maxWidth) {
    nav.style.fontSize = `${MAX_PX}px`;
    return;
  }

  nav.style.fontSize = `${MIN_PX}px`;
  if (nav.scrollWidth > maxWidth) {
    return;
  }

  let lo = MIN_PX;
  let hi = MAX_PX;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    nav.style.fontSize = `${mid}px`;
    if (nav.scrollWidth <= maxWidth) lo = mid;
    else hi = mid;
  }
  nav.style.fontSize = `${lo}px`;
}

interface ProjectLinksFitProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

/** Pipe-separated project links on one row; font size scales so the row fits the container width. */
export default function ProjectLinksFit({ children, className = "", "aria-label": ariaLabel }: ProjectLinksFitProps) {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const run = () => {
      fitNavFontSize(nav, nav.clientWidth);
    };

    run();
    void document.fonts.ready.then(() => requestAnimationFrame(run));

    const ro = new ResizeObserver(() => requestAnimationFrame(run));
    ro.observe(nav);
    return () => ro.disconnect();
  }, [children]);

  return (
    <nav ref={navRef} className={className} aria-label={ariaLabel}>
      {children}
    </nav>
  );
}
