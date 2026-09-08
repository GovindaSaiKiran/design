"use client";

import React, { useState } from "react";
import { X, Play, Sparkles, CheckCircle, ShieldCheck, ArrowRight } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Aeline Platform Walkthrough
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video / Interactive Player simulation */}
        <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* Ambient video background preview */}
          <div className="absolute inset-0 opacity-40 bg-gradient-to-tr from-sky-600 via-blue-900 to-slate-950" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(#38bdf8 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          {!isPlaying ? (
            <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-[#cdfb56] hover:bg-[#bef03f] text-black flex items-center justify-center shadow-[0_0_30px_rgba(205,251,86,0.6)] transition-all hover:scale-110 active:scale-95 cursor-pointer mb-4"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
              <h3 className="text-white text-lg font-bold mb-1">
                See Aeline in Action
              </h3>
              <p className="text-xs text-slate-300">
                Watch how our AI strategy roadmap and telemetry dashboards deliver 4.8x ROI in 30 days.
              </p>
            </div>
          ) : (
            <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>01:42 / 03:30</span>
                <span className="text-[#cdfb56] font-bold">LIVE TELEMETRY STREAM</span>
              </div>
              <div className="space-y-3 max-w-md mx-auto text-center py-8">
                <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-md">
                  Simulating Enterprise Orchestration
                </div>
                <div className="text-2xl font-black text-white">
                  99.8% Automated Resolution
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-[#cdfb56] rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsPlaying(false)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Reset Preview
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Enterprise SOC2 Type II Certified AI Framework
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-900 hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
