"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  PhoneCall,
  Activity,
  CheckCircle2,
  Sparkles,
  Radio,
  Calculator,
  Layers,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

interface NavbarProps {
  onOpenDemo?: () => void;
  onOpenSimulator?: () => void;
}

export default function Navbar({ onOpenDemo, onOpenSimulator }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTelemetryPopup, setShowTelemetryPopup] = useState(false);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Smooth scroll listener with RAF throttle and hysteresis to eliminate threshold jitter
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y > 30) {
            setIsScrolled(true);
          } else if (y < 10) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        telemetryRef.current &&
        !telemetryRef.current.contains(event.target as Node)
      ) {
        setShowTelemetryPopup(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const useCases = [
    {
      title: "Campus Admissions Counseling",
      desc: "Sub-400ms multilingual voice for student inquiries & lead nurture",
      icon: GraduationCap,
      href: "#capabilities",
    },
    {
      title: "Institutional Knowledge RAG",
      desc: "Instant grounding on syllabus, fees, dates & campus guidelines",
      icon: Layers,
      href: "#capabilities",
    },
    {
      title: "24/7 AI Telephony Fleet",
      desc: "Zero dropped calls with automated human counselor escalation",
      icon: Radio,
      href: "#about",
    },
    {
      title: "Admissions ROI Calculator",
      desc: "Calculate yield improvement and operational cost savings",
      icon: Calculator,
      href: "#calculator",
    },
    {
      title: "FERPA & DPDP Compliance",
      desc: "Enterprise data sovereignty & audited student privacy protection",
      icon: ShieldCheck,
      href: "#pricing",
    },
  ];

  return (
    <header className="fixed top-[calc(1.25rem+6mm)] sm:top-[calc(1.5rem+6mm)] lg:top-[calc(1.75rem+6mm)] inset-x-0 z-50 flex flex-col items-center px-3 sm:px-4 lg:px-6 pointer-events-none select-none">
      {/* ========================================================================= */}
      {/* MASTER DYNAMIC ISLAND CAPSULE (CONTINUOUS GPU LINEAR INTERPOLATION)       */}
      {/* ========================================================================= */}
      <div
        className={`dynamic-island-shell pointer-events-auto rounded-full flex items-center justify-between shadow-2xl flex-nowrap shrink-0 w-full ${
          isScrolled
            ? "dynamic-island-scrolled max-w-[96vw] lg:max-w-[1360px] xl:max-w-[1440px] pl-4 sm:pl-6 lg:pl-8 pr-5 sm:pr-7 lg:pr-9 py-2 sm:py-2.5 text-slate-900 gap-2 sm:gap-4 lg:gap-6"
            : "dynamic-island-hero max-w-[94vw] lg:max-w-[1080px] xl:max-w-[1160px] 2xl:max-w-[1240px] pl-3.5 sm:pl-5 lg:pl-6 pr-5 sm:pr-7 lg:pr-8 py-1.5 sm:py-2 text-white gap-1.5 sm:gap-3 lg:gap-4"
        }`}
      >
        {/* ===================================================================== */}
        {/* 1. LEFT ZONE: Brand Logo & Interactive Live Voice Beacon              */}
        {/* ===================================================================== */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pl-0.5 flex-nowrap">
          {/* Brand Mark */}
          <Link
            href="/"
            className="flex items-center gap-1.5 group/brand focus:outline-none whitespace-nowrap shrink-0"
            title="VoicePilot AI Homepage"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 relative flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm transition-transform duration-300 group-hover/brand:scale-110"
              >
                <path
                  d="M5 26L16 6L21 15.5L13 22L5 26Z"
                  fill={isScrolled ? "#0f172a" : "white"}
                  fillOpacity="0.95"
                />
                <path
                  d="M16 6L27 26L19 23L16 16.5L16 6Z"
                  fill="#0284c7"
                  fillOpacity="1"
                />
                <path
                  d="M13 22L19 23L16 26L13 22Z"
                  fill="#38bdf8"
                  fillOpacity="1"
                />
              </svg>
            </div>
            <span
              className={`font-extrabold text-xs sm:text-sm tracking-tight flex items-center gap-1 whitespace-nowrap transition-colors duration-500 ${
                isScrolled ? "text-slate-950" : "text-white"
              }`}
            >
              VoicePilot
              <span className="text-[#0a3d1b] bg-[#cdfb56] text-[8px] sm:text-[9px] font-black tracking-widest px-1 py-0.5 rounded shadow-xs">
                AI
              </span>
            </span>
          </Link>

          {/* Vertical Hairline Divider */}
          <div
            className={`hidden sm:block w-px mx-0.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
              isScrolled ? "h-4.5 bg-slate-900/15 mx-1" : "h-3.5 bg-white/30"
            }`}
          />

          {/* Interactive Live Voice Telemetry Pill */}
          <div className="relative shrink-0" ref={telemetryRef}>
            <button
              onClick={() => setShowTelemetryPopup(!showTelemetryPopup)}
              className={`flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold border transition-all duration-500 cursor-pointer group shadow-xs whitespace-nowrap shrink-0 ${
                isScrolled
                  ? "bg-slate-900/5 border-slate-900/10 text-slate-800 hover:bg-slate-900/10 hover:border-slate-900/20"
                  : "bg-white/18 border-white/35 text-white hover:bg-white/28 hover:border-white/50"
              }`}
              title="Click to view real-time voice latency & trunk telemetry"
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              </span>
              <span
                className={`hidden xs:inline font-medium tracking-wide whitespace-nowrap transition-colors duration-500 ${
                  isScrolled ? "text-slate-800" : "text-white"
                }`}
              >
                Live Voice
              </span>

              {/* 4-Bar Audio Equalizer Waveform */}
              <div className="flex items-end gap-0.5 h-2.5 sm:h-3 ml-0.5 shrink-0">
                <span className="w-0.5 h-1.5 rounded-full bg-emerald-500 animate-audio-bar-1" />
                <span className="w-0.5 h-3 rounded-full bg-emerald-500 animate-audio-bar-2" />
                <span className="w-0.5 h-2 rounded-full bg-emerald-500 animate-audio-bar-3" />
                <span className="w-0.5 h-2.5 rounded-full bg-emerald-500 animate-audio-bar-4" />
              </div>
            </button>

            {/* Dynamic Island Expansion Cockpit (HUD) */}
            {showTelemetryPopup && (
              <div
                className={`absolute top-full left-0 mt-3 w-80 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 border ${
                  isScrolled
                    ? "bg-white/96 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                    : "bg-[#0d4585]/95 backdrop-blur-2xl border-white/35 text-white shadow-2xl"
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-2.5 mb-3 ${
                    isScrolled ? "border-slate-200" : "border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <Activity
                      className={`w-3.5 h-3.5 ${
                        isScrolled ? "text-emerald-600" : "text-emerald-400"
                      }`}
                    />
                    <span className={isScrolled ? "text-slate-900" : "text-white"}>
                      Maya Telemetry Matrix
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold flex items-center gap-1 ${
                      isScrolled
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-emerald-500/25 text-emerald-300 border-emerald-400/40"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    99.8% Uptime
                  </span>
                </div>

                <div className="space-y-2.5 text-[11px]">
                  <div
                    className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg border ${
                      isScrolled
                        ? "bg-slate-50 border-slate-200 text-slate-700"
                        : "bg-white/10 border-white/10 text-white/80"
                    }`}
                  >
                    <span>Turn Latency (Speech-to-Speech)</span>
                    <span
                      className={`font-mono font-bold ${
                        isScrolled ? "text-indigo-600" : "text-[#cdfb56]"
                      }`}
                    >
                      382 ms
                    </span>
                  </div>
                  <div
                    className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg border ${
                      isScrolled
                        ? "bg-slate-50 border-slate-200 text-slate-700"
                        : "bg-white/10 border-white/10 text-white/80"
                    }`}
                  >
                    <span>Concurrent SIP Admissions Trunks</span>
                    <span
                      className={`font-semibold ${
                        isScrolled ? "text-slate-900" : "text-white"
                      }`}
                    >
                      14 Channels Active
                    </span>
                  </div>
                  <div
                    className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg border ${
                      isScrolled
                        ? "bg-slate-50 border-slate-200"
                        : "bg-white/10 border-white/10"
                    }`}
                  >
                    <span
                      className={`${
                        isScrolled ? "text-emerald-700" : "text-emerald-300"
                      } flex items-center gap-1 font-semibold`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Enforced
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowTelemetryPopup(false);
                    onOpenSimulator?.();
                  }}
                  className="w-full mt-3.5 bg-[#cdfb56] hover:bg-[#bef03f] active:scale-98 text-slate-950 text-[11px] font-black uppercase tracking-wider py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(205,251,86,0.3)] cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Launch Live Voice Simulator
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. CENTER ZONE: Navigation Pills (Desktop)                            */}
        {/* ===================================================================== */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-0.5 flex-nowrap shrink-0">
          <Link
            href="/"
            className={`text-[10px] xl:text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 active:scale-95 px-2.5 xl:px-3 py-1 whitespace-nowrap shrink-0 ${
              isScrolled
                ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                : "text-white/90 hover:text-white hover:bg-white/20"
            }`}
          >
            OVERVIEW
          </Link>
          <a
            href="#indic-tts"
            className={`text-[10px] xl:text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 active:scale-95 px-2.5 xl:px-3 py-1 whitespace-nowrap shrink-0 ${
              isScrolled
                ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                : "text-white/90 hover:text-white hover:bg-white/20"
            }`}
          >
            INDIC TTS
          </a>
          <a
            href="#capabilities"
            className={`text-[10px] xl:text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 active:scale-95 px-2.5 xl:px-3 py-1 whitespace-nowrap shrink-0 ${
              isScrolled
                ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                : "text-white/90 hover:text-white hover:bg-white/20"
            }`}
          >
            CAPABILITIES
          </a>
          <a
            href="#about"
            className={`text-[10px] xl:text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 active:scale-95 px-2.5 xl:px-3 py-1 whitespace-nowrap shrink-0 ${
              isScrolled
                ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                : "text-white/90 hover:text-white hover:bg-white/20"
            }`}
          >
            HOW IT WORKS
          </a>

          {/* USE CASES Dropdown Menu */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`flex items-center gap-1 text-[10px] xl:text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer focus:outline-none active:scale-95 px-2.5 xl:px-3 py-1 whitespace-nowrap shrink-0 ${
                isScrolled
                  ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                  : "text-white/90 hover:text-white hover:bg-white/20"
              }`}
            >
              <span>USE CASES</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 shrink-0 ${
                  dropdownOpen
                    ? isScrolled
                      ? "rotate-180 text-blue-600"
                      : "rotate-180 text-[#cdfb56]"
                    : isScrolled
                    ? "text-slate-500"
                    : "text-white/70"
                }`}
              />
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl p-2.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 border ${
                  isScrolled
                    ? "bg-white/96 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-[0_24px_50px_rgba(15,23,42,0.18)]"
                    : "bg-[#0d4585]/95 backdrop-blur-2xl border-white/35 text-white"
                }`}
              >
                <div
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border-b mb-1.5 ${
                    isScrolled
                      ? "text-blue-700 border-slate-200/80"
                      : "text-[#cdfb56] border-white/15"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  Higher Ed Voice Solutions
                </div>
                {useCases.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-start gap-2.5 px-3 py-2 rounded-xl text-left transition-all duration-200 group ${
                        isScrolled
                          ? "text-slate-800 hover:bg-slate-100/90"
                          : "text-white hover:bg-white/15"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isScrolled
                            ? "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                            : "bg-white/15 text-[#cdfb56] group-hover:bg-[#cdfb56]/25"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs font-bold transition-colors flex items-center justify-between ${
                            isScrolled
                              ? "text-slate-900 group-hover:text-blue-600"
                              : "text-white group-hover:text-[#cdfb56]"
                          }`}
                        >
                          <span>{item.title}</span>
                          <ArrowUpRight
                            className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                              isScrolled ? "text-blue-600" : "text-[#cdfb56]"
                            }`}
                          />
                        </div>
                        <p
                          className={`text-[11px] line-clamp-1 mt-0.5 ${
                            isScrolled ? "text-slate-500" : "text-white/75"
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. RIGHT ZONE: Action Capsule (Desktop)                               */}
        {/* ===================================================================== */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0 pr-0.5 flex-nowrap">
          {/* Test Maya Simulator Button */}
          <button
            onClick={onOpenSimulator}
            className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-wider px-2.5 xl:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1 active:scale-95 shadow-xs whitespace-nowrap shrink-0 ${
              isScrolled
                ? "bg-slate-900/5 hover:bg-slate-900/10 text-slate-800 border-slate-900/15 hover:border-slate-900/25"
                : "bg-white/15 hover:bg-white/25 text-white border-white/30 hover:border-white/45"
            }`}
            title="Interact with Maya in the real-time audio playground"
          >
            <PhoneCall className={`w-3 h-3 shrink-0 ${isScrolled ? "text-blue-600" : "text-[#cdfb56]"}`} />
            <span>TEST MAYA</span>
          </button>

          {/* Book Institutional Demo CTA */}
          <button
            onClick={onOpenDemo}
            className="bg-[#cdfb56] hover:bg-[#bef03f] active:scale-95 text-slate-950 text-[10px] xl:text-[11px] font-black uppercase tracking-wider px-2.5 xl:px-3.5 py-1 sm:py-1.5 rounded-full shadow-[0_0_18px_rgba(205,251,86,0.35)] hover:shadow-[0_0_24px_rgba(205,251,86,0.55)] transition-all duration-300 cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>BOOK DEMO</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.5] shrink-0" />
          </button>

          {/* Dashboard Direct Link */}
          <a
            href="/dashboard"
            className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-wider px-2.5 xl:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-300 cursor-pointer active:scale-95 shadow-xs whitespace-nowrap shrink-0 ${
              isScrolled
                ? "bg-slate-900 text-white hover:bg-slate-800 border-slate-900 shadow-sm"
                : "bg-white/12 hover:bg-white/22 text-white border-white/25 hover:border-white/40"
            }`}
            title="Open VoicePilot Operations Command Center"
          >
            DASHBOARD
          </a>
        </div>

        {/* ===================================================================== */}
        {/* 4. MOBILE ACTIONS & MENU TOGGLE                                       */}
        {/* ===================================================================== */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0 pr-1 flex-nowrap">
          <button
            onClick={onOpenSimulator}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
              isScrolled
                ? "bg-slate-900/5 text-slate-800 border-slate-900/15 hover:bg-slate-900/10"
                : "text-white bg-white/18 border-white/30 hover:bg-white/28"
            }`}
          >
            <PhoneCall className={`w-3 h-3 shrink-0 ${isScrolled ? "text-blue-600" : "text-[#cdfb56]"}`} />
            <span>TEST</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-full transition-colors cursor-pointer active:scale-95 border shrink-0 ${
              isScrolled
                ? "bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 border-slate-900/15"
                : "bg-white/15 hover:bg-white/25 text-white border-white/30"
            }`}
            aria-label="Toggle Dynamic Island Menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-4 h-4 ${isScrolled ? "text-slate-950" : "text-[#cdfb56]"}`} />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. MOBILE EXPANDABLE DYNAMIC ISLAND DRAWER                                */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto w-full max-w-[94vw] sm:max-w-md mx-auto mt-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <div
            className={`rounded-3xl p-5 shadow-2xl space-y-4 border ${
              isScrolled
                ? "bg-white/96 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-[0_24px_50px_rgba(15,23,42,0.18)]"
                : "bg-[#0d4585]/95 backdrop-blur-2xl border-white/35 text-white shadow-2xl"
            }`}
          >
            {/* Quick Links */}
            <div className="flex flex-col gap-1 font-semibold text-xs uppercase tracking-wider">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                  isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/20"
                }`}
              >
                <span>OVERVIEW</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isScrolled ? "text-slate-400" : "text-white/60"}`} />
              </Link>
              <a
                href="#indic-tts"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                  isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/20"
                }`}
              >
                <span>INDIC TTS</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isScrolled ? "text-slate-400" : "text-white/60"}`} />
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                  isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/20"
                }`}
              >
                <span>CAPABILITIES</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isScrolled ? "text-slate-400" : "text-white/60"}`} />
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                  isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/20"
                }`}
              >
                <span>HOW IT WORKS</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isScrolled ? "text-slate-400" : "text-white/60"}`} />
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                  isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/20"
                }`}
              >
                <span>ADMISSIONS ROI CALCULATOR</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isScrolled ? "text-slate-400" : "text-white/60"}`} />
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                  isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/20"
                }`}
              >
                <span>CAMPUS PRICING</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isScrolled ? "text-slate-400" : "text-white/60"}`} />
              </a>
              <a
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3.5 rounded-xl font-bold transition-colors flex items-center justify-between ${
                  isScrolled
                    ? "text-blue-600 hover:bg-blue-50"
                    : "text-[#cdfb56] hover:bg-white/20"
                }`}
              >
                <span>OPERATIONS DASHBOARD</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile CTAs */}
            <div className={`pt-3 border-t flex flex-col gap-2 ${isScrolled ? "border-slate-200" : "border-white/20"}`}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSimulator?.();
                }}
                className={`w-full font-bold py-2.5 rounded-full text-center transition-all flex items-center justify-center gap-2 border text-xs uppercase tracking-wider shadow-xs ${
                  isScrolled
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-200"
                    : "bg-white/20 hover:bg-white/30 text-white border-white/35"
                }`}
              >
                <PhoneCall className={`w-3.5 h-3.5 ${isScrolled ? "text-blue-600" : "text-[#cdfb56]"}`} />
                <span>TEST MAYA VOICE</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo?.();
                }}
                className="w-full bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 font-black py-2.5 rounded-full text-center transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(205,251,86,0.4)]"
              >
                <span>BOOK INSTITUTIONAL DEMO</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
