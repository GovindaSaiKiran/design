"use client";

import React, { useState } from "react";
import { X, Send, Users, Calendar, Bot, Sparkles, Check, PhoneCall, Layers, ShieldCheck } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface StartCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignStarted?: (title: string, count: number) => void;
}

export default function StartCampaignModal({
  isOpen,
  onClose,
  onCampaignStarted,
}: StartCampaignModalProps) {
  const [title, setTitle] = useState("JoSAA Round 1 Cutoff & Merit Scholarship Verification");
  const [audience, setAudience] = useState("High-Percentile PCM Applicants (1,240 Verified Candidates)");
  const [selectedAgent, setSelectedAgent] = useState("Maya AI (Hindi/English) & Neha AI (Telugu)");
  const [scheduleTime, setScheduleTime] = useState("Immediate");
  const [concurrentLines, setConcurrentLines] = useState(30);

  if (!isOpen) return null;

  const handleLaunch = () => {
    try { soundSynth.play("confirm"); } catch {}
    onCampaignStarted?.(title, 1240);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl p-6 sm:p-7 overflow-hidden text-white font-mono">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[2px] bg-white text-black flex items-center justify-center shadow-xs">
              <Send className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A]">OUTBOUND CADENCE</div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Launch Outreach Goal
              </h3>
              <p className="text-xs text-[#A1A1AA] font-sans">
                Set the admissions outcome and delegate autonomous batch calling
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              onClose();
            }}
            className="p-1.5 rounded-[2px] text-[#71717A] hover:text-white hover:bg-[#121215] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 my-5 text-xs">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-1">
              Admissions Goal / Campaign Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-[2px] bg-[#121215] border border-[#27272A] text-white focus:outline-none focus:border-white transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-1">
              Target Candidate Register
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-3.5 py-2 rounded-[2px] bg-[#121215] border border-[#27272A] text-white focus:outline-none focus:border-white cursor-pointer transition-all font-mono"
            >
              <option value="High-Percentile PCM Applicants (1,240 Verified Candidates)">
                High-Percentile PCM Applicants (1,240 Verified Candidates)
              </option>
              <option value="JoSAA Round 1 Registered Students (2,500 candidates)">
                JoSAA Round 1 Registered Students (2,500 candidates)
              </option>
              <option value="Hostel & Campus Open Day Inquiries (850 parents)">
                Hostel & Campus Open Day Inquiries (850 parents)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-1">
                Assigned Voice Engine
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-3 py-2 rounded-[2px] bg-[#121215] border border-[#27272A] text-white focus:outline-none focus:border-white cursor-pointer transition-all font-mono text-xs"
              >
                <option value="Maya AI (Hindi/English) & Neha AI (Telugu)">Maya (Hindi) + Neha (Telugu)</option>
                <option value="Ishita AI (Kannada) & Suhani AI (Bengali)">Ishita (Kannada) + Suhani (Bengali)</option>
                <option value="Vikram AI (Global English)">Vikram (Global English)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-1">
                Concurrent Trunks ({concurrentLines} lines)
              </label>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={concurrentLines}
                onChange={(e) => setConcurrentLines(Number(e.target.value))}
                className="w-full accent-white mt-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              Automated WhatsApp Slot Passes & 3x Retry on No-Answer
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#18181B] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
              ARMED
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#27272A]">
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              onClose();
            }}
            className="px-4 py-2 rounded-[2px] text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-white bg-transparent hover:bg-[#121215] border border-[#27272A] hover:border-white transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleLaunch}
            className="px-5 py-2 rounded-[2px] text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 shadow-sm inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Check className="w-3.5 h-3.5 text-black" />
            <span>Launch Outreach Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
