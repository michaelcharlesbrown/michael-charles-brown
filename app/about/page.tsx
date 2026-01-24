import NavIcon from "@/app/components/NavIcon";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavIcon />
      <main className="mx-auto w-full max-w-[2400px] px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-5xl font-bold text-black">About</h1>
          
          <div className="space-y-6 text-lg leading-relaxed text-zinc-700">
            <p>
              Bio text goes here. This is a placeholder for the about page content.
            </p>
            <p>
              Additional bio information can be added here.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <a
              href="mailto:hello@example.com"
              className="text-zinc-600 underline transition-colors hover:text-black"
            >
              Email
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 underline transition-colors hover:text-black"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 underline transition-colors hover:text-black"
            >
              Instagram
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
