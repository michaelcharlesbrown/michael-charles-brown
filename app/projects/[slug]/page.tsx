import type { Metadata } from "next";
import { projects, type Project } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectPageClient from "@/components/ProjectPageClient";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = "https://michaelcharlesbrown.com";
const BER_URL = "https://brokenearrecords.com";

const composer = {
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Michael Charles Brown",
  url: BASE_URL,
};

const brokenEarRecords = {
  "@type": "Organization",
  "@id": `${BER_URL}/#organization`,
  name: "Broken Ear Records",
  url: BER_URL,
};

function buildProjectSchema(project: Project): Record<string, unknown>[] {
  const projectUrl = `${BASE_URL}/projects/${project.slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Michael Charles Brown",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  if (project.type === "music") {
    const musicGroup: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      name: project.title,
      url: projectUrl,
      description: project.ogDescription,
      genre: project.subtitle,
      member: composer,
      recordLabel: brokenEarRecords,
      ...(project.links ? { sameAs: project.links.map((l) => l.href) } : {}),
    };

    if (project.albumTitle && project.buyUrl) {
      musicGroup.album = {
        "@type": "MusicAlbum",
        name: project.albumTitle,
        url: project.buyUrl,
        byArtist: { "@type": "MusicGroup", name: project.title },
      };
    }

    return [musicGroup, breadcrumb];
  }

  // film
  const movie: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: project.title,
    url: projectUrl,
    description: project.ogDescription,
    musicBy: composer,
    ...(project.directorCredit
      ? {
          director: {
            "@type": "Person",
            name: project.directorCredit.name,
            url: project.directorCredit.href,
          },
        }
      : {}),
  };

  return [movie, breadcrumb];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const ogImage = project.ogImage ?? `/projects/${slug}/images/og-${slug}.jpg`;
  const fullTitle = `${project.title} — Michael Charles Brown`;

  return {
    title: project.title,
    description: project.ogDescription,
    openGraph: {
      title: fullTitle,
      description: project.ogDescription,
      url: `https://michaelcharlesbrown.com/projects/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: project.ogDescription,
      images: [{ url: ogImage, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const schemas = buildProjectSchema(project);

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <ProjectPageClient project={project} />
    </>
  );
}
