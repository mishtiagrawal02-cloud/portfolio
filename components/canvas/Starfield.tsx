"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 2600;

function generateField(): [Float32Array, Float32Array] {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 8 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi) - 6;
    sizes[i] = Math.random() * 1.6 + 0.3;
  }
  return [positions, sizes];
}

/**
 * Single Points mesh starfield. Deliberately not 2600 separate objects —
 * one buffer geometry, one draw call. Mouse parallax shifts the whole
 * field slightly opposite the cursor for depth.
 *
 * Particle positions are generated once via a lazy useState initializer —
 * the sanctioned pattern for expensive one-time setup data that render
 * actually needs — rather than a ref read, since reading ref.current
 * during render is itself flagged under React's render-purity rules.
 */
export function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [[positions, sizes]] = useState(generateField);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0006;
    pointsRef.current.rotation.x += 0.0001;

    // Gentle parallax toward pointer, eased
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.02;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.02;
    pointsRef.current.position.x = mouse.current.x * 0.4;
    pointsRef.current.position.y = mouse.current.y * 0.25;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        color="#e8e9ed"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}
