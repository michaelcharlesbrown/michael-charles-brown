"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavIcon() {
  const pathname = usePathname();
  
  // Homepage -> /about, all other pages -> /
  const href = pathname === "/" ? "/about" : "/";

  return (
    <nav className="fixed left-0 right-0 z-50 flex justify-center nav-icon-mobile">
      <Link 
        href={href}
        className="transition-opacity duration-300 hover:opacity-80"
        aria-label="Navigation"
      >
        <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.7847 0L41.5693 36H5.91278e-05L20.7847 0Z" fill="black"/>
        </svg>
      </Link>
    </nav>
  );
}
