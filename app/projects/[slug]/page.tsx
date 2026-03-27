import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavIcon from "@/app/components/NavIcon";
import ProjectPageContent from "@/components/project/ProjectPageContent";
import { getProjectBySlug, projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project" };
  }
  const desc = project.description.replace(/\s+/g, " ").trim().slice(0, 155);
  const ogImage = project.ogImage ?? "/images/mcb-og.jpg";
  return {
    title: project.title,
    description: desc,
    openGraph: {
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <NavIcon />
      <main className="project-page-main mx-auto w-full max-w-[2400px]">
        <ProjectPageContent project={project} />
      </main>
    </div>
  );
}
