"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { useParallax } from "@/app/hooks/useParallax";
import { useLenis } from "@/app/components/LenisProvider";
import type { Project } from "@/data/projects";
import SocialLinks from "@/components/SocialLinks";
import RollLink from "@/src/components/ui/RollLink";

interface Props {
  project: Project;
}

function ProjectHeroVideo({
  src,
  poster,
  containerClass,
  label,
}: {
  src: string;
  poster: string;
  containerClass: string;
  label: string;
}) {
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
    <div className={containerClass}>
      <video
        ref={videoRef}
        className="proj-hero-mobile-video"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        aria-label={label}
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

  const showFilmWatchCta =
    project.type === "film" && Boolean(project.videoEmbed);
  const showCtaRow =
    showFilmWatchCta ||
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
          <ProjectHeroVideo
            src={project.heroVideo}
            poster={project.heroPoster}
            containerClass="proj-hero-desktop-media"
            label={`${project.title} hero`}
          />
          <ProjectHeroVideo
            src={project.cardVideo}
            poster={project.cardPoster}
            containerClass="proj-hero-mobile-media"
            label={`${project.title} preview clip`}
          />
        </div>
      </div>

      <div className="proj-info-section">
        <div className="proj-info-inner">
          <div className="proj-info-left">
            <div className="proj-title">{project.title}</div>
            {project.subtitle && (
              <div className="proj-subtitle">{project.subtitle}</div>
            )}
            {project.directorCredit && !project.creditInRightColumn ? (
              <div className="proj-credits">
                {project.directorCredit.prefix}
                <RollLink href={project.directorCredit.href} external>
                  {project.directorCredit.name}
                </RollLink>
              </div>
            ) : (
              !project.directorCredit &&
              project.credits && (
                <div className="proj-credits">{project.credits}</div>
              )
            )}

            {project.type === "music" && (
              <div className="proj-audio-wrap">
                <AudioPlayer src="/audio/test.mp3" label={project.title} />
              </div>
            )}

            {showCtaRow && (
              <div className="proj-cta-btns">
                {showFilmWatchCta && (
                  <button
                    type="button"
                    className="proj-cta-btn"
                    disabled={!project.videoEmbed}
                    onClick={project.videoEmbed ? openModal : undefined}
                    aria-label={
                      project.videoEmbed
                        ? `Watch ${project.title}`
                        : "Watch: video not available yet"
                    }
                  >
                    WATCH
                  </button>
                )}
                {project.type === "music" && (
                  <>
                    {project.streamUrl && (
                      <RollLink
                        className="proj-cta-btn"
                        href={project.streamUrl}
                        external
                      >
                        STREAM
                      </RollLink>
                    )}
                    {project.buyUrl && (
                      <RollLink
                        className="proj-cta-btn"
                        href={project.buyUrl}
                        external
                      >
                        {project.buyLabel ?? "BUY"}
                      </RollLink>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="proj-info-right">
            {project.directorCredit && project.creditInRightColumn ? (
              <div className="proj-credits">
                {project.directorCredit.prefix}
                <RollLink href={project.directorCredit.href} external>
                  {project.directorCredit.name}
                </RollLink>
              </div>
            ) : null}

            {project.quote && (
              <div className="proj-quote">{project.quote}</div>
            )}

            <div className="proj-description">
              {project.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {project.links && project.links.length > 0 && (
              <SocialLinks
                links={project.links}
                className="proj-social-row"
              />
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
