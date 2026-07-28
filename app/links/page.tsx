"use client"

import { useFitText } from "@/hooks/useFitText"
import { ROLES, SITE_NAME } from "@/data/site"

const links: {
  label: string
  href: string
  external: boolean
  /** Set false to show again when brokenearrecords.com is live */
  hidden?: boolean
}[] = [
  {
    label: "michaelcharlesbrown.com",
    href: "https://michaelcharlesbrown.com",
    external: true,
  },
  {
    label: "RED MOON APOSTLES",
    href: "https://open.spotify.com/artist/3IXgCsALnK7snY68rFwwe9",
    external: true,
  },
  {
    label: "MAD DENIZEN",
    href: "https://open.spotify.com/artist/3WJymJTqfpwT0iybktxqQh",
    external: true,
  },
  {
    label: "BOOMING DUNES",
    href: "https://open.spotify.com/artist/6Gur5AyvODlXA3mvKSHcOP",
    external: true,
  },
  {
    label: "BROKEN EAR RECORDS",
    href: "https://brokenearrecords.com",
    external: true,
    hidden: true, // TEMP — site under construction
  },
]

export default function LinksPage() {
  const nameRef = useFitText()
  const rolesRef = useFitText()

  return (
    <div className="links-page">
      <div className="links-col">
        <h1 className="about-name">
          <span ref={nameRef as React.Ref<HTMLSpanElement>}>{SITE_NAME}</span>
        </h1>
        <p className="about-roles links-tagline">
          <span ref={rolesRef as React.Ref<HTMLSpanElement>}>
            {ROLES.map((role, i) => (
              <span key={role}>
                {role}
                {i < ROLES.length - 1 && " /// "}
              </span>
            ))}
          </span>
        </p>

        <ul className="links-list">
          {links.filter((link) => !link.hidden).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="links-btn"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
