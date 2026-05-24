import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { LenisProvider } from "./components/LenisProvider";
import Header from "@/components/Header";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "M/C/B",
  description: "Composer and recording artist creating original music for film, experimental soundscapes, and collaborative projects.",
  metadataBase: new URL("https://michaelcharlesbrown.com"),
  openGraph: {
    title: "M/C/B",
    description: "Composer and recording artist creating original music for film, experimental soundscapes, and collaborative projects.",
    url: "https://michaelcharlesbrown.com",
    siteName: "M/C/B",
    images: [{ url: "/images/mcb-og.jpg", width: 1200, height: 630, alt: "Michael Charles Brown" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M/C/B",
    description: "Composer and recording artist creating original music for film, experimental soundscapes, and collaborative projects.",
    images: [{ url: "/images/mcb-og.jpg", width: 1200, height: 630, alt: "Michael Charles Brown" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body className="antialiased">
        <LenisProvider>
          <Header />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
