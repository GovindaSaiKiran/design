"use client";

import React from "react";
import CallActivityChart from "../components/CallActivityChart";
import KPIStrip from "../components/KPIStrip";
import { KPIMetric } from "@/types/dashboard";
import { BarChart3, TrendingUp, Award, Zap, PhoneForwarded, Clock, CheckCircle2 } from "lucide-react";

interface AnalyticsViewProps {
  kpis: KPIMetric[];
}

export default function AnalyticsView({ kpis }: AnalyticsViewProps) {
  return (
    <div className="space-y-6 pb-12 select-none font-sans">
      {/* Analytics Header */}
      <div className="bg-white border-[2.5px] border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-black text-[#d6ff38] border-2 border-black shadow-[2px_2px_0px_#000000]">
            📈 Executive Intelligence
          </span>
          <span className="px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            94.8% AI First-Contact Resolution
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
          Performance Analytics & Voice Operations
        </h1>
        <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
          Track call volume yields, counselor handoff ratios, sub-second latency, and student sentiment across campus departments.
        </p>
      </div>

      {/* KPI Row */}
      <KPIStrip metrics={kpis} />

      {/* Main Analytics Chart */}
      <CallActivityChart />

      {/* Breakdown Cards in Vibrant Neo-Brutalist Palette */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="bg-[#d6ff38] border-[2.5px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 transition-all duration-200 group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-10 h-10 rounded-xl bg-black text-[#d6ff38] flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Zap className="w-5 h-5 stroke-[3]" />
            </div>
            <h4 className="font-black text-xs text-black uppercase tracking-wider">AI Autonomous Yield</h4>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-black font-mono mb-1">
            96.7%
          </div>
          <p className="text-xs text-black/80 font-bold leading-relaxed">
            814 out of 842 admissions calls resolved autonomously without human counselor escalation.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#00f0ff] border-[2.5px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 transition-all duration-200 group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-10 h-10 rounded-xl bg-black text-[#00f0ff] flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Clock className="w-5 h-5 stroke-[3]" />
            </div>
            <h4 className="font-black text-xs text-black uppercase tracking-wider">TTS Turnaround Speed</h4>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-black font-mono mb-1">
            140 ms
          </div>
          <p className="text-xs text-black/80 font-bold leading-relaxed">
            Average neural text-to-speech roundtrip latency across all concurrent SIP telephone sessions.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#ffe600] border-[2.5px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 transition-all duration-200 group">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-10 h-10 rounded-xl bg-black text-[#ffe600] flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Award className="w-5 h-5 stroke-[3]" />
            </div>
            <h4 className="font-black text-xs text-black uppercase tracking-wider">Operational Savings</h4>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-black font-mono mb-1">
            ₹ 1,84,000
          </div>
          <p className="text-xs text-black/80 font-bold leading-relaxed">
            Estimated staffing and infrastructure capital saved this week vs traditional outsourced call center contracts.
          </p>
        </div>
      </div>
    </div>
  );
}
