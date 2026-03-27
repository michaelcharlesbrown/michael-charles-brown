import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CursorDotClient from "./components/CursorDotClient";
import { LenisProvider } from "./components/LenisProvider";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: "Michael Charles Brown — Composer & Recording Artist",
    template: "%s | Michael Charles Brown",
  },
  description:
    "Los Angeles-based composer and recording artist. Film scoring, experimental albums, original scores.",
  metadataBase: new URL("https://www.michaelcharlesbrown.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.michaelcharlesbrown.com",
    siteName: "Michael Charles Brown",
    images: [
      {
        url: "/images/mcb-og.jpg",
        width: 1200,
        height: 630,
        alt: "Michael Charles Brown — Composer & Recording Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/mcb-og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <LenisProvider>
          {children}
          <CursorDotClient />
        </LenisProvider>
      </body>
    </html>
  );
}
