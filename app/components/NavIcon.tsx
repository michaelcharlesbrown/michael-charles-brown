"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavIcon() {
  const pathname = usePathname();
  
  // Homepage -> /about, all other pages -> /
  const href = pathname === "/" ? "/about" : "/";

  return (
    <>
      <style jsx>{`
        .navTriWrap {
          position: relative;
          display: inline-block;
        }
        .navTriOverlayWrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          isolation: isolate;
          pointer-events: none;
        }
        .navTriOverlay {
          position: absolute;
          inset: 0;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);

          /* Soft radial glow only — no directionality */
          background: radial-gradient(
            120% 120% at 50% 40%,
            rgba(255, 100, 160, 0.6),
            rgba(255, 100, 160, 0.4) 45%,
            rgba(255, 100, 160, 0.2) 70%,
            rgba(255, 100, 160, 0.05) 100%
          );

          /* Very slow subtle color morph */
          animation: navGlow 28s ease-in-out infinite;

          opacity: 0;
          transition: opacity 180ms ease;
          will-change: filter, opacity;
        }
        .navTriWrap:hover .navTriOverlay,
        .navTriWrap:focus-visible .navTriOverlay,
        .navTriWrap:focus-within .navTriOverlay {
          opacity: 1;
        }
        @keyframes navGlow {
          0%   { filter: hue-rotate(0deg) saturate(1.05); }
          50%  { filter: hue-rotate(180deg) saturate(1.1); }
          100% { filter: hue-rotate(360deg) saturate(1.05); }
        }
      `}</style>
      <nav 
        className="fixed left-0 right-0 z-50 flex justify-center nav-icon-mobile pointer-events-none"
        style={{ mixBlendMode: 'difference' }}
      >
        <div className="navTriWrap">
          <Link 
            href={href}
            className="transition-opacity duration-300 hover:opacity-80 pointer-events-auto"
            aria-label="Navigation"
          >
            {/* Base layer - unchanged */}
            <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7847 0L41.5693 36H5.91278e-05L20.7847 0Z" fill="white"/>
            </svg>
          </Link>
          {/* Overlay layer - hover only, isolated from blend mode */}
          <div className="navTriOverlayWrap">
            <span className="navTriOverlay" aria-hidden="true" />
          </div>
        </div>
      </nav>
    </>
  );
}
