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
          animation: navRotate 45s linear infinite;
        }
        @keyframes navRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .navTriOverlayWrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          isolation: isolate;
          pointer-events: none;
        }
        .navShapeHexagon {
          transition: opacity 240ms ease;
        }
        .navShapeOctagon {
          transition: opacity 240ms ease;
          opacity: 0;
        }
        .navTriWrap:hover .navShapeHexagon,
        .navTriWrap:focus-visible .navShapeHexagon,
        .navTriWrap:focus-within .navShapeHexagon {
          opacity: 0;
        }
        .navTriWrap:hover .navShapeOctagon,
        .navTriWrap:focus-visible .navShapeOctagon,
        .navTriWrap:focus-within .navShapeOctagon {
          opacity: 1;
        }
        .navTriOverlay {
          position: absolute;
          inset: 0;
          clip-path: polygon(50% 0%, 81% 14%, 93% 50%, 81% 86%, 50% 100%, 19% 86%, 7% 50%, 19% 14%);

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
              <path className="navShapeHexagon" d="M21 0L36 9L36 27L21 36L6 27L6 9Z" fill="white"/>
              <path className="navShapeOctagon" d="M21 0L34 5L39 18L34 31L21 36L8 31L3 18L8 5Z" fill="white"/>
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
