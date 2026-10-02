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

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d">("today");

  const hourlyData = [
    { hour: "08 AM", calls: 14 },
    { hour: "09 AM", calls: 38 },
    { hour: "10 AM", calls: 72 },
    { hour: "11 AM", calls: 64 },
    { hour: "12 PM", calls: 42 },
    { hour: "01 PM", calls: 28 },
    { hour: "02 PM", calls: 52 },
    { hour: "03 PM", calls: 68 },
    { hour: "04 PM", calls: 56 },
    { hour: "05 PM", calls: 34 },
  ];

  const maxCalls = Math.max(...hourlyData.map((d) => d.calls));

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
              Telemetry Pipeline Active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Analytics & Telemetry
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Sub-150ms first-byte stream telemetry, intent breakdown, and conversation resolution yield.
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          {(["today", "7d", "30d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all capitalize cursor-pointer ${
                timeRange === r
                  ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {r === "today" ? "Today" : r === "7d" ? "Last 7 Days" : "Last 30 Days"}
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
          metric="142ms avg"
          metricLabel="99.4% of responses delivered < 160ms"
          status="Sub-150ms SLA"
          statusType="ready"
          actionLabel="Inspect telemetry →"
        />

        <WorkspaceCard
          name="Caller Sentiment"
          icon={Smile}
          description="Real-time acoustic emotion extraction and sentiment classification."
          metric="92.4% positive"
          metricLabel="5.2% neutral • 2.4% urgent escalations"
          status="High satisfaction"
          statusType="ready"
          actionLabel="Sentiment breakdown →"
        />

        <WorkspaceCard
          name="Autonomous Resolution"
          icon={CheckCircle2}
          description="Conversations resolved end-to-end without human desk intervention."
          metric="95.2% resolved"
          metricLabel="12 transfers • 4.8% handoff rate"
          status="Optimized desk"
          statusType="ready"
          actionLabel="View handoffs →"
          href="/dashboard/calls"
        />

        <WorkspaceCard
          name="Peak Concurrency"
          icon={Radio}
          description="Highest simultaneous SIP trunk channels utilized during surge hours."
          metric="18 channels"
          metricLabel="Zero packet drops or audio clipping"
          status="30 provisioned"
          statusType="live"
          actionLabel="Manage SIP →"
          href="/dashboard/phone-numbers"
        />
      </div>

      {/* ======================================================================= */}
      {/* HOURLY CALL VOLUME CHART                                                */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Hourly Call Volume Distribution
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Call frequency across admissions, hostel, and scholarship inquiry desks
            </p>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Peak: 10:00 AM (72 calls/hr)
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-6 pb-2">
          <div className="h-44 flex items-end gap-2 sm:gap-4 justify-between border-b border-slate-100 pb-2">
            {hourlyData.map((d, i) => {
              const heightPercent = Math.round((d.calls / maxCalls) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-mono font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.calls}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-full">
                    <div
                      className="w-full bg-[#cdfb56] hover:bg-[#bef03f] transition-all rounded-t-lg group-hover:shadow-sm"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 block truncate">
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
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Caller Intent Distribution
          </h3>

          <div className="space-y-3">
            {[
              { label: "B.Tech Admissions & Specializations", pct: 54, count: 134 },
              { label: "Fees, Installments & Scholarships", pct: 24, count: 60 },
              { label: "Hostel Accommodations & Food", pct: 14, count: 35 },
              { label: "Semester Exams & Document Verification", pct: 8, count: 19 },
            ].map((intent, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{intent.label}</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {intent.pct}% ({intent.count})
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full"
                    style={{ width: `${intent.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latency Telemetry Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Acoustic Latency Percentiles (p50 / p90 / p99)
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                p50 (Median)
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 block mt-1">
                120ms
              </span>
              <span className="text-[10px] text-[#8ac926] font-bold">Optimal</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f7fee7] border border-[#cdfb56]">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">
                p90 (Standard)
              </span>
              <span className="text-xl font-bold font-mono text-slate-950 block mt-1">
                142ms
              </span>
              <span className="text-[10px] text-slate-900 font-bold">Sub-150ms</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                p99 (Peak Surge)
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 block mt-1">
                185ms
              </span>
              <span className="text-[10px] text-slate-500 font-bold">Sub-200ms</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-xs text-slate-600 leading-relaxed">
            Our direct WebRTC and SIP native media pipeline streams audio chunks incrementally without full-turn text completion delays, guaranteeing conversations flow naturally without unnatural pauses.
          </div>
        </div>
      </div>
    </div>
  );
}
