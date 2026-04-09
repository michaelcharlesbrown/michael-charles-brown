"use client";

import Link from "next/link";
import { useFitText } from "@/hooks/useFitText";

const socialLinks = [
  { label: "IMDB", href: "https://imdb.com" },
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "BANDCAMP", href: "https://bandcamp.com" },
  { label: "SPOTIFY", href: "https://spotify.com" },
  { label: "YOUTUBE", href: "https://youtube.com" },
];

export default function Footer() {
  const socialRef = useFitText();

  return (
    <footer className="site-footer page-wrap">
      {/* Mobile: top row */}
      <div className="site-footer-top-row mobile-only">
        <span className="site-footer-contact-label">CONTACT</span>
        <Link href="/contact" className="site-footer-get-in-touch">GET IN TOUCH</Link>
      </div>

      {/* Social links — desktop: inline with separators, mobile: fills viewport width */}
      <div className="site-footer-social desktop-only">
        {socialLinks.map((link, i) => (
          <span key={link.label}>
            <Link href={link.href}>{link.label}</Link>
            {i < socialLinks.length - 1 && <span className="site-footer-sep"> | </span>}
          </span>
        ))}
      </div>

      <div className="site-footer-social mobile-only" ref={socialRef as React.Ref<HTMLDivElement>}>
        {socialLinks.map((link, i) => (
          <span key={link.label}>
            <Link href={link.href}>{link.label}</Link>
            {i < socialLinks.length - 1 && <span className="site-footer-sep-mobile">///</span>}
          </span>
        ))}
      </div>

      {/* Desktop: CONTACT right */}
      <div className="site-footer-contact desktop-only">
        <Link href="/contact">CONTACT</Link>
      </div>
    </footer>
  );
}
