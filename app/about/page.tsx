import SocialLinks from "@/components/SocialLinks";
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
        <h1 className="about-name">MICHAEL CHARLES BROWN</h1>
        <p className="about-roles">
          {roles.map((role, i) => (
            <span key={role}>
              {role}
              {i < roles.length - 1 && (
                <span className="about-sep"> | </span>
              )}
            </span>
          ))}
        </p>

        <div className="about-body">
          <p>
            A composer whose work moves fluidly between film scoring and
            experimental albums. His music blends atmospheric textures with
            bold rhythmic undercurrents, creating sound worlds that feel both
            cinematic and deeply personal.
          </p>
          <p>
            Most recently, Brown completed the original score for Cancuncito
            (2025), a debut feature headed into festival circulation this
            year. The project highlights his instinct for sculpting immersive
            themes that heighten narrative and emotional depth — a style
            equally at home in fiction and documentary work.
          </p>
          <p>
            As a recording artist, Brown has released a series of albums under
            various monikers and collaborative projects including Red Moon
            Apostles and Mad Denizen. These projects explore everything from
            meditative, minimalist soundscapes to raw, driving post-punk
            energy, reflecting the wide range of voices he brings to his
            scoring work.
          </p>
        </div>

        <SocialLinks links={socialLinks} className="about-social" />
      </div>
    </div>
  );
}
