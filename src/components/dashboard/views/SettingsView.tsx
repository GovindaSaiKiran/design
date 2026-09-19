"use client";

import React, { useState } from "react";
import { OrganizationInfo } from "@/types/dashboard";
import { ShieldCheck, Building2, User, Key, Bell, CheckCircle2, Save, CreditCard, ExternalLink } from "lucide-react";

interface SettingsViewProps {
  currentOrg: OrganizationInfo;
}

export default function SettingsView({ currentOrg }: SettingsViewProps) {
  const [orgName, setOrgName] = useState(currentOrg.name);
  const [manager, setManager] = useState(currentOrg.accountManager);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl select-none">
      {/* Neo Header */}
      <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md bg-black text-[#d6ff38] border-2 border-black shadow-[2px_2px_0px_#000000] -rotate-1">
            🏛️ ACCOUNT & GOVERNANCE
          </span>
          <span className="px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            ✓ VERIFIED ENTERPRISE INSTITUTION
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
          Organization Settings
        </h1>
        <p className="text-xs font-bold text-black/70 mt-1">
          Manage university compliance verification, WebRTC carrier gateways, caller ID routing, and staff admissions access privileges.
        </p>
      </div>

      {/* Verification Badge Showcase */}
      <div className="p-6 rounded-2xl bg-[#d6ff38] border-3 border-black shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-black text-[#d6ff38] border-2 border-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_#000000]">
            <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-black">
                {currentOrg.name}
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black text-[#d6ff38] border border-black shadow-[1px_1px_0px_#000000]">
                <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                VERIFIED
              </span>
            </div>
            <p className="text-xs font-bold text-black/80 mt-1">
              Verified for automated higher education & institutional voice outbound calling with full telecom carrier compliance.
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-black text-xs font-mono font-black text-white border-2 border-black shadow-[2px_2px_0px_#000000] self-start sm:self-auto">
          Org ID: {currentOrg.id}
        </span>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-[#00f0ff] border-3 border-black text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_#000000] animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
          Organization settings and calling routing preferences saved successfully!
        </div>
      )}

      {/* General Settings Form */}
      <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] space-y-4 text-xs">
        <h3 className="text-base font-black text-black uppercase tracking-wide pb-2 border-b-2 border-black">
          Institutional Governance & Account Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Organization / University Name
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black font-bold text-black shadow-[3px_3px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Institution Type
            </label>
            <input
              type="text"
              disabled
              value={currentOrg.type}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border-2 border-black font-bold text-black/60 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Admissions Director / Lead Administrator
            </label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black font-bold text-black shadow-[3px_3px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Telephony Voice Capacity Tier
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled
                value={currentOrg.plan}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border-2 border-black text-black font-black uppercase text-xs"
              />
              <button className="px-4 py-2.5 rounded-xl bg-[#00f0ff] hover:bg-[#38bdf8] text-black border-2 border-black font-black uppercase text-xs shrink-0 cursor-pointer shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] transition-all">
                Upgrade
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-black flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-[#d6ff38] hover:bg-[#bbf01b] text-black font-black uppercase text-xs tracking-wider border-3 border-black shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 stroke-[3]" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
