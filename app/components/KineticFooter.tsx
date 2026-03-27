"use client";

import MarqueeBar from "./MarqueeBar";

/** PRD: alternating black/white; odd bars drift left, even bars drift right */
const BARS = [
  {
    href: "mailto:hello@michaelcharlesbrown.com",
    text: "hello@michaelcharlesbrown.com",
    direction: "left" as const,
    variant: "dark" as const,
  },
  {
    href: "https://instagram.com",
    text: "Instagram",
    direction: "right" as const,
    variant: "light" as const,
  },
  {
    href: "https://youtube.com",
    text: "YouTube",
    direction: "left" as const,
    variant: "dark" as const,
  },
  {
    href: "https://bandcamp.com",
    text: "Bandcamp",
    direction: "right" as const,
    variant: "light" as const,
  },
  {
    href: "https://open.spotify.com",
    text: "Spotify",
    direction: "left" as const,
    variant: "dark" as const,
  },
];

interface KineticFooterProps {
  reducedMotion: boolean;
  className?: string;
}

export default function KineticFooter({ reducedMotion, className = "" }: KineticFooterProps) {
  return (
    <footer
      className={`kinetic-footer mt-[var(--space-section)] ${className}`.trim()}
      aria-label="Social links"
    >
      {BARS.map((bar) => (
        <MarqueeBar
          key={bar.text}
          href={bar.href}
          text={bar.text}
          direction={bar.direction}
          variant={bar.variant}
          reducedMotion={reducedMotion}
        />
      ))}
    </footer>
  );
}
