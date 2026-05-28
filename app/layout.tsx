import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { LenisProvider } from "./components/LenisProvider";
import Header from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const MCB_URL = "https://michaelcharlesbrown.com";
const BER_URL = "https://brokenearrecords.com";
const MCBC_URL = "https://mcbcreative.design";
const MCB_DESCRIPTION =
  "Composer and recording artist. Original scores for film, experimental electronic music, and genre-defying recording projects.";

// Stable @id URIs — these are the canonical identifiers for each entity.
// All three sites reference these exact strings so Google resolves them
// to the same nodes in the knowledge graph.
const MCB_ID = `${MCB_URL}/#person`;
const BER_ID = `${BER_URL}/#organization`;
const MCBC_ID = `${MCBC_URL}/#organization`;

const brokenEarRecordsRef = {
  "@type": "Organization",
  "@id": BER_ID,
  name: "Broken Ear Records",
  url: BER_URL,
};

const mcbCreativeRef = {
  "@type": "Organization",
  "@id": MCBC_ID,
  name: "MCB Creative",
  url: MCBC_URL,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": MCB_ID,
  name: "Michael Charles Brown",
  url: MCB_URL,
  image: `${MCB_URL}/images/og-michael-charles-brown.jpg`,
  description: MCB_DESCRIPTION,
  jobTitle: ["Composer", "Recording Artist", "Music Producer"],
  knowsAbout: [
    "Film Scoring",
    "Music Composition",
    "Analog Recording",
    "Electronic Music",
    "Experimental Music",
    "Singer-Songwriter",
  ],
  homeLocation: {
    "@type": "Place",
    name: "San Francisco, California",
  },
  affiliation: [brokenEarRecordsRef, mcbCreativeRef],
  sameAs: [
    "https://www.imdb.com/name/nm16024371/",
    "https://instagram.com/maddenizen",
    "https://open.spotify.com/artist/3IXgCsALnK7snY68rFwwe9",
    "https://www.youtube.com/@redmoonapostles",
    "https://maddenizen.bandcamp.com",
    "https://www.linkedin.com/in/michaelcharlesbrown/",
    BER_URL,
    MCBC_URL,
  ],
};

const brokenEarRecordsSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": BER_ID,
  name: "Broken Ear Records",
  url: BER_URL,
  description:
    "Independent record label founded by Michael Charles Brown, releasing experimental, electronic, and genre-defying music.",
  founder: {
    "@type": "Person",
    "@id": MCB_ID,
    name: "Michael Charles Brown",
    url: MCB_URL,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Michael Charles Brown",
  url: MCB_URL,
  description: MCB_DESCRIPTION,
  author: {
    "@type": "Person",
    "@id": MCB_ID,
    name: "Michael Charles Brown",
    url: MCB_URL,
  },
};

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
    <ViewTransitions>
      <html lang="en" className={geistMono.variable}>
        <body>
          <JsonLd schema={personSchema} />
          <JsonLd schema={brokenEarRecordsSchema} />
          <JsonLd schema={websiteSchema} />
          <LenisProvider>
            <Header />
            <main>{children}</main>
          </LenisProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
