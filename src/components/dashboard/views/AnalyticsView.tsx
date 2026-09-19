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
    <div className="space-y-6 pb-12">
      {/* Neo-Brutalist Header */}
      <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38]">
            Executive Intelligence
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            94.8% AI First-Contact Resolution
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
          Performance Analytics & Voice ROI
        </h1>
        <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
          Track call volume yields, human handoff ratios, resolution speed, and student sentiment across admissions departments.
        </p>
      </div>

      {/* KPI Row */}
      <KPIStrip metrics={kpis} />

      {/* Main Analytics Chart */}
      <CallActivityChart />

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000]">
          <div className="flex items-center gap-2 mb-2 text-black">
            <Zap className="w-5 h-5 stroke-[2.5]" />
            <h4 className="font-black text-sm text-black uppercase">AI Yield Rate</h4>
          </div>
          <div className="text-3xl font-black text-black font-mono mb-1">
            96.7%
          </div>
          <p className="text-xs font-bold text-black/70">
            814 out of 842 calls resolved autonomously without human counselor intervention.
          </p>
        </div>

        <div className="bg-[#fcffe0] border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000]">
          <div className="flex items-center gap-2 mb-2 text-black">
            <Clock className="w-5 h-5 stroke-[2.5]" />
            <h4 className="font-black text-sm text-black uppercase">Response Speed</h4>
          </div>
          <div className="text-3xl font-black text-black font-mono mb-1">
            140 ms
          </div>
          <p className="text-xs font-bold text-black/70">
            Average neural text-to-speech roundtrip latency over WebRTC & SIP trunks.
          </p>
        </div>

        <div className="bg-[#d6ff38] border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000]">
          <div className="flex items-center gap-2 mb-2 text-black">
            <Award className="w-5 h-5 stroke-[2.5]" />
            <h4 className="font-black text-sm text-black uppercase">Cost Reduction</h4>
          </div>
          <div className="text-3xl font-black text-black font-mono mb-1">
            ₹ 1,84,000
          </div>
          <p className="text-xs font-bold text-black/80">
            Estimated operational savings this week compared to outsourced 24/7 call centers.
          </p>
        </div>
      </div>
    </div>
  );
}
