"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { projects, type Project } from "@/data/projects";
import NavIcon from "@/app/components/NavIcon";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavIcon />
      <main
        className="mx-auto w-full max-w-[2400px]"
        style={{
          padding: "101px 20px 20px 20px",
          background: "#FFF",
          minHeight: "100vh",
        }}
      >
        <div
          className="grid w-full grid-cols-1 md:grid-cols-3"
          style={{ 
            gap: "20px",
          }}
          data-mobile-gap="19px"
        >
          {projects.map((project, i) => (
            <VideoCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </main>
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
    <Link href={`/projects/${project.slug}`}>
      <div
        ref={containerRef}
        className="video-card snap-item relative aspect-[5/7] w-full overflow-hidden bg-zinc-100 cursor-pointer rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          preload="metadata"
        />
      </div>
    </Link>
  );
}
