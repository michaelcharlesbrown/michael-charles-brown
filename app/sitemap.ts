import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const base = "https://www.michaelcharlesbrown.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.9 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
