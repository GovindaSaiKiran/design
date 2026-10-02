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
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import StartCampaignModal from "@/components/dashboard/modals/StartCampaignModal";
import UploadContactsModal from "@/components/dashboard/modals/UploadContactsModal";
import { CampaignData } from "@/types/dashboard";
import { mockCampaigns } from "@/data/mock/dashboardData";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignData[]>(mockCampaigns);
  const [startModalOpen, setStartModalOpen] = useState(false);
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

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase transition-colors"
            >
              WORKSPACES
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-950 bg-[#cdfb56]/30 px-2.5 py-0.5 rounded-full border border-[#cdfb56]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926]" />
              Outreach Engine Active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Campaigns Workspace
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Autonomous batch dialing, outreach cadences, and student qualification workflows.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#f7fee7] text-slate-800 hover:text-slate-950 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:border-[#cdfb56] shadow-2xs transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Import List</span>
          </button>

          <button
            onClick={() => setStartModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950" />
            <span>Start Campaign</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Active Outbound"
          icon={Send}
          description="September Student Follow-up & Merit Scholarship Verification."
          metric="68% progress"
          metricLabel="842 of 1,240 contacts reached"
          status="Dialing live"
          statusType="running"
          actionLabel="View queue →"
          onClick={() => setFilterStatus("active")}
        />

        <WorkspaceCard
          name="Scheduled Drives"
          icon={Calendar}
          description="Open Day & Engineering Expo Invitation cadence launching Sep 20."
          metric="2,500 queued"
          metricLabel="High School Seniors & STEM Applicants"
          status="Starts in 3d"
          statusType="neutral"
          actionLabel="Review schedule →"
          onClick={() => setFilterStatus("scheduled")}
        />

        <WorkspaceCard
          name="Completed Drives"
          icon={CheckCircle2}
          description="Semester Fee Deadline & Scholarship Verification finished."
          metric="950 completed"
          metricLabel="93.6% connection & verification yield"
          status="100% finished"
          statusType="ready"
          actionLabel="Audit outcomes →"
          onClick={() => setFilterStatus("completed")}
        />

        <WorkspaceCard
          name="SIP Concurrency"
          icon={Radio}
          description="Current dialer bandwidth allocated across regional telephony channels."
          metric="12 channels"
          metricLabel="Sub-140ms audio response latency"
          status="Optimal capacity"
          statusType="live"
          actionLabel="View telephony →"
          href="/dashboard/phone-numbers"
        />
      </div>

      {/* ======================================================================= */}
      {/* FILTER TABS                                                             */}
      {/* ======================================================================= */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-1.5">
          {[
            { id: "all", label: "All Campaigns" },
            { id: "active", label: "Active" },
            { id: "scheduled", label: "Scheduled" },
            { id: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-[#cdfb56] text-slate-950 border border-[#bceb42] shadow-2xs"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Showing {filteredCampaigns.length} campaigns
        </span>
      </div>

      {/* ======================================================================= */}
      {/* CAMPAIGNS LIST                                                          */}
      {/* ======================================================================= */}
      <div className="space-y-4">
        {filteredCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#cdfb56] p-5 shadow-xs transition-all space-y-4"
          >
            {/* Top Row: Title, Agent & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      camp.status === "active"
                        ? "bg-[#cdfb56]/40 text-slate-950 border-[#cdfb56]"
                        : camp.status === "scheduled"
                        ? "bg-slate-100 text-slate-700 border-slate-200"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    {camp.status === "active" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926] animate-pulse" />
                    )}
                    <span className="uppercase">{camp.status}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-medium">•</span>
                  <span className="text-xs font-semibold text-slate-600">
                    Agent: {camp.assignedAgent}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {camp.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {camp.status !== "completed" && (
                  <button
                    onClick={() => toggleCampaignStatus(camp.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                  >
                    {camp.status === "active" ? (
                      <>
                        <Pause className="w-3 h-3 text-amber-600" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-[#8ac926]" />
                        <span>Resume</span>
                      </>
                    )}
                  </button>
                )}

                <Link
                  href="/dashboard/contacts"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-[#cdfb56] text-slate-800 hover:text-slate-950 border border-slate-200 hover:border-[#bceb42] shadow-2xs transition-all cursor-pointer"
                >
                  <Users className="w-3 h-3" />
                  <span>View Leads</span>
                </Link>
              </div>
            </div>

            {/* Target Audience & Schedule */}
            <div className="text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-slate-700">Audience: </span>
                <span>{camp.targetAudience}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono shrink-0">
                {camp.estTimeRemaining}
              </div>
            </div>

            {/* Progress Bar & Numerical Metrics */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">
                  Outreach Progress ({camp.completedCount} / {camp.totalContacts} Contacts Reached)
                </span>
                <span className="font-mono text-slate-900">{camp.progressPercent}%</span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-gradient-to-r from-[#cdfb56] to-[#8ac926] rounded-full transition-all duration-500"
                  style={{ width: `${camp.progressPercent}%` }}
                />
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-lg bg-white border border-slate-200/70">
                  <span className="text-slate-500 block">Connected</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {camp.completedCount}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200/70">
                  <span className="text-slate-500 block">No Answer / Busy</span>
                  <span className="font-bold text-slate-700 font-mono">
                    {camp.noAnswerCount}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200/70">
                  <span className="text-slate-500 block">Failed / Invalid</span>
                  <span className="font-bold text-slate-500 font-mono">
                    {camp.failedCount}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200/70">
                  <span className="text-slate-500 block">Est. Completion</span>
                  <span className="font-bold text-slate-900">
                    {camp.startDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
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
