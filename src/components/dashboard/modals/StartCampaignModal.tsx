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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md">
              <Send className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 font-serif">~ 𑁍 Work Agents 𑁍 ~</div>
              <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
                Launch Outreach Goal
              </h3>
              <p className="text-xs text-neutral-500">
                Set the admissions outcome and delegate autonomous batch calling
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 my-6 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1.5 text-xs">
              Admissions Goal / Campaign Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#fbfbfd] border border-black/10 text-neutral-900 focus:border-black/30 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1.5 text-xs">
              Target Candidate Register
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#fbfbfd] border border-black/10 text-neutral-800 focus:border-black focus:outline-none cursor-pointer transition-all font-medium"
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
              <label className="block font-semibold text-neutral-700 mb-1.5 text-xs">
                Assigned Voice Engine
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfd] border border-black/10 text-neutral-800 focus:border-black focus:outline-none cursor-pointer transition-all font-medium"
              >
                <option value="Maya AI (Hindi/English) & Neha AI (Telugu)">Maya (Hindi) + Neha (Telugu)</option>
                <option value="Ishita AI (Kannada) & Suhani AI (Bengali)">Ishita (Kannada) + Suhani (Bengali)</option>
                <option value="Vikram AI (Global English)">Vikram (Global English)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1.5 text-xs">
                Concurrent Trunks ({concurrentLines} SIP lines)
              </label>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={concurrentLines}
                onChange={(e) => setConcurrentLines(Number(e.target.value))}
                className="w-full accent-neutral-900 mt-3 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/10 flex items-center justify-between text-xs text-neutral-700">
            <span className="font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Automated WhatsApp Slot Passes & 3x Retry on No-Answer
            </span>
            <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-black/10">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-black/5 transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleLaunch}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 shadow-md inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Launch Outreach Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
