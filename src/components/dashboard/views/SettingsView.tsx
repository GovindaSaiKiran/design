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
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Neo-Brutalist Header */}
      <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38]">
            Account & Governance
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            ✓ Verified Enterprise Account
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
          Organization Settings
        </h1>
        <p className="text-xs font-bold text-black/70 mt-1">
          Manage institution verification, webhook endpoints, caller ID branding, and team admissions access.
        </p>
      </div>

      {/* Verification Badge Showcase */}
      <div className="p-6 rounded-2xl bg-[#fcffe0] border-3 border-black shadow-[6px_6px_0px_#000000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-black text-[#d6ff38] border-2 border-black flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#000000] shrink-0">
            <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-black uppercase">
                {currentOrg.name}
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                VERIFIED
              </span>
            </div>
            <p className="text-xs font-bold text-black/70 mt-1">
              Verified for automated higher education & institutional voice outbound calling with full telecom carrier compliance.
            </p>
          </div>
        </div>

        <span className="px-3.5 py-2 rounded-xl bg-white text-xs font-mono font-black text-black border-2 border-black shadow-[2px_2px_0px_#000000] self-start sm:self-auto">
          Org ID: {currentOrg.id}
        </span>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-[#d6ff38] border-2 border-black text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[3px_3px_0px_#000000] animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          Settings updated successfully!
        </div>
      )}

      {/* General Settings Form */}
      <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] space-y-4 text-xs font-bold">
        <h3 className="text-sm font-black text-black uppercase pb-2 border-b-2 border-black">
          General Institutional Information
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000000] font-bold text-black focus:outline-none focus:bg-[#fcffe0]"
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 border-2 border-black font-bold text-black/60 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Admissions Director / Account Lead
            </label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000000] font-bold text-black focus:outline-none focus:bg-[#fcffe0]"
            />
          </div>

          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Current Calling Plan Tier
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                disabled
                value={currentOrg.plan}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 border-2 border-black text-black font-black"
              />
              <button className="px-4 py-2.5 rounded-xl bg-[#d6ff38] text-black border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_#000000] hover:bg-black hover:text-[#d6ff38] shrink-0 cursor-pointer">
                Upgrade
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-black/10 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-black hover:bg-[#d6ff38] text-[#d6ff38] hover:text-black border-3 border-black font-black uppercase text-xs shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
