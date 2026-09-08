"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  School,
  ArrowRight,
  PhoneCall
} from "lucide-react";

export default function InnovationShowcase() {
  const [campusType, setCampusType] = useState<"research" | "private" | "business" | "polytechnic">("private");
  const [callVolume, setCallVolume] = useState<number>(25000);
  const [automationFocus, setAutomationFocus] = useState<string>("peak-telephony");

  // Dynamic calculations based on university admissions parameters
  const hoursSavedPerYear = Math.round((callVolume * 0.18) * (automationFocus === "peak-telephony" ? 1.3 : automationFocus === "rag" ? 1.15 : 1.4));
  // Est tuition revenue protected assuming 4% of unanswered calls lead to an enrolled student paying $15,000 avg annual tuition
  const missedCallsRecovered = Math.round(callVolume * 0.12);
  const protectedTuitionRevenue = Math.round(missedCallsRecovered * 0.035 * 18000);
  const conversionMultiplier = automationFocus === "peak-telephony" ? "3.8x" : automationFocus === "rag" ? "4.2x" : "3.4x";

  return (
    <section id="calculator" className="w-full bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
            <GraduationCap className="w-4 h-4 text-sky-500" />
            ADMISSIONS ROI ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight mb-4">
            Calculate your campus admissions yield & voice automation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Discover how eliminating unanswered admission calls and hold times protects institutional tuition revenue and elevates prospective student satisfaction.
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Controls (5 cols) */}
          <div className="lg:col-span-5 bg-[#f8f9fa] rounded-[32px] p-7 sm:p-8 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-slate-900">
                  Campus Parameters
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-sky-100 text-sky-700 rounded-full">
                  Higher Ed Model
                </span>
              </div>

              {/* 1. Campus Type Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Select Institution Profile
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "private", label: "Private University / College" },
                    { id: "research", label: "Large Research University" },
                    { id: "business", label: "Business & Graduate School" },
                    { id: "polytechnic", label: "Technical & Medical Institute" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCampusType(item.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        campusType === item.id
                          ? "bg-slate-950 text-white shadow-sm"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Call Volume Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Annual Admissions Call Volume
                  </label>
                  <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {callVolume.toLocaleString("en-US")} inquiries/year
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={callVolume}
                  onChange={(e) => setCallVolume(Number(e.target.value))}
                  className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                  <span>5,000 calls</span>
                  <span>50,000 calls</span>
                  <span>100,000+ calls</span>
                </div>
              </div>

              {/* 3. Primary Focus */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Primary Telephony Goal
                </label>
                <div className="space-y-2">
                  {[
                    { id: "peak-telephony", label: "Peak Intake Zero-Hold Telephony", desc: "Never drop an inquiry during critical deadline rushes" },
                    { id: "rag", label: "Institutional RAG & Fee Navigation", desc: "Accurate answers on merit slabs, hostel, & scholarships" },
                    { id: "lead-qual", label: "Intent Scoring & Dean Warm Escalation", desc: "Prioritize high-yield applicants and international leads" }
                  ].map((focus) => (
                    <div
                      key={focus.id}
                      onClick={() => setAutomationFocus(focus.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        automationFocus === focus.id
                          ? "bg-white border-slate-900 ring-1 ring-slate-900 shadow-xs"
                          : "bg-white/60 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          {focus.label}
                        </span>
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            automationFocus === focus.id
                              ? "border-slate-900 bg-slate-900"
                              : "border-slate-300"
                          }`}
                        >
                          {automationFocus === focus.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {focus.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 pt-3 border-t border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              FERPA, HIPAA & Higher Education Student Data Compliant
            </div>
          </div>

          {/* Right Live Simulation Output (7 cols) */}
          <div className="lg:col-span-7 bg-[#121316] text-white rounded-[32px] p-7 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#cdfb56]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
                <div>
                  <span className="text-[11px] font-bold text-[#cdfb56] tracking-widest uppercase">
                    CAMPUS YIELD FORECAST
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                    Maya Telephony Impact Analysis
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-[#cdfb56]" />
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Metric 1 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    Counselor Time Saved
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {hoursSavedPerYear.toLocaleString("en-US")} hrs
                  </div>
                  <div className="text-[10px] text-sky-400 font-semibold mt-1">
                    Repetitive FAQ calls resolved
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Tuition Revenue Retained
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#cdfb56] tracking-tight">
                    ${protectedTuitionRevenue.toLocaleString("en-US")}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-1">
                    From previously dropped calls
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Lead Conversion
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {conversionMultiplier}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                    Higher application completion
                  </div>
                </div>
              </div>

              {/* Deployment Timeline */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Institutional Integration Roadmap
                </div>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-sky-500/30 text-sky-300 flex items-center justify-center text-[10px] font-bold">
                      1
                    </span>
                    <span>Document Grounding: Ingest Prospectus, Fees & Hostel Guidelines (Day 1-5)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-sky-500/30 text-sky-300 flex items-center justify-center text-[10px] font-bold">
                      2
                    </span>
                    <span>DID Telephony SIP Trunking & Counselor Routing Setup (Day 6-12)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#cdfb56]/30 text-[#cdfb56] flex items-center justify-center text-[10px] font-bold">
                      3
                    </span>
                    <span>Full Campus Live Helpline Launch with Real-Time Transcript Analytics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Ready to pilot Maya on your university admissions helpline?
              </span>
              <a
                href="#pricing"
                className="bg-[#cdfb56] hover:bg-[#bef03f] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>EXPLORE CAMPUS PLANS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
