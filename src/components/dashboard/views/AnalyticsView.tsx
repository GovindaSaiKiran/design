"use client";

import React, { useState } from "react";
import CallActivityChart from "../components/CallActivityChart";
import KPIStrip from "../components/KPIStrip";
import { KPIMetric } from "@/types/dashboard";
import {
  Languages,
  Cpu,
  Sparkles,
} from "lucide-react";

interface AnalyticsViewProps {
  kpis: KPIMetric[];
}

export default function AnalyticsView({ kpis }: AnalyticsViewProps) {
  const indicLanguageBreakdown = [
    { name: "Hindi (हिन्दी)", chars: "840K chars", pct: 35, color: "bg-[#D9C2FA]", voice: "Ritu / Shubh" },
    { name: "Telugu (తెలుగు)", chars: "480K chars", pct: 20, color: "bg-[#FFD9A0]", voice: "Neha" },
    { name: "Kannada (ಕನ್ನಡ)", chars: "360K chars", pct: 15, color: "bg-[#C1F2D5]", voice: "Ishita" },
    { name: "Bengali (বাংলা)", chars: "290K chars", pct: 12, color: "bg-[#FFC0D3]", voice: "Suhani" },
    { name: "Tamil (தமிழ்)", chars: "240K chars", pct: 10, color: "bg-[#BCD0F5]", voice: "Ananya" },
    { name: "Marathi (मराठी)", chars: "190K chars", pct: 8, color: "bg-[#D9C2FA]", voice: "Arjun" },
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
    <div className="space-y-6 animate-in fade-in duration-300 font-sans select-none text-[#1A1A1A]">
      {/* 1. Header & Scale Stats */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-xs font-semibold text-[#5B21B6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Indic Acoustic Intelligence & Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Acoustic Telemetry & Speech Analytics
            </h1>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-sans">
              Real-time monitoring of sub-140ms first-byte stream latency, neural listener preference rates, Indian language phonetic accuracy, and autonomous counseling yields.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-[#FAF3E4] border border-black/[0.06] text-xs font-semibold text-[#1A1A1A] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse" />
              <span>Bulbul V3 Neural Cluster: <span className="text-[#16856B] font-mono">140ms TTFB</span></span>
            </div>
          </div>
        </div>

        {/* 3 High-Impact Editorial Big Number Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-black/[0.06]">
          <div className="bg-[#FAF3E4]/60 p-5 rounded-[20px] border border-black/[0.06] transition-all">
            <div className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-1">
              2.4M+
            </div>
            <div className="text-xs font-semibold text-black/70 uppercase tracking-wider mb-1">
              Indic Characters Streamed Today
            </div>
            <p className="text-[11px] text-black/50">
              Generated in real-time across 11 regional languages with zero dropped audio packets.
            </p>
          </div>

          <div className="bg-[#FAF3E4]/60 p-5 rounded-[20px] border border-black/[0.06] transition-all">
            <div className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-1">
              11
            </div>
            <div className="text-xs font-semibold text-black/70 uppercase tracking-wider mb-1">
              Native Indian Languages & Dialects
            </div>
            <p className="text-[11px] text-black/50">
              Hindi, Telugu, Kannada, Bengali, Tamil, Marathi, Gujarati, Punjabi, Odia, Malayalam, Assamese.
            </p>
          </div>

          <div className="bg-[#FAF3E4]/60 p-5 rounded-[20px] border border-black/[0.06] transition-all">
            <div className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-1">
              ₹ 30
            </div>
            <div className="text-xs font-semibold text-black/70 uppercase tracking-wider mb-1">
              Unit Cost / 10,000 Characters
            </div>
            <p className="text-[11px] text-black/50">
              Over 70% more cost-effective than legacy non-Indic cloud speech synthesis providers.
            </p>
          </div>
        </div>
      </div>

      {/* 2. KPI Strip */}
      <KPIStrip metrics={kpis} />

      {/* 3. Indic Benchmark & Listener Preference Matrix */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9C2FA]/30 border border-[#D9C2FA] text-[11px] font-semibold text-[#5B21B6] mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Grounded Model Evaluation</span>
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
              The Most Accurate Voice Engine for Indian Languages
            </h3>
            <p className="text-xs text-black/60 mt-1 max-w-xl">
              Bulbul V3 delivers the lowest character error rates and highest human listener preference, outperforming global voice models on Indian accents, names, abbreviations, and numbers.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#FAF3E4] p-1 rounded-full border border-black/[0.06] text-xs">
            <span className="px-3 py-1.5 rounded-full font-semibold bg-white text-[#1A1A1A] shadow-xs">
              Listener Preference Rate (8kHz Telephony)
            </span>
          </div>
        </div>

        {/* Benchmark Table with Proportional Bars */}
        <div className="space-y-4">
          <div className="hidden sm:grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-black/40 px-4 pb-2 border-b border-black/[0.04]">
            <div className="col-span-4">Model & Category</div>
            <div className="col-span-2 text-center">Competitor Win</div>
            <div className="col-span-2 text-center">Tie Rate</div>
            <div className="col-span-4 text-right">Bulbul V3 Win Rate</div>
          </div>

          {benchmarks.map((b, idx) => (
            <div
              key={idx}
              className="bg-[#FAF3E4]/40 p-4 rounded-[20px] border border-black/[0.06] hover:bg-[#FAF3E4] transition-all space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-4">
                  <div className="font-semibold text-[#1A1A1A] text-sm">{b.model}</div>
                  <div className="text-xs text-black/50">{b.category}</div>
                </div>

                <div className="sm:col-span-2 text-center">
                  <span className="text-xs font-mono font-medium text-black/70 bg-black/5 px-2.5 py-1 rounded-full">
                    {b.competitorWin}
                  </span>
                </div>

                <div className="sm:col-span-2 text-center">
                  <span className="text-xs font-mono font-medium text-black/70 bg-black/5 px-2.5 py-1 rounded-full">
                    {b.tieRate}
                  </span>
                </div>

                <div className="sm:col-span-4 text-right flex items-center justify-end gap-2">
                  <span className="text-sm font-mono font-semibold text-[#16856B] bg-[#C1F2D5] px-3 py-0.5 rounded-full">
                    {b.bulbulWin}
                  </span>
                  <span className="text-xs font-semibold text-[#16856B]">Bulbul Win</span>
                </div>
              </div>

              {/* Graphical Stacked Proportion Bar */}
              <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden flex">
                <div
                  style={{ width: b.competitorWin }}
                  className="h-full bg-black/20"
                  title={`Competitor Win: ${b.competitorWin}`}
                />
                <div
                  style={{ width: b.tieRate }}
                  className="h-full bg-black/10"
                  title={`Tie: ${b.tieRate}`}
                />
                <div
                  style={{ width: b.bulbulWin }}
                  className="h-full bg-[#16856B] rounded-r-full"
                  title={`Bulbul V3 Win: ${b.bulbulWin}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Main Interactive Activity Chart */}
      <CallActivityChart />

      {/* 5. Multilingual Regional Distribution & Acoustic SLA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Indic Language Character Distribution */}
        <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-2xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF3E4] flex items-center justify-center border border-black/[0.06]">
                <Languages className="w-4 h-4 text-[#1A1A1A]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1A1A1A] tracking-tight">
                  Regional Language Voice Traffic
                </h3>
                <p className="text-xs text-black/50">Live synthesis character quota by Indic dialect</p>
              </div>
            </div>
            <span className="text-xs font-mono text-black/60 bg-[#FAF3E4] px-2.5 py-1 rounded-full border border-black/[0.06]">
              6 Active Locales
            </span>
          </div>

          <div className="space-y-4">
            {indicLanguageBreakdown.map((lang, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#1A1A1A]">{lang.name}</span>
                    <span className="text-[11px] text-black/50 font-mono">({lang.voice})</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-black/50">{lang.chars}</span>
                    <span className="font-semibold text-[#1A1A1A]">{lang.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden">
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
        <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-2xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF3E4] flex items-center justify-center border border-black/[0.06]">
                <Cpu className="w-4 h-4 text-[#1A1A1A]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1A1A1A] tracking-tight">
                  Acoustic Synthesis SLA
                </h3>
                <p className="text-xs text-black/50">Low-latency streaming parameters</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#16856B] bg-[#C1F2D5] px-2.5 py-1 rounded-full">
              Optimal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FAF3E4]/50 p-4 rounded-[20px] border border-black/[0.06]">
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-1">
                WebSocket TTFB
              </div>
              <div className="text-2xl font-mono font-bold text-[#1A1A1A] mb-1">
                140 ms
              </div>
              <p className="text-[11px] text-black/50">
                Sub-250ms target exceeded across all Hyderabad SIP trunks.
              </p>
            </div>

            <div className="bg-[#FAF3E4]/50 p-4 rounded-[20px] border border-black/[0.06]">
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-1">
                Phonetic WER
              </div>
              <div className="text-2xl font-mono font-bold text-[#1A1A1A] mb-1">
                0.82%
              </div>
              <p className="text-[11px] text-black/50">
                Accurate pronunciation of Indian surnames, cities & acronyms.
              </p>
            </div>

            <div className="bg-[#FAF3E4]/50 p-4 rounded-[20px] border border-black/[0.06]">
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-1">
                Autonomous Yield
              </div>
              <div className="text-2xl font-mono font-bold text-[#1A1A1A] mb-1">
                96.7%
              </div>
              <p className="text-[11px] text-black/50">
                814 out of 842 admissions calls resolved without human transfer.
              </p>
            </div>

            <div className="bg-[#FAF3E4]/50 p-4 rounded-[20px] border border-black/[0.06]">
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-wider mb-1">
                Collegiate Cost Savings
              </div>
              <div className="text-2xl font-mono font-bold text-[#1A1A1A] mb-1">
                ₹ 1,84,000
              </div>
              <p className="text-[11px] text-black/50">
                Estimated staffing savings this week vs manual call center contracts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
