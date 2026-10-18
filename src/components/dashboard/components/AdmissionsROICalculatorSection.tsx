"use client";

import React, { useState } from "react";
import {
  Calculator,
  TrendingUp,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Sparkles,
} from "lucide-react";

export default function AdmissionsROICalculatorSection() {
  const [profile, setProfile] = useState<string>("Large Research University");
  const [callVolume, setCallVolume] = useState<number>(25000);

  const profiles = [
    "Private University / College",
    "Large Research University",
    "Business & Graduate School",
    "Technical & Medical Institute",
  ];

  // Dynamic calculations based on slider
  const multiplier =
    profile === "Large Research University"
      ? 1.0
      : profile === "Technical & Medical Institute"
      ? 1.15
      : profile === "Business & Graduate School"
      ? 1.25
      : 0.85;

  const hoursSaved = Math.round((callVolume * 0.234 * multiplier));
  const retainedRevenueCr = ((callVolume * 0.000335 * multiplier)).toFixed(2);
  const conversionBoost = (3.2 + (callVolume / 100000) * 0.8).toFixed(1);

  return (
    <section className="w-full mb-10 font-sans select-none" id="roi-calculator-hub">
      <div className="bg-white border border-black/[0.06] rounded-[26px] p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
        
        {/* Section Eyebrow & Title (Matches PDF Page 12) */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#FAF3E4] border border-black/[0.06] text-[#1A1A1A]">
            <Calculator className="w-3.5 h-3.5 text-[#16856B]" />
            <span>ADMISSIONS ROI ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.15]">
            Calculate your campus admissions yield &amp;<br />
            <span className="text-black/55 font-medium">voice automation</span>
          </h2>

          <p className="text-xs sm:text-sm text-black/60 max-w-2xl mx-auto leading-relaxed">
            Discover how eliminating unanswered admission calls and hold times protects institutional tuition revenue and elevates prospective student satisfaction.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Selectors (Matches PDF Page 12) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-black/70">
              <span>Select Institution Profile</span>
              <span className="text-black/45 font-mono text-[11px]">Higher Ed Model</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {profiles.map((p) => {
                const isSelected = profile === p;
                return (
                  <button
                    key={p}
                    onClick={() => setProfile(p)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#111111] text-white shadow-xs"
                        : "bg-[#FAF3E4] hover:bg-[#F3EBDA] text-[#1A1A1A] border border-black/[0.06]"
                    }`}
                  >
                    <span>{p}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#C1F2D5]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Annual Admissions Call Volume Slider (Matches PDF Page 12) */}
          <div className="space-y-3 pt-4 border-t border-black/[0.06]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1A1A1A]">
                Annual Admissions Call Volume
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAF3E4] border border-black/[0.06] text-xs font-mono font-bold text-[#1A1A1A]">
                {callVolume.toLocaleString()} inquiries/year
              </span>
            </div>

            <input
              type="range"
              min="5000"
              max="100000"
              step="2500"
              value={callVolume}
              onChange={(e) => setCallVolume(Number(e.target.value))}
              className="w-full accent-[#111111] cursor-pointer h-2 bg-[#FAF3E4] rounded-lg"
            />

            <div className="flex justify-between text-[11px] font-mono text-black/45">
              <span>5,000 calls</span>
              <span>50,000 calls</span>
              <span>100,000+ calls</span>
            </div>
          </div>

          {/* Forecast Metric Cards (Matches PDF Page 13) */}
          <div className="pt-6 border-t border-black/[0.06]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-black/45 mb-4">
              CAMPUS YIELD FORECAST • MAYA TELEPHONY IMPACT ANALYSIS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stat 1: Counselor Time Saved */}
              <div className="bg-[#FAF3E4]/50 border border-black/[0.06] rounded-[22px] p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C4875]">
                  <Clock className="w-3.5 h-3.5 text-[#2C4875]" />
                  <span>Counselor Time Saved</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
                  {hoursSaved.toLocaleString()} hrs
                </div>
                <p className="text-[11px] text-black/50">
                  Repetitive FAQ calls resolved autonomously
                </p>
              </div>

              {/* Stat 2: Tuition Revenue Retained */}
              <div className="bg-[#FAF3E4]/50 border border-black/[0.06] rounded-[22px] p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16856B]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#16856B]" />
                  <span>Tuition Revenue Retained</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#16856B] tracking-tight">
                  ₹{retainedRevenueCr} Cr
                </div>
                <p className="text-[11px] text-black/50">
                  From previously dropped calls &amp; uncontacted leads
                </p>
              </div>

              {/* Stat 3: Lead Conversion */}
              <div className="bg-[#FAF3E4]/50 border border-black/[0.06] rounded-[22px] p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C5300]">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C5300]" />
                  <span>Lead Conversion</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
                  {conversionBoost}x
                </div>
                <p className="text-[11px] text-black/50">
                  Higher application completion &amp; deposit confirmation
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Integration Roadmap (Matches PDF Page 13) */}
          <div className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl p-5 mt-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-3">
              INSTITUTIONAL INTEGRATION ROADMAP
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-neutral-700">
              <div className="flex items-start gap-2">
                <span className="font-bold text-neutral-900">1</span>
                <span>Document Grounding: Ingest Prospectus, Fees & Hostel Guidelines (Day 1–5)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-neutral-900">2</span>
                <span>DID Telephony SIP Trunking & Counselor Routing Setup (Day 6–12)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-neutral-900">3</span>
                <span>Full Campus Live Helpline Launch with Real-Time Transcript Analytics (Day 13+)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
