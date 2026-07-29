import type { ProjectLink } from "@/data/projects";
import RollLink from "@/components/RollLink";

interface SocialLinksProps {
  links: ProjectLink[];
  /** Plain text before the first link (e.g. "CONNECT ON "). Inherits regular weight. */
  prefix?: string;
  /** Page-specific spacing wrapper (e.g. about-social, proj-social-row). */
  className?: string;
}

export default function SocialLinks({ links, prefix, className }: SocialLinksProps) {
  if (!links.length) return null;

  const row = (
    <div className="social-links">
      {prefix}
      {links.map((link, i) => (
        <span key={`${link.href}-${link.label}`}>
          <RollLink href={link.href} external>
            {link.label}
          </RollLink>
          {i < links.length - 1 && " | "}
        </span>
      ))}
    </div>
  );

  if (!className) return row;
  return <div className={className}>{row}</div>;
}
