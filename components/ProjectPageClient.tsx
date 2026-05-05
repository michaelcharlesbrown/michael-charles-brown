"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { useParallax } from "@/app/hooks/useParallax";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
}

function buildVimeoSrc(raw: string): string {
  const url = new URL(raw);
  url.searchParams.set("title", "0");
  url.searchParams.set("byline", "0");
  url.searchParams.set("portrait", "0");
  url.searchParams.set("quality", "1080p");
  url.searchParams.set("autoplay", "1");
  return url.toString();
}

export default function ProjectPageClient({ project }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const parallax = useParallax({ speed: 0.6 });

  const openModal = useCallback(() => {
    const embed = project.videoEmbed;
    if (!embed) return;
    setModalSrc(buildVimeoSrc(embed.src));
    setModalOpen(true);
  }, [project.videoEmbed]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalSrc("");
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, closeModal]);

  return (
    <>
      {/* Hero — full viewport */}
      <div className="proj-hero-wrap">
        <div
          ref={parallax.ref as React.Ref<HTMLDivElement>}
          className="proj-hero-inner"
          style={{ transform: parallax.transform }}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="proj-hero-img"
          />
        </div>
      </div>

      {/* Info section */}
      <div className="proj-info-section">
        <div className="proj-info-inner">

          {/* Left column */}
          <div className="proj-info-left">
            <div className="proj-title">{project.title}</div>
            {project.subtitle && (
              <div className="proj-subtitle">{project.subtitle}</div>
            )}
            {project.credits && (
              <div className="proj-credits">{project.credits}</div>
            )}

            {project.type === "music" && (
              <div className="proj-audio-wrap">
                <AudioPlayer src="/audio/test.mp3" label={project.title} />
              </div>
            )}

            <div className="proj-cta-btns">
              {project.type === "film" && project.videoEmbed && (
                <button className="proj-cta-btn" onClick={openModal}>
                  WATCH
                </button>
              )}
              {project.type === "music" && (
                <>
                  {project.streamUrl && (
                    <a
                      className="proj-cta-btn"
                      href={project.streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      STREAM
                    </a>
                  )}
                  {project.buyUrl && (
                    <a
                      className="proj-cta-btn"
                      href={project.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BUY VINYL
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="proj-info-right">
            <div className="proj-right-body">
              {project.quote && (
                <div className="proj-quote">{project.quote}</div>
              )}
              <div className="proj-description">
                {project.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {project.links && project.links.length > 0 && (
              <div className="proj-social-row">
                {project.links.map((link, i) => (
                  <span key={link.label}>
                    {i > 0 && <span className="proj-social-pipe">|</span>}
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="proj-gallery">
          {project.galleryImages.map((src, i) => (
            <div key={i} className="proj-gallery-item">
              <Image
                src={src}
                alt=""
                width={960}
                height={1280}
                sizes="50vw"
              />
            </div>
          ))}
        </div>
      )}

      {/* Video modal — film projects only */}
      {modalOpen && (
        <div className="proj-modal-overlay" onClick={closeModal}>
          <button className="proj-modal-close" onClick={closeModal}>
            ×
          </button>
          <div
            className="proj-modal-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={modalSrc}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
