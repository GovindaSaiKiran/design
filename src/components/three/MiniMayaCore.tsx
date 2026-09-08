"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pre-render static mini face texture ONCE
function createMiniFaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 256, 256);
  ctx.fillStyle = "#040714";
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 12;
  ctx.font = "900 24px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("M A Y A", 128, 145);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export default function MiniMayaCore({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const faceTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createMiniFaceTexture();
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Porcelain White Sphere */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.12} metalness={0.08} />
      </mesh>

      {/* Screen Visor with Pre-rendered Face */}
      {faceTexture && (
        <mesh position={[0, 0, 0.46]}>
          <circleGeometry args={[0.38, 24]} />
          <meshStandardMaterial
            map={faceTexture}
            emissiveMap={faceTexture}
            emissive="#ffffff"
            emissiveIntensity={1.2}
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.98}
          />
        </mesh>
      )}

      {/* Smiling Eyes */}
      <group position={[-0.10, 0.08, 0.48]} rotation={[Math.PI * 0.38, 0, Math.PI]}>
        <mesh>
          <torusGeometry args={[0.05, 0.012, 12, 24, Math.PI * 0.75]} />
          <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={3} />
        </mesh>
      </group>
      <group position={[0.10, 0.08, 0.48]} rotation={[Math.PI * 0.38, 0, Math.PI]}>
        <mesh>
          <torusGeometry args={[0.05, 0.012, 12, 24, Math.PI * 0.75]} />
          <meshStandardMaterial color="#ffffff" emissive="#00f0ff" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* Left Pod */}
      <group position={[-0.56, 0.03, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.2, 0.12, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.14, 0.02, 12, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Right Pod */}
      <group position={[0.56, 0.03, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.2, 0.12, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.14, 0.02, 12, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}
