"use client";

import React, { useMemo } from "react";

/**
 * Deterministic PRNG for consistent, reproducible blob outlines
 */
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate smooth SVG Catmull-Rom blob path
 */
export function blobPath({
  size = 200,
  points = 8,
  variance = 0.28,
  seed = 1,
}: {
  size?: number;
  points?: number;
  variance?: number;
  seed?: number;
} = {}) {
  const rand = mulberry32(seed);
  const c = size / 2;
  const base = size * 0.38;
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2;
    const r = base * (1 - variance / 2 + rand() * variance);
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  });
  const n = pts.length;
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

/**
 * Clip-path polygon generators
 */
export function starPolygon({ points = 5, inner = 0.5, rotate = -90 } = {}) {
  const out: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 50 : 50 * inner;
    const a = ((rotate + (i * 180) / points) * Math.PI) / 180;
    out.push(`${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${out.join(", ")})`;
}

export function wavyPolygon({ lobes = 8, depth = 0.12, steps = 180, rotate = 0 } = {}) {
  const R = 50 / (1 + depth);
  const out: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = R * (1 + depth * Math.cos(lobes * t + rotate));
    out.push(`${(50 + r * Math.cos(t)).toFixed(2)}% ${(50 + r * Math.sin(t)).toFixed(2)}%`);
  }
  return `polygon(${out.join(", ")})`;
}

const PRESET_CLIPS: Record<string, string> = {
  hexagon: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
  octagon: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  triangle: "polygon(50% 0%, 100% 100%, 0% 100%)",
  star: starPolygon({ points: 5, inner: 0.45 }),
  burst: starPolygon({ points: 12, inner: 0.72 }),
  seal: starPolygon({ points: 20, inner: 0.9 }),
  flower: wavyPolygon({ lobes: 8, depth: 0.12 }),
  flowerBold: wavyPolygon({ lobes: 6, depth: 0.22 }),
  clover: wavyPolygon({ lobes: 4, depth: 0.28 }),
};

export interface ShapeProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: keyof typeof PRESET_CLIPS;
  size?: number | string;
}

export function Shape({
  name = "flower",
  size = 40,
  className = "",
  style,
  children,
  ...rest
}: ShapeProps) {
  const clip = PRESET_CLIPS[name] || PRESET_CLIPS.flower;
  return (
    <div
      className={`shrink-0 flex items-center justify-center ${className}`}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        clipPath: clip,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface BlobProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  seed?: number;
  variance?: number;
  points?: number;
}

export function Blob({
  size = 180,
  seed = 1,
  variance = 0.28,
  points = 8,
  className = "",
  style,
  ...rest
}: BlobProps) {
  const d = useMemo(
    () => blobPath({ size: 200, points, variance, seed }),
    [points, variance, seed]
  );

  return (
    <svg
      viewBox="0 0 200 200"
      width={typeof size === "number" ? `${size}px` : size}
      height={typeof size === "number" ? `${size}px` : size}
      className={`shrink-0 select-none pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
      {...rest}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

export interface SparkleProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function Sparkle({ size = 20, className = "", style, ...rest }: SparkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
      {...rest}
    >
      <path
        fill="currentColor"
        d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z"
      />
    </svg>
  );
}

export function SectionDividerWave({
  className = "",
  color = "currentColor",
  height = 40,
}: {
  className?: string;
  color?: string;
  height?: number;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`w-full block select-none pointer-events-none ${className}`}
      style={{ height: `${height}px`, color }}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0,64 C240,120 480,0 720,48 C960,96 1200,16 1440,64 L1440,120 L0,120 Z"
      />
    </svg>
  );
}
