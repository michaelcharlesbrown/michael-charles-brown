import type { Metadata } from "next"
import { SITE_NAME } from "@/data/site"

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — Links` },
  robots: { index: false },
}

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
