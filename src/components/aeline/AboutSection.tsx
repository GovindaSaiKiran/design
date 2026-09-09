"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe,
  Volume2,
  PhoneCall,
  GraduationCap,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Link as LinkIcon
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface AboutSectionProps {
  onOpenDemo?: () => void;
  onOpenSimulator?: () => void;
}

export default function AboutSection({ onOpenDemo, onOpenSimulator }: AboutSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);

  // 12 Cards evenly distributed across 360 degrees for true seamless infinite circular motion
  const cards = [
    {
      id: 1,
      title: "120+ Campuses",
      subtitle: "Ivy & Global Systems",
      type: "image-badge",
      bg: "bg-gradient-to-b from-[#1466dc] via-[#1b7bf2] to-[#2591f8]",
      image: "/images/sky-clouds.jpg",
      pill: "Global Ivy",
      metric: "120+",
      sub: "Partner Campuses",
      color: "text-white"
    },
    {
      id: 2,
      title: "Maya AI Specialist",
      subtitle: "Instant Admissions Voice",
      type: "portrait",
      image: "/images/man-portrait.jpg",
      pill: "Live Specialist",
      metric: "240ms",
      sub: "Speech Latency",
      color: "text-white"
    },
    {
      id: 3,
      title: "524k+ Inquiries",
      subtitle: "Peak Enrollment Telephony",
      type: "lime-counter",
      bg: "bg-[#cdfb56]",
      pill: "Live Pulse",
      metric: "524k+",
      sub: "Calls Answered",
      color: "text-slate-950"
    },
    {
      id: 4,
      title: "Empathetic Tone",
      subtitle: "Collegiate Cadence",
      type: "glass-wave",
      bg: "bg-gradient-to-br from-pink-500 via-rose-400 to-indigo-500",
      pill: "Human Empathy",
      metric: "99.4%",
      sub: "Student Comfort",
      color: "text-white"
    },
    {
      id: 5,
      title: "Scholarship Match",
      subtitle: "$18.4k Average Award",
      type: "scholarship",
      image: "/images/woman-portrait.jpg",
      pill: "Admitted '28",
      metric: "$18.4k",
      sub: "Grant Qualified",
      color: "text-white"
    },
    {
      id: 6,
      title: "100% Resolution",
      subtitle: "Zero Hold Time Guarantee",
      type: "resolution",
      bg: "bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-700",
      pill: "0s Hold Time",
      metric: "100%",
      sub: "First-Call Solved",
      color: "text-white"
    },
    {
      id: 7,
      title: "Instant Credit RAG",
      subtitle: "Course Catalog Verified",
      type: "gold-dune",
      bg: "bg-gradient-to-br from-amber-400 via-orange-300 to-emerald-400",
      pill: "ABET Accredited",
      metric: "12/12",
      sub: "Credits Transferred",
      color: "text-slate-900"
    },
    {
      id: 8,
      title: "24/7 Global Clocks",
      subtitle: "Multi-Timezone Hub",
      type: "obsidian",
      bg: "bg-[#0b0f17]",
      pill: "6 Continents",
      metric: "24+",
      sub: "Timezones Synced",
      color: "text-white"
    },
    {
      id: 9,
      title: "Multi-Lingual",
      subtitle: "42+ Languages Spoken",
      type: "liquid-fuchsia",
      bg: "bg-gradient-to-br from-fuchsia-600 via-pink-600 to-rose-500",
      pill: "Auto-Detect",
      metric: "42+",
      sub: "Fluent Dialects",
      color: "text-white"
    },
    {
      id: 10,
      title: "Dean Verified",
      subtitle: "+38% Admissions Yield",
      type: "verified-seal",
      bg: "bg-white",
      pill: "Dean Office",
      metric: "+38%",
      sub: "Qualified Leads",
      color: "text-slate-900",
      border: "border-slate-200"
    },
    {
      id: 11,
      title: "CRM Auto-Sync",
      subtitle: "Slate & Salesforce Live",
      type: "crm-sync",
      bg: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
      pill: "Direct Sync",
      metric: "0.2s",
      sub: "Lead Logging",
      color: "text-white"
    },
    {
      id: 12,
      title: "Sub-Second RAG",
      subtitle: "Campus Knowledge Core",
      type: "tech-core",
      bg: "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700",
      pill: "Zero Hallucination",
      metric: "0.15s",
      sub: "Catalog Search",
      color: "text-white"
    }
  ];

  const TOTAL_CARDS = cards.length;
  const STEP_ANGLE = 360 / TOTAL_CARDS; // 30 degrees per card

  // Responsive window resize tracking
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update card CSS transforms directly for silky 120 FPS infinite continuous rotation
  const updateCardTransforms = useCallback((currentRotation: number) => {
    const contWidth = containerRef.current?.clientWidth || 1100;
    
    // Strict symmetric radius calculation keeping cards centered and within display
    const maxRadiusAllowed = Math.max(250, (contWidth / 2 - 80) / 0.88);
    const radiusX = Math.min(maxRadiusAllowed, isMobile ? 275 : isTablet ? 370 : 460);
    // Lower radiusY so cards at the apex stay safely inside view with plenty of headroom
    const radiusY = Math.min(radiusX * 0.70, isMobile ? 190 : isTablet ? 260 : 330);

    cardRefs.current.forEach((cardEl, i) => {
      if (!cardEl) return;

      const rawAngle = (i * STEP_ANGLE + currentRotation) % 360;
      // Normalize angle to [-180, +180]
      const normAngle = ((rawAngle + 540) % 360) - 180;
      const rad = (normAngle * Math.PI) / 180;

      // Symmetrically centered coordinate on upper arc
      const x = Math.sin(rad) * radiusX;
      const y = -Math.cos(rad) * radiusY;

      const absAngle = Math.abs(normAngle);
      // Symmetrically fade out and hide outside visible arc
      const isVisible = absAngle <= 65;

      if (!isVisible) {
        cardEl.style.opacity = "0";
        cardEl.style.pointerEvents = "none";
        cardEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${normAngle}deg) translate(-50%, -50%) scale(0.6)`;
        return;
      }

      // Smooth symmetric fade-out near both edges (48deg to 65deg)
      let opacity = 1;
      if (absAngle > 48) {
        opacity = Math.max(0, 1 - (absAngle - 48) / 17);
      }

      const isApex = absAngle < 14;
      const baseScale = isApex ? 1.03 : 0.96;
      const zIndex = Math.round(50 - absAngle);

      cardEl.style.opacity = `${opacity}`;
      cardEl.style.pointerEvents = opacity > 0.25 ? "auto" : "none";
      cardEl.style.zIndex = `${zIndex}`;

      // Clean transform with GPU hardware acceleration
      cardEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${normAngle}deg) translate(-50%, -50%) scale(${baseScale})`;
    });
  }, [STEP_ANGLE, isMobile, isTablet]);

  // Main 120 FPS infinite continuous circular motion loop (constant calm drift)
  useEffect(() => {
    let animId: number;

    const animate = () => {
      if (!isDraggingRef.current) {
        // Continuous steady infinite forward drift
        const autoSpeed = 0.055;
        rotationRef.current += autoSpeed;

        // Apply drag momentum inertia if user spun the wheel
        if (Math.abs(velocityRef.current) > 0.001) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= 0.92; // smooth dampening
        }
      }

      updateCardTransforms(rotationRef.current);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [updateCardTransforms]);

  // Pointer drag event handlers for manual navigation along the circular wheel
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    // Convert pixel drag to rotational angle degrees
    const rotDelta = deltaX * 0.08;
    rotationRef.current += rotDelta;
    velocityRef.current = rotDelta * 0.8;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleCardClick = () => {
    soundSynth.playCallChime();
  };

  return (
    <section id="about" className="w-full bg-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-x-clip select-none">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[580px] bg-gradient-to-b from-blue-50/50 via-lime-50/25 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1280px] mx-auto overflow-visible">
        {/* ========================================================================= */}
        {/* THE GRAND REVOLVING ARC OF TINY CARDS (UNCUT & HEADROOM SAFE) */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[550px] sm:h-[610px] lg:h-[660px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible mx-auto pt-6"
        >
          {/* Centered Circular Arch Origin positioned with ample top breathing room */}
          <div className="absolute top-[390px] sm:top-[440px] lg:top-[490px] left-1/2 -translate-x-1/2 w-0 h-0 flex items-center justify-center">
            {cards.map((card, i) => {
              return (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={handleCardClick}
                  className={`absolute w-[114px] h-[142px] sm:w-[130px] sm:h-[160px] lg:w-[140px] lg:h-[172px] rounded-[22px] sm:rounded-[26px] p-3 sm:p-3.5 shadow-xl cursor-pointer overflow-hidden flex flex-col justify-between ${
                    card.bg || "bg-white"
                  } ${card.border || "border border-white/40"} ${card.color}`}
                >
                  {/* Background photo */}
                  {card.image && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="180px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
                    </div>
                  )}

                  {/* Top pill badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md ${
                        card.type === "lime-counter"
                          ? "bg-black/15 text-slate-950"
                          : "bg-white/20 text-white border border-white/20"
                      }`}
                    >
                      {card.pill}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cdfb56] opacity-80" />
                  </div>

                  {/* Center graphic decoration for abstract cards */}
                  {card.type === "glass-wave" && (
                    <div className="relative z-10 w-full flex justify-center items-center my-auto opacity-90">
                      <Volume2 className="w-6 h-6 text-white/90" />
                    </div>
                  )}

                  {card.type === "resolution" && (
                    <div className="relative z-10 w-full flex justify-center items-center my-auto">
                      <div className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center bg-white/10">
                        <CheckCircle2 className="w-5 h-5 text-[#cdfb56]" />
                      </div>
                    </div>
                  )}

                  {card.type === "obsidian" && (
                    <div className="relative z-10 w-full flex justify-center items-center my-auto">
                      <Globe className="w-7 h-7 text-[#cdfb56]" />
                    </div>
                  )}

                  {card.type === "gold-dune" && (
                    <div className="relative z-10 w-full flex justify-center items-center my-auto">
                      <GraduationCap className="w-7 h-7 text-slate-900" />
                    </div>
                  )}

                  {card.type === "crm-sync" && (
                    <div className="relative z-10 w-full flex justify-center items-center my-auto">
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                  )}

                  {card.type === "tech-core" && (
                    <div className="relative z-10 w-full flex justify-center items-center my-auto">
                      <Cpu className="w-6 h-6 text-[#cdfb56]" />
                    </div>
                  )}

                  {/* Bottom metrics & title */}
                  <div className="relative z-10 mt-auto">
                    <div className="text-xl sm:text-2xl font-black tracking-tight leading-none mb-0.5">
                      {card.metric}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-semibold opacity-90 leading-tight truncate">
                      {card.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* CENTER CONTENT UNDER THE ARCH (MATCHING IMAGE 2 EXACTLY) */}
          {/* ========================================================================= */}
          <div className="relative z-20 text-center max-w-2xl mx-auto px-4 mt-20 sm:mt-28 pointer-events-auto">
            {/* Small Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#1682ec] uppercase bg-blue-50/80 border border-blue-200/60 px-4 py-1 rounded-full mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#1682ec]" />
              AI ADMISSIONS COUNSELOR
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-medium text-slate-950 tracking-[-0.02em] leading-[1.12] mb-4">
              Deliver Autonomous Admissions <br className="hidden sm:inline" />
              Voice Calls Instantly
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed mb-7">
              Transform prospective student recruitment with zero hold times, verified institutional knowledge, and sub-second natural voice telephony.
            </p>

            {/* Pill CTA Button */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onOpenSimulator}
                className="bg-slate-950 hover:bg-slate-900 text-white rounded-full px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-bold tracking-tight shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 group active:scale-95 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#cdfb56]" />
                <span>Start Speaking with Maya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenDemo}
                className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full px-6 py-3.5 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                Book Institutional Demo
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM 3 FANNED CARDS (MATCHING IMAGE 2 TEMPLATE EXACTLY) */}
        {/* ========================================================================= */}
        <div className="pt-14 sm:pt-20 mt-4 border-t border-slate-100/90 max-w-5xl mx-auto">
          {/* Subtle Grid Background for the Fanned Cards Section */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-7 lg:gap-8 py-6">
            
            {/* ------------------------------------------------------------- */}
            {/* CARD 1: Grounded RAG (Orange / Peach Theme) */}
            {/* ------------------------------------------------------------- */}
            <div className="w-full max-w-[310px] sm:max-w-[325px] bg-white rounded-[26px] p-4 sm:p-5 border border-slate-200/80 shadow-xl md:-rotate-[3.5deg] md:translate-y-2 hover:md:-translate-y-2 hover:md:rotate-0 hover:z-20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Top Pattern Header Area */}
                <div className="h-24 sm:h-28 rounded-[18px] relative overflow-hidden bg-orange-50/60 border border-orange-100/80 flex items-end p-2.5">
                  <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 240 120" fill="none">
                    <defs>
                      <pattern id="dot-diamond-orange" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <rect x="2" y="2" width="4" height="4" rx="1" fill="#ea580c" fillOpacity="0.4" />
                        <circle cx="12" cy="12" r="1.5" fill="#f97316" fillOpacity="0.5" />
                      </pattern>
                    </defs>
                    <rect width="240" height="120" fill="url(#dot-diamond-orange)" />
                  </svg>

                  {/* Circular Floating Badge (Image 2 style) */}
                  <div className="w-10 h-10 rounded-full bg-white shadow-md border border-orange-100 flex items-center justify-center -mb-6 ml-1 relative z-10 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5 text-orange-500" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-8 pb-1 px-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight">
                      Grounded RAG
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200/60">
                      Accuracy
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Strictly grounded in your university&apos;s verified tuition, financial aid, and curriculum documents with zero hallucinations.
                  </p>
                </div>
              </div>

              {/* Bottom Action Pill */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={onOpenDemo}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-orange-500" />
                  <span>Verified Catalog Sync</span>
                </button>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CARD 2: Sub-240ms Latency (Blue / Cyan Theme) */}
            {/* ------------------------------------------------------------- */}
            <div className="w-full max-w-[310px] sm:max-w-[325px] bg-white rounded-[26px] p-4 sm:p-5 border border-slate-200/80 shadow-2xl md:rotate-0 md:-translate-y-2 z-10 hover:md:-translate-y-4 transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Top Pattern Header Area */}
                <div className="h-24 sm:h-28 rounded-[18px] relative overflow-hidden bg-blue-50/60 border border-blue-100/80 flex items-end p-2.5">
                  <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 240 120" fill="none">
                    <defs>
                      <pattern id="dot-spiral-blue" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="3" fill="#2563eb" fillOpacity="0.45" />
                        <circle cx="3" cy="3" r="1.5" fill="#3b82f6" fillOpacity="0.35" />
                        <circle cx="17" cy="17" r="1.5" fill="#3b82f6" fillOpacity="0.35" />
                        <circle cx="3" cy="17" r="1" fill="#60a5fa" fillOpacity="0.25" />
                        <circle cx="17" cy="3" r="1" fill="#60a5fa" fillOpacity="0.25" />
                      </pattern>
                    </defs>
                    <rect width="240" height="120" fill="url(#dot-spiral-blue)" />
                  </svg>

                  {/* Circular Floating Badge (Image 2 style) */}
                  <div className="w-10 h-10 rounded-full bg-white shadow-md border border-blue-100 flex items-center justify-center -mb-6 ml-1 relative z-10 group-hover:scale-110 transition-transform">
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-8 pb-1 px-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight">
                      Sub-240ms Latency
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                      Telephony
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Natural conversational cadence with instantaneous interruptions, eliminating robotic dead-air or awkward delays.
                  </p>
                </div>
              </div>

              {/* Bottom Action Pill */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={onOpenSimulator}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-blue-500" />
                  <span>Ultra-Low Latency Active</span>
                </button>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CARD 3: Global Coverage (Emerald / Teal Theme) */}
            {/* ------------------------------------------------------------- */}
            <div className="w-full max-w-[310px] sm:max-w-[325px] bg-white rounded-[26px] p-4 sm:p-5 border border-slate-200/80 shadow-xl md:rotate-[3.5deg] md:translate-y-2 hover:md:-translate-y-2 hover:md:rotate-0 hover:z-20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Top Pattern Header Area */}
                <div className="h-24 sm:h-28 rounded-[18px] relative overflow-hidden bg-emerald-50/60 border border-emerald-100/80 flex items-end p-2.5">
                  <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 240 120" fill="none">
                    <defs>
                      <pattern id="dot-hex-green" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="2.2" fill="#059669" fillOpacity="0.45" />
                        <circle cx="11" cy="5" r="1.8" fill="#10b981" fillOpacity="0.4" />
                        <circle cx="5" cy="11" r="1.8" fill="#10b981" fillOpacity="0.4" />
                        <circle cx="16" cy="16" r="2.5" fill="#059669" fillOpacity="0.5" />
                        <circle cx="16" cy="10" r="1.5" fill="#34d399" fillOpacity="0.3" />
                      </pattern>
                    </defs>
                    <rect width="240" height="120" fill="url(#dot-hex-green)" />
                  </svg>

                  {/* Circular Floating Badge (Image 2 style) */}
                  <div className="w-10 h-10 rounded-full bg-white shadow-md border border-emerald-100 flex items-center justify-center -mb-6 ml-1 relative z-10 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-8 pb-1 px-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight">
                      Global Coverage
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      24/7 Network
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Answers thousands of global applicants across all timezones simultaneously, with zero hold times during deadlines.
                  </p>
                </div>
              </div>

              {/* Bottom Action Pill */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={onOpenDemo}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span>24+ Timezones Synced</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
