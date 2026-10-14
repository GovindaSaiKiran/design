"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Radio,
  Smile,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Activity,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { soundSynth } from "@/lib/audio-synth";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d">("today");

  const hourlyData = [
    { hour: "08 AM", calls: 0 },
    { hour: "09 AM", calls: 0 },
    { hour: "10 AM", calls: 0 },
    { hour: "11 AM", calls: 0 },
    { hour: "12 PM", calls: 0 },
    { hour: "01 PM", calls: 0 },
    { hour: "02 PM", calls: 0 },
    { hour: "03 PM", calls: 0 },
    { hour: "04 PM", calls: 0 },
    { hour: "05 PM", calls: 0 },
  ];

  const maxCalls = Math.max(...hourlyData.map((d) => d.calls), 1);

  return (
    <div className="space-y-6 sm:space-y-8 select-none font-sans text-white">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono font-bold tracking-widest text-[#71717A] hover:text-white uppercase transition-colors"
            >
              WORKSPACES
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-white bg-[#18181B] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              TELEMETRY STREAM ONLINE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Analytics & Telemetry
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Sub-150ms first-byte stream telemetry, intent breakdown, and conversation resolution yield.
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#121215] p-1 rounded-[2px] border border-[#27272A]">
          {(["today", "7d", "30d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                soundSynth.play("click");
                setTimeRange(r);
              }}
              className={`px-3 py-1 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                timeRange === r
                  ? "bg-white text-black"
                  : "text-[#71717A] hover:text-white"
              }`}
            >
              {r === "today" ? "Today" : r === "7d" ? "7 Days" : "30 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="First-Byte Latency"
          icon={Activity}
          description="Average response time from user silence detection to acoustic audio packet."
          metric="-- ms"
          metricLabel="Awaiting call traffic"
          status="Sub-150ms SLA"
          statusType="ready"
          actionLabel="Inspect telemetry →"
        />

        <WorkspaceCard
          name="Caller Sentiment"
          icon={Smile}
          description="Real-time acoustic emotion extraction and sentiment classification."
          metric="--%"
          metricLabel="No sentiment data recorded yet"
          status="Awaiting calls"
          statusType="neutral"
          actionLabel="Sentiment breakdown →"
        />

        <WorkspaceCard
          name="Autonomous Resolution"
          icon={CheckCircle2}
          description="Conversations resolved end-to-end without human desk intervention."
          metric="--%"
          metricLabel="0 transfers • 0 handoffs"
          status="Ready"
          statusType="ready"
          actionLabel="View handoffs →"
          href="/dashboard/calls"
        />

        <WorkspaceCard
          name="Peak Concurrency"
          icon={Radio}
          description="Highest simultaneous SIP trunk channels utilized during surge hours."
          metric="0 channels"
          metricLabel="0 calls in progress"
          status="Idle"
          statusType="neutral"
          actionLabel="Manage SIP →"
          href="/dashboard/phone-numbers"
        />
      </div>

      {/* ======================================================================= */}
      {/* HOURLY CALL VOLUME CHART                                                */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Hourly Call Volume Distribution
            </h3>
            <p className="text-[11px] text-[#A1A1AA] mt-0.5 font-mono">
              Call frequency across inbound inquiries and customer support channels
            </p>
          </div>
          <span className="text-[10px] text-[#71717A] font-mono uppercase tracking-wider">
            Peak: -- (0 calls/hr)
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-6 pb-2">
          <div className="h-44 flex items-end gap-2 sm:gap-4 justify-between border-b border-[#27272A] pb-2">
            {hourlyData.map((d, i) => {
              const heightPercent = maxCalls > 0 && d.calls > 0 ? Math.round((d.calls / maxCalls) * 100) : 4;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-mono font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.calls}
                  </span>
                  <div className="w-full bg-[#121215] border border-[#27272A] rounded-[1px] overflow-hidden flex items-end h-full">
                    <div
                      className="w-full bg-white hover:bg-zinc-200 transition-all rounded-[1px]"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#71717A] block truncate">
                    {d.hour}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* INTENT & LATENCY PERCENTILES BREAKDOWN                                  */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Intent Distribution */}
        <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-5 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Caller Intent Distribution
          </h3>

          <div className="space-y-3 font-mono">
            {[
              { label: "General Inquiries", pct: 0, count: 0 },
              { label: "Product & Service Pricing", pct: 0, count: 0 },
              { label: "Customer Support & FAQs", pct: 0, count: 0 },
              { label: "Escalation Requests", pct: 0, count: 0 },
            ].map((intent, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-sans">{intent.label}</span>
                  <span className="font-mono text-white font-bold">
                    {intent.pct}% ({intent.count})
                  </span>
                </div>
                <div className="w-full h-2 bg-[#121215] border border-[#27272A] rounded-[1px] overflow-hidden">
                  <div
                    className="h-full bg-white rounded-[1px]"
                    style={{ width: `${intent.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latency Telemetry Breakdown */}
        <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-5 space-y-4 font-mono">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Acoustic Latency Percentiles (p50 / p90 / p99)
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-[2px] bg-[#121215] border border-[#27272A]">
              <span className="text-[10px] uppercase font-bold text-[#71717A] block">
                p50 (Median)
              </span>
              <span className="text-xl font-bold font-mono text-white block mt-1">
                -- ms
              </span>
              <span className="text-[10px] text-[#A1A1AA] font-bold">Awaiting traffic</span>
            </div>

            <div className="p-3 rounded-[2px] bg-[#18181B] border border-white/60">
              <span className="text-[10px] uppercase font-bold text-zinc-300 block">
                p90 (Standard)
              </span>
              <span className="text-xl font-bold font-mono text-white block mt-1">
                -- ms
              </span>
              <span className="text-[10px] text-white font-bold">Sub-150ms SLA</span>
            </div>

            <div className="p-3 rounded-[2px] bg-[#121215] border border-[#27272A]">
              <span className="text-[10px] uppercase font-bold text-[#71717A] block">
                p99 (Peak Surge)
              </span>
              <span className="text-xl font-bold font-mono text-white block mt-1">
                -- ms
              </span>
              <span className="text-[10px] text-[#A1A1AA] font-bold">Sub-200ms SLA</span>
            </div>
          </div>

          <div className="p-3 rounded-[2px] bg-[#121215] border border-[#27272A] text-xs text-[#A1A1AA] leading-relaxed font-sans">
            Our direct WebRTC and SIP native media pipeline streams audio chunks incrementally without full-turn text completion delays, guaranteeing conversations flow naturally without unnatural pauses.
          </div>
        </div>
      </div>
    </div>
  );
}
