import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import AudioPlayer from "@/components/audio/AudioPlayer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="project-main page-wrap">

      {/* Hero */}
      <div className="project-hero">
        {project.type === "film" && project.videoEmbed ? (
          <iframe
            src={project.videoEmbed.src}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : project.type === "film" && project.filmVideo ? (
          <video
            src={project.filmVideo}
            poster={project.heroImage}
            controls
            playsInline
          />
        ) : (
          <Image
            src={project.heroImage}
            alt={project.title}
            width={1920}
            height={1080}
            priority
          />
        )}
      </div>

      {/* Info */}
      <div className="project-info">

        {/* Left column */}
        <div className="project-info-left">
          <div className="project-info-title">{project.title}</div>
          {project.subtitle && <div>{project.subtitle}</div>}
          {project.credits && <div>{project.credits}</div>}
        </div>

        {/* Right column */}
        <div className="project-info-right">
          {project.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {project.festivalSelections && (
            <div className="project-festivals">
              <p><strong>OFFICIAL SELECTION:</strong></p>
              {project.festivalSelections.map((f, i) => (
                <p key={i}>{f}</p>
              ))}
            </div>
          )}

          {project.links && (
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Audio Player — full width, below info */}
      <div className="project-audio">
        <AudioPlayer src="/audio/test.mp3" label={project.title} />
      </div>

    </div>
  );
}
