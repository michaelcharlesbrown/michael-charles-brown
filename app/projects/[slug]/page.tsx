import Image from "next/image";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import NavIcon from "@/app/components/NavIcon";

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
      <main className="mx-auto w-full max-w-[2400px] px-5 py-20">
        <div className="mx-auto w-full">
          {/* Hero Image */}
          <div className="relative w-full mb-16">
            <Image
              src="/images/hero-img.jpg"
              alt={project.title}
              width={2400}
              height={1600}
              className="w-full h-auto object-contain object-left"
              priority
            />
          </div>

          {/* Three columns of text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Column 1: Project Title and Credits */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black mb-2" style={{ lineHeight: '0.6' }}>
                CANCUNCITO
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
