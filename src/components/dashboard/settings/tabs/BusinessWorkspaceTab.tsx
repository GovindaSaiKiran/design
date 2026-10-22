import React, { useState } from "react";
import {
  Building2,
  Globe,
  Clock,
  PhoneForwarded,
  ShieldAlert,
  Save,
  CheckCircle2,
  Upload,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { WorkspaceProfile } from "@/types/settings";

interface BusinessWorkspaceTabProps {
  initialWorkspace: WorkspaceProfile;
  onSave: (updated: WorkspaceProfile) => Promise<boolean>;
}

const INDIAN_TIMEZONES = [
  "Asia/Kolkata (IST • UTC+05:30)",
  "Asia/Dubai (GST • UTC+04:00)",
  "Asia/Singapore (SGT • UTC+08:00)",
  "Europe/London (GMT/BST • UTC+00:00)",
  "America/New_York (EST • UTC-05:00)",
];

const LANGUAGE_PRESETS = [
  "English + Hindi (Pan-India Bilingual)",
  "English + Telugu (Andhra Pradesh & Telangana)",
  "English + Tamil (Tamil Nadu)",
  "English + Kannada (Karnataka)",
  "English + Marathi (Maharashtra)",
  "English Standard (Corporate)",
];

const INDUSTRIES = [
  "Higher Education & University Admissions",
  "K-12 School Systems & Coaching",
  "EdTech & Upskilling Platforms",
  "Healthcare & Clinic Appointments",
  "Financial Services & Banking",
  "Real Estate & Property Inquiries",
  "Automotive Dealerships & Test Drives",
];

export default function BusinessWorkspaceTab({
  initialWorkspace,
  onSave,
}: BusinessWorkspaceTabProps) {
  const [workspace, setWorkspace] = useState<WorkspaceProfile>(initialWorkspace);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showScheduleWarning, setShowScheduleWarning] = useState(false);

  const handleTimezoneChange = (newTz: string) => {
    if (newTz !== workspace.timezone) {
      setShowScheduleWarning(true);
    }
    setWorkspace({ ...workspace, timezone: newTz });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await onSave(workspace);
    setIsSaving(false);

    if (success) {
      setSaveSuccess(true);
      setShowScheduleWarning(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Business & Workspace"
        badge="Workspace Defaults"
        whatIsThis="Your institutional identity, legal timezone, and permissible calling hours."
        whyDoINeedIt="AI agents use your business name and hours to introduce themselves and ensure outbound calls comply with Indian TRAI regulations (no calls outside 09:00 AM – 07:00 PM)."
        whatToDoNext="Set your permitted calling window and regional language defaults so your voice campaigns run smoothly."
      >
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "Saving..." : "Save Workspace"}</span>
        </button>
      </SectionHeader>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Workspace configuration saved and synchronized across all voice dispatchers.</span>
        </div>
      )}

      {showScheduleWarning && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block">Notice Regarding Active Schedules:</strong>
            Changing your workspace timezone will not silently alter existing queued calls. Existing campaign time slots remain locked to their scheduled local timestamps.
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E9E1D4] p-6 shadow-2xs space-y-6">
        {/* Business Identity */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#707684] mb-3">
            Business Identity
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Company / Institution Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={workspace.businessName}
                  onChange={(e) => setWorkspace({ ...workspace, businessName: e.target.value })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
                  placeholder="Apex Global Institutions"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Official Website
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={workspace.website}
                  onChange={(e) => setWorkspace({ ...workspace, website: e.target.value })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
                  placeholder="https://apex.edu.in"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Primary Industry
              </label>
              <select
                value={workspace.industry}
                onChange={(e) => setWorkspace({ ...workspace, industry: e.target.value })}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Default Regional Dialect &amp; Language
              </label>
              <select
                value={workspace.defaultLanguage}
                onChange={(e) => setWorkspace({ ...workspace, defaultLanguage: e.target.value })}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              >
                {LANGUAGE_PRESETS.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#E9E1D4]/70" />

        {/* Operating & Telephony Calling Windows */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#707684]">
              Operational Timezone &amp; Permitted Calling Hours
            </h4>
            <span className="text-[11px] font-semibold text-[#2E8066] bg-[#B8DEC8]/50 px-2.5 py-0.5 rounded-full">
              TRAI &amp; DoT Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-1">
              <label className="text-xs font-semibold text-[#283A50] block">
                Workspace Time Zone
              </label>
              <select
                value={workspace.timezone}
                onChange={(e) => handleTimezoneChange(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              >
                {INDIAN_TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Permitted Outbound Start Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="time"
                  value={workspace.callingHoursStart}
                  onChange={(e) => setWorkspace({ ...workspace, callingHoursStart: e.target.value })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Permitted Outbound End Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="time"
                  value={workspace.callingHoursEnd}
                  onChange={(e) => setWorkspace({ ...workspace, callingHoursEnd: e.target.value })}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] text-xs text-[#707684] flex items-center gap-2">
            <PhoneForwarded className="w-4 h-4 text-[#283A50] shrink-0" />
            <span>
              Calls scheduled outside of <strong>{workspace.callingHoursStart} – {workspace.callingHoursEnd} ({workspace.timezone})</strong> will automatically be held in the Callback Queue until the next approved calling window opens.
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
