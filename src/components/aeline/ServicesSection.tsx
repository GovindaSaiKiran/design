"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  PhoneCall,
  BookOpen,
  Radio,
  UserCheck,
  Zap,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// Catmull-Rom spline formula guaranteeing the curve passes EXACTLY through every point
function getSplinePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i !== pts.length - 2 ? pts[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

const defaultRopePath = getSplinePath([
  { x: -500, y: 10 },
  { x: 142, y: 38 },
  { x: 440, y: 70 },
  { x: 710, y: 102 },
  { x: 980, y: 70 },
  { x: 1278, y: 38 },
  { x: 1920, y: 10 },
]);

export default function ServicesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ropePath, setRopePath] = useState<string>(defaultRopePath);

  // Dynamically calculate the rope path passing EXACTLY through each clothespin's eyelet
  useEffect(() => {
    const updateRope = () => {
      if (!containerRef.current) return;
      const contRect = containerRef.current.getBoundingClientRect();
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < 5; i++) {
        const el = clipRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          points.push({
            x: rect.left + rect.width / 2 - contRect.left,
            y: rect.top + rect.height * 0.45 - contRect.top,
          });
        }
      }

      if (points.length === 5) {
        // Extend gracefully off-screen to both sides
        const screenSpan = Math.max(window.innerWidth * 0.5, 450);
        const p0 = {
          x: -screenSpan,
          y: Math.max(12, points[0].y - 48),
        };
        const p6 = {
          x: contRect.width + screenSpan,
          y: Math.max(12, points[4].y - 48),
        };

        const path = getSplinePath([p0, ...points, p6]);
        setRopePath(path);
      }
    };

    updateRope();
    window.addEventListener("resize", updateRope);
    window.addEventListener("orientationchange", updateRope);

    const ro = new ResizeObserver(() => updateRope());
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateRope);
      window.removeEventListener("orientationchange", updateRope);
      ro.disconnect();
    };
  }, []);

  // 5 Hanging Capability Badge Tiles (1:1 with Reference Template Image)
  const capabilityTiles = [
    {
      id: "latency",
      title: "Sub-400ms Voice",
      cardStyle:
        "bg-white border border-slate-200/90 shadow-[0_14px_34px_-8px_rgba(0,0,0,0.07)] ring-1 ring-slate-900/5",
      textColor: "text-slate-900",
      yOffset: "lg:mt-0",
      swayClass: "animate-sway-left-strong",
      iconNode: (
        <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-[24px] sm:rounded-[26px] bg-gradient-to-tr from-[#84cc16] via-[#a3e635] to-[#bef264] shadow-md flex flex-col items-center justify-center p-3 relative group-hover:scale-105 transition-transform duration-300">
          {/* Two eyes: one open dot, one playful wink curve */}
          <div className="flex items-center justify-between w-9 sm:w-10 mb-1 px-0.5">
            <div className="w-2.5 h-2.5 rounded-full bg-lime-950" />
            <svg className="w-3.5 h-2.5" viewBox="0 0 16 10" fill="none">
              <path
                d="M 2 8 Q 8 2 14 8"
                stroke="#1a2e05"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* Playful smile curve matching Card 1 in reference image */}
          <svg className="w-7 h-3.5" viewBox="0 0 28 14" fill="none">
            <path
              d="M 2 2 Q 14 14 26 2"
              stroke="#1a2e05"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "rag",
      title: "Vector RAG",
      cardStyle:
        "bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc] border border-sky-300 shadow-[0_16px_36px_-8px_rgba(2,132,199,0.22)] ring-1 ring-sky-400/25",
      textColor: "text-slate-950",
      yOffset: "lg:mt-8",
      swayClass: "animate-sway-left",
      iconNode: (
        <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-[24px] sm:rounded-[26px] bg-slate-950 shadow-xl border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <BookOpen className="w-9 h-9 sm:w-10 sm:h-10 text-white stroke-[2.2]" />
        </div>
      ),
    },
    {
      id: "fleet",
      title: "24/7 Fleet",
      cardStyle:
        "bg-white border border-slate-200/95 shadow-[0_18px_40px_-8px_rgba(0,0,0,0.09)] ring-1 ring-slate-900/5",
      textColor: "text-slate-900",
      yOffset: "lg:mt-16",
      swayClass: "animate-sway-center",
      iconNode: (
        <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-[24px] sm:rounded-[26px] bg-[#0a0f1d] shadow-xl border border-slate-800 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
          {/* Radiant Multi-Color Ribbon Loop (matching the 'P' icon in Card 3 of reference image) */}
          <svg className="w-11 h-11 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="pRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="25%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="75%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            <path
              d="M 16 38 V 16 C 16 10.5 20.5 6 26 6 C 31.5 6 36 10.5 36 16 C 36 21.5 31.5 26 26 26 H 16"
              stroke="url(#pRibbon)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "handoff",
      title: "Smart Handoff",
      cardStyle:
        "bg-white border border-slate-200/90 shadow-[0_14px_34px_-8px_rgba(0,0,0,0.07)] ring-1 ring-slate-900/5",
      textColor: "text-slate-900",
      yOffset: "lg:mt-8",
      swayClass: "animate-sway-right",
      iconNode: (
        <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-[24px] sm:rounded-[26px] bg-gradient-to-tr from-[#10b981] via-[#34d399] to-[#6ee7b7] shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {/* DreamFace style smiling mascot badge */}
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-black/90 flex flex-col items-center justify-center p-2 shadow-inner">
            <div className="flex items-center justify-between w-7 mb-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <svg className="w-2.5 h-2" viewBox="0 0 12 8" fill="none">
                <path
                  d="M 1 6 Q 6 1 11 6"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <svg className="w-4.5 h-2" viewBox="0 0 18 10" fill="none">
              <path
                d="M 2 2 Q 9 9 16 2"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "crm-sync",
      title: "CRM Bi-Sync",
      cardStyle:
        "bg-[#0a0e1a] border border-slate-800 shadow-[0_18px_40px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10",
      textColor: "text-slate-200",
      yOffset: "lg:mt-0",
      swayClass: "animate-sway-right-strong",
      iconNode: (
        <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-[24px] sm:rounded-[26px] bg-[#141b2d] shadow-lg border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
          {/* Vibrant Glowing Multi-Color Play Button (matching Card 5 in reference image) */}
          <svg className="w-11 h-11 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="playGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="45%" stopColor="#fb923c" />
                <stop offset="85%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <path
              d="M 17 11.5 C 17 9.5 19.2 8.2 21 9.3 L 37.5 19.8 C 39.2 20.9 39.2 23.1 37.5 24.2 L 21 34.7 C 19.2 35.8 17 34.5 17 32.5 Z"
              fill="url(#playGradient)"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section
      id="capabilities"
      className="w-full bg-[#fafafa] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto">
        {/* ================================================================= */}
        {/* SECTION HEADER (MATCHING TEMPLATE IN IMAGE 1)                     */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block" />
            CORE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight mb-3">
            Stop Settling, Start Automating
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto mb-5 font-normal">
            Don&apos;t pick from rigid bots. Deploy autonomous, human-cadence voice agents tuned your way.
          </p>

          {/* Pill Action Button from Reference Image ("Make Your Logo Now ✨") */}
          <div className="flex justify-center relative z-20 mb-2">
            <button
              onClick={() => {
                const el = document.getElementById("indic-tts");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#4338ca] text-white text-xs font-bold shadow-[0_8px_22px_-4px_rgba(79,70,229,0.5)] hover:shadow-[0_12px_28px_-4px_rgba(79,70,229,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
            >
              <span>Explore Voice Architecture</span>
              <Sparkles className="w-3.5 h-3.5 text-[#cdfb56] group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* HANGING CLOTHESLINE SUSPENSION CONTAINER                          */}
        {/* Full-Bleed Black Thread & Authentic Squircle Hanging Cards        */}
        {/* ================================================================= */}
        <div
          ref={containerRef}
          className="relative w-full max-w-[1360px] xl:max-w-[1460px] mx-auto pt-4 sm:pt-6 pb-16"
        >
          {/* Dynamic High-Tension Black Suspension Rope (Passes Directly Through Each Card's Clip) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-20 overflow-visible"
            fill="none"
          >
            {/* Soft ambient drop shadow of the black rope */}
            <path
              d={ropePath}
              stroke="rgba(0, 0, 0, 0.12)"
              strokeWidth="5"
              strokeLinecap="round"
              transform="translate(0, 2)"
            />
            {/* Main deep black high-tension suspension rope */}
            <path
              d={ropePath}
              stroke="#060911"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Specular sheen on top edge of rope */}
            <path
              d={ropePath}
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="0.8"
              strokeLinecap="round"
              transform="translate(0, -0.6)"
            />
          </svg>

          {/* 5 Hanging Squircle Cards Grid (Matching Reference Image Spacing & Shape) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 relative z-10 pt-4 lg:pt-8 place-items-center">
            {capabilityTiles.map((card, index) => {
              const isSelected = activeCard === index;
              return (
                <div
                  key={card.id}
                  className={`relative flex flex-col items-center w-full ${card.yOffset}`}
                >
                  {/* Stationary Attachment Reference (Rope connects right here at eyelet) */}
                  <div
                    ref={(el) => {
                      clipRefs.current[index] = el;
                    }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-10 pointer-events-none"
                  />

                  {/* Swaying Card & Clothespin Assembly (Tilts and sways around top pin) */}
                  <div
                    className={`relative flex flex-col items-center transition-all duration-700 ease-out origin-top ${card.swayClass} hover:!rotate-0 group w-full`}
                  >
                    {/* Purple Clothespin / Suspension Clip from Reference Image */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                      {/* Clothespin Body */}
                      <div className="w-6 h-10 rounded-t-[8px] rounded-b-[3px] bg-gradient-to-b from-[#818cf8] via-[#6366f1] to-[#4f46e5] shadow-sm border border-indigo-300/90 flex flex-col items-center justify-between py-2 relative">
                        {/* Inner eyelet hole / spring loop from reference image */}
                        <div className="w-3 h-3 rounded-full bg-white shadow-inner border border-indigo-200/90 flex items-center justify-center relative z-10 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                        </div>

                        {/* Clamping jaws slit at bottom overlapping top of card */}
                        <div className="w-0.5 h-3 bg-indigo-950/50 mb-0 rounded-full" />
                      </div>
                    </div>

                    {/* Pure Squircle Hanging Card (Exact Match to Reference Image Shape) */}
                    <div
                      onClick={() => setActiveCard(isSelected ? null : index)}
                      className={`w-40 sm:w-44 lg:w-48 xl:w-52 aspect-square rounded-[34px] sm:rounded-[38px] p-5 border transition-all duration-500 flex flex-col items-center justify-center cursor-pointer origin-top group-hover:scale-105 group-hover:-translate-y-2 ${
                        card.cardStyle
                      } ${
                        isSelected
                          ? "ring-2 ring-indigo-500 shadow-2xl scale-105 -translate-y-2"
                          : ""
                      }`}
                    >
                      {/* Big Iconic App Tile in Center */}
                      <div className="mb-3 sm:mb-3.5">
                        {card.iconNode}
                      </div>

                      {/* Clean Minimal Typography Below Icon (Matching Reference Image) */}
                      <h3
                        className={`text-xs sm:text-sm font-semibold tracking-tight text-center ${card.textColor}`}
                      >
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
