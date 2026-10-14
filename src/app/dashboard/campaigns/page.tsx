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
import { soundSynth } from "@/lib/audio-synth";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignData[]>(mockCampaigns);
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const toggleCampaignStatus = (id: string) => {
    try { soundSynth.play("click"); } catch {}
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
    <div className="space-y-6 sm:space-y-8 select-none text-white">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#71717A] hover:text-white transition-colors"
            >
              OUTREACH WORKSPACE
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white bg-[#121215] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {campaigns.length} CADENCES CONFIGURED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Campaigns & Autonomous Batch Dialing
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Autonomous batch dialer cadence, qualification triggers, and programmatic voice workflows.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setUploadModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-mono uppercase tracking-wider px-3.5 py-2 rounded-[2px] border border-[#27272A] hover:border-white transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>Import List</span>
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("confirm"); } catch {}
              setStartModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-black" />
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
          description="Autonomous outbound batch dialing and live lead verification."
          metric="0 active"
          metricLabel="0 contacts reached"
          status="Idle"
          statusType="neutral"
          actionLabel="View queue →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setFilterStatus("active");
          }}
        />

        <WorkspaceCard
          name="Scheduled Drives"
          icon={Calendar}
          description="Automated outreach cadences scheduled for upcoming calendar dates."
          metric="0 queued"
          metricLabel="No cadences scheduled"
          status="None"
          statusType="neutral"
          actionLabel="Review schedule →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setFilterStatus("scheduled");
          }}
        />

        <WorkspaceCard
          name="Completed Drives"
          icon={CheckCircle2}
          description="Finished batch outreach campaigns with qualification yield."
          metric="0 completed"
          metricLabel="0% verification yield"
          status="None"
          statusType="ready"
          actionLabel="Audit outcomes →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setFilterStatus("completed");
          }}
        />

        <WorkspaceCard
          name="SIP Concurrency"
          icon={Radio}
          description="Current dialer bandwidth allocated across regional telephony channels."
          metric="16 channels"
          metricLabel="Sub-140ms audio response latency"
          status="Operational"
          statusType="live"
          actionLabel="View telephony →"
          href="/dashboard/phone-numbers"
        />
      </div>

      {/* ======================================================================= */}
      {/* FILTER TABS                                                             */}
      {/* ======================================================================= */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
        <div className="flex items-center gap-1.5">
          {[
            { id: "all", label: "All Campaigns" },
            { id: "active", label: "Active" },
            { id: "scheduled", label: "Scheduled" },
            { id: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setFilterStatus(tab.id);
              }}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-white text-black font-bold shadow-xs"
                  : "bg-[#09090B] text-[#71717A] hover:text-white border border-[#27272A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#71717A] font-mono uppercase">
          [ {filteredCampaigns.length} CADENCES ]
        </span>
      </div>

      {/* ======================================================================= */}
      {/* CAMPAIGNS LIST                                                          */}
      {/* ======================================================================= */}
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-8 sm:p-12 text-center shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-[2px] bg-[#121215] text-white flex items-center justify-center mx-auto border border-[#27272A]">
              <Send className="w-8 h-8 text-white" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider">No campaigns created yet</h2>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Upload a CSV contact list to start automated outbound batch calling with your autonomous voice workforce.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  try { soundSynth.play("confirm"); } catch {}
                  setStartModalOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-[2px] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>Start First Campaign</span>
              </button>
              <button
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setUploadModalOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded-[2px] border border-[#27272A] hover:border-white transition-all cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-[#A1A1AA]" />
                <span>Import Contact List</span>
              </button>
            </div>
          </div>
        ) : (
          filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-[#09090B] rounded-[2px] border border-[#27272A] hover:border-white/60 p-5 transition-all space-y-4 group"
            >
              {/* Top Row: Title, Agent & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#121215] text-white px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                      {camp.status === "active" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                      <span>{camp.status}</span>
                    </span>
                    <span className="text-xs text-[#3F3F46] font-mono">•</span>
                    <span className="text-xs font-mono text-[#A1A1AA]">
                      AGENT: <span className="text-white font-bold">{camp.assignedAgent}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {camp.title}
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {camp.status !== "completed" && (
                    <button
                      onClick={() => toggleCampaignStatus(camp.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-mono uppercase tracking-wider bg-[#121215] hover:bg-[#18181B] text-white border border-[#27272A] hover:border-white transition-colors cursor-pointer"
                    >
                      {camp.status === "active" ? (
                        <>
                          <Pause className="w-3 h-3 text-[#A1A1AA]" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-white" />
                          <span>Resume</span>
                        </>
                      )}
                    </button>
                  )}

                  <Link
                    href="/dashboard/contacts"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider bg-transparent hover:bg-white text-zinc-300 hover:text-black border border-[#27272A] hover:border-white transition-all cursor-pointer"
                  >
                    <Users className="w-3 h-3" />
                    <span>View Leads</span>
                  </Link>
                </div>
              </div>

              {/* Target Audience & Schedule */}
              <div className="text-xs font-mono text-[#A1A1AA] bg-[#121215] p-3 rounded-[2px] border border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[#71717A] uppercase">AUDIENCE: </span>
                  <span className="text-white">{camp.targetAudience}</span>
                </div>
                <div className="text-[11px] text-[#71717A] font-mono shrink-0">
                  {camp.estTimeRemaining}
                </div>
              </div>

              {/* Progress Bar & Numerical Metrics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-[#A1A1AA] uppercase">
                    Outreach Yield ({camp.completedCount} / {camp.totalContacts} Contacts Reached)
                  </span>
                  <span className="text-white">{camp.progressPercent}%</span>
                </div>

                <div className="w-full h-2 bg-[#121215] rounded-[2px] overflow-hidden border border-[#27272A]">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${camp.progressPercent}%` }}
                  />
                </div>

                {/* Sub-metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
                  <div className="p-2.5 rounded-[2px] bg-[#121215] border border-[#27272A]">
                    <span className="text-[#71717A] block uppercase text-[10px]">Connected</span>
                    <span className="font-bold text-white text-sm">
                      {camp.completedCount}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-[2px] bg-[#121215] border border-[#27272A]">
                    <span className="text-[#71717A] block uppercase text-[10px]">No Answer / Busy</span>
                    <span className="font-bold text-[#A1A1AA] text-sm">
                      {camp.noAnswerCount}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-[2px] bg-[#121215] border border-[#27272A]">
                    <span className="text-[#71717A] block uppercase text-[10px]">Failed / Invalid</span>
                    <span className="font-bold text-[#71717A] text-sm">
                      {camp.failedCount}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-[2px] bg-[#121215] border border-[#27272A]">
                    <span className="text-[#71717A] block uppercase text-[10px]">Target Completion</span>
                    <span className="font-bold text-white text-xs">
                      {camp.startDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
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
