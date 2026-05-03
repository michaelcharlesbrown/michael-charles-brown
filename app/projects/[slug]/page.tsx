import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectPageClient from "@/components/ProjectPageClient";

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

  return <ProjectPageClient project={project} />;
}
