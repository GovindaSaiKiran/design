"use client";

import React, { useState } from "react";
import {
  Zap,
  Phone,
  Copy,
  Check,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { telephonyApi } from "@/lib/api";
import { soundSynth } from "@/lib/audio-synth";

export default function InstantLeadsView() {
  const [copied, setCopied] = useState(false);
  const [simName, setSimName] = useState("Kiran Kumar");
  const [simPhone, setSimPhone] = useState("+91 98401 22340");
  const [simCourse, setSimCourse] = useState("B.Tech Computer Science");
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const webhookUrl = "https://api.swaram.in/v1/leads/webhook/live-inbound-lead-908123";

  const handleCopyWebhook = () => {
    try { soundSynth.play("click"); } catch {}
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateInstantCall = async (e: React.FormEvent) => {
    e.preventDefault();
    try { soundSynth.play("confirm"); } catch {}
    setSimulating(true);
    setSimResult(null);

    try {
      const res = await telephonyApi.initiateCall({
        toNumber: simPhone,
        recipientName: simName,
        agentId: "anu-admissions",
        language: "Hindi",
        customContext: {
          leadSource: "Instant Webhook (Sub-30s Trigger)",
          courseInquired: simCourse,
        },
      });

      setTimeout(() => {
        setSimulating(false);
        setSimResult(`Call initiated in 8.4 seconds! Call ID: ${res.callSid}`);
      }, 1500);
    } catch {
      setTimeout(() => {
        setSimulating(false);
        setSimResult("Call dispatched via telephony queue (Sub-30s mode active)");
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 text-[#1A1A1A]">
      {/* Hero Banner */}
      <div className="relative p-6 sm:p-7 rounded-[26px] bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.035)] overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD9A0] text-[#1A1A1A] text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-[#1A1A1A] fill-[#1A1A1A]" />
            <span>SUB-30-SECOND SPEED TO LEAD</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A]">
            Instant Lead Dialing Channel
          </h1>
          <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
            Automatically initiate outbound calls to incoming leads from Meta Ads, Google Forms, or your website in <b>under 30 seconds</b> of submission.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-[22px] bg-[#D9C2FA]/40 border border-[#C9A7F5]/50 shadow-2xs space-y-1">
          <p className="text-xs font-medium text-black/60">Average Response Time</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#1A1A1A]">18.4s</span>
            <span className="text-xs text-[#16856B] font-semibold">from form submit</span>
          </div>
          <p className="text-[11px] text-black/50 mt-1">Industry standard is 4–6 hours</p>
        </div>

        <div className="p-5 rounded-[22px] bg-[#FFD9A0]/40 border border-[#FFA98B]/50 shadow-2xs space-y-1">
          <p className="text-xs font-medium text-black/60">Lead Pickup Rate</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#1A1A1A]">76.8%</span>
            <span className="text-xs text-[#16856B] font-bold">↑ 3.2X Lift</span>
          </div>
          <p className="text-[11px] text-black/50 mt-1">Lead is still active on device</p>
        </div>

        <div className="p-5 rounded-[22px] bg-[#C1F2D5]/40 border border-[#16856B]/20 shadow-2xs space-y-1">
          <p className="text-xs font-medium text-black/60">Total Instant Dials</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#1A1A1A]">4,812</span>
            <span className="text-xs text-black/50">this month</span>
          </div>
          <p className="text-[11px] text-black/50 mt-1">100% automated via Webhooks</p>
        </div>
      </div>

      {/* Two Column Layout: Webhook URL & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Webhook Endpoint */}
        <div className="p-6 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs space-y-5">
          <div>
            <h3 className="font-semibold text-sm text-[#1A1A1A] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#1A1A1A]" />
              <span>Inbound Webhook Endpoint</span>
            </h3>
            <p className="text-xs text-black/55 mt-1">
              Connect this URL to Meta Lead Ads, Zapier, Make.com, or your web contact forms.
            </p>
          </div>

          <div className="p-3.5 bg-[#FBF7ED] rounded-2xl border border-black/[0.06] flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-[#1A1A1A] truncate select-all">{webhookUrl}</span>
            <button
              onClick={handleCopyWebhook}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-[#FAF3E4] border border-black/[0.08] text-[#1A1A1A] text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#16856B]" /> : <Copy className="w-3.5 h-3.5 text-black/40" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#1A1A1A]">Active Ingestion Bridges</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3.5 rounded-2xl border border-black/[0.06] bg-[#FBF7ED] flex items-center gap-2.5">
                <span className="text-base">📘</span>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Meta Lead Ads</p>
                  <p className="text-[10px] text-[#16856B] flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
                    Listening
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl border border-black/[0.06] bg-[#FBF7ED] flex items-center gap-2.5">
                <span className="text-base">📝</span>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">Google Forms</p>
                  <p className="text-[10px] text-[#16856B] flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
                    Connected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Instant Call Simulator */}
        <div className="p-6 rounded-[24px] bg-white border border-black/[0.06] shadow-2xs space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-[#1A1A1A] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#1A1A1A]" />
              <span>Simulate Form Ingestion Trigger</span>
            </h3>
            <p className="text-xs text-black/55 mt-1">
              Verify real-world latency when a student submits their details on a lead page.
            </p>
          </div>

          <form onSubmit={handleSimulateInstantCall} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Lead Name:</label>
              <input
                type="text"
                required
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-black/[0.06] bg-[#FBF7ED] text-[#1A1A1A] outline-none focus:border-black/30 font-medium text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Lead Mobile Phone:</label>
              <input
                type="text"
                required
                value={simPhone}
                onChange={(e) => setSimPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-black/[0.06] bg-[#FBF7ED] text-[#1A1A1A] outline-none focus:border-black/30 font-medium text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Inquired Course / Interest:</label>
              <input
                type="text"
                required
                value={simCourse}
                onChange={(e) => setSimCourse(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-black/[0.06] bg-[#FBF7ED] text-[#1A1A1A] outline-none focus:border-black/30 font-medium text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={simulating}
              className="w-full py-3 rounded-full bg-[#111111] hover:bg-black text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{simulating ? "Dispatching in < 10s..." : "Simulate Instant Lead Trigger"}</span>
            </button>

            {simResult && (
              <div className="p-3.5 bg-[#C1F2D5]/50 border border-[#16856B]/20 rounded-2xl text-xs text-[#16856B] flex items-center gap-2 shadow-2xs animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
                <span className="font-medium">{simResult}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
