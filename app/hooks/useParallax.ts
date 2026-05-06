"use client";

import { useRef, useState, useEffect } from "react";
import { useLenis } from "@/app/components/LenisProvider";

export function useParallax({ speed = 0.5 }: { speed?: number } = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!lenis || !isDesktop) {
      setOffsetY(0);
      return;
    }
    const handler = ({ scroll }: { scroll: number }) => {
      setOffsetY(scroll * (1 - speed));
    };
    lenis.on("scroll", handler);
    return () => lenis.off("scroll", handler);
  }, [lenis, speed, isDesktop]);

  return {
    ref: elementRef,
    transform: `translateY(${offsetY}px)`,
  };
}
