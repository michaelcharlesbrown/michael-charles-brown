import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michael Charles Brown /// Composer /// Recording Artist",
  description: "Composer and recording artist creating original music for film, experimental soundscapes, and collaborative projects.",
  metadataBase: new URL("https://michael-charles-brown.vercel.app"),
  openGraph: {
    title: "Michael Charles Brown /// Composer /// Recording Artist",
    description: "Composer and recording artist creating original music for film, experimental soundscapes, and collaborative projects.",
    url: "https://michael-charles-brown.vercel.app",
    siteName: "Michael Charles Brown",
    images: [
      {
        url: "/images/mcb-og.jpg",
        width: 1200,
        height: 630,
        alt: "Michael Charles Brown /// Composer /// Recording Artist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Charles Brown /// Composer /// Recording Artist",
    description: "Composer and recording artist creating original music for film, experimental soundscapes, and collaborative projects.",
    images: [
      {
        url: "/images/mcb-og.jpg",
        width: 1200,
        height: 630,
        alt: "Michael Charles Brown /// Composer /// Recording Artist",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${ibmPlexMono.className}`}>
      <body className={`antialiased ${ibmPlexMono.className}`}>
        {children}
      </body>
    </html>
  );
}
