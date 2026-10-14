"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Building2,
  ShieldCheck,
  CreditCard,
  Key,
  Globe,
  Bell,
  Save,
  CheckCircle2,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { soundSynth } from "@/lib/audio-synth";

export default function SettingsPage() {
  const [collegeName, setCollegeName] = useState("clinic");
  const [domain, setDomain] = useState("taninkigovinda@gmail.com");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST • UTC+05:30)");
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try { soundSynth.play("confirm"); } catch {}
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
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
              ORGANIZATION PROFILE
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white bg-[#121215] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              SYSTEM ACTIVE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Organization Settings
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Manage workspace profile, operational timezones, security preferences, third-party integrations, and quotas.
          </p>
        </div>

        {/* Save Changes */}
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-sm"
        >
          <Save className="w-3.5 h-3.5 text-black" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedNotice && (
        <div className="bg-[#121215] border border-white/40 p-3.5 rounded-[2px] flex items-center gap-3 text-xs font-mono text-white shadow-lg animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>Configuration saved successfully across all voice channels and agents.</span>
        </div>
      )}

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Workspace Profile"
          icon={Building2}
          description="Verified organization identity, tenant details, and administrative contact."
          metric="clinic"
          metricLabel="Admin: taninkigovinda@gmail.com"
          status="Verified"
          statusType="ready"
          actionLabel="Edit profile →"
        />

        <WorkspaceCard
          name="Calling Allowance"
          icon={CreditCard}
          description="Monthly talk-time consumption across inbound and outbound channels."
          metric="0 / 14 min"
          metricLabel="Free tier sandbox • 14 min available"
          status="Free Tier"
          statusType="running"
          actionLabel="Upgrade tier →"
        />

        <WorkspaceCard
          name="DPDP & Compliance"
          icon={ShieldCheck}
          description="Data protection protocols, call recording retention, and PII masking."
          metric="DPDP Grounded"
          metricLabel="90-day automatic transcript retention"
          status="Strict Mode"
          statusType="ready"
          actionLabel="Audit policy →"
        />

        <WorkspaceCard
          name="API & Webhooks"
          icon={Key}
          description="Telephony webhooks, CRM webhooks, and backend integration endpoints."
          metric="0 endpoints"
          metricLabel="Ready for backend webhook hookup"
          status="Standby"
          statusType="live"
          actionLabel="Manage keys →"
        />
      </div>

      {/* ======================================================================= */}
      {/* SETTINGS FORM                                                           */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
        {/* Top Folder Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#121215] border-b border-[#27272A]">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            General Configuration Parameters
          </span>
          <span className="text-[11px] text-[#A1A1AA] font-mono">
            TENANT ID: clinic-workspace-01
          </span>
        </div>

        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-5 font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold block">
                Organization Name
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#121215] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold block">
                Contact Email / Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#121215] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold block">
                Operational Timezone
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#121215] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold block">
                Primary Regional Operating Language
              </label>
              <select className="w-full text-xs p-2.5 bg-[#121215] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all">
                <option value="en-hi">English + Hindi (Default Pan-India)</option>
                <option value="en-te">English + Telugu (Telangana & AP)</option>
                <option value="en-ta">English + Tamil (Tamil Nadu)</option>
                <option value="en-kn">English + Kannada (Karnataka)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-[#71717A]">
              Changes apply instantly across all active AI agents and telephony trunks.
            </span>
            <button
              type="submit"
              className="px-4 py-2 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-all cursor-pointer shadow-xs"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
