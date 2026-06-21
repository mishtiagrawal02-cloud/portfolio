"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The centerpiece geometry: a nested icosahedron core inside two
 * independently-rotating wireframe rings. Built from standard Three.js
 * materials (no custom GLSL) — deliberately, so it's both lightweight
 * and something you can fully explain line-by-line if asked about it.
 */
export function Core() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.1;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * -0.08;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00e8d4"
          emissive="#00e8d4"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh ref={ring1Ref} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.7, 0.008, 16, 100]} />
        <meshBasicMaterial color="#7c6cf0" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.1, 0.006, 16, 100]} />
        <meshBasicMaterial color="#00e8d4" transparent opacity={0.3} />
      </mesh>

      <pointLight color="#00e8d4" intensity={8} distance={6} />
      <pointLight color="#7c6cf0" intensity={4} distance={8} position={[2, 1, 2]} />
    </group>
  );
}
