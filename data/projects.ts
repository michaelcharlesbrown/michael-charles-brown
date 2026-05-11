export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectEmbed {
  type: "youtube" | "vimeo";
  src: string;
}

export interface DirectorCredit {
  /** Text before the linked director name, usually ends with a space (e.g. "A film by ") */
  prefix: string;
  name: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type: "film" | "music";
  heroImage: string;
  heroVideo: string;
  heroPoster: string;
  credits: string;
  /** When set, replaces plain credits with prefix + linked director name */
  directorCredit?: DirectorCredit;
  description: string[];
  cardVideo: string;
  cardPoster: string;
  cardDescriptor: string;
  galleryImages: string[];
  quote?: string;
  streamUrl?: string;
  buyUrl?: string;
  videoEmbed?: ProjectEmbed;
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
    heroVideo: "/projects/cancuncito/video/hero-cancuncito.mp4",
    heroPoster: "/projects/cancuncito/images/poster-hero-cancuncito.jpg",
    credits: "",
    directorCredit: {
      prefix: "A film by ",
      name: "Carlos Alejandro Marulanda",
      href: "https://example.com/director-carlos-marulanda",
    },
    description: [
      "Placeholder synopsis for this film project. Final copy will summarize the story, tone, and score when materials are ready.",
      "Second short paragraph placeholder for additional context, festival notes, or instrumentation — replace with real text later.",
    ],
    cardVideo: "/projects/cancuncito/video/card-cancuncito.mp4",
    cardPoster: "/projects/cancuncito/images/poster-card-cancuncito.jpg",
    cardDescriptor: "ORIGINAL SCORE",
    galleryImages: [
      "/projects/cancuncito/images/cancuncito-teo.jpg",
      "/projects/cancuncito/images/cancuncito-aces.jpg",
      "/projects/cancuncito/images/cancuncito-confession.jpg",
      "/projects/cancuncito/images/cancuncito-beach.jpg",
      "/projects/cancuncito/images/cancuncito-reyna.jpg",
      "/projects/cancuncito/images/cancuncito-roulette.jpg",
    ],
  },
  {
    slug: "red-moon-apostles",
    title: "RED MOON APOSTLES",
    subtitle: "APOCALYPTIC AMERICANA",
    type: "music",
    heroImage: "/images/hero-rma.jpg",
    heroVideo: "/projects/red-moon-apostles/video/hero-red-moon-apostles.mp4",
    heroPoster: "/projects/red-moon-apostles/images/poster-hero-red-moon-apostles.jpg",
    credits: "",
    description: [
      "Bow down to your algorithmic overlords and embark a harrowing journey across the dusty redsand wasteland of the future past, where time loops in ghostly incantations on magnetic tape and the whispers of a forgotten civilization drift across the barren landscape.",
      "As technology becomes indistinguishable from magic, stone faces float in the shadowy void, warm in the glow of dark reflection, hovering between human longing and mechanical inevitability. Rituals of slumber endlessly reflected across tiny screens blur the line between progress and entropy, fate and free will — a world unraveling under the weight of its own artifice.",
    ],
    cardVideo: "/projects/red-moon-apostles/video/card-red-moon-apostles.mp4",
    cardPoster: "/projects/red-moon-apostles/images/poster-card-red-moon-apostles.jpg",
    cardDescriptor: "APOCALYPTIC AMERICANA",
    galleryImages: [
      "/projects/red-moon-apostles/images/red-moon-apostles-name.jpg",
      "/projects/red-moon-apostles/images/red-moon-apostles-phones.jpg",
      "/projects/red-moon-apostles/images/red-moon-apostles-sun.jpg",
      "/projects/red-moon-apostles/images/red-moon-apostles-eye.jpg",
      "/projects/red-moon-apostles/images/red-moon-apostles-static.jpg",
      "/projects/red-moon-apostles/images/red-moon-apostles-posters.jpg",
    ],
    streamUrl: "https://open.spotify.com/artist/3IXgCsALnK7snY68rFwwe9",
    buyUrl: "https://redmoonapostles.bandcamp.com",
    videoEmbed: {
      type: "youtube",
      src: "https://www.youtube.com/embed/4hZ34bKRIZE?si=gdEzqGPmcgheT4Vi",
    },
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
    heroVideo: "/projects/snow-king/video/hero-snow-king.mp4",
    heroPoster: "/projects/snow-king/images/poster-hero-snow-king.jpg",
    credits: "",
    directorCredit: {
      prefix: "A film by ",
      name: "Greg Jonkajtys",
      href: "https://example.com/director-greg-jonkajtys",
    },
    description: [
      "Snow King is the story of a man, who, as a young boy witnesses the horrors of war, human cruelty and insufferable pain. Deported to a distant land far from home, the boy develops a dangerous friendship with an eccentric local puppet-maker, a bond he must sacrifice to save his mother. Ever since, he is cursed with an unlikely ability; to see the evil in all people. An ability that stays with him into his adult life. One that fuels both talent and malice, bringing him fame and fortune yet driving him ever further toward madness.",
    ],
    cardVideo: "/projects/snow-king/video/card-snow-king.mp4",
    cardPoster: "/projects/snow-king/images/poster-card-snow-king.jpg",
    cardDescriptor: "ORIGINAL SCORE",
    galleryImages: [
      "/projects/snow-king/images/snow-king-clock.jpg",
      "/projects/snow-king/images/snow-king-boy.jpg",
      "/projects/snow-king/images/snow-king-creature.jpg",
      "/projects/snow-king/images/snow-king-dude.jpg",
      "/projects/snow-king/images/snow-king-train.jpg",
      "/projects/snow-king/images/snow-king-wolf.jpg",
    ],
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
    heroVideo: "/projects/booming-dunes/video/hero-booming-dunes.mp4",
    heroPoster: "/projects/booming-dunes/images/poster-hero-booming-dunes.jpg",
    credits: "",
    description: [
      "Booming Dunes is the lo-fi experimental ambient project of Los Angeles based composer/producer Michael Charles Brown. Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night. A cinematic, hallucinatory journey through a soft, warm, saturated dreamworld of sound and emotion. Needles in the red.",
    ],
    cardVideo: "/projects/booming-dunes/video/card-booming-dunes.mp4",
    cardPoster: "/projects/booming-dunes/images/poster-card-booming-dunes.jpg",
    cardDescriptor: "EXPERIMENTAL ELECTRONIC",
    galleryImages: [
      "/projects/booming-dunes/images/booming-dunes-nagra.jpg",
      "/projects/booming-dunes/images/booming-dunes-teac.jpg",
      "/projects/booming-dunes/images/booming-dunes-piano.jpg",
      "/projects/booming-dunes/images/booming-dunes-tascam.jpg",
    ],
    streamUrl: "https://open.spotify.com/artist/6Gur5AyvODlXA3mvKSHcOP",
    buyUrl: "https://boomingdunes.bandcamp.com",
    videoEmbed: {
      type: "youtube",
      src: "https://www.youtube.com/embed/kydR3NaZVwg?si=LasO5DdVRv1BNK8Q",
    },
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
    heroVideo: "/projects/breathing-chamber/video/hero-breathing-chamber.mp4",
    heroPoster: "/projects/breathing-chamber/images/poster-hero-breathing-chamber.jpg",
    credits: "",
    directorCredit: {
      prefix: "A film by ",
      name: "Carlos Alejandro Marulanda",
      href: "https://example.com/director-carlos-marulanda",
    },
    description: [
      "Mysterious breathing problems begin to change a boy's life as he finds himself suffocating in his familiar surroundings.",
      "EXPERIMENTAL/NARRATIVE, 16mm Film.",
    ],
    cardVideo: "/projects/breathing-chamber/video/card-breathing-chamber.mp4",
    cardPoster: "/projects/breathing-chamber/images/poster-card-breathing-chamber.jpg",
    cardDescriptor: "ORIGINAL SCORE",
    galleryImages: [
      "/projects/breathing-chamber/images/breathing-chamber-hallway.jpg",
      "/projects/breathing-chamber/images/breathing-chamber-boy.jpg",
      "/projects/breathing-chamber/images/breathing-chamber-dad.jpg",
      "/projects/breathing-chamber/images/breathing-chamber-mom.jpg",
      "/projects/breathing-chamber/images/breathing-chamber-girl.jpg",
      "/projects/breathing-chamber/images/breathing-chamber-beach.jpg",
    ],
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
    heroVideo: "/projects/mad-denizen/video/hero-mad-denizen.mp4",
    heroPoster: "/projects/mad-denizen/images/poster-hero-mad-denizen.jpg",
    credits: "",
    quote: "“Men are so necessarily mad that not to be mad would appear mad through another trick madness played.”",
    description: [
      "Mad Denizen is an acoustic project recorded entirely on analog tape. The songs were written on acoustic guitar and captured end-to-end on a reel-to-reel tape machine, with no digital recording at any stage of the process.",
      "The entire album was self-recorded, engineered, produced, and mixed on a Tascam 388, embracing the limitations and discipline of a fully analog workflow. Final touches — additional instrumentation and subtle production details — were completed at Tiny Telephone in San Francisco.",
      "The album was released on vinyl to critical acclaim, praised for its warmth, restraint, and commitment to process — an artifact shaped as much by intention and limitation as by songcraft.",
    ],
    cardVideo: "/projects/mad-denizen/video/card-mad-denizen.mp4",
    cardPoster: "/projects/mad-denizen/images/poster-card-mad-denizen.jpg",
    cardDescriptor: "BLEEDING HEART DOOM BALLADS",
    galleryImages: [
      "/projects/mad-denizen/images/mad-denizen-statue.jpg",
      "/projects/mad-denizen/images/mad-denizen-388.jpg",
      "/projects/mad-denizen/images/mad-denizen-guitar.jpg",
      "/projects/mad-denizen/images/mad-denizen-roof.jpg",
      "/projects/mad-denizen/images/mad-denizen-tiny-telephone.jpg",
      "/projects/mad-denizen/images/mad-denizen-music.jpg",
    ],
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
