"use client";

import Link from "next/link";
import NavIcon from "@/components/NavIcon";
import { useFitText } from "@/hooks/useFitText";

export default function Header() {
  const nameRef = useFitText();
  const taglineRef = useFitText();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-header-name desktop-only">
          MICHAEL CHARLES BROWN
        </Link>
        <span className="site-header-tagline desktop-only">
          COMPOSER///PRODUCER///RECORDING ARTIST
        </span>
        <Link href="/" className="site-header-name mobile-only" ref={nameRef as React.Ref<HTMLAnchorElement>}>
          MICHAEL CHARLES BROWN
        </Link>
        <span className="site-header-tagline mobile-only" ref={taglineRef as React.Ref<HTMLSpanElement>}>
          COMPOSER///PRODUCER///RECORDING ARTIST
        </span>
        <div className="site-header-nav">
          <NavIcon />
        </div>
      </div>
    </header>
  );
}
