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
  MessageSquare,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200 select-none font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-black/[0.08] p-7 sm:p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto text-[#1A1A1A]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#FAF3E4] hover:bg-[#FAF3E4]/80 text-black/60 hover:text-black border border-black/[0.06] transition-all cursor-pointer shadow-2xs"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        <div>
          {/* Header */}
          <div className="flex items-start gap-4 mb-6 pr-10">
            <div className="w-12 h-12 rounded-2xl bg-[#D9C2FA]/40 text-[#5B21B6] border border-[#D9C2FA] flex items-center justify-center shrink-0 shadow-2xs">
              <PhoneCall className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-black/50 uppercase tracking-wider">
                  AI Call Recording & Telemetry
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#C1F2D5] text-[#16856B]">
                  Verified Audio
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight">
                {lead.name} • {lead.course}
              </h3>
              <div className="text-xs text-black/50 flex flex-wrap items-center gap-2 mt-1 font-mono">
                <span>{lead.phone}</span>
                <span>•</span>
                <span>{lead.agentName}</span>
                <span>•</span>
                <span>{lead.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Interactive Waveform Player Card */}
          <div className="bg-[#111111] text-white rounded-[22px] p-5 sm:p-6 mb-6 border border-black/40 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between text-xs text-white/70 mb-3.5 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C1F2D5] animate-pulse" />
                <span className="text-white font-semibold">Maya Neural Voice (Sub-140ms)</span>
              </div>
              <span className="font-mono text-[#D9C2FA] text-xs bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
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
                        ? "bg-[#C1F2D5]"
                        : "bg-white/15 hover:bg-white/25"
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
                  className="w-10 h-10 rounded-full bg-white text-[#111111] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current stroke-[2]" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5 stroke-[2]" />
                  )}
                </button>

                <button
                  onClick={() => setProgress(0)}
                  className="p-2.5 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                  title="Rewind"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2]" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 stroke-[2]" /> : <Volume2 className="w-4 h-4 stroke-[2]" />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="bg-white/10 text-white/80 border border-white/10 px-2.5 py-0.5 rounded-full font-mono text-[11px]">1.0x Speed</span>
                <span className="bg-[#C1F2D5]/20 text-[#C1F2D5] border border-[#C1F2D5]/30 px-2.5 py-0.5 rounded-full text-[11px]">HD Audio</span>
              </div>
            </div>
          </div>

          {/* Verbatim Dialogue Snippet & AI Summary */}
          <div className="space-y-3 mb-6">
            <div className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#5B21B6] stroke-[2]" />
              <span>Verbatim AI Dialogue Transcript</span>
            </div>

            {/* Caller speech bubble */}
            <div className="bg-[#FAF3E4]/60 border border-black/[0.06] rounded-[20px] p-4 text-xs text-[#1A1A1A] shadow-2xs">
              <div className="font-semibold text-black/70 mb-1 flex items-center gap-1.5 uppercase text-[10px]">
                <div className="w-4 h-4 rounded-full bg-black/10 text-[#1A1A1A] flex items-center justify-center font-bold">
                  <User className="w-2.5 h-2.5 stroke-[2]" />
                </div>
                <span>{lead.name} (Student Applicant):</span>
              </div>
              <p className="text-black/80 leading-relaxed pl-5 font-normal">
                &ldquo;{lead.transcriptSnippet}&rdquo;
              </p>
            </div>

            {/* AI Agent speech bubble */}
            <div className="bg-[#D9C2FA]/20 border border-[#D9C2FA] rounded-[20px] p-4 text-xs text-[#1A1A1A] shadow-2xs">
              <div className="font-semibold text-[#5B21B6] mb-1 flex items-center gap-1.5 uppercase text-[10px]">
                <div className="w-4 h-4 rounded-full bg-[#D9C2FA] text-[#5B21B6] flex items-center justify-center font-bold">
                  <Bot className="w-2.5 h-2.5 stroke-[2]" />
                </div>
                <span>Maya AI (Autonomous Admissions Counselor):</span>
              </div>
              <p className="text-black/80 leading-relaxed pl-5 font-normal">
                {lead.summary}
              </p>
            </div>
          </div>

          {/* Action Taken */}
          <div className="bg-[#FAF3E4]/50 border border-black/[0.06] rounded-[20px] p-3.5 text-xs text-[#1A1A1A] mb-6 flex items-center justify-between shadow-2xs">
            <div>
              <span className="font-semibold uppercase block mb-0.5 text-[10px] text-black/50">Automated Action Triggered:</span>
              <span className="font-bold text-[#1A1A1A] text-xs">{lead.actionTaken}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#C1F2D5] text-[#16856B] font-semibold text-[11px]">
              ✓ CRM Synced
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
          <span className="text-xs text-black/50 font-normal">
            Encrypted audio recording stored under institutional compliance.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            Close Call Log
          </button>
        </div>
      </div>
    </div>
  );
}
