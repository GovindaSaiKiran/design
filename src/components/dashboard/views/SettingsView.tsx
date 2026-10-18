"use client";

import React, { useState } from "react";
import { OrganizationInfo } from "@/types/dashboard";
import {
  ShieldCheck,
  CheckCircle2,
  Save,
  Sparkles,
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
    <div className="space-y-6 pb-12 max-w-4xl select-none animate-in fade-in duration-300 font-sans text-[#1A1A1A]">
      {/* 1. Header Card */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-xs font-semibold text-[#5B21B6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Institutional Governance & Engine Configuration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Organization & Speech Engine Settings
            </h1>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-sans">
              Manage university compliance, default Indic voice models (Bulbul V3), STIR/SHAKEN Level-A telephony routing, and admissions counselor permissions.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#C1F2D5] text-[#16856B] self-start lg:self-center inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B]" />
            Verified Enterprise Tier
          </span>
        </div>
      </div>

      {/* 2. Verification Badge Showcase */}
      <div className="p-6 sm:p-8 rounded-[26px] bg-white border border-black/[0.06] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#C1F2D5] text-[#16856B] flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight">
                {currentOrg.name}
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#C1F2D5] text-[#16856B]">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED UGC ENTITY
              </span>
            </div>
            <p className="text-xs text-black/60 max-w-lg leading-relaxed font-sans">
              Fully authorized for high-volume automated collegiate calling with STIR/SHAKEN Level-A full caller ID attestation across Indian telecom circles.
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-[#FAF3E4] text-xs font-mono font-semibold text-black/60 border border-black/[0.06] self-start sm:self-auto shrink-0 relative z-10">
          Org ID: {currentOrg.id}
        </span>
      </div>

      {saved && (
        <div className="p-4 rounded-[20px] bg-[#C1F2D5] border border-[#16856B]/20 text-[#16856B] text-xs font-semibold flex items-center gap-2 shadow-2xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
          <span>Organization settings and speech engine preferences saved successfully.</span>
        </div>
      )}

      {/* 3. General Settings Form */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs space-y-6 text-xs">
        <h3 className="text-lg font-bold text-[#1A1A1A] pb-3 border-b border-black/[0.06]">
          Institutional Governance & Speech Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-black/70 mb-2 text-xs">
              Organization / University Name
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E4]/60 border border-black/[0.06] focus:border-black/20 focus:bg-white text-xs text-[#1A1A1A] focus:outline-none transition-all shadow-2xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-black/70 mb-2 text-xs">
              Institution Type
            </label>
            <input
              type="text"
              disabled
              value={currentOrg.type}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E4]/30 border border-black/[0.04] text-xs text-black/40 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-black/70 mb-2 text-xs">
              Default Indic Neural Voice Engine
            </label>
            <select
              value={defaultModel}
              onChange={(e) => setDefaultModel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E4]/60 border border-black/[0.06] focus:border-black/20 focus:bg-white text-xs text-[#1A1A1A] focus:outline-none transition-all font-mono"
            >
              <option value="Bulbul V3 (Indic Neural HD)">Bulbul V3 (Indic Neural HD • ~140ms TTFB)</option>
              <option value="Bulbul V2.5 (Fast Flash)">Bulbul V2.5 (Fast Flash • ~110ms TTFB)</option>
              <option value="Bulbul Custom Fine-Tuned">Bulbul Custom Institutional Fine-Tuned</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-black/70 mb-2 text-xs">
              Primary Regional Language Locale
            </label>
            <select
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E4]/60 border border-black/[0.06] focus:border-black/20 focus:bg-white text-xs text-[#1A1A1A] focus:outline-none transition-all"
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
            <label className="block font-semibold text-black/70 mb-2 text-xs">
              Admissions Director / Lead Administrator
            </label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E4]/60 border border-black/[0.06] focus:border-black/20 focus:bg-white text-xs text-[#1A1A1A] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-black/70 mb-2 text-xs">
              Telephony Voice Capacity Tier
            </label>
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                disabled
                value={currentOrg.plan}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF3E4]/30 border border-black/[0.04] text-black/60 font-semibold text-xs"
              />
              <button className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-black text-white font-semibold text-xs shrink-0 cursor-pointer shadow-2xs transition-all active:scale-95">
                Upgrade
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-black/[0.06] flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white font-semibold text-xs shadow-2xs inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
