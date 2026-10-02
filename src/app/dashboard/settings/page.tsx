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

export default function SettingsPage() {
  const [collegeName, setCollegeName] = useState("Apex Engineering College");
  const [domain, setDomain] = useState("apex.edu.in");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST • UTC+05:30)");
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
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
              ORGANIZATION
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-950 bg-[#cdfb56]/30 px-2.5 py-0.5 rounded-full border border-[#cdfb56]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926]" />
              Institutional Scale
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Organization Settings
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage college profile, operational timezones, security preferences, third-party integrations, and quotas.
          </p>
        </div>

        {/* Save Changes */}
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <Save className="w-3.5 h-3.5 text-slate-950" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedNotice && (
        <div className="bg-[#f7fee7] border border-[#cdfb56] p-3 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-900 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-[#8ac926]" />
          <span>Configuration saved successfully across all voice channels and agents.</span>
        </div>
      )}

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Collegiate Profile"
          icon={Building2}
          description="Verified university identity, domain records, and campus contact details."
          metric="Apex College"
          metricLabel="NAAC A++ Accredited • Autonomous"
          status="Verified"
          statusType="ready"
          actionLabel="Edit profile →"
        />

        <WorkspaceCard
          name="Calling Allowance"
          icon={CreditCard}
          description="Monthly talk-time consumption across admissions and support desks."
          metric="6,800 / 10,000 min"
          metricLabel="68% utilized • Renews on 1st of month"
          status="Active Tier"
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
          description="Institutional ERP endpoints, Salesforce webhook, and CRM sync."
          metric="3 endpoints"
          metricLabel="Last heartbeat 100% successful"
          status="Connected"
          statusType="live"
          actionLabel="Manage keys →"
        />
      </div>

      {/* ======================================================================= */}
      {/* SETTINGS FORM                                                           */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Top Folder Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            General Configuration Parameters
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Tenant ID: apex-eng-hyderabad-01
          </span>
        </div>

        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Institution Name
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#cdfb56]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Official Campus Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#cdfb56]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Operational Timezone
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#cdfb56]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Primary Regional Operating Language
              </label>
              <select className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#cdfb56]">
                <option>English + Hindi (Default Pan-India)</option>
                <option>English + Telugu (Telangana & AP)</option>
                <option>English + Tamil (Tamil Nadu)</option>
                <option>English + Kannada (Karnataka)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Changes apply instantly across all active AI agents and telephony trunks.
            </span>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 border border-[#bceb42] shadow-2xs cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
