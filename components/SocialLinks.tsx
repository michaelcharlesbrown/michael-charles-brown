import type { ProjectLink } from "@/data/projects";
import RollLink from "@/src/components/ui/RollLink";

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
