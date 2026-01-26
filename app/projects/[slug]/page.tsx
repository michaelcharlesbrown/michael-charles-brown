import Image from "next/image";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import NavIcon from "@/app/components/NavIcon";
import AudioPlayer from "@/app/components/AudioPlayer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <NavIcon />
      <main className="mx-auto w-full max-w-[2400px] px-5 pt-20 pb-[180px]">
        <div className="mx-auto w-full">
          {/* Hero Image or Video */}
          <div className="relative w-full mb-16">
            {project.slug === "snow-king" ? (
              <div className="relative w-full aspect-video">
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/42444069?h=0c4c57b95b"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : project.slug === "breathing-chamber" ? (
              <div className="relative w-full aspect-video">
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/59210170"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : project.slug === "mad-denizen" ? (
              <div className="relative w-full aspect-video">
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/9De1ylIPqWE?si=xAu3nMIx93S6kBPc"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : project.slug === "booming-dunes" ? (
              <div className="relative w-full aspect-video">
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/kydR3NaZVwg?si=LasO5DdVRv1BNK8Q"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : project.slug === "red-moon-apostles" ? (
              <div className="relative w-full aspect-video">
                <iframe
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/4hZ34bKRIZE?si=gdEzqGPmcgheT4Vi"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <Image
                src="/images/hero-img.jpg"
                alt={project.title}
                width={2400}
                height={1600}
                className="w-full h-auto object-contain object-left"
                priority
              />
            )}
          </div>

          {/* Audio Player - Testing on Cancuncito */}
          {project.slug === "cancuncito" && (
            <div className="mb-16">
              <AudioPlayer src="/audio/placeholder-track.mp3" />
            </div>
          )}

          {/* Three columns of text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Column 1: Project Title and Credits */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black mb-2" style={{ lineHeight: '0.6' }}>
                {project.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-black mb-4" style={{ lineHeight: '0.6' }}>
                ORIGINAL SCORE
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-black">
                Written and directed by Carlos Alejandro Marulanda
              </p>
            </div>

            {/* Column 2: Info About The Project */}
            <div>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-black mb-4">
                INFO ABOUT THE PROJECT
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-black">
                A true multidisciplinary artist, Michael co-founded a Mission District art collective, designing soundscapes for avant-garde installations and electrifying event spaces with immersive audio-visual performances. Alongside these creative ventures.
              </p>
            </div>

            {/* Column 3: Process/Arrangement/Instrumentation */}
            <div>
              <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-black mb-4">
                MY PROCESS/ARRANGEMENT/INSTRUMENTATION
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-black">
                A true multidisciplinary artist, Michael co-founded a Mission District art collective, designing soundscapes for avant-garde installations and electrifying event spaces with immersive audio-visual performances. Alongside these creative ventures.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
