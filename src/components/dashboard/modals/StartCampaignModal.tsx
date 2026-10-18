"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, Check, PhoneCall, AlertCircle, ShieldCheck } from "lucide-react";
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
  const [title, setTitle] = useState("JoSAA Round 1 Cutoff & Merit Verification");
  const [audience, setAudience] = useState("High-Percentile PCM Applicants (1,240 Verified Candidates)");
  const [selectedAgent, setSelectedAgent] = useState("Maya AI (Hindi/English) & Neha AI (Telugu)");
  const [concurrentLines, setConcurrentLines] = useState(30);
  const [consentAcknowledged, setConsentAcknowledged] = useState(false);

  if (!isOpen) return null;

  const handleLaunch = () => {
    if (!consentAcknowledged) {
      alert("Please confirm regulatory compliance and consent before initiating bulk calling.");
      return;
    }
    try { soundSynth.play("confirm"); } catch {}
    onCampaignStarted?.(title, 1240);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[28px] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 sm:p-7 overflow-hidden text-[#1A1A1A]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D9C2FA] text-[#1A1A1A] flex items-center justify-center shadow-xs">
              <Send className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">OUTBOUND CAMPAIGN</span>
              <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                Launch Outbound Campaign
              </h3>
              <p className="text-xs text-black/55">
                Configure autonomous bulk voice calls and scheduled follow-ups
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              onClose();
            }}
            className="p-2 rounded-full text-black/40 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 my-5 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
              Campaign Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all font-medium text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
              Target Candidate / Lead Register
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-[#1A1A1A] focus:outline-none focus:border-black/30 cursor-pointer transition-all text-xs font-medium"
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
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                Assigned AI Agent
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-[#1A1A1A] focus:outline-none focus:border-black/30 cursor-pointer transition-all text-xs font-medium"
              >
                <option value="Maya AI (Hindi/English) & Neha AI (Telugu)">Maya (Hindi) + Neha (Telugu)</option>
                <option value="Ishita AI (Kannada) & Suhani AI (Bengali)">Ishita (Kannada) + Suhani (Bengali)</option>
                <option value="Vikram AI (Global English)">Vikram (Global English)</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#1A1A1A]">
                  Concurrent Trunks
                </label>
                <span className="text-xs font-bold text-[#1A1A1A]">{concurrentLines} lines</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={concurrentLines}
                onChange={(e) => setConcurrentLines(Number(e.target.value))}
                className="w-full accent-[#111111] mt-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#BCD0F5]/40 border border-[#A8C3F0]/60 flex items-start gap-2.5 text-xs text-[#1A1A1A]">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[11px] text-[#1A1A1A]">Automated Multichannel Delivery</p>
              <p className="text-[11px] text-black/60 mt-0.5 leading-relaxed">
                Includes automated WhatsApp confirmation dispatch and up to 3x smart redial attempts for unanswered calls.
              </p>
            </div>
          </div>

          <label className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] cursor-pointer hover:border-black/20 transition-all">
            <input
              type="checkbox"
              checked={consentAcknowledged}
              onChange={(e) => setConsentAcknowledged(e.target.checked)}
              className="mt-0.5 rounded accent-[#111111] cursor-pointer"
            />
            <span className="text-[11px] text-black/60 leading-tight">
              I confirm these contacts have provided opt-in consent for transactional voice updates in compliance with regulatory and telecom standards.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              onClose();
            }}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-black/60 hover:text-[#1A1A1A] bg-white border border-black/[0.08] hover:bg-[#FAF3E4] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleLaunch}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-all shadow-sm ${
              consentAcknowledged
                ? "bg-[#111111] hover:bg-black text-white"
                : "bg-black/10 text-black/30 cursor-not-allowed"
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Launch Campaign</span>
          </button>
        </div>
      </div>
    </div>
  );
}
