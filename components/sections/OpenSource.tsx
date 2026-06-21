import { openSourceTargets } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassSpotlightCard } from "@/components/ui/GlassSpotlightCard";

const statusLabel: Record<string, string> = {
  researching: "Researching",
  engaging: "Engaging",
  contributing: "Contributing",
};

const statusColor: Record<string, string> = {
  researching: "text-text-low",
  engaging: "text-secondary",
  contributing: "text-signal",
};

export function OpenSource() {
  return (
    <section id="open-source" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <SectionHeading index="03" label="Open source" title="Organizations on the radar" />

      <p className="mb-10 max-w-2xl text-sm text-text-mid md:text-base">
        Honest status, not a highlight reel — this section will update as PRs land,
        not before.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {openSourceTargets.map((org) => (
          <GlassSpotlightCard key={org.id} className="p-7">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg text-text-high">{org.name}</h3>
              <span
                className={`mono-data shrink-0 text-[10px] uppercase tracking-[0.15em] ${statusColor[org.status]}`}
              >
                {statusLabel[org.status]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-mid">{org.description}</p>
            <a
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-magnetic
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-signal transition-opacity hover:opacity-70"
            >
              Visit site →
            </a>
          </GlassSpotlightCard>
        ))}
      </div>
    </section>
  );
}
