"use client";

import React, { useState } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Bot,
  Volume2,
  Globe,
  Database,
  PhoneCall,
  Sliders,
  Clock,
  FileSpreadsheet,
  Check,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { CampaignDefaultPreferences } from "@/types/settings";
import { mockAgents, mockKnowledgeBase } from "@/data/mock/dashboardData";

interface CampaignDefaultsTabProps {
  initialDefaults?: CampaignDefaultPreferences;
  onSave: (updated: CampaignDefaultPreferences) => Promise<boolean>;
}

const VOICE_OPTIONS = [
  { id: "Bulbul Indic (Female)", label: "Bulbul Indic (Female - Warm, Professional)" },
  { id: "Aarav Indic (Male)", label: "Aarav Indic (Male - Confident, Conversational)" },
  { id: "Priya Indic (Female)", label: "Priya Indic (Female - Crisp, Formal)" },
  { id: "Rohan Indic (Male)", label: "Rohan Indic (Male - Friendly, Reassuring)" },
  { id: "Swaram Neural Bilingual", label: "Swaram Neural Bilingual (Adaptive Accent)" },
];

const LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Telugu",
  "Tamil",
  "Kannada",
  "Marathi",
  "Bengali",
  "Gujarati",
];

const CALLING_MODES = [
  {
    id: "autonomous",
    title: "Autonomous Conversational Agent",
    desc: "AI agent leads natural two-way conversation with real-time semantic grounding.",
  },
  {
    id: "conversational_survey",
    title: "Structured Survey & CSAT",
    desc: "Sequential question protocol gathering structured feedback with audio transcription.",
  },
  {
    id: "alert_broadcast",
    title: "Urgent Notification / Broadcast",
    desc: "Concise advisory delivery with receipt confirmation and optional live-agent transfer.",
  },
  {
    id: "interactive_ivr",
    title: "Interactive Smart IVR",
    desc: "Blended keypad DTMF menu alongside voice speech recognition.",
  },
];

