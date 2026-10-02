"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Bot,
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  Send,
  Radio,
  Clock,
  Layers,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";

export default function DelegateTaskPage() {
  const [goalText, setGoalText] = useState(
    "Follow up with 420 students who downloaded the B.Tech CSE brochure, evaluate their 12th PCM cutoff marks, and schedule counseling visits for this Saturday."
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDelegated, setIsDelegated] = useState(false);

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDelegated(true);
    }, 1200);
  };

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
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926] animate-pulse" />
              Autonomous Workforce Ready
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Delegate an Outcome
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Give a high-level operational outcome instead of configuring manual steps. AI prepares, you review, then AI executes.
          </p>
        </div>

        {/* Workspace Quick Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 shadow-2xs transition-all cursor-pointer"
        >
          <span>← Back to Overview</span>
        </Link>
      </div>

      {isDelegated ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Outcome Successfully Delegated to Autonomous Workforce!
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
            Maya AI & Neha AI are now calling the 420 filtered applicants with PCM &gt; 90%. Real-time telemetry, transfers, and counseling appointments will stream directly to your Overview and Calls workspace.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl border border-[#bceb42] shadow-xs"
            >
              <span>View Overview Live Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* STEP 1: Formulate Outcome */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#cdfb56] text-slate-950 font-bold text-xs flex items-center justify-center border border-[#bceb42]">
                1
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Define the Desired Institutional Outcome
              </span>
            </div>

            <textarea
              rows={3}
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              className="w-full text-xs sm:text-sm p-3.5 bg-slate-50/70 border border-slate-200/90 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#cdfb56] focus:border-[#cdfb56] text-slate-800 leading-relaxed font-sans"
              placeholder="Describe what you want your AI workforce to achieve..."
            />
          </div>

          {/* STEP 2: AI Prepares Blueprint */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            {/* Top Tab Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  AI Autonomous Execution Plan (Prepared)
                </span>
              </div>
              <span className="text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 px-2 py-0.5 rounded border border-[#cdfb56]">
                Ready for Review
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Block 1 */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5" />
                    <span>Audience</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900 font-mono">
                    420 Verified
                  </div>
                  <p className="text-[11px] text-slate-500">
                    B.Tech CSE brochure downloaders with PCM &gt; 90%
                  </p>
                </div>

                {/* Block 2 */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Assigned Persona</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    Maya (Admissions)
                  </div>
                  <p className="text-[11px] text-slate-500">
                    English + Hindi Bilingual • 98.4% accuracy
                  </p>
                </div>

                {/* Block 3 */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Knowledge Grounded</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    Fee & Scholarships
                  </div>
                  <p className="text-[11px] text-slate-500">
                    50% Chancellor Merit Waiver cutoff matrices
                  </p>
                </div>

                {/* Block 4 */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Cadence Window</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    10:00 AM - 5:30 PM
                  </div>
                  <p className="text-[11px] text-slate-500">
                    12 concurrent channels • 3 retry attempts
                  </p>
                </div>
              </div>

              {/* Guardrails Box */}
              <div className="p-4 rounded-xl bg-[#f7fee7]/40 border border-[#cdfb56]/80 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#8ac926] mt-0.5 shrink-0" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 font-bold block mb-0.5">
                    Autonomous Guardrails & Warm Transfer Protocols:
                  </strong>
                  Complex queries regarding lateral diploma exemptions or non-standard fee installment requests will automatically trigger a warm transfer to human admissions staff with live caller notes delivered instantly.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  Review the plan parameters above before authorizing autonomous dispatch.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Setup parameters unlocked for editing.")}
                    className="px-3.5 py-2 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 cursor-pointer"
                  >
                    Edit Parameters
                  </button>

                  <button
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Launching Engine...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
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
