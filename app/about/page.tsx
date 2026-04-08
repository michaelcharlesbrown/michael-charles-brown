import NavIcon from "@/app/components/NavIcon";

const SOCIAL_LINKS = [
  { label: "IMDB", href: "https://www.imdb.com/" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/" },
  { label: "BANDCAMP", href: "https://bandcamp.com/" },
  { label: "YOUTUBE", href: "https://www.youtube.com/" },
];

export default function AboutPage() {
  return (
    <div className="about-page-wrap">
      <NavIcon />
      <main className="about-page-main">
        <h1 className="about-page-headline">
          MICHAEL CHARLES BROWN IS A COMPOSER AND RECORDING ARTIST BASED IN LOS ANGELES.
        </h1>

        <div className="about-page-body">
          <p>
            A composer whose work moves fluidly between film scoring and experimental
            albums. His music blends atmospheric textures with bold rhythmic undercurrents,
            creating sound worlds that feel both cinematic and deeply personal.
          </p>
          <p>
            Most recently, Brown completed the original score for Cancuncito (2025), a
            debut feature headed into festival circulation this year. The project highlights
            his instinct for sculpting immersive themes that heighten narrative and
            emotional depth — a style equally at home in fiction and documentary work.
          </p>
          <p>
            As a recording artist, Brown has released a series of albums under various
            monikers and collaborative projects including Red Moon Apostles and Mad Denizen.
            These projects explore everything from meditative, minimalist soundscapes to raw,
            driving post-punk energy, reflecting the wide range of voices he brings to his
            scoring work.
          </p>
        </div>

        <div className="about-page-social">
          {SOCIAL_LINKS.map(({ label, href }, i) => (
            <span key={label}>
              {i > 0 && " | "}
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </span>
          ))}
        </div>

        <div className="about-page-dm">
          <a href="#">DIRECT MESSAGE</a>
        </div>
      </main>
    </div>
  );
}
