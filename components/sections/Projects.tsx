import { projects } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassSpotlightCard } from "@/components/ui/GlassSpotlightCard";

const sizeClasses: Record<string, string> = {
  large: "md:col-span-2 md:row-span-2",
  medium: "md:col-span-2 md:row-span-1",
  small: "md:col-span-1 md:row-span-1",
};

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <SectionHeading index="04" label="Selected work" title="Projects" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:[grid-auto-rows:14rem]">
        {projects.map((project) => (
          <GlassSpotlightCard
            key={project.id}
            className={`flex flex-col justify-between p-7 ${sizeClasses[project.size]}`}
          >
            <div>
              <h3 className="font-display text-xl text-text-high">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-mid">
                {project.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="mono-data rounded-full border border-hairline px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-text-low"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-magnetic
                    className="font-mono text-xs uppercase tracking-[0.1em] text-signal hover:opacity-70"
                  >
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-magnetic
                    className="font-mono text-xs uppercase tracking-[0.1em] text-text-mid hover:text-text-high"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          </GlassSpotlightCard>
        ))}
      </div>
    </section>
  );
}
