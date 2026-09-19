"use client";

import React from "react";
import { mockContactIntelligence } from "@/data/mock/dashboardData";
import { Users, UserPlus, Flame, RotateCw, CheckCircle2, ArrowUpRight, Phone, MessageSquare, ShieldAlert } from "lucide-react";

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
    <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38] border border-black shadow-[2px_2px_0px_#000000] -rotate-1">
              PIPELINE TELEMETRY
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              {counts.highIntent} HIGH INTENT INQUIRIES
            </span>
          </div>

          <button
            onClick={onExploreContacts}
            className="text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-[#ffe600] px-3 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all inline-flex items-center gap-1 cursor-pointer"
          >
            <span>All Students</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        <h3 className="text-xl font-black text-black tracking-tight uppercase">
          Students & Contacts Intelligence
        </h3>
        <p className="text-xs font-bold text-black/70 mt-0.5">
          Automated classification derived from live conversational voice intents & admission applications
        </p>
      </div>

      {/* 4 Metric Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="p-4 rounded-xl bg-[#c084fc] border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black mb-1">
            <UserPlus className="w-3.5 h-3.5 text-black stroke-[3]" />
            <span>New Inquiries</span>
          </div>
          <div className="text-3xl font-black text-black font-mono">
            {counts.newContacts}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#ffe600] border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black mb-1">
            <Flame className="w-3.5 h-3.5 text-black stroke-[3]" />
            <span>High Intent</span>
          </div>
          <div className="text-3xl font-black text-black font-mono">
            {counts.highIntent}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#00f0ff] border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black mb-1">
            <RotateCw className="w-3.5 h-3.5 text-black stroke-[3]" />
            <span>Follow-ups</span>
          </div>
          <div className="text-3xl font-black text-black font-mono">
            {counts.followUps}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#d6ff38] border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
            <span>Resolved</span>
          </div>
          <div className="text-3xl font-black text-black font-mono">
            {counts.resolved}
          </div>
        </div>
      </div>

      {/* Featured Contact Card */}
      <div className="p-4 rounded-xl bg-[#f8fafc] border-2 border-black shadow-[4px_4px_0px_#000000] relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-black text-base">
                {featuredContact.name}
              </h4>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                HIGH INTEREST LEAD
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-black/70 flex items-center gap-1 mt-0.5">
              <Phone className="w-3.5 h-3.5 stroke-[2.5] text-black" />
              {featuredContact.phone}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-black uppercase text-black/60">Last conversation</span>
            <div className="text-xs font-black text-black font-mono">
              {featuredContact.lastConversationTimeAgo}
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold text-black/90 line-clamp-2 my-2.5 italic bg-white p-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000]">
          &ldquo;{featuredContact.notes}&rdquo;
        </p>

        <div className="flex items-center justify-between pt-2 border-t-2 border-black">
          <span className="text-xs font-bold text-black/80">
            Handled by: <strong className="font-black text-black underline">{featuredContact.assignedAgent}</strong>
          </span>

          <button
            onClick={() => onViewContact?.(featuredContact.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d6ff38] hover:bg-[#bbf01b] text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
          >
            <span>View Student Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
