"use client";

import { useEffect, useLayoutEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";

const SNAP_DURATION = 1.2;
const SNAP_EASING = (t: number) => 1 - Math.pow(1 - t, 3);

export default function HomeLenis() {
  useLayoutEffect(() => {
    const slug = sessionStorage.getItem("returnToSlug");
    if (!slug) return;
    sessionStorage.removeItem("returnToSlug");
    const container = document.querySelector<HTMLElement>(".home-snap-container");
    if (!container) return;
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      const card = container.querySelector<HTMLElement>(`[data-desktop-slug="${slug}"]`);
      const section = card?.closest("section") as HTMLElement | null;
      if (section) container.scrollTop = section.offsetTop;
    } else {
      const section = container.querySelector<HTMLElement>(`[data-slug="${slug}"]`);
      if (section) container.scrollTop = section.offsetTop;
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".home-snap-container");
    if (!container) return;

    let rafId: number;
    let currentLenis: Lenis | null = null;
    let currentSnap: Snap | null = null;

    const initDesktop = () => {
      const lenis = new Lenis({ wrapper: container, content: container });
      const snap = new Snap(lenis, {
        type: "mandatory",
        duration: SNAP_DURATION,
        easing: SNAP_EASING,
      });

      document.querySelectorAll<HTMLElement>(".home-snap-row").forEach((el) => {
        snap.addElement(el, { align: ["start"] });
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      currentLenis = lenis;
      currentSnap = snap;
    };

    const destroyDesktop = () => {
      cancelAnimationFrame(rafId);
      if (currentSnap) { currentSnap.destroy(); currentSnap = null; }
      if (currentLenis) { currentLenis.destroy(); currentLenis = null; }
    };

    let lastMobile = window.innerWidth < 768;
    if (!lastMobile) initDesktop();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile === lastMobile) return;
      lastMobile = mobile;
      if (mobile) {
        destroyDesktop();
      } else {
        initDesktop();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      destroyDesktop();
    };
  }, []);

  return null;
}
