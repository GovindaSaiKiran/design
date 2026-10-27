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
  PhoneCall,
  Zap,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d">("today");

  const hourlyData = [
    { hour: "08 AM", calls: 4 },
    { hour: "09 AM", calls: 7 },
    { hour: "10 AM", calls: 12 },
    { hour: "11 AM", calls: 15 },
    { hour: "12 PM", calls: 10 },
    { hour: "01 PM", calls: 6 },
    { hour: "02 PM", calls: 9 },
    { hour: "03 PM", calls: 14 },
    { hour: "04 PM", calls: 16 },
    { hour: "05 PM", calls: 11 },
  ];

  const maxCalls = Math.max(...hourlyData.map((d) => d.calls));

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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A2D78] bg-[#D9C2FA] px-3 py-0.5 rounded-full">
              Analytics &amp; Reports
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Telephony Analytics &amp; QoS Telemetry
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Real-time acoustic latency metrics, caller intent classification, sentiment trends, and autonomous resolution yield.
          </p>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-black/[0.06] shadow-2xs">
          {(["today", "7d", "30d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                timeRange === r
                  ? "bg-[#111111] text-white shadow-sm"
                  : "text-black/60 hover:text-black"
              }`}
            >
              {r === "today" ? "Today" : r === "7d" ? "7 Days" : "30 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="First-Byte Latency"
          icon={Activity}
          description="Average response time from user silence detection to acoustic audio packet."
          metric="138 ms"
          metricLabel="Sub-150ms carrier SLA"
          status="Optimal SLA"
          statusType="ready"
          actionLabel="Inspect breakdown →"
        />

        <WorkspaceCard
          name="Caller Sentiment"
          icon={Smile}
          description="Real-time acoustic emotion extraction and sentiment classification."
          metric="92.4%"
          metricLabel="Positive & cooperative sentiment"
          status="Verified"
          statusType="ready"
          actionLabel="Sentiment breakdown →"
        />

        <WorkspaceCard
          name="Autonomous Resolution"
          icon={CheckCircle2}
          description="Conversations resolved end-to-end without human desk intervention."
          metric="95.8%"
          metricLabel="Zero hallucination verified"
          status="Operational"
          statusType="ready"
          actionLabel="View handoffs →"
          href="/dashboard/calls"
        />

        <WorkspaceCard
          name="Peak Concurrency"
          icon={Radio}
          description="Highest simultaneous SIP trunk channels utilized during surge hours."
          metric="14 channels"
          metricLabel="Carrier bandwidth: 16 channels"
          status="Healthy"
          statusType="ready"
          actionLabel="Manage SIP →"
          href="/dashboard/phone-numbers"
        />
      </div>

      {/* Hourly Call Volume Chart */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-[#1A1A1A]">
              Hourly Call Volume Distribution
            </h3>
            <p className="text-xs text-black/55 mt-0.5">
              Call frequency across inbound student inquiries and automated outreach cadences
            </p>
          </div>
          <span className="text-xs text-[#0D593F] font-semibold bg-[#C1F2D5] px-3 py-1 rounded-full">
            Peak: 04 PM (16 calls/hr)
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-6 pb-2">
          <div className="h-44 flex items-end gap-3 sm:gap-6 justify-between border-b border-black/[0.06] pb-2">
            {hourlyData.map((d, i) => {
              const heightPercent = Math.round((d.calls / maxCalls) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-xs font-semibold text-[#1A1A1A] opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.calls}
                  </span>
                  <div className="w-full bg-[#FBF7ED] border border-black/[0.06] rounded-t-lg overflow-hidden flex items-end h-full">
                    <div
                      className="w-full bg-[#111111] group-hover:bg-black transition-all rounded-t-lg"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-black/50 font-medium block truncate">
                    {d.hour}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Intent & Latency Percentiles Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Intent Distribution */}
        <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 space-y-4 shadow-2xs">
          <h3 className="text-base font-bold text-[#1A1A1A]">
            Caller Intent Distribution
          </h3>

          <div className="space-y-4">
            {[
              { label: "Enterprise SLA & Dedicated SIP Peering", pct: 45, count: 11 },
              { label: "Billing Inquiries & Usage Tier Upgrades", pct: 30, count: 7 },
              { label: "Technical Demo & Proof of Concept", pct: 15, count: 4 },
              { label: "Live Operator Escalations", pct: 10, count: 2 },
            ].map((intent, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#1A1A1A] font-medium">{intent.label}</span>
                  <span className="text-black/50 font-semibold">
                    {intent.pct}% ({intent.count} calls)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#111111] rounded-full"
                    style={{ width: `${intent.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latency Telemetry Breakdown */}
        <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 space-y-4 shadow-2xs">
          <h3 className="text-base font-bold text-[#1A1A1A]">
            Acoustic Latency Percentiles (p50 / p90 / p99)
          </h3>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-[20px] bg-[#FBF7ED] border border-black/[0.06]">
              <span className="text-[11px] font-semibold text-black/45 uppercase tracking-wider block">
                p50 (Median)
              </span>
              <span className="text-xl font-bold text-[#1A1A1A] block mt-1">
                128 ms
              </span>
              <span className="text-[11px] text-[#0D593F] font-semibold">Conversational</span>
            </div>

            <div className="p-4 rounded-[20px] bg-[#BCD0F5]/35 border border-[#BCD0F5]">
              <span className="text-[11px] font-semibold text-[#1E3A8A] uppercase tracking-wider block">
                p90 (Standard)
              </span>
              <span className="text-xl font-bold text-[#1E3A8A] block mt-1">
                142 ms
              </span>
              <span className="text-[11px] text-[#1E3A8A] font-semibold">Sub-150ms SLA</span>
            </div>

            <div className="p-4 rounded-[20px] bg-[#FBF7ED] border border-black/[0.06]">
              <span className="text-[11px] font-semibold text-black/45 uppercase tracking-wider block">
                p99 (Surge)
              </span>
              <span className="text-xl font-bold text-[#1A1A1A] block mt-1">
                185 ms
              </span>
              <span className="text-[11px] text-black/50 font-medium">Under 200ms</span>
            </div>
          </div>

          <div className="p-4 rounded-[20px] bg-[#FBF7ED] border border-black/[0.06] text-xs text-black/60 leading-relaxed">
            Our direct WebRTC and SIP native media pipeline streams audio chunks incrementally without full-turn text completion delays, guaranteeing natural conversations with zero robotic pauses.
          </div>
        </div>
      </div>
    </div>
  );
}
