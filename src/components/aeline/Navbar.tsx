"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowUpRight, Sparkles, PhoneCall, Radio, Activity, CheckCircle2 } from "lucide-react";

interface NavbarProps {
  onOpenDemo?: () => void;
  onOpenSimulator?: () => void;
}

export default function Navbar({ onOpenDemo, onOpenSimulator }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTelemetryPopup, setShowTelemetryPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-50 pointer-events-none transition-all duration-300 ${
        isScrolled ? "top-3 sm:top-4" : "top-6 sm:top-8 lg:top-10"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-3 sm:px-6 w-full flex items-center justify-between gap-2">
        {/* ========================================================================= */}
        {/* 1. LEFT DYNAMIC ISLAND: Brand Logo + Real-Time Telephony Status */}
        {/* ========================================================================= */}
        <div className="pointer-events-auto relative group/island">
          <div
            className={`dynamic-island-glass rounded-full px-3.5 sm:px-4 py-2 flex items-center gap-2.5 sm:gap-3 cursor-pointer ${
              isScrolled ? "dynamic-island-scrolled" : ""
            }`}
            onClick={() => setShowTelemetryPopup(!showTelemetryPopup)}
            onMouseEnter={() => setShowTelemetryPopup(true)}
            onMouseLeave={() => setShowTelemetryPopup(false)}
          >
            {/* Origami Sound-Wave A Brand Mark */}
            <Link
              href="/"
              className="flex items-center gap-2 focus:outline-none shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm transition-transform group-hover/island:scale-105 duration-200"
                >
                  <path
                    d="M5 26L16 6L21 15.5L13 22L5 26Z"
                    fill={isScrolled ? "#0f172a" : "white"}
                    fillOpacity="0.95"
                  />
                  <path
                    d="M16 6L27 26L19 23L16 16.5L16 6Z"
                    fill={isScrolled ? "#0284c7" : "white"}
                    fillOpacity={isScrolled ? "1" : "0.75"}
                  />
                  <path
                    d="M13 22L19 23L16 26L13 22Z"
                    fill={isScrolled ? "#38bdf8" : "white"}
                    fillOpacity={isScrolled ? "1" : "0.5"}
                  />
                </svg>
              </div>
              <span
                className={`font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5 transition-colors ${
                  isScrolled ? "text-slate-950" : "text-white"
                }`}
              >
                EduVoice
                <span className="text-[#0d5926] bg-[#cdfb56] text-[9px] sm:text-[10px] font-black tracking-widest px-1.5 py-0.5 rounded-md shadow-xs">
                  AI
                </span>
              </span>
            </Link>

            {/* Subtle Divider */}
            <div className={`hidden sm:block w-px h-4 ${isScrolled ? "bg-slate-300" : "bg-white/30"}`} />

            {/* Dynamic Telephony Pill with Live Audio Wave Visualizer */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold border transition-all ${
                isScrolled
                  ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-800"
                  : "bg-white/15 border-white/30 text-emerald-300"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#34d399]" />
              </span>
              <span className={`hidden xs:inline tracking-wide ${isScrolled ? "text-slate-800" : "text-white"}`}>
                Live Voice
              </span>

              {/* 4-Bar Audio Equalizer Waveform */}
              <div className="flex items-end gap-0.5 h-3 ml-0.5" title="Sub-400ms Voice Telephony Active">
                <span className={`w-0.5 h-1.5 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] ${isScrolled ? "bg-emerald-600" : "bg-emerald-400"}`} />
                <span className={`w-0.5 h-3 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] ${isScrolled ? "bg-emerald-600" : "bg-emerald-400"}`} />
                <span className={`w-0.5 h-2.5 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] ${isScrolled ? "bg-emerald-600" : "bg-emerald-400"}`} />
                <span className={`w-0.5 h-1.5 rounded-full animate-[pulse_1.4s_ease-in-out_infinite] ${isScrolled ? "bg-emerald-600" : "bg-emerald-400"}`} />
              </div>
            </div>
          </div>

          {/* Dynamic Island Expansion Popup (Live Campus Telemetry) */}
          {showTelemetryPopup && (
            <div
              className={`absolute top-full left-0 mt-2.5 w-72 dynamic-island-glass rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50 pointer-events-auto ${
                isScrolled ? "bg-white/95 text-slate-900 border-slate-200 shadow-xl" : "text-white"
              }`}
            >
              <div className={`flex items-center justify-between border-b pb-2 mb-2.5 ${isScrolled ? "border-slate-200" : "border-white/20"}`}>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Maya Voice Telemetry</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-600 font-mono px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                  99.8% Uptime
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className={isScrolled ? "text-slate-500" : "text-white/70"}>Turn Latency</span>
                  <span className={`font-mono font-bold ${isScrolled ? "text-emerald-600" : "text-[#cdfb56]"}`}>382 ms</span>
                </div>
                <div className="flex justify-between">
                  <span className={isScrolled ? "text-slate-500" : "text-white/70"}>Concurrent Lines</span>
                  <span className="font-semibold">14 Admissions Trunks</span>
                </div>
                <div className="flex justify-between">
                  <span className={isScrolled ? "text-slate-500" : "text-white/70"}>FERPA Grounding</span>
                  <span className="text-emerald-500 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Enforced
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTelemetryPopup(false);
                  onOpenSimulator?.();
                }}
                className={`w-full mt-3 border text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  isScrolled
                    ? "bg-slate-900 text-white hover:bg-slate-800 border-transparent"
                    : "bg-white/20 hover:bg-white/30 border-white/30 text-white"
                }`}
              >
                <PhoneCall className="w-3 h-3 text-[#cdfb56]" />
                Launch Live Simulator
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. CENTER DYNAMIC ISLAND: Navigation Menu Capsule */}
        {/* ========================================================================= */}
        <div className="pointer-events-auto hidden md:flex items-center relative">
          <nav
            className={`dynamic-island-glass rounded-full px-2.5 py-1.5 flex items-center gap-1 ${
              isScrolled ? "dynamic-island-scrolled" : ""
            }`}
          >
            <Link
              href="/"
              className={`text-[11px] lg:text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full transition-all duration-150 active:scale-95 ${
                isScrolled
                  ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                  : "text-white hover:text-white hover:bg-white/20"
              }`}
            >
              OVERVIEW
            </Link>
            <a
              href="#capabilities"
              className={`text-[11px] lg:text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full transition-all duration-150 active:scale-95 ${
                isScrolled
                  ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                  : "text-white hover:text-white hover:bg-white/20"
              }`}
            >
              CAPABILITIES
            </a>
            <a
              href="#about"
              className={`text-[11px] lg:text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full transition-all duration-150 active:scale-95 ${
                isScrolled
                  ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                  : "text-white hover:text-white hover:bg-white/20"
              }`}
            >
              MEET MAYA
            </a>

            {/* SOLUTIONS Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1 text-[11px] lg:text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full transition-all duration-150 cursor-pointer focus:outline-none active:scale-95 ${
                  isScrolled
                    ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                    : "text-white hover:text-white hover:bg-white/20"
                }`}
              >
                SOLUTIONS
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 dynamic-island-glass rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                    isScrolled ? "bg-white/95 border-slate-200 shadow-xl" : ""
                  }`}
                >
                  <a
                    href="#capabilities"
                    onClick={() => setDropdownOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors group ${
                      isScrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950" : "text-white/90 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span>Institutional Knowledge RAG</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </a>
                  <a
                    href="#capabilities"
                    onClick={() => setDropdownOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors group ${
                      isScrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950" : "text-white/90 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span>24/7 AI Telephony</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </a>
                  <a
                    href="#calculator"
                    onClick={() => setDropdownOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors group ${
                      isScrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950" : "text-white/90 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span>Admissions ROI Calculator</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => setDropdownOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors group ${
                      isScrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950" : "text-white/90 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span>Campus Pricing Plans</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </a>
                  <a
                    href="#testimonials"
                    onClick={() => setDropdownOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors group ${
                      isScrolled ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950" : "text-white/90 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <span>Dean & Registrar Feedback</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* 3. RIGHT DYNAMIC ISLAND: Test Maya & Book Demo Action Capsule */}
        {/* ========================================================================= */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Desktop Action Capsule */}
          <div
            className={`hidden md:flex items-center gap-2 dynamic-island-glass rounded-full p-1.5 pl-2.5 ${
              isScrolled ? "dynamic-island-scrolled" : ""
            }`}
          >
            <button
              onClick={onOpenSimulator}
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-150 cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95 ${
                isScrolled
                  ? "bg-slate-900/5 hover:bg-slate-900/10 text-slate-800 border-slate-900/15"
                  : "bg-white/15 hover:bg-white/25 text-white border-white/30"
              }`}
            >
              <PhoneCall className={`w-3.5 h-3.5 ${isScrolled ? "text-emerald-600" : "text-[#cdfb56]"}`} />
              <span>TEST MAYA</span>
            </button>
            <button
              onClick={onOpenDemo}
              className="bg-[#cdfb56] hover:bg-[#bef03f] active:scale-95 text-black text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-[0_0_20px_rgba(205,251,86,0.35)] hover:shadow-[0_0_26px_rgba(205,251,86,0.55)] transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <span>BOOK DEMO</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Island Action Buttons */}
          <div
            className={`flex md:hidden items-center gap-1.5 dynamic-island-glass rounded-full p-1.5 ${
              isScrolled ? "dynamic-island-scrolled" : ""
            }`}
          >
            <button
              onClick={onOpenSimulator}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border flex items-center gap-1 active:scale-95 ${
                isScrolled
                  ? "bg-slate-900/5 text-slate-800 border-slate-900/10"
                  : "bg-white/20 text-white border-white/30"
              }`}
            >
              <PhoneCall className="w-3 h-3 text-[#cdfb56]" />
              <span>TEST</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer active:scale-95 ${
                isScrolled ? "text-slate-800" : "text-white"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#cdfb56]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MOBILE DYNAMIC ISLAND FULL DRAWER */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto px-4 mt-2 max-w-md mx-auto animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="dynamic-island-glass rounded-3xl p-5 shadow-2xl text-white space-y-4">
            <div className="flex flex-col gap-2.5 font-semibold text-xs uppercase tracking-wider">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3.5 rounded-xl hover:bg-white/20 text-white transition-colors"
              >
                OVERVIEW
              </Link>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3.5 rounded-xl hover:bg-white/20 text-white transition-colors"
              >
                CAPABILITIES
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3.5 rounded-xl hover:bg-white/20 text-white transition-colors"
              >
                MEET MAYA
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3.5 rounded-xl hover:bg-white/20 text-white transition-colors"
              >
                ADMISSIONS ROI CALCULATOR
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3.5 rounded-xl hover:bg-white/20 text-white transition-colors"
              >
                CAMPUS PRICING
              </a>
            </div>

            <div className="pt-3 border-t border-white/20 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSimulator?.();
                }}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 rounded-full text-center transition-colors flex items-center justify-center gap-2 border border-white/30 text-xs uppercase tracking-wider"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#cdfb56]" />
                TEST MAYA VOICE
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo?.();
                }}
                className="w-full bg-[#cdfb56] hover:bg-[#bef03f] text-black font-extrabold py-2.5 rounded-full text-center transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(205,251,86,0.35)]"
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
