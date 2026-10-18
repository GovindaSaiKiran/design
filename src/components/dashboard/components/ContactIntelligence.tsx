"use client";

import React from "react";
import { mockContactIntelligence } from "@/data/mock/dashboardData";
import { Users, UserPlus, Flame, RotateCw, CheckCircle2, ArrowUpRight, Phone, MessageSquare, Sparkles } from "lucide-react";

interface ContactIntelligenceProps {
  onViewContact?: (contactId: string) => void;
  onExploreContacts?: () => void;
}

export default function ContactIntelligence({
  onViewContact,
  onExploreContacts,
}: ContactIntelligenceProps) {
  const { counts, featuredContact } = mockContactIntelligence;

  return (
    <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06]">
              Pipeline Telemetry
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wider bg-[#FFD9A0] text-[#9A5B00]">
              {counts.highIntent} High Intent Contacts
            </span>
          </div>

          {onExploreContacts && (
            <button
              onClick={onExploreContacts}
              className="text-xs font-semibold text-[#1A1A1A] bg-white hover:bg-[#FAF3E4] px-3.5 py-1.5 rounded-full border border-black/[0.08] transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>All Contacts</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black/60" />
            </button>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight font-sans">
          Pipeline Intelligence
        </h3>
        <p className="text-xs text-black/55 mt-0.5">
          Real-time contact clustering synthesized from speech emotion analysis and qualification criteria.
        </p>
      </div>

      {/* 4 Metric Badges Grid with Warm Pastel Surfaces */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-5">
        <div className="bg-[#FAF3E4]/40 p-4 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black/50 mb-1">
            <UserPlus className="w-3.5 h-3.5 text-[#553C9A]" />
            <span>New Contacts</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-sans tracking-tight">
            {counts.newContacts}
          </div>
        </div>

        <div className="bg-[#FAF3E4]/40 p-4 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black/50 mb-1">
            <Flame className="w-3.5 h-3.5 text-[#9A5B00]" />
            <span>High Intent</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-sans tracking-tight">
            {counts.highIntent}
          </div>
        </div>

        <div className="bg-[#FAF3E4]/40 p-4 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black/50 mb-1">
            <RotateCw className="w-3.5 h-3.5 text-[#2451B2]" />
            <span>Follow-ups</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-sans tracking-tight">
            {counts.followUps}
          </div>
        </div>

        <div className="bg-[#FAF3E4]/40 p-4 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black/50 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B]" />
            <span>Converted/Resolved</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-sans tracking-tight">
            {counts.resolved}
          </div>
        </div>
      </div>

      {/* Featured Candidate Dossier Snippet Card */}
      {featuredContact ? (
        <div className="bg-[#FAF3E4]/30 p-5 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] transition-all">
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-[#1A1A1A] text-base font-sans">
                  {featuredContact.name}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#C1F2D5] text-[#16856B]">
                  High Interest Contact
                </span>
              </div>
              <div className="text-xs font-mono text-black/50 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-3 h-3 text-black/40" />
                {featuredContact.phone}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-black/40">Last interaction</span>
              <div className="text-xs font-semibold text-[#1A1A1A] font-mono">
                {featuredContact.lastConversationTimeAgo}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-black/[0.05] text-xs text-black/70 italic my-3 leading-relaxed shadow-2xs">
            &ldquo;{featuredContact.notes}&rdquo;
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-black/[0.05]">
            <span className="text-xs text-black/55">
              Handled by: <strong className="font-semibold text-[#1A1A1A]">{featuredContact.assignedAgent}</strong>
            </span>

            <button
              onClick={() => onViewContact?.(featuredContact.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span>View Contact Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#FAF3E4]/30 p-6 rounded-2xl border border-black/[0.05] text-center space-y-2">
          <Users className="w-6 h-6 text-black/40 mx-auto" />
          <p className="text-xs font-semibold text-[#1A1A1A]">No contact dossier featured</p>
          <p className="text-[11px] text-black/50 max-w-sm mx-auto">
            High-intent contacts requiring immediate callback or human intervention will be featured here automatically.
          </p>
        </div>
      )}
    </div>
  );
}
