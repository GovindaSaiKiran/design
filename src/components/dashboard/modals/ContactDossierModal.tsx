"use client";

import React from "react";
import {
  X,
  User,
  Play,
  Terminal,
} from "lucide-react";
import { mockContactIntelligence } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

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

  const handleClose = () => {
    soundSynth.play("click");
    onClose();
  };

  const handlePlayRecording = () => {
    soundSynth.play("confirm");
    soundSynth.speak(`Playback initialized for ${contact?.name || "Candidate"}.`);
    onClose();
  };

  if (!contact) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 select-none">
        <div className="relative w-full max-w-md bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl p-6 text-center space-y-3 font-mono text-white">
          <div className="w-10 h-10 rounded-[2px] bg-[#121215] border border-[#27272A] flex items-center justify-center mx-auto text-[#A1A1AA]">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Contact Selected</h3>
          <p className="text-xs text-[#A1A1AA]">
            Select a contact from your directory or call ledger to view their complete dossier.
          </p>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-[2px] bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="relative w-full max-w-lg bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl p-6 sm:p-7 overflow-hidden text-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[2px] bg-white text-black border border-white flex items-center justify-center font-bold font-mono text-xs shrink-0">
              {contact.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight uppercase font-mono">
                  {contact.name}
                </h3>
                <span className="px-2 py-0.5 rounded-[1px] text-[10px] font-mono font-bold bg-[#18181B] text-white border border-[#27272A] uppercase">
                  Verified Lead
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA] font-mono mt-0.5">
                {contact.organization}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-[2px] bg-[#121215] border border-[#27272A] hover:border-white text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Grid */}
        <div className="my-5 space-y-3.5 text-xs font-mono">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] text-white">
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-1">
                Direct Contact Phone
              </span>
              <span className="font-bold text-white text-xs">
                {contact.phone}
              </span>
            </div>

            <div className="p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] text-white">
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-1">
                Assigned Voice Engine
              </span>
              <span className="font-bold text-white text-xs">
                {contact.assignedAgent}
              </span>
            </div>
          </div>

          {/* Inquiry topic */}
          <div className="p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] text-white">
            <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block mb-1">
              Interest Topic &amp; Inquiries
            </span>
            <span className="text-xs font-semibold text-white">
              {contact.interestTopic}
            </span>
          </div>

          {/* AI Call Summary Notes */}
          <div className="p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] text-white">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-white" />
              <span className="uppercase tracking-wider text-[11px]">Neural Transcript Synthesis</span>
            </div>
            <p className="text-xs text-[#A1A1AA] italic leading-relaxed">
              &ldquo;{contact.notes}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#27272A]">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-[2px] text-xs font-mono font-bold text-[#A1A1AA] hover:text-white bg-transparent border border-[#27272A] hover:border-white transition-all cursor-pointer uppercase"
          >
            Close
          </button>

          <button
            onClick={handlePlayRecording}
            className="px-4 py-2 rounded-[2px] text-xs font-mono font-bold text-black bg-white hover:bg-zinc-200 border border-white shadow-2xs inline-flex items-center gap-2 cursor-pointer transition-all uppercase active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Play Audio Recording</span>
          </button>
        </div>
      </div>
    </div>
  );
}
