"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Globe,
  ShieldCheck,
  Headphones,
  Award,
  Sparkles,
  Lock,
  FileCheck,
  CheckCircle2
} from "lucide-react";

export default function HeroCardsArc() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State for tracking closest card to front
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);

  // 12 Cards covering the full features and capabilities of Edu-Voice-Ai
  const TOTAL_CARDS = 12;
  const ANGLE_PER_CARD = 360 / TOTAL_CARDS; // 30 degrees per card

  // Update card positions directly via transforms for 120fps buttery-smooth motion
  const updateCardTransforms = useCallback((currentRotation: number) => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    const radius = width < 640 ? 360 : width < 1024 ? 490 : 580;

    let closestIndex = 0;
    let minDiff = 999;

    cardRefs.current.forEach((cardEl, i) => {
      if (!cardEl) return;

      // Calculate normalized angle in degrees [-180, 180]
      const rawAngle = (currentRotation + i * ANGLE_PER_CARD) % 360;
      const normAngle = ((rawAngle + 540) % 360) - 180;
      const rad = (normAngle * Math.PI) / 180;

      // Check which card is closest to front center
      const absDiff = Math.abs(normAngle);
      if (absDiff < minDiff) {
        minDiff = absDiff;
        closestIndex = i;
      }

      // Cylindrical 3D positioning
      const x = Math.sin(rad) * radius;
      // Front (0 deg): z = 0; sides (90 deg): z = -radius; back (180 deg): z = -2*radius
      const z = (Math.cos(rad) - 1) * radius;
      // Gentle vertical arching: center elevated, sides curve smoothly downward
      const y = (1 - Math.cos(rad)) * 34;
      // Tangential facing angle with natural curvature
      const rotateY = normAngle * 0.74;
      // Subtle realistic banking tilt
      const rotateZ = Math.sin(rad) * -4.5;
      // Perspective scale: front cards are larger, periphery cards slightly smaller
      const scale = 0.82 + 0.22 * Math.max(0, Math.cos(rad));
      // Opacity: front hemisphere is crisp, back hemisphere smoothly dims
      const cosVal = Math.cos(rad);
      const opacity = cosVal > 0 ? 1 : Math.max(0.15, 1 + cosVal * 1.6);
      // Layer ordering: front card always in front
      const zIndex = Math.round((cosVal + 1) * 50);

      cardEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      cardEl.style.opacity = `${opacity}`;
      cardEl.style.zIndex = `${zIndex}`;
    });

    setActiveCardIndex(closestIndex);
  }, [ANGLE_PER_CARD]);

  // Main 120fps requestAnimationFrame physics loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Apply momentum velocity with silky dampening
      rotationRef.current += velocityRef.current;
      velocityRef.current *= 0.91; // smooth momentum decay

      // Continuous gentle circular float when idle
      if (!isHoveredRef.current && !isDraggingRef.current && Math.abs(velocityRef.current) < 0.02) {
        rotationRef.current += 0.035; // gentle ambient orbit
      }

      updateCardTransforms(rotationRef.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [updateCardTransforms]);

  // Scroll wheel listener attached with passive: false to prevent page jump while rotating cards
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setIsUserInteracting(true);
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velocityRef.current += delta * 0.035;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Pointer drag events for mouse or touch
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    setIsUserInteracting(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    rotationRef.current += deltaX * 0.28;
    velocityRef.current = deltaX * 0.12;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture released
    }
  };

  // Rotate to specific card on click
  const rotateToCard = (targetIndex: number) => {
    const currentAngle = rotationRef.current;
    const targetBase = -targetIndex * ANGLE_PER_CARD;
    const diff = ((((targetBase - currentAngle) % 360) + 540) % 360) - 180;
    velocityRef.current += diff * 0.14;
    setIsUserInteracting(true);
  };

  const rotateStep = (direction: "left" | "right") => {
    const step = direction === "left" ? ANGLE_PER_CARD : -ANGLE_PER_CARD;
    velocityRef.current += step * 0.12;
    setIsUserInteracting(true);
  };

  return (
    <div className="w-full relative pt-6 pb-6 flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Interactive 3D Cylindrical Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          setIsUserInteracting(true);
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
        }}
        className="w-full max-w-[1380px] h-[340px] sm:h-[370px] lg:h-[390px] relative flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{
          perspective: "1600px",
          transformStyle: "preserve-3d"
        }}
      >
        {/* ========================================================================= */}
        {/* CARD 0: Inquiries in Every Call (Bar chart, +34%) */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          onClick={() => rotateToCard(0)}
          className="absolute w-38 sm:w-44 h-56 sm:h-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_20px_45px_rgba(0,0,0,0.22)] border-2 border-white transition-shadow duration-300 hover:shadow-[0_25px_55px_rgba(0,0,0,0.3)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="text-xs font-bold text-slate-800 leading-tight">
              Inquiries in
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Every Call
            </div>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-24 pt-4 px-1">
            <div className="w-3 h-9 bg-sky-200 rounded-t-sm" />
            <div className="w-3 h-14 bg-sky-300 rounded-t-sm" />
            <div className="w-3 h-11 bg-sky-400 rounded-t-sm" />
            <div className="w-3 h-18 bg-sky-500 rounded-t-sm" />
            <div className="w-3 h-22 bg-blue-600 rounded-t-sm relative">
              <span className="absolute -top-4 -left-1 text-[8px] font-bold text-blue-600">
                +34%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px] text-slate-400 font-medium">
            <span>Fall</span>
            <span>Spring</span>
            <span>NRI</span>
            <span>Merit</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 1: Admissions Inquiries & Slabs (4,900 / 6,100) */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[1] = el; }}
          onClick={() => rotateToCard(1)}
          className="absolute w-42 sm:w-48 h-58 sm:h-66 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_22px_48px_rgba(0,0,0,0.24)] border-2 border-white transition-shadow duration-300 hover:shadow-[0_28px_58px_rgba(0,0,0,0.32)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-base font-black text-slate-900">4,900</span>
              <span className="text-xs font-medium text-slate-400">/ 6,100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div className="w-[80%] h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between py-1 px-1.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium text-[10px]">B.Tech Fee Slabs</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-800 font-semibold text-[10px]">$100</span>
                  <div className="w-5 h-3 bg-sky-500 rounded-full relative p-0.5">
                    <div className="w-2 h-2 bg-white rounded-full ml-auto" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 px-1.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium text-[10px]">Hostel AC Booking</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-800 font-semibold text-[10px]">$80</span>
                  <div className="w-5 h-3 bg-sky-500 rounded-full relative p-0.5">
                    <div className="w-2 h-2 bg-white rounded-full ml-auto" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 px-1.5 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium text-[10px]">NRI Quota Policy</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-800 font-semibold text-[10px]">$20</span>
                  <div className="w-5 h-3 bg-slate-200 rounded-full relative p-0.5">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Institutional accuracy
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: Enrolled Student Portrait (Woman portrait) */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[2] = el; }}
          onClick={() => rotateToCard(2)}
          className="absolute w-44 sm:w-50 h-60 sm:h-70 rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.26)] border-2 border-white transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.34)] cursor-pointer bg-slate-200 will-change-transform group"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/woman-portrait.jpg"
              alt="Admitted Student Smiling"
              fill
              sizes="220px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-2.5 inset-x-2 bg-white/95 backdrop-blur-md rounded-xl py-1.5 px-2 shadow-xl flex items-center justify-between z-20 border border-slate-100">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[9px] font-bold text-slate-900">Enrolled 2,670</span>
            </div>
            <div className="h-3 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="text-[9px] font-bold text-slate-900">Review 1,200</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: Institutional Knowledge Spline Chart (+42% Yield) */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[3] = el; }}
          onClick={() => rotateToCard(3)}
          className="absolute w-48 sm:w-56 h-64 sm:h-72 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_26px_55px_rgba(0,0,0,0.28)] border-2 border-white transition-shadow duration-300 hover:shadow-[0_32px_65px_rgba(0,0,0,0.35)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="text-xs font-bold text-slate-900 leading-snug">
              Institutional Knowledge
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Grounded In Every Decision
            </div>
          </div>

          <div className="w-full h-32 relative flex items-end">
            <svg
              viewBox="0 0 160 90"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <line x1="0" y1="20" x2="160" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="160" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="160" y2="80" stroke="#f1f5f9" strokeWidth="1" />

              <path
                d="M 0 75 Q 35 70, 60 55 T 110 40 T 160 15 L 160 85 L 0 85 Z"
                fill="url(#areaGrad)"
              />
              <path
                d="M 0 75 Q 35 70, 60 55 T 110 40 T 160 15"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="160" cy="15" r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold px-0.5">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span className="text-sky-600 font-bold">+42% Yield</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 4: Maya Core (99.8% Resolution Rate, Dark Card) */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[4] = el; }}
          onClick={() => rotateToCard(4)}
          className="absolute w-48 sm:w-56 h-64 sm:h-72 bg-[#111317]/95 backdrop-blur-md text-white rounded-2xl p-4.5 shadow-[0_26px_55px_rgba(0,0,0,0.4)] border-2 border-slate-700 transition-shadow duration-300 hover:shadow-[0_32px_65px_rgba(0,0,0,0.5)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-bold tracking-tight text-white">
                Maya Core
              </span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#cdfb56] text-black">
                <Star className="w-2.5 h-2.5 fill-black" />
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              that Combines Voice, Institutional Data, and Student Empathy
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
              <span>Sub-400ms Telephony</span>
              <span className="text-[#cdfb56] font-semibold">99.8%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-[94%] h-full bg-[#cdfb56] rounded-full" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 5: Knowledge Ingestion Cyan Card (Upload Prospectus & Fees) */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[5] = el; }}
          onClick={() => rotateToCard(5)}
          className="absolute w-44 sm:w-50 h-60 sm:h-70 rounded-2xl p-4 shadow-[0_24px_50px_rgba(14,165,233,0.35)] border-2 border-white/60 transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(14,165,233,0.45)] flex flex-col items-center justify-between text-white cursor-pointer will-change-transform"
          style={{
            background: "linear-gradient(145deg, #26a9f7 0%, #087dd4 100%)"
          }}
        >
          <div className="w-full flex justify-end">
            <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
          </div>

          <div className="flex flex-col items-center my-auto">
            <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner mb-2.5 hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">
              Knowledge Ingestion
            </span>
            <span className="text-[10px] text-white/85 font-medium text-center">
              Upload prospectus & fees
            </span>
          </div>

          <div className="w-full border border-dashed border-white/40 rounded-xl py-1.5 px-2 text-center text-[9px] text-white/90 bg-white/15">
            PDF, Syllabus or SIS API
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 6: 520k+ Student Inquiries Hub */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[6] = el; }}
          onClick={() => rotateToCard(6)}
          className="absolute w-42 sm:w-48 h-58 sm:h-66 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_22px_48px_rgba(0,0,0,0.24)] border-2 border-white transition-shadow duration-300 hover:shadow-[0_28px_58px_rgba(0,0,0,0.32)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md mb-2 text-[8px] font-semibold text-slate-500">
              <span className="px-1 py-0.5 bg-white text-slate-900 rounded shadow-xs">
                Undergrad
              </span>
              <span className="px-1 py-0.5">Graduate</span>
              <span className="px-1 py-0.5">NRI</span>
            </div>

            <span className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
              Student Inquiries
            </span>
            <div className="text-2xl font-black text-slate-900 leading-tight">
              520k+
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[9px] text-slate-500">
              <span>Tuition & Aid</span>
              <span className="font-semibold text-slate-700">82%</span>
            </div>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[82%] h-full bg-blue-600 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-500">
              <span>Hostel & Eligibility</span>
              <span className="font-semibold text-slate-700">95%</span>
            </div>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[95%] h-full bg-sky-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 7: 96% Instant Resolution Gauge */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[7] = el; }}
          onClick={() => rotateToCard(7)}
          className="absolute w-38 sm:w-44 h-56 sm:h-64 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_20px_45px_rgba(0,0,0,0.22)] border-2 border-white transition-shadow duration-300 hover:shadow-[0_25px_55px_rgba(0,0,0,0.3)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="text-[11px] font-bold text-slate-800">
              Resolution Rate
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl font-black text-slate-900">96%</span>
              <span className="text-[9px] text-emerald-600 font-bold">▲ +14%</span>
            </div>
          </div>

          <div className="w-16 h-16 mx-auto relative flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeDasharray="96, 100"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-slate-700">
              96%
            </span>
          </div>

          <div className="text-[9px] text-slate-400 text-center font-medium">
            Zero hold times
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 8: Multilingual Dialect & Accent Engine (18+ Languages) */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[8] = el; }}
          onClick={() => rotateToCard(8)}
          className="absolute w-44 sm:w-50 h-60 sm:h-70 rounded-2xl p-4 shadow-[0_24px_50px_rgba(99,102,241,0.3)] border-2 border-white/70 flex flex-col justify-between text-white cursor-pointer will-change-transform"
          style={{
            background: "linear-gradient(145deg, #4f46e5 0%, #312e81 100%)"
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-300" />
                Polyglot Voice
              </span>
              <span className="text-[9px] bg-white/20 font-mono px-1.5 py-0.5 rounded border border-white/25">
                18+ Langs
              </span>
            </div>
            <p className="text-[11px] text-indigo-100 font-normal leading-tight">
              Real-time regional dialect & accent adaptation
            </p>
          </div>

          <div className="space-y-1.5 py-2">
            <div className="flex flex-wrap gap-1">
              <span className="text-[9px] bg-white/15 px-2 py-0.5 rounded-full font-semibold">English</span>
              <span className="text-[9px] bg-white/15 px-2 py-0.5 rounded-full font-semibold">Español</span>
              <span className="text-[9px] bg-white/15 px-2 py-0.5 rounded-full font-semibold">Hindi</span>
              <span className="text-[9px] bg-white/15 px-2 py-0.5 rounded-full font-semibold">Arabic</span>
              <span className="text-[9px] bg-white/15 px-2 py-0.5 rounded-full font-semibold">French</span>
            </div>
          </div>

          <div className="pt-2 border-t border-indigo-400/30">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-indigo-200">Code-Switching</span>
              <span className="text-[#cdfb56] font-mono font-bold">&lt; 120ms</span>
            </div>
            <div className="text-[9px] text-indigo-200/80 mt-0.5">
              Zero accent friction for applicants
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 9: Smart Human Handoff & Slate / Salesforce CRM Sync */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[9] = el; }}
          onClick={() => rotateToCard(9)}
          className="absolute w-44 sm:w-50 h-60 sm:h-70 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_24px_50px_rgba(0,0,0,0.26)] border-2 border-white transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.34)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-blue-600" />
                Smart Handoff
              </span>
              <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded">
                Warm Route
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Live transfer with auto-generated call dossier
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 space-y-1.5 border border-slate-100">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Lead Intent</span>
              <span className="font-bold text-emerald-600">High (98%)</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Escalated To</span>
              <span className="font-semibold text-slate-800">Financial Aid</span>
            </div>
            <div className="text-[9px] text-slate-400 border-t border-slate-200/60 pt-1">
              Syncs with Slate &bull; Salesforce &bull; Ellucian
            </div>
          </div>

          <div className="text-[10px] text-blue-600 font-semibold flex items-center gap-1 pt-1">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Zero student drop-off
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 10: FERPA & Institutional Compliance Vault */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[10] = el; }}
          onClick={() => rotateToCard(10)}
          className="absolute w-44 sm:w-50 h-60 sm:h-70 bg-[#0c1222]/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-[0_24px_50px_rgba(16,185,129,0.25)] border-2 border-emerald-500/40 transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(16,185,129,0.35)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Compliance Vault
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                FERPA
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Higher-ed grade enterprise student data privacy
            </p>
          </div>

          <div className="space-y-1.5 py-1 text-[10px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Zero training on applicant PII</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>256-Bit Encrypted Audio Streams</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SOC-2 Type II Certified</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/80 text-[10px] text-emerald-400 font-semibold flex items-center justify-between">
            <span>Provost Approved</span>
            <Lock className="w-3 h-3 text-emerald-400" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 11: Real-Time Merit & Scholarship Calculator */}
        {/* ========================================================================= */}
        <div
          ref={(el) => { cardRefs.current[11] = el; }}
          onClick={() => rotateToCard(11)}
          className="absolute w-44 sm:w-50 h-60 sm:h-70 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_24px_50px_rgba(0,0,0,0.26)] border-2 border-white transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.34)] flex flex-col justify-between cursor-pointer will-change-transform"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Merit & Aid Engine
              </span>
              <span className="text-[9px] bg-[#cdfb56]/30 text-slate-900 font-extrabold px-1.5 py-0.5 rounded border border-[#cdfb56]">
                Instant
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-snug">
              Real-time tuition grant calculation on call
            </p>
          </div>

          <div className="bg-amber-50/60 rounded-xl p-2.5 border border-amber-100 space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Applicant Score</span>
              <span className="font-bold text-slate-800">CBSE 94% / SAT 1480</span>
            </div>
            <div className="flex items-baseline justify-between pt-0.5">
              <span className="text-[10px] text-slate-500">Matched Grant</span>
              <span className="text-sm font-black text-amber-600">$14,500 / yr</span>
            </div>
            <div className="w-full h-1 bg-amber-200 rounded-full overflow-hidden mt-1">
              <div className="w-[88%] h-full bg-amber-500 rounded-full" />
            </div>
          </div>

          <div className="text-[10px] text-amber-700 font-semibold flex items-center justify-between pt-1">
            <span>Dean Fellow Qualified</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Interactive Controls & Navigation Pills */}
      <div className="mt-3 flex items-center gap-3 z-30">
        {/* Left Arrow Button */}
        <button
          onClick={() => rotateStep("left")}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 active:scale-90 border border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Rotate Previous Card"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Circular Wheel Prompt Pill */}
        <div className="dynamic-island-glass rounded-full px-4 py-1.5 flex items-center gap-2 text-white text-[11px] font-semibold border border-white/35 shadow-sm">
          <RotateCw className="w-3 h-3 text-[#cdfb56] animate-spin" style={{ animationDuration: "6s" }} />
          <span>Use mouse wheel or drag to spin all 12 feature cards in 3D</span>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => rotateStep("right")}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 active:scale-90 border border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Rotate Next Card"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Under Arc: Client Rating & Stars */}
      <div className="mt-4 flex flex-col items-center gap-1.5 z-20">
        <span className="text-white font-medium text-xs sm:text-[13px] tracking-wide drop-shadow-sm">
          Rated 4.9/5 by 120+ Universities & Colleges
        </span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fbbf24] fill-[#fbbf24] drop-shadow-[0_1px_4px_rgba(251,191,36,0.5)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