export default function CampaignDefaultsTab({
  initialDefaults,
  onSave,
}: CampaignDefaultsTabProps) {
  const [defaults, setDefaults] = useState<CampaignDefaultPreferences>(
    initialDefaults || {
      preferredAgentId: mockAgents[0]?.id || "agent-default",
      preferredAgentName: mockAgents[0]?.name || "Primary Voice Agent",
      defaultVoice: "Bulbul Indic (Female)",
      defaultLanguage: "English",
      defaultKnowledgeBaseId: "all",
      defaultKnowledgeBaseName: "Complete Enterprise Knowledge Library",
      defaultCallingMode: "autonomous",
      defaultConcurrencyLimit: 15,
      preferredCallingHoursStart: "10:00",
      preferredCallingHoursEnd: "18:30",
      defaultReportingOptions: {
        sendEmailSummary: true,
        sendWhatsappReport: true,
        includeCallRecordings: true,
        detailedTranscriptAnalysis: true,
      },
      safetyDisclaimerAcknowledged: true,
    }
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAgentChange = (agentId: string) => {
    const found = mockAgents.find((a) => a.id === agentId);
    setDefaults({
      ...defaults,
      preferredAgentId: agentId,
      preferredAgentName: found?.name || "Voice Agent",
      defaultLanguage: found?.language || defaults.defaultLanguage,
    });
  };

  const handleKnowledgeBaseChange = (kbId: string) => {
    if (kbId === "all") {
      setDefaults({
        ...defaults,
        defaultKnowledgeBaseId: "all",
        defaultKnowledgeBaseName: "Complete Enterprise Knowledge Library",
      });
    } else {
      const found = mockKnowledgeBase.find((k) => k.id === kbId);
      setDefaults({
        ...defaults,
        defaultKnowledgeBaseId: kbId,
        defaultKnowledgeBaseName: found?.title || "Knowledge Document",
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (defaults.defaultConcurrencyLimit < 1 || defaults.defaultConcurrencyLimit > 100) {
      setErrorMessage("Default concurrency must be between 1 and 100 channels.");
      return;
    }

    setIsSaving(true);
    const success = await onSave(defaults);
    setIsSaving(false);

    if (success) {
      setSaveSuccess(true);
      // Also cache in local storage for instantaneous campaign scheduler prepopulation
      try {
        localStorage.setItem("swaram_campaign_defaults", JSON.stringify(defaults));
      } catch {}
      setTimeout(() => setSaveSuccess(false), 3500);
    } else {
      setErrorMessage("Unable to save campaign defaults. Please retry.");
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Communication & Campaign Defaults"
        badge="Reusable Templates"
        whatIsThis="Pre-configured defaults automatically loaded when scheduling new outbound campaigns."
        whyDoINeedIt="Saves operations time by avoiding repetitive agent, voice, concurrency, and hours selection."
        whatToDoNext="Adjust your standard agent, concurrent channel quota, calling hours, and reporting checklist."
      >
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "Saving..." : "Save Campaign Defaults"}</span>
        </button>
      </SectionHeader>

      {/* MANDATORY REGULATORY & SAFETY DISCLAIMER BANNER */}
      <div className="p-4 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-start gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-[#283A50] text-white flex items-center justify-center shrink-0">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <p className="font-bold text-[#283A50]">
            Consent &amp; Calling Regulations Notice
          </p>
          <p className="text-[#707684] leading-relaxed">
            Swaram applies these saved defaults as time-saving starting suggestions when you launch campaigns.
            Campaign defaults <strong>never silently bypass</strong> recipient consent, national DND/TRAI calling registries,
            operating hour restrictions, or required campaign authorization sign-offs. You can edit any parameter prior to dispatch.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-[#C1F2D5]/30 border border-[#16856B]/30 flex items-center gap-3 text-xs text-[#065F46] animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
          <div>
            <p className="font-semibold">Campaign Defaults Updated</p>
            <p className="text-[11px] text-[#065F46]/80">
              New campaigns scheduled from Campaign Studio or the Outbound Scheduler will now pre-populate with these values.
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-xs text-red-700 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: VOICE & AI AGENT DEFAULTS */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#E9E1D4]/70">
            <h3 className="text-sm sm:text-base font-bold text-[#283A50] flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span>Preferred AI Agent &amp; Acoustic Model</span>
            </h3>
            <p className="text-xs text-[#707684] mt-0.5">
              Select which trained agent will be auto-selected for new campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Preferred AI Agent
              </label>
              <select
                value={defaults.preferredAgentId}
                onChange={(e) => handleAgentChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              >
                {mockAgents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} ({agent.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Default Voice Persona
              </label>
              <select
                value={defaults.defaultVoice}
                onChange={(e) => setDefaults({ ...defaults, defaultVoice: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              >
                {VOICE_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Default Interaction Language
              </label>
              <select
                value={defaults.defaultLanguage}
                onChange={(e) => setDefaults({ ...defaults, defaultLanguage: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              >
                {LANGUAGE_OPTIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: CALLING MODE & KNOWLEDGE GROUNDING */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#E9E1D4]/70">
            <h3 className="text-sm sm:text-base font-bold text-[#283A50] flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Default Calling Mode &amp; Knowledge Library</span>
            </h3>
            <p className="text-xs text-[#707684] mt-0.5">
              Define the execution pattern and default reference materials used during live calls.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#283A50] mb-2">
              Default Calling Mode
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CALLING_MODES.map((mode) => {
                const isSelected = defaults.defaultCallingMode === mode.id;
                return (
                  <div
                    key={mode.id}
                    onClick={() =>
                      setDefaults({
                        ...defaults,
                        defaultCallingMode: mode.id as any,
                      })
                    }
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#FAF5E9] border-[#283A50] ring-1 ring-[#283A50]/20"
                        : "bg-white hover:bg-[#FAF5E9]/40 border-[#E9E1D4]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#283A50]">
                        {mode.title}
                      </span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#283A50] text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#707684] leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
              Default Knowledge Base
            </label>
            <select
              value={defaults.defaultKnowledgeBaseId || "all"}
              onChange={(e) => handleKnowledgeBaseChange(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
            >
              <option value="all">All Workspace Knowledge Documents (Complete Library)</option>
              {mockKnowledgeBase.map((kb) => (
                <option key={kb.id} value={kb.id}>
                  {kb.title} ({kb.category} • {kb.vectorChunks} vectors)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SECTION 3: CONCURRENCY & CALLING HOURS */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#E9E1D4]/70">
            <h3 className="text-sm sm:text-base font-bold text-[#283A50] flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Throughput &amp; Permitted Calling Window</span>
            </h3>
            <p className="text-xs text-[#707684] mt-0.5">
              Control telephony channel load and strictly align calling hours with compliance mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Default Concurrent Calls (Channels)
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={defaults.defaultConcurrencyLimit}
                onChange={(e) =>
                  setDefaults({
                    ...defaults,
                    defaultConcurrencyLimit: parseInt(e.target.value) || 10,
                  })
                }
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              />
              <p className="text-[10px] text-[#707684] mt-1">
                Subject to carrier PRI trunk capacity (Licensed limit: 50 channels).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Calling Window Start (IST)
              </label>
              <input
                type="time"
                value={defaults.preferredCallingHoursStart}
                onChange={(e) =>
                  setDefaults({
                    ...defaults,
                    preferredCallingHoursStart: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Calling Window End (IST)
              </label>
              <input
                type="time"
                value={defaults.preferredCallingHoursEnd}
                onChange={(e) =>
                  setDefaults({
                    ...defaults,
                    preferredCallingHoursEnd: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: DEFAULT REPORTING OPTIONS */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#E9E1D4]/70">
            <h3 className="text-sm sm:text-base font-bold text-[#283A50] flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Default Campaign Reporting Options</span>
            </h3>
            <p className="text-xs text-[#707684] mt-0.5">
              Choose which automated summaries are pre-checked upon campaign conclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E9E1D4] bg-white hover:bg-[#FAF5E9]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={defaults.defaultReportingOptions.sendEmailSummary}
                onChange={(e) =>
                  setDefaults({
                    ...defaults,
                    defaultReportingOptions: {
                      ...defaults.defaultReportingOptions,
                      sendEmailSummary: e.target.checked,
                    },
                  })
                }
                className="rounded text-[#283A50] focus:ring-[#283A50]"
              />
              <span className="text-xs font-semibold text-[#283A50]">
                Email Campaign Executive Summary (CSV + PDF)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E9E1D4] bg-white hover:bg-[#FAF5E9]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={defaults.defaultReportingOptions.sendWhatsappReport}
                onChange={(e) =>
                  setDefaults({
                    ...defaults,
                    defaultReportingOptions: {
                      ...defaults.defaultReportingOptions,
                      sendWhatsappReport: e.target.checked,
                    },
                  })
                }
                className="rounded text-[#283A50] focus:ring-[#283A50]"
              />
              <span className="text-xs font-semibold text-[#283A50]">
                WhatsApp Operations Team Notification
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E9E1D4] bg-white hover:bg-[#FAF5E9]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={defaults.defaultReportingOptions.includeCallRecordings}
                onChange={(e) =>
                  setDefaults({
                    ...defaults,
                    defaultReportingOptions: {
                      ...defaults.defaultReportingOptions,
                      includeCallRecordings: e.target.checked,
                    },
                  })
                }
                className="rounded text-[#283A50] focus:ring-[#283A50]"
              />
              <span className="text-xs font-semibold text-[#283A50]">
                Dual-channel Call Audio Recordings Archive
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E9E1D4] bg-white hover:bg-[#FAF5E9]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={defaults.defaultReportingOptions.detailedTranscriptAnalysis}
                onChange={(e) =>
                  setDefaults({
                    ...defaults,
                    defaultReportingOptions: {
                      ...defaults.defaultReportingOptions,
                      detailedTranscriptAnalysis: e.target.checked,
                    },
                  })
                }
                className="rounded text-[#283A50] focus:ring-[#283A50]"
              />
              <span className="text-xs font-semibold text-[#283A50]">
                Sentiment Analysis &amp; Intent Entity Extraction
              </span>
            </label>
          </div>
        </div>

        {/* BOTTOM SAVE BAR */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E9E1D4] shadow-xs">
          <p className="text-xs text-[#707684]">
            These defaults can always be modified during individual campaign scheduling.
          </p>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Defaults"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

