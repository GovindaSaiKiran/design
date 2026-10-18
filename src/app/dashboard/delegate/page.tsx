"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Bot,
  Users,
  BookOpen,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

export default function DelegateTaskPage() {
  const [goalText, setGoalText] = useState(
    "Contact recently captured leads, verify interest in our services, answer pricing questions, and schedule consultation appointments."
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDelegated, setIsDelegated] = useState(false);

  const handleApprove = () => {
    try { soundSynth.play("confirm"); } catch {}
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDelegated(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 text-[#1A1A1A]">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold uppercase tracking-wider text-black/45 hover:text-[#1A1A1A] transition-colors"
            >
              AUTONOMOUS DISPATCH
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16856B] bg-[#C1F2D5] px-3 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B] animate-pulse" />
              Workforce Ready
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Delegate an Outcome
          </h1>

          <p className="text-xs sm:text-sm text-black/60 mt-1 max-w-2xl leading-relaxed">
            Provide a high-level operational outcome instead of configuring manual steps. AI prepares, you review, then AI executes.
          </p>
        </div>

        {/* Workspace Quick Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2 rounded-full border border-black/[0.08] shadow-2xs transition-all cursor-pointer"
        >
          <span>← Back to Overview</span>
        </Link>
      </div>

      {isDelegated ? (
        <div className="bg-white rounded-[28px] border border-black/[0.08] p-8 sm:p-12 shadow-[0_12px_36px_rgba(0,0,0,0.06)] text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#C1F2D5] text-[#16856B] flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="w-7 h-7 text-[#16856B]" />
          </div>
          <h2 className="text-lg font-bold text-[#1A1A1A]">
            Outcome Successfully Delegated to Autonomous Workforce
          </h2>
          <p className="text-xs text-black/60 leading-relaxed max-w-md mx-auto">
            Autonomous telephony workforce has acknowledged the blueprint. Programmatic queue primed. Live transcripts and appointment logs stream directly to your Overview and Calls ledger.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-sm transition-all"
            >
              <span>View Overview Live Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* STEP 1: Formulate Outcome */}
          <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#111111] text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                Define the Desired Operational Outcome
              </span>
            </div>

            <textarea
              rows={3}
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              className="w-full text-xs sm:text-sm p-4 bg-[#FBF7ED] border border-black/[0.06] rounded-2xl focus:outline-none focus:border-black/30 text-[#1A1A1A] leading-relaxed font-medium"
              placeholder="Describe what you want your AI workforce to achieve..."
            />
          </div>

          {/* STEP 2: AI Prepares Blueprint */}
          <div className="bg-white rounded-[26px] border border-black/[0.06] shadow-2xs overflow-hidden">
            {/* Top Tab Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#FBF7ED] border-b border-black/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-white border border-black/[0.08] text-[#1A1A1A] font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  AI Autonomous Execution Plan (Prepared)
                </span>
              </div>
              <span className="text-[10px] font-bold bg-[#D9C2FA] text-[#1A1A1A] px-3 py-1 rounded-full">
                Ready for Review
              </span>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Block 1 */}
                <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-black/50 text-xs font-semibold">
                    <Users className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    <span>Audience</span>
                  </div>
                  <div className="text-base font-bold text-[#1A1A1A]">
                    Target List
                  </div>
                  <p className="text-xs text-black/55">
                    Uploaded contact list or filtered segment
                  </p>
                </div>

                {/* Block 2 */}
                <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-black/50 text-xs font-semibold">
                    <Bot className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    <span>Assigned Persona</span>
                  </div>
                  <div className="text-base font-bold text-[#1A1A1A]">
                    AI Voice Agent
                  </div>
                  <p className="text-xs text-black/55">
                    Autonomous voice engine • Latency &lt; 450ms
                  </p>
                </div>

                {/* Block 3 */}
                <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-black/50 text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    <span>Knowledge Grounded</span>
                  </div>
                  <div className="text-base font-bold text-[#1A1A1A]">
                    Knowledge Base
                  </div>
                  <p className="text-xs text-black/55">
                    Grounded in uploaded documents and FAQs
                  </p>
                </div>

                {/* Block 4 */}
                <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-black/50 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#1A1A1A]" />
                    <span>Cadence Window</span>
                  </div>
                  <div className="text-base font-bold text-[#1A1A1A]">
                    Business Hours
                  </div>
                  <p className="text-xs text-black/55">
                    Automatic retry attempts & DND compliance
                  </p>
                </div>
              </div>

              {/* Guardrails Box */}
              <div className="p-4 rounded-2xl bg-[#BCD0F5]/40 border border-[#A8C3F0]/60 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
                <div className="text-xs text-black/70 leading-relaxed">
                  <strong className="text-[#1A1A1A] block mb-0.5">
                    Autonomous Guardrails & Warm Transfer Protocols:
                  </strong>
                  Complex inquiries or customer escalation requests will automatically trigger a warm transfer to human staff with live call summary and context delivered instantly.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-black/50">
                  Review the plan parameters above before authorizing autonomous dispatch.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      alert("Setup parameters unlocked for editing.");
                    }}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold bg-white hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.08] cursor-pointer transition-colors"
                  >
                    Edit Parameters
                  </button>

                  <button
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#111111] hover:bg-black text-white transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                  >
                    {isProcessing ? (
                      <span>Launching Engine...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                        <span>Approve & Launch Autonomous Work</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
