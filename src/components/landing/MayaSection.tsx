"use client";

import React, { useState } from "react";
import { Sparkles, Mic, Globe2, BookOpen, Target, Users, Volume2, type LucideIcon } from "lucide-react";
import SceneContainer from "../three/SceneContainer";
import MayaCore from "../three/MayaCore";
import { mayaCapabilities } from "@/data/mock/agents";
import { soundSynth } from "@/lib/audio-synth";

const ICON_MAP: Record<string, LucideIcon> = {
  Mic,
  Globe2,
  BookOpen,
  Target,
  Users
};

const CAP_COLORS: Record<string, string> = {
  "natural-voice": "bg-[#ffe600]",
  "multilingual": "bg-[#00f0ff]",
  "knowledge-grounded": "bg-[#a3e635]",
  "admission-guidance": "bg-[#c084fc]",
  "human-handoff": "bg-[#fb923c]"
};

export default function MayaSection() {
  const [activeCapId, setActiveCapId] = useState<string>("natural-voice");
  const activeCap = mayaCapabilities.find((c) => c.id === activeCapId) || mayaCapabilities[0];

  const handleSelectCapability = (id: string) => {
    soundSynth.playClick();
    setActiveCapId(id);
    soundSynth.playMayaSpeakingBeep(620);
  };

  const ActiveIcon = ICON_MAP[activeCap.iconName] || Sparkles;

  return (
    <section id="ai-agent" className="py-20 md:py-32 bg-[#fffdf5] border-b-3 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#ffe600] text-black border-2 border-black text-xs font-space font-black mb-4 shadow-[3px_3px_0px_#000] rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5" />
            CORE AI ARCHITECTURE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight">
            Meet <span className="bg-[#ff53cd] text-white px-3 py-0.5 border-2 border-black shadow-[4px_4px_0px_#000] inline-block font-serif-editorial italic font-normal rotate-1">Maya.</span>
          </h2>
          <p className="mt-3 text-lg sm:text-xl font-syne font-black text-black">
            Your AI admission counselor for every conversation.
          </p>
          <p className="mt-2 text-sm sm:text-base text-slate-800 max-w-2xl mx-auto font-sans font-medium">
            Click any capability sticker below to see how Maya handles real admission calls with human empathy and institutional rigor.
          </p>
        </div>

        {/* Spatial Connected Maya Core & Orbital Nodes System */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left / Center 3D Maya Core View */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Neo-Brutal Window Frame */}
            <div className="relative w-full h-[460px] sm:h-[500px] bg-gradient-to-b from-white via-sky-50/50 to-slate-100 rounded-3xl border-3 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 right-0 px-4 py-2.5 bg-[#a3e635] border-b-2 border-black flex items-center justify-between z-20 font-space text-xs font-black">
                <span>MAYA_SPATIAL_INTELLIGENCE.NODE</span>
                <span className="bg-black text-[#a3e635] px-2 py-0.5 rounded text-[10px]">
                  ONLINE 100%
                </span>
              </div>

              <div className="w-full h-full pt-8 cursor-grab active:cursor-grabbing">
                <SceneContainer cameraPosition={[0, 0, 4.8]} fov={38}>
                  <MayaCore isAnswering={true} scale={0.72} interactive={true} />
                </SceneContainer>
              </div>

              {/* Central Identifier Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#ffe600] border-2 border-black px-4 py-1.5 rounded-xl shadow-[3px_3px_0px_#000] flex items-center gap-2 font-space">
                <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
                <span className="text-xs font-black text-black tracking-wider">
                  MAYA • AI VOICE CORE
                </span>
              </div>
            </div>

            {/* Quick Orbital Node Selectors as Neo Stickers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mt-4 font-space">
              {mayaCapabilities.map((cap) => {
                const IconComponent = ICON_MAP[cap.iconName] || Sparkles;
                const isSelected = cap.id === activeCapId;
                const capBg = CAP_COLORS[cap.id] || "bg-white";

                return (
                  <button
                    key={cap.id}
                    onClick={() => handleSelectCapability(cap.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border-2 border-black text-left transition-all cursor-pointer ${
                      isSelected
                        ? `${capBg} text-black shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px] font-black`
                        : "bg-white text-black hover:bg-[#ffe600] shadow-[2px_2px_0px_#000] font-bold"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000]">
                      <IconComponent className="w-3.5 h-3.5 text-black" />
                    </div>
                    <span className="text-xs truncate">{cap.shortTag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Node Deep Dive */}
          <div className="lg:col-span-6 bg-white text-black rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_#000] space-y-6">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${CAP_COLORS[activeCap.id] || "bg-[#ffe600]"} border-2 border-black text-black flex items-center justify-center shadow-[3px_3px_0px_#000]`}>
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-black text-slate-600 uppercase tracking-wider">
                    {activeCap.shortTag}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-black tracking-tight">
                    {activeCap.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-sans font-medium">
              {activeCap.summary}
            </p>

            {/* Metric pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#a3e635] border-2 border-black text-xs font-space font-black text-black shadow-[2px_2px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-black animate-ping" />
              {activeCap.metrics}
            </div>

            {/* Key Operational Details */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-space font-black text-black uppercase tracking-wider block">
                TECHNICAL HIGHLIGHTS
              </span>
              {activeCap.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-900 font-sans font-medium">
                  <div className="w-4 h-4 rounded bg-[#00f0ff] border border-black text-black flex items-center justify-center shrink-0 mt-0.5 font-black font-mono">
                    ✓
                  </div>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Sample Dialogue Simulation */}
            <div className="bg-[#fffdf5] rounded-2xl p-4 border-2 border-black shadow-[3px_3px_0px_#000] space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs text-slate-700 font-space">
                <span className="flex items-center gap-1.5 font-bold">
                  <Volume2 className="w-3.5 h-3.5 text-black" />
                  Live Audio Simulation
                </span>
                <span className="text-[10px] bg-black text-[#00f0ff] px-2 py-0.5 rounded font-mono font-bold">
                  0.48s Latency
                </span>
              </div>

              {/* Student Query */}
              <div className="bg-white p-3 rounded-xl border border-black text-xs shadow-[2px_2px_0px_#000]">
                <span className="text-black font-space font-black block mb-0.5">Caller Inquiry:</span>
                <span className="text-slate-800 italic font-medium">"{activeCap.sampleAudioPrompt}"</span>
              </div>

              {/* Maya Response */}
              <div className="bg-[#ffe600] p-3 rounded-xl border border-black text-xs shadow-[2px_2px_0px_#000]">
                <span className="text-black font-space font-black block mb-0.5">Maya Response:</span>
                <span className="text-black font-semibold">"{activeCap.sampleMayaResponse}"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
