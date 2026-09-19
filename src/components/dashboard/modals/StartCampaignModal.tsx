"use client";

import React, { useState } from "react";
import { X, Send, Users, Calendar, Bot, Sparkles, Check, PhoneCall } from "lucide-react";

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
  const [title, setTitle] = useState("September Student Follow-up & Counseling");
  const [audience, setAudience] = useState("Brochure Downloads & JEE/EAMCET Registrations (1,500 students)");
  const [selectedAgent, setSelectedAgent] = useState("Admissions Agent & Student Support");
  const [scheduleTime, setScheduleTime] = useState("Immediate");
  const [concurrentLines, setConcurrentLines] = useState(25);

  if (!isOpen) return null;

  const handleLaunch = () => {
    onCampaignStarted?.(title, 1500);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000000] p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
              <Send className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                Launch Outbound Campaign
              </h3>
              <p className="text-xs font-bold text-black/70">
                Automated AI voice dialing for applicants & inquiries
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-[#ff8080] text-black border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 my-5 text-xs">
          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Campaign Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-black font-bold shadow-[3px_3px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Target Audience List
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-black font-bold shadow-[3px_3px_0px_#000000] focus:outline-none cursor-pointer transition-all"
            >
              <option value="Brochure Downloads & JEE/EAMCET Registrations (1,500 students)">
                Brochure Downloads & JEE/EAMCET Registrations (1,500 students)
              </option>
              <option value="High Intent Leads from Web & Inbound (412 students)">
                High Intent Leads from Web & Inbound (412 students)
              </option>
              <option value="Semester Fee Deadline Reminders (2,800 students)">
                Semester Fee Deadline Reminders (2,800 students)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
                Assigned Voice Agent
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border-2 border-black text-black font-bold shadow-[3px_3px_0px_#000000] focus:outline-none cursor-pointer transition-all"
              >
                <option value="Admissions Agent">Admissions Agent (Priya)</option>
                <option value="Student Support Agent">Student Support Agent (Rohan)</option>
                <option value="Admissions Agent & Student Support">Admissions & Support (Balanced)</option>
              </select>
            </div>

            <div>
              <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
                Concurrent Lines ({concurrentLines})
              </label>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={concurrentLines}
                onChange={(e) => setConcurrentLines(Number(e.target.value))}
                className="w-full accent-black mt-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#00f0ff] border-2 border-black text-black flex items-center justify-between shadow-[3px_3px_0px_#000000]">
            <span className="font-bold flex items-center gap-1.5 text-xs text-black">
              <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
              Smart Retry Logic (3 attempts if No Answer)
            </span>
            <span className="font-mono font-black text-xs bg-black text-[#d6ff38] px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000000]">ENABLED</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-black">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-slate-100 border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleLaunch}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#d6ff38] hover:bg-[#bbf01b] border-3 border-black shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] inline-flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            Launch Dialing Batch
          </button>
        </div>
      </div>
    </div>
  );
}
