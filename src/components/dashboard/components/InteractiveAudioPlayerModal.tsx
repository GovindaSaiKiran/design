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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-[6px_6px_0px_#000000] border-2 border-black p-6 sm:p-7 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#d6ff38] hover:bg-[#cbf72e] border border-black text-black flex items-center justify-center transition-all shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div>
          {/* Header */}
          <div className="flex items-start gap-3 mb-5 pr-10">
            <div className="w-10 h-10 rounded-xl bg-black text-[#d6ff38] border border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#d6ff38]">
              <PhoneCall className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  AI Call Recording & Telemetry
                </span>
                <span className="px-2 py-0.2 rounded-md text-[10px] font-bold bg-[#d6ff38] text-black border border-black">
                  VERIFIED CALL
                </span>
              </div>
              <h3 className="text-lg font-black text-black tracking-tight uppercase">
                {lead.name} • {lead.course}
              </h3>
              <div className="text-xs text-neutral-600 flex flex-wrap items-center gap-2 mt-0.5 font-mono font-medium">
                <span>{lead.phone}</span>
                <span>•</span>
                <span>{lead.agentName}</span>
                <span>•</span>
                <span>{lead.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Interactive Waveform Player Card */}
          <div className="bg-neutral-950 text-white rounded-xl p-4 sm:p-5 mb-5 shadow-[3px_3px_0px_#d6ff38] border border-black relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-neutral-300 mb-2.5 font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d6ff38] border border-black animate-pulse" />
                <span className="text-white font-bold">Maya HD Neural Voice (Sub-400ms)</span>
              </div>
              <span className="font-mono text-[#d6ff38] font-bold text-xs">
                {Math.floor((progress / 100) * 210 / 60)}:
                {String(Math.floor((progress / 100) * 210 % 60)).padStart(2, "0")} / {lead.callDuration}
              </span>
            </div>

            {/* Visual Animated Waveform Bars */}
            <div className="flex items-end gap-1 h-16 sm:h-20 mb-4 px-1 cursor-pointer">
              {waveBars.map((height, i) => {
                const barProgress = (i / waveBars.length) * 100;
                const isPassed = barProgress <= progress;

                return (
                  <div
                    key={i}
                    onClick={() => setProgress(barProgress)}
                    style={{ height: `${height}%` }}
                    className={`flex-1 rounded-t border-t border-black transition-all duration-150 ${
                      isPassed
                        ? "bg-[#d6ff38] shadow-[0_0_8px_rgba(214,255,56,0.8)]"
                        : "bg-neutral-700 hover:bg-neutral-500"
                    }`}
                  />
                );
              })}
            </div>

            {/* Audio Controls Bar */}
            <div className="flex items-center justify-between pt-3 border-t-2 border-neutral-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-xl bg-[#d6ff38] hover:bg-[#cbf72e] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#ffffff] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer font-black"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current stroke-[3]" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5 stroke-[3]" />
                  )}
                </button>

                <button
                  onClick={() => setProgress(0)}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white transition-colors cursor-pointer"
                  title="Rewind"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-black">
                <span className="bg-neutral-900 border border-neutral-700 text-white px-3 py-1 rounded-lg font-mono">1.0x Speed</span>
                <span className="bg-[#d6ff38] text-black px-3 py-1 rounded-lg border border-black font-black">100% Clarity</span>
              </div>
            </div>
          </div>

          {/* Verbatim Dialogue Snippet & AI Summary */}
          <div className="space-y-3.5 mb-6">
            <div className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 stroke-[2.5]" />
              <span>Verbatim AI Dialogue Transcript</span>
            </div>

            {/* Caller speech bubble */}
            <div className="bg-white border-2 border-black rounded-xl p-3.5 text-xs text-black shadow-[3px_3px_0px_#000000]">
              <div className="font-black text-black mb-1 flex items-center gap-1.5 uppercase text-[11px]">
                <User className="w-3.5 h-3.5 text-black stroke-[3]" />
                <span>{lead.name} (Applicant):</span>
              </div>
              <p className="font-medium text-black leading-relaxed">
                &ldquo;{lead.transcriptSnippet}&rdquo;
              </p>
            </div>

            {/* AI Agent speech bubble */}
            <div className="bg-[#fcffe0] border-2 border-black rounded-xl p-3.5 text-xs text-black shadow-[3px_3px_0px_#000000]">
              <div className="font-black text-black mb-1 flex items-center gap-1.5 uppercase text-[11px]">
                <Bot className="w-3.5 h-3.5 stroke-[3]" />
                <span>Maya (Admissions AI Counselor):</span>
              </div>
              <p className="font-medium text-black leading-relaxed">
                {lead.summary}
              </p>
            </div>
          </div>

          {/* Action Taken & Dean Notes */}
          <div className="bg-amber-100 border-2 border-black rounded-xl p-3.5 text-xs text-black mb-4 flex items-center justify-between shadow-[3px_3px_0px_#000000]">
            <div>
              <span className="font-black uppercase block mb-0.5 text-[11px]">Automated Action Triggered:</span>
              <span className="font-bold text-black">{lead.actionTaken}</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#d6ff38] text-black border border-black font-black text-[10px]">
              CRM SYNCED
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-black">
          <span className="text-xs font-bold text-black/70">
            Encrypted audio recording stored under FERPA compliance.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-[#d6ff38] text-xs font-black border-2 border-black shadow-[3px_3px_0px_#d6ff38] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            Close Call Log
          </button>
        </div>
      </div>
    </div>
  );
}
