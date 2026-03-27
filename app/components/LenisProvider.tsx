"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis();

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", onScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      rafIdRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
