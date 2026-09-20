"use client";

import React, { useState } from "react";
import CallActivityChart from "../components/CallActivityChart";
import KPIStrip from "../components/KPIStrip";
import { KPIMetric } from "@/types/dashboard";
import {
  Activity,
  Zap,
  Clock,
  Award,
  BarChart3,
  TrendingUp,
  Languages,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Sparkles,
  Layers,
  ArrowUpRight,
  Globe2,
} from "lucide-react";

interface AnalyticsViewProps {
  kpis: KPIMetric[];
}

export default function AnalyticsView({ kpis }: AnalyticsViewProps) {
  const [selectedBenchmarkMetric, setSelectedBenchmarkMetric] = useState<"accuracy" | "latency" | "preference">("preference");

  const indicLanguageBreakdown = [
    { name: "Hindi (हिन्दी)", chars: "840K chars", pct: 35, color: "bg-indigo-500", voice: "Ritu / Shubh" },
    { name: "Telugu (తెలుగు)", chars: "480K chars", pct: 20, color: "bg-amber-500", voice: "Neha" },
    { name: "Kannada (ಕನ್ನಡ)", chars: "360K chars", pct: 15, color: "bg-emerald-500", voice: "Ishita" },
    { name: "Bengali (বাংলা)", chars: "290K chars", pct: 12, color: "bg-rose-500", voice: "Suhani" },
    { name: "Tamil (தமிழ்)", chars: "240K chars", pct: 10, color: "bg-purple-500", voice: "Ananya" },
    { name: "Marathi (मराठी)", chars: "190K chars", pct: 8, color: "bg-blue-500", voice: "Arjun" },
  ];

  const benchmarks = [
    {
      model: "ElevenLabs Flash V2.5",
      competitorWin: "10.37%",
      tieRate: "11.68%",
      bulbulWin: "77.95%",
      bulbulWinNum: 77.95,
      category: "Indian English & Hindi Conversational",
    },
    {
      model: "ElevenLabs V3 Alpha",
      competitorWin: "28.14%",
      tieRate: "28.21%",
      bulbulWin: "43.64%",
      bulbulWinNum: 43.64,
      category: "South Asian Accent Nuance & Emotion",
    },
    {
      model: "Cartesia Sonic-3",
      competitorWin: "29.43%",
      tieRate: "30.49%",
      bulbulWin: "40.08%",
      bulbulWinNum: 40.08,
      category: "Streaming Real-Time First-Byte Speed",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. SARVAM EDITORIAL HERO & SCALE STATS                                   */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden text-center sm:text-left">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-black/10 text-xs font-semibold">
              <span className="text-amber-600 font-serif">~ 𑁍 ~</span>
              <span>Indic Acoustic Intelligence & Telemetry</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight leading-tight">
              Acoustic Telemetry & Speech Analytics
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Real-time monitoring of sub-140ms first-byte stream latency, neural listener preference rates, Indian language phonetic accuracy, and autonomous counseling yields.
            </p>
          </div>

          {/* Quick Real-Time Status Pill */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-[#fbfbfd] border border-black/10 text-xs font-semibold text-neutral-800 flex items-center gap-2.5 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bulbul V3 Neural Cluster: <span className="text-emerald-700 font-mono">140ms TTFB</span></span>
            </div>
          </div>
        </div>

        {/* 3 High-Impact Editorial Big Number Stats (Direct from Sarvam Template Page 9) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-black/10">
          <div className="liquid-glass-subtle p-6 rounded-2xl border border-black/10 hover:border-black/25 transition-all">
            <div className="font-serif-display text-4xl sm:text-5xl font-normal text-neutral-900 tracking-tight mb-1">
              2.4M+
            </div>
            <div className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
              Indic Characters Streamed Today
            </div>
            <p className="text-[11px] text-neutral-500">
              Generated in real-time across 11 regional languages with zero dropped audio packets.
            </p>
          </div>

          <div className="liquid-glass-subtle p-6 rounded-2xl border border-black/10 hover:border-black/25 transition-all">
            <div className="font-serif-display text-4xl sm:text-5xl font-normal text-neutral-900 tracking-tight mb-1">
              11
            </div>
            <div className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
              Native Indian Languages & Dialects
            </div>
            <p className="text-[11px] text-neutral-500">
              Hindi, Telugu, Kannada, Bengali, Tamil, Marathi, Gujarati, Punjabi, Odia, Malayalam, Assamese.
            </p>
          </div>

          <div className="liquid-glass-subtle p-6 rounded-2xl border border-black/10 hover:border-black/25 transition-all">
            <div className="font-serif-display text-4xl sm:text-5xl font-normal text-neutral-900 tracking-tight mb-1">
              ₹ 30
            </div>
            <div className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
              Unit Cost / 10,000 Characters
            </div>
            <p className="text-[11px] text-neutral-500">
              Over 70% more cost-effective than legacy non-Indic cloud speech synthesis providers.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. KPI STRIP (GLASS CARDS WITH THIN BLACK BORDERS)                        */}
      {/* ========================================================================= */}
      <KPIStrip metrics={kpis} />

      {/* ========================================================================= */}
      {/* 3. SARVAM INDIC BENCHMARK & LISTENER PREFERENCE MATRIX (FROM PDF 1 PG 9/10)*/}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-[11px] font-semibold text-neutral-800 mb-2">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Grounded Model Evaluation</span>
            </div>
            <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
              The Most Accurate Voice Engine for Indian Languages
            </h3>
            <p className="text-xs text-neutral-600 mt-1 max-w-xl">
              Bulbul V3 delivers the lowest character error rates and highest human listener preference, outperforming global voice models on Indian accents, names, abbreviations, and numbers.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-100/80 p-1 rounded-xl border border-black/10 text-xs">
            <span className="px-3 py-1.5 rounded-lg font-semibold bg-white/80 backdrop-blur-md text-neutral-900 shadow-xs">
              Listener Preference Rate (8kHz Telephony)
            </span>
          </div>
        </div>

        {/* Benchmark Table with Multi-color Proportional Bars */}
        <div className="space-y-6">
          <div className="hidden sm:grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-neutral-500 px-4 pb-2 border-b border-black/5">
            <div className="col-span-4">Model & Category</div>
            <div className="col-span-2 text-center">Competitor Win</div>
            <div className="col-span-2 text-center">Tie Rate</div>
            <div className="col-span-4 text-right">Bulbul V3 Win Rate</div>
          </div>

          {benchmarks.map((b, idx) => (
            <div
              key={idx}
              className="liquid-glass-subtle p-5 rounded-2xl border border-black/10 hover:border-black/25 transition-all space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-4">
                  <div className="font-semibold text-neutral-900 text-sm">{b.model}</div>
                  <div className="text-xs text-neutral-500">{b.category}</div>
                </div>

                <div className="sm:col-span-2 text-center">
                  <span className="text-xs font-mono font-medium text-neutral-700 bg-neutral-200/60 px-2.5 py-1 rounded-md">
                    {b.competitorWin}
                  </span>
                </div>

                <div className="sm:col-span-2 text-center">
                  <span className="text-xs font-mono font-medium text-neutral-700 bg-neutral-200/60 px-2.5 py-1 rounded-md">
                    {b.tieRate}
                  </span>
                </div>

                <div className="sm:col-span-4 text-right flex items-center justify-end gap-2">
                  <span className="text-base font-mono font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    {b.bulbulWin}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">Bulbul Win</span>
                </div>
              </div>

              {/* Graphical Stacked Proportion Bar */}
              <div className="w-full h-2.5 rounded-full bg-neutral-200 overflow-hidden flex">
                <div
                  style={{ width: b.competitorWin }}
                  className="h-full bg-neutral-400"
                  title={`Competitor Win: ${b.competitorWin}`}
                />
                <div
                  style={{ width: b.tieRate }}
                  className="h-full bg-neutral-300"
                  title={`Tie: ${b.tieRate}`}
                />
                <div
                  style={{ width: b.bulbulWin }}
                  className="h-full bg-emerald-500 rounded-r-full"
                  title={`Bulbul V3 Win: ${b.bulbulWin}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN INTERACTIVE ACTIVITY CHART                                        */}
      {/* ========================================================================= */}
      <CallActivityChart />

      {/* ========================================================================= */}
      {/* 5. MULTILINGUAL REGIONAL DISTRIBUTION & CLAY DISCS BREAKDOWN              */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Indic Language Character Distribution */}
        <div className="liquid-glass-card p-7 transition-all">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center border border-black/10">
                <Languages className="w-4 h-4 text-neutral-800" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                  Regional Language Voice Traffic
                </h3>
                <p className="text-xs text-neutral-500">Live synthesis character quota by Indic dialect</p>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg border border-black/5">
              6 Active Locales
            </span>
          </div>

          <div className="space-y-4">
            {indicLanguageBreakdown.map((lang, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">{lang.name}</span>
                    <span className="text-[11px] text-neutral-500 font-mono">({lang.voice})</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-neutral-500">{lang.chars}</span>
                    <span className="font-semibold text-neutral-900">{lang.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 border border-black/5 overflow-hidden">
                  <div
                    style={{ width: `${lang.pct}%` }}
                    className={`h-full ${lang.color} rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical Quality Attributes & Edge Routing */}
        <div className="liquid-glass-card p-7 transition-all">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center border border-black/10">
                <Cpu className="w-4 h-4 text-neutral-800" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                  Acoustic Synthesis SLA
                </h3>
                <p className="text-xs text-neutral-500">Low-latency streaming parameters</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Optimal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10">
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                WebSocket TTFB
              </div>
              <div className="text-2xl font-mono font-semibold text-neutral-900 mb-1">
                140 ms
              </div>
              <p className="text-[11px] text-neutral-500">
                Sub-250ms target exceeded across all Hyderabad SIP trunks.
              </p>
            </div>

            <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10">
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Phonetic WER
              </div>
              <div className="text-2xl font-mono font-semibold text-neutral-900 mb-1">
                0.82%
              </div>
              <p className="text-[11px] text-neutral-500">
                Accurate pronunciation of Indian surnames, cities & acronyms.
              </p>
            </div>

            <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10">
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Autonomous Yield
              </div>
              <div className="text-2xl font-mono font-semibold text-neutral-900 mb-1">
                96.7%
              </div>
              <p className="text-[11px] text-neutral-500">
                814 out of 842 admissions calls resolved without human transfer.
              </p>
            </div>

            <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10">
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                Collegiate Cost Savings
              </div>
              <div className="text-2xl font-mono font-semibold text-neutral-900 mb-1">
                ₹ 1,84,000
              </div>
              <p className="text-[11px] text-neutral-500">
                Estimated staffing savings this week vs manual call center contracts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
