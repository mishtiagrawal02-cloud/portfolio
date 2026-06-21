"use client";

import { useEffect, useRef, useState } from "react";

const SECTION_IDS = ["hero", "about", "skills", "open-source", "projects", "timeline", "contact"];

/**
 * The site's signature element. A persistent corner-anchored telemetry
 * readout — cursor coordinates, scroll depth, active section, viewport
 * size, local time — that frames the whole page as something being
 * piloted rather than scrolled. Updates via gsap.quickTo / direct DOM
 * writes, not React state, to avoid re-rendering on every pixel of
 * mouse movement or scroll.
 */
export function TelemetryHud() {
  const coordRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);
  const viewportRef = useRef<HTMLSpanElement>(null);
  const [section, setSection] = useState("hero");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateViewport = () => {
      if (viewportRef.current) {
        viewportRef.current.textContent = `${window.innerWidth}×${window.innerHeight}`;
      }
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);

    const onMove = (e: MouseEvent) => {
      if (coordRef.current) {
        coordRef.current.textContent = `${String(e.clientX).padStart(4, "0")}, ${String(
          e.clientY
        ).padStart(4, "0")}`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onScroll = () => {
      if (scrollRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        scrollRef.current.textContent = `${pct.toFixed(1)}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
    >
      {/* Top left — section identity */}
      <div className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-[0.15em] text-text-low">
        <span className="text-signal">●</span>{" "}
        <span className="text-text-mid">SECTION</span>{" "}
        <span className="mono-data text-text-high">{section.replace("-", "_").toUpperCase()}</span>
      </div>

      {/* Top right — local time */}
      <div className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-[0.15em] text-text-low">
        <span className="text-text-mid">LOCAL</span>{" "}
        <span className="mono-data text-text-high">{time}</span>
      </div>

      {/* Bottom left — cursor coordinates */}
      <div className="absolute bottom-6 left-6 font-mono text-[11px] uppercase tracking-[0.15em] text-text-low">
        <span className="text-text-mid">CURSOR</span>{" "}
        <span ref={coordRef} className="mono-data text-text-high">
          0000, 0000
        </span>
      </div>

      {/* Bottom right — scroll depth + viewport */}
      <div className="absolute bottom-6 right-6 text-right font-mono text-[11px] uppercase tracking-[0.15em] text-text-low">
        <div>
          <span className="text-text-mid">VIEWPORT</span>{" "}
          <span ref={viewportRef} className="mono-data text-text-high">
            —
          </span>
        </div>
        <div>
          <span className="text-text-mid">DEPTH</span>{" "}
          <span ref={scrollRef} className="mono-data text-text-high">
            0.0%
          </span>
        </div>
      </div>
    </div>
  );
}
