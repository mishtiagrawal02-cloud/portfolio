"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Dual-layer custom cursor: a tight core dot and a trailing ring.
 * Mouse position is driven entirely through gsap.quickTo — never React state —
 * so re-renders never happen on mousemove.
 * Disabled entirely on touch/no-hover devices.
 */
export function CustomCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const supportsHover = useRef(true);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0;
    supportsHover.current = !isTouch;
    if (isTouch || !coreRef.current || !ringRef.current) return;

    document.documentElement.classList.add("custom-cursor-active");

    const core = coreRef.current;
    const ring = ringRef.current;

    const coreX = gsap.quickTo(core, "x", { duration: 0.1, ease: "power3.out" });
    const coreY = gsap.quickTo(core, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });
    const ringScale = gsap.quickTo(ring, "scale", { duration: 0.3, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      coreX(e.clientX);
      coreY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-magnetic]")) {
        ringScale(1.8);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-magnetic]")) {
        ringScale(1);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div
        ref={coreRef}
        className="cursor-core pointer-events-none fixed left-0 top-0 z-9999 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-9998 hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/60 mix-blend-difference"
      />
    </div>
  );
}
