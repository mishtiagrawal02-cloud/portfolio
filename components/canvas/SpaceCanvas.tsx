"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Core } from "./Core";
import { Starfield } from "./Starfield";
import { useDeviceTier } from "@/hooks/useDeviceTier";

/**
 * SpaceCanvas: the WebGL centerpiece. On "minimal" tier devices (small
 * touch screens, or prefers-reduced-motion) this renders nothing and the
 * page falls back to the CSS gradient defined in the hero markup instead —
 * see CssFallbackGlow below, rendered by the parent when tier === minimal.
 */
export function SpaceCanvas() {
  const tier = useDeviceTier();

  if (tier === "minimal") return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={tier === "full" ? [1, 1.8] : [1, 1]}
      gl={{ antialias: tier === "full", alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.15} />
      <Suspense fallback={null}>
        <Core />
        {tier === "full" && <Starfield />}
      </Suspense>
    </Canvas>
  );
}
