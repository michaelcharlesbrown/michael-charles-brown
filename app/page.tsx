"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { projects, type Project } from "@/data/projects";

export default function HomePage() {
  return (
    <div className="home-main page-wrap">
      <div className="home-grid">
        {projects.map((project, i) => (
          <div key={project.slug}>
            <Link href={`/projects/${project.slug}`}>
              <VideoCard project={project} index={i} />
            </Link>
            <div className="card-caption">
              <span className="card-caption-title">{project.title}</span>
              <span className="card-caption-descriptor">{project.cardDescriptor}</span>
            </div>
          </div>
        ))}
      </div>
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
