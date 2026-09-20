"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  PhoneCall,
  User,
  Bot,
  Sparkles,
  Download,
  CheckCircle2,
  Clock,
  GraduationCap,
  Award,
  MessageSquare
} from "lucide-react";
import { StudentLeadItem } from "./LeadSegmentationHub";

interface InteractiveAudioPlayerModalProps {
  lead: StudentLeadItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveAudioPlayerModal({
  lead,
  isOpen,
  onClose
}: InteractiveAudioPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!isOpen || !lead) return null;

  // Waveform bars simulation
  const waveBars = [
    25, 45, 65, 85, 95, 75, 45, 30, 55, 80, 100, 85, 60, 40, 70, 90, 80, 50, 35, 65,
    90, 95, 70, 45, 60, 80, 90, 65, 40, 55, 85, 100, 75, 45, 30, 60, 85, 90, 60, 40
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-200 select-none font-sans">
      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-black/15 p-7 sm:p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-950 border border-black/10 hover:border-black/30 transition-all cursor-pointer shadow-xs hover:-translate-y-0.5"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        <div>
          {/* Header */}
          <div className="flex items-start gap-4 mb-6 pr-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-black/10 flex items-center justify-center shrink-0 shadow-xs">
              <PhoneCall className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  AI Call Recording & Telemetry
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                  Verified Audio
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {lead.name} • {lead.course}
              </h3>
              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-1 font-mono">
                <span>{lead.phone}</span>
                <span>•</span>
                <span>{lead.agentName}</span>
                <span>•</span>
                <span>{lead.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Interactive Waveform Player Card */}
          <div className="bg-slate-950 text-white rounded-2xl p-5 sm:p-6 mb-6 border border-black/40 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-3.5 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-semibold">Maya Neural Voice (Sub-400ms)</span>
              </div>
              <span className="font-mono text-indigo-300 text-xs bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">
                {Math.floor((progress / 100) * 210 / 60)}:
                {String(Math.floor((progress / 100) * 210 % 60)).padStart(2, "0")} / {lead.callDuration}
              </span>
            </div>

            {/* Visual Animated Waveform Bars */}
            <div className="flex items-end gap-1 h-14 mb-4 px-1 cursor-pointer">
              {waveBars.map((height, i) => {
                const barProgress = (i / waveBars.length) * 100;
                const isPassed = barProgress <= progress;

                return (
                  <div
                    key={i}
                    onClick={() => setProgress(barProgress)}
                    style={{ height: `${height}%` }}
                    className={`flex-1 rounded-t transition-all duration-150 ${
                      isPassed
                        ? "bg-gradient-to-t from-indigo-500 to-cyan-400"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  />
                );
              })}
            </div>

            {/* Audio Controls Bar */}
            <div className="flex items-center justify-between pt-3.5 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white flex items-center justify-center border border-blue-500/50 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white stroke-[2]" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5 stroke-[2]" />
                  )}
                </button>

                <button
                  onClick={() => setProgress(0)}
                  className="p-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 border border-white/10 hover:-translate-y-0.5 transition-all cursor-pointer"
                  title="Rewind"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2]" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 border border-white/10 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 stroke-[2]" /> : <Volume2 className="w-4 h-4 stroke-[2]" />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="bg-white/10 text-slate-300 border border-white/10 px-2.5 py-0.5 rounded-lg font-mono text-[11px]">1.0x Speed</span>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-lg text-[11px]">HD Audio</span>
              </div>
            </div>
          </div>

          {/* Verbatim Dialogue Snippet & AI Summary */}
          <div className="space-y-3.5 mb-6">
            <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600 stroke-[2]" />
              <span>Verbatim AI Dialogue Transcript</span>
            </div>

            {/* Caller speech bubble */}
            <div className="bg-slate-50/90 border border-black/10 rounded-2xl p-4 text-xs text-slate-800 shadow-xs">
              <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5 uppercase text-[10px]">
                <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                  <User className="w-2.5 h-2.5 stroke-[2]" />
                </div>
                <span>{lead.name} (Student Applicant):</span>
              </div>
              <p className="text-slate-800 leading-relaxed pl-5 font-normal">
                &ldquo;{lead.transcriptSnippet}&rdquo;
              </p>
            </div>

            {/* AI Agent speech bubble */}
            <div className="bg-indigo-50/60 border border-black/10 rounded-2xl p-4 text-xs text-slate-800 shadow-xs">
              <div className="font-semibold text-indigo-900 mb-1 flex items-center gap-1.5 uppercase text-[10px]">
                <div className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold">
                  <Bot className="w-2.5 h-2.5 stroke-[2]" />
                </div>
                <span>Maya AI (Autonomous Admissions Counselor):</span>
              </div>
              <p className="text-slate-800 leading-relaxed pl-5 font-normal">
                {lead.summary}
              </p>
            </div>
          </div>

          {/* Action Taken */}
          <div className="bg-slate-50/80 border border-black/10 rounded-2xl p-3.5 text-xs text-slate-800 mb-6 flex items-center justify-between shadow-xs">
            <div>
              <span className="font-semibold uppercase block mb-0.5 text-[10px] text-slate-500">Automated Action Triggered:</span>
              <span className="font-bold text-slate-900 text-xs">{lead.actionTaken}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px] shadow-xs">
              ✓ CRM Synced
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-black/10">
          <span className="text-xs text-slate-500 font-normal">
            Encrypted audio recording stored under institutional compliance.
          </span>
          <button
            onClick={onClose}
            className="px-4.5 py-2.5 rounded-xl bg-slate-950 hover:bg-black text-white text-xs font-semibold border border-black shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            Close Call Log
          </button>
        </div>
      </div>
    </div>
  );
}

