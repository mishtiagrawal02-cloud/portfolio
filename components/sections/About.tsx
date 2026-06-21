import { about } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassSpotlightCard } from "@/components/ui/GlassSpotlightCard";

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <SectionHeading index="01" label="About" title="Currently building" />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <GlassSpotlightCard className="p-8 md:p-10">
          <p className="font-display text-xl leading-relaxed text-text-high md:text-2xl">
            {about.intro}
          </p>
        </GlassSpotlightCard>

        <GlassSpotlightCard className="p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-low">
            Working toward
          </p>
          <ul className="mt-5 flex flex-col gap-4">
            {about.goals.map((goal, i) => (
              <li key={goal} className="flex gap-3 text-sm text-text-mid md:text-base">
                <span className="mono-data mt-0.5 shrink-0 text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </GlassSpotlightCard>
      </div>
    </section>
  );
}
