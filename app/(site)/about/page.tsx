import type { Metadata } from "next";
import SocialLinks from "@/components/SocialLinks";
import FitText from "@/components/FitText";
import { JsonLd } from "@/components/JsonLd";
import type { ProjectLink } from "@/data/projects";
import { ROLES, SITE_NAME, SITE_URL } from "@/data/site";

// Page-specific sentence: Google penalises identical descriptions across pages.
// The identity framing must still match data/site.ts. Keep under ~160 chars.
const ABOUT_DESCRIPTION =
  "Classically trained, DIY from day one. Original film scores, analog tape recordings, and genre-defying projects: Mad Denizen, Red Moon Apostles, Booming Dunes.";

const ABOUT_TITLE = `About — ${SITE_NAME}`;
const ABOUT_URL = `${SITE_URL}/about`;
const ABOUT_IMAGE = "/images/og-michael-charles-brown-about.jpg";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    url: ABOUT_URL,
    type: "profile",
    images: [{ url: ABOUT_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: [{ url: ABOUT_IMAGE, alt: SITE_NAME }],
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${ABOUT_URL}#profilepage`,
  url: ABOUT_URL,
  name: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}${ABOUT_IMAGE}`,
  },
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

const socialLinks: ProjectLink[] = [
  { label: "INSTAGRAM", href: "https://www.instagram.com/maddenizen" },
];

export default function AboutPage() {
  return (
    <>
    <JsonLd schema={profilePageSchema} />
    <div className="about-main page-wrap">
      <div className="about-content">
        <h1 className="about-name"><FitText>{SITE_NAME}</FitText></h1>
        <p className="about-roles">
          <FitText>
            {ROLES.map((role, i) => (
              <span key={role}>
                {role}
                {i < ROLES.length - 1 && " /// "}
              </span>
            ))}
          </FitText>
        </p>

        <div className="about-body">
          <p>
            A prolific and fiercely independent creator, Michael has forged his
            own path through a wide range of styles, from the piercing
            confessionals of his solo acoustic project Mad Denizen, to the
            sprawling highway-through-the-desert-at-midnight space rock odyssey
            Red Moon Apostles, to the hypnotic incantations on handmade tape
            loops and whirring reels of Booming Dunes.
          </p>
          <p>
            DIY from day one, classically trained, Michael came up playing in
            bands before diving into the underground electronic music scene of
            San Francisco, where he was a founding member of the Mission
            District collective Million Fishes. The debut album Starved from Mad
            Denizen, recorded entirely to vintage reel-to-reel tape, was named
            Vinyl of the Month by Performer Magazine, who called the record
            “haunting.”
          </p>
          <p>
            For Cancuncito, his first feature film score, Michael crafted the
            score from recordings of piano, cello, and voice transformed into
            custom electronic instruments.
          </p>
        </div>

        <SocialLinks
          links={socialLinks}
          prefix="CONNECT ON "
          className="about-social"
        />
      </div>
    </div>
    </>
  );
}
