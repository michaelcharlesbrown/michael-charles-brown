"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";
import AudioPlayer from "@/components/audio/AudioPlayer";
import FitWidthLine from "@/components/project/FitWidthLine";
import ProjectLinksFit from "@/components/project/ProjectLinksFit";

function getEmbedSrc(project: Project): string | null {
  if (project.embedIframeSrc) return project.embedIframeSrc;
  if (project.vimeoId && project.vimeoId.length > 0) {
    return `https://player.vimeo.com/video/${project.vimeoId}`;
  }
  return null;
}

/** Title, category, and optional subtitle: each line scales to fill content width (one line). */
function ProjectTitleBlock({ project }: { project: Project }) {
  return (
    <header className="project-title-block">
      <h1 className="project-title-stack">
        <FitWidthLine text={project.title} textClassName="project-title-fit-text" />
        <FitWidthLine
          text={project.category}
          textClassName="project-category-fit-text"
          wrapperClassName="project-title-line--category-wrap"
        />
      </h1>
      {project.subtitle ? (
        <div className="project-subtitle-fit-outer">
          <FitWidthLine text={project.subtitle} textClassName="project-subtitle-fit-text" />
        </div>
      ) : null}
    </header>
  );
}

interface ProjectPageContentProps {
  project: Project;
}

export default function ProjectPageContent({ project }: ProjectPageContentProps) {
  const [mediaReady, setMediaReady] = useState(false);
  const embedSrc = getEmbedSrc(project);
  const paragraphs = project.description.split(/\n\n/).filter(Boolean);

  return (
    <div className="project-page-shell w-full min-w-0">
      <div className="project-hero-video w-full">
        {!mediaReady ? (
          <button
            type="button"
            className="absolute inset-0 z-[1] block h-full w-full border-0 bg-transparent p-0"
            onClick={() => setMediaReady(true)}
            aria-label={`Play video for ${project.title}`}
          >
            <Image
              src={project.poster}
              alt=""
              fill
              className="project-hero-poster object-cover object-center"
              sizes="(max-width: 2400px) 100vw, 2400px"
              priority
            />
            <span className="sr-only">Load and play video</span>
          </button>
        ) : null}
        {mediaReady && embedSrc ? (
          <iframe
            title={`${project.title} video`}
            src={embedSrc}
            className="absolute inset-0 z-[2] h-full w-full border-0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
          />
        ) : null}
        {mediaReady && !embedSrc && (project.html5VideoSrc || project.video) ? (
          <video
            className="absolute inset-0 z-[2] h-full w-full object-cover"
            src={project.html5VideoSrc ?? project.video}
            controls
            playsInline
            preload="metadata"
          />
        ) : null}
      </div>

      <div className="project-page-content-inner mt-[var(--space-section)] w-full min-w-0">
        <ProjectTitleBlock project={project} />

        <div className="project-body-columns mt-[var(--space-section)]">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {project.audioSrc ? (
          <div className="project-audio-wrap w-full max-w-full">
            <AudioPlayer src={project.audioSrc} label={project.audioLabel} />
          </div>
        ) : null}

        {project.links.length > 0 ? (
          <ProjectLinksFit
            key={project.slug}
            className="project-links-row project-links-row--fit-width mt-[var(--space-section)]"
            aria-label="Project links"
          >
            {project.links.map((link, i) => (
              <span key={link.href + link.label} className="inline-flex items-baseline gap-[0.5em]">
                {i > 0 ? <span className="project-links-sep">|</span> : null}
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </span>
            ))}
          </ProjectLinksFit>
        ) : null}
      </div>
    </div>
  );
}
