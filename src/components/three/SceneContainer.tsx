"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";

interface SceneContainerProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  fallbackText?: string;
}

function CanvasFallback({ text = "Spatial AI Core" }: { text?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-sky-300 animate-ping opacity-30" />
        <div className="absolute inset-2 rounded-full border border-cyan-400/40 animate-spin" style={{ animationDuration: "12s" }} />
        <div className="w-6 h-6 rounded-full bg-cyan-500 animate-pulse" />
      </div>
      <p className="mt-3 text-xs font-space font-black text-black tracking-wide uppercase">{text}</p>
    </div>
  );
}

export default function SceneContainer({
  children,
  className = "w-full h-full",
  cameraPosition = [0, 0, 4.8],
  fov = 38,
  fallbackText
}: SceneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl", { powerPreference: "high-performance" }) || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    // High-performance IntersectionObserver: Pause rendering when scrolled off-screen
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px 0px 100px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!hasMounted) {
    return (
      <div ref={containerRef} className={className}>
        <CanvasFallback text={fallbackText} />
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div ref={containerRef} className={className}>
        <CanvasFallback text="Spatial AI Core" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        dpr={[1, 1.25]}
        frameloop={isInView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: true,
          stencil: false
        }}
        style={{ pointerEvents: "auto" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[6, 8, 6]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-6, -4, -4]} intensity={0.6} color="#e0f2fe" />
          <pointLight position={[-4, 2, 4]} intensity={1.4} color="#00f0ff" />
          <pointLight position={[4, -2, 4]} intensity={1.0} color="#38bdf8" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
