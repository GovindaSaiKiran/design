"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, PhoneCall, Menu, X, ChevronRight, Zap } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenSimulator: () => void;
}

export default function Navbar({ onOpenDemo, onOpenSimulator }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Meet Maya", href: "#ai-agent" },
    { label: "Knowledge RAG", href: "#knowledge" },
    { label: "Call Intelligence", href: "#intelligence" },
    { label: "Analytics", href: "#analytics" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-[#fffdf5]/95 backdrop-blur-md py-2.5 border-b-3 border-black shadow-[0_4px_0px_#000000]"
          : "bg-[#fffdf5] py-4 border-b-3 border-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Neo-Brutalist Badge */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={() => soundSynth.playClick()}
        >
          <div className="w-10 h-10 rounded-lg bg-[#ffe600] border-2 border-black flex items-center justify-center text-black font-syne font-black text-base shadow-[3px_3px_0px_#000] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[4px_4px_0px_#000] transition-all">
            <span className="tracking-tighter">EV</span>
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-black text-black tracking-tight text-lg sm:text-xl flex items-center gap-1">
              EDU<span className="text-[#ff53cd] font-black">•</span>VOICE<span className="bg-[#00f0ff] text-black border border-black px-1.5 py-0.2 rounded text-[11px] font-space font-extrabold ml-1 shadow-[1px_1px_0px_#000]">AI</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav Links with Neo Pill styling */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 font-space">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs lg:text-[13px] font-bold text-black hover:bg-[#ffe600] hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_#000] transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action CTA Buttons with hard offset shadows */}
        <div className="hidden sm:flex items-center gap-3 font-space">
          <button
            onClick={() => {
              soundSynth.playClick();
              onOpenSimulator();
            }}
            className="neo-btn neo-btn-cyan px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            Test Maya Voice
          </button>

          <button
            onClick={() => {
              soundSynth.playClick();
              onOpenDemo();
            }}
            className="text-xs lg:text-sm font-bold text-black px-2.5 py-1.5 hover:underline cursor-pointer"
          >
            Sign In
          </button>

          <button
            onClick={() => {
              soundSynth.playClick();
              onOpenDemo();
            }}
            className="neo-btn neo-btn-primary px-4 py-2 rounded-xl text-xs lg:text-sm font-black flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Book a Demo
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={() => {
              soundSynth.playClick();
              onOpenDemo();
            }}
            className="neo-btn neo-btn-primary px-3 py-1.5 rounded-lg text-xs font-black font-space"
          >
            Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_#000]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#fffdf5] border-t-2 border-b-3 border-black px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 font-space shadow-[0_4px_0px_#000]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-black hover:bg-[#ffe600] border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t-2 border-black flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSimulator();
              }}
              className="w-full neo-btn neo-btn-cyan py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Test Maya Live Voice
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full neo-btn neo-btn-primary py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2"
            >
              Book a Demo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
