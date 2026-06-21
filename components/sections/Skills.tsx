"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { skillMatrix } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassSpotlightCard } from "@/components/ui/GlassSpotlightCard";

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const bars = gridRef.current!.querySelectorAll<HTMLDivElement>("[data-bar-fill]");
      bars.forEach((bar) => {
        const level = bar.dataset.level ?? "0";
        gsap.to(bar, {
          width: `${level}%`,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.from("[data-skill-card]", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <SectionHeading index="02" label="Capability matrix" title="Skills & tooling" />

      <div ref={gridRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillMatrix.map((category) => (
          <GlassSpotlightCard key={category.id} data-skill-card className="p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {category.label}
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm text-text-high">{skill.name}</span>
                    <span className="mono-data text-[11px] text-text-low">{skill.level}</span>
                  </div>
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-hairline">
                    <div
                      data-bar-fill
                      data-level={skill.level}
                      className="h-full w-0 rounded-full bg-gradient-to-r from-signal to-secondary"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </GlassSpotlightCard>
        ))}
      </div>
    </section>
  );
}
