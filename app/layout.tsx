import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: "Michael Charles Brown — Composer & Recording Artist",
    template: "%s — Michael Charles Brown",
  },
  description: "Michael Charles Brown is a composer and recording artist. Original scores for film, experimental electronic music, and genre-defying recording projects.",
  metadataBase: new URL("https://michaelcharlesbrown.com"),
  openGraph: {
    title: "Michael Charles Brown — Composer & Recording Artist",
    description: "Michael Charles Brown is a composer and recording artist. Original scores for film, experimental electronic music, and genre-defying recording projects.",
    url: "https://michaelcharlesbrown.com",
    siteName: "Michael Charles Brown",
    images: [{ url: "/images/og-michael-charles-brown.jpg", width: 1200, height: 630, alt: "Michael Charles Brown" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Charles Brown — Composer & Recording Artist",
    description: "Michael Charles Brown is a composer and recording artist. Original scores for film, experimental electronic music, and genre-defying recording projects.",
    images: [{ url: "/images/og-michael-charles-brown.jpg", width: 1200, height: 630, alt: "Michael Charles Brown" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body>{children}</body>
    </html>
  );
}
