"use client";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
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
  const sectionRefs = useRef<HTMLElement[]>([]);

  const addSectionRef = useCallback((el: HTMLElement | null, index: number) => {
    if (el) sectionRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lenis = new Lenis({
      wrapper: container,
      content: container,
    });

    const snap = new Snap(lenis, {
      type: "mandatory",
      duration: SNAP_DURATION,
      easing: SNAP_EASING,
    });

    sectionRefs.current.forEach((el) => {
      if (el) snap.addElement(el, { align: ["start"] });
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      snap.destroy();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="home-snap-container" data-lenis-prevent>
      {/* Desktop: rows of 3 as snap sections */}
      {rows.map((row, rowIndex) => (
        <section
          key={`row-${rowIndex}`}
          ref={(el) => addSectionRef(el, rowIndex)}
          className="home-snap-section home-snap-row"
        >
          <div className="home-snap-inner page-wrap">
            <div className="home-grid">
              {row.map((project, i) => (
                <div key={project.slug} className="home-card-wrap">
                  <Link href={`/projects/${project.slug}`}>
                    <VideoCard project={project} index={rowIndex * 3 + i} />
                  </Link>
                  <div className="card-caption">
                    <span className="card-caption-title">{project.title}</span>
                    <span className="card-caption-descriptor">{project.cardDescriptor}</span>
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
          ref={(el) => addSectionRef(el, rows.length + i)}
          className="home-snap-section home-snap-card"
        >
          <div className="home-snap-inner page-wrap">
            <div className="home-card-wrap">
              <Link href={`/projects/${project.slug}`}>
                <VideoCard project={project} index={i} />
              </Link>
              <div className="card-caption">
                <span className="card-caption-title">{project.title}</span>
                <span className="card-caption-descriptor">{project.cardDescriptor}</span>
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

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
            videoRef.current?.play().catch(() => {
              // Silently handle autoplay errors
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(containerRef.current);

    // Autoplay first video on page load
    if (index === 0) {
      const checkVisibility = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const visibleRatio = visibleHeight / rect.height;

          if (visibleRatio >= 0.6) {
            videoRef.current?.play().catch(() => {
              // Silently handle autoplay errors
            });
          }
        }
      };

      // Check immediately and after a short delay
      checkVisibility();
      setTimeout(checkVisibility, 100);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile, index]);

  const handleMouseEnter = () => {
    if (videoRef.current && !isMobile) {
      videoRef.current.play().catch(() => {
        // Silently handle autoplay errors
      });
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
      <video
        ref={videoRef}
        src={project.cardVideo}
        poster={project.cardPoster}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
