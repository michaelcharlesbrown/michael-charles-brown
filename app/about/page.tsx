import NavIcon from "@/app/components/NavIcon";
import AboutHeroSection from "@/app/components/AboutHeroSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavIcon />
      <main className="mx-auto w-full max-w-[2400px] px-5 py-20 pb-[40vh] md:pb-[50vh]">
        <div className="mx-auto w-full">
          {/* Top Section: Name and Role - Hero */}
          <div className="relative min-h-[70vh] md:min-h-[65vh] mb-16">
            {/* Mobile: H1 top-left, H2 bottom-right */}
            <h1 className="md:hidden text-4xl font-bold uppercase tracking-tight text-black" style={{ lineHeight: '0.6' }}>
              <span className="block">MICHAEL</span>
              <span className="block mt-2">CHARLES</span>
              <span className="block mt-2">BROWN</span>
            </h1>
            
            <div className="md:hidden absolute bottom-0 right-0 text-right">
              <h2 className="text-xl font-normal uppercase tracking-tight text-black" style={{ lineHeight: '0.8' }}>
                <span className="block">COMPOSER///</span>
                <span className="block mt-1">RECORDING</span>
                <span className="block mt-1">ARTIST</span>
              </h2>
            </div>

            {/* Desktop: H1 top-left, H2 bottom-right */}
            <h1 className="hidden md:block text-8xl font-bold uppercase tracking-tight text-black" style={{ lineHeight: '0.6' }}>
              <span className="block">MICHAEL</span>
              <span className="block mt-4">CHARLES</span>
              <span className="block mt-4">BROWN</span>
            </h1>
            
            <div className="hidden md:block absolute bottom-0 right-0 text-right">
              <h2 className="text-3xl font-normal uppercase tracking-tight text-black" style={{ lineHeight: '0.8' }}>
                <span className="block">COMPOSER///</span>
                <span className="block mt-1">RECORDING</span>
                <span className="block mt-1">ARTIST</span>
              </h2>
            </div>
          </div>

          {/* Mid-Section: Photo with Overlapping Headline and Body Copy (parallax) */}
          <AboutHeroSection />

          {/* Links Section - Bottom of page, left aligned */}
          <section className="pt-16 pb-8">
            <div className="flex flex-col text-left">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                INSTAGRAM
              </a>
              <a
                href="https://imdb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                IMDB
              </a>
              <a
                href="https://bandcamp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                BANDCAMP
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                SPOTIFY
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                YOUTUBE
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
