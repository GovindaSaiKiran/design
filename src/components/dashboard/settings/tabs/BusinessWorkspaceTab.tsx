"use client";

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
  Camera,
  Trash2,
  Users,
  MapPin,
  Layers,
  Check,
  Plus,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { WorkspaceProfile, WorkspaceItem } from "@/types/settings";

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

const ORGANIZATION_TYPES = [
  "Hospital & Healthcare Services",
  "Higher Education & Institutes",
  "E-commerce & Retail",
  "Financial Services & Banking",
  "SaaS & Enterprise Technology",
  "Real Estate & Construction",
  "Government & Public Service",
  "Logistics & Field Support",
  "Other Organization",
];

const TEAM_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

const LANGUAGE_PRESETS = [
  "English + Hindi (Pan-India Bilingual)",
  "English + Telugu (Andhra Pradesh & Telangana)",
  "English + Tamil (Tamil Nadu)",
  "English + Kannada (Karnataka)",
  "English + Marathi (Maharashtra)",
  "English Standard (Corporate)",
];

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function BusinessWorkspaceTab({
  initialWorkspace,
  onSave,
}: BusinessWorkspaceTabProps) {
  const [workspace, setWorkspace] = useState<WorkspaceProfile>({
    organizationName: initialWorkspace.businessName,
    organizationType: "Hospital & Healthcare Services",
    businessAddress: "Suite 400, HITEC City Main Rd, Hyderabad, TG 500081",
    teamSize: "51-200 employees",
    businessDescription: "AI voice agent call center operations providing autonomous caller interaction, follow-ups, and notifications.",
    workspaces: [
      { id: "ws-primary", name: initialWorkspace.businessName || "Primary Enterprise Workspace", role: "Owner", isCurrent: true, industry: "Healthcare" },
      { id: "ws-branch", name: "Regional Outreach & Inbound Desk", role: "Admin", isCurrent: false, industry: "Outreach" },
    ],
    ...initialWorkspace,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showScheduleWarning, setShowScheduleWarning] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockUrl = URL.createObjectURL(file);
      setWorkspace((prev) => ({ ...prev, logoUrl: mockUrl }));
    }
  };

  const handleLogoRemove = () => {
    setWorkspace((prev) => ({ ...prev, logoUrl: "" }));
  };

  const toggleDay = (day: string) => {
    const exists = workspace.callingDays.includes(day);
    const updated = exists
      ? workspace.callingDays.filter((d) => d !== day)
      : [...workspace.callingDays, day];
    setWorkspace({ ...workspace, callingDays: updated });
  };

  const switchWorkspace = (wsId: string) => {
    const updated = (workspace.workspaces || []).map((w) => ({
      ...w,
      isCurrent: w.id === wsId,
    }));
    const current = updated.find((w) => w.isCurrent);
    setWorkspace({
      ...workspace,
      businessName: current?.name || workspace.businessName,
      organizationName: current?.name || workspace.organizationName,
      workspaces: updated,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await onSave({
      ...workspace,
      businessName: workspace.organizationName || workspace.businessName,
    });
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
        title="Organization Profile & Workspaces"
        badge="Workspace-Level Settings"
        whatIsThis="Your organization identity, business address, multi-workspace switcher, and operational hours."
        whyDoINeedIt="AI agents use your organization name in greetings, adhere to your permitted calling windows, and respect regional boundaries."
        whatToDoNext="Verify organization details, team size, logo, and permitted calling windows."
      >
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "Saving..." : "Save Organization"}</span>
        </button>
      </SectionHeader>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Organization profile updated and synced across all workspace dispatchers.</span>
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

      {/* MULTI-WORKSPACE SWITCHER BAR */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E9E1D4]/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#283A50]" />
            <h4 className="text-xs font-bold text-[#283A50]">Active Workspace</h4>
          </div>
          <span className="text-[11px] text-[#707684]">
            {workspace.workspaces?.length || 1} Workspaces Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(workspace.workspaces || []).map((ws) => (
            <div
              key={ws.id}
              onClick={() => switchWorkspace(ws.id)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                ws.isCurrent
                  ? "bg-[#FAF5E9] border-[#283A50] ring-1 ring-[#283A50]/20"
                  : "bg-white hover:bg-[#FAF5E9]/50 border-[#E9E1D4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    ws.isCurrent ? "bg-[#283A50] text-white" : "bg-[#FAF5E9] text-[#283A50]"
                  }`}
                >
                  {ws.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#283A50]">{ws.name}</p>
                  <p className="text-[10px] text-[#707684]">Role: {ws.role}</p>
                </div>
              </div>
              {ws.isCurrent && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#C1F2D5] text-[#065F46]">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E9E1D4] p-6 shadow-2xs space-y-6">
        {/* Organization Logo & Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-[#E9E1D4]/60">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF5E9] border-2 border-[#E9E1D4] flex items-center justify-center overflow-hidden text-[#283A50] font-bold text-xl shadow-xs">
              {workspace.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={workspace.logoUrl}
                  alt={workspace.businessName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-8 h-8 text-[#283A50]/60" />
              )}
            </div>
            <label
              htmlFor="org-logo-upload"
              className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-[#283A50] text-white hover:bg-[#1f2d3e] cursor-pointer shadow-xs transition-colors"
              title="Upload Organization Logo"
            >
              <Camera className="w-3 h-3" />
              <input
                id="org-logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#283A50]">Organization Logo</h4>
            <p className="text-xs text-[#707684] mt-0.5">
              PNG, SVG, or JPG. Displayed on public call summary webviews and customer WhatsApp templates.
            </p>
            {workspace.logoUrl && (
              <button
                type="button"
                onClick={handleLogoRemove}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 mt-2 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove logo</span>
              </button>
            )}
          </div>
        </div>

        {/* Organization Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Organization Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={workspace.organizationName || workspace.businessName}
                onChange={(e) =>
                  setWorkspace({
                    ...workspace,
                    organizationName: e.target.value,
                    businessName: e.target.value,
                  })
                }
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
                placeholder="Enterprise Voice Workspace"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Organization Type
            </label>
            <select
              value={workspace.organizationType || "Hospital & Healthcare Services"}
              onChange={(e) => setWorkspace({ ...workspace, organizationType: e.target.value })}
              className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
            >
              {ORGANIZATION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Website URL
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={workspace.website}
                onChange={(e) => setWorkspace({ ...workspace, website: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
                placeholder="https://company.ai"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Team Size
            </label>
            <select
              value={workspace.teamSize || "51-200 employees"}
              onChange={(e) => setWorkspace({ ...workspace, teamSize: e.target.value })}
              className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
            >
              {TEAM_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-[#283A50] block">
              Business Address &amp; Country
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#707684] absolute left-3 top-3" />
              <input
                type="text"
                value={workspace.businessAddress || ""}
                onChange={(e) => setWorkspace({ ...workspace, businessAddress: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
                placeholder="Suite 400, HITEC City Main Rd, Hyderabad, TG 500081, India"
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-[#283A50] block">
              Business Description / Mission
            </label>
            <textarea
              rows={2}
              value={workspace.businessDescription || ""}
              onChange={(e) => setWorkspace({ ...workspace, businessDescription: e.target.value })}
              className="w-full text-xs px-3.5 py-2 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium resize-none"
              placeholder="Brief description of your business and voice service scope."
            />
          </div>
        </div>

        {/* Operating Hours & Permitted Calling Windows (TRAI Compliance) */}
        <div className="pt-4 border-t border-[#E9E1D4]/60 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#707684]">
                Operating Hours &amp; Permitted Calling Windows
              </h4>
              <p className="text-[11px] text-[#707684] mt-0.5">
                Indian TRAI Telecommunication regulations mandate that outbound calls can only be placed between 09:00 AM and 07:00 PM.
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
              TRAI Mandate Enforced
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Workspace Timezone
              </label>
              <select
                value={workspace.timezone}
                onChange={(e) => {
                  if (e.target.value !== workspace.timezone) setShowScheduleWarning(true);
                  setWorkspace({ ...workspace, timezone: e.target.value });
                }}
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
                Default Regional Dialect
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

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Outbound Calls Start
              </label>
              <input
                type="time"
                value={workspace.callingHoursStart}
                onChange={(e) => setWorkspace({ ...workspace, callingHoursStart: e.target.value })}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Outbound Calls End
              </label>
              <input
                type="time"
                value={workspace.callingHoursEnd}
                onChange={(e) => setWorkspace({ ...workspace, callingHoursEnd: e.target.value })}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              />
            </div>
          </div>

          {/* Permitted Calling Days */}
          <div className="pt-2">
            <label className="text-xs font-semibold text-[#283A50] block mb-2">
              Permitted Outbound Calling Days
            </label>
            <div className="flex flex-wrap gap-2">
              {WEEK_DAYS.map((day) => {
                const isSelected = workspace.callingDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#283A50] text-white border-[#283A50]"
                        : "bg-white hover:bg-[#FAF5E9] text-[#283A50] border-[#E9E1D4]"
                    }`}
                  >
                    {day} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
