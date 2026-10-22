"use client";

import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Users,
  Bot,
  BookOpen,
  Target,
  Sliders,
  DollarSign,
  X,
  AlertCircle,
  Play,
  Calendar,
  Layers,
  PhoneCall,
} from "lucide-react";
import { CallingMode } from "@/types/schedule";

interface PreLaunchReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLaunch: () => void;
  isSubmitting: boolean;
  callingMode: CallingMode;
  campaignName: string;
  agentName: string;
  agentVoice: string;
  agentLanguage: string;
  campaignGoal: string;
  desiredOutcome: string;
  knowledgeSourcesSummary: string;
  totalContacts: number;
  eligibleContacts: number;
  excludedContacts: number;
  excludedReasons: string[];
  scheduleType: "now" | "later";
  scheduledDate: string;
  scheduledTime: string;
  timezone: string;
  concurrencyLimit: number;
  pacingDelaySec: number;
  maxRetries: number;
  estimatedMinutes: number;
  estimatedCostFormatted: string;
}

export default function PreLaunchReviewModal({
  isOpen,
  onClose,
  onConfirmLaunch,
  isSubmitting,
  callingMode,
  campaignName,
  agentName,
  agentVoice,
  agentLanguage,
  campaignGoal,
  desiredOutcome,
  knowledgeSourcesSummary,
  totalContacts,
  eligibleContacts,
  excludedContacts,
  excludedReasons,
  scheduleType,
  scheduledDate,
  scheduledTime,
  timezone,
  concurrencyLimit,
  pacingDelaySec,
  maxRetries,
  estimatedMinutes,
  estimatedCostFormatted,
}: PreLaunchReviewModalProps) {
  if (!isOpen) return null;

  const isBulk = callingMode === "bulk";

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E9E1D4] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#FAF5E9] px-6 py-4 border-b border-[#E9E1D4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#283A50] text-[#FAF5E9] flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-5 h-5 text-[#2E8066]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#283A50]">Pre-Launch Campaign Review</h3>
              <p className="text-xs text-[#707684]">
                Confirm execution parameters before dispatching calls
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg text-[#707684] hover:bg-white transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Campaign Title & Calling Mode Banner */}
          <div className="bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">Campaign Name</span>
              <h4 className="font-bold text-sm text-[#283A50] mt-0.5">{campaignName || "Untitled Outbound Campaign"}</h4>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                  isBulk
                    ? "bg-purple-50 text-purple-800 border-purple-200"
                    : "bg-emerald-50 text-[#2E8066] border-[#B8DEC8]"
                }`}
              >
                {isBulk ? "Bulk Calling (Multi-Channel)" : "Normal Calling (Sequential)"}
              </span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white text-[#283A50] border border-[#E9E1D4]">
                {scheduleType === "now" ? "Immediate Start" : "Scheduled For Later"}
              </span>
            </div>
          </div>

          {/* Grid of Key Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* AI Agent Configuration */}
            <div className="bg-white border border-[#E9E1D4] rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#283A50] font-bold">
                <Bot className="w-4 h-4 text-[#707684]" />
                <span>Assigned AI Agent</span>
              </div>
              <div className="space-y-1 text-[11px] text-[#707684]">
                <p>
                  <strong className="text-[#283A50]">Agent:</strong> {agentName}
                </p>
                <p>
                  <strong className="text-[#283A50]">Voice Model:</strong> {agentVoice}
                </p>
                <p>
                  <strong className="text-[#283A50]">Language:</strong> {agentLanguage}
                </p>
              </div>
            </div>

            {/* Audience Breakdown */}
            <div className="bg-white border border-[#E9E1D4] rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#283A50] font-bold">
                <Users className="w-4 h-4 text-[#283A50]" />
                <span>Recipient Contacts</span>
              </div>
              <div className="space-y-1 text-[11px] text-[#707684]">
                <div className="flex justify-between">
                  <span>Total Submitted:</span>
                  <span className="font-mono font-bold text-[#283A50]">{totalContacts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#2E8066]">
                  <span className="font-bold">Eligible to Call:</span>
                  <span className="font-mono font-bold">{eligibleContacts.toLocaleString()}</span>
                </div>
                {excludedContacts > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>Excluded (DND / Invalid / Dups):</span>
                    <span className="font-mono font-bold">{excludedContacts.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Calling Goal & Desired Outcome */}
          <div className="bg-white border border-[#E9E1D4] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-[#283A50] font-bold">
              <Target className="w-4 h-4 text-[#283A50]" />
              <span>Goal &amp; Desired Outcome</span>
            </div>
            <p className="text-[11px] text-[#283A50] leading-relaxed">
              <strong>Objective:</strong> {campaignGoal || "Not specified"}
            </p>
            <p className="text-[11px] text-[#283A50] leading-relaxed">
              <strong>Desired Outcome:</strong> {desiredOutcome || "Not specified"}
            </p>
          </div>

          {/* Grounded Knowledge Sources */}
          <div className="bg-white border border-[#E9E1D4] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-[#283A50] font-bold">
              <BookOpen className="w-4 h-4 text-[#283A50]" />
              <span>Grounded Knowledge Base</span>
            </div>
            <p className="text-[11px] text-[#707684] leading-relaxed">
              {knowledgeSourcesSummary || "Default University Admissions Knowledge Vector Base"}
            </p>
          </div>

          {/* Execution Cadence & Timing */}
          <div className="bg-white border border-[#E9E1D4] rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-[#283A50] font-bold">
              <Clock className="w-4 h-4 text-[#283A50]" />
              <span>Execution Timing &amp; Pacing</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#707684]">
              <div>
                <span className="text-[10px] block font-medium">Start Schedule:</span>
                <span className="font-bold text-[#283A50]">
                  {scheduleType === "now" ? "Immediate Dispatch" : `${scheduledDate} at ${scheduledTime}`}
                </span>
              </div>
              <div>
                <span className="text-[10px] block font-medium">Time Zone:</span>
                <span className="font-bold text-[#283A50]">{timezone}</span>
              </div>
              <div>
                <span className="text-[10px] block font-medium">Max Concurrency:</span>
                <span className="font-bold text-[#283A50]">
                  {isBulk ? `${concurrencyLimit} Channels` : "1 Channel (Sequential)"}
                </span>
              </div>
            </div>
          </div>

          {/* Usage & Cost Projection */}
          <div className="bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                Estimated Calling Usage &amp; Cost
              </span>
              <p className="text-[11px] text-[#707684] mt-0.5">
                Calculated at standard ~2.2 min avg duration per connected call
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold font-mono text-[#283A50] block">
                ~{estimatedMinutes.toLocaleString()} Calling Minutes
              </span>
              <span className="text-[11px] font-bold text-[#2E8066]">
                Est. Cost: {estimatedCostFormatted} (Drawn from allowance)
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#FAF5E9] px-6 py-4 border-t border-[#E9E1D4] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-white border border-[#E9E1D4] text-xs font-bold text-[#283A50] hover:bg-[#FAF5E9] transition-colors disabled:opacity-50"
          >
            ← Back to Edit
          </button>

          <button
            type="button"
            onClick={onConfirmLaunch}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#283A50] text-white text-xs font-bold hover:bg-[#283A50]/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating &amp; Launching Campaign...</span>
              </>
            ) : scheduleType === "now" ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#B8DEC8]" />
                <span>Start Calling ({eligibleContacts.toLocaleString()} Contacts)</span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5 text-[#C4A5E8]" />
                <span>Schedule Calls for {scheduledDate}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
