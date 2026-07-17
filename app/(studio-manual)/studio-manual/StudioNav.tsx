"use client"

import { useEffect, useState } from "react"
import styles from "./studio-manual.module.css"

const navItems: { href: string; label: string }[] = [
  { href: "#quick-reference", label: "Quick Reference" },
  { href: "#session-setup", label: "Session Setup" },
  { href: "#recording", label: "Recording" },
  { href: "#gain-staging", label: "Gain Staging" },
  { href: "#mixing", label: "Mixing" },
  { href: "#space", label: "Space" },
  { href: "#mastering", label: "Mastering" },
  { href: "#export", label: "Export" },
  { href: "#plugin-notes", label: "Plugin Notes" },
  { href: "#checklists", label: "Checklists" },
  { href: "#open-questions", label: "Open Questions" },
]

export default function StudioNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        Michael Charles Brown<strong>Studio Manual</strong>
      </div>

      <button
        type="button"
        className={styles.menuButton}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="studio-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.burger} data-open={open} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav id="studio-nav" className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
