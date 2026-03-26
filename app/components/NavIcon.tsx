"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavIcon() {
  const pathname = usePathname();

  // Homepage -> /about, all other pages -> /
  const href = pathname === "/" ? "/about" : "/";

  return (
    <nav
      className="fixed left-0 right-0 z-50 flex justify-center nav-icon-mobile nav-icon-nav pointer-events-none"
    >
      <div className="navTriWrap">
        <Link
          href={href}
          className="transition-opacity duration-300 hover:opacity-80 pointer-events-auto"
          aria-label="Navigation"
        >
          <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 0 L41.785 36 L0.215 36 Z" fill="white"/>
          </svg>
        </Link>
        {/* Overlay layer - hover only, isolated from blend mode */}
        <div className="navTriOverlayWrap">
          <span className="navTriOverlay" aria-hidden="true" />
        </div>
      </div>
    </nav>
  );
}
