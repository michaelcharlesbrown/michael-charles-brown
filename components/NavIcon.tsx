"use client";

import RollLink from "@/src/components/ui/RollLink";
import { usePathname } from "next/navigation";

// Square viewBox = circumscribed circle diameter; centroid at (50%, 50%) so
// transform-origin: 50% 50% is the exact pivot — no wobble at any rotation angle.
const SIDE = 100;
const H = (SIDE * Math.sqrt(3)) / 2;   // altitude
const R = (H * 2) / 3;                 // circumradius
const r = H / 3;                       // inradius
const VIEW = R * 2;                     // square viewBox side
const DISPLAY = VIEW * (44 / SIDE);    // display size (~50.8px), base stays 44px

export default function NavIcon() {
  const pathname = usePathname();
  const href = pathname === "/" ? "/about" : "/";
  const label = pathname === "/" ? "About" : "Home";

  return (
    <div className="navTriWrap">
      <RollLink
        href={href}
        className="navTriLink"
        aria-label={label}
      >
        <svg
          width={DISPLAY}
          height={DISPLAY}
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M${R},0 L${R + SIDE / 2},${R + r} L${R - SIDE / 2},${R + r} Z`}
            fill="white"
          />
        </svg>
      </RollLink>
    </div>
  );
}
