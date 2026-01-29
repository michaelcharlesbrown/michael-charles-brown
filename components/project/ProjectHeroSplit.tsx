import Image from "next/image";

interface ProjectHeroSplitProps {
  title: string;
  subtitle?: string;
  video?: { type: "youtube" | "vimeo" | "html5"; src: string };
  image?: { src: string; alt: string };
  sections: Array<{ heading: string; body: string }>;
  meta?: { eyebrow?: string };
  spotifyEmbed?: boolean | { artistId: string; height?: number; theme?: number };
  links?: Array<{ label: string; href: string }>;
  linksHeading?: string;
}

export default function ProjectHeroSplit({
  title,
  subtitle,
  video,
  image,
  sections,
  meta,
  spotifyEmbed,
  links,
  linksHeading,
}: ProjectHeroSplitProps) {
  return (
    <div className="w-full">
      {/* Desktop: 2-column grid layout */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.7fr)] lg:gap-8 xl:gap-12 items-start">
        {/* Left Column: Video or Image */}
        <div className="w-full">
          {image ? (
            <div className="w-full mb-6">
              <Image
                src={image.src}
                alt={image.alt}
                width={2400}
                height={1600}
                className="w-full h-auto max-w-full"
                priority
              />
            </div>
          ) : video ? (
            <div className="relative w-full aspect-video mb-6">
              {video.type === "html5" ? (
                <video
                  src={video.src}
                  controls
                  className="absolute inset-0 w-full h-full object-cover"
                  preload="metadata"
                />
              ) : (
                <iframe
                  title={`${title} video`}
                  src={video.src}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
          ) : null}
          {spotifyEmbed && (
            <div className="w-full">
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src={typeof spotifyEmbed === 'object' 
                  ? `https://open.spotify.com/embed/artist/${spotifyEmbed.artistId}?utm_source=generator${spotifyEmbed.theme !== undefined ? `&theme=${spotifyEmbed.theme}` : ''}`
                  : "https://open.spotify.com/embed/artist/3WJymJTqfpwT0iybktxqQh?utm_source=generator&theme=0"}
                width="100%"
                height={typeof spotifyEmbed === 'object' ? (spotifyEmbed.height || 152) : 152}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Right Column: Title, Subtitle, and Text Sections */}
        <div className="flex flex-col">
          {/* Eyebrow */}
          {meta?.eyebrow && (
            <div className="text-xs md:text-sm font-bold uppercase tracking-tight text-black mb-2">
              {meta.eyebrow}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black mb-2" style={{ lineHeight: '0.6' }}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-xl md:text-2xl font-normal uppercase tracking-tight text-black mb-6 md:mb-8" style={{ lineHeight: '0.8' }}>
              {subtitle}
            </h2>
          )}

          {/* Text Sections */}
          <div className="space-y-6 md:space-y-8">
            {sections.map((section, index) => {
              const isQuote = !section.heading && section.body.includes('"') && section.body.includes('—');
              const quoteMatch = isQuote ? section.body.match(/^"([^"]+)"\s*(—\s*.+)$/) : null;
              
              return (
                <div key={index}>
                  {section.heading && (
                    <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-black mb-4">
                      {section.heading}
                    </h3>
                  )}
                  {isQuote && quoteMatch ? (
                    <div>
                      <p className="text-sm md:text-xs leading-relaxed text-black italic mb-2">
                        "{quoteMatch[1]}"
                      </p>
                      <p className="text-sm md:text-xs leading-relaxed text-black text-right">
                        {quoteMatch[2]}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm md:text-xs leading-relaxed text-black whitespace-pre-line">
                      {section.body}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {links && links.length > 0 && (
            <div className="flex flex-col text-left mt-8 md:mt-12">
              {linksHeading && (
                <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-black mb-4">
                  {linksHeading}
                </h3>
              )}
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                  style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Stacked layout */}
      <div className="lg:hidden space-y-6 md:space-y-8">
        {/* Video or Image */}
        {image ? (
          <div className="w-full mb-6">
            <Image
              src={image.src}
              alt={image.alt}
              width={2400}
              height={1600}
              className="w-full h-auto max-w-full"
              priority
            />
          </div>
        ) : video ? (
          <div className="relative w-full aspect-video mb-6">
            {video.type === "html5" ? (
              <video
                src={video.src}
                controls
                className="absolute inset-0 w-full h-full object-cover"
                preload="metadata"
              />
            ) : (
              <iframe
                title={`${title} video`}
                src={video.src}
                width="100%"
                height="100%"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        ) : null}
        {spotifyEmbed && (
          <div className="w-full">
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/artist/3WJymJTqfpwT0iybktxqQh?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}

        {/* Title and Subtitle */}
        <div>
          {meta?.eyebrow && (
            <div className="text-xs md:text-sm font-bold uppercase tracking-tight text-black mb-2">
              {meta.eyebrow}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black mb-2" style={{ lineHeight: '0.6' }}>
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-xl md:text-2xl font-normal uppercase tracking-tight text-black mb-6" style={{ lineHeight: '0.8' }}>
              {subtitle}
            </h2>
          )}
        </div>

        {/* Text Sections */}
        <div className="space-y-6 md:space-y-8">
          {sections.map((section, index) => {
            const isQuote = !section.heading && section.body.includes('"') && section.body.includes('—');
            const quoteMatch = isQuote ? section.body.match(/^"([^"]+)"\s*(—\s*.+)$/) : null;
            
            return (
              <div key={index}>
                {section.heading && (
                  <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-black mb-4">
                    {section.heading}
                  </h3>
                )}
                {isQuote && quoteMatch ? (
                  <div>
                    <p className="text-sm md:text-xs leading-relaxed text-black italic mb-2">
                      "{quoteMatch[1]}"
                    </p>
                    <p className="text-sm md:text-xs leading-relaxed text-black text-right">
                      {quoteMatch[2]}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm md:text-xs leading-relaxed text-black">
                    {section.body}
                  </p>
                )}
              </div>
              );
            })}
        </div>
        {links && links.length > 0 && (
          <div className="flex flex-col text-left mt-8 md:mt-12">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold uppercase tracking-wide text-black hover:opacity-70 transition-opacity"
                style={{ fontSize: '30px', lineHeight: '74%', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
