"use client"

import { useFitText } from "@/hooks/useFitText"

const roles = ["COMPOSER", "PRODUCER", "RECORDING ARTIST"]

const links = [
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
  },
]

export default function LinksPage() {
  const nameRef = useFitText()
  const rolesRef = useFitText()

  return (
    <div className="links-page">
      <div className="links-col">
        <h1 className="about-name">
          <span ref={nameRef as React.Ref<HTMLSpanElement>}>
            MICHAEL CHARLES BROWN
          </span>
        </h1>
        <p className="about-roles links-tagline">
          <span ref={rolesRef as React.Ref<HTMLSpanElement>}>
            {roles.map((role, i) => (
              <span key={role}>
                {role}
                {i < roles.length - 1 && " /// "}
              </span>
            ))}
          </span>
        </p>

        <ul className="links-list">
          {links.map((link) => (
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
