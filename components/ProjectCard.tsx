"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import RollLink from "@/src/components/ui/RollLink";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
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
    <RollLink
      href={`/projects/${project.slug}`}
      onClick={() => sessionStorage.setItem("returnToSlug", project.slug)}
      aria-label={project.title}
    >
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
          muted
          loop
          playsInline
          preload={index < 3 ? "metadata" : "none"}
        />
      </div>
    </RollLink>
  );
}
