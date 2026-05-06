"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { useParallax } from "@/app/hooks/useParallax";
import { useLenis } from "@/app/components/LenisProvider";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
}

function ProjectHeroMobileVideo({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const playAttempt = v.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {});
    }
  }, []);

  return (
    <div className="proj-hero-mobile-media">
      <video
        ref={videoRef}
        className="proj-hero-mobile-video"
        src={project.cardVideo}
        poster={project.cardPoster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={`${project.title} preview clip`}
      />
    </div>
  );
}

function buildEmbedSrc(embed: { type: string; src: string }): string {
  const url = new URL(embed.src);
  url.searchParams.set("autoplay", "1");
  if (embed.type === "vimeo") {
    url.searchParams.set("title", "0");
    url.searchParams.set("byline", "0");
    url.searchParams.set("portrait", "0");
    url.searchParams.set("quality", "1080p");
  }
  return url.toString();
}

export default function ProjectPageClient({ project }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const parallax = useParallax({ speed: 0.6 });
  const lenis = useLenis();

  const showCtaRow =
    (project.type === "film" && Boolean(project.videoEmbed)) ||
    (project.type === "music" &&
      Boolean(project.streamUrl || project.buyUrl));

  const openModal = useCallback(() => {
    const embed = project.videoEmbed;
    if (!embed) return;
    setModalSrc(buildEmbedSrc(embed));
    setModalOpen(true);
  }, [project.videoEmbed]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalSrc("");
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    lenis?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, closeModal, lenis]);

  return (
    <>
      <div className="proj-hero-wrap">
        <div
          ref={parallax.ref as React.Ref<HTMLDivElement>}
          className="proj-hero-inner"
          style={{ transform: parallax.transform }}
        >
          <picture className="proj-hero-picture proj-hero-desktop-media">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="proj-hero-img"
            />
          </picture>
          <ProjectHeroMobileVideo project={project} />
        </div>
      </div>

      <div className="proj-info-section">
        <div className="proj-info-inner">
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

            {showCtaRow && (
              <div className="proj-cta-btns">
                {project.type === "film" && project.videoEmbed && (
                  <button
                    type="button"
                    className="proj-cta-btn"
                    onClick={openModal}
                  >
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
            )}
          </div>

          <div className="proj-info-right">
            {project.quote && (
              <div className="proj-quote">{project.quote}</div>
            )}

            <div className="proj-description">
              {project.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {project.links && project.links.length > 0 && (
              <div className="proj-social-row">
                {project.links.map((link, i) => (
                  <span key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                    {i < project.links!.length - 1 && <span> | </span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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

      {modalOpen && (
        <div className="proj-modal-overlay" onClick={closeModal}>
          <button type="button" className="proj-modal-close" onClick={closeModal}>
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
