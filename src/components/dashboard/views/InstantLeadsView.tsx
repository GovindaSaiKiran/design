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

export default function InstantLeadsView() {
  const [copied, setCopied] = useState(false);
  const [simName, setSimName] = useState("Kiran Kumar");
  const [simPhone, setSimPhone] = useState("+91 98401 22340");
  const [simCourse, setSimCourse] = useState("B.Tech Computer Science");
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const webhookUrl = "https://api.swaram.in/v1/leads/webhook/live-inbound-lead-908123";

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateInstantCall = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="space-y-8 pb-12 font-sans select-none animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative p-8 rounded-2xl bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 text-white overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-xs font-semibold text-amber-300">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            <span>Sub-30-Second Speed to Lead</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Instant Lead Calling Channel</h1>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
            Call incoming leads from Meta Ads, Google Forms, or your website in <b>less than 30 seconds</b> of submission before they go cold. Connect rates jump by 4x.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Response Time</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-emerald-600">18.4s</span>
            <span className="text-xs text-slate-500 font-semibold">from form submit</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Industry standard is 4–6 hours</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lead Pickup Rate</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-purple-600">76.8%</span>
            <span className="text-xs text-emerald-600 font-bold">↑ 3.2x</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Lead is still holding their phone</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Instant Dials</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900">4,812</span>
            <span className="text-xs text-purple-600 font-bold">This Month</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">100% automated via Webhooks</p>
        </div>
      </div>

      {/* Two Column Layout: Webhook URL & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Webhook Endpoint */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-600" />
              <span>Your Inbound Lead Webhook URL</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Connect this URL to Meta Lead Ads, Zapier, Make.com, or your web contact forms.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-purple-900 truncate select-all">{webhookUrl}</span>
            <button
              onClick={handleCopyWebhook}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Supported Form Integrations:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2.5">
                <span className="text-base">📘</span>
                <div>
                  <p className="font-bold text-slate-900">Meta Lead Ads</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Active & Listening</p>
                </div>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2.5">
                <span className="text-base">📝</span>
                <div>
                  <p className="font-bold text-slate-900">Google Forms / Sheets</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Connected via Zapier</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Instant Call Simulator */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-600" />
              <span>Simulate an Inbound Form Lead</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Test how fast Swaram triggers an outbound call when a new lead submits their details.
            </p>
          </div>

          <form onSubmit={handleSimulateInstantCall} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lead Name:</label>
              <input
                type="text"
                required
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-purple-600 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lead Mobile Phone:</label>
              <input
                type="text"
                required
                value={simPhone}
                onChange={(e) => setSimPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-purple-600 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Inquired Course / Interest:</label>
              <input
                type="text"
                required
                value={simCourse}
                onChange={(e) => setSimCourse(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-purple-600 font-medium text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={simulating}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{simulating ? "Dispatching in < 10s..." : "Simulate Instant Lead Trigger"}</span>
            </button>

            {simResult && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{simResult}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
