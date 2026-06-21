"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Drives Lenis smooth scroll and keeps GSAP's ScrollTrigger in sync with it.
 * Respects prefers-reduced-motion by disabling smoothing (native scroll instead).
 *
 * The Lenis instance lives entirely in a ref — it's an imperative handle
 * to an external library, created and torn down inside the effect that
 * owns its lifecycle, and never read during render. Nothing in this app
 * currently needs to consume the instance outside this provider; if that
 * changes, expose it via a ref passed down rather than re-introducing a
 * state-synced context value.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = instance;

    // Update ScrollTrigger on Lenis scroll events. Avoid calling gsap.ticker.tick here
    // because that creates a cycle: gsap.ticker -> lenis.raf -> lenis scroll -> gsap.ticker.tick
    // which leads to a stack overflow. Use ScrollTrigger.update instead.
    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const tickerCallback = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
