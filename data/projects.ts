export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectEmbed {
  type: "youtube" | "vimeo";
  src: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type: "film" | "music";
  heroImage: string;
  credits: string;
  description: string[];
  cardVideo: string;
  cardPoster: string;
  cardDescriptor: string;
  galleryImages: string[];
  cta: "WATCH" | "STREAM";
  videoUrl?: string;
  quote?: string;
  streamUrl?: string;
  buyUrl?: string;
  videoEmbed?: ProjectEmbed;
  filmVideo?: string;
  spotifyId?: string;
  links?: ProjectLink[];
  festivalSelections?: string[];
}

export const projects: Project[] = [
  {
    slug: "cancuncito",
    title: "CANCUNCITO",
    subtitle: "ORIGINAL SCORE",
    type: "film",
    heroImage: "/images/hero-cancuncito.jpg",
    credits: "Written and directed by Carlos Alejandro Marulanda",
    description: [
      "This project is a Lorem ipsum dolor sit amet consectetur. Porttitor malesuada quis quam ultricies quam justo. Tincidunt leo sed purus diam id sed praesent sit.",
    ],
    cardVideo: "/video/cancuncito.mp4",
    cardPoster: "/images/cancuncito.jpg",
    cardDescriptor: "ORIGINAL SCORE",
    galleryImages: [
      "/images/hero-cancuncito.jpg",
      "/images/cancuncito.jpg",
      "/images/cancuncito.jpg",
      "/images/hero-cancuncito.jpg",
    ],
    cta: "WATCH",
    videoUrl: "/video/cancuncito.mp4",
    filmVideo: "/video/cancuncito.mp4",
  },
  {
    slug: "red-moon-apostles",
    title: "RED MOON APOSTLES",
    subtitle: "APOCALYPTIC AMERICANA",
    type: "music",
    heroImage: "/images/hero-rma.jpg",
    credits: "",
    description: [
      "Bow down to your algorithmic overlords and embark a harrowing journey across the dusty redsand wasteland of the future past, where time loops in ghostly incantations on magnetic tape and the whispers of a forgotten civilization drift across the barren landscape.",
      "As technology becomes indistinguishable from magic, stone faces float in the shadowy void, warm in the glow of dark reflection, hovering between human longing and mechanical inevitability. Rituals of slumber endlessly reflected across tiny screens blur the line between progress and entropy, fate and free will — a world unraveling under the weight of its own artifice.",
    ],
    cardVideo: "/video/rma.mp4",
    cardPoster: "/images/rma.jpg",
    cardDescriptor: "APOCALYPTIC AMERICANA",
    galleryImages: [
      "/images/hero-rma.jpg",
      "/images/rma.jpg",
      "/images/rma.jpg",
      "/images/hero-rma.jpg",
    ],
    cta: "STREAM",
    streamUrl: "https://open.spotify.com/artist/3IXgCsALnK7snY68rFwwe9",
    buyUrl: "https://redmoonapostles.bandcamp.com",
    videoEmbed: {
      type: "youtube",
      src: "https://www.youtube.com/embed/4hZ34bKRIZE?si=gdEzqGPmcgheT4Vi",
    },
    spotifyId: "3IXgCsALnK7snY68rFwwe9",
    links: [
      { label: "INSTAGRAM", href: "https://instagram.com/redmoonapostles" },
      { label: "BANDCAMP", href: "https://redmoonapostles.bandcamp.com" },
      { label: "SPOTIFY", href: "https://open.spotify.com/artist/3IXgCsALnK7snY68rFwwe9" },
      { label: "YOUTUBE", href: "https://www.youtube.com/@redmoonapostles" },
    ],
  },
  {
    slug: "snow-king",
    title: "SNOW KING",
    subtitle: "ORIGINAL SCORE",
    type: "film",
    heroImage: "/images/hero-snowking.jpg",
    credits: "Written and directed by Greg Jonkajtys",
    description: [
      "Snow King is the story of a man, who, as a young boy witnesses the horrors of war, human cruelty and insufferable pain. Deported to a distant land far from home, the boy develops a dangerous friendship with an eccentric local puppet-maker, a bond he must sacrifice to save his mother. Ever since, he is cursed with an unlikely ability; to see the evil in all people. An ability that stays with him into his adult life. One that fuels both talent and malice, bringing him fame and fortune yet driving him ever further toward madness.",
    ],
    cardVideo: "/video/snow-king.mp4",
    cardPoster: "/images/snow-king.jpg",
    cardDescriptor: "ORIGINAL SCORE",
    galleryImages: [
      "/images/hero-snowking.jpg",
      "/images/snow-king.jpg",
      "/images/snow-king.jpg",
      "/images/hero-snowking.jpg",
    ],
    cta: "WATCH",
    videoUrl: "https://player.vimeo.com/video/42444069?h=0c4c57b95b",
    videoEmbed: {
      type: "vimeo",
      src: "https://player.vimeo.com/video/42444069?h=0c4c57b95b",
    },
  },
  {
    slug: "booming-dunes",
    title: "BOOMING DUNES",
    subtitle: "EXPERIMENTAL ELECTRONIC",
    type: "music",
    heroImage: "/images/hero-bd.jpg",
    credits: "",
    description: [
      "Booming Dunes is the lo-fi experimental ambient project of Los Angeles based composer/producer Michael Charles Brown. Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night. A cinematic, hallucinatory journey through a soft, warm, saturated dreamworld of sound and emotion. Needles in the red.",
    ],
    cardVideo: "/video/booming-dunes.mp4",
    cardPoster: "/images/booming-dunes.jpg",
    cardDescriptor: "EXPERIMENTAL ELECTRONIC",
    galleryImages: [
      "/images/hero-bd.jpg",
      "/images/booming-dunes.jpg",
      "/images/booming-dunes.jpg",
      "/images/hero-bd.jpg",
    ],
    cta: "STREAM",
    streamUrl: "https://open.spotify.com/artist/6Gur5AyvODlXA3mvKSHcOP",
    buyUrl: "https://boomingdunes.bandcamp.com",
    videoEmbed: {
      type: "youtube",
      src: "https://www.youtube.com/embed/kydR3NaZVwg?si=LasO5DdVRv1BNK8Q",
    },
    spotifyId: "6Gur5AyvODlXA3mvKSHcOP",
    links: [
      { label: "INSTAGRAM", href: "https://instagram.com/boomingdunes" },
      { label: "BANDCAMP", href: "https://boomingdunes.bandcamp.com" },
      { label: "SPOTIFY", href: "https://open.spotify.com/artist/6Gur5AyvODlXA3mvKSHcOP" },
      { label: "YOUTUBE", href: "https://www.youtube.com/@boomingdunes" },
    ],
  },
  {
    slug: "breathing-chamber",
    title: "BREATHING CHAMBER",
    subtitle: "ORIGINAL SCORE",
    type: "film",
    heroImage: "/images/hero-bc.jpg",
    credits: "Written and directed by Carlos Alejandro Marulanda",
    description: [
      "Mysterious breathing problems begin to change a boy's life as he finds himself suffocating in his familiar surroundings.",
      "EXPERIMENTAL/NARRATIVE, 16mm Film.",
    ],
    cardVideo: "/video/breathing-chamber.mp4",
    cardPoster: "/images/breathing-chamber.jpg",
    cardDescriptor: "ORIGINAL SCORE",
    galleryImages: [
      "/images/hero-bc.jpg",
      "/images/breathing-chamber.jpg",
      "/images/breathing-chamber.jpg",
      "/images/hero-bc.jpg",
    ],
    cta: "WATCH",
    videoUrl: "https://player.vimeo.com/video/59210170",
    videoEmbed: {
      type: "vimeo",
      src: "https://player.vimeo.com/video/59210170",
    },
    festivalSelections: [
      "Sitges International Film Festival",
      "Ann Arbor Film Festival",
      "S.F. Indiefest",
      "San Francisco Latino Film Festival — Winner: Best Short Film",
      "San Francisco Videofest",
      "CSU Media Arts Festival — Winner: Best Cinematography",
    ],
  },
  {
    slug: "mad-denizen",
    title: "MAD DENIZEN",
    subtitle: "BLEEDING HEART DOOM BALLADS",
    type: "music",
    heroImage: "/images/hero-md.jpg",
    credits: "",
    quote: "“Men are so necessarily mad that not to be mad would appear mad through another trick madness played.”",
    description: [
      "Mad Denizen is an acoustic project recorded entirely on analog tape. The songs were written on acoustic guitar and captured end-to-end on a reel-to-reel tape machine, with no digital recording at any stage of the process.",
      "The entire album was self-recorded, engineered, produced, and mixed on a Tascam 388, embracing the limitations and discipline of a fully analog workflow. Final touches — additional instrumentation and subtle production details — were completed at Tiny Telephone in San Francisco.",
      "The album was released on vinyl to critical acclaim, praised for its warmth, restraint, and commitment to process — an artifact shaped as much by intention and limitation as by songcraft.",
    ],
    cardVideo: "/video/mad-denizen.mp4",
    cardPoster: "/images/mad-denizen.jpg",
    cardDescriptor: "BLEEDING HEART DOOM BALLADS",
    galleryImages: [
      "/images/hero-md.jpg",
      "/images/mad-denizen.jpg",
      "/images/mad-denizen.jpg",
      "/images/hero-md.jpg",
      "/images/hero-md.jpg",
      "/images/mad-denizen.jpg",
    ],
    cta: "STREAM",
    streamUrl: "https://maddenizen.bandcamp.com",
    buyUrl: "https://maddenizen.bandcamp.com/album/starved",
    videoEmbed: {
      type: "youtube",
      src: "https://www.youtube.com/embed/9De1ylIPqWE?si=xAu3nMIx93S6kBPc",
    },
    links: [
      { label: "INSTAGRAM", href: "https://instagram.com/maddenizen" },
      { label: "BANDCAMP", href: "https://maddenizen.bandcamp.com" },
      { label: "SPOTIFY", href: "https://open.spotify.com/artist/maddenizen" },
      { label: "YOUTUBE", href: "https://www.youtube.com/@maddenizen" },
    ],
  },
];
