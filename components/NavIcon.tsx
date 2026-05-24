"use client";

import RollLink from "@/src/components/ui/RollLink";
import { usePathname } from "next/navigation";

/** Equilateral: base = view width, altitude = width * √3 / 2 */
const TRI_VIEW_W = 100;
const TRI_VIEW_H = (TRI_VIEW_W * Math.sqrt(3)) / 2;
const TRI_DISPLAY_W = 44;
const TRI_DISPLAY_H = (TRI_DISPLAY_W * TRI_VIEW_H) / TRI_VIEW_W;

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
          width={TRI_DISPLAY_W}
          height={TRI_DISPLAY_H}
          viewBox={`0 0 ${TRI_VIEW_W} ${TRI_VIEW_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={`M${TRI_VIEW_W / 2} 0 L${TRI_VIEW_W} ${TRI_VIEW_H} L0 ${TRI_VIEW_H} Z`}
            fill="white"
          />
        </svg>
      </RollLink>
      <div className="navTriOverlayWrap">
        <span className="navTriOverlay" aria-hidden="true" />
      </div>
    </div>
  );
}
