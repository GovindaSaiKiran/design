"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CallSignal3DProps {
  onSignalArrival?: (signalId: number) => void;
}

export default function CallSignal3D({ onSignalArrival }: CallSignal3DProps) {
  const signal1Ref = useRef<THREE.Mesh>(null);
  const signal2Ref = useRef<THREE.Mesh>(null);
  const signal3Ref = useRef<THREE.Mesh>(null);

  // Spline paths for incoming calls
  const paths = useMemo(() => {
    return [
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-3.2, 1.8, -0.5),
        new THREE.Vector3(-1.6, 1.2, 0.4),
        new THREE.Vector3(0, 0, 0)
      ),
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(3.2, 1.4, -0.8),
        new THREE.Vector3(1.5, 0.8, 0.3),
        new THREE.Vector3(0, 0, 0)
      ),
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-2.8, -1.8, -0.2),
        new THREE.Vector3(-1.2, -0.9, 0.5),
        new THREE.Vector3(0, 0, 0)
      ),
    ];
  }, []);

  // Pre-generate Three.js Line objects
  const splineLineObjects = useMemo(() => {
    return paths.map((curve) => {
      const points = curve.getPoints(24);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: "#cbd5e1",
        transparent: true,
        opacity: 0.35,
      });
      return new THREE.Line(geometry, material);
    });
  }, [paths]);

  const lastTriggered = useRef([0, 0, 0]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Signal 1 (Top Left incoming)
    if (signal1Ref.current) {
      const progress1 = (t * 0.45) % 1;
      const point1 = paths[0].getPoint(progress1);
      signal1Ref.current.position.copy(point1);
      signal1Ref.current.scale.setScalar(0.06 + Math.sin(progress1 * Math.PI) * 0.05);

      if (progress1 > 0.95 && t - lastTriggered.current[0] > 1.8) {
        lastTriggered.current[0] = t;
        onSignalArrival?.(1);
      }
    }

    // Signal 2 (Right incoming)
    if (signal2Ref.current) {
      const progress2 = ((t + 1.2) * 0.4) % 1;
      const point2 = paths[1].getPoint(progress2);
      signal2Ref.current.position.copy(point2);
      signal2Ref.current.scale.setScalar(0.06 + Math.sin(progress2 * Math.PI) * 0.05);

      if (progress2 > 0.95 && t - lastTriggered.current[1] > 1.8) {
        lastTriggered.current[1] = t;
        onSignalArrival?.(2);
      }
    }

    // Signal 3 (Bottom Left incoming)
    if (signal3Ref.current) {
      const progress3 = ((t + 2.1) * 0.48) % 1;
      const point3 = paths[2].getPoint(progress3);
      signal3Ref.current.position.copy(point3);
      signal3Ref.current.scale.setScalar(0.06 + Math.sin(progress3 * Math.PI) * 0.05);

      if (progress3 > 0.95 && t - lastTriggered.current[2] > 1.8) {
        lastTriggered.current[2] = t;
        onSignalArrival?.(3);
      }
    }
  });

  return (
    <group>
      {/* Visual spline guide curves */}
      {splineLineObjects.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}

      {/* Incoming Call 1 Node */}
      <mesh ref={signal1Ref}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#38bdf8"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Incoming Call 2 Node */}
      <mesh ref={signal2Ref}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#818cf8"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Incoming Call 3 Node */}
      <mesh ref={signal3Ref}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#059669"
          emissive="#34d399"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
