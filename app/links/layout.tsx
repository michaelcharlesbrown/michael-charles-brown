import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Michael Charles Brown — Links",
  robots: { index: false },
}

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
