"use client";

import React, { useState } from "react";
import { Sparkles, Phone, User, Play, Pause, ShieldCheck, CheckCircle2, TrendingUp, Award, Clock } from "lucide-react";
import SceneContainer from "../three/SceneContainer";
import AudioWaveform3D from "../three/AudioWaveform3D";
import { sampleTranscriptDialogue } from "@/data/mock/calls";
import { soundSynth } from "@/lib/audio-synth";

export default function CallIntelligenceSection() {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    soundSynth.playClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="intelligence" className="py-20 md:py-32 bg-[#fffdf5] border-b-3 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#c084fc] text-black border-2 border-black text-xs font-space font-black mb-4 shadow-[3px_3px_0px_#000] rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5" />
            SPEECH-TO-INTELLIGENCE ENGINE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight">
            Every conversation <br className="hidden sm:inline" />
            <span className="bg-[#a3e635] text-black px-3 py-0.5 border-2 border-black shadow-[4px_4px_0px_#000] inline-block font-serif-editorial font-normal italic mt-1 rotate-1">
              becomes intelligence.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
            Listen in on live calls or review rich structured data: sentiment analysis, intent classification, qualified lead scores, and automatically recorded student preferences.
          </p>
        </div>

        {/* Three-Column Live Telephony & Intelligence Console */}
        <div className="mt-14 bg-black text-white rounded-3xl border-3 border-black shadow-[10px_10px_0px_#000] p-6 sm:p-8 overflow-hidden">
          {/* Top Console Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-slate-800 font-space">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#ffe600] border-2 border-white flex items-center justify-center text-black font-syne font-black shadow-[3px_3px_0px_#fff]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-syne font-black text-sm sm:text-base text-white">CALL_SESSION: #CALL-8921</span>
                  <span className="text-[10px] font-mono bg-[#a3e635] text-black border border-white font-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#fff]">
                    LIVE STREAMING
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5 flex items-center gap-3 font-mono">
                  <span>Caller: Rahul Verma (+91 98401 22340)</span>
                  <span>•</span>
                  <span>Duration: 03:04</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="neo-btn bg-[#00f0ff] text-black px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? "Pause Audio" : "Resume Audio"}
              </button>
            </div>
          </div>

          {/* 3 Columns Layout */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Column 1: 3D Audio Frequency Waveform */}
            <div className="lg:col-span-3 bg-slate-900 rounded-2xl p-4 border-2 border-slate-700 flex flex-col justify-between shadow-[4px_4px_0px_#333]">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Spatial Audio Spectrum
                </div>
                <div className="text-xs font-space font-black text-[#00f0ff]">
                  Dual-Channel SIP Frequency
                </div>
              </div>

              {/* 3D Waveform Canvas */}
              <div className="w-full h-44 my-2">
                <SceneContainer cameraPosition={[0, 0, 3.8]} fov={40}>
                  <AudioWaveform3D isPlaying={isPlaying} />
                </SceneContainer>
              </div>

              <div className="text-[11px] font-mono text-slate-300 space-y-1 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Codec:</span>
                  <span className="text-white font-bold">Opus 48kHz</span>
                </div>
                <div className="flex justify-between">
                  <span>Neural Latency:</span>
                  <span className="text-[#a3e635] font-black">480ms</span>
                </div>
              </div>
            </div>

            {/* Column 2: Turn-by-Turn Dynamic Transcript */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-slate-700 flex flex-col shadow-[4px_4px_0px_#333]">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Synchronized Transcript</span>
                <span className="text-[10px] text-[#ffe600] font-mono font-bold">AUTO-SCROLL ON</span>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                {sampleTranscriptDialogue.map((turn) => {
                  const isMaya = turn.speaker === "MAYA";
                  return (
                    <div
                      key={turn.id}
                      className={`p-3 rounded-xl border-2 text-xs transition-all ${
                        isMaya
                          ? "bg-[#ffe600] text-black border-black shadow-[3px_3px_0px_#fff]"
                          : "bg-white text-black border-black shadow-[3px_3px_0px_#00f0ff]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-space font-black text-[11px] flex items-center gap-1.5 text-black">
                          {isMaya ? "Maya (AI Counselor)" : "Rahul (Applicant)"}
                        </span>
                        <span className="text-[10px] font-mono text-slate-800 font-bold">{turn.timestamp}</span>
                      </div>
                      <p className="leading-relaxed font-sans font-medium">{turn.text}</p>
                      <div className="mt-1.5 text-[10px] text-slate-700 font-mono font-bold uppercase">
                        {turn.intent}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Real-Time Extracted AI Insights */}
            <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-slate-700 flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_#333]">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Extracted Intelligence</span>
                  <span className="text-[10px] font-space font-black bg-[#a3e635] text-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#fff]">
                    Score 94/100
                  </span>
                </div>

                <div className="space-y-2.5 font-space">
                  <div className="bg-white text-black p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#00f0ff]">
                    <div className="text-[10px] text-slate-500 uppercase font-black">Primary Intent</div>
                    <div className="text-xs font-black text-black mt-0.5">Fee & Scholarship Inquiry</div>
                  </div>

                  <div className="bg-white text-black p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#ffe600]">
                    <div className="text-[10px] text-slate-500 uppercase font-black">Inquired Course</div>
                    <div className="text-xs font-black text-black mt-0.5">B.Tech Computer Science (2026)</div>
                  </div>

                  <div className="bg-[#a3e635] text-black p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#fff]">
                    <div className="text-[10px] text-black uppercase font-black">Academic Profile</div>
                    <div className="text-xs font-black text-black mt-0.5">94% in CBSE Class 12 Boards</div>
                  </div>

                  <div className="bg-[#00f0ff] text-black p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#fff]">
                    <div className="text-[10px] text-black uppercase font-black">Scheduled Action</div>
                    <div className="text-xs font-black text-black mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      VIP Campus Tour (Saturday 11 AM)
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#c084fc] border-2 border-black text-xs font-space font-black text-black shadow-[2px_2px_0px_#fff]">
                CRM PUSH: Instant Salesforce Sync & WhatsApp Sent.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
