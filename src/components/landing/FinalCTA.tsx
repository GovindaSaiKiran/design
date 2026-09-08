"use client";

import React from "react";
import { Sparkles, ArrowRight, Play, CheckCircle2, Shield, Zap } from "lucide-react";
import SceneContainer from "../three/SceneContainer";
import MiniMayaCore from "../three/MiniMayaCore";
import { soundSynth } from "@/lib/audio-synth";

interface FinalCTAProps {
  onOpenDemo: () => void;
  onOpenSimulator: () => void;
}

export default function FinalCTA({ onOpenDemo, onOpenSimulator }: FinalCTAProps) {
  return (
    <section className="py-24 md:py-36 bg-[#ffe600] border-b-3 border-black relative overflow-hidden bg-neo-dots">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Mini 3D Maya Badge in Neo-Brutal Card */}
        <div className="w-28 h-28 mx-auto mb-6 bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_#000] p-2 flex items-center justify-center">
          <SceneContainer cameraPosition={[0, 0, 3]} fov={35}>
            <MiniMayaCore scale={1.2} />
          </SceneContainer>
        </div>

        {/* Badge with Space Grotesk */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-black text-white text-xs font-space font-black mb-6 shadow-[3px_3px_0px_#fff] rotate-[-1deg]">
          <Zap className="w-3.5 h-3.5 text-[#ffe600] fill-[#ffe600]" />
          ENTERPRISE HIGHER ED PILOT AVAILABLE
        </div>

        {/* Headline with Bricolage Display + Instrument Serif Italic */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-tight">
          Never miss an admission <br className="hidden sm:inline" />
          <span className="bg-[#ff53cd] text-white px-4 py-0.5 border-3 border-black shadow-[6px_6px_0px_#000] inline-block font-serif-editorial italic font-normal mt-2 rotate-1">
            conversation again.
          </span>
        </h2>

        {/* Supporting text */}
        <p className="mt-6 text-lg sm:text-xl text-black max-w-2xl mx-auto font-sans font-semibold leading-relaxed">
          Give every prospective student an immediate response. Give every admission phone call a measurable enrollment purpose.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 font-space">
          <button
            onClick={() => {
              soundSynth.playClick();
              onOpenDemo();
            }}
            className="w-full sm:w-auto neo-btn bg-black text-white hover:bg-slate-900 px-9 py-4.5 rounded-2xl text-base font-black shadow-[6px_6px_0px_#fff] flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#ffe600] group-hover:rotate-12 transition-transform" />
            Book an Institutional Demo
            <ArrowRight className="w-4 h-4 text-[#ffe600] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              soundSynth.playClick();
              onOpenSimulator();
            }}
            className="w-full sm:w-auto neo-btn bg-[#00f0ff] hover:bg-[#00d4e3] text-black px-7 py-4.5 rounded-2xl text-base font-black flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-black fill-black" />
            Test Maya Live Voice
          </button>
        </div>

        {/* Institutional Assurance */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-black font-space font-black">
          <span className="bg-white px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Plug-and-play SIP & PBX
          </span>
          <span className="bg-white px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Zero Hardware Needed
          </span>
          <span className="bg-white px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
            <Shield className="w-4 h-4" /> FERPA & ISO 27001
          </span>
        </div>
      </div>
    </section>
  );
}
