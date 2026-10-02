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

export default function PhoneNumbersPage() {
  const [numbers, setNumbers] = useState<TelephonyNumber[]>(mockTelephonyNumbers);
  const [testLineNotice, setTestLineNotice] = useState<string | null>(null);

  const handleTestInbound = (num: TelephonyNumber) => {
    setTestLineNotice(
      `Inbound SIP ping sent to ${num.phoneNumber} (${num.label}). Routing verified to ${num.assignedAgent} with ${num.latencyMs}ms latency.`
    );
    setTimeout(() => {
      setTestLineNotice(null);
    }, 4000);
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
              SIP Trunking Active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Phone Numbers & Telephony Routing
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Inbound DIDs, SIP trunk lines, regional carrier routing, and concurrency limits.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => {
              alert("Airtel Enterprise SIP Trunk is healthy. All 30 concurrent channels active.");
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#f7fee7] text-slate-800 hover:text-slate-950 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:border-[#cdfb56] shadow-2xs transition-all cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>Trunk Diagnostics</span>
          </button>

          <button
            onClick={() => {
              const newNum: TelephonyNumber = {
                id: `tel-${Date.now()}`,
                phoneNumber: "+91 40 4590 1199",
                label: "Hostel & Facilities Helpline",
                assignedAgent: "Student Support Agent",
                status: "active",
                channelType: "Direct DID",
                latencyMs: 40,
                callsToday: 0,
              };
              setNumbers([...numbers, newNum]);
            }}
            className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950" />
            <span>Provision Inbound DID</span>
          </button>
        </div>
      </div>

      {/* Test Line Banner */}
      {testLineNotice && (
        <div className="bg-[#f7fee7] border border-[#cdfb56] p-3 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-900 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#8ac926]" />
          <span>{testLineNotice}</span>
        </div>
      )}

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Admissions Line"
          icon={Radio}
          description="Direct inbound line for B.Tech admission inquiries and cutoffs."
          metric="+91 40 4590 1132"
          metricLabel="Routed to Maya (Admissions) • 38ms latency"
          status="Primary DID"
          statusType="live"
          actionLabel="Test route →"
          onClick={() => handleTestInbound(numbers[0])}
        />

        <WorkspaceCard
          name="Student Helpdesk"
          icon={PhoneCall}
          description="Helpline for hostel rooms, bus schedules, and campus life queries."
          metric="+91 40 4590 1144"
          metricLabel="Routed to Neha (Support) • 42ms latency"
          status="Direct DID"
          statusType="live"
          actionLabel="Test route →"
          onClick={() => handleTestInbound(numbers[1])}
        />

        <WorkspaceCard
          name="Outreach Carrier"
          icon={Layers}
          description="Toll-free national outbound caller ID for student follow-ups."
          metric="+91 40 4590 1155"
          metricLabel="Toll-Free Outbound Channel • 45ms latency"
          status="Active line"
          statusType="ready"
          actionLabel="Test route →"
          onClick={() => handleTestInbound(numbers[2])}
        />

        <WorkspaceCard
          name="SIP Concurrency"
          icon={Activity}
          description="Enterprise SIP trunk allocation via Airtel Enterprise cloud gateway."
          metric="30 channels"
          metricLabel="3 active now • 27 idle ready"
          status="Carrier live"
          statusType="live"
          actionLabel="View carrier →"
        />
      </div>

      {/* ======================================================================= */}
      {/* TELEPHONY ROUTING TABLE                                                 */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Telephony Route Registry
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              ({numbers.length} configured lines)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Sub-50ms carrier handoff to AI agent WebRTC gateway
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">DID Number</th>
                <th className="py-3 px-4">Department / Label</th>
                <th className="py-3 px-4">Channel Type</th>
                <th className="py-3 px-4">Routed AI Agent</th>
                <th className="py-3 px-4">Carrier Latency</th>
                <th className="py-3 px-4">Calls Today</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {numbers.map((num) => (
                <tr
                  key={num.id}
                  className="hover:bg-[#f7fee7]/30 transition-colors group"
                >
                  {/* Phone Number */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 group-hover:text-slate-950">
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-slate-500" />
                      <span>{num.phoneNumber}</span>
                    </div>
                  </td>

                  {/* Label */}
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {num.label}
                  </td>

                  {/* Channel Type */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {num.channelType}
                    </span>
                  </td>

                  {/* Routed Agent */}
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {num.assignedAgent}
                  </td>

                  {/* Latency */}
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {num.latencyMs}ms
                  </td>

                  {/* Calls Today */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {num.callsToday}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 px-2 py-0.5 rounded-full border border-[#cdfb56]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926] animate-pulse" />
                      Active
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleTestInbound(num)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-[#cdfb56] text-slate-800 hover:text-slate-950 border border-slate-200 hover:border-[#bceb42] shadow-2xs transition-all cursor-pointer"
                    >
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
