import { projects } from "@/data/projects";
import HomeLenis from "@/components/HomeLenis";
import ProjectCard from "@/components/ProjectCard";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const NEXT_IMAGE_WIDTHS = [256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export default function HomePage() {
  const rows = chunkArray(projects, 3);
  const lcpPoster = projects[0].cardPoster;
  const lcpSrcSet = NEXT_IMAGE_WIDTHS.map(
    (w) => `/_next/image?url=${encodeURIComponent(lcpPoster)}&w=${w}&q=75 ${w}w`
  ).join(", ");

  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={lcpSrcSet}
        imageSizes="(min-width: 768px) 33vw, 100vw"
        fetchPriority="high"
      />
      <div className="home-snap-container" data-lenis-prevent>
      <HomeLenis />

      {/* Desktop: rows of 3 as snap sections */}
      {rows.map((row, rowIndex) => (
        <section
          key={`row-${rowIndex}`}
          className="home-snap-section home-snap-row"
        >
          <div className="home-snap-inner page-wrap">
            <div className="home-grid">
              {row.map((project, i) => (
                <div key={project.slug} data-desktop-slug={project.slug} className="home-card-wrap">
                  <ProjectCard project={project} index={rowIndex * 3 + i} />
                  <div className="card-caption">
                    <span className="card-caption-title">{project.title}</span>
                    <span>{project.cardDescriptor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Mobile: each card is its own snap section */}
      {projects.map((project, i) => (
        <section
          key={`mobile-${project.slug}`}
          data-slug={project.slug}
          className="home-snap-section home-snap-card"
        >
          <div className="home-snap-inner page-wrap">
            <div className="home-card-wrap">
              <ProjectCard project={project} index={i} />
              <div className="card-caption">
                <span className="card-caption-title">{project.title}</span>
                <span>{project.cardDescriptor}</span>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
    </>
  );
}
