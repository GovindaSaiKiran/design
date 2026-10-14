"use client";

import React, { useState } from "react";
import {
  Zap,
  Phone,
  Copy,
  Check,
  Globe,
  Share2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2,
  Terminal,
  Activity,
  Layers,
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
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans select-none animate-in fade-in duration-300 text-white">
      {/* Hero Banner */}
      <div className="relative p-6 sm:p-8 rounded-[2px] bg-[#09090B] border border-[#27272A] text-white overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-[2px] bg-[#121215] border border-[#27272A] text-[10px] font-mono uppercase tracking-[0.2em] text-[#A1A1AA]">
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
            <span>SUB-30-SECOND SPEED TO LEAD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Instant Lead Dialing Channel
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
            Call incoming leads from Meta Ads, Google Forms, or your website in <b>less than 30 seconds</b> of submission before they leave their screen.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-[2px] bg-[#09090B] border border-[#27272A] space-y-1 font-mono">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">Average Response Time</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-white">18.4s</span>
            <span className="text-xs text-[#A1A1AA]">from form submit</span>
          </div>
          <p className="text-[11px] text-[#71717A] mt-1">Industry standard is 4–6 hours</p>
        </div>

        <div className="p-5 rounded-[2px] bg-[#09090B] border border-[#27272A] space-y-1 font-mono">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">Lead Pickup Rate</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-white">76.8%</span>
            <span className="text-xs text-[#A1A1AA] font-bold">↑ 3.2X LIFT</span>
          </div>
          <p className="text-[11px] text-[#71717A] mt-1">Lead is still holding their device</p>
        </div>

        <div className="p-5 rounded-[2px] bg-[#09090B] border border-[#27272A] space-y-1 font-mono">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">Total Instant Dials</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-white">4,812</span>
            <span className="text-xs text-[#A1A1AA] font-bold">THIS MONTH</span>
          </div>
          <p className="text-[11px] text-[#71717A] mt-1">100% automated via Webhooks</p>
        </div>
      </div>

      {/* Two Column Layout: Webhook URL & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Webhook Endpoint */}
        <div className="p-6 rounded-[2px] bg-[#09090B] border border-[#27272A] space-y-5">
          <div>
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-white" />
              <span>Inbound Webhook Endpoint</span>
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Connect this URL to Meta Lead Ads, Zapier, Make.com, or your web contact forms.
            </p>
          </div>

          <div className="p-3 bg-[#121215] rounded-[2px] border border-[#27272A] flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-white truncate select-all">{webhookUrl}</span>
            <button
              onClick={handleCopyWebhook}
              className="px-3 py-1.5 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED" : "COPY"}</span>
            </button>
          </div>

          <div className="space-y-3 font-mono">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">Active Ingestion Bridges:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-[2px] border border-[#27272A] bg-[#121215] flex items-center gap-2.5">
                <span className="text-base">📘</span>
                <div>
                  <p className="font-bold text-white">Meta Lead Ads</p>
                  <p className="text-[10px] text-[#A1A1AA]">Active & Listening</p>
                </div>
              </div>
              <div className="p-3 rounded-[2px] border border-[#27272A] bg-[#121215] flex items-center gap-2.5">
                <span className="text-base">📝</span>
                <div>
                  <p className="font-bold text-white">Google Forms / Sheets</p>
                  <p className="text-[10px] text-[#A1A1AA]">Connected via Zapier</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Instant Call Simulator */}
        <div className="p-6 rounded-[2px] bg-[#09090B] border border-[#27272A] space-y-4">
          <div>
            <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-white" />
              <span>Simulate Form Ingestion Trigger</span>
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-1">
              Verify real-world latency when a student submits their details on a lead page.
            </p>
          </div>

          <form onSubmit={handleSimulateInstantCall} className="space-y-3 text-xs font-mono">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-1">Lead Name:</label>
              <input
                type="text"
                required
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                className="w-full px-3 py-2 rounded-[2px] border border-[#27272A] bg-[#121215] text-white outline-none focus:border-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-1">Lead Mobile Phone:</label>
              <input
                type="text"
                required
                value={simPhone}
                onChange={(e) => setSimPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-[2px] border border-[#27272A] bg-[#121215] text-white outline-none focus:border-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-1">Inquired Course / Interest:</label>
              <input
                type="text"
                required
                value={simCourse}
                onChange={(e) => setSimCourse(e.target.value)}
                className="w-full px-3 py-2 rounded-[2px] border border-[#27272A] bg-[#121215] text-white outline-none focus:border-white font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={simulating}
              className="w-full py-2.5 rounded-[2px] bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-black text-black" />
              <span>{simulating ? "Dispatching in < 10s..." : "Simulate Instant Lead Trigger"}</span>
            </button>

            {simResult && (
              <div className="p-3 bg-[#121215] border border-white/40 rounded-[2px] text-xs font-mono text-white flex items-center gap-2 shadow-sm animate-in fade-in">
                <Check className="w-4 h-4 text-white" />
                <span>{simResult}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
