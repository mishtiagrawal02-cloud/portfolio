"use client";

import { useState } from "react";

export type DeviceTier = "full" | "reduced" | "minimal";

function computeTier(): DeviceTier {
  if (typeof window === "undefined") return "full";

  const isTouch =
    window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0;
  const isNarrow = window.innerWidth < 768;
  const isMidWidth = window.innerWidth < 1100;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || (isTouch && isNarrow)) return "minimal";
  if (isTouch || isMidWidth) return "reduced";
  return "full";
}

/**
 * Coarse device-capability check used to decide how much WebGL/blur work
 * to do. Checks viewport width, touch capability, and reduced-motion pref.
 * Computed once via a lazy useState initializer — this is a one-time tier
 * decision, not a live resize listener, since re-tiering mid-session would
 * restart the 3D scene. On the server this resolves to "full" and is
 * corrected on the client during hydration's first client render.
 */
export function useDeviceTier(): DeviceTier {
  const [tier] = useState<DeviceTier>(computeTier);
  return tier;
}
