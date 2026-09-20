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
    <div className="liquid-glass-card p-7 transition-all duration-300 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 border border-black/5 text-neutral-700">
              Pipeline Telemetry
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              {counts.highIntent} High Intent Inquiries
            </span>
          </div>

          {onExploreContacts && (
            <button
              onClick={onExploreContacts}
              className="text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-xl border border-black/5 transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <span>All Candidates</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
          Applicant Pipeline Intelligence
        </h3>
        <p className="text-xs text-neutral-500 mt-0.5">
          Real-time candidate clustering synthesized from speech emotion analysis and admission qualification criteria.
        </p>
      </div>

      {/* 4 Metric Badges Grid with Thin Black Borders */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-5">
        <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 hover:border-black/30 hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 mb-1">
            <UserPlus className="w-3.5 h-3.5 text-purple-600" />
            <span>New Inquiries</span>
          </div>
          <div className="text-3xl font-semibold text-neutral-900 font-mono tracking-tight">
            {counts.newContacts}
          </div>
        </div>

        <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 hover:border-black/30 hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>High Intent</span>
          </div>
          <div className="text-3xl font-semibold text-neutral-900 font-mono tracking-tight">
            {counts.highIntent}
          </div>
        </div>

        <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 hover:border-black/30 hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 mb-1">
            <RotateCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Follow-ups</span>
          </div>
          <div className="text-3xl font-semibold text-neutral-900 font-mono tracking-tight">
            {counts.followUps}
          </div>
        </div>

        <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 hover:border-black/30 hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enrolled/Resolved</span>
          </div>
          <div className="text-3xl font-semibold text-neutral-900 font-mono tracking-tight">
            {counts.resolved}
          </div>
        </div>
      </div>

      {/* Featured Candidate Dossier Snippet Card */}
      <div className="liquid-glass-subtle p-5 rounded-2xl border border-black/10 hover:border-black/20 transition-all">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-neutral-900 text-base">
                {featuredContact.name}
              </h4>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                High Interest Applicant
              </span>
            </div>
            <div className="text-xs font-mono text-neutral-500 flex items-center gap-1.5 mt-0.5">
              <Phone className="w-3 h-3 text-neutral-400" />
              {featuredContact.phone}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-neutral-400">Last interaction</span>
            <div className="text-xs font-semibold text-neutral-800 font-mono">
              {featuredContact.lastConversationTimeAgo}
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/60 backdrop-blur-md border border-black/5 text-xs text-neutral-600 italic my-3 leading-relaxed">
          &ldquo;{featuredContact.notes}&rdquo;
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-black/5">
          <span className="text-xs text-neutral-500">
            Handled by: <strong className="font-semibold text-neutral-900">{featuredContact.assignedAgent}</strong>
          </span>

          <button
            onClick={() => onViewContact?.(featuredContact.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <span>View Candidate Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
