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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full sarvam-disc-periwinkle flex items-center justify-center font-semibold text-lg text-neutral-900 shadow-md">
              RV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
                  {contact.name} (राहुल वर्मा)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  94.2% PCM
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {contact.organization}
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

        {/* Info Grid */}
        <div className="my-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/10">
              <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block mb-1">
                Direct Candidate Line
              </span>
              <span className="font-semibold text-neutral-900 font-mono text-sm">
                {contact.phone}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/10">
              <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block mb-1">
                Assigned Voice Engine
              </span>
              <span className="font-semibold text-neutral-900 text-sm">
                {contact.assignedAgent} (Hindi/Eng)
              </span>
            </div>
          </div>

          {/* Inquiry topic */}
          <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/10 text-neutral-800">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block mb-1">
              Primary Academic Intent & Scholarship Tier
            </span>
            <span className="text-xs font-semibold text-neutral-900">
              {contact.interestTopic} (50% Tuition Fee Waiver Granted)
            </span>
          </div>

          {/* AI Call Summary Notes */}
          <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Bulbul V3 Neural Transcript Analysis</span>
            </div>
            <p className="text-xs text-neutral-600 italic leading-relaxed">
              &ldquo;{contact.notes}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-black/10">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-black/5 transition-all cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 shadow-md inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Play Verbatim Recording</span>
          </button>
        </div>
      </div>
    </div>
  );
}
