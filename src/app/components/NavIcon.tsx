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
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 160ms ease;
          mix-blend-mode: normal;
        }
        .navTriWrap:hover .navTriOverlay,
        .navTriWrap:focus-visible .navTriOverlay,
        .navTriWrap:focus-within .navTriOverlay {
          opacity: 1;
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
            <svg className="navTriOverlay" width="42" height="36" viewBox="0 0 42 36" aria-hidden="true">
            <defs>
              {/* Colors inverted for difference blend mode - will display as red/purple/violet/blue when inverted */}
              {/* To get red/purple/violet/blue, we provide cyan/yellow/green which invert to those colors */}
              <linearGradient id="navTriPsyGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%">
                  <animate attributeName="stop-color" dur="1.9s" repeatCount="indefinite"
                    values="#FFFF66; #FFFF33; #FFFF00; #FFCC00; #FFFF66" />
                </stop>
                <stop offset="50%">
                  <animate attributeName="stop-color" dur="2.3s" repeatCount="indefinite"
                    values="#00FFFF; #33FFFF; #66FFFF; #00FFFF; #33FFFF" />
                </stop>
                <stop offset="100%">
                  <animate attributeName="stop-color" dur="2.7s" repeatCount="indefinite"
                    values="#00FF00; #33FF00; #66FF00; #00FF00; #33FF00" />
                </stop>
              </linearGradient>
            </defs>
            <path d="M20.7847 0L41.5693 36H5.91278e-05L20.7847 0Z" fill="url(#navTriPsyGradient)"></path>
          </svg>
          </div>
        </div>
      </nav>
    </>
  );
}
