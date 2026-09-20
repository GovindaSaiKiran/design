"use client";

import React, { useState } from "react";
import { OrganizationInfo } from "@/types/dashboard";
import {
  ShieldCheck,
  Building2,
  User,
  Key,
  Bell,
  CheckCircle2,
  Save,
  CreditCard,
  ExternalLink,
  Sparkles,
  Cpu,
  Globe2,
} from "lucide-react";

interface SettingsViewProps {
  currentOrg: OrganizationInfo;
}

export default function SettingsView({ currentOrg }: SettingsViewProps) {
  const [orgName, setOrgName] = useState(currentOrg.name);
  const [manager, setManager] = useState(currentOrg.accountManager);
  const [defaultLanguage, setDefaultLanguage] = useState("Hindi + English Bilingual");
  const [defaultModel, setDefaultModel] = useState("Bulbul V3 (Indic Neural HD)");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-10 pb-12 max-w-4xl select-none animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. SARVAM EDITORIAL HERO & GOVERNANCE HEADER                              */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-xs font-semibold text-neutral-800">
              <span className="text-amber-600 font-serif">~ 𑁍 ~</span>
              <span>Institutional Governance & Engine Configuration</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight leading-tight">
              Organization & Speech Engine Settings
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Manage university compliance, default Indic voice models (Bulbul V3), STIR/SHAKEN Level-A telephony routing, and admissions counselor permissions.
            </p>
          </div>

          <span className="px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start lg:self-center inline-flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Verified Enterprise Tier
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. VERIFICATION BADGE SHOWCASE                                             */}
      {/* ========================================================================= */}
      <div className="p-8 rounded-3xl bg-neutral-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold text-white tracking-tight">
                {currentOrg.name}
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED UGC ENTITY
              </span>
            </div>
            <p className="text-xs text-neutral-300 max-w-lg leading-relaxed font-sans">
              Fully authorized for high-volume automated collegiate calling with STIR/SHAKEN Level-A full caller ID attestation across Indian telecom circles.
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-mono font-medium text-neutral-300 border border-white/10 self-start sm:self-auto shrink-0 relative z-10">
          Org ID: {currentOrg.id}
        </span>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50/80 backdrop-blur-md border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Organization settings and speech engine preferences saved successfully.</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. GENERAL SETTINGS FORM                                                  */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 sm:p-10 space-y-6 text-xs">
        <h3 className="font-serif-display text-xl font-normal text-neutral-900 pb-3 border-b border-black/10">
          Institutional Governance & Speech Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-neutral-700 mb-2 text-xs">
              Organization / University Name
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/80 backdrop-blur-md border border-black/10 focus:border-black/30 focus:bg-white text-xs text-neutral-900 focus:outline-none transition-all shadow-2xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-2 text-xs">
              Institution Type
            </label>
            <input
              type="text"
              disabled
              value={currentOrg.type}
              className="w-full px-4 py-3 rounded-xl bg-neutral-100 border border-black/5 text-xs text-neutral-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-neutral-700 mb-2 text-xs">
              Default Indic Neural Voice Engine
            </label>
            <select
              value={defaultModel}
              onChange={(e) => setDefaultModel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#fbfbfd] border border-black/10 focus:border-black/30 focus:bg-white text-xs text-neutral-900 focus:outline-none transition-all font-mono"
            >
              <option value="Bulbul V3 (Indic Neural HD)">Bulbul V3 (Indic Neural HD • ~140ms TTFB)</option>
              <option value="Bulbul V2.5 (Fast Flash)">Bulbul V2.5 (Fast Flash • ~110ms TTFB)</option>
              <option value="Bulbul Custom Fine-Tuned">Bulbul Custom Institutional Fine-Tuned</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-2 text-xs">
              Primary Regional Language Locale
            </label>
            <select
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#fbfbfd] border border-black/10 focus:border-black/30 focus:bg-white text-xs text-neutral-900 focus:outline-none transition-all"
            >
              <option value="Hindi + English Bilingual">Hindi + English Bilingual (Maya / Shubh)</option>
              <option value="Telugu + English Bilingual">Telugu + English Bilingual (Neha)</option>
              <option value="Kannada + English Bilingual">Kannada + English Bilingual (Ishita)</option>
              <option value="Bengali + English Bilingual">Bengali + English Bilingual (Suhani)</option>
              <option value="Tamil + English Bilingual">Tamil + English Bilingual (Ananya)</option>
              <option value="Marathi + English Bilingual">Marathi + English Bilingual (Arjun)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-neutral-700 mb-2 text-xs">
              Admissions Director / Lead Administrator
            </label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#fbfbfd] border border-black/10 focus:border-black/30 focus:bg-white text-xs text-neutral-900 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-2 text-xs">
              Telephony Voice Capacity Tier
            </label>
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                disabled
                value={currentOrg.plan}
                className="w-full px-4 py-3 rounded-xl bg-neutral-100 border border-black/5 text-neutral-700 font-semibold text-xs"
              />
              <button className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shrink-0 cursor-pointer shadow-xs transition-all active:scale-95">
                Upgrade
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-black/10 flex justify-end">
          <button
            onClick={handleSave}
            className="px-7 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
