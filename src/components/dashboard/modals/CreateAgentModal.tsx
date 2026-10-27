"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Bot,
  ChevronRight,
  ChevronLeft,
  Check,
  Play,
  Pause,
  Volume2,
  ShieldCheck,
  Sparkles,
  Mic,
  Square,
  Upload,
  FileText,
  Sliders,
  AlertTriangle,
  RotateCcw,
  Zap,
  Globe,
  Radio,
  BookmarkCheck,
  UserCheck,
  Plus,
  Trash2,
  PhoneCall,
  Search,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import type { DashboardAgent } from "@/types/dashboard";
import { readyMadeVoices, initialClonedVoices, VoiceItem } from "@/data/mock/voiceLibrary";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentCreated?: (agent: DashboardAgent) => void;
  existingClonedVoices?: VoiceItem[];
  onVoiceCloned?: (voice: VoiceItem) => void;
}

export default function CreateAgentModal({
  isOpen,
  onClose,
  onAgentCreated,
  existingClonedVoices = [],
  onVoiceCloned,
}: CreateAgentModalProps) {
  const [step, setStep] = useState(1);

  // -------------------------------------------------------------
  // STEP 1: IDENTITY & PURPOSE FREEDOM
  // -------------------------------------------------------------
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("Customer Operations Desk");
  const [personaArchetype, setPersonaArchetype] = useState("Professional & Helpful Voice Specialist");
  const [purposePreset, setPurposePreset] = useState("customer-service");
  const [customPurpose, setCustomPurpose] = useState(
    "Assist prospective and active customers with product inquiries, service onboarding, and schedule appointments."
  );
  const [targetAudience, setTargetAudience] = useState("Prospective clients, customers & enterprise accounts");
  const [primaryKpi, setPrimaryKpi] = useState("Resolved Inquiries & Scheduled Consultations");

  // Purpose Presets
  const purposePresets = [
    {
      id: "customer-service",
      title: "Customer Support",
      icon: "🎧",
      desc: "Assist callers with inquiries, service features, account details, and schedule follow-ups.",
      defaultRole: "Senior Customer Service Specialist",
      defaultPurpose: "Assist callers with product questions, account status, resolution workflows, and schedule consultation calls.",
    },
    {
      id: "sales-outreach",
      title: "Outbound Qualification",
      icon: "📞",
      desc: "Contact registered leads, qualify call volume and requirements, and book executive demos.",
      defaultRole: "Enterprise Outreach Specialist",
      defaultPurpose: "Reach out to registered leads, qualify requirements, address common questions, and schedule demonstrations.",
    },
    {
      id: "finance",
      title: "Billing & Accounts",
      icon: "💳",
      desc: "Assist with invoices, subscription tiers, renewal schedules, and payment links.",
      defaultRole: "Billing & Accounts Officer",
      defaultPurpose: "Answer questions regarding invoice receipts, payment methods, plan adjustments, and dispatch payment links.",
    },
    {
      id: "technical",
      title: "Technical Helpdesk",
      icon: "🛠️",
      desc: "Resolve LMS/CRM integration issues, API webhooks, platform onboarding, and service inquiries.",
      defaultRole: "Technical Solutions Specialist",
      defaultPurpose: "Provide instantaneous resolution for platform credentials, webhook notifications, and telephony configurations.",
    },
    {
      id: "custom",
      title: "Custom Purpose",
      icon: "✨",
      desc: "Build completely from scratch for any bespoke enterprise workflow.",
      defaultRole: "AI Specialist",
      defaultPurpose: "",
    },
  ];

  // -------------------------------------------------------------
  // STEP 2: CONTEXT & BACKGROUND KNOWLEDGE FREEDOM
  // -------------------------------------------------------------
  const [institutionName, setInstitutionName] = useState("Enterprise Voice Solutions");
  const [operatingHours, setOperatingHours] = useState("Mon–Sat, 9:00 AM – 6:30 PM IST");
  const [campusLocation, setCampusLocation] = useState("HITEC City, Hyderabad & Bengaluru Tech Hub");
  const [keyGroundingFacts, setKeyGroundingFacts] = useState([
    "Enterprise voice telephony plans include 3,000 monthly calling minutes.",
    "Carrier-grade PRI SIP trunks support sub-140ms acoustic latency.",
    "Native CRM synchronization available for HubSpot, Salesforce, and Zoho.",
    "Zero-hallucination factual grounding backed by semantic vector search.",
    "Official Support Desk: +91 40 4590 1197 • Help Desk: support@enterprise.ai.",
  ]);
  const [newFactInput, setNewFactInput] = useState("");
  const [groundingStrictness, setGroundingStrictness] = useState<"strict" | "balanced">("strict");

  const addGroundingFact = () => {
    if (!newFactInput.trim()) return;
    setKeyGroundingFacts((prev) => [...prev, newFactInput.trim()]);
    setNewFactInput("");
    try { soundSynth.play("pop"); } catch {}
  };

  const removeGroundingFact = (index: number) => {
    setKeyGroundingFacts((prev) => prev.filter((_, i) => i !== index));
    try { soundSynth.play("click"); } catch {}
  };

  // -------------------------------------------------------------
  // STEP 3: RULES, GUARDRAILS & ESCALATION FREEDOM
  // -------------------------------------------------------------
  const [dosRules, setDosRules] = useState([
    "Always greet callers with warmth, empathy, and clarity.",
    "Keep replies concise (under 25 words) for natural conversational phone latency.",
    "When customer indicates high volume (>50k min/mo), highlight enterprise volume pricing.",
    "Offer to schedule a technical walkthrough or live demonstration before ending call.",
  ]);
  const [dontsRules, setDontsRules] = useState([
    "Never speculate or invent SLA terms not present in official documentation.",
    "Do not quote custom discounts outside the verified rate matrix.",
    "Never disparage or discuss competitor telephony carriers.",
    "Do not keep caller on silence for more than 4 seconds without reassurance.",
  ]);
  const [newDoInput, setNewDoInput] = useState("");
  const [newDontInput, setNewDontInput] = useState("");
  const [escalationDesk, setEscalationDesk] = useState("Operations Escalation Desk (+91 40 4590 1100)");
  const [fallbackPhrase, setFallbackPhrase] = useState(
    "I do not have verified documentation on that specific item right now. Let me connect you directly with our senior operations desk."
  );

  const addDoRule = () => {
    if (!newDoInput.trim()) return;
    setDosRules((prev) => [...prev, newDoInput.trim()]);
    setNewDoInput("");
    try { soundSynth.play("pop"); } catch {}
  };

  const removeDoRule = (idx: number) => {
    setDosRules((prev) => prev.filter((_, i) => i !== idx));
  };

  const addDontRule = () => {
    if (!newDontInput.trim()) return;
    setDontsRules((prev) => [...prev, newDontInput.trim()]);
    setNewDontInput("");
    try { soundSynth.play("pop"); } catch {}
  };

  const removeDontRule = (idx: number) => {
    setDontsRules((prev) => prev.filter((_, i) => i !== idx));
  };

  // -------------------------------------------------------------
  // STEP 4: VOICE SELECTION & VOICE CLONING FREEDOM
  // -------------------------------------------------------------
  const [voiceMode, setVoiceMode] = useState<"library" | "clone">("library");
  const [allVoices, setAllVoices] = useState<VoiceItem[]>([
    ...initialClonedVoices,
    ...existingClonedVoices,
    ...readyMadeVoices,
  ]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceItem>(readyMadeVoices[0]);
  const [voiceSearch, setVoiceSearch] = useState("");
  const [voiceGenderFilter, setVoiceGenderFilter] = useState<"all" | "Female" | "Male">("all");
  const [voiceLanguageFilter, setVoiceLanguageFilter] = useState("all");
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Voice Tuning Sliders
  const [speakingSpeed, setSpeakingSpeed] = useState(1.0);
  const [voicePitch, setVoicePitch] = useState(1.0);
  const [warmthLevel, setWarmthLevel] = useState("Natural & Engaging");

  // Clone a New Voice States
  const [cloneVoiceName, setCloneVoiceName] = useState("");
  const [cloneGender, setCloneGender] = useState<"Female" | "Male" | "Neutral">("Female");
  const [cloneLanguage, setCloneLanguage] = useState("Indian English + Hindi");
  const [cloneTone, setCloneTone] = useState("Warm & Reassuring");
  const [cloneInputMode, setCloneInputMode] = useState<"mic" | "upload">("mic");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingBlobUrl, setRecordingBlobUrl] = useState<string | null>(null);
  const [cloneUploadedFile, setCloneUploadedFile] = useState<string | null>(null);
  const [cloneConsentConfirmed, setCloneConsentConfirmed] = useState(false);
  const [cloneProcessingState, setCloneProcessingState] = useState<"idle" | "analyzing" | "ready">("idle");
  const [cloneTestSentence, setCloneTestSentence] = useState(
    "Hello! Welcome to our admissions desk. I am testing my cloned voice model."
  );

  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  if (!isOpen) return null;

  // Handle Purpose selection
  const handleSelectPreset = (preset: typeof purposePresets[0]) => {
    try { soundSynth.play("click"); } catch {}
    setPurposePreset(preset.id);
    if (preset.id !== "custom") {
      setRole(preset.defaultRole);
      setCustomPurpose(preset.defaultPurpose);
      if (!name) {
        setName(`${preset.defaultRole.split(" ")[0]} AI`);
      }
    }
  };

  // Play voice sample
  const handlePlayVoiceSample = (v: VoiceItem) => {
    if (playingVoiceId === v.id) {
      soundSynth.stop();
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(v.id);
      soundSynth.speak(v.sampleTranscript, { rate: speakingSpeed, pitch: voicePitch });
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 4500);
    }
  };

  // Microphone recording simulation / real recording
  const startRecording = () => {
    try { soundSynth.play("confirm"); } catch {}
    setIsRecording(true);
    setRecordingSeconds(0);
    setRecordingBlobUrl(null);

    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    try { soundSynth.play("pop"); } catch {}
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setRecordingBlobUrl("mock-recorded-sample.wav");
  };

  // Clone synthesis
  const handleSynthesizeClonedVoice = () => {
    if (!cloneConsentConfirmed) return;
    if (!cloneVoiceName.trim()) {
      alert("Please provide a name for your cloned voice model.");
      return;
    }
    try { soundSynth.play("confirm"); } catch {}
    setCloneProcessingState("analyzing");

    setTimeout(() => {
      setCloneProcessingState("ready");
      const newClonedItem: VoiceItem = {
        id: `cloned-${Date.now()}`,
        name: `${cloneVoiceName.trim()} (Cloned)`,
        gender: cloneGender,
        language: cloneLanguage,
        accent: "Custom Neural Clone",
        tone: cloneTone,
        sampleAudio: "https://actions.google.com/sounds/v1/speech/female_affirmation.ogg",
        latencyMs: 124,
        sampleTranscript: cloneTestSentence,
        tag: "Cloned Neural Model",
        recommendedFor: "Custom Tailored Persona",
        isCloned: true,
        cloneFidelity: 98.7,
        clonedAt: "Just now",
        provider: "Custom Cloned Neural Engine",
      };

      setAllVoices((prev) => [newClonedItem, ...prev]);
      setSelectedVoice(newClonedItem);
      onVoiceCloned?.(newClonedItem);
      try {
        soundSynth.play("affirm");
        soundSynth.speak(`Voice model for ${cloneVoiceName} cloned and verified successfully.`, { rate: 1.05 });
      } catch {}
    }, 1800);
  };

  // Step Navigation
  const handleClose = () => {
    try { soundSynth.play("click"); } catch {}
    setStep(1);
    onClose();
  };

  const handleNextStep = () => {
    try { soundSynth.play("click"); } catch {}
    if (step === 1 && !name.trim()) {
      alert("Please enter a name for your agent.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    try { soundSynth.play("click"); } catch {}
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Save and Deploy
  const handleDeployAgent = () => {
    try {
      soundSynth.play("confirm");
      soundSynth.speak(`Voice Agent ${name || "Custom Persona"} deployed with voice ${selectedVoice.name}.`);
    } catch {}

    const newId = `agent-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now().toString().slice(-4)}`;

    const fullSystemPrompt = `You are ${name || "AI Voice Agent"}, operating as ${role || "Admissions Specialist"} in ${department} at ${institutionName}.
CORE PURPOSE:
${customPurpose}

CONTEXT & FACTS:
- Organization: ${institutionName}
- Office Hours: ${operatingHours}
- Campus Location: ${campusLocation}
- Grounding Knowledge:
${keyGroundingFacts.map((f) => `  * ${f}`).join("\n")}

CONVERSATIONAL RULES (DO's):
${dosRules.map((r) => `  * ${r}`).join("\n")}

STRICT GUARDRAILS (DON'Ts):
${dontsRules.map((r) => `  * ${r}`).join("\n")}

ESCALATION TRIGGER:
If confidence drops below threshold or caller requests human support, transfer to: ${escalationDesk}
FALLBACK PHRASE:
"${fallbackPhrase}"`;

    const newAgent: DashboardAgent = {
      id: newId,
      name: `${name} — ${role || "Specialist"}`,
      role: role || "Admissions Specialist",
      department: department,
      status: "active",
      language: selectedVoice.language,
      voice: {
        name: selectedVoice.name,
        gender: selectedVoice.gender,
        accent: `${selectedVoice.accent} (${selectedVoice.tone})`,
        sampleUrl: selectedVoice.sampleAudio,
        isCloned: selectedVoice.isCloned,
        pitch: voicePitch,
        speed: speakingSpeed,
        emotion: warmthLevel,
        provider: selectedVoice.provider || "Neural Telephony",
      },
      callsToday: 0,
      avgDuration: "2m 10s",
      accuracy: 99.2,
      assignedNumber: "+91 40 4590 " + Math.floor(1000 + Math.random() * 9000),
      systemPromptPreview: fullSystemPrompt,
      activeLiveCount: 0,
      purpose: customPurpose,
      contextKnowledge: keyGroundingFacts.join("\n"),
      rules: dosRules,
      guardrails: dontsRules,
      greetingPhrase: `Hello! Welcome to ${institutionName}. I am ${name}. How may I help you today?`,
      kpis: [primaryKpi],
      personaArchetype: personaArchetype,
      escalationDesk: escalationDesk,
    };

    onAgentCreated?.(newAgent);
    onClose();
  };

  // Filtered Voices for Library
  const filteredVoices = allVoices.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(voiceSearch.toLowerCase()) ||
      v.language.toLowerCase().includes(voiceSearch.toLowerCase()) ||
      v.accent.toLowerCase().includes(voiceSearch.toLowerCase());
    const matchesGender = voiceGenderFilter === "all" || v.gender === voiceGenderFilter;
    const matchesLang =
      voiceLanguageFilter === "all" ||
      v.language.toLowerCase().includes(voiceLanguageFilter.toLowerCase());
    return matchesSearch && matchesGender && matchesLang;
  });

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-[32px] border-2 border-black/[0.08] shadow-2xl p-5 sm:p-7 overflow-hidden text-[#1A1A1A] my-auto">
        {/* ============================================================= */}
        {/* MODAL HEADER                                                  */}
        {/* ============================================================= */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF6B08] via-amber-500 to-[#E11D48] text-white flex items-center justify-center font-bold shadow-md">
              <Bot className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF6B08] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  Full Freedom Creator
                </span>
                <span className="text-xs text-black/40">•</span>
                <span className="text-xs text-black/50 font-medium">Step {step} of 4</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#1A1A1A] tracking-tight mt-0.5">
                Create AI Voice Agent
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-black/60 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ============================================================= */}
        {/* STEP PROGRESS TABS                                            */}
        {/* ============================================================= */}
        <div className="grid grid-cols-4 gap-2 my-5">
          {[
            { num: 1, label: "Purpose & Role", icon: Sparkles },
            { num: 2, label: "Context Knowledge", icon: FileText },
            { num: 3, label: "Rules & Guardrails", icon: ShieldCheck },
            { num: 4, label: "Voice & Voice Cloning", icon: Volume2 },
          ].map((s) => {
            const Icon = s.icon;
            const isCurrent = step === s.num;
            const isCompleted = step > s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#111111] text-white border-black shadow-xs ring-1 ring-black/10"
                    : isCompleted
                    ? "bg-emerald-50 text-emerald-950 border-emerald-300"
                    : "bg-[#FAF8F5] text-black/50 border-black/[0.06] hover:bg-black/[0.04]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCurrent
                      ? "bg-white/20 text-white"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-black/10 text-black/60"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.num}
                </div>
                <div className="hidden sm:block truncate">
                  <span className="text-[11px] font-bold block truncate leading-tight">
                    {s.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ============================================================= */}
        {/* STEP 1: PURPOSE & ROLE FREEDOM                                */}
        {/* ============================================================= */}
        {step === 1 && (
          <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 text-xs">
            {/* Purpose Presets */}
            <div>
              <label className="block text-xs font-extrabold text-[#1A1A1A] mb-2">
                Choose a Purpose Preset or Create Custom Purpose:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {purposePresets.map((p) => {
                  const isSelected = purposePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-gradient-to-br from-amber-50 to-orange-50/70 border-[#FF6B08] shadow-2xs ring-1 ring-[#FF6B08]/30"
                          : "bg-white border-black/[0.07] hover:border-black/20 hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <div>
                        <span className="text-xl mb-1.5 block">{p.icon}</span>
                        <strong className="text-xs font-bold text-[#1A1A1A] block">
                          {p.title}
                        </strong>
                        <p className="text-[10.5px] text-black/55 mt-1 line-clamp-2 leading-tight">
                          {p.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-extrabold text-[#FF6B08]">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span>Selected</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Agent Name & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="block text-xs font-extrabold text-[#1A1A1A] mb-1.5">
                  Agent Persona Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya AI, Vikram, Dr. Aditi..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] focus:border-[#FF6B08] text-[#1A1A1A] font-bold placeholder:text-black/35 focus:outline-none transition-all text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1A1A1A] mb-1.5">
                  Official Title &amp; Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Admissions &amp; Scholarship Specialist"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] focus:border-[#FF6B08] text-[#1A1A1A] font-medium placeholder:text-black/35 focus:outline-none transition-all text-xs"
                />
              </div>
            </div>

            {/* Purpose Statement Freedom */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B08]" />
                  <span>Agent Purpose Statement &amp; Mission (Full Freedom)</span>
                </label>
                <span className="text-[10px] font-semibold text-black/50">
                  Defines core intelligence &amp; autonomous scope
                </span>
              </div>
              <textarea
                rows={3}
                value={customPurpose}
                onChange={(e) => setCustomPurpose(e.target.value)}
                placeholder="Describe what this agent is designed to achieve, which decisions it can take, and how it represents your institution..."
                className="w-full p-3.5 rounded-2xl text-xs bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] leading-relaxed focus:border-[#FF6B08] focus:outline-none transition-all"
              />
            </div>

            {/* Department & Persona Archetype */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08] cursor-pointer"
                >
                  <option value="University Admissions Desk">Admissions Office</option>
                  <option value="Student Finance & Loans">Student Finance & Loans</option>
                  <option value="Campus Tours & Student Concierge">Campus Tours & Concierge</option>
                  <option value="Executive & EdTech Training">Executive & EdTech</option>
                  <option value="Career & Placements Desk">Career & Placements</option>
                  <option value="Operations & Support">Operations & Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Persona Archetype
                </label>
                <select
                  value={personaArchetype}
                  onChange={(e) => setPersonaArchetype(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08] cursor-pointer"
                >
                  <option value="Empathetic Academic Counselor">Empathetic Academic Counselor</option>
                  <option value="Authoritative Executive Officer">Authoritative Executive Officer</option>
                  <option value="Energetic Student Advisor">Energetic Student Advisor</option>
                  <option value="Precision Technical Specialist">Precision Technical Specialist</option>
                  <option value="Warm & Friendly Concierge">Warm & Friendly Concierge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Primary KPI Goal
                </label>
                <input
                  type="text"
                  value={primaryKpi}
                  onChange={(e) => setPrimaryKpi(e.target.value)}
                  placeholder="e.g. Confirmed Tour Bookings"
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 2: CONTEXT & GROUNDING KNOWLEDGE FREEDOM                 */}
        {/* ============================================================= */}
        {step === 2 && (
          <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 text-xs">
            {/* Organization & Campus Dossier */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Institution / Business Name
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Operating Office Hours
                </label>
                <input
                  type="text"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Campus / Office Locations
                </label>
                <input
                  type="text"
                  value={campusLocation}
                  onChange={(e) => setCampusLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08]"
                />
              </div>
            </div>

            {/* Key Grounding Facts List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Grounding Facts, Pricing &amp; Knowledge Points</span>
                </label>
                <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {keyGroundingFacts.length} Verified Facts
                </span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {keyGroundingFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.08] flex items-center justify-between gap-2"
                  >
                    <span className="text-xs text-black/80 font-medium leading-relaxed">
                      • {fact}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeGroundingFact(index)}
                      className="text-black/40 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Fact Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add a new verified fact (e.g. Standard SLA turnaround time is 2 business hours)..."
                  value={newFactInput}
                  onChange={(e) => setNewFactInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addGroundingFact();
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border-2 border-black/[0.08] focus:border-[#FF6B08] text-xs font-medium focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addGroundingFact}
                  className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Fact</span>
                </button>
              </div>
            </div>

            {/* Zero-Hallucination Policy */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 via-sky-50 to-blue-50 border-2 border-cyan-200/80 flex items-start gap-3 text-xs text-[#0369A1]">
              <ShieldCheck className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-[#0C4A6E] block mb-0.5">
                  Strict Zero-Hallucination Guardrail Active
                </strong>
                <p className="text-[11px] text-[#0369A1] leading-relaxed">
                  The agent will strictly answer from your added institutional facts and linked vector documents. Any speculative inquiry outside this scope triggers an immediate warm transfer or gentle fallback.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 3: RULES, GUARDRAILS & ESCALATION FREEDOM               */}
        {/* ============================================================= */}
        {step === 3 && (
          <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* DO's */}
              <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/50 border-2 border-emerald-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Behavioral DO's ({dosRules.length})</span>
                  </span>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {dosRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white border border-emerald-200/60 flex items-center justify-between gap-2 text-[11px]"
                    >
                      <span className="text-emerald-950 font-medium">✓ {rule}</span>
                      <button
                        type="button"
                        onClick={() => removeDoRule(idx)}
                        className="text-black/30 hover:text-rose-600 cursor-pointer p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <input
                    type="text"
                    placeholder="Add mandatory rule..."
                    value={newDoInput}
                    onChange={(e) => setNewDoInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addDoRule();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addDoRule}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* DONT's */}
              <div className="space-y-2 p-4 rounded-2xl bg-rose-50/50 border-2 border-rose-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-rose-950 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Strict DON'Ts &amp; Guardrails ({dontsRules.length})</span>
                  </span>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {dontsRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white border border-rose-200/60 flex items-center justify-between gap-2 text-[11px]"
                    >
                      <span className="text-rose-950 font-medium">✕ {rule}</span>
                      <button
                        type="button"
                        onClick={() => removeDontRule(idx)}
                        className="text-black/30 hover:text-rose-600 cursor-pointer p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <input
                    type="text"
                    placeholder="Add forbidden topic / guardrail..."
                    value={newDontInput}
                    onChange={(e) => setNewDontInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addDontRule();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addDontRule}
                    className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Human Counselor Escalation & Fallback */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-extrabold text-[#1A1A1A] mb-1.5">
                  Escalation Human Desk Destination
                </label>
                <input
                  type="text"
                  value={escalationDesk}
                  onChange={(e) => setEscalationDesk(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1A1A1A] mb-1.5">
                  Zero-Hallucination Fallback Phrase
                </label>
                <input
                  type="text"
                  value={fallbackPhrase}
                  onChange={(e) => setFallbackPhrase(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-[#FAF8F5] border-2 border-black/[0.08] text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* STEP 4: VOICE SELECTION & VOICE CLONING FREEDOM               */}
        {/* ============================================================= */}
        {step === 4 && (
          <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 text-xs">
            {/* Mode Switcher: Ready-Made vs Clone a New Voice */}
            <div className="flex items-center gap-2 p-1.5 bg-[#FAF8F5] rounded-2xl border-2 border-black/[0.08]">
              <button
                type="button"
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setVoiceMode("library");
                }}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  voiceMode === "library"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-black/60 hover:text-black hover:bg-black/5"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>Select from Voice Library ({allVoices.length} Voices)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setVoiceMode("clone");
                }}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  voiceMode === "clone"
                    ? "bg-gradient-to-r from-[#FF6B08] to-[#E11D48] text-white shadow-xs"
                    : "text-black/60 hover:text-black hover:bg-black/5"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Clone a New Voice (Live Mic / Upload)</span>
              </button>
            </div>

            {/* TAB 4A: VOICE LIBRARY */}
            {voiceMode === "library" && (
              <div className="space-y-3.5">
                {/* Search & Filter Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                    <input
                      type="text"
                      placeholder="Search voice by name, dialect, accent..."
                      value={voiceSearch}
                      onChange={(e) => setVoiceSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF8F5] border border-black/[0.08] text-xs focus:outline-none focus:border-[#FF6B08]"
                    />
                  </div>

                  <select
                    value={voiceGenderFilter}
                    onChange={(e) => setVoiceGenderFilter(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-black/[0.08] text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Genders</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>

                  <select
                    value={voiceLanguageFilter}
                    onChange={(e) => setVoiceLanguageFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-black/[0.08] text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Languages</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">Indian English</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Bengali">Bengali</option>
                  </select>
                </div>

                {/* Voice Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
                  {filteredVoices.map((v) => {
                    const isSelected = selectedVoice?.id === v.id;
                    const isPlaying = playingVoiceId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => {
                          try { soundSynth.play("click"); } catch {}
                          setSelectedVoice(v);
                        }}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-gradient-to-r from-orange-50/70 via-white to-amber-50/60 border-[#FF6B08] shadow-md ring-1 ring-[#FF6B08]/20"
                            : "bg-white border-black/[0.07] hover:border-black/20 hover:bg-[#FAF8F5]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                                isSelected
                                  ? "bg-[#FF6B08] text-white shadow-xs"
                                  : v.isCloned
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              <Volume2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <strong className="text-xs font-bold text-[#1A1A1A]">
                                  {v.name}
                                </strong>
                                {v.isCloned && (
                                  <span className="text-[9.5px] font-extrabold bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded-md">
                                    Cloned
                                  </span>
                                )}
                              </div>
                              <span className="text-[10.5px] text-black/55 block">
                                {v.language} • {v.accent}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayVoiceSample(v);
                            }}
                            className="p-2 rounded-full hover:bg-orange-100 text-[#FF6B08] transition-colors cursor-pointer shrink-0"
                            title="Play sample audio"
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 fill-[#FF6B08]" />
                            ) : (
                              <Play className="w-4 h-4 fill-[#FF6B08]" />
                            )}
                          </button>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-black/[0.05] flex items-center justify-between text-[10.5px]">
                          <span className="text-black/60 font-medium">Tone: {v.tone}</span>
                          <span className="text-emerald-700 font-extrabold">{v.latencyMs}ms Latency</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Voice Tuning Sliders */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#FF6B08]" />
                      <span>Fine-Tune Audio Delivery: {selectedVoice.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundSynth.speak(selectedVoice.sampleTranscript, {
                          rate: speakingSpeed,
                          pitch: voicePitch,
                        });
                      }}
                      className="text-[11px] font-bold text-[#FF6B08] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-[#FF6B08]" />
                      <span>Test Tuning Preview</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-black/60 font-semibold">Speaking Pace / Rate:</span>
                        <span className="font-bold text-[#1A1A1A] font-mono">{speakingSpeed.toFixed(2)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.8"
                        max="1.3"
                        step="0.05"
                        value={speakingSpeed}
                        onChange={(e) => setSpeakingSpeed(parseFloat(e.target.value))}
                        className="w-full accent-[#FF6B08] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-black/60 font-semibold">Pitch / Timbre:</span>
                        <span className="font-bold text-[#1A1A1A] font-mono">{voicePitch.toFixed(2)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.85"
                        max="1.25"
                        step="0.05"
                        value={voicePitch}
                        onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                        className="w-full accent-[#FF6B08] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4B: CLONE A NEW VOICE FREEDOM */}
            {voiceMode === "clone" && (
              <div className="space-y-4 p-5 rounded-2xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-amber-500/5 border-2 border-purple-300/60 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-purple-950 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>Custom Neural Voice Cloner Studio</span>
                    </h3>
                    <p className="text-xs text-black/60 mt-0.5">
                      Clone your own voice, an admissions dean, or a corporate counselor with sub-130ms neural fidelity.
                    </p>
                  </div>
                  <span className="text-[10.5px] font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                    Enterprise Synthesizer
                  </span>
                </div>

                {/* Voice Clone Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                      Cloned Voice Label *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dean Vikram Rao Voice"
                      value={cloneVoiceName}
                      onChange={(e) => setCloneVoiceName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-xs font-bold focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                      Speaker Gender
                    </label>
                    <select
                      value={cloneGender}
                      onChange={(e) => setCloneGender(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-xs font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Neutral">Neutral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                      Primary Dialect / Accent
                    </label>
                    <input
                      type="text"
                      value={cloneLanguage}
                      onChange={(e) => setCloneLanguage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-black/[0.1] text-xs font-medium focus:outline-none"
                    />
                  </div>
                </div>

                {/* Dual Recording vs Upload Option */}
                <div className="p-4 rounded-2xl bg-white border border-purple-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      Audio Sample Source (Clean acoustic speech):
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCloneInputMode("mic")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                          cloneInputMode === "mic"
                            ? "bg-purple-600 text-white"
                            : "bg-slate-100 text-black/60 hover:text-black"
                        }`}
                      >
                        🎙️ Live Mic Record
                      </button>
                      <button
                        type="button"
                        onClick={() => setCloneInputMode("upload")}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                          cloneInputMode === "upload"
                            ? "bg-purple-600 text-white"
                            : "bg-slate-100 text-black/60 hover:text-black"
                        }`}
                      >
                        📁 File Upload
                      </button>
                    </div>
                  </div>

                  {/* Mode: Microphone */}
                  {cloneInputMode === "mic" && (
                    <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white transition-all ${
                            isRecording
                              ? "bg-rose-600 animate-pulse ring-4 ring-rose-200"
                              : recordingBlobUrl
                              ? "bg-emerald-600"
                              : "bg-purple-600"
                          }`}
                        >
                          <Mic className="w-6 h-6" />
                        </div>
                        <div>
                          <strong className="text-xs font-black text-purple-950 block">
                            {isRecording
                              ? `Recording live speech: 00:${recordingSeconds.toString().padStart(2, "0")}`
                              : recordingBlobUrl
                              ? "Live sample captured (Clean Waveform Verified)"
                              : "Click Start Recording and speak 5-10 seconds"}
                          </strong>
                          <span className="text-[11px] text-purple-800">
                            Read prompt: &ldquo;Hello, this is my authorized voice for the admissions AI assistant.&rdquo;
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isRecording ? (
                          <button
                            type="button"
                            onClick={stopRecording}
                            className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Square className="w-3.5 h-3.5 fill-white" />
                            <span>Stop Recording</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={startRecording}
                            className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>{recordingBlobUrl ? "Record Again" : "Start Live Recording"}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mode: File Upload */}
                  {cloneInputMode === "upload" && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-[#1A1A1A] block">
                            {cloneUploadedFile || "Select Clean Audio File (.wav, .mp3, .m4a)"}
                          </strong>
                          <span className="text-[11px] text-black/55">
                            Minimum 30 seconds uninterrupted speech sample
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setCloneUploadedFile("dean_conference_keynote_sample.wav")}
                        className="px-3.5 py-1.5 rounded-xl bg-white border border-black/10 hover:border-black text-xs font-bold cursor-pointer"
                      >
                        {cloneUploadedFile ? "Replace File" : "Choose File"}
                      </button>
                    </div>
                  )}
                </div>

                {/* Mandatory Consent Checkbox */}
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cloneConsentConfirmed}
                      onChange={(e) => setCloneConsentConfirmed(e.target.checked)}
                      className="mt-0.5 rounded text-purple-700 focus:ring-purple-600 accent-purple-700"
                    />
                    <span className="text-[11px] text-amber-950 leading-relaxed">
                      <strong>Mandatory Legal Voice Authorization:</strong> I certify that I own this voice or have explicit written and recorded consent from the individual whose voice is being cloned in compliance with DPDP data privacy standards.
                    </span>
                  </label>
                </div>

                {/* Synthesis Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <div>
                    {cloneProcessingState === "analyzing" && (
                      <span className="text-xs font-bold text-purple-700 animate-pulse flex items-center gap-2">
                        <Zap className="w-4 h-4 animate-spin" />
                        <span>Extracting phoneme vectors and neural embeddings (98.7% fidelity)...</span>
                      </span>
                    )}
                    {cloneProcessingState === "ready" && (
                      <span className="text-xs font-black text-emerald-700 flex items-center gap-1.5">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Cloned voice model ready &amp; added to your library!</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={
                      !cloneConsentConfirmed ||
                      !cloneVoiceName.trim() ||
                      (!recordingBlobUrl && !cloneUploadedFile) ||
                      cloneProcessingState === "analyzing"
                    }
                    onClick={handleSynthesizeClonedVoice}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer transition-all hover:scale-102 active:scale-98"
                  >
                    <span>Synthesize &amp; Register Cloned Voice</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================= */}
        {/* MODAL FOOTER CONTROLS                                         */}
        {/* ============================================================= */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-black/[0.08]">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-black/60 hover:text-[#1A1A1A] bg-white hover:bg-slate-100 border border-black/[0.08] transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5">
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-full text-xs font-black text-white bg-[#111111] hover:bg-black transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-102 active:scale-98"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDeployAgent}
                className="px-6 py-2.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#FF6B08] via-amber-500 to-[#E11D48] hover:brightness-110 transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg hover:scale-102 active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Deploy Autonomous Voice Agent</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
