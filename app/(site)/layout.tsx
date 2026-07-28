import Header from "@/components/Header"
import { LenisProvider } from "@/app/components/LenisProvider"
import { JsonLd } from "@/components/JsonLd"

import {
  JOB_TITLES,
  KNOWS_ABOUT,
  PERSON_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/data/site"

const MCB_URL = SITE_URL;
const BER_URL = "https://brokenearrecords.com";
const MCBC_URL = "https://mcbcreative.design";
const MCB_DESCRIPTION = PERSON_DESCRIPTION;

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
  name: SITE_NAME,
  url: MCB_URL,
  image: `${MCB_URL}/images/og-michael-charles-brown.jpg`,
  description: MCB_DESCRIPTION,
  jobTitle: JOB_TITLES,
  knowsAbout: KNOWS_ABOUT,
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
    name: SITE_NAME,
    url: MCB_URL,
  },
  sameAs: ["https://www.instagram.com/brokenearrecords/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${MCB_URL}/#website`,
  name: SITE_NAME,
  url: MCB_URL,
  inLanguage: "en-US",
  description: MCB_DESCRIPTION,
  author: {
    "@type": "Person",
    "@id": MCB_ID,
    name: SITE_NAME,
    url: MCB_URL,
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd schema={personSchema} />
      <JsonLd schema={brokenEarRecordsSchema} />
      <JsonLd schema={websiteSchema} />
      <LenisProvider>
        <Header />
        <main>{children}</main>
      </LenisProvider>
      <div className="navTriGlobalOverlayWrap" aria-hidden="true">
        <div className="navTriGlobalOverlay" />
      </div>
    </>
  );
}
