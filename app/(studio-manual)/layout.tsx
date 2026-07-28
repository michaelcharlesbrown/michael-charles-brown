import type { Metadata } from "next"
import { SITE_NAME } from "@/data/site"

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — Studio Manual` },
  description: "Personal recording, mixing, and mastering reference manual.",
  robots: { index: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
