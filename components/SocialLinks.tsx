import type { ProjectLink } from "@/data/projects";

interface SocialLinksProps {
  links: ProjectLink[];
  /** Page-specific spacing wrapper (e.g. about-social, proj-social-row). */
  className?: string;
}

export default function SocialLinks({ links, className }: SocialLinksProps) {
  if (!links.length) return null;

  const row = (
    <div className="social-links">
      {links.map((link, i) => (
        <span key={`${link.href}-${link.label}`}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
          {i < links.length - 1 && (
            <span className="social-links-sep"> | </span>
          )}
        </span>
      ))}
    </div>
  );

  if (!className) return row;
  return <div className={className}>{row}</div>;
}
