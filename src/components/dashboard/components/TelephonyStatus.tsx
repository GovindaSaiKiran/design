"use client";

import React from "react";
import { mockTelephonyNumbers } from "@/data/mock/dashboardData";
import { Phone, Radio, ArrowUpRight, Activity, ShieldCheck, Server } from "lucide-react";

interface TelephonyStatusProps {
  onManageNumbers?: () => void;
}

export default function TelephonyStatus({ onManageNumbers }: TelephonyStatusProps) {
  return (
    <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06]">
              Carrier & SIP Network
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wider bg-[#C1F2D5] text-[#16856B]">
              {mockTelephonyNumbers.length} Lines Active
            </span>
          </div>

          <button
            onClick={onManageNumbers}
            className="text-xs font-semibold text-[#1A1A1A] bg-white hover:bg-[#FAF3E4] px-3.5 py-1.5 rounded-full border border-black/[0.08] transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>Manage</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-black/60" />
          </button>
        </div>

        <div className="flex items-baseline justify-between mt-3">
          <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight font-sans">
            Virtual Number Routing Table
          </h3>
          <span className="text-xs font-semibold text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
            {mockTelephonyNumbers.length > 0 ? "Latency: 38ms avg" : "Standby"}
          </span>
        </div>
        <p className="text-xs text-black/55 mt-1">
          Dedicated virtual SIP trunks with instant sub-millisecond carrier failover
        </p>
      </div>

      {/* Number List */}
      <div className="space-y-3 my-5">
        {mockTelephonyNumbers.length === 0 ? (
          <div className="bg-[#FAF3E4]/30 p-6 rounded-2xl border border-black/[0.05] text-center space-y-2">
            <Phone className="w-6 h-6 text-black/40 mx-auto" />
            <p className="text-xs font-semibold text-[#1A1A1A]">No phone numbers provisioned</p>
            <p className="text-[11px] text-black/50 max-w-sm mx-auto">
              Provision a virtual DID or connect your SIP trunk to assign dedicated phone numbers to your AI voice agents.
            </p>
          </div>
        ) : (
          mockTelephonyNumbers.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF3E4]/30 p-4 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:bg-white hover:shadow-xs transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#1A1A1A] font-sans text-sm truncate">
                    {item.phoneNumber}
                  </div>
                  <div className="text-xs text-black/55 truncate mt-0.5">
                    Assigned Agent: <strong className="text-[#1A1A1A] font-semibold">{item.assignedAgent}</strong>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#BCD0F5]/50 text-[#2451B2]">
                  {item.channelType}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action / Health Telemetry */}
      <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-black/60 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#16856B]" />
          99.98% Carrier SLA Guaranteed
        </span>
        <button
          onClick={onManageNumbers}
          className="text-xs font-semibold text-white bg-[#111111] hover:bg-black px-4 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
        >
          Provision New DID
        </button>
      </div>
    </div>
  );
}
