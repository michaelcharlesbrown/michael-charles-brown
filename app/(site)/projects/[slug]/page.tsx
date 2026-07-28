import type { Metadata } from "next";
import { projects, type Project } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectPageClient from "@/components/ProjectPageClient";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/data/site";

const BASE_URL = SITE_URL;
const BER_URL = "https://brokenearrecords.com";

const composer = {
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: SITE_NAME,
  url: BASE_URL,
};

const brokenEarRecords = {
  "@type": "Organization",
  "@id": `${BER_URL}/#organization`,
  name: "Broken Ear Records",
  url: BER_URL,
};

function ogImagePath(project: Project): string {
  return project.ogImage ?? `/projects/${project.slug}/images/og-${project.slug}.jpg`;
}

function buildProjectSchema(project: Project): Record<string, unknown>[] {
  const projectUrl = `${BASE_URL}/projects/${project.slug}`;
  const imageUrl = `${BASE_URL}${ogImagePath(project)}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
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
    const groupId = `${projectUrl}#musicgroup`;

    const musicGroup: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "@id": groupId,
      name: project.title,
      url: projectUrl,
      image: imageUrl,
      description: project.ogDescription,
      ...(project.genre ? { genre: project.genre } : {}),
      member: composer,
      recordLabel: brokenEarRecords,
      ...(project.links ? { sameAs: project.links.map((l) => l.href) } : {}),
    };

    if (project.albumTitle && project.buyUrl) {
      musicGroup.album = {
        "@type": "MusicAlbum",
        "@id": `${projectUrl}#album`,
        name: project.albumTitle,
        url: project.buyUrl,
        image: imageUrl,
        byArtist: { "@id": groupId },
      };
    }

    return [musicGroup, breadcrumb];
  }

  // film
  const movie: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `${projectUrl}#movie`,
    name: project.title,
    url: projectUrl,
    image: imageUrl,
    description: project.ogDescription,
    musicBy: composer,
    ...(project.datePublished ? { datePublished: project.datePublished } : {}),
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

  const ogImage = ogImagePath(project);
  const fullTitle = `${project.title} — ${SITE_NAME}`;

  return {
    title: project.title,
    description: project.ogDescription,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: fullTitle,
      description: project.ogDescription,
      url: `${SITE_URL}/projects/${slug}`,
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
