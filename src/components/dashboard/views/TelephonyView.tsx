"use client";

import React, { useState } from "react";
import { TelephonyNumber } from "@/types/dashboard";
import {
  Radio,
  Phone,
  ShieldCheck,
  Plus,
  Server,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Wifi,
  Sparkles,
  Zap,
  Sliders,
  Cpu,
} from "lucide-react";
import TelephonyStatus from "../components/TelephonyStatus";

interface TelephonyViewProps {
  numbers: TelephonyNumber[];
}

export default function TelephonyView({ numbers }: TelephonyViewProps) {
  const [provisionSuccess, setProvisionSuccess] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [expression, setExpression] = useState("Natural / Warm");
  const [sampleRate, setSampleRate] = useState("22 kHz");

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. SARVAM EDITORIAL HERO & TELEPHONY HEADER                               */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-xs font-semibold text-neutral-800">
              <span className="text-amber-600 font-serif">~ 𑁍 ~</span>
              <span>Low Latency Streaming Telephony</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight leading-tight">
              Sub-250ms first byte with WebSocket streaming for real-time voice applications.
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Provision virtual Indian numbers, configure zero-lag SIP trunks, and fine-tune voice pace, expressiveness, and tone to match your institutional admissions brand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setProvisionSuccess(true);
                setTimeout(() => setProvisionSuccess(false), 3500);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2]" />
              <span>Provision Virtual Number</span>
            </button>
          </div>
        </div>
      </div>

      {provisionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50/80 backdrop-blur-md border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>New virtual line +91 40 4590 1199 successfully provisioned and bound to Inbound Admissions Router.</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CONFIGURABLE CONTROLS & STREAMING PARAMETERS (FROM SARVAM PDF 1 PG 7)  */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 hover:border-black/20 transition-all">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-[11px] font-semibold text-neutral-800 mb-2">
              <Sliders className="w-3 h-3 text-amber-600" />
              <span>Acoustic Synthesis Parameters</span>
            </div>
            <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
              Configurable Controls
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Fine-tune voice pace, expressiveness, and tone to match your institution.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1 rounded-xl border border-black/5">
            Bulbul V3 Tuner
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Speed Slider */}
          <div className="liquid-glass-subtle p-5 rounded-2xl border border-black/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900">Speech Pace (Speed)</span>
              <span className="font-mono font-semibold text-neutral-800 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-black/10">
                {speed.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
              <span>0.75x (Formal)</span>
              <span>1.0x (Standard)</span>
              <span>1.5x (Fast)</span>
            </div>
          </div>

          {/* Expression Selector */}
          <div className="liquid-glass-subtle p-5 rounded-2xl border border-black/10 space-y-2">
            <label className="block text-xs font-semibold text-neutral-900">
              Emotional Expression & Tone
            </label>
            <select
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-black/10 text-xs font-medium text-neutral-800 focus:outline-none focus:border-black/30"
            >
              <option value="Natural / Warm">Natural / Warm (Admissions Counseling)</option>
              <option value="Expressive / Excited">Expressive / Excited (Campus Fest & Open Days)</option>
              <option value="Instructional / Crisp">Instructional / Crisp (Fee & Examination Helpdesk)</option>
              <option value="Empathetic / Calm">Empathetic / Calm (Student Grievances)</option>
            </select>
            <p className="text-[10px] text-neutral-500">
              Modulates prosody and pitch contours across Indic phonetic utterances.
            </p>
          </div>

          {/* Audio Sample Rate */}
          <div className="liquid-glass-subtle p-5 rounded-2xl border border-black/10 space-y-2">
            <label className="block text-xs font-semibold text-neutral-900">
              Acoustic Sample Rate
            </label>
            <select
              value={sampleRate}
              onChange={(e) => setSampleRate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-black/10 text-xs font-medium text-neutral-800 focus:outline-none focus:border-black/30 font-mono"
            >
              <option value="22 kHz">22.05 kHz (Studio Ultra-HD)</option>
              <option value="16 kHz">16.0 kHz (Wideband VoIP HD)</option>
              <option value="8 kHz">8.0 kHz (Narrowband Telephony G.711)</option>
            </select>
            <p className="text-[10px] text-neutral-500">
              Standard SIP telephony routes automatically downsample with anti-aliasing.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN TELEPHONY ROUTING STATUS                                          */}
      {/* ========================================================================= */}
      <TelephonyStatus />

      {/* ========================================================================= */}
      {/* 4. SIP TRUNK & CARRIER SPECS (CLEAN CARDS)                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="liquid-glass-card p-7 hover:border-black/25 transition-all">
          <h3 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2.5 pb-3 border-b border-black/10">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Server className="w-4 h-4" />
            </div>
            <span>Carrier Gateway Architecture</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="text-neutral-500">Primary SIP Gateway:</span>
              <span className="font-mono font-semibold text-neutral-900">sip.hyderabad.voicepilot.in</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="text-neutral-500">Backup Failover:</span>
              <span className="font-mono font-medium text-neutral-700">sip.mumbai.voicepilot.in (Hot Standby)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="text-neutral-500">Codec Negotiation:</span>
              <span className="font-mono font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">G.711 / Opus Wideband HD</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-500">SRTP Security:</span>
              <span className="font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">TLS 1.3 / SRTP Enabled</span>
            </div>
          </div>
        </div>

        <div className="liquid-glass-card p-7 hover:border-black/25 transition-all">
          <h3 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2.5 pb-3 border-b border-black/10">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Activity className="w-4 h-4" />
            </div>
            <span>Live Carrier Health SLA</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="text-neutral-500">Uptime SLA:</span>
              <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">99.98% Guaranteed</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="text-neutral-500">Acoustic Jitter:</span>
              <span className="font-mono font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md border border-black/5">1.2 ms</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="text-neutral-500">Packet Loss:</span>
              <span className="font-mono font-semibold text-neutral-900">0.00%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-500">STIR/SHAKEN Caller ID:</span>
              <span className="font-mono font-medium text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">Level A (Full Attestation)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
