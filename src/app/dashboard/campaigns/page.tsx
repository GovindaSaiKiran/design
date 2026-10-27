"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  Play,
  Pause,
  Plus,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  Radio,
  Calendar,
  Sparkles,
  PhoneOutgoing,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import StartCampaignModal from "@/components/dashboard/modals/StartCampaignModal";
import UploadContactsModal from "@/components/dashboard/modals/UploadContactsModal";
import ScheduleCallModal from "@/components/dashboard/modals/ScheduleCallModal";
import ScheduledCallsView from "@/components/dashboard/views/ScheduledCallsView";
import { CampaignData } from "@/types/dashboard";
import { mockCampaigns } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignData[]>(mockCampaigns);
  const [mainView, setMainView] = useState<"bulk" | "scheduled">("scheduled");
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const toggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: c.status === "active" ? "paused" : "active",
          };
        }
        return c;
      })
    );
  };

  const filteredCampaigns = campaigns.filter((c) => {
    if (filterStatus === "all") return true;
    return c.status === filterStatus;
  });

  const activeCount = campaigns.filter((c) => c.status === "active").length;
  const scheduledCount = campaigns.filter((c) => c.status === "scheduled").length;
  const completedCount = campaigns.filter((c) => c.status === "completed").length;

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A]">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/45 hover:text-black transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#733F00] bg-[#FFD9A0] px-3 py-0.5 rounded-full">
              Campaigns &amp; Bulk Calling
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Outbound Campaigns &amp; Bulk Calling
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Autonomous batch dialer cadence, lead verification triggers, and conversational voice outreach workflows.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-full border border-black/[0.06] transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-black/50" />
            <span>Import List</span>
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setScheduleModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#FAF3E4] hover:bg-[#F2E7CD] text-[#733F00] text-xs font-semibold px-4 py-2.5 rounded-full border border-[#FFD9A0] transition-all cursor-pointer shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#733F00]" />
            <span>Schedule Call</span>
          </button>

          <button
            onClick={() => setStartModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Active Outbound"
          icon={Send}
          description="Autonomous outbound batch dialing and live lead verification."
          metric={`${activeCount} active`}
          metricLabel={activeCount > 0 ? "Dialing queue active" : "No active campaigns"}
          status={activeCount > 0 ? "Dialing Active" : "Standby"}
          statusType={activeCount > 0 ? "ready" : "neutral"}
          actionLabel="View queue →"
          onClick={() => {
            setMainView("bulk");
            setFilterStatus("active");
          }}
        />

        <WorkspaceCard
          name="Scheduled Drives"
          icon={Calendar}
          description="Automated outreach cadences scheduled for upcoming dates."
          metric={`${scheduledCount} scheduled`}
          metricLabel={scheduledCount > 0 ? "Automated outreach queued" : "No drives scheduled"}
          status={scheduledCount > 0 ? "Queued" : "Standby"}
          statusType="neutral"
          actionLabel="Review schedule →"
          onClick={() => setMainView("scheduled")}
        />

        <WorkspaceCard
          name="Completed Campaigns"
          icon={CheckCircle2}
          description="Finished batch outreach campaigns with qualification yield."
          metric={`${completedCount} completed`}
          metricLabel={completedCount > 0 ? "Archived campaigns" : "No completed campaigns"}
          status="Audited"
          statusType="ready"
          actionLabel="Audit outcomes →"
          onClick={() => {
            setMainView("bulk");
            setFilterStatus("completed");
          }}
        />

        <WorkspaceCard
          name="SIP Trunk Concurrency"
          icon={Radio}
          description="Current dialer bandwidth allocated across regional channels."
          metric="0 Channels Active"
          metricLabel="Max 500 lines • Sub-140ms voice latency"
          status="Operational"
          statusType="ready"
          actionLabel="View telephony →"
          href="/dashboard/phone-numbers"
        />
      </div>

      {/* Primary View Mode Switcher */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2 p-1 bg-[#FBF7ED] rounded-full border border-black/[0.06]">
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setMainView("scheduled");
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2 ${
              mainView === "scheduled"
                ? "bg-[#111111] text-white shadow-xs font-bold"
                : "text-black/60 hover:text-black"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Scheduled Outbound Calls</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                mainView === "scheduled"
                  ? "bg-white/20 text-white"
                  : "bg-[#FFD9A0] text-[#733F00]"
              }`}
            >
              Automated
            </span>
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setMainView("bulk");
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2 ${
              mainView === "bulk"
                ? "bg-[#111111] text-white shadow-xs font-bold"
                : "text-black/60 hover:text-black"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Batch Dialer Drives</span>
          </button>
        </div>
      </div>

      {/* Main View Display */}
      {mainView === "scheduled" ? (
        <ScheduledCallsView />
      ) : (
        <>
          {/* Filter Tabs */}
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { id: "all", label: "All Campaigns" },
                { id: "active", label: "Active" },
                { id: "scheduled", label: "Scheduled" },
                { id: "completed", label: "Completed" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    filterStatus === tab.id
                      ? "bg-[#111111] text-white shadow-sm"
                      : "bg-[#FBF7ED] text-black/60 hover:text-black border border-black/[0.06]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-black/45 font-medium">
              {filteredCampaigns.length} campaigns
            </span>
          </div>

          {/* Campaigns List */}
          <div className="space-y-4">
            {filteredCampaigns.length === 0 ? (
              <div className="bg-white rounded-[26px] border border-black/[0.06] p-10 sm:p-14 text-center shadow-2xs space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FFD9A0] text-[#733F00] flex items-center justify-center mx-auto">
                  <Send className="w-7 h-7 text-[#733F00]" />
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h2 className="text-base font-bold text-[#1A1A1A]">No campaigns match filter</h2>
                  <p className="text-xs text-black/55 leading-relaxed">
                    Create a new automated outreach campaign or reset filter criteria to see all cadences.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setStartModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                    <span>Start New Campaign</span>
                  </button>
                </div>
              </div>
            ) : (
              filteredCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-white rounded-[26px] border border-black/[0.06] p-6 shadow-2xs space-y-4 transition-all hover:border-black/15"
                >
                  {/* Top Row: Title, Agent & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-0.5 rounded-full ${
                            camp.status === "active"
                              ? "bg-[#C1F2D5] text-[#0D593F]"
                              : camp.status === "scheduled"
                              ? "bg-[#BCD0F5] text-[#1E3A8A]"
                              : "bg-black/[0.04] text-black/60"
                          }`}
                        >
                          {camp.status === "active" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16856B] animate-pulse" />
                          )}
                          <span className="capitalize">{camp.status}</span>
                        </span>
                        <span className="text-xs text-black/20">•</span>
                        <span className="text-xs text-black/55">
                          Assigned Agent: <strong className="text-[#1A1A1A]">{camp.assignedAgent}</strong>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] tracking-tight">
                        {camp.title}
                      </h3>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {camp.status !== "completed" && (
                        <button
                          onClick={() => toggleCampaignStatus(camp.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                        >
                          {camp.status === "active" ? (
                            <>
                              <Pause className="w-3.5 h-3.5 text-black/50" />
                              <span>Pause Cadence</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 text-[#16856B]" />
                              <span>Resume Cadence</span>
                            </>
                          )}
                        </button>
                      )}

                      <Link
                        href="/dashboard/contacts"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5 text-black/50" />
                        <span>View Audience ({camp.totalContacts})</span>
                      </Link>
                    </div>
                  </div>

                  {/* Target Audience & Schedule */}
                  <div className="text-xs text-black/60 bg-[#FBF7ED] p-3.5 rounded-[18px] border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-semibold text-[#1A1A1A]">Target Audience: </span>
                      <span>{camp.targetAudience}</span>
                    </div>
                    <div className="text-[11px] text-black/50 font-medium shrink-0">
                      {camp.estTimeRemaining} • Started {camp.startDate}
                    </div>
                  </div>

                  {/* Progress Bar & Numerical Metrics */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-black/55">
                        Outreach Progress ({camp.completedCount} / {camp.totalContacts} Contacts Reached)
                      </span>
                      <span className="font-bold text-[#1A1A1A]">{camp.progressPercent}%</span>
                    </div>

                    <div className="w-full h-2.5 bg-[#FBF7ED] rounded-full overflow-hidden border border-black/[0.06]">
                      <div
                        className="h-full bg-[#111111] transition-all duration-500 rounded-full"
                        style={{ width: `${camp.progressPercent}%` }}
                      />
                    </div>

                    {/* Sub-metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
                      <div className="p-3.5 rounded-[18px] bg-[#FBF7ED] border border-black/[0.06]">
                        <span className="text-black/45 block text-[11px] font-semibold uppercase tracking-wider">Connected</span>
                        <span className="font-bold text-[#16856B] text-base mt-0.5 block">
                          {camp.completedCount}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-[18px] bg-[#FBF7ED] border border-black/[0.06]">
                        <span className="text-black/45 block text-[11px] font-semibold uppercase tracking-wider">No Answer</span>
                        <span className="font-bold text-black/60 text-base mt-0.5 block">
                          {camp.noAnswerCount}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-[18px] bg-[#FBF7ED] border border-black/[0.06]">
                        <span className="text-black/45 block text-[11px] font-semibold uppercase tracking-wider">Failed</span>
                        <span className="font-bold text-[#B42318] text-base mt-0.5 block">
                          {camp.failedCount}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-[18px] bg-[#FBF7ED] border border-black/[0.06]">
                        <span className="text-black/45 block text-[11px] font-semibold uppercase tracking-wider">Dispatch Window</span>
                        <span className="font-bold text-[#1A1A1A] text-xs mt-1 block">
                          {camp.startDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Modals */}
      <ScheduleCallModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
      <StartCampaignModal
        isOpen={startModalOpen}
        onClose={() => setStartModalOpen(false)}
      />
      <UploadContactsModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
}
