"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  Bot,
  Sparkles,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  Globe,
  Sliders,
  Play,
  Volume2,
  FileSpreadsheet,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  UserCheck,
  BookOpen,
  Database,
  ExternalLink,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { soundSynth } from "@/lib/audio-synth";
import { mockAgents, mockContacts, mockKnowledgeBase } from "@/data/mock/dashboardData";
import {
  normalizePhoneNumber,
  COMMON_TIMEZONES,
  getDefaultTimezone,
  convertLocalToUtc,
  formatUtcToLocal,
  isFutureTime,
} from "@/lib/utils/phoneAndDateUtils";
import { CreateSchedulePayload, CallConfigSnapshot, ScheduledCampaign } from "@/types/schedule";
import { schedulesApi } from "@/lib/api/schedulesApi";

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleCreated?: () => void;
  initialAgentId?: string;
  duplicateFrom?: Partial<CreateSchedulePayload> | Partial<ScheduledCampaign>;
}

interface RawContactItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  organization?: string;
}

export default function ScheduleCallModal({
  isOpen,
  onClose,
  onScheduleCreated,
  initialAgentId,
  duplicateFrom,
}: ScheduleCallModalProps) {
  // Step state: 1: Contacts, 2: Config, 3: Schedule, 4: Review
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // General Campaign info
  const [campaignName, setCampaignName] = useState(
    duplicateFrom?.name || "Autonomous Outreach & Merit Cadence"
  );

  // STEP A: Contacts State
  const [contactMode, setContactMode] = useState<"manual" | "csv" | "list">("manual");
  const [contactList, setContactList] = useState<RawContactItem[]>([
    {
      id: "init-1",
      name: "Rahul Sharma",
      phone: "+91 98401 22345",
      email: "rahul.sharma@gmail.com",
      organization: "B.Tech Computer Science",
    },
    {
      id: "init-2",
      name: "Ananya Iyer",
      phone: "+91 94401 88319",
      email: "ananya.iyer@outlook.com",
      organization: "B.Tech Biotechnology",
    },
  ]);

  // Manual entry inputs
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualOrg, setManualOrg] = useState("");
  const [manualError, setManualError] = useState("");

  // CSV drag & drop state
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [csvRawText, setCsvRawText] = useState("");

  // Contact list selection state
  const [selectedListContactIds, setSelectedListContactIds] = useState<string[]>(
    mockContacts.map((c) => c.id)
  );

  // STEP B: Call Configuration State
  const [selectedAgentId, setSelectedAgentId] = useState(
    initialAgentId || duplicateFrom?.config?.agentId || mockAgents[0].id
  );
  const currentAgent = useMemo(
    () => mockAgents.find((a) => a.id === selectedAgentId) || mockAgents[0],
    [selectedAgentId]
  );

  const [selectedLanguage, setSelectedLanguage] = useState(
    duplicateFrom?.config?.language || currentAgent.language
  );
  const [callObjective, setCallObjective] = useState(
    duplicateFrom?.config?.callObjective ||
      "Verify student entrance eligibility, answer tuition fee queries, and book campus tours."
  );
  const [instructions, setInstructions] = useState(
    duplicateFrom?.config?.instructions ||
      "Warmly greet candidate by name. Verify board marks. If score is >= 90%, mention 35% Chancellor scholarship. Offer WhatsApp fee breakdown."
  );
  const [openingScript, setOpeningScript] = useState(
    duplicateFrom?.config?.openingScript ||
      "Hello {name}, I am calling from Apex Global Institutions regarding your inquiry for {organization}."
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // STEP B.2: Knowledge Base & Grounding State
  const [selectedKnowledgeBaseId, setSelectedKnowledgeBaseId] = useState<string>(
    duplicateFrom?.config?.knowledgeBaseId || "all"
  );
  const [strictGrounding, setStrictGrounding] = useState<boolean>(
    duplicateFrom?.config?.strictGrounding ?? true
  );

  const selectedKbDoc = useMemo(() => {
    if (selectedKnowledgeBaseId === "all") {
      return {
        id: "all",
        title: "All Campus Knowledge Documents (Business Library)",
        category: "Complete Campus Library",
        vectorChunks: mockKnowledgeBase.reduce((acc, d) => acc + d.vectorChunks, 0),
        status: "ready" as const,
        lastUpdated: "Real-time Synced",
      };
    }
    return (
      mockKnowledgeBase.find((d) => d.id === selectedKnowledgeBaseId) ||
      mockKnowledgeBase[0]
    );
  }, [selectedKnowledgeBaseId]);

  // STEP C: Schedule & Pacing State
  const [scheduleType, setScheduleType] = useState<"now" | "later">(
    duplicateFrom?.scheduleType || "later"
  );
  const [timezone, setTimezone] = useState(duplicateFrom?.timezone || getDefaultTimezone());

  // Default to tomorrow 10:00 AM in local timezone
  const defaultTomorrow = useMemo(() => {
    const d = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${yr}-${mo}-${day}`;
  }, []);

  const [scheduledDate, setScheduledDate] = useState(
    duplicateFrom?.scheduledDate || defaultTomorrow
  );
  const [scheduledTime, setScheduledTime] = useState(duplicateFrom?.scheduledTime || "10:30");
  const [concurrencyLines, setConcurrencyLines] = useState(
    duplicateFrom?.callingWindow?.concurrencyLimit || 20
  );
  const [pacingDelay, setPacingDelay] = useState(
    duplicateFrom?.callingWindow?.pacingDelaySec || 2
  );
  const [respectCallingHours, setRespectCallingHours] = useState(true);

  // STEP D: Confirmation State
  const [consentAcknowledged, setConsentAcknowledged] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Update language when agent changes
  useEffect(() => {
    if (currentAgent) {
      setSelectedLanguage(currentAgent.language);
    }
  }, [currentAgent]);

  // Validation of contacts
  const analyzedContacts = useMemo(() => {
    const valid: Array<RawContactItem & { normalized: string; display: string }> = [];
    const invalid: Array<RawContactItem & { reason: string }> = [];
    const duplicates: RawContactItem[] = [];
    const seenNumbers = new Set<string>();

    for (const c of contactList) {
      const res = normalizePhoneNumber(c.phone);
      if (!res.isValid) {
        invalid.push({ ...c, reason: res.error || "Invalid format" });
        continue;
      }

      if (seenNumbers.has(res.normalized)) {
        duplicates.push(c);
        continue;
      }

      seenNumbers.add(res.normalized);
      valid.push({
        ...c,
        normalized: res.normalized,
        display: res.display,
      });
    }

    return { valid, invalid, duplicates };
  }, [contactList]);

  // Interpreted scheduled local & UTC representation
  const schedulePreview = useMemo(() => {
    if (scheduleType === "now") {
      return {
        isValid: true,
        localString: "Immediate Dispatch (Upon confirmation)",
        utcIso: new Date().toISOString(),
      };
    }

    if (!scheduledDate || !scheduledTime) {
      return {
        isValid: false,
        localString: "Please select both date and time",
        utcIso: "",
      };
    }

    try {
      const utc = convertLocalToUtc(scheduledDate, scheduledTime, timezone);
      const isFuture = isFutureTime(utc, 30);
      const formatted = formatUtcToLocal(utc, timezone);

      return {
        isValid: isFuture,
        localString: formatted,
        utcIso: utc,
        error: isFuture ? undefined : "Scheduled time must be in the future",
      };
    } catch {
      return {
        isValid: false,
        localString: "Invalid date or timezone parameters",
        utcIso: "",
        error: "Invalid date format",
      };
    }
  }, [scheduleType, scheduledDate, scheduledTime, timezone]);

  if (!isOpen) return null;

  // Contact Handlers
  const handleAddManualContact = (e: React.FormEvent) => {
    e.preventDefault();
    setManualError("");

    if (!manualPhone.trim()) {
      setManualError("Phone number is required");
      return;
    }

    const norm = normalizePhoneNumber(manualPhone);
    if (!norm.isValid) {
      setManualError(norm.error || "Invalid phone number");
      return;
    }

    setContactList((prev) => [
      ...prev,
      {
        id: `man-${Date.now()}`,
        name: manualName.trim() || "Applicant",
        phone: norm.normalized,
        email: manualEmail.trim() || undefined,
        organization: manualOrg.trim() || undefined,
      },
    ]);

    setManualName("");
    setManualPhone("");
    setManualEmail("");
    setManualOrg("");
    try { soundSynth.play("click"); } catch {}
  };

  const handleRemoveContact = (id: string) => {
    setContactList((prev) => prev.filter((c) => c.id !== id));
    try { soundSynth.play("click"); } catch {}
  };

  const handleCsvUpload = (file: File) => {
    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      setCsvRawText(text);

      // Parse CSV rows
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length <= 1) return;

      const header = lines[0].toLowerCase().split(",").map((h) => h.trim().replace(/['"]/g, ""));
      const nameIdx = header.findIndex((h) => h.includes("name"));
      const phoneIdx = header.findIndex((h) => h.includes("phone") || h.includes("mobile") || h.includes("number"));
      const emailIdx = header.findIndex((h) => h.includes("email"));
      const orgIdx = header.findIndex((h) => h.includes("course") || h.includes("org") || h.includes("college"));

      const parsed: RawContactItem[] = [];
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim().replace(/['"]/g, ""));
        const rawPhone = phoneIdx !== -1 ? parts[phoneIdx] : parts[0];
        if (!rawPhone) continue;

        parsed.push({
          id: `csv-${i}-${Date.now()}`,
          name: nameIdx !== -1 && parts[nameIdx] ? parts[nameIdx] : `Lead #${i}`,
          phone: rawPhone,
          email: emailIdx !== -1 ? parts[emailIdx] : undefined,
          organization: orgIdx !== -1 ? parts[orgIdx] : undefined,
        });
      }

      if (parsed.length > 0) {
        setContactList((prev) => [...prev, ...parsed]);
      }
    };
    reader.readAsText(file);
  };

  const handleImportExistingList = () => {
    const selected = mockContacts.filter((c) => selectedListContactIds.includes(c.id));
    const converted: RawContactItem[] = selected.map((c) => ({
      id: `sys-${c.id}`,
      name: c.name,
      phone: c.phone,
      email: c.email,
      organization: c.organization,
    }));

    setContactList((prev) => [...prev, ...converted]);
    setContactMode("manual");
    try { soundSynth.play("confirm"); } catch {}
  };

  const handleAudioSample = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    try { soundSynth.play("confirm"); } catch {}
    setTimeout(() => setIsPlayingAudio(false), 2500);
  };

  // Submit Handler
  const handleFinalSubmit = async () => {
    setSubmitError("");
    if (!consentAcknowledged) {
      setSubmitError("Please confirm regulatory consent before scheduling outbound calls.");
      return;
    }

    if (analyzedContacts.valid.length === 0) {
      setSubmitError("At least one valid contact is required to schedule a campaign.");
      return;
    }

    if (scheduleType === "later" && !schedulePreview.isValid) {
      setSubmitError(schedulePreview.error || "Please select a valid future schedule time.");
      return;
    }

    setSubmitting(true);

    try {
      const payload: CreateSchedulePayload = {
        name: campaignName.trim(),
        scheduleType,
        scheduledDate: scheduleType === "later" ? scheduledDate : undefined,
        scheduledTime: scheduleType === "later" ? scheduledTime : undefined,
        timezone,
        consentAcknowledged: true,
        callingWindow: {
          startHour: 9,
          endHour: 19,
          concurrencyLimit: concurrencyLines,
          pacingDelaySec: pacingDelay,
        },
        config: {
          agentId: currentAgent.id,
          agentName: currentAgent.name,
          language: selectedLanguage,
          voiceName: currentAgent.voice.name,
          voiceAccent: currentAgent.voice.accent,
          callObjective,
          instructions,
          openingScript,
          knowledgeBaseId: selectedKbDoc.id,
          knowledgeBaseName: selectedKbDoc.title,
          knowledgeChunkCount: selectedKbDoc.vectorChunks,
          strictGrounding,
          customContext: {
            workspaceBatch: "swaram-scheduled-v1",
            respectCallingHours: String(respectCallingHours),
          },
        },
        contacts: analyzedContacts.valid.map((c) => ({
          name: c.name,
          phone: c.normalized,
          email: c.email,
          organization: c.organization,
        })),
      };

      await schedulesApi.createSchedule(payload);

      try { soundSynth.play("confirm"); } catch {}
      onScheduleCreated?.();
      onClose();
    } catch (err: unknown) {
      console.error("Failed to create schedule:", err);
      setSubmitError(err instanceof Error ? err.message : "Failed to create schedule");
    } finally {
      setSubmitting(false);
    }
  };

  // Navigation validation
  const canGoToStep2 = analyzedContacts.valid.length > 0;
  const canGoToStep3 = Boolean(callObjective.trim() && instructions.trim());
  const canGoToStep4 = scheduleType === "now" || schedulePreview.isValid;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/25 backdrop-blur-xs animate-in fade-in duration-150 select-none cursor-default font-sans text-[#1A1A1A]"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-[28px] border border-black/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.15)] p-5 sm:p-7 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFD9A0] text-[#1A1A1A] flex items-center justify-center shadow-xs">
              <Calendar className="w-4 h-4 text-[#733F00]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">
                  OUTBOUND CALL AUTOMATION
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF3E4] text-[#733F00] border border-black/[0.06]">
                  Step {currentStep} of 4
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                Schedule AI Voice Campaign
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-black/40 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="grid grid-cols-4 gap-2 pt-3 pb-4 border-b border-black/[0.04] text-[11px] font-semibold shrink-0">
          {[
            { num: 1, label: "Contacts" },
            { num: 2, label: "AI Config" },
            { num: 3, label: "Schedule" },
            { num: 4, label: "Review" },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => {
                if (s.num === 1) setCurrentStep(1);
                if (s.num === 2 && canGoToStep2) setCurrentStep(2);
                if (s.num === 3 && canGoToStep2 && canGoToStep3) setCurrentStep(3);
                if (s.num === 4 && canGoToStep2 && canGoToStep3 && canGoToStep4) setCurrentStep(4);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-full border transition-all text-center cursor-pointer ${
                currentStep === s.num
                  ? "bg-[#111111] text-white border-black font-bold shadow-xs"
                  : currentStep > s.num
                  ? "bg-[#FBF7ED] text-[#1A1A1A] border-black/[0.08]"
                  : "bg-white text-black/35 border-transparent cursor-not-allowed"
              }`}
            >
              <span>{s.num}.</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto py-4 flex-1 space-y-4 text-xs pr-1">
          {/* STEP 1: CONTACTS */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Campaign Title Input */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g. Merit Verification Round 1"
                  className="w-full px-4 py-2.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-[#1A1A1A] focus:outline-none focus:border-black/30 font-medium"
                />
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center gap-2 p-1 bg-[#FBF7ED] rounded-full border border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => setContactMode("manual")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                    contactMode === "manual" ? "bg-white text-[#1A1A1A] shadow-xs" : "text-black/50 hover:text-black"
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  type="button"
                  onClick={() => setContactMode("csv")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                    contactMode === "csv" ? "bg-white text-[#1A1A1A] shadow-xs" : "text-black/50 hover:text-black"
                  }`}
                >
                  Import CSV
                </button>
                <button
                  type="button"
                  onClick={() => setContactMode("list")}
                  className={`flex-1 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                    contactMode === "list" ? "bg-white text-[#1A1A1A] shadow-xs" : "text-black/50 hover:text-black"
                  }`}
                >
                  Swaram Lists
                </button>
              </div>

              {/* Contact Mode Views */}
              {contactMode === "manual" && (
                <form
                  onSubmit={handleAddManualContact}
                  className="p-4 rounded-2xl bg-[#FBF7ED]/70 border border-black/[0.06] space-y-3"
                >
                  <div className="font-semibold text-black/80 flex items-center justify-between">
                    <span>Add Individual Recipient</span>
                    <span className="text-[11px] text-black/45">Normalized to E.164 (+91)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Full Name (e.g. Sanya Gupta)"
                      value={manualName}
                      onChange={(e) => setManualName(e.target.value)}
                      className="px-3.5 py-2 rounded-full bg-white border border-black/[0.08] text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Mobile Number (e.g. 9840122345)"
                      value={manualPhone}
                      onChange={(e) => setManualPhone(e.target.value)}
                      className="px-3.5 py-2 rounded-full bg-white border border-black/[0.08] text-xs focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      className="px-3.5 py-2 rounded-full bg-white border border-black/[0.08] text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Course / Department (e.g. B.Tech CSE)"
                      value={manualOrg}
                      onChange={(e) => setManualOrg(e.target.value)}
                      className="px-3.5 py-2 rounded-full bg-white border border-black/[0.08] text-xs focus:outline-none"
                    />
                  </div>

                  {manualError && (
                    <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {manualError}
                    </p>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111111] text-white font-semibold text-xs hover:bg-black transition-all cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Queue</span>
                    </button>
                  </div>
                </form>
              )}

              {contactMode === "csv" && (
                <div className="p-5 rounded-2xl border-2 border-dashed border-black/15 bg-[#FBF7ED] text-center space-y-2">
                  <FileSpreadsheet className="w-8 h-8 text-black/60 mx-auto" />
                  <div>
                    <p className="font-semibold text-xs text-[#1A1A1A]">
                      Upload CSV with Contacts
                    </p>
                    <p className="text-[11px] text-black/50 mt-0.5">
                      Columns automatically mapped: Name, Phone, Email, Organization
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.1] text-xs font-semibold cursor-pointer hover:bg-[#FAF3E4] transition-all">
                    <Upload className="w-3.5 h-3.5 text-black/60" />
                    <span>{csvFileName || "Choose CSV File"}</span>
                    <input
                      type="file"
                      accept=".csv,text/csv"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleCsvUpload(file);
                      }}
                    />
                  </label>
                </div>
              )}

              {contactMode === "list" && (
                <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#1A1A1A]">
                      Select from Swaram Verified Contacts
                    </span>
                    <span className="text-[11px] text-black/50">
                      {selectedListContactIds.length} of {mockContacts.length} selected
                    </span>
                  </div>

                  <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                    {mockContacts.map((contact) => (
                      <label
                        key={contact.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-black/[0.06] cursor-pointer hover:border-black/20"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={selectedListContactIds.includes(contact.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedListContactIds((prev) => [...prev, contact.id]);
                              } else {
                                setSelectedListContactIds((prev) =>
                                  prev.filter((id) => id !== contact.id)
                                );
                              }
                            }}
                            className="rounded accent-black cursor-pointer"
                          />
                          <div>
                            <p className="font-semibold text-xs text-[#1A1A1A]">{contact.name}</p>
                            <p className="text-[10px] text-black/45">{contact.phone} • {contact.organization}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF3E4] text-black/70">
                          {contact.category}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleImportExistingList}
                      className="px-4 py-1.5 rounded-full bg-[#111111] text-white font-semibold text-xs hover:bg-black transition-all cursor-pointer"
                    >
                      Import Selected ({selectedListContactIds.length})
                    </button>
                  </div>
                </div>
              )}

              {/* Contact Queue Validation Pill Bar */}
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-medium pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7E3FC] text-blue-900 border border-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                  <strong>{analyzedContacts.valid.length}</strong> Valid
                </span>
                {analyzedContacts.invalid.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                    <strong>{analyzedContacts.invalid.length}</strong> Invalid (Excluded)
                  </span>
                )}
                {analyzedContacts.duplicates.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    <strong>{analyzedContacts.duplicates.length}</strong> Duplicates Removed
                  </span>
                )}
              </div>

              {/* Contact List Table */}
              <div className="border border-black/[0.06] rounded-2xl overflow-hidden bg-white">
                <div className="px-3.5 py-2 bg-[#FBF7ED] border-b border-black/[0.06] font-semibold text-[11px] text-black/60 flex items-center justify-between">
                  <span>Queued Contacts ({analyzedContacts.valid.length})</span>
                  <span>E.164 Format</span>
                </div>
                <div className="max-h-48 overflow-y-auto divide-y divide-black/[0.04]">
                  {analyzedContacts.valid.length === 0 ? (
                    <div className="p-6 text-center text-black/40 text-xs">
                      No contacts added yet. Add recipients via manual entry, CSV, or Swaram lists.
                    </div>
                  ) : (
                    analyzedContacts.valid.map((c) => (
                      <div
                        key={c.id}
                        className="px-3.5 py-2.5 flex items-center justify-between hover:bg-[#FBF7ED]/50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-xs text-[#1A1A1A]">{c.name}</p>
                          <p className="text-[10px] text-black/45">
                            {c.display} {c.organization ? `• ${c.organization}` : ""}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveContact(c.id)}
                          className="p-1.5 rounded-full text-black/30 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove contact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AI CONFIGURATION */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Agent Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Select AI Voice Agent
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {mockAgents.map((agent) => (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => {
                        setSelectedAgentId(agent.id);
                        try { soundSynth.play("click"); } catch {}
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedAgentId === agent.id
                          ? "bg-[#FAF3E4] border-black/30 shadow-xs ring-1 ring-black/20"
                          : "bg-white border-black/[0.08] hover:border-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-[#1A1A1A]">{agent.name.split("—")[0]}</span>
                        {selectedAgentId === agent.id && (
                          <Check className="w-3.5 h-3.5 text-black" />
                        )}
                      </div>
                      <p className="text-[10px] text-black/55 line-clamp-1">{agent.role}</p>
                      <p className="text-[10px] font-semibold text-[#733F00] mt-1.5">
                        {agent.voice.name} • {agent.voice.gender}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grounding Knowledge Base (Business Library) */}
              <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.08] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF3E4] border border-[#FFD9A0] text-[#733F00] flex items-center justify-center shrink-0">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                        Grounded Knowledge Base
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Zero Hallucinations
                        </span>
                      </h4>
                      <p className="text-[10px] text-black/50">
                        The AI agent answers questions strictly using your verified business library
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/knowledge"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#733F00] hover:underline shrink-0"
                  >
                    <span>Manage in Knowledge Base</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {/* Explainer Banner */}
                <div className="p-3 rounded-xl bg-white border border-black/[0.06] text-xs text-black/75 space-y-1">
                  <p className="text-[11px] leading-relaxed">
                    <strong>Knowledge Base</strong> is the information your AI agent refers to when answering customers&apos; questions. Instead of making the AI invent answers, you provide business-approved information so it can respond accurately during phone calls and WhatsApp conversations.
                  </p>
                  <p className="text-[10px] text-black/50 italic">
                    Think of it as the AI agent&apos;s business knowledge library.
                  </p>
                </div>

                {/* Knowledge Base Document Options */}
                <div>
                  <label className="block text-[11px] font-semibold text-black/70 mb-1.5">
                    Select Grounded Documents for This Call
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* All documents option */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedKnowledgeBaseId("all");
                        try { soundSynth.play("click"); } catch {}
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedKnowledgeBaseId === "all"
                          ? "bg-[#FAF3E4] border-black/30 shadow-xs ring-1 ring-black/20"
                          : "bg-white border-black/[0.08] hover:border-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-[#1A1A1A] flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-[#733F00]" />
                          All Knowledge Documents
                        </span>
                        {selectedKnowledgeBaseId === "all" && <Check className="w-3 h-3 text-black" />}
                      </div>
                      <p className="text-[10px] text-black/55">Complete Campus Business Library</p>
                      <div className="flex items-center justify-between text-[10px] text-[#733F00] font-semibold mt-1.5">
                        <span>456 Total Chunks</span>
                        <span className="text-emerald-700">100% Grounded</span>
                      </div>
                    </button>

                    {/* Individual Documents */}
                    {mockKnowledgeBase.map((doc) => {
                      const isSelected = selectedKnowledgeBaseId === doc.id;
                      return (
                        <button
                          key={doc.id}
                          type="button"
                          onClick={() => {
                            setSelectedKnowledgeBaseId(doc.id);
                            try { soundSynth.play("click"); } catch {}
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#FAF3E4] border-black/30 shadow-xs ring-1 ring-black/20"
                              : "bg-white border-black/[0.08] hover:border-black/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-[#1A1A1A] truncate max-w-[190px] flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-black/50 shrink-0" />
                              <span className="truncate">{doc.title.split(".")[0]}</span>
                            </span>
                            {isSelected && <Check className="w-3 h-3 text-black shrink-0" />}
                          </div>
                          <p className="text-[10px] text-black/55 truncate">{doc.category}</p>
                          <div className="flex items-center justify-between text-[10px] text-[#733F00] font-semibold mt-1.5">
                            <span>{doc.vectorChunks} Chunks</span>
                            <span className="text-emerald-700 font-mono text-[9px]">Ready</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Strict Grounding Guardrail Checkbox */}
                <label className="flex items-center gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={strictGrounding}
                    onChange={(e) => setStrictGrounding(e.target.checked)}
                    className="rounded accent-black cursor-pointer"
                  />
                  <span className="text-[11px] text-black/70">
                    <strong>Zero-Hallucination Guardrail:</strong> AI agent must only answer based on verified facts in this knowledge library. If a question is unverified, offer human counselor callback.
                  </span>
                </label>
              </div>

              {/* Language & Voice Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Language &amp; Code-Switching
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-[#1A1A1A] focus:outline-none text-xs font-medium cursor-pointer"
                  >
                    <option value="Hindi + English (Auto Code-Switching)">
                      Hindi + English (Auto Code-Switching)
                    </option>
                    <option value="Telugu + English">Telugu + English</option>
                    <option value="English + Hinglish">English + Hinglish</option>
                    <option value="Tamil + English">Tamil + English</option>
                    <option value="Kannada + English">Kannada + English</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#1A1A1A]">Voice Accent &amp; Preview</label>
                    <button
                      type="button"
                      onClick={handleAudioSample}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#733F00] hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isPlayingAudio ? "Playing Sample..." : "Listen Sample"}</span>
                    </button>
                  </div>
                  <div className="px-4 py-2.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-xs text-black/70 flex items-center justify-between">
                    <span>{currentAgent.voice.accent}</span>
                    <span className="text-[10px] font-bold text-black/40 uppercase">Carrier Grade</span>
                  </div>
                </div>
              </div>

              {/* Call Objective */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Primary Call Objective
                </label>
                <input
                  type="text"
                  value={callObjective}
                  onChange={(e) => setCallObjective(e.target.value)}
                  placeholder="e.g. Verify board percentage and qualify for Chancellor Merit Scholarship"
                  className="w-full px-4 py-2.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-[#1A1A1A] focus:outline-none text-xs font-medium"
                />
              </div>

              {/* Calling Instructions */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Conversational Instructions &amp; Guardrails
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Instructions for handling objections, questions, and booking follow-ups"
                  className="w-full p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] text-[#1A1A1A] focus:outline-none text-xs font-medium resize-none leading-relaxed"
                />
              </div>

              {/* Opening Script with live personalization preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#1A1A1A]">
                    Opening Script (Supports &#123;name&#125;, &#123;organization&#125;)
                  </label>
                  <span className="text-[10px] text-black/45">Variables auto-injected</span>
                </div>
                <input
                  type="text"
                  value={openingScript}
                  onChange={(e) => setOpeningScript(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-[#1A1A1A] focus:outline-none text-xs font-medium"
                />

                {/* Personalized Preview Pill */}
                <div className="mt-2 p-3 rounded-2xl bg-[#BCD0F5]/30 border border-[#A8C3F0]/50 text-[11px] text-[#1A1A1A]">
                  <span className="font-semibold text-blue-900">Live Personalization Preview: </span>
                  <span className="italic text-black/75">
                    &ldquo;
                    {openingScript
                      .replace(/\{name\}/g, analyzedContacts.valid[0]?.name || "Rahul Sharma")
                      .replace(/\{organization\}/g, analyzedContacts.valid[0]?.organization || "Computer Science")}
                    &rdquo;
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE & PACING */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Start Now vs Later */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Execution Timing
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setScheduleType("now");
                      try { soundSynth.play("click"); } catch {}
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      scheduleType === "now"
                        ? "bg-[#FAF3E4] border-black/30 shadow-xs ring-1 ring-black/20"
                        : "bg-white border-black/[0.08] hover:border-black/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#1A1A1A]">Start Immediately</span>
                      {scheduleType === "now" && <Check className="w-3.5 h-3.5 text-black" />}
                    </div>
                    <p className="text-[11px] text-black/55 leading-relaxed">
                      Dispatch outbound queue automatically as soon as confirmed.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScheduleType("later");
                      try { soundSynth.play("click"); } catch {}
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      scheduleType === "later"
                        ? "bg-[#FAF3E4] border-black/30 shadow-xs ring-1 ring-black/20"
                        : "bg-white border-black/[0.08] hover:border-black/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-[#1A1A1A]">Schedule for Later</span>
                      {scheduleType === "later" && <Check className="w-3.5 h-3.5 text-black" />}
                    </div>
                    <p className="text-[11px] text-black/55 leading-relaxed">
                      Queue campaign for an exact future date, time, and explicit timezone.
                    </p>
                  </button>
                </div>
              </div>

              {/* Date & Time Picker (When later) */}
              {scheduleType === "later" && (
                <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-3">
                  <div className="font-semibold text-xs text-[#1A1A1A] flex items-center justify-between">
                    <span>Future Execution Parameters</span>
                    <span className="text-[10px] text-[#733F00] font-bold">UTC Converted</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-black/70 mb-1">
                        Execution Date
                      </label>
                      <input
                        type="date"
                        min={defaultTomorrow}
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-full bg-white border border-black/[0.08] text-xs font-medium focus:outline-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-black/70 mb-1">
                        Execution Time (Local)
                      </label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full px-4 py-2 rounded-full bg-white border border-black/[0.08] text-xs font-medium focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-black/70 mb-1">
                      Explicit Timezone (IANA)
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-2 rounded-full bg-white border border-black/[0.08] text-xs font-medium focus:outline-none cursor-pointer"
                    >
                      {COMMON_TIMEZONES.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label} ({tz.value})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Schedule Interpretation Card */}
                  <div className="p-3 rounded-xl bg-white border border-black/[0.06] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-black/50 text-[11px]">Interpreted Local Time:</span>
                      <span className="font-bold text-[#1A1A1A]">{schedulePreview.localString}</span>
                    </div>
                    {schedulePreview.utcIso && (
                      <div className="flex items-center justify-between text-[10px] text-black/45">
                        <span>Backend Server UTC:</span>
                        <span className="font-mono">{schedulePreview.utcIso}</span>
                      </div>
                    )}
                    {schedulePreview.error && (
                      <p className="text-[11px] text-red-600 font-semibold pt-1">
                        ⚠️ {schedulePreview.error}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Calling Window & Dialer Bandwidth */}
              <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#1A1A1A]">
                    Telephony Pacing &amp; Carrier Trunks
                  </span>
                  <span className="text-[10px] font-bold text-black/50">Exotel SIP Trunking</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-[11px]">
                      <span className="text-black/70 font-medium">Concurrency Limit</span>
                      <strong className="text-[#1A1A1A]">{concurrencyLines} lines</strong>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={50}
                      step={5}
                      value={concurrencyLines}
                      onChange={(e) => setConcurrencyLines(Number(e.target.value))}
                      className="w-full accent-black cursor-pointer"
                    />
                    <span className="text-[10px] text-black/40">Max simultaneous active phone calls</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1 text-[11px]">
                      <span className="text-black/70 font-medium">Pacing Delay</span>
                      <strong className="text-[#1A1A1A]">{pacingDelay} sec</strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={pacingDelay}
                      onChange={(e) => setPacingDelay(Number(e.target.value))}
                      className="w-full accent-black cursor-pointer"
                    />
                    <span className="text-[10px] text-black/40">Delay between dispatching next contact</span>
                  </div>
                </div>

                <label className="flex items-center gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={respectCallingHours}
                    onChange={(e) => setRespectCallingHours(e.target.checked)}
                    className="rounded accent-black cursor-pointer"
                  />
                  <span className="text-[11px] text-black/65">
                    Enforce standard calling hours (09:00 AM – 07:00 PM local recipient time)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.08] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#733F00] bg-[#FFD9A0] px-2.5 py-0.5 rounded-full">
                      READY TO CONFIRM
                    </span>
                    <h4 className="text-sm font-bold text-[#1A1A1A] mt-1.5">{campaignName}</h4>
                  </div>
                  <span className="text-xs font-bold text-black/70">
                    {analyzedContacts.valid.length} Recipients
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-black/[0.06] text-[11px]">
                  <div>
                    <span className="text-black/45">Assigned Agent:</span>
                    <p className="font-semibold text-[#1A1A1A]">{currentAgent.name.split("—")[0]}</p>
                  </div>
                  <div>
                    <span className="text-black/45">Voice &amp; Language:</span>
                    <p className="font-semibold text-[#1A1A1A]">{selectedLanguage}</p>
                  </div>
                  <div>
                    <span className="text-black/45">Execution Schedule:</span>
                    <p className="font-semibold text-[#1A1A1A]">{schedulePreview.localString}</p>
                  </div>
                  <div>
                    <span className="text-black/45">Concurrency &amp; Pacing:</span>
                    <p className="font-semibold text-[#1A1A1A]">
                      {concurrencyLines} lines • {pacingDelay}s pacing
                    </p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-black/[0.04] flex items-center justify-between">
                    <div>
                      <span className="text-black/45">Grounded Knowledge Base (Business Library):</span>
                      <p className="font-semibold text-[#1A1A1A] flex items-center gap-1.5 mt-0.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#733F00]" />
                        <span>{selectedKbDoc.title.split(".")[0]}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF3E4] text-[#733F00] font-bold">
                          {selectedKbDoc.vectorChunks} Chunks
                        </span>
                        {strictGrounding && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                            Zero Hallucination Mode
                          </span>
                        )}
                      </p>
                    </div>
                    <Link
                      href="/dashboard/knowledge"
                      target="_blank"
                      className="text-[11px] text-[#733F00] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Knowledge Base</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-black/[0.06] text-[11px] space-y-1">
                  <span className="font-semibold text-black/70">Call Objective:</span>
                  <p className="text-black/80">{callObjective}</p>
                </div>
              </div>

              {/* Telephony Estimated Bandwidth */}
              <div className="p-3.5 rounded-2xl bg-[#D7E3FC]/40 border border-blue-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-blue-700" />
                  <div>
                    <p className="font-semibold text-blue-950">Estimated Cadence Duration</p>
                    <p className="text-[11px] text-blue-800/80">
                      ~{Math.ceil((analyzedContacts.valid.length * 2) / concurrencyLines) + 1} minutes
                      estimated for batch completion
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-900 bg-white px-3 py-1 rounded-full border border-blue-200">
                  Sub-150ms Carrier SLA
                </span>
              </div>

              {/* Regulatory Consent Checkbox */}
              <label className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-black/[0.1] hover:border-black/30 transition-all cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAcknowledged}
                  onChange={(e) => setConsentAcknowledged(e.target.checked)}
                  className="mt-0.5 rounded accent-black cursor-pointer"
                />
                <div className="text-[11px] text-black/65 leading-relaxed">
                  <strong className="text-[#1A1A1A] block">
                    Regulatory Consent &amp; Telephony Compliance Affirmation
                  </strong>
                  I certify that all supplied telephone numbers have provided verifiable transactional
                  opt-in consent. The automated system will re-verify suppression lists and respect local
                  calling regulations before dialing.
                </div>
              </label>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{submitError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] shrink-0">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-black/60 hover:text-[#1A1A1A] bg-white border border-black/[0.08] hover:bg-[#FAF3E4] transition-all cursor-pointer"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-black/60 hover:text-[#1A1A1A] bg-white border border-black/[0.08] hover:bg-[#FAF3E4] transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              disabled={
                (currentStep === 1 && !canGoToStep2) ||
                (currentStep === 2 && !canGoToStep3) ||
                (currentStep === 3 && !canGoToStep4)
              }
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
              }}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                (currentStep === 1 && canGoToStep2) ||
                (currentStep === 2 && canGoToStep3) ||
                (currentStep === 3 && canGoToStep4)
                  ? "bg-[#111111] hover:bg-black text-white"
                  : "bg-black/10 text-black/30 cursor-not-allowed"
              }`}
            >
              <span>Continue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting || !consentAcknowledged}
              onClick={handleFinalSubmit}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
                !submitting && consentAcknowledged
                  ? "bg-[#111111] hover:bg-black text-white cursor-pointer"
                  : "bg-black/10 text-black/30 cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <>
                  <div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Scheduling Campaign...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {scheduleType === "now" ? "Confirm & Launch Now" : "Confirm Schedule"}
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
