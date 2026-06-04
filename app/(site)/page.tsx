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

export default function HomePage() {
  const rows = chunkArray(projects, 3);

  return (
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
  );
}
