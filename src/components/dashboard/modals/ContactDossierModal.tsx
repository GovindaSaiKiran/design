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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-4 border-black shadow-[12px_12px_0px_#000000] p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-black text-[#d6ff38] border-2 border-black flex items-center justify-center font-black text-lg shadow-[3px_3px_0px_#000000]">
              RV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-black uppercase">
                  {contact.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                  High Intent Lead
                </span>
              </div>
              <p className="text-xs font-bold text-black/70">
                {contact.organization}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-black hover:text-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Info Grid */}
        <div className="my-4 space-y-3 text-xs font-bold text-black">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#fcffe0] border-2 border-black shadow-[2px_2px_0px_#000000]">
              <span className="text-[10px] font-black text-black/60 uppercase tracking-wider block mb-1">
                Direct Phone
              </span>
              <span className="font-black text-black font-mono text-sm">
                {contact.phone}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000000]">
              <span className="text-[10px] font-black text-black/60 uppercase tracking-wider block mb-1">
                Assigned AI Agent
              </span>
              <span className="font-black text-black">
                {contact.assignedAgent}
              </span>
            </div>
          </div>

          {/* Inquiry topic */}
          <div className="p-3.5 rounded-xl bg-[#d6ff38] border-2 border-black shadow-[3px_3px_0px_#000000]">
            <span className="text-[10px] font-black text-black uppercase tracking-wider block mb-1">
              Primary Voice Intent Inquired
            </span>
            <span className="text-xs font-black text-black">
              {contact.interestTopic}
            </span>
          </div>

          {/* AI Call Summary Notes */}
          <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000]">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-black mb-2">
              <Bot className="w-4 h-4 stroke-[2.5]" />
              <span>AI Synthesized Transcript Analysis</span>
            </div>
            <p className="text-xs font-bold text-black/80 italic leading-relaxed">
              &ldquo;{contact.notes}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t-3 border-black">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_#000000] cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#d6ff38] hover:bg-black hover:text-[#d6ff38] border-3 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play Latest Recording</span>
          </button>
        </div>
      </div>
    </div>
  );
}
