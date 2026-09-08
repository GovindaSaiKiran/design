"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface KnowledgeCore3DProps {
  activeDocIndex?: number;
}

export default function KnowledgeCore3D({
  activeDocIndex = 0,
}: KnowledgeCore3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  const docNodes = useMemo(() => [
    { label: "Fee Structure", color: "#4f46e5", position: [-1.8, 1.1, 0.4] as [number, number, number] },
    { label: "Syllabus & Eligibility", color: "#0284c7", position: [1.9, 0.9, -0.3] as [number, number, number] },
    { label: "Scholarships 2026", color: "#059669", position: [-1.5, -1.2, 0.2] as [number, number, number] },
    { label: "Hostel & Campus", color: "#d97706", position: [1.7, -1.1, 0.5] as [number, number, number] },
    { label: "Admissions FAQ", color: "#8b5cf6", position: [0.0, 1.8, -0.4] as [number, number, number] },
  ], []);

  // Pre-generate connection line objects
  const streamLines = useMemo(() => {
    return docNodes.map((doc, idx) => {
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...doc.position)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: idx === activeDocIndex ? "#6366f1" : "#94a3b8",
        transparent: true,
        opacity: idx === activeDocIndex ? 0.85 : 0.25,
      });
      return new THREE.Line(geometry, material);
    });
  }, [docNodes, activeDocIndex]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.x = t * 0.2;
      coreRef.current.rotation.z = t * 0.15;
    }

    // Gentle floating of orbital nodes
    if (nodesGroupRef.current) {
      nodesGroupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(t * 1.5 + i) * 0.002;
        if (i === activeDocIndex) {
          const mesh = child as THREE.Mesh;
          mesh.scale.setScalar(1.25 + Math.sin(t * 3) * 0.08);
        } else {
          const mesh = child as THREE.Mesh;
          mesh.scale.setScalar(1.0);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Knowledge Core Icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#6366f1"
          emissiveIntensity={0.6}
          wireframe={false}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe outer lattice */}
      <mesh>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Orbiting Knowledge Document Nodes */}
      <group ref={nodesGroupRef}>
        {docNodes.map((doc, idx) => (
          <group key={idx} position={doc.position}>
            {/* Document Node Octahedron */}
            <mesh>
              <octahedronGeometry args={[0.22, 0]} />
              <meshStandardMaterial
                color={doc.color}
                emissive={idx === activeDocIndex ? doc.color : "#000000"}
                emissiveIntensity={idx === activeDocIndex ? 0.7 : 0.1}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            {/* Outer halo */}
            <mesh>
              <sphereGeometry args={[0.28, 12, 12]} />
              <meshBasicMaterial
                color={doc.color}
                wireframe
                transparent
                opacity={idx === activeDocIndex ? 0.5 : 0.15}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Vector Stream Connection Rays */}
      <group>
        {streamLines.map((lineObj, idx) => (
          <primitive key={idx} object={lineObj} />
        ))}
      </group>
    </group>
  );
}
