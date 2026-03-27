import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Michael Charles Brown — composer, recording artist, Los Angeles.",
  openGraph: {
    images: [{ url: "/images/mcb-og.jpg", width: 1200, height: 630, alt: "Michael Charles Brown" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/mcb-og.jpg"],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
