"use client";

import { useEffect, useRef } from "react";

/**
 * useFitText
 * Measures the text element against its container and sets font-size
 * in exact pixels so the text fills precisely 100% of available width.
 * Uses ResizeObserver — fires on mount and on every resize.
 * Never use vw units or clamp() for this — those are approximations.
 */
export function useFitText() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;

      const parentStyle = getComputedStyle(parent);
      const containerWidth =
        parent.clientWidth -
        parseFloat(parentStyle.paddingLeft) -
        parseFloat(parentStyle.paddingRight);

      if (containerWidth <= 0) return;

      const measure = (size: number) => {
        el.style.fontSize = size + "px";
        el.style.width = "auto";
        el.style.display = "inline-block";
        const w = el.scrollWidth;
        el.style.width = "";
        el.style.display = "";
        return w;
      };

      const w1 = measure(100);
      if (w1 === 0) return;
      const pass1 = (containerWidth / w1) * 100;

      const w2 = measure(pass1);
      if (w2 === 0) return;
      const pass2 = (containerWidth / w2) * pass1;

      el.style.fontSize = pass2 + "px";
    };

    const observer = new ResizeObserver(fit);
    observer.observe(el.parentElement ?? el);
    fit();

    return () => observer.disconnect();
  }, []);

  return ref;
}
