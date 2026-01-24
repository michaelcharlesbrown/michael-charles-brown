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
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-black">{project.title}</h1>
          
          {project.description && (
            <p className="mb-8 text-lg text-zinc-600">{project.description}</p>
          )}

          <div className="relative aspect-[5/7] w-full overflow-hidden bg-zinc-100">
            <video
              src={project.video}
              poster={project.poster}
              controls
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-opacity duration-300"
              autoPlay
            />
          </div>
        </div>
      </main>
    </div>
  );
}
