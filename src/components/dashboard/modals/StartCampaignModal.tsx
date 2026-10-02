"use client";

import React, { useState } from "react";
import { X, Send, Users, Calendar, Bot, Sparkles, Check, PhoneCall, Layers, ShieldCheck } from "lucide-react";

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
    onCampaignStarted?.(title, 1240);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center shadow-xs">
              <Send className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8ac926]">OUTBOUND CAMPAIGN</div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Launch Outreach Goal
              </h3>
              <p className="text-xs text-slate-500">
                Set the admissions outcome and delegate autonomous batch calling
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-[#cdfb56] text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 my-6 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5 text-xs">
              Admissions Goal / Campaign Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-[#cdfb56] focus:bg-[#f7fee7]/20 focus:outline-none transition-all shadow-2xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5 text-xs">
              Target Candidate Register
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-[#cdfb56] focus:outline-none cursor-pointer transition-all font-medium shadow-2xs"
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
              <label className="block font-semibold text-slate-700 mb-1.5 text-xs">
                Assigned Voice Engine
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 focus:border-[#cdfb56] focus:outline-none cursor-pointer transition-all font-medium shadow-2xs"
              >
                <option value="Maya AI (Hindi/English) & Neha AI (Telugu)">Maya (Hindi) + Neha (Telugu)</option>
                <option value="Ishita AI (Kannada) & Suhani AI (Bengali)">Ishita (Kannada) + Suhani (Bengali)</option>
                <option value="Vikram AI (Global English)">Vikram (Global English)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5 text-xs">
                Concurrent Trunks ({concurrentLines} SIP lines)
              </label>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={concurrentLines}
                onChange={(e) => setConcurrentLines(Number(e.target.value))}
                className="w-full accent-[#8ac926] mt-3 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f7fee7] border border-[#cdfb56]/60 flex items-center justify-between text-xs text-slate-800 shadow-2xs">
            <span className="font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8ac926]" />
              Automated WhatsApp Slot Passes & 3x Retry on No-Answer
            </span>
            <span className="font-mono text-xs font-bold text-slate-950 bg-[#cdfb56] px-2.5 py-0.5 rounded-full border border-[#bceb42]">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-[#f7fee7] border border-slate-200 hover:border-[#cdfb56] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleLaunch}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#cdfb56] hover:bg-[#bef03f] border border-[#bceb42] shadow-xs inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Launch Outreach Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
