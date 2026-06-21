import { profile } from "@/data/profile";
import { GlassSpotlightCard } from "@/components/ui/GlassSpotlightCard";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <GlassSpotlightCard className="p-10 md:p-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">06 · Contact</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-text-high md:text-5xl">
          Open to internships, GSoC mentorship, and collaboration.
        </h2>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            data-cursor-magnetic
            className="rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-void transition-transform duration-300 hover:scale-[1.03]"
          >
            {profile.email}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.15em] text-text-mid">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-magnetic
            className="hover:text-signal"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-magnetic
            className="hover:text-signal"
          >
            LinkedIn
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-magnetic
            className="hover:text-signal"
          >
            Resume
          </a>
        </div>
      </GlassSpotlightCard>

      <footer className="mt-12 flex flex-col items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-low md:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js, GSAP, and React Three Fiber</span>
      </footer>
    </section>
  );
}
