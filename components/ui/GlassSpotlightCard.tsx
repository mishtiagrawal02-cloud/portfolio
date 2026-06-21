"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type GlassSpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
} & { [key: `data-${string}`]: string | boolean | undefined };

/**
 * Glass panel with a radial spotlight that follows the cursor.
 * Position is written directly to CSS custom properties on the element —
 * no setState, so no re-render on every pointer move.
 */
export function GlassSpotlightCard({
  children,
  className,
  as = "div",
  ...rest
}: GlassSpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const Comp = as;

  return (
    <Comp
      ref={ref as never}
      onPointerMove={handlePointerMove}
      {...rest}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-hairline bg-panel/45 backdrop-blur-xl",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]",
        className
      )}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.08), transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </Comp>
  );
}
