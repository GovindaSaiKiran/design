"use client";

import React from "react";
import {
  X,
  User,
  Play,
  FileText,
  Phone,
  Bot,
  Building,
  CheckCircle2,
} from "lucide-react";
import { mockContactIntelligence } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

interface ContactDossierModalProps {
  contactId?: string | null;
  contact?: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDossierModal({
  contactId,
  contact: propContact,
  isOpen,
  onClose,
}: ContactDossierModalProps) {
  if (!isOpen) return null;

  const contact = propContact || mockContactIntelligence.featuredContact;

  const handleClose = () => {
    try {
      soundSynth.play("click");
    } catch {}
    onClose();
  };

  const handlePlayRecording = () => {
    try {
      soundSynth.play("confirm");
      soundSynth.speak(`Playback initialized for ${contact?.name || "Candidate"}.`);
    } catch {}
    onClose();
  };

  if (!contact) {
    return (
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-150 select-none cursor-default"
      >
        <div className="relative w-full max-w-md bg-white rounded-[28px] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 text-center space-y-3 text-[#1A1A1A]">
          <div className="w-10 h-10 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] flex items-center justify-center mx-auto text-black/50">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#1A1A1A]">No Contact Selected</h3>
          <p className="text-xs text-black/55">
            Select a contact from your directory or call ledger to view their complete dossier.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2.5 rounded-full bg-[#111111] text-white font-semibold text-xs hover:bg-black transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-150 select-none cursor-default"
    >
      <div className="relative w-full max-w-lg bg-white rounded-[28px] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 sm:p-7 overflow-hidden text-[#1A1A1A]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D9C2FA] text-[#1A1A1A] flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              {contact.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                  {contact.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#C1F2D5] text-[#16856B] flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-black/55 flex items-center gap-1 mt-0.5">
                <Building className="w-3 h-3 text-black/40" />
                {contact.organization}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-black/40 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 pointer-events-none" />
          </button>
        </div>

        {/* Info Grid */}
        <div className="my-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06]">
              <span className="text-[10px] font-semibold text-black/40 uppercase tracking-wider block mb-1">
                Direct Contact Phone
              </span>
              <span className="font-semibold text-[#1A1A1A] text-xs flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-black/40" />
                {contact.phone}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06]">
              <span className="text-[10px] font-semibold text-black/40 uppercase tracking-wider block mb-1">
                Assigned Voice Engine
              </span>
              <span className="font-semibold text-[#1A1A1A] text-xs flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-[#1A1A1A]" />
                {contact.assignedAgent}
              </span>
            </div>
          </div>

          {/* Inquiry topic */}
          <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06]">
            <span className="text-[10px] font-semibold text-black/40 uppercase tracking-wider block mb-1">
              Interest Topic & Inquiries
            </span>
            <span className="text-xs font-semibold text-[#1A1A1A]">
              {contact.interestTopic}
            </span>
          </div>

          {/* AI Call Summary Notes */}
          <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.06]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] mb-1.5">
              <FileText className="w-3.5 h-3.5 text-black/40" />
              <span>AI Conversation Notes</span>
            </div>
            <p className="text-xs text-black/65 leading-relaxed">
              &ldquo;{contact.notes}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-black/60 hover:text-[#1A1A1A] bg-white border border-black/[0.08] hover:bg-[#FAF3E4] transition-all cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handlePlayRecording}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-black shadow-sm inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play Audio Recording</span>
          </button>
        </div>
      </div>
    </div>
  );
}
