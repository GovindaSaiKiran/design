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
  PhoneIncoming,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { TelephonyNumber } from "@/types/dashboard";
import { mockTelephonyNumbers } from "@/data/mock/dashboardData";

export default function PhoneNumbersPage() {
  const [numbers, setNumbers] = useState<TelephonyNumber[]>(mockTelephonyNumbers);
  const [testLineNotice, setTestLineNotice] = useState<string | null>(null);

  const handleTestInbound = (num?: TelephonyNumber) => {
    if (!num) return;
    setTestLineNotice(
      `Inbound SIP test ping dispatched to ${num.phoneNumber} (${num.label}). Routing verified to ${num.assignedAgent} with ${num.latencyMs}ms carrier latency.`
    );
    setTimeout(() => {
      setTestLineNotice(null);
    }, 4500);
  };

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A]">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/45 hover:text-black transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A2D78] bg-[#D9C2FA] px-3 py-0.5 rounded-full">
              Telephony &amp; Numbers
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Phone Numbers &amp; Carrier Telephony
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Direct Inbound DIDs, SIP trunk lines, carrier routing matrices, and concurrent channel allocations.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => alert("Enterprise SIP Trunk is healthy. 16 channels primed for concurrent inbound/outbound calls.")}
            className="inline-flex items-center gap-2 bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-full border border-black/[0.06] transition-all cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-black/50" />
            <span>Trunk Diagnostics</span>
          </button>

          <button
            onClick={() => {
              const newNum: TelephonyNumber = {
                id: `tel-${Date.now()}`,
                phoneNumber: "+91 40 4590 1200",
                label: "Admissions Escalation Desk",
                assignedAgent: "Maya (Admissions)",
                status: "active",
                channelType: "Direct DID",
                latencyMs: 38,
                callsToday: 0,
              };
              setNumbers([...numbers, newNum]);
            }}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Provision Inbound DID</span>
          </button>
        </div>
      </div>

      {/* Test Line Banner */}
      {testLineNotice && (
        <div className="bg-[#C1F2D5]/40 border border-[#16856B]/20 p-4 rounded-[20px] flex items-center gap-3 text-xs text-[#0D593F] shadow-2xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
          <span className="leading-snug font-medium">{testLineNotice}</span>
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Primary Helpline"
          icon={Radio}
          description="Direct inbound line for prospective student inquiries and campus tours."
          metric={numbers[0]?.phoneNumber || "+91 40 4590 1199"}
          metricLabel={numbers[0] ? `Routed to ${numbers[0].assignedAgent}` : "Primary DID"}
          status="Primary DID"
          statusType="live"
          actionLabel="Test line ping →"
          onClick={() => {
            if (numbers[0]) handleTestInbound(numbers[0]);
          }}
        />

        <WorkspaceCard
          name="Finance Desk Line"
          icon={PhoneCall}
          description="Dedicated line for fee breakdowns, installment queries, and aid."
          metric={numbers[1]?.phoneNumber || "+91 40 4590 1198"}
          metricLabel={numbers[1] ? `Routed to ${numbers[1].assignedAgent}` : "Direct DID"}
          status="Direct DID"
          statusType="live"
          actionLabel="Test line ping →"
          onClick={() => {
            if (numbers[1]) handleTestInbound(numbers[1]);
          }}
        />

        <WorkspaceCard
          name="Outreach Caller ID"
          icon={Layers}
          description="National outbound caller ID for automated admissions follow-up cadences."
          metric={numbers[2]?.phoneNumber || "+91 40 4590 1197"}
          metricLabel={numbers[2] ? `Assigned to ${numbers[2].assignedAgent}` : "Outbound Channel"}
          status="Active Route"
          statusType="ready"
          actionLabel="Test line ping →"
          onClick={() => {
            if (numbers[2]) handleTestInbound(numbers[2]);
          }}
        />

        <WorkspaceCard
          name="SIP Concurrency"
          icon={Activity}
          description="Enterprise SIP trunk allocation via Airtel Direct Cloud Gateway."
          metric="16 channels"
          metricLabel="Sub-45ms carrier handoff"
          status="Operational"
          statusType="live"
          actionLabel="Trunk diagnostics →"
          onClick={() => alert("All 16 SIP channels online and operational.")}
        />
      </div>

      {/* Telephony Routing Table */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] overflow-hidden shadow-2xs">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#1A1A1A]">
              Telephony Route Registry
            </span>
            <span className="text-xs text-black/45 font-medium">
              ({numbers.length} configured DIDs)
            </span>
          </div>
          <span className="text-xs text-black/50 hidden sm:inline">
            Sub-50ms carrier handoff to AI agent WebRTC gateway
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-5">DID Number</th>
                <th className="py-3 px-5">Department / Label</th>
                <th className="py-3 px-5">Channel Type</th>
                <th className="py-3 px-5">Routed AI Agent</th>
                <th className="py-3 px-5">Carrier Latency</th>
                <th className="py-3 px-5">Calls Today</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {numbers.map((num) => (
                <tr
                  key={num.id}
                  className="hover:bg-black/[0.015] transition-colors group text-[#1A1A1A]"
                >
                  {/* Phone Number */}
                  <td className="py-4 px-5 font-semibold text-[#1A1A1A]">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-black/40" />
                      <span>{num.phoneNumber}</span>
                    </div>
                  </td>

                  {/* Label */}
                  <td className="py-4 px-5 font-medium text-[#1A1A1A]">
                    {num.label}
                  </td>

                  {/* Channel Type */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#BCD0F5] text-[#1E3A8A]">
                      {num.channelType}
                    </span>
                  </td>

                  {/* Routed AI Agent */}
                  <td className="py-4 px-5 font-medium text-[#1A1A1A]">
                    {num.assignedAgent}
                  </td>

                  {/* Carrier Latency */}
                  <td className="py-4 px-5 text-[#16856B] font-semibold">
                    {num.latencyMs} ms
                  </td>

                  {/* Calls Today */}
                  <td className="py-4 px-5 font-semibold text-[#1A1A1A]">
                    {num.callsToday} calls
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#C1F2D5] text-[#0D593F] px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleTestInbound(num)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                    >
                      <PhoneIncoming className="w-3 h-3 text-black/50" />
                      <span>Test Route</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
