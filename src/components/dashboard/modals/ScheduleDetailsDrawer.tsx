"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  Bot,
  RotateCcw,
  Ban,
  Copy,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Sparkles,
  FileText,
  Activity,
  ShieldCheck,
  PhoneOff,
  UserCheck,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import { ScheduledCampaign } from "@/types/schedule";
import { schedulesApi } from "@/lib/api/schedulesApi";

interface ScheduleDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: ScheduledCampaign | null;
  onRefresh: () => void;
  onDuplicate: (campaign: ScheduledCampaign) => void;
  onEdit: (campaign: ScheduledCampaign) => void;
}

export default function ScheduleDetailsDrawer({
  isOpen,
  onClose,
  campaign,
  onRefresh,
  onDuplicate,
  onEdit,
}: ScheduleDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<"contacts" | "config" | "logs">("contacts");
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  if (!isOpen || !campaign) return null;

  const handleRetryFailed = async () => {
    setActionLoading(true);
    setActionMessage(null);
    try {
      soundSynth.play("click");
      await schedulesApi.retryFailedCalls(campaign.id);
      setActionMessage("Retry initiated for failed/unanswered contacts.");
      onRefresh();
    } catch (err: unknown) {
      setActionMessage(err instanceof Error ? err.message : "Failed to retry calls");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      soundSynth.play("click");
      await schedulesApi.cancelSchedule(campaign.id, cancelReason || "Cancelled via dashboard");
      setConfirmCancelOpen(false);
      setActionMessage("Schedule successfully cancelled.");
      onRefresh();
    } catch (err: unknown) {
      setActionMessage(err instanceof Error ? err.message : "Failed to cancel schedule");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: ScheduledCampaign["status"]) => {
    switch (status) {
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF3E4] text-[#733F00] border border-[#FFD9A0]">
            <Clock className="w-3.5 h-3.5" />
            Scheduled
          </span>
        );
      case "running":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            Dialing Active
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            Completed
          </span>
        );
      case "partially-completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Partially Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            <Ban className="w-3.5 h-3.5 text-gray-500" />
            Cancelled
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const failedCount = campaign.contacts.filter(
    (c) => c.status === "failed" || c.status === "no-answer"
  ).length;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/25 backdrop-blur-xs animate-in fade-in duration-200 select-none font-sans text-[#1A1A1A]"
    >
      <div className="relative w-full max-w-xl h-full bg-white border-l border-black/[0.08] shadow-2xl p-6 sm:p-7 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-black/[0.06] shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getStatusBadge(campaign.status)}
              <span className="text-[11px] font-semibold text-black/45">
                ID: {campaign.id}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight mt-1">
              {campaign.name}
            </h3>
            <p className="text-xs text-black/55 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3 text-black/40" />
                {campaign.localScheduledTime}
              </span>
              <span>•</span>
              <span className="font-medium text-black/60">{campaign.timezone}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-black/40 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex items-center gap-2 py-3 border-b border-black/[0.06] shrink-0 flex-wrap">
          {campaign.status === "scheduled" && (
            <>
              <button
                onClick={() => onEdit(campaign)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] text-[#1A1A1A] border border-black/[0.08] hover:bg-[#FAF3E4] transition-all cursor-pointer"
              >
                Reschedule / Edit
              </button>
              <button
                onClick={() => setConfirmCancelOpen(true)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all cursor-pointer"
              >
                Cancel Schedule
              </button>
            </>
          )}

          {failedCount > 0 && campaign.status !== "running" && (
            <button
              onClick={handleRetryFailed}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#111111] text-white hover:bg-black transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry Failed ({failedCount})</span>
            </button>
          )}

          <button
            onClick={() => onDuplicate(campaign)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] text-black/70 border border-black/[0.08] hover:text-black hover:bg-[#FAF3E4] transition-all cursor-pointer"
          >
            <Copy className="w-3 h-3" />
            <span>Duplicate Configuration</span>
          </button>
        </div>

        {actionMessage && (
          <div className="mt-2 p-2.5 rounded-xl bg-[#FAF3E4] border border-[#FFD9A0] text-xs font-semibold text-[#733F00]">
            {actionMessage}
          </div>
        )}

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-4 gap-2.5 my-3 shrink-0 text-center">
          <div className="p-2.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06]">
            <span className="text-[10px] text-black/45 font-semibold uppercase">Total</span>
            <p className="text-base font-bold text-[#1A1A1A]">{campaign.stats.totalContacts}</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-green-50/60 border border-green-200/60">
            <span className="text-[10px] text-green-800 font-semibold uppercase">Connected</span>
            <p className="text-base font-bold text-green-700">{campaign.stats.completedCount}</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-200/60">
            <span className="text-[10px] text-amber-800 font-semibold uppercase">No Answer</span>
            <p className="text-base font-bold text-amber-700">{campaign.stats.noAnswerCount}</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-red-50/60 border border-red-200/60">
            <span className="text-[10px] text-red-800 font-semibold uppercase">Failed</span>
            <p className="text-base font-bold text-red-700">{campaign.stats.failedCount}</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-black/[0.06] pb-2 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeTab === "contacts"
                ? "bg-[#111111] text-white"
                : "text-black/50 hover:text-black"
            }`}
          >
            Contacts &amp; Outcomes ({campaign.contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeTab === "config"
                ? "bg-[#111111] text-white"
                : "text-black/50 hover:text-black"
            }`}
          >
            AI Agent Snapshot
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeTab === "logs"
                ? "bg-[#111111] text-white"
                : "text-black/50 hover:text-black"
            }`}
          >
            Execution Logs ({campaign.logs?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto flex-1 py-3 pr-1 space-y-3 text-xs">
          {activeTab === "contacts" && (
            <div className="space-y-2">
              {campaign.contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 rounded-2xl bg-[#FBF7ED]/70 border border-black/[0.06] flex items-center justify-between hover:bg-[#FBF7ED] transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#1A1A1A]">{contact.name}</span>
                      {contact.status === "completed" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                          Connected ({contact.durationSeconds}s)
                        </span>
                      )}
                      {contact.status === "no-answer" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          No Answer
                        </span>
                      )}
                      {contact.status === "failed" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                          Failed
                        </span>
                      )}
                      {contact.status === "pending" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          Pending
                        </span>
                      )}
                      {contact.status === "in-progress" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 animate-pulse">
                          Dialing...
                        </span>
                      )}
                      {contact.status === "skipped" && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          DND Skipped
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-black/50">
                      {contact.phone} {contact.organization ? `• ${contact.organization}` : ""}
                    </p>
                    {contact.failureReason && (
                      <p className="text-[10px] text-red-600 font-medium">
                        Reason: {contact.failureReason}
                      </p>
                    )}
                  </div>

                  <div className="text-right text-[10px] text-black/45">
                    {contact.callSid && (
                      <p className="font-mono text-[9px] text-black/40">{contact.callSid}</p>
                    )}
                    {contact.attempts > 0 && <p>{contact.attempts} dial attempt(s)</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "config" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-2">
                <span className="text-[10px] font-bold text-black/45 uppercase">Assigned Agent</span>
                <p className="font-bold text-xs text-[#1A1A1A]">{campaign.config.agentName}</p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-black/70 pt-1 border-t border-black/[0.04]">
                  <div>
                    <span className="text-black/40">Voice:</span> {campaign.config.voiceName}
                  </div>
                  <div>
                    <span className="text-black/40">Language:</span> {campaign.config.language}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-1">
                <span className="text-[10px] font-bold text-black/45 uppercase">Call Objective</span>
                <p className="text-xs text-[#1A1A1A] leading-relaxed">
                  {campaign.config.callObjective}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-1">
                <span className="text-[10px] font-bold text-black/45 uppercase">Instructions &amp; Guardrails</span>
                <p className="text-xs text-[#1A1A1A] leading-relaxed whitespace-pre-line">
                  {campaign.config.instructions}
                </p>
              </div>

              {campaign.config.openingScript && (
                <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-1">
                  <span className="text-[10px] font-bold text-black/45 uppercase">Opening Script</span>
                  <p className="text-xs text-[#1A1A1A] italic">
                    &ldquo;{campaign.config.openingScript}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-2 font-mono text-[11px]">
              {campaign.logs && campaign.logs.length > 0 ? (
                campaign.logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-[#FBF7ED] border border-black/[0.06] flex items-start gap-2"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        log.level === "success"
                          ? "bg-green-600"
                          : log.level === "warn"
                          ? "bg-amber-600"
                          : log.level === "error"
                          ? "bg-red-600"
                          : "bg-blue-600"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[10px] text-black/40">
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                        <span className="uppercase font-semibold">{log.level}</span>
                      </div>
                      <p className="text-black/80 font-sans mt-0.5">{log.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-black/40 font-sans text-center py-4">No execution logs recorded yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Cancellation Confirmation Modal */}
        {confirmCancelOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl p-5 max-w-sm w-full border border-black/10 shadow-xl space-y-3">
              <h4 className="font-bold text-sm text-[#1A1A1A]">Confirm Schedule Cancellation</h4>
              <p className="text-xs text-black/60 leading-relaxed">
                Are you sure you want to cancel this scheduled campaign? Any calls that have not yet been placed will be permanently aborted.
              </p>
              <input
                type="text"
                placeholder="Reason for cancellation (optional)"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FBF7ED] border border-black/[0.08] text-xs focus:outline-none"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setConfirmCancelOpen(false)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-black/60 hover:bg-gray-100"
                >
                  Keep Schedule
                </button>
                <button
                  onClick={handleCancel}
                  disabled={actionLoading}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-600 text-white hover:bg-red-700"
                >
                  {actionLoading ? "Cancelling..." : "Confirm Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
