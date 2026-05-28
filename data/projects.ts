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
  heroVideo: string;
  heroPoster: string;
  ogDescription: string;
  ogImage?: string;
  /** When set, replaces plain credits with prefix + linked director name */
  directorCredit?: DirectorCredit;
  /** When true with directorCredit, render that line atop the right column instead of under the title on the left */
  creditInRightColumn?: boolean;
  description: string[];
  cardVideo: string;
  cardPoster: string;
  cardDescriptor: string;
  galleryImages: string[];
  quote?: string;
  albumTitle?: string;
  streamUrl?: string;
  buyUrl?: string;
  /** Optional buy CTA label; defaults to BUY in ProjectPageClient */
  buyLabel?: string;
  videoEmbed?: ProjectEmbed;
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: "cancuncito",
    title: "CANCUNCITO",
    subtitle: "ORIGINAL SCORE",
    type: "film",
    heroVideo: "/projects/cancuncito/video/hero-cancuncito.mp4",
    heroPoster: "/projects/cancuncito/images/poster-hero-cancuncito.jpg",
    ogDescription: "Original score by Michael Charles Brown for Cancuncito, a feature film by Carlos Alejandro Marulanda. Composed from custom instruments built on recordings of cello, piano, and voice.",
    directorCredit: {
      prefix: "A film by ",
      name: "Carlos Alejandro Marulanda",
      href: "https://www.sonambulofilms.com/",
    },
    creditInRightColumn: true,
    description: [
      "Cancuncito is a feature film by writer director Carlos Alejandro Marulanda. The score is comprised of custom instruments sampling studio recordings of cello, piano and voice.",
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
    heroVideo: "/projects/red-moon-apostles/video/hero-red-moon-apostles.mp4",
    heroPoster: "/projects/red-moon-apostles/images/poster-hero-red-moon-apostles.jpg",
    ogDescription: "Red Moon Apostles is the apocalyptic Americana project from Michael Charles Brown — a hallucinatory journey through dusty wastelands, magnetic tape loops, and the blur between human longing and mechanical inevitability.",
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
      "/projects/red-moon-apostles/images/red-moon-apostles-static.jpg",
      "/projects/red-moon-apostles/images/red-moon-apostles-eye.jpg",
      "/projects/red-moon-apostles/images/red-moon-apostles-sun.jpg",
      "/projects/red-moon-apostles/images/red-moon-apostles-posters.jpg",
    ],
    albumTitle: "Beneath the Burning Sands",
    streamUrl: "https://open.spotify.com/artist/3IXgCsALnK7snY68rFwwe9",
    buyUrl: "https://redmoonapostles.bandcamp.com/album/beneath-the-burning-sands",
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
    heroVideo: "/projects/snow-king/video/hero-snow-king.mp4",
    heroPoster: "/projects/snow-king/images/poster-hero-snow-king.jpg",
    ogDescription: "Original score by Michael Charles Brown for Snow King, an animated short film by Greg Jonkajtys. A dark, haunting story of war, exile, puppetry, and madness.",
    directorCredit: {
      prefix: "A film by ",
      name: "Greg Jonkajtys",
      href: "https://grz.squarespace.com/",
    },
    creditInRightColumn: true,
    description: [
      "Snow King is the story of a man, who, as a young boy witnesses the horrors of war and human cruelty. Deported to a distant land far from home, the boy develops a dangerous friendship with an eccentric local puppet-maker, a bond he must sacrifice to save his mother. Ever since, he is cursed with an unlikely ability; to see the evil in all people. An ability that stays with him into his adult life. One that fuels both talent and malice, bringing him fame and fortune yet driving him ever further toward madness.",
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
    heroVideo: "/projects/booming-dunes/video/hero-booming-dunes.mp4",
    heroPoster: "/projects/booming-dunes/images/poster-hero-booming-dunes.jpg",
    ogDescription: "Booming Dunes is the experimental electronic project from Michael Charles Brown — cinematic soundscapes built from analog synthesizers, handmade tape loops, and whirring reel-to-reel machines.",
    description: [
      "Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night. A cinematic, hallucinatory journey through a soft, warm, saturated dreamworld of sound and emotion.",
      "Needles in the red.",
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
    heroVideo: "/projects/breathing-chamber/video/hero-breathing-chamber.mp4",
    heroPoster: "/projects/breathing-chamber/images/poster-hero-breathing-chamber.jpg",
    ogDescription: "Original score by Michael Charles Brown for Breathing Chamber, a short film by Carlos Alejandro Marulanda. Shot on 16mm. An intimate, suffocating portrait of a boy losing himself to fear.",
    directorCredit: {
      prefix: "A film by ",
      name: "Carlos Alejandro Marulanda",
      href: "https://www.sonambulofilms.com/",
    },
    creditInRightColumn: true,
    description: [
      "Mysterious breathing problems begin to change a boy's life as he finds himself suffocating in his familiar surroundings.",
      "Shot on 16mm film.",
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
  },
  {
    slug: "mad-denizen",
    title: "MAD DENIZEN",
    subtitle: "BLEEDING HEART DOOM BALLADS",
    type: "music",
    heroVideo: "/projects/mad-denizen/video/hero-mad-denizen.mp4",
    heroPoster: "/projects/mad-denizen/images/poster-hero-mad-denizen.jpg",
    ogDescription: "Mad Denizen is the solo acoustic project from Michael Charles Brown. Debut LP Starved — recorded to vintage reel-to-reel tape — was named Vinyl of the Month by Performer Magazine.",
    quote: "“Men are so necessarily mad that not to be mad would appear mad, through another trick madness played.”",
    description: [
      "Discovering the debut LP from Mad Denizen, Starved, is kinda like putting on Springsteen's Nebraska for the first time. It's one of those records that encourages late-night listening, preferably with cigarettes smoldering in the ashtray, whiskey close at hand.",
      "Starved is primarily the work of Michael Charles, an after-hours LP that, intentional or not, is haunting as all get out (but in a good way). Armed mostly with an acoustic guitar and his voice, Charles tracked the record to tape using a TASCAM 388 reel-to-reel machine. The audio quality of the vinyl is striking in its immediacy and clarity, likely due to the tape medium, attention to detail in the recording process and top-notch mastering/cutting job. Starved is a winner for both the listener and even the most discerning audiophile.",
      "The lead single “Invisible City” is like a modern update of Nirvana's “Polly” (complete with tasteful cello).",
      "The tunes are moody and a great Smiths alternative for when you're feeling mad at the world and just want a comforting record to turn to. Couple that with the high-quality audio experience and killer album art, and this album definitely deserves a spot on your ever-expanding LP shelf. — Benjamin Ricci, Performer Magazine",
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
    albumTitle: "Starved",
    streamUrl:
      "https://open.spotify.com/artist/3WJymJTqfpwT0iybktxqQh?si=sV8RF9QtTIGpYBcj1wOTSw",
    buyUrl: "https://maddenizen.bandcamp.com/album/starved",
    videoEmbed: {
      type: "youtube",
      src: "https://www.youtube.com/embed/9De1ylIPqWE?si=xAu3nMIx93S6kBPc",
    },
    links: [
      { label: "INSTAGRAM", href: "https://instagram.com/maddenizen" },
      { label: "BANDCAMP", href: "https://maddenizen.bandcamp.com" },
      {
        label: "SPOTIFY",
        href: "https://open.spotify.com/artist/3WJymJTqfpwT0iybktxqQh?si=sV8RF9QtTIGpYBcj1wOTSw",
      },
      { label: "YOUTUBE", href: "https://www.youtube.com/@maddenizen" },
      { label: "SOUNDCLOUD", href: "https://soundcloud.com/maddenizen" },
      { label: "FACEBOOK", href: "https://www.facebook.com/maddenizen/" },
    ],
  },
];
