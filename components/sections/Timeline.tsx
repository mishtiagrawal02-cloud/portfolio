"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { timeline } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

const typeLabel: Record<string, string> = {
  education: "Education",
  "open-source": "Open Source",
  hackathon: "Hackathon",
  internship: "Internship",
  certification: "Certification",
};

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-timeline-item]", {
        opacity: 0,
        x: -16,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      gsap.from("[data-timeline-line]", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="relative px-6 py-24 md:px-12 md:py-32 lg:px-16">
      <SectionHeading index="05" label="Trajectory" title="Timeline" />

      <div ref={ref} className="relative max-w-2xl">
        <div
          data-timeline-line
          className="absolute left-[5px] top-2 h-full w-px bg-gradient-to-b from-signal via-hairline-strong to-transparent"
        />
        <ul className="flex flex-col gap-10">
          {timeline.map((entry) => (
            <li key={entry.id} data-timeline-item className="relative pl-8">
              <span className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-signal bg-void" />
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-low">
                {entry.date} · {typeLabel[entry.type]}
              </p>
              <h3 className="mt-1.5 font-display text-lg text-text-high">{entry.title}</h3>
              <p className="text-sm text-text-mid">{entry.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-mid">{entry.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
