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
    <div className="space-y-6 sm:space-y-8 select-none text-white">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#71717A] hover:text-white transition-colors"
            >
              AUTONOMOUS DISPATCH
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white bg-[#121215] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              WORKFORCE STANDBY
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Delegate an Outcome
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Provide a high-level operational outcome instead of configuring manual steps. AI prepares, you review, then AI executes.
          </p>
        </div>

        {/* Workspace Quick Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-mono uppercase tracking-wider px-3.5 py-2 rounded-[2px] border border-[#27272A] hover:border-white transition-all cursor-pointer"
        >
          <span>← Back to Overview</span>
        </Link>
      </div>

      {isDelegated ? (
        <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-8 sm:p-12 shadow-xs text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-[2px] bg-white text-black flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-lg font-mono font-bold text-white uppercase tracking-wider">
            Outcome Successfully Delegated to Autonomous Workforce
          </h2>
          <p className="text-xs font-mono text-[#A1A1AA] leading-relaxed max-w-md mx-auto">
            Autonomous telephony workforce has acknowledged the blueprint. Programmatic queue primed. Live transcripts and appointment logs stream directly to your Overview and Calls ledger.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-[2px] shadow-xs"
            >
              <span>View Overview Live Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* STEP 1: Formulate Outcome */}
          <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-[2px] bg-white text-black font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Define the Desired Operational Outcome
              </span>
            </div>

            <textarea
              rows={3}
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              className="w-full text-xs sm:text-sm p-3.5 bg-[#121215] border border-[#27272A] rounded-[2px] focus:outline-none focus:border-white text-white leading-relaxed font-mono"
              placeholder="Describe what you want your AI workforce to achieve..."
            />
          </div>

          {/* STEP 2: AI Prepares Blueprint */}
          <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
            {/* Top Tab Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#121215] border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-[2px] bg-[#27272A] text-white font-mono font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  AI Autonomous Execution Plan (Prepared)
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-[#18181B] text-white px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                Ready for Review
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Block 1 */}
                <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#71717A] text-[10px] font-mono font-bold uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5" />
                    <span>Audience</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">
                    Target List
                  </div>
                  <p className="text-[11px] font-mono text-[#A1A1AA]">
                    Uploaded contact list or filtered segment
                  </p>
                </div>

                {/* Block 2 */}
                <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#71717A] text-[10px] font-mono font-bold uppercase tracking-wider">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Assigned Persona</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">
                    AI Voice Agent
                  </div>
                  <p className="text-[11px] font-mono text-[#A1A1AA]">
                    Autonomous voice engine • Latency &lt; 450ms
                  </p>
                </div>

                {/* Block 3 */}
                <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#71717A] text-[10px] font-mono font-bold uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Knowledge Grounded</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">
                    Knowledge Base
                  </div>
                  <p className="text-[11px] font-mono text-[#A1A1AA]">
                    Grounded in uploaded documents and FAQs
                  </p>
                </div>

                {/* Block 4 */}
                <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#71717A] text-[10px] font-mono font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Cadence Window</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">
                    Business Hours
                  </div>
                  <p className="text-[11px] font-mono text-[#A1A1AA]">
                    Automatic retry attempts & DND compliance
                  </p>
                </div>
              </div>

              {/* Guardrails Box */}
              <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] flex items-start gap-3 font-mono">
                <ShieldCheck className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <div className="text-xs text-[#A1A1AA] leading-relaxed">
                  <strong className="text-white uppercase block mb-0.5">
                    Autonomous Guardrails & Warm Transfer Protocols:
                  </strong>
                  Complex inquiries or customer escalation requests will automatically trigger a warm transfer to human staff with live call summary and context delivered instantly.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-[#71717A] font-mono">
                  Review the plan parameters above before authorizing autonomous dispatch.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      alert("Setup parameters unlocked for editing.");
                    }}
                    className="px-3.5 py-2 rounded-[2px] text-xs font-mono uppercase tracking-wider bg-transparent hover:bg-[#121215] text-white border border-[#27272A] hover:border-white cursor-pointer"
                  >
                    Edit Parameters
                  </button>

                  <button
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                  >
                    {isProcessing ? (
                      <span>Launching Engine...</span>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-black" />
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
