import NavIcon from "@/components/NavIcon";
import RollLink from "@/src/components/ui/RollLink";

export default function Header() {
  return (
    <header className="site-header">
      <RollLink href="/about" className="site-header-title">
        M/C/B
      </RollLink>
      <NavIcon />
      <RollLink href="mailto:your@email.com" className="site-header-contact">
        CONTACT
      </RollLink>
    </header>
  );
}
