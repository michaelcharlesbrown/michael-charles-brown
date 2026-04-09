"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavIcon() {
  const pathname = usePathname();
  const href = pathname === "/" ? "/about" : "/";
  const label = pathname === "/" ? "About" : "Home";

  return (
    <div className="navTriWrap">
      <Link
        href={href}
        className="transition-opacity duration-300 hover:opacity-80"
        aria-label={label}
      >
        <svg width="126" height="108" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 0 L41.785 36 L0.215 36 Z" fill="white"/>
        </svg>
      </Link>
      <div className="navTriOverlayWrap">
        <span className="navTriOverlay" aria-hidden="true" />
      </div>
    </div>
  );
}
