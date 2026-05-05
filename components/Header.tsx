import Link from "next/link";
import NavIcon from "@/components/NavIcon";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/about" className="site-header-title">
        M/C/B
      </Link>
      <NavIcon />
      <a href="mailto:your@email.com" className="site-header-contact">
        CONTACT
      </a>
    </header>
  );
}
