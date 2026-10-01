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
      <div className="bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        
        {/* Section Eyebrow & Title (Matches PDF Page 12) */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-neutral-100 border border-neutral-200 text-neutral-800">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>ADMISSIONS ROI ENGINE</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.15]">
            Calculate your campus admissions yield &<br />
            <span className="font-serif italic text-neutral-500">voice automation</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Discover how eliminating unanswered admission calls and hold times protects institutional tuition revenue and elevates prospective student satisfaction.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Selectors (Matches PDF Page 12) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
              <span>Select Institution Profile</span>
              <span className="text-neutral-400 font-mono text-[11px]">Higher Ed Model</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {profiles.map((p) => {
                const isSelected = profile === p;
                return (
                  <button
                    key={p}
                    onClick={() => setProfile(p)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200"
                    }`}
                  >
                    <span>{p}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Annual Admissions Call Volume Slider (Matches PDF Page 12) */}
          <div className="space-y-3 pt-4 border-t border-neutral-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-800">
                Annual Admissions Call Volume
              </span>
              <span className="px-3 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-mono font-bold text-neutral-900">
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
              className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg"
            />

            <div className="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>5,000 calls</span>
              <span>50,000 calls</span>
              <span>100,000+ calls</span>
            </div>
          </div>

          {/* Forecast Metric Cards (Matches PDF Page 13) */}
          <div className="pt-6 border-t border-neutral-200/80">
            <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
              CAMPUS YIELD FORECAST • MAYA TELEPHONY IMPACT ANALYSIS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stat 1: Counselor Time Saved */}
              <div className="bg-neutral-50/80 border border-neutral-200/90 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Counselor Time Saved</span>
                </div>
                <div className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
                  {hoursSaved.toLocaleString()} hrs
                </div>
                <p className="text-[11px] text-neutral-500">
                  Repetitive FAQ calls resolved autonomously
                </p>
              </div>

              {/* Stat 2: Tuition Revenue Retained */}
              <div className="bg-neutral-50/80 border border-neutral-200/90 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tuition Revenue Retained</span>
                </div>
                <div className="font-serif-display text-3xl sm:text-4xl font-normal text-emerald-800 tracking-tight">
                  ₹{retainedRevenueCr} Cr
                </div>
                <p className="text-[11px] text-neutral-500">
                  From previously dropped calls & uncontacted leads
                </p>
              </div>

              {/* Stat 3: Lead Conversion */}
              <div className="bg-neutral-50/80 border border-neutral-200/90 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Lead Conversion</span>
                </div>
                <div className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
                  {conversionBoost}x
                </div>
                <p className="text-[11px] text-neutral-500">
                  Higher application completion & deposit confirmation
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
