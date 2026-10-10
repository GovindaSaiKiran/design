"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Volume2,
  Bot,
  Sparkles,
  Zap,
  Tag,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  PhoneCall,
  Activity,
  CheckCircle2,
  Radio,
  Calculator,
  Layers,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenDemo?: () => void;
  onOpenSimulator?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Navbar({ onOpenDemo, onOpenSimulator }: NavbarProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTelemetryPopup, setShowTelemetryPopup] = useState(false);
  const [voiceActive, setVoiceActive] = useState(true);

  const telemetryRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollUnlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Exact chronological section order matching the page structure
  const navItems: NavItem[] = [
    { id: "overview", label: "Overview", href: "/", icon: Home },
    { id: "indic-tts", label: "Indic TTS", href: "#indic-tts", icon: Volume2 },
    { id: "work-agents", label: "Work Agents", href: "#work-agents", icon: Bot },
    { id: "how-it-works", label: "How It Works", href: "#about", icon: Sparkles },
    { id: "capabilities", label: "Capabilities", href: "#capabilities", icon: Zap },
    { id: "pricing", label: "Pricing", href: "#pricing", icon: Tag },
  ];

  // Smooth scroll handler with header offset & scrollspy lock
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    setActiveTab(item.id);

    // Lock scrollspy briefly during smooth scroll animation to prevent pill jitter
    isProgrammaticScrollRef.current = true;
    if (scrollUnlockTimeoutRef.current) {
      clearTimeout(scrollUnlockTimeoutRef.current);
    }
    scrollUnlockTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 850);

    if (item.href.startsWith("#")) {
      e.preventDefault();
      const id = item.href.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        const navHeight = 90;
        const targetPos =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    } else if (item.href === "/") {
      if (window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Structured scrollspy synchronized in chronological page order
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled(y > 20);

          if (!isProgrammaticScrollRef.current) {
            if (y < 280) {
              setActiveTab("overview");
            } else {
              // Check sections from bottom to top so the lowest visible section activates correctly
              const sections = [
                { id: "pricing", tabId: "pricing" },
                { id: "capabilities", tabId: "capabilities" },
                { id: "about", tabId: "how-it-works" },
                { id: "work-agents", tabId: "work-agents" },
                { id: "indic-tts", tabId: "indic-tts" },
              ];

              const scrollCheckPoint = y + 250;
              let found = false;
              for (const sec of sections) {
                const el = document.getElementById(sec.id);
                if (el) {
                  const top = el.offsetTop;
                  if (scrollCheckPoint >= top) {
                    setActiveTab(sec.tabId);
                    found = true;
                    break;
                  }
                }
              }
              if (!found && y < 600) {
                setActiveTab("overview");
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollUnlockTimeoutRef.current) {
        clearTimeout(scrollUnlockTimeoutRef.current);
      }
    };
  }, []);

  // Dropdown hover helpers with debounce to eliminate hover gaps
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  // Close telemetry and dropdowns on outside click
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
    {
      title: "Research & Admissions Insights",
      desc: "Higher education whitepapers, benchmarks and case studies",
      icon: BookOpen,
      href: "#blog",
    },
  ];

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-4 lg:px-6 pointer-events-none select-none">
      {/* ========================================================================= */}
      {/* MASTER CLEAN WHITE LIQUID GLASS NAVBAR CONTAINER                          */}
      {/* ========================================================================= */}
      <div
        className={cn(
          "dynamic-island-shell pointer-events-auto rounded-full flex items-center justify-between transition-all duration-300 flex-nowrap w-full relative isolate",
          // Pure Crisp White Glass Background:
          "bg-white/95 backdrop-blur-2xl border border-slate-200/90",
          "shadow-[0_4px_24px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04),inset_0_1px_1.5px_rgba(255,255,255,1)]",
          "hover:shadow-[0_8px_32px_rgba(15,23,42,0.08),0_2px_6px_rgba(15,23,42,0.04)]",
          isScrolled
            ? "max-w-[98vw] lg:max-w-[1360px] xl:max-w-[1440px] pl-4 sm:pl-5 lg:pl-6 pr-6 sm:pr-7 lg:pr-8 xl:pr-9 py-2 sm:py-2.5 text-slate-900 gap-2 lg:gap-4"
            : "max-w-[96vw] lg:max-w-[1280px] xl:max-w-[1380px] pl-4 sm:pl-5 lg:pl-6 pr-6 sm:pr-7 lg:pr-8 xl:pr-9 py-2 sm:py-2.5 text-slate-900 gap-2 lg:gap-4"
        )}
      >
        {/* Subtle Liquid Glass Specular Top Sheen */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent -z-10 opacity-90" />

        {/* ===================================================================== */}
        {/* 1. LEFT ZONE: Brand Logo & Interactive Live Voice Beacon              */}
        {/* ===================================================================== */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-nowrap z-10">
          {/* Brand Mark */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-1.5 group/brand focus:outline-none whitespace-nowrap shrink-0 cursor-pointer"
            title="Swaram AI Homepage"
          >
            <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 relative flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5.5 h-5.5 sm:w-6 sm:h-6 drop-shadow-xs transition-transform duration-300 group-hover/brand:scale-110 group-hover/brand:rotate-3"
              >
                <path
                  d="M5 26L16 6L21 15.5L13 22L5 26Z"
                  fill="#0b0f19"
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
            <span className="font-black text-xs sm:text-sm tracking-tight flex items-center gap-1 whitespace-nowrap text-slate-950 group-hover/brand:text-slate-800 transition-colors">
              Swaram
              <span className="text-[#0a3d1b] bg-[#cdfb56] text-[8.5px] sm:text-[9.5px] font-black tracking-widest px-1.5 py-0.5 rounded shadow-[0_0_12px_rgba(205,251,86,0.5)] group-hover/brand:bg-[#bef03f] transition-all">
                AI
              </span>
            </span>
          </Link>

          {/* Interactive Live Voice Telemetry Pill & Toggle */}
          <div className="relative shrink-0 ml-0.5" ref={telemetryRef}>
            <button
              onClick={() => {
                setVoiceActive(!voiceActive);
                setShowTelemetryPopup(!showTelemetryPopup);
              }}
              className="w-10 h-5 rounded-full bg-slate-100 border border-slate-200/90 p-0.5 flex items-center cursor-pointer transition-all hover:bg-slate-200/80 hover:ring-2 hover:ring-emerald-400/30 shadow-2xs"
              title="Toggle Live Voice Telemetry & Status"
              aria-label="Toggle Live Voice"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs border border-emerald-400 flex items-center justify-center transition-transform duration-300 ${
                  voiceActive ? "translate-x-0" : "translate-x-5"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full border border-emerald-500 bg-emerald-500/25 animate-pulse" />
              </div>
            </button>

            {/* Telemetry Matrix Popup HUD */}
            <AnimatePresence>
              {showTelemetryPopup && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-full left-0 mt-3 w-80 rounded-3xl p-4 shadow-2xl z-50 border bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-[0_24px_55px_rgba(15,23,42,0.18)]"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-slate-900">Maya Telemetry Matrix</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold flex items-center gap-1 bg-emerald-50 text-emerald-700 border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      99.8% Uptime
                    </span>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between items-center px-2.5 py-1.5 rounded-xl border bg-slate-50 border-slate-200/80 text-slate-700">
                      <span>Turn Latency (Speech-to-Speech)</span>
                      <span className="font-mono font-bold text-indigo-600">382 ms</span>
                    </div>
                    <div className="flex justify-between items-center px-2.5 py-1.5 rounded-xl border bg-slate-50 border-slate-200/80 text-slate-700">
                      <span>Concurrent SIP Admissions Trunks</span>
                      <span className="font-semibold text-slate-900">14 Active</span>
                    </div>
                    <div className="flex justify-between items-center px-2.5 py-1.5 rounded-xl border bg-slate-50 border-slate-200/80">
                      <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> FERPA & DPDP Grounded
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowTelemetryPopup(false);
                      onOpenSimulator?.();
                    }}
                    className="w-full mt-3 bg-[#cdfb56] hover:bg-[#bef03f] active:scale-98 text-slate-950 text-[11px] font-black uppercase tracking-wider py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(205,251,86,0.35)] cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Launch Live Voice Simulator
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. CENTER ZONE: CLEAN, CRISP NAVIGATION LINKS WITH FLOATING HOVER     */}
        {/* ===================================================================== */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 relative shrink-0 z-10"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isHovered = hoveredTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative px-2 xl:px-2.5 py-1 text-[10.5px] xl:text-[11px] tracking-wider uppercase rounded-full transition-all duration-200 select-none cursor-pointer group whitespace-nowrap",
                  isActive
                    ? "text-slate-950 font-black"
                    : "text-slate-600 hover:text-slate-950 font-bold hover:scale-[1.02]"
                )}
              >
                {/* Active Tab Accent Pill */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full bg-slate-100/90 border border-slate-200/90 -z-10 shadow-2xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}

                {/* Floating Hover Spotlight Pill */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="navbar-hover-glow"
                    className="absolute inset-0 rounded-full bg-slate-100/70 backdrop-blur-sm border border-slate-200/50 -z-10 shadow-2xs"
                    transition={{ type: "spring", stiffness: 480, damping: 36 }}
                  />
                )}

                <span className="flex items-center gap-1 transition-transform duration-200">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
                  )}
                  <span>{item.label}</span>
                </span>
              </a>
            );
          })}

          {/* USE CASES / SOLUTIONS Dropdown Item */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setHoveredTab("solutions")}
              onMouseLeave={() => setHoveredTab(null)}
              className={cn(
                "relative flex items-center gap-1 px-2 xl:px-2.5 py-1 text-[10.5px] xl:text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-200 select-none cursor-pointer group whitespace-nowrap hover:scale-[1.02]",
                dropdownOpen
                  ? "text-slate-950 font-black"
                  : "text-slate-600 hover:text-slate-950"
              )}
            >
              {dropdownOpen && (
                <motion.div
                  layoutId="navbar-active-pill"
                  className="absolute inset-0 rounded-full bg-slate-100/90 border border-slate-200/90 -z-10 shadow-2xs"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}

              {!dropdownOpen && hoveredTab === "solutions" && (
                <motion.div
                  layoutId="navbar-hover-glow"
                  className="absolute inset-0 rounded-full bg-slate-100/70 backdrop-blur-sm border border-slate-200/50 -z-10 shadow-2xs"
                  transition={{ type: "spring", stiffness: 480, damping: 36 }}
                />
              )}

              <span>Solutions</span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-all duration-200 shrink-0",
                  dropdownOpen
                    ? "text-slate-950 rotate-180"
                    : "text-slate-500 group-hover:text-slate-950 group-hover:translate-y-0.5"
                )}
              />
            </button>

            {/* Dropdown Menu Card */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-84 rounded-3xl p-2.5 shadow-2xl z-50 border bg-white/95 backdrop-blur-2xl border-slate-200/90 text-slate-900 shadow-[0_24px_55px_rgba(15,23,42,0.18)]"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 mb-1.5 text-blue-700">
                    <Sparkles className="w-3 h-3" />
                    Higher Ed Voice Solutions
                  </div>
                  {useCases.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={(e) => {
                          setDropdownOpen(false);
                          handleNavClick(e, {
                            id: "solutions",
                            label: item.title,
                            href: item.href,
                            icon: GraduationCap,
                          });
                        }}
                        className="flex items-start gap-2.5 px-3 py-2 rounded-2xl text-left transition-all duration-200 group text-slate-800 hover:bg-slate-100/90 hover:scale-[1.01] hover:translate-x-1 cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold transition-colors flex items-center justify-between text-slate-900 group-hover:text-blue-600">
                            <span>{item.title}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-600" />
                          </div>
                          <p className="text-[11px] line-clamp-1 mt-0.5 text-slate-500">
                            {item.desc}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ===================================================================== */}
        {/* 3. RIGHT ZONE: Action Buttons (Desktop with Tactile Hover)             */}
        {/* ===================================================================== */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0 flex-nowrap z-10 mr-1 sm:mr-2">
          {/* Test Maya Simulator Button */}
          <button
            onClick={onOpenSimulator}
            className="text-[10px] xl:text-[10.5px] font-bold uppercase tracking-wider px-2.5 xl:px-3 py-1.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 hover:shadow-sm text-slate-800 hover:text-slate-950 hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-2xs whitespace-nowrap shrink-0 group"
            title="Interact with Maya in the real-time audio playground"
          >
            <PhoneCall className="w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 text-[#0284c7] group-hover:scale-115 group-hover:rotate-12 transition-transform duration-200" />
            <span>TEST MAYA</span>
          </button>

          {/* Book Institutional Demo CTA */}
          <LiquidButton
            onClick={onOpenDemo}
            size="sm"
            className="rounded-full bg-slate-950 hover:bg-slate-900 text-white border border-slate-950 text-[10px] xl:text-[10.5px] font-bold uppercase tracking-wider px-3 xl:px-3.5 py-1.5 shadow-sm hover:shadow-[0_0_25px_rgba(205,251,86,0.45)] hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 group"
          >
            <span className="flex items-center gap-1">
              <span>BOOK DEMO</span>
              <ArrowUpRight className="w-3 h-3 xl:w-3.5 xl:h-3.5 stroke-[2.5] shrink-0 text-[#cdfb56] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-200" />
            </span>
          </LiquidButton>

          {/* Dashboard Direct Link */}
          <Link
            href="/dashboard"
            className="text-[10px] xl:text-[10.5px] font-bold uppercase tracking-wider px-2.5 xl:px-3 py-1.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 hover:shadow-sm text-slate-800 hover:text-slate-950 hover:scale-[1.03] transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs whitespace-nowrap shrink-0 flex items-center group"
            title="Open Swaram Operations Command Center"
          >
            <span>DASHBOARD</span>
          </Link>
        </div>

        {/* ===================================================================== */}
        {/* 4. MOBILE ACTIONS & MENU TOGGLE                                       */}
        {/* ===================================================================== */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0 pr-0.5 flex-nowrap z-10">
          <button
            onClick={onOpenSimulator}
            className="text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
          >
            <PhoneCall className="w-3 h-3 shrink-0 text-blue-600" />
            <span>TEST</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full transition-colors cursor-pointer active:scale-95 border shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-slate-950" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* ===================================================================== */}
        {/* 5. TURBULENT SVG OPTICAL LIQUID GLASS FILTER DEFINITION               */}
        {/* ===================================================================== */}
        <NavbarGlassFilter />
      </div>

      {/* ========================================================================= */}
      {/* 6. MOBILE EXPANDABLE DRAWER (IN SEQUENTIAL WEBSITE ORDER)                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto w-full max-w-[94vw] sm:max-w-md mx-auto mt-2"
          >
            <div className="rounded-3xl p-4 shadow-2xl space-y-3 border bg-white/95 backdrop-blur-2xl border-slate-200 text-slate-900 shadow-[0_24px_55px_rgba(15,23,42,0.18)] max-h-[82vh] overflow-y-auto">
              {/* Quick Navigation Links in Exact Page Order */}
              <div className="flex flex-col gap-1 font-semibold text-xs uppercase tracking-wider">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleNavClick(e, item);
                      }}
                      className={cn(
                        "py-2 px-3.5 rounded-2xl transition-colors flex items-center justify-between cursor-pointer",
                        activeTab === item.id
                          ? "bg-slate-950 text-white font-bold"
                          : "text-slate-800 hover:bg-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 opacity-80" />
                        <span>{`${idx + 1}. ${item.label.toUpperCase()}`}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  );
                })}

                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3.5 rounded-2xl font-bold transition-colors flex items-center justify-between text-blue-600 hover:bg-blue-50 mt-1"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>OPERATIONS DASHBOARD</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Mobile CTAs */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSimulator?.();
                  }}
                  className="w-full font-bold py-2 rounded-full text-center transition-all flex items-center justify-center gap-2 border text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-200 shadow-xs cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  <span>TEST MAYA VOICE</span>
                </button>
                <LiquidButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDemo?.();
                  }}
                  className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black py-2.5 rounded-full text-center transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(205,251,86,0.35)] cursor-pointer"
                >
                  <span>BOOK INSTITUTIONAL DEMO</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-[#cdfb56]" />
                </LiquidButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavbarGlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="navbar-liquid-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate subtle turbulent noise for fluid optical glass warping */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.04"
            numOctaves="1"
            seed="2"
            result="turbulence"
          />

          {/* Soft blur pattern */}
          <feGaussianBlur in="turbulence" stdDeviation="1.5" result="blurredNoise" />

          {/* Displace the background graphic through the turbulent pattern */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="35"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />

          {/* Final optical glass smoothing */}
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
