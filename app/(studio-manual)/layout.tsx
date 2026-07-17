import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Michael Charles Brown — Studio Manual" },
  description: "Personal recording, mixing, and mastering reference manual.",
  robots: { index: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
