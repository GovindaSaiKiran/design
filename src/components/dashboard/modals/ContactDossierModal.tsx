"use client";

import React from "react";
import {
  X,
  User,
  Phone,
  Building2,
  Mail,
  Calendar,
  Flame,
  CheckCircle2,
  MessageSquare,
  Bot,
  Play,
  Share2,
  Sparkles,
  Award,
} from "lucide-react";
import { mockContactIntelligence } from "@/data/mock/dashboardData";

interface ContactDossierModalProps {
  contactId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDossierModal({
  contactId,
  isOpen,
  onClose,
}: ContactDossierModalProps) {
  if (!isOpen) return null;

  const contact = mockContactIntelligence.featuredContact;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center font-bold text-base shadow-xs">
              RV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {contact.name} (राहुल वर्मा)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 border border-[#cdfb56]">
                  94.2% PCM
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {contact.organization}
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

        {/* Info Grid */}
        <div className="my-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#cdfb56] transition-colors shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Direct Candidate Line
              </span>
              <span className="font-bold text-slate-900 font-mono text-sm">
                {contact.phone}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#cdfb56] transition-colors shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Assigned Voice Engine
              </span>
              <span className="font-bold text-slate-900 text-sm">
                {contact.assignedAgent} (Hindi/Eng)
              </span>
            </div>
          </div>

          {/* Inquiry topic */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#cdfb56] text-slate-800 transition-colors shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Primary Academic Intent & Scholarship Tier
            </span>
            <span className="text-xs font-semibold text-slate-900">
              {contact.interestTopic} (50% Tuition Fee Waiver Granted)
            </span>
          </div>

          {/* AI Call Summary Notes */}
          <div className="p-4 rounded-2xl bg-[#f7fee7] border border-[#cdfb56]/60 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
              <Sparkles className="w-4 h-4 text-[#8ac926]" />
              <span>Voice Intelligence Neural Transcript Analysis</span>
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              &ldquo;{contact.notes}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-[#f7fee7] border border-slate-200 hover:border-[#cdfb56] transition-all cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#cdfb56] hover:bg-[#bef03f] border border-[#bceb42] shadow-xs inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Play Verbatim Recording</span>
          </button>
        </div>
      </div>
    </div>
  );
}
