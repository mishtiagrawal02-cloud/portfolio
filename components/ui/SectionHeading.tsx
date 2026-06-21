"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
};

export function SectionHeading({ index, label, title }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-12 flex items-baseline gap-4 md:mb-16">
      <span className="mono-data text-xs text-signal">{index}</span>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-low">{label}</p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-text-high md:text-4xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
