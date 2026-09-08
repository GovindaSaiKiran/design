"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AudioWaveform3DProps {
  isPlaying?: boolean;
}

export default function AudioWaveform3D({ isPlaying = true }: AudioWaveform3DProps) {
  const barsGroupRef = useRef<THREE.Group>(null);
  const barCount = 28;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!barsGroupRef.current) return;

    barsGroupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      if (isPlaying) {
        // Multi-frequency wave pattern simulating live voice harmonics
        const freq1 = Math.sin(t * 4 + i * 0.35) * 0.45;
        const freq2 = Math.cos(t * 2.5 + i * 0.5) * 0.35;
        const freq3 = Math.sin(t * 7 + i * 0.8) * 0.2;
        const height = Math.max(0.12, 0.45 + (freq1 + freq2 + freq3) * 0.8);
        mesh.scale.y = height;
        mesh.position.y = height / 2;
      } else {
        mesh.scale.y = 0.12;
        mesh.position.y = 0.06;
      }
    });
  });

  return (
    <group position={[0, -0.2, 0]}>
      <group ref={barsGroupRef}>
        {Array.from({ length: barCount }).map((_, i) => {
          const xPos = (i - barCount / 2) * 0.16;
          // Gradient hue across bars from Indigo to Cyan
          const isCenter = Math.abs(i - barCount / 2) < 5;
          return (
            <mesh key={i} position={[xPos, 0.2, 0]}>
              <boxGeometry args={[0.09, 1, 0.09]} />
              <meshStandardMaterial
                color={isCenter ? "#4f46e5" : i % 2 === 0 ? "#0284c7" : "#6366f1"}
                emissive={isCenter ? "#6366f1" : "#0284c7"}
                emissiveIntensity={isPlaying ? 0.6 : 0.1}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
