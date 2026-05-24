"use client";

import { useRef, useEffect } from "react";
import { useLenis } from "@/app/components/LenisProvider";

export function useParallax({ speed = 0.5 }: { speed?: number } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const el = ref.current;
    if (!lenis || !el) return;

    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const handler = ({ scroll }: { scroll: number }) => {
      el.style.transform = `translateY(${scroll * (1 - speed)}px)`;
    };

    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }, [lenis, speed]);

  return ref;
}
