"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SpaceCanvas } from "@/components/canvas/SpaceCanvas";
import { profile } from "@/data/profile";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: reducedMotion ? 0 : 0.2 });

      tl.set(rootRef.current, { opacity: 1 })
        .from(
          lineRefs.current,
          {
            yPercent: 110,
            opacity: 0,
            duration: reducedMotion ? 0.01 : 1.1,
            ease: "power4.out",
            stagger: reducedMotion ? 0 : 0.08,
          },
          0.1
        )
        .from(
          ".hero-eyebrow",
          { opacity: 0, y: 12, duration: reducedMotion ? 0.01 : 0.6, ease: "power3.out" },
          0
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 14, duration: reducedMotion ? 0.01 : 0.7, ease: "power3.out" },
          0.6
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 14,
            duration: reducedMotion ? 0.01 : 0.6,
            ease: "power3.out",
            stagger: 0.08,
          },
          0.75
        )
        .from(
          ".hero-scroll-indicator",
          { opacity: 0, duration: reducedMotion ? 0.01 : 0.8, ease: "power2.out" },
          1.1
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden opacity-0"
    >
      {/* WebGL / fallback layer */}
      <div className="absolute inset-0 -z-10">
        <SpaceCanvas />
        {/* CSS fallback glow — visible underneath always, WebGL draws over it when active */}
        <div
          className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,232,212,0.25), rgba(124,108,240,0.12), transparent 70%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-28 md:px-12 lg:px-16">
        <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.25em] text-signal">
          {profile.location} · {profile.status === "available" ? "Open to opportunities" : "Heads down"}
        </p>

        <h1 className="mt-6 font-display text-[14vw] font-medium leading-[0.92] tracking-tight text-text-high md:text-[9vw] lg:text-[7.5vw]">
          <span className="block overflow-hidden">
            <span
              ref={(el) => {
                lineRefs.current[0] = el;
              }}
              className="block"
            >
              MISHTI
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={(el) => {
                lineRefs.current[1] = el;
              }}
              className="block text-transparent [-webkit-text-stroke:1px_var(--text-high)]"
            >
              AGARWAL
            </span>
          </span>
        </h1>

        <div className="hero-sub mt-8 flex max-w-xl flex-col gap-2 md:ml-1">
          <p className="font-body text-base text-text-mid md:text-lg">
            {profile.tagline} Frontend engineer and CS-AI student building toward{" "}
            <span className="text-text-high">GSoC 2026</span>.
          </p>
        </div>

        <div className="hero-cta mt-10 flex flex-wrap gap-3 md:ml-1">
          <a
            href="#projects"
            data-cursor-magnetic
            className="rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-void transition-transform duration-300 hover:scale-[1.03]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            data-cursor-magnetic
            className="rounded-full border border-hairline-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-text-high backdrop-blur-md transition-colors duration-300 hover:border-signal/50 hover:text-signal"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator relative z-10 flex items-center justify-between px-6 py-8 md:px-12 lg:px-16">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-low">
          <span className="size-1.5 animate-pulse rounded-full bg-signal" />
          System nominal
        </div>
        <div className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-low">
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-signal to-transparent" />
        </div>
      </div>
    </section>
  );
}
