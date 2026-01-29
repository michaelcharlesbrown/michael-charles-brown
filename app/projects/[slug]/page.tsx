import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import NavIcon from "@/app/components/NavIcon";
import ProjectHeroSplit from "@/components/project/ProjectHeroSplit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Helper function to get video source based on project slug
function getVideoSource(slug: string): { type: "youtube" | "vimeo" | "html5"; src: string } {
  const videoMap: Record<string, { type: "youtube" | "vimeo" | "html5"; src: string }> = {
    "cancuncito": {
      type: "html5",
      src: "/video/cancuncito.mp4",
    },
    "snow-king": {
      type: "vimeo",
      src: "https://player.vimeo.com/video/42444069?h=0c4c57b95b",
    },
    "breathing-chamber": {
      type: "vimeo",
      src: "https://player.vimeo.com/video/59210170",
    },
    "mad-denizen": {
      type: "youtube",
      src: "https://www.youtube.com/embed/9De1ylIPqWE?si=xAu3nMIx93S6kBPc",
    },
    "booming-dunes": {
      type: "youtube",
      src: "https://www.youtube.com/embed/kydR3NaZVwg?si=LasO5DdVRv1BNK8Q",
    },
    "red-moon-apostles": {
      type: "youtube",
      src: "https://www.youtube.com/embed/4hZ34bKRIZE?si=gdEzqGPmcgheT4Vi",
    },
  };

  return videoMap[slug] || { type: "html5", src: "/video/cancuncito.mp4" };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const videoSource = getVideoSource(project.slug);

  // Custom content for cancuncito
  if (project.slug === "cancuncito") {
    return (
      <div className="min-h-screen bg-white">
        <NavIcon />
        <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px] pb-[180px]">
          <div className="mx-auto w-full">
            <ProjectHeroSplit
              title={project.title}
              subtitle="ORIGINAL SCORE"
              image={{ src: "/images/hero-cancuncito.jpg", alt: project.title }}
              sections={[
                {
                  heading: "",
                  body: "Written and directed by Carlos Alejandro Marulanda",
                },
              ]}
            />
          </div>
        </main>
      </div>
    );
  }

  // Custom content for snow-king
  if (project.slug === "snow-king") {
    return (
      <div className="min-h-screen bg-white">
        <NavIcon />
        <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px] pb-[180px]">
          <div className="mx-auto w-full">
            <ProjectHeroSplit
              title={project.title}
              subtitle="ORIGINAL SCORE"
              video={videoSource}
              sections={[
                {
                  heading: "",
                  body: "Written and directed by Greg Jonkajtys",
                },
                {
                  heading: "",
                  body: "Snow King is the story of a man, who, as a young boy witnesses the horrors of war, human cruelty and insufferable pain. Deported to a distant land far from home, the boy develops a dangerous friendship with an eccentric local puppet-maker, a bond he must sacrifice to save his mother. Ever since, he is cursed with an unlikely ability; to see the evil in all people. An ability that stays with him into his adult life. One that fuels both talent and malice, bringing him fame and fortune yet driving him ever further toward madness",
                },
              ]}
            />
          </div>
        </main>
      </div>
    );
  }

  // Custom content for breathing-chamber
  if (project.slug === "breathing-chamber") {
    return (
      <div className="min-h-screen bg-white">
        <NavIcon />
        <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px] pb-[180px]">
          <div className="mx-auto w-full">
            <ProjectHeroSplit
              title={project.title}
              subtitle="ORIGINAL SCORE"
              video={videoSource}
              sections={[
                {
                  heading: "",
                  body: "Written and directed by Carlos Alejandro Marulanda",
                },
                {
                  heading: "",
                  body: "Mysterious breathing problems begin to change a boy's life as he finds himself suffocating in his familiar surroundings.",
                },
                {
                  heading: "",
                  body: "EXPERIMENTAL/NARRATIVE, 16mm Film.",
                },
                {
                  heading: "OFFICIAL SELECTION:",
                  body: "Sitges International Film Festival\nAnn Arbor Film Festival\nS.F. Indiefest\nSan Francisco Latino Film Festival\n(Winner: best Short Film)\nSan Francisco Videofest\nCSU Media Arts Festival\n(Winner: Best Cinematography)",
                },
              ]}
            />
          </div>
        </main>
      </div>
    );
  }

  // Custom content for booming-dunes
  if (project.slug === "booming-dunes") {
    return (
      <div className="min-h-screen bg-white">
        <NavIcon />
        <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px] pb-[180px]">
          <div className="mx-auto w-full">
            <ProjectHeroSplit
              title={project.title}
              video={videoSource}
              sections={[
                {
                  heading: "",
                  body: "Booming Dunes is the lo-fi experimental ambient project of Los Angeles based composer/ producer Michael Charles Brown. Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night. A cinematic, hallucinatory journey through a soft, warm, saturated dreamworld of sound and emotion. Needles in the red.",
                },
              ]}
              spotifyEmbed={{ artistId: "6Gur5AyvODlXA3mvKSHcOP", height: 352 }}
              links={[
                { label: "INSTAGRAM", href: "https://instagram.com/boomingdunes" },
                { label: "BANDCAMP", href: "https://boomingdunes.bandcamp.com" },
                { label: "YOUTUBE", href: "https://www.youtube.com/@boomingdunes" },
              ]}
              linksHeading="STREAM"
            />
          </div>
        </main>
      </div>
    );
  }

  // Custom content for red-moon-apostles
  if (project.slug === "red-moon-apostles") {
    return (
      <div className="min-h-screen bg-white">
        <NavIcon />
        <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px] pb-[180px]">
          <div className="mx-auto w-full">
            <ProjectHeroSplit
              title={project.title}
              subtitle="APOCALYPTIC AMERICANA"
              video={videoSource}
              sections={[
                {
                  heading: "",
                  body: "Bow down to your algorithmic overlords and embark a harrowing journey across the dusty redsand wasteland of the future past, where time loops in ghostly incantations on magnetic tape and the whispers of a forgotten civilization drift across the barren landscape.",
                },
                {
                  heading: "",
                  body: "As technology becomes indistinguishable from magic, stone faces float in the shadowy void, warm in the glow of dark reflection, hovering between human longing and mechanical inevitability. Rituals of slumber endlessly reflected across tiny screens blur the line between progress and entropy, fate and free will-a world unraveling under the weight of its own artifice.",
                },
              ]}
              meta={{
                eyebrow: "RED MOON APOSTLES",
              }}
              spotifyEmbed={{ artistId: "3IXgCsALnK7snY68rFwwe9", height: 152, theme: 0 }}
              links={[
                { label: "INSTAGRAM", href: "https://instagram.com/redmoonapostles" },
                { label: "BANDCAMP", href: "https://redmoonapostles.bandcamp.com" },
                { label: "YOUTUBE", href: "https://www.youtube.com/@redmoonapostles" },
              ]}
              linksHeading="STREAM"
            />
          </div>
        </main>
      </div>
    );
  }

  // Custom content for mad-denizen
  if (project.slug === "mad-denizen") {
    return (
      <div className="min-h-screen bg-white">
        <NavIcon />
        <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px] pb-[180px]">
          <div className="mx-auto w-full">
            <ProjectHeroSplit
              title={project.title}
              subtitle="BLEEDING HEART DOOM BALLADS"
              video={videoSource}
              sections={[
                {
                  heading: "",
                  body: '"Men are so necessarily mad that not to be mad would appear mad through another trick madness played." — Blaise Pascal',
                },
                {
                  heading: "",
                  body: '"Discovering the debut LP from Mad Denizen, Starved, is like putting on Springsteen\'s Nebraska for the first time." — Benjamin Ricci, Performer Magazine',
                },
                {
                  heading: "",
                  body: "Mad Denizen is an acoustic project recorded entirely on analog tape. The songs were written on acoustic guitar and captured end-to-end on a reel-to-reel tape machine, with no digital recording at any stage of the process.",
                },
                {
                  heading: "",
                  body: "The entire album was self-recorded, engineered, produced, and mixed on a Tascam 388, embracing the limitations and discipline of a fully analog workflow. Final touches—additional instrumentation and subtle production details—were completed at Tiny Telephone in San Francisco, including cello and vocal treatments that expanded the intimate core of the recordings without compromising their rawness.",
                },
                {
                  heading: "",
                  body: "The album was released on vinyl to critical acclaim, praised for its warmth, restraint, and commitment to process—an artifact shaped as much by intention and limitation as by songcraft.",
                },
              ]}
              spotifyEmbed={true}
              links={[
                { label: "INSTAGRAM", href: "https://instagram.com/maddenizen" },
                { label: "BANDCAMP", href: "https://maddenizen.bandcamp.com" },
                { label: "YOUTUBE", href: "https://www.youtube.com/@maddenizen" },
              ]}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavIcon />
      <main className="mx-auto w-full max-w-[2400px] px-5 pt-[100px] pb-[180px]">
        <div className="mx-auto w-full">
          <ProjectHeroSplit
            title={project.title}
            subtitle="BENEATH THE BURNING SANDS"
            video={videoSource}
            sections={[
              {
                heading: "INFO ABOUT THE PROJECT",
                body: "A true multidisciplinary artist, Michael co-founded a Mission District art collective, designing soundscapes for avant-garde installations and electrifying event spaces with immersive audio-visual performances. Alongside these creative ventures.",
              },
              {
                heading: "MY PROCESS/ARRANGEMENT/INSTRUMENTATION",
                body: "A true multidisciplinary artist, Michael co-founded a Mission District art collective, designing soundscapes for avant-garde installations and electrifying event spaces with immersive audio-visual performances. Alongside these creative ventures.",
              },
            ]}
            meta={{
              eyebrow: project.slug === "red-moon-apostles" ? "RED MOON APOSTLES" : undefined,
            }}
          />
        </div>
      </main>
    </div>
  );
}
