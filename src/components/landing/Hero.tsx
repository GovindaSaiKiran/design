"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Phone, ArrowRight, Play, Shield, Activity, Users } from "lucide-react";
import SceneContainer from "../three/SceneContainer";
import MayaCore from "../three/MayaCore";
import { soundSynth } from "@/lib/audio-synth";

interface HeroProps {
  onOpenDemo: () => void;
  onOpenSimulator: () => void;
}

export default function Hero({ onOpenDemo, onOpenSimulator }: HeroProps) {
  const [callState, setCallState] = useState<"idle" | "incoming" | "connected" | "answering">("connected");
  const [activeCallNumber, setActiveCallNumber] = useState("+91 98401 22340");
  const [activeQuery, setActiveQuery] = useState("NRI Quota & Hostel Booking");

  const simulatedCallList = [
    { number: "+91 98401 22340", query: "NRI Quota & Hostel Booking" },
    { number: "040-459-01132", query: "B.Tech CSE Fee & Merit Slabs" },
    { number: "+91 81290 44512", query: "CAT Cutoff for MBA FinTech" },
    { number: "+91 94451 90871", query: "Campus Visit & Direct Dean Escalation" }
  ];

  // Micro-interaction: Simulated incoming calls rotation
  useEffect(() => {
    let callIdx = 0;
    const interval = setInterval(() => {
      callIdx = (callIdx + 1) % simulatedCallList.length;
      setCallState("incoming");
      setActiveCallNumber(simulatedCallList[callIdx].number);
      setActiveQuery(simulatedCallList[callIdx].query);

      setTimeout(() => {
        setCallState("connected");
        soundSynth.playCallChime();

        setTimeout(() => {
          setCallState("answering");
        }, 800);
      }, 1000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#fffdf5] bg-neo-dots">
      {/* Decorative Neo-Brutalist Floating Badges/Stickers */}
      <div className="absolute top-24 right-10 hidden xl:block z-0 pointer-events-none animate-wiggle">
        <div className="bg-[#a3e635] text-black border-2 border-black font-space font-black text-xs px-3 py-1.5 shadow-[4px_4px_0px_#000] rotate-6">
          ⚡ 24/7 LIVE AI TELEPHONY
        </div>
      </div>
      <div className="absolute bottom-16 left-8 hidden xl:block z-0 pointer-events-none">
        <div className="bg-[#ff53cd] text-white border-2 border-black font-space font-black text-xs px-3 py-1.5 shadow-[4px_4px_0px_#000] -rotate-3">
          🎯 96% INSTANT RESOLUTION
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Status / Trust Badge with Neo-Brutalist Sticker Style */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#ffe600] border-2 border-black text-xs font-space font-black text-black shadow-[3px_3px_0px_#000] mb-6 rotate-[-1deg] hover:rotate-0 transition-transform">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
              </span>
              <span>AI Admissions • Voice • Intelligence</span>
              <span className="text-black font-black">/</span>
              <span className="text-black font-bold hidden sm:inline">Zero Hold Times</span>
            </div>

            {/* Main Headline with Neo-Brutal High-Impact Styling */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.08]">
              Your AI Admissions Team, <br />
              <span className="bg-[#ffe600] text-black border-3 border-black px-3 py-0.5 shadow-[5px_5px_0px_#000] inline-block font-serif-editorial italic font-normal mt-2 rotate-[-0.5deg]">
                Always Ready to Answer.
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="mt-6 text-base sm:text-lg text-slate-800 leading-relaxed max-w-2xl font-sans font-medium">
              Edu-Voice-Ai answers admission calls, understands student questions, captures qualified leads, and connects prospects with your team when human help is needed.
            </p>

            {/* Neo-Brutal CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto font-space">
              <button
                onClick={() => {
                  soundSynth.playClick();
                  onOpenDemo();
                }}
                className="neo-btn neo-btn-primary px-7 py-4 rounded-xl text-base font-black flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
                Book an Institutional Demo
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundSynth.playClick();
                  onOpenSimulator();
                }}
                className="neo-btn bg-[#00f0ff] hover:bg-[#00d4e3] text-black px-6 py-4 rounded-xl text-base font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-black fill-black" />
                Test Maya Live Voice
              </button>
            </div>

            {/* Key Capabilities List with Neo-Brutal Boxes */}
            <div className="mt-10 pt-8 border-t-3 border-black grid grid-cols-3 gap-3.5 w-full max-w-xl text-left font-space">
              <div className="bg-[#c084fc] p-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-1.5 text-black font-syne font-black text-base">
                  <Activity className="w-4 h-4" />
                  &lt;600ms
                </div>
                <div className="text-[11px] text-black font-bold mt-0.5">Voice Latency</div>
              </div>
              <div className="bg-[#a3e635] p-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-1.5 text-black font-syne font-black text-base">
                  <Shield className="w-4 h-4" />
                  100%
                </div>
                <div className="text-[11px] text-black font-bold mt-0.5">Zero Hallucination</div>
              </div>
              <div className="bg-[#38bdf8] p-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-1.5 text-black font-syne font-black text-base">
                  <Users className="w-4 h-4" />
                  24/7/365
                </div>
                <div className="text-[11px] text-black font-bold mt-0.5">Always Online</div>
              </div>
            </div>
          </div>

          {/* Right Column: Spatial 3D Maya Voice Core inside Neo-Brutal Frame */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Neo-Brutalist 3D Box Canvas Window */}
            <div className="relative w-full h-[500px] sm:h-[540px] bg-gradient-to-b from-white via-sky-50/50 to-slate-100 rounded-3xl border-3 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center overflow-hidden">
              {/* Window Title Bar */}
              <div className="absolute top-0 left-0 right-0 px-4 py-2.5 bg-[#ffe600] border-b-2 border-black flex items-center justify-between z-20 font-space text-xs font-black">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-black inline-block" />
                  <span className="tracking-wide">MAYA_CORE_3D.EXE</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black text-white px-2.5 py-0.5 rounded-md text-[10px] font-mono">
                  <span>ACTIVE SIP</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse inline-block" />
                </div>
              </div>

              {/* 3D Scene */}
              <div className="w-full h-full pt-8 cursor-grab active:cursor-grabbing">
                <SceneContainer cameraPosition={[0, 0, 4.8]} fov={38}>
                  <MayaCore isAnswering={callState === "answering"} scale={0.72} interactive={true} />
                </SceneContainer>
              </div>

              {/* Top Call Speech Bubble Overlay with Pointer to Maya */}
              <div className="absolute top-11 left-1/2 -translate-x-1/2 z-20 w-auto min-w-[270px] max-w-[94%] pointer-events-none">
                <div className="relative bg-white/95 backdrop-blur-md border-2 border-black rounded-2xl p-2.5 sm:px-3.5 sm:py-2 flex items-center gap-3 shadow-[4px_4px_0px_#000]">
                  {/* Speech Bubble Arrow pointing down to Maya */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-black transform rotate-45" />

                  {/* Phone Icon in Mint/Cyan Squircle */}
                  <div className={`w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000] ${
                    callState === "incoming"
                      ? "bg-[#ff53cd] text-white animate-bounce"
                      : "bg-[#2dd4bf] text-black"
                  }`}>
                    <Phone className="w-4 h-4 fill-current" />
                  </div>

                  {/* Caller Details */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="font-space font-black text-xs sm:text-sm text-black tracking-tight truncate">
                      {activeCallNumber}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-slate-700 truncate font-sans">
                      {activeQuery}
                    </div>
                  </div>

                  {/* Maya Status Tag */}
                  <div className="bg-[#ffe600] border-2 border-black rounded-lg px-2 py-1 flex items-center gap-1.5 shadow-[2px_2px_0px_#000] shrink-0 font-space text-[10px] font-black">
                    <div className="flex items-center gap-0.5">
                      <span className="w-0.5 h-3 bg-black rounded-full animate-wave-1" />
                      <span className="w-0.5 h-4 bg-black rounded-full animate-wave-2" />
                      <span className="w-0.5 h-2.5 bg-black rounded-full animate-wave-3" />
                    </div>
                    <div className="flex flex-col leading-none text-left">
                      <span>MAYA</span>
                      <span className="text-[8px] text-slate-900">SPEAKING</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Voice Synthesized Badge */}
              <div className="absolute bottom-4 left-4 z-20 bg-[#86efac] border-2 border-black rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-[3px_3px_0px_#000] font-space">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-black rounded-full animate-wave-1" />
                  <span className="w-1 h-5 bg-black rounded-full animate-wave-2" />
                  <span className="w-1 h-4 bg-black rounded-full animate-wave-3" />
                  <span className="w-1 h-6 bg-black rounded-full animate-wave-4" />
                  <span className="w-1 h-3.5 bg-black rounded-full animate-wave-2" />
                </div>
                <span className="text-xs font-black text-black">Voice Synthesized</span>
              </div>
            </div>

            {/* Simulated Live Metrics Bar with Vibrant Neo-Brutal Blocks */}
            <div className="w-full grid grid-cols-3 gap-2.5 mt-4 z-10 font-space">
              <div className="bg-[#00f0ff] border-2 border-black rounded-xl p-3 text-center shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                <div className="text-lg sm:text-xl font-syne font-black text-black flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                  12
                </div>
                <div className="text-[11px] text-black font-extrabold mt-0.5">Active Calls</div>
              </div>

              <div className="bg-[#ffe600] border-2 border-black rounded-xl p-3 text-center shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                <div className="text-lg sm:text-xl font-syne font-black text-black">
                  48
                </div>
                <div className="text-[11px] text-black font-extrabold mt-0.5">Leads Captured</div>
              </div>

              <div className="bg-[#a3e635] border-2 border-black rounded-xl p-3 text-center shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                <div className="text-lg sm:text-xl font-syne font-black text-black">
                  96%
                </div>
                <div className="text-[11px] text-black font-extrabold mt-0.5">AI Resolution</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
