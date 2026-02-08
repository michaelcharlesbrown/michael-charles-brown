"use client";

import NavIcon from "@/app/components/NavIcon";
import AboutHeroSection from "@/app/components/AboutHeroSection";
import { useParallax } from "@/app/hooks/useParallax";

export default function AboutPage() {
  // Different parallax speeds for each element to create depth
  const h1Parallax = useParallax({ speed: 0.2 }); // Slowest - moves least
  const h2Parallax = useParallax({ speed: 0.4 }); // Medium - moves more
  const linksParallax = useParallax({ speed: 0.35 }); // Slightly faster than H1

  return (
    <div className="md:min-h-screen bg-white">
      <NavIcon />
      <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px] pb-0 md:pb-[180px]">
        <div className="mx-auto w-full">
          {/* Top Section: Name and Role - Hero */}
          <div className="relative min-h-[70vh] md:min-h-[65vh] mb-16">
            {/* Mobile: H1 top-left, H2 bottom-right */}
            <h1 
              ref={h1Parallax.ref as React.RefObject<HTMLHeadingElement>}
              className="md:hidden text-4xl font-bold uppercase tracking-tight text-black" 
              style={{ lineHeight: '0.6', transform: h1Parallax.transform }}
            >
              <span className="block">MICHAEL</span>
              <span className="block mt-2">CHARLES</span>
              <span className="block mt-2">BROWN</span>
            </h1>
            
            <div 
              ref={h2Parallax.ref as React.RefObject<HTMLDivElement>}
              className="md:hidden absolute bottom-0 right-0 text-right"
              style={{ transform: h2Parallax.transform }}
            >
              <h2 className="text-xl font-normal uppercase tracking-tight text-black" style={{ lineHeight: '0.8' }}>
                <span className="block">COMPOSER///</span>
                <span className="block mt-1">RECORDING</span>
                <span className="block mt-1">ARTIST</span>
              </h2>
            </div>

            {/* Desktop: H1 top-left, H2 bottom-right */}
            <h1 
              ref={h1Parallax.ref as React.RefObject<HTMLHeadingElement>}
              className="hidden md:block text-8xl font-bold uppercase tracking-tight text-black" 
              style={{ lineHeight: '0.6', transform: h1Parallax.transform }}
            >
              <span className="block">MICHAEL</span>
              <span className="block mt-4">CHARLES</span>
              <span className="block mt-4">BROWN</span>
            </h1>
            
            <div 
              ref={h2Parallax.ref as React.RefObject<HTMLDivElement>}
              className="hidden md:block absolute bottom-0 right-0 text-right"
              style={{ transform: h2Parallax.transform }}
            >
              <h2 className="text-3xl font-normal uppercase tracking-tight text-black" style={{ lineHeight: '0.8' }}>
                <span className="block">COMPOSER///</span>
                <span className="block mt-1">RECORDING</span>
                <span className="block mt-1">ARTIST</span>
              </h2>
            </div>
          </div>

          {/* Mid-Section: Photo with Overlapping Headline and Body Copy (parallax) */}
          <AboutHeroSection />

          {/* Links Section - Bottom of page, left aligned */}
          <section 
            ref={linksParallax.ref as React.RefObject<HTMLElement>}
            className="pt-16 pb-8 md:pb-8"
            style={{ transform: linksParallax.transform }}
          >
            <div className="flex flex-col text-left">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                INSTAGRAM
              </a>
              <a
                href="https://imdb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                IMDB
              </a>
              <a
                href="https://bandcamp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                BANDCAMP
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                SPOTIFY
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                YOUTUBE
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
