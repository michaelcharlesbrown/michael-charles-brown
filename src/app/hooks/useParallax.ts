"use client";

import { useRef, useState, useEffect } from "react";

interface UseParallaxOptions {
  speed?: number;
  enabled?: boolean;
  mobileEnabled?: boolean;
}

/**
 * Custom hook for parallax scrolling effects
 * @param speed - Parallax speed factor (0 = no movement, 1 = normal scroll, >1 = faster)
 * @param enabled - Whether parallax is enabled (default: true)
 * @param mobileEnabled - Whether parallax works on mobile (default: false)
 */
export function useParallax({ 
  speed = 0.5, 
  enabled = true,
  mobileEnabled = false 
}: UseParallaxOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const initialTopRef = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!enabled || (!isDesktop && !mobileEnabled)) {
      setOffsetY(0);
      initialTopRef.current = null;
      return;
    }

    const handleScroll = () => {
      if (!elementRef.current) {
        setOffsetY(0);
        return;
      }

      const rect = elementRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Store initial position relative to document
      if (initialTopRef.current === null) {
        initialTopRef.current = rect.top + scrollY;
      }

      // Calculate parallax offset
      // Speed < 1 means element moves slower than scroll (creates parallax)
      // The offset is the difference between normal scroll and parallax scroll
      const parallaxOffset = scrollY * (1 - speed);
      
      setOffsetY(parallaxOffset);
    };

    // Reset initial position on resize
    const handleResize = () => {
      if (elementRef.current) {
        initialTopRef.current = elementRef.current.getBoundingClientRect().top + window.scrollY;
      }
      handleScroll();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled, isDesktop, mobileEnabled, speed]);

  return {
    ref: elementRef,
    offsetY,
    transform: `translateY(${offsetY}px)`,
  };
}
