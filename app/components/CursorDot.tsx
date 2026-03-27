"use client";

import { useEffect, useRef } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    if (!dot) return;

    const apply = () => {
      const { x, y } = posRef.current;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      const el = document.elementFromPoint(x, y);
      const hover = el?.closest("a, button, [role='button'], input, textarea, select");
      dot.classList.toggle("cursor-dot--hover", !!hover);
      rafRef.current = null;
    };

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
