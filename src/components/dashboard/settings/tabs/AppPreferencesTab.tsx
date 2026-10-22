import React, { useState } from "react";
import { SlidersHorizontal, Sun, Moon, Monitor, Calendar, Clock, Layout, CheckCircle2, Save } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { AppPreferences } from "@/types/settings";

interface AppPreferencesTabProps {
  initialPreferences: AppPreferences;
  onSavePreferences: (updated: AppPreferences) => Promise<boolean>;
}

export default function AppPreferencesTab({
  initialPreferences,
  onSavePreferences,
}: AppPreferencesTabProps) {
  const [prefs, setPrefs] = useState<AppPreferences>(initialPreferences);
  const [saveNotice, setSaveNotice] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await onSavePreferences(prefs);
    setIsSaving(false);

    if (success) {
      setSaveNotice(true);
      setTimeout(() => setSaveNotice(false), 3000);
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="App Preferences &amp; Personalization"
        badge="Display Settings"
        whatIsThis="Display themes, date formats, time conventions, and dashboard landing defaults."
        whyDoINeedIt="Allows you to tailor the Swaram interface to your institution's reporting standards and regional habits."
        whatToDoNext="Choose your preferred date format (e.g. DD/MM/YYYY for India) and default landing page."
      >
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "Saving..." : "Save Preferences"}</span>
        </button>
      </SectionHeader>

      {saveNotice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Preferences updated and saved.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E9E1D4] p-6 shadow-2xs space-y-6">
        {/* Appearance Mode */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#707684] block mb-3">
            Interface Theme
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, appearance: "light" })}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all text-xs font-semibold cursor-pointer ${
                prefs.appearance === "light"
                  ? "bg-[#FAF5E9] border-[#283A50] text-[#283A50] shadow-xs"
                  : "bg-white border-[#E9E1D4] text-[#707684] hover:bg-slate-50"
              }`}
            >
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Warm Ivory (Light)</span>
            </button>

            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, appearance: "dark" })}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all text-xs font-semibold cursor-pointer ${
                prefs.appearance === "dark"
                  ? "bg-[#283A50] border-[#283A50] text-white shadow-xs"
                  : "bg-white border-[#E9E1D4] text-[#707684] hover:bg-slate-50"
              }`}
            >
              <Moon className="w-4 h-4 text-purple-400" />
              <span>Deep Navy (Dark)</span>
            </button>

            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, appearance: "system" })}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all text-xs font-semibold cursor-pointer ${
                prefs.appearance === "system"
                  ? "bg-[#FAF5E9] border-[#283A50] text-[#283A50] shadow-xs"
                  : "bg-white border-[#E9E1D4] text-[#707684] hover:bg-slate-50"
              }`}
            >
              <Monitor className="w-4 h-4 text-slate-500" />
              <span>Follow System</span>
            </button>
          </div>
        </div>

        <div className="h-px bg-[#E9E1D4]/70" />

        {/* Date, Time & Regional Format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Date Display Format
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={prefs.dateFormat}
                onChange={(e) => setPrefs({ ...prefs, dateFormat: e.target.value as any })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] font-medium"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (Indian Standard • 22/10/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO Standard • 2026-10-22)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (US Standard • 10/22/2026)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Time Format
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={prefs.timeFormat}
                onChange={(e) => setPrefs({ ...prefs, timeFormat: e.target.value as any })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] font-medium"
              >
                <option value="12h">12-Hour Clock (e.g. 02:30 PM)</option>
                <option value="24h">24-Hour Clock (e.g. 14:30)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Default Landing Page
            </label>
            <div className="relative">
              <Layout className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={prefs.defaultDashboard}
                onChange={(e) => setPrefs({ ...prefs, defaultDashboard: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] font-medium"
              >
                <option value="Overview">Overview Dashboard (/dashboard)</option>
                <option value="Live Calling">Live Voice Streams (/dashboard/calls)</option>
                <option value="Outbound Scheduler">Outbound Scheduler (/dashboard/outbound-scheduler)</option>
                <option value="Scheduled Campaigns">Scheduled Campaigns (/dashboard/campaigns)</option>
                <option value="WhatsApp Workspace">WhatsApp Workspace (/dashboard/whatsapp)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Table Row Density
            </label>
            <div className="relative">
              <SlidersHorizontal className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={prefs.tableDensity}
                onChange={(e) => setPrefs({ ...prefs, tableDensity: e.target.value as any })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] font-medium"
              >
                <option value="comfortable">Comfortable (More whitespace &amp; readable badges)</option>
                <option value="compact">Compact (High data density for large lists)</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
