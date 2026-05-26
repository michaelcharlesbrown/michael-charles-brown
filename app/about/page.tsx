import SocialLinks from "@/components/SocialLinks";
import FitText from "@/components/FitText";
import type { ProjectLink } from "@/data/projects";

const socialLinks: ProjectLink[] = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "BANDCAMP", href: "https://bandcamp.com" },
  { label: "SPOTIFY", href: "https://spotify.com" },
  { label: "YOUTUBE", href: "https://youtube.com" },
];

const roles = ["COMPOSER", "PRODUCER", "RECORDING ARTIST"];

export default function AboutPage() {
  return (
    <div className="about-main page-wrap">
      <div className="about-content">
        <h1 className="about-name"><FitText>MICHAEL CHARLES BROWN</FitText></h1>
        <p className="about-roles">
          <FitText>
            {roles.map((role, i) => (
              <span key={role}>
                {role}
                {i < roles.length - 1 && " /// "}
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

        <SocialLinks links={socialLinks} className="about-social" />
      </div>
    </div>
  );
}
