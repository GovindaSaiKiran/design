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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 select-none font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-[10px_10px_0px_#000000] border-3 border-black p-6 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#ff8080] hover:bg-[#ff6b6b] text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[3]" />
        </button>

        <div>
          {/* Header */}
          <div className="flex items-start gap-3.5 mb-5 pr-12">
            <div className="w-12 h-12 rounded-2xl bg-[#d6ff38] text-black border-2.5 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-black text-black uppercase tracking-wider">
                  AI Call Recording & Telemetry
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#ffe600] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000]">
                  Verified Audio
                </span>
              </div>
              <h3 className="text-lg font-black text-black tracking-tight">
                {lead.name} • {lead.course}
              </h3>
              <div className="text-xs text-black/70 flex flex-wrap items-center gap-2 mt-1 font-mono font-bold">
                <span>{lead.phone}</span>
                <span>•</span>
                <span>{lead.agentName}</span>
                <span>•</span>
                <span>{lead.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Interactive Waveform Player Card */}
          <div className="bg-black text-white rounded-2xl p-4 sm:p-5 mb-5 shadow-[4px_4px_0px_#000000] border-2.5 border-black relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-neutral-300 mb-3 font-black">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d6ff38] animate-pulse" />
                <span className="text-white font-black">Maya Neural Voice (Sub-400ms)</span>
              </div>
              <span className="font-mono text-[#d6ff38] font-black text-xs bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                {Math.floor((progress / 100) * 210 / 60)}:
                {String(Math.floor((progress / 100) * 210 % 60)).padStart(2, "0")} / {lead.callDuration}
              </span>
            </div>

            {/* Visual Animated Waveform Bars */}
            <div className="flex items-end gap-1 h-16 mb-4 px-1 cursor-pointer">
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
                        ? "bg-[#d6ff38] shadow-[0_0_8px_rgba(214,255,56,0.6)]"
                        : "bg-neutral-800 hover:bg-neutral-700"
                    }`}
                  />
                );
              })}
            </div>

            {/* Audio Controls Bar */}
            <div className="flex items-center justify-between pt-3 border-t-2 border-neutral-800">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-xl bg-[#d6ff38] hover:bg-[#ffe600] text-black flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#ffffff] hover:shadow-[3px_3px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer font-black"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-black stroke-[2.5]" />
                  ) : (
                    <Play className="w-5 h-5 fill-black ml-0.5 stroke-[2.5]" />
                  )}
                </button>

                <button
                  onClick={() => setProgress(0)}
                  className="p-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 border-2 border-neutral-700 transition-colors cursor-pointer"
                  title="Rewind"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 border-2 border-neutral-700 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 stroke-[2.5]" /> : <Volume2 className="w-4 h-4 stroke-[2.5]" />}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-black">
                <span className="bg-neutral-900 text-white border border-neutral-700 px-2.5 py-1 rounded-lg font-mono text-[11px]">1.0x Speed</span>
                <span className="bg-[#ffe600] text-black border border-black px-2.5 py-1 rounded-lg text-[11px] shadow-[1px_1px_0px_#ffffff]">HD Audio</span>
              </div>
            </div>
          </div>

          {/* Verbatim Dialogue Snippet & AI Summary */}
          <div className="space-y-3.5 mb-5">
            <div className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              <span>Verbatim AI Dialogue Transcript</span>
            </div>

            {/* Caller speech bubble */}
            <div className="bg-[#00f0ff] border-2.5 border-black rounded-2xl p-4 text-xs text-black shadow-[3px_3px_0px_#000000]">
              <div className="font-black text-black mb-1 flex items-center gap-1.5 uppercase text-[10px]">
                <div className="w-5 h-5 rounded-full bg-black text-[#00f0ff] flex items-center justify-center font-black">
                  <User className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{lead.name} (Student Applicant):</span>
              </div>
              <p className="font-bold text-black leading-relaxed pl-6.5">
                &ldquo;{lead.transcriptSnippet}&rdquo;
              </p>
            </div>

            {/* AI Agent speech bubble */}
            <div className="bg-[#d6ff38] border-2.5 border-black rounded-2xl p-4 text-xs text-black shadow-[3px_3px_0px_#000000]">
              <div className="font-black text-black mb-1 flex items-center gap-1.5 uppercase text-[10px]">
                <div className="w-5 h-5 rounded-full bg-black text-[#d6ff38] flex items-center justify-center font-black">
                  <Bot className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Maya AI (Autonomous Admissions Counselor):</span>
              </div>
              <p className="font-bold text-black leading-relaxed pl-6.5">
                {lead.summary}
              </p>
            </div>
          </div>

          {/* Action Taken */}
          <div className="bg-[#ffe600] border-2.5 border-black rounded-2xl p-3.5 text-xs text-black mb-5 flex items-center justify-between shadow-[3px_3px_0px_#000000]">
            <div>
              <span className="font-black uppercase block mb-0.5 text-[10px] text-black/70">Automated Action Triggered:</span>
              <span className="font-black text-black text-xs">{lead.actionTaken}</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-black text-[#d6ff38] border-2 border-black font-black text-[10px] shadow-[2px_2px_0px_#ffffff]">
              ✓ CRM Synced
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-black">
          <span className="text-xs text-black/70 font-bold">
            Encrypted audio recording stored under institutional compliance.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-black hover:bg-[#ffe600] text-[#d6ff38] hover:text-black text-xs font-black border-2.5 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
          >
            Close Call Log
          </button>
        </div>
      </div>
    </div>
  );
}
