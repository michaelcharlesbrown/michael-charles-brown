import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Michael Charles Brown — composer, recording artist, Los Angeles.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
