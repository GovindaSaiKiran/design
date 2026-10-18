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
  const [orgName, setOrgName] = useState("Apex Global Institutions");
  const [domain, setDomain] = useState("admissions.director@apex.edu.in");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST • UTC+05:30)");
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A]">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/50 hover:text-[#1A1A1A] transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] bg-[#FFD9A0] px-3 py-0.5 rounded-full">
              Organization Settings
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Organization &amp; Workspace Settings
          </h1>

          <p className="text-sm text-black/60 mt-1 max-w-2xl leading-relaxed">
            Manage organization identity, operational timezones, security preferences, third-party telephony webhooks, and DPDP compliance.
          </p>
        </div>

        {/* Save Changes */}
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
        >
          <Save className="w-3.5 h-3.5 text-white" />
          <span>Save Configuration</span>
        </button>
      </div>

      {savedNotice && (
        <div className="bg-[#C1F2D5]/50 border border-[#16856B]/20 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-[#16856B] shadow-2xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
          <span>Configuration saved successfully across all voice channels and agents.</span>
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Workspace Profile"
          icon={Building2}
          description="Verified organization identity and administrative billing contact."
          metric="Apex Global"
          metricLabel="Admin: admissions.director@apex.edu.in"
          status="Verified"
          statusType="ready"
          actionLabel="Edit profile →"
        />

        <WorkspaceCard
          name="Calling Allowance"
          icon={CreditCard}
          description="Talk-time consumption across inbound and outbound channels."
          metric="2.2 / 14.0 min"
          metricLabel="Free tier sandbox • 11.8 min remaining"
          status="Active Plan"
          statusType="ready"
          actionLabel="View billing →"
          href="/dashboard/billing"
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
          href="/dashboard/data-vault"
        />

        <WorkspaceCard
          name="API & Webhooks"
          icon={Key}
          description="Telephony webhooks, CRM sync, and custom webhook endpoints."
          metric="2 active hooks"
          metricLabel="HubSpot CRM • Meta Cloud API"
          status="Online"
          statusType="ready"
          actionLabel="Manage keys →"
        />
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] overflow-hidden shadow-2xs">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06]">
          <span className="text-xs font-bold text-[#1A1A1A]">
            General Configuration Parameters
          </span>
          <span className="text-xs text-black/50">
            Tenant ID: org-apex-01
          </span>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1A1A1A] block">
                Organization Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full text-xs px-4 py-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1A1A1A] block">
                Contact Email Address
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full text-xs px-4 py-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1A1A1A] block">
                Operational Timezone
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full text-xs px-4 py-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1A1A1A] block">
                Primary Regional Operating Language
              </label>
              <select className="w-full text-xs px-4 py-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all cursor-pointer font-medium">
                <option value="en-hi">English + Hindi (Default Pan-India Auto Code-switch)</option>
                <option value="en-te">English + Telugu (Andhra Pradesh &amp; Telangana)</option>
                <option value="en-ta">English + Tamil (Tamil Nadu)</option>
                <option value="en-kn">English + Kannada (Karnataka)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-black/50">
              Changes apply instantly across all active AI agents and telephony trunks.
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#111111] hover:bg-black text-white transition-all cursor-pointer shadow-sm"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
