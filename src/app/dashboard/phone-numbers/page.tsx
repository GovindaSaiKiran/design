"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Radio,
  Plus,
  PhoneCall,
  Settings,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { TelephonyNumber } from "@/types/dashboard";
import { mockTelephonyNumbers } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

export default function PhoneNumbersPage() {
  const [numbers, setNumbers] = useState<TelephonyNumber[]>(mockTelephonyNumbers);
  const [testLineNotice, setTestLineNotice] = useState<string | null>(null);

  const handleTestInbound = (num?: TelephonyNumber) => {
    if (!num) return;
    try {
      soundSynth.play("confirm");
    } catch {}
    setTestLineNotice(
      `INBOUND SIP PING DISPATCHED → ${num.phoneNumber} (${num.label}). Routing verified to ${num.assignedAgent} with ${num.latencyMs}ms carrier latency.`
    );
    setTimeout(() => {
      setTestLineNotice(null);
    }, 4500);
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
              TELEPHONY WORKSPACE
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white bg-[#121215] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {numbers.length} CARRIER DIDS ROUTED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Phone Numbers & Telephony Routing
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Direct Inbound DIDs, SIP trunk lines, regional carrier routing matrices, and concurrency limits.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              alert("Enterprise SIP Trunk is healthy. 16 channels primed for concurrent inbound/outbound calls.");
            }}
            className="inline-flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-mono uppercase tracking-wider px-3.5 py-2 rounded-[2px] border border-[#27272A] hover:border-white transition-all cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>Trunk Diagnostics</span>
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("confirm"); } catch {}
              const newNum: TelephonyNumber = {
                id: `tel-${Date.now()}`,
                phoneNumber: "+91 40 4590 1199",
                label: "Inbound Customer Helpline",
                assignedAgent: "AI Assistant",
                status: "active",
                channelType: "Direct DID",
                latencyMs: 40,
                callsToday: 0,
              };
              setNumbers([...numbers, newNum]);
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-black" />
            <span>Provision Inbound DID</span>
          </button>
        </div>
      </div>

      {/* Test Line Banner */}
      {testLineNotice && (
        <div className="bg-[#121215] border border-white/40 p-3.5 rounded-[2px] flex items-center gap-3 text-xs font-mono text-white shadow-lg animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span className="leading-snug">{testLineNotice}</span>
        </div>
      )}

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Primary Helpline"
          icon={Radio}
          description="Direct inbound line for customer inquiries and lead routing."
          metric={numbers[0]?.phoneNumber || "None"}
          metricLabel={numbers[0] ? `Routed to ${numbers[0].assignedAgent}` : "No inbound line provisioned"}
          status={numbers[0] ? "Primary DID" : "Unassigned"}
          statusType={numbers[0] ? "live" : "neutral"}
          actionLabel="Provision DID →"
          onClick={() => {
            if (numbers[0]) handleTestInbound(numbers[0]);
          }}
        />

        <WorkspaceCard
          name="Support Desk Line"
          icon={PhoneCall}
          description="Helpline for queries, complaints, and general assistance."
          metric={numbers[1]?.phoneNumber || "None"}
          metricLabel={numbers[1] ? `Routed to ${numbers[1].assignedAgent}` : "No support DID provisioned"}
          status={numbers[1] ? "Direct DID" : "Unassigned"}
          statusType={numbers[1] ? "live" : "neutral"}
          actionLabel="Provision DID →"
          onClick={() => {
            if (numbers[1]) handleTestInbound(numbers[1]);
          }}
        />

        <WorkspaceCard
          name="Outreach Carrier"
          icon={Layers}
          description="National outbound caller ID for automated customer campaigns."
          metric={numbers[2]?.phoneNumber || "None"}
          metricLabel={numbers[2] ? `Outbound Channel` : "No outbound CID assigned"}
          status={numbers[2] ? "Active line" : "Unassigned"}
          statusType={numbers[2] ? "ready" : "neutral"}
          actionLabel="Provision DID →"
          onClick={() => {
            if (numbers[2]) handleTestInbound(numbers[2]);
          }}
        />

        <WorkspaceCard
          name="SIP Concurrency"
          icon={Activity}
          description="Enterprise SIP trunk allocation via cloud gateway."
          metric="16 channels"
          metricLabel="Ready for SIP trunk provisioning"
          status="Operational"
          statusType="live"
          actionLabel="Trunk status →"
        />
      </div>

      {/* ======================================================================= */}
      {/* TELEPHONY ROUTING TABLE                                                 */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#121215] border-b border-[#27272A]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Telephony Route Registry
            </span>
            <span className="text-[11px] text-[#A1A1AA] font-mono">
              ({numbers.length} CONFIGURED TRUNKS)
            </span>
          </div>
          <span className="text-[11px] text-[#71717A] font-mono hidden sm:inline">
            Sub-50ms carrier handoff to AI agent WebRTC gateway
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#121215]/80 border-b border-[#27272A] text-[#71717A] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">DID Number</th>
                <th className="py-3 px-4 font-bold">Department / Label</th>
                <th className="py-3 px-4 font-bold">Channel Type</th>
                <th className="py-3 px-4 font-bold">Routed AI Agent</th>
                <th className="py-3 px-4 font-bold">Carrier Latency</th>
                <th className="py-3 px-4 font-bold">Calls Today</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181B]">
              {numbers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-[2px] bg-[#121215] text-white flex items-center justify-center mx-auto border border-[#27272A]">
                        <Radio className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-white">No phone numbers provisioned</h3>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        Provision dedicated inbound virtual DIDs or configure SIP trunk carrier lines to receive calls.
                      </p>
                      <button
                        onClick={() => {
                          try { soundSynth.play("confirm"); } catch {}
                          const newNum: TelephonyNumber = {
                            id: `tel-${Date.now()}`,
                            phoneNumber: "+91 40 4590 1199",
                            label: "Inbound Customer Helpline",
                            assignedAgent: "AI Assistant",
                            status: "active",
                            channelType: "Direct DID",
                            latencyMs: 40,
                            callsToday: 0,
                          };
                          setNumbers([newNum]);
                        }}
                        className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-black" />
                        <span>Provision Inbound DID</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                numbers.map((num) => (
                  <tr
                    key={num.id}
                    className="hover:bg-[#121215] transition-colors group"
                  >
                    {/* Phone Number */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white group-hover:text-white">
                      <div className="flex items-center gap-2">
                        <Radio className="w-3.5 h-3.5 text-[#A1A1AA]" />
                        <span>{num.phoneNumber}</span>
                      </div>
                    </td>

                    {/* Label */}
                    <td className="py-3.5 px-4 font-medium text-zinc-300">
                      {num.label}
                    </td>

                    {/* Channel Type */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase bg-[#121215] text-zinc-300 border border-[#27272A]">
                        {num.channelType}
                      </span>
                    </td>

                    {/* Routed Agent */}
                    <td className="py-3.5 px-4 font-medium text-zinc-300">
                      {num.assignedAgent}
                    </td>

                    {/* Latency */}
                    <td className="py-3.5 px-4 font-mono text-[#A1A1AA]">
                      {num.latencyMs}ms
                    </td>

                    {/* Calls Today */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {num.callsToday}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#121215] text-white px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Active
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleTestInbound(num)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider bg-transparent hover:bg-white text-zinc-300 hover:text-black border border-[#27272A] hover:border-white transition-all cursor-pointer"
                      >
                        <span>Test Route</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
