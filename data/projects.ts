export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  subtitle?: string;
  video: string;
  poster: string;
  /** Vimeo numeric id for project page iframe; empty if using embedIframeSrc or html5 only */
  vimeoId: string;
  /** Full iframe URL when not using vimeoId (e.g. YouTube embed) */
  embedIframeSrc?: string;
  /** Local HTML5 clip used after facade click when no iframe source */
  html5VideoSrc?: string;
  description: string;
  audioSrc: string;
  audioLabel: string;
  links: ProjectLink[];
}

const SNOW_KING_BODY =
  "Snow King is the story of a man, who, as a young boy witnesses the horrors of war, human cruelty and insufferable pain. Deported to a distant land far from home, the boy develops a dangerous friendship with an eccentric local puppet-maker, a bond he must sacrifice to save his mother.\n\nEver since, he is cursed with an unlikely ability; to see the evil in all people. An ability that stays with him into his adult life. One that fuels both talent and malice, bringing him fame and fortune yet driving him ever further toward madness";

export const projects: Project[] = [
  {
    slug: "cancuncito",
    title: "CANCUNCITO",
    category: "ORIGINAL SCORE",
    subtitle: "Written and directed by Carlos Alejandro Marulanda",
    video: "/video/cancuncito.mp4",
    poster: "/images/cancuncito.jpg",
    vimeoId: "",
    html5VideoSrc: "/video/cancuncito.mp4",
    description:
      "Written and directed by Carlos Alejandro Marulanda.\n\nCancuncito (2025) is a debut feature headed into festival circulation — sculpting immersive themes that heighten narrative and emotional depth.",
    audioSrc: "/audio/placeholder.mp3",
    audioLabel: "CANCUNCITO",
    links: [
      { label: "IMDB", href: "https://www.imdb.com" },
      { label: "INSTAGRAM", href: "https://instagram.com" },
      { label: "BANDCAMP", href: "https://bandcamp.com" },
      { label: "SPOTIFY", href: "https://open.spotify.com" },
      { label: "YOUTUBE", href: "https://youtube.com" },
    ],
  },
  {
    slug: "red-moon-apostles",
    title: "RED MOON APOSTLES",
    category: "APOCALYPTIC AMERICANA",
    video: "/video/rma.mp4",
    poster: "/images/rma.jpg",
    vimeoId: "",
    embedIframeSrc: "https://www.youtube.com/embed/4hZ34bKRIZE?si=gdEzqGPmcgheT4Vi",
    description:
      "Bow down to your algorithmic overlords and embark on a harrowing journey across the dusty redsand wasteland of the future past, where time loops in ghostly incantations on magnetic tape and the whispers of a forgotten civilization drift across the barren landscape.\n\nAs technology becomes indistinguishable from magic, stone faces float in the shadowy void, warm in the glow of dark reflection, hovering between human longing and mechanical inevitability.",
    audioSrc: "/audio/placeholder.mp3",
    audioLabel: "RED MOON APOSTLES",
    links: [
      { label: "INSTAGRAM", href: "https://instagram.com/redmoonapostles" },
      { label: "BANDCAMP", href: "https://redmoonapostles.bandcamp.com" },
      { label: "YOUTUBE", href: "https://www.youtube.com/@redmoonapostles" },
    ],
  },
  {
    slug: "snow-king",
    title: "SNOW KING",
    category: "ORIGINAL SCORE",
    subtitle: "Written and directed by Greg Jonkajtys",
    video: "/video/snow-king.mp4",
    poster: "/images/snow-king.jpg",
    vimeoId: "42444069",
    description: SNOW_KING_BODY,
    audioSrc: "/audio/placeholder.mp3",
    audioLabel: "SNOW KING",
    links: [
      { label: "IMDB", href: "https://www.imdb.com" },
      { label: "INSTAGRAM", href: "https://instagram.com" },
      { label: "BANDCAMP", href: "https://bandcamp.com" },
      { label: "SPOTIFY", href: "https://open.spotify.com" },
      { label: "YOUTUBE", href: "https://youtube.com" },
    ],
  },
  {
    slug: "booming-dunes",
    title: "BOOMING DUNES",
    category: "EXPERIMENTAL AMBIENT",
    video: "/video/booming-dunes.mp4",
    poster: "/images/booming-dunes.jpg",
    vimeoId: "",
    embedIframeSrc: "https://www.youtube.com/embed/kydR3NaZVwg?si=LasO5DdVRv1BNK8Q",
    description:
      "Booming Dunes is the lo-fi experimental ambient project of Los Angeles based composer/producer Michael Charles Brown. Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night.",
    audioSrc: "/audio/placeholder.mp3",
    audioLabel: "BOOMING DUNES",
    links: [
      { label: "INSTAGRAM", href: "https://instagram.com/boomingdunes" },
      { label: "BANDCAMP", href: "https://boomingdunes.bandcamp.com" },
      { label: "YOUTUBE", href: "https://www.youtube.com/@boomingdunes" },
    ],
  },
  {
    slug: "breathing-chamber",
    title: "BREATHING CHAMBER",
    category: "ORIGINAL SCORE",
    subtitle: "Written and directed by Carlos Alejandro Marulanda",
    video: "/video/breathing-chamber.mp4",
    poster: "/images/breathing-chamber.jpg",
    vimeoId: "59210170",
    description:
      "Mysterious breathing problems begin to change a boy's life as he finds himself suffocating in his familiar surroundings.\n\nEXPERIMENTAL/NARRATIVE, 16mm Film.\n\nOFFICIAL SELECTION: Sitges International Film Festival, Ann Arbor Film Festival, S.F. Indiefest, San Francisco Latino Film Festival (Winner: best Short Film), San Francisco Videofest, CSU Media Arts Festival (Winner: Best Cinematography).",
    audioSrc: "",
    audioLabel: "BREATHING CHAMBER",
    links: [],
  },
  {
    slug: "mad-denizen",
    title: "MAD DENIZEN",
    category: "BLEEDING HEART DOOM BALLADS",
    video: "/video/mad-denizen.mp4",
    poster: "/images/mad-denizen.jpg",
    vimeoId: "",
    embedIframeSrc: "https://www.youtube.com/embed/9De1ylIPqWE?si=xAu3nMIx93S6kBPc",
    description:
      '"Men are so necessarily mad that not to be mad would appear mad through another trick madness played." — Blaise Pascal\n\n"Discovering the debut LP from Mad Denizen, Starved, is like putting on Springsteen\'s Nebraska for the first time." — Benjamin Ricci, Performer Magazine\n\nMad Denizen is an acoustic project recorded entirely on analog tape. The songs were written on acoustic guitar and captured end-to-end on a reel-to-reel tape machine, with no digital recording at any stage of the process.',
    audioSrc: "/audio/placeholder.mp3",
    audioLabel: "MAD DENIZEN",
    links: [
      { label: "INSTAGRAM", href: "https://instagram.com/maddenizen" },
      { label: "BANDCAMP", href: "https://maddenizen.bandcamp.com" },
      { label: "YOUTUBE", href: "https://www.youtube.com/@maddenizen" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
