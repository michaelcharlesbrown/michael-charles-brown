"use client";

import Image from "next/image";
import RollLink from "@/src/components/ui/RollLink";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { projects, type Project } from "@/data/projects";

const SNAP_DURATION = 1.2;
const SNAP_EASING = (t: number) => 1 - Math.pow(1 - t, 3);

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function HomePage() {
  const rows = chunkArray(projects, 3);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRowRefs = useRef<(HTMLElement | null)[]>([]);

  // useLayoutEffect runs synchronously after React commits, before the browser
  // paints — so the view transition snapshot captures the container already
  // scrolled to the correct card, not card 1 then a rAF-delayed jump.
  useLayoutEffect(() => {
    const slug = sessionStorage.getItem('returnToSlug');
    if (!slug || !containerRef.current) return;
    sessionStorage.removeItem('returnToSlug');
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      // Desktop: find the card-wrap, then snap to its parent row section.
      const card = containerRef.current.querySelector<HTMLElement>(`[data-desktop-slug="${slug}"]`);
      const section = card?.closest('section') as HTMLElement | null;
      if (section) containerRef.current.scrollTop = section.offsetTop;
    } else {
      // Mobile: each card is its own section, targeted directly by data-slug.
      const section = containerRef.current.querySelector<HTMLElement>(`[data-slug="${slug}"]`);
      if (section) containerRef.current.scrollTop = section.offsetTop;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let currentLenis: Lenis | null = null;
    let currentSnap: Snap | null = null;

    const initDesktop = () => {
      const lenis = new Lenis({ wrapper: container, content: container });
      const snap = new Snap(lenis, {
        type: "mandatory",
        duration: SNAP_DURATION,
        easing: SNAP_EASING,
      });

      desktopRowRefs.current.forEach((el) => {
        if (el) snap.addElement(el, { align: ["start"] });
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      currentLenis = lenis;
      currentSnap = snap;
    };

    const destroyDesktop = () => {
      cancelAnimationFrame(rafId);
      if (currentSnap) { currentSnap.destroy(); currentSnap = null; }
      if (currentLenis) { currentLenis.destroy(); currentLenis = null; }
    };

    // Mobile uses native CSS scroll-snap — no Lenis needed there.
    let lastMobile = window.innerWidth < 768;
    if (!lastMobile) initDesktop();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile === lastMobile) return;
      lastMobile = mobile;
      if (mobile) {
        destroyDesktop();
      } else {
        initDesktop();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      destroyDesktop();
    };
  }, []);

  return (
    <div ref={containerRef} className="home-snap-container" data-lenis-prevent>
      {/* Desktop: rows of 3 as snap sections */}
      {rows.map((row, rowIndex) => (
        <section
          key={`row-${rowIndex}`}
          ref={(el) => { desktopRowRefs.current[rowIndex] = el; }}
          className="home-snap-section home-snap-row"
        >
          <div className="home-snap-inner page-wrap">
            <div className="home-grid">
              {row.map((project, i) => (
                <div key={project.slug} data-desktop-slug={project.slug} className="home-card-wrap">
                  <RollLink
                    href={`/projects/${project.slug}`}
                    onClick={() => sessionStorage.setItem('returnToSlug', project.slug)}
                  >
                    <VideoCard project={project} index={rowIndex * 3 + i} />
                  </RollLink>
                  <div className="card-caption">
                    <span className="card-caption-title">{project.title}</span>
                    <span>{project.cardDescriptor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Mobile: each card is its own snap section */}
      {projects.map((project, i) => (
        <section
          key={`mobile-${project.slug}`}
          data-slug={project.slug}
          className="home-snap-section home-snap-card"
        >
          <div className="home-snap-inner page-wrap">
            <div className="home-card-wrap">
              <RollLink
                href={`/projects/${project.slug}`}
                onClick={() => sessionStorage.setItem('returnToSlug', project.slug)}
              >
                <VideoCard project={project} index={i} />
              </RollLink>
              <div className="card-caption">
                <span className="card-caption-title">{project.title}</span>
                <span>{project.cardDescriptor}</span>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function VideoCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !containerRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile, index]);

  const handleMouseEnter = () => {
    if (videoRef.current && !isMobile) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !isMobile) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      className="video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        className="video-card-poster"
        src={project.cardPoster}
        alt=""
        aria-hidden
        priority={index < 3}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      <video
        ref={videoRef}
        src={project.cardVideo}
        poster={project.cardPoster}
        muted
        loop
        playsInline
        preload={index < 3 ? "metadata" : "none"}
      />
    </div>
  );
}
