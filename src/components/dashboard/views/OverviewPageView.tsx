"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Zap,
  Bot,
  Activity,
  ArrowRight,
  Search,
  Check,
  Play,
  Volume2,
  PhoneIncoming,
  PhoneOutgoing,
  Radio,
  Sliders,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Plus,
  ArrowUpDown,
  Headphones,
  Flame,
  Settings,
  Users,
  ListChecks,
  HeartPulse,
  GraduationCap,
  Tag,
  ExternalLink,
  X,
  Building2,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import ScheduleCallModal from "../modals/ScheduleCallModal";
import TestCallModal from "../modals/TestCallModal";
import TopUpCreditsModal from "../modals/TopUpCreditsModal";
import CreateAgentModal from "../modals/CreateAgentModal";
import StartCampaignModal from "../modals/StartCampaignModal";
import CallDrawer from "./CallDrawer";
import { RecentCallRecord, CallOutcome, DashboardAgent } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";
import BuildAIEmployeeBanner from "../components/BuildAIEmployeeBanner";
import TelephonyActivityHeatmap from "../components/TelephonyActivityHeatmap";
import { usePalette } from "@/context/PaletteContext";
import { getUnifiedContacts } from "@/lib/contactsHistory";
import { MySwaramPreferences, OnboardingChecklist, OnboardingStepId } from "@/types/settings";

interface CallRecord {
  id: string;
  phoneNumber: string;
  callerName: string;
  agentName: string;
  direction: "inbound" | "outbound";
  durationSeconds: number;
  timestamp: string;
  status: "completed" | "missed" | "in-progress";
  sentiment: "positive" | "neutral" | "needs-followup";
  outcome: string;
  latencyMs: number;
  extractedTags?: string[];
}

export default function OverviewPageView() {
  const router = useRouter();
  const { palette } = usePalette();
  const [selectedCallForDrawer, setSelectedCallForDrawer] = useState<RecentCallRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Timeframe and Filtering
  const [timeframe, setTimeframe] = useState<"today" | "7d" | "30d">("today");
  const [callFilter, setCallFilter] = useState<"all" | "inbound" | "outbound">("all");
  const [searchCallQuery, setSearchCallQuery] = useState("");
  const [lastInspectedId, setLastInspectedId] = useState<string | null>(null);

  // Modals state
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [createAgentOpen, setCreateAgentOpen] = useState(false);
  const [startCampaignOpen, setStartCampaignOpen] = useState(false);
  const [scheduleCallOpen, setScheduleCallOpen] = useState(false);
  const [testCallOpen, setTestCallOpen] = useState(false);

  // Context & Quotas
  const [workspaceName, setWorkspaceName] = useState("My Workspace");
  const [availableMinutes, setAvailableMinutes] = useState(0.0);
  const [totalContactsCount, setTotalContactsCount] = useState(0);
  const [agentList, setAgentList] = useState<DashboardAgent[]>([]);

  // Telephony calls ledger (starts clean with zero mock calls)
  const [callsList, setCallsList] = useState<CallRecord[]>([]);

  // User Personalization & Preferences
  const [preferences, setPreferences] = useState<MySwaramPreferences>({
    primaryGoals: ["customer_support", "customer_notifications", "appointment_reminders"],
    industry: "Healthcare & Clinic Services",
    mainAudience: "Patients & Inquiring Customers",
    preferredCallingMode: "ai_autonomous",
    typicalCampaignFrequency: "daily",
  });

  // Onboarding Setup Checklist (9 Steps)
  const [onboarding, setOnboarding] = useState<OnboardingChecklist>({
    completedSteps: ["complete_profile", "set_organization", "choose_goals", "configure_agent", "connect_phone"],
    isDismissed: false,
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    try {
      fetch("/api/settings")
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.settings) {
            if (json.settings.myPreferences) setPreferences(json.settings.myPreferences);
            if (json.settings.onboarding) setOnboarding(json.settings.onboarding);
            if (json.settings.workspace?.businessName) setWorkspaceName(json.settings.workspace.businessName);
          }
        })
        .catch(() => {});

      const storedUser = localStorage.getItem("swaram_user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.workspaceName) setWorkspaceName(u.workspaceName);
        if (u.organizationName) setWorkspaceName(u.organizationName);
        if (typeof u.availableMinutes === "number") setAvailableMinutes(u.availableMinutes);
      }
      const storedCalls = localStorage.getItem("swaram_calls");
      if (storedCalls) {
        try {
          const parsed = JSON.parse(storedCalls);
          if (Array.isArray(parsed)) {
            // Keep only real calls if any, purge all legacy mock calls
            const realCalls = parsed.filter(
              (c: any) =>
                c &&
                c.id &&
                !c.id.startsWith("mock") &&
                !c.id.startsWith("call_") &&
                !c.id.startsWith("CALL-") &&
                !c.id.startsWith("init_") &&
                c.callerName !== "Rahul Sharma" &&
                c.callerName !== "Ananya Iyer" &&
                c.callerName !== "Vikram Singhania" &&
                c.callerName !== "Sunita Roy" &&
                c.callerName !== "Kavita Rao" &&
                c.callerName !== "Aditya Joshi" &&
                !c.outcome?.toLowerCase().includes("b.tech") &&
                !c.outcome?.toLowerCase().includes("hostel") &&
                !c.outcome?.toLowerCase().includes("chancellor") &&
                !c.outcome?.toLowerCase().includes("campus tour")
            );
            if (realCalls.length !== parsed.length) {
              if (realCalls.length === 0) {
                localStorage.removeItem("swaram_calls");
              } else {
                localStorage.setItem("swaram_calls", JSON.stringify(realCalls));
              }
            }
            setCallsList(realCalls);
          }
        } catch {
          localStorage.removeItem("swaram_calls");
          setCallsList([]);
        }
      }
      const storedAgents = localStorage.getItem("swaram_agents");
      if (storedAgents) {
        try {
          const parsed = JSON.parse(storedAgents);
          if (Array.isArray(parsed)) {
            const cleanAgents = parsed.filter(
              (a: any) =>
                a &&
                a.name &&
                !a.name.includes("Admissions") &&
                !a.name.includes("Tuition & Aid")
            );
            if (cleanAgents.length !== parsed.length) {
              if (cleanAgents.length === 0) {
                localStorage.removeItem("swaram_agents");
              } else {
                localStorage.setItem("swaram_agents", JSON.stringify(cleanAgents));
              }
            }
            setAgentList(cleanAgents);
          }
        } catch {
          localStorage.removeItem("swaram_agents");
          setAgentList([]);
        }
      }
      const contacts = getUnifiedContacts();
      setTotalContactsCount(contacts.length);

      // Check action parameter for direct modal triggers from search index
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const action = params.get("action");
        if (action === "schedule") setScheduleCallOpen(true);
        else if (action === "topup") setTopUpOpen(true);
        else if (action === "testCall") setTestCallOpen(true);
        else if (action === "createAgent" || action === "create") setCreateAgentOpen(true);
        else if (action === "startCampaign" || action === "start") setStartCampaignOpen(true);
      }
    } catch {
      // Retain defaults
    }
  }, []);

  // Telephony Metrics Calculations
  const totalCalls = callsList.length;
  const inboundCallsCount = callsList.filter((c) => c.direction === "inbound").length;
  const outboundCallsCount = callsList.filter((c) => c.direction === "outbound").length;
  const totalDurationSec = callsList.reduce((acc, c) => acc + (c.durationSeconds || 0), 0);
  const minutesUsedToday = (totalDurationSec / 60).toFixed(1);
  const avgLatency = totalCalls > 0
    ? Math.round(callsList.reduce((acc, c) => acc + (c.latencyMs || 136), 0) / totalCalls)
    : 0;



  const openCallInDrawer = (call: CallRecord) => {
    try { soundSynth.play("click"); } catch {}
    const record: RecentCallRecord = {
      id: call.id,
      contactNumber: call.phoneNumber,
      contactName: call.callerName,
      agentName: call.agentName,
      direction: call.direction,
      duration: `${Math.floor(call.durationSeconds / 60)}m ${call.durationSeconds % 60}s`,
      durationSeconds: call.durationSeconds,
      outcome: (call.status === "completed" ? "Completed" : "Interested") as CallOutcome,
      timestamp: call.timestamp,
      timeAgo: call.timestamp,
      summary: call.outcome,
      sentimentScore: call.sentiment === "positive" ? 94 : 82,
      qualification: "Qualified",
      transcriptSnippet: `Candidate ${call.callerName} inquired about ${call.outcome} through ${call.agentName}.`,
      audioRecordingUrl: "https://actions.google.com/sounds/v1/speech/female_affirmation.ogg",
    };
    setSelectedCallForDrawer(record);
    setDrawerOpen(true);
  };

  const toggleOnboardingStep = async (stepId: OnboardingStepId) => {
    try { soundSynth.play("click"); } catch {}
    const current = onboarding.completedSteps || [];
    const exists = current.includes(stepId);
    const updatedSteps = exists ? current.filter((s) => s !== stepId) : [...current, stepId];
    const updated = { ...onboarding, completedSteps: updatedSteps };
    setOnboarding(updated);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "onboarding", data: updated }),
      });
    } catch {}
  };

  const setOnboardingDismissed = async (dismissed: boolean) => {
    try { soundSynth.play("click"); } catch {}
    const updated = { ...onboarding, isDismissed: dismissed };
    setOnboarding(updated);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "onboarding", data: updated }),
      });
    } catch {}
  };

  const ONBOARDING_STEPS_CONFIG = [
    {
      id: "complete_profile" as OnboardingStepId,
      label: "Complete profile",
      desc: "Name, photo & display language",
      href: "/dashboard/settings?tab=profile",
    },
    {
      id: "set_organization" as OnboardingStepId,
      label: "Set organization details",
      desc: "Company name, logo & calling hours",
      href: "/dashboard/settings?tab=organization",
    },
    {
      id: "choose_goals" as OnboardingStepId,
      label: "Choose communication goals",
      desc: "Select what you build with Swaram",
      href: "/dashboard/settings?tab=swaram-preferences",
    },
    {
      id: "configure_agent" as OnboardingStepId,
      label: "Configure an AI agent",
      desc: "Pick voice persona & prompt logic",
      action: () => setCreateAgentOpen(true),
    },
    {
      id: "add_knowledge" as OnboardingStepId,
      label: "Add knowledge sources",
      desc: "Upload reference FAQs & manuals",
      href: "/dashboard/knowledge",
    },
    {
      id: "connect_phone" as OnboardingStepId,
      label: "Connect a phone number",
      desc: "Setup PRI trunk or SIP cloud caller ID",
      href: "/dashboard/settings?tab=phone-calling",
    },
    {
      id: "import_contacts" as OnboardingStepId,
      label: "Import contacts",
      desc: "Upload CSV leads or CRM contacts",
      href: "/dashboard/contacts",
    },
    {
      id: "test_call" as OnboardingStepId,
      label: "Test a call",
      desc: "Simulate live interactive conversation",
      action: () => setTestCallOpen(true),
    },
    {
      id: "launch_campaign" as OnboardingStepId,
      label: "Launch the first campaign",
      desc: "Dispatch outbound voice batch",
      action: () => setScheduleCallOpen(true),
    },
  ];

  const completedOnboardingCount = (onboarding.completedSteps || []).length;
  const onboardingPercent = Math.min(100, Math.round((completedOnboardingCount / ONBOARDING_STEPS_CONFIG.length) * 100));
  const isAllOnboardingDone = completedOnboardingCount === ONBOARDING_STEPS_CONFIG.length;

  // Personalized Dashboard Mode
  const isAdmissions = preferences.primaryGoals.includes("admissions_enquiry");
  const isPublicAlerts =
    preferences.primaryGoals.includes("public_announcements") ||
    preferences.primaryGoals.includes("weather_service_alerts") ||
    preferences.primaryGoals.includes("awareness_campaigns");
  const isPromotions = preferences.primaryGoals.includes("business_promotions");

  // Filtered Telephony Call Ledger
  const filteredCalls = callsList.filter((call) => {
    const matchesFilter =
      callFilter === "all" ? true : call.direction === callFilter;
    const matchesSearch =
      call.callerName.toLowerCase().includes(searchCallQuery.toLowerCase()) ||
      call.phoneNumber.includes(searchCallQuery) ||
      call.agentName.toLowerCase().includes(searchCallQuery.toLowerCase()) ||
      call.outcome.toLowerCase().includes(searchCallQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-7 font-sans text-[#1A1A1A] max-w-[1480px] mx-auto select-none">
      {/* ========================================================================= */}
      {/* 1. TOP CARRIER STATUS & QUICK ACTIONS CONSOLE                             */}
      {/* ========================================================================= */}
      <div id="quick-actions-console" className="relative overflow-hidden bg-white rounded-[28px] border-2 border-black/[0.08] p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.035)] flex flex-col lg:flex-row lg:items-center justify-between gap-4 scroll-mt-24">


        <div>
          {/* Workspace Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border border-black/[0.08] shadow-2xs"
              style={{ backgroundColor: palette.colors.surfaceAlt, color: palette.colors.textPrimary }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.colors.accent }} />
              <span>{workspaceName}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              <Users className="w-3 h-3" />
              <span>{totalContactsCount.toLocaleString()} Leads in Directory</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>{totalCalls > 0 ? "SIP Channels Active" : "0 Channels Active"}</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-[22px] font-bold text-[#1A1A1A] tracking-tight mt-1.5">
            Enterprise AI Call Center Operations
          </h2>
          <p className="text-xs text-black/55 mt-0.5">
            Autonomous high-volume AI call center executing mass outbound campaigns &amp; 24/7 inbound caller inquiry queues.
          </p>
        </div>

        {/* Operational Actions */}
        <div className="flex items-center gap-3 flex-wrap self-start lg:self-center">
          {/* Test Voice Agent Button */}
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setTestCallOpen(true);
            }}
            className="group/test flex items-center gap-2 pl-3 pr-3.5 py-2.5 rounded-2xl text-xs font-bold bg-white hover:bg-[#FAF6EE] text-[#1A1A1A] border-2 border-black/[0.08] hover:border-black/20 shadow-xs transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF4ED] border border-[#FF6B08]/25 text-[#FF6B08] transition-transform group-hover/test:scale-110 shadow-2xs">
              <Volume2 className="w-3.5 h-3.5 stroke-[2.2]" />
            </span>
            <span className="tracking-tight">Test Voice Agent</span>
          </button>

          {/* Schedule Calls Button — primary accent style */}
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setScheduleCallOpen(true);
            }}
            className="group/sch flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-2xl text-xs font-bold shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
            style={{ backgroundColor: palette.colors.accent, color: palette.colors.accentText }}
          >
            <span className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 bg-white/20 transition-transform group-hover/sch:scale-110">
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span className="tracking-tight">Schedule Calls</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/70 -ml-0.5 transition-transform group-hover/sch:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1.5. ONBOARDING SETUP CHECKLIST (9 Steps, Dismiss / Resume)               */}
      {/* ========================================================================= */}
      {!onboarding.isDismissed && !isAllOnboardingDone ? (
        <div className="bg-white rounded-[24px] border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1D4]/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50]">
                <ListChecks className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#283A50]">
                    Swaram Getting Started Checklist
                  </h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
                    {completedOnboardingCount} of {ONBOARDING_STEPS_CONFIG.length} Completed
                  </span>
                </div>
                <p className="text-xs text-[#707684] mt-0.5">
                  Follow these 9 setup steps to operationalize your autonomous AI voice calling center.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="w-32 hidden sm:block">
                <div className="w-full h-2 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] overflow-hidden">
                  <div
                    className="h-full bg-[#283A50] rounded-full transition-all duration-300"
                    style={{ width: `${onboardingPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#707684] block text-right mt-1 font-semibold">
                  {onboardingPercent}% ready
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOnboardingDismissed(true)}
                className="text-xs font-semibold text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9] px-3 py-1.5 rounded-xl border border-[#E9E1D4] transition-colors cursor-pointer"
                title="Dismiss checklist"
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* 9 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ONBOARDING_STEPS_CONFIG.map((step, idx) => {
              const isChecked = (onboarding.completedSteps || []).includes(step.id);
              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                    isChecked
                      ? "bg-[#FAF5E9]/50 border-[#E9E1D4] opacity-85"
                      : "bg-white border-[#E9E1D4] hover:border-[#283A50]/40 shadow-2xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleOnboardingStep(step.id)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                      isChecked
                        ? "bg-[#283A50] text-white"
                        : "border border-[#E9E1D4] bg-white hover:border-[#283A50]"
                    }`}
                    title={isChecked ? "Mark incomplete" : "Mark complete"}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs font-bold leading-tight truncate ${
                          isChecked ? "line-through text-[#707684]" : "text-[#283A50]"
                        }`}
                      >
                        {idx + 1}. {step.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#707684] mt-0.5 leading-snug">
                      {step.desc}
                    </p>
                    <div className="mt-2">
                      {step.href ? (
                        <Link
                          href={step.href}
                          className="text-[11px] font-semibold text-[#283A50] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open Step</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={step.action}
                          className="text-[11px] font-semibold text-[#283A50] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Action</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : onboarding.isDismissed && !isAllOnboardingDone ? (
        <div className="bg-[#FAF5E9]/60 rounded-2xl border border-[#E9E1D4] px-4 py-2.5 flex items-center justify-between text-xs text-[#283A50]">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-[#707684]" />
            <span className="font-semibold">Setup Guide Hidden:</span>
            <span className="text-[#707684]">
              {completedOnboardingCount} of {ONBOARDING_STEPS_CONFIG.length} steps completed ({onboardingPercent}%).
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOnboardingDismissed(false)}
            className="font-bold underline text-[#283A50] hover:opacity-80 cursor-pointer"
          >
            Resume Setup Checklist
          </button>
        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* 1.6. PERSONALIZED FOCUS HUB (Adaptive to User Goals & Industry)           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[24px] border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1D4]/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50]">
              <Sparkles className="w-5 h-5 text-[#283A50]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-[#283A50]">
                  {isAdmissions
                    ? "Admissions & Enrollment Hub"
                    : isPublicAlerts
                    ? "Public Announcements & Service Alerts Command"
                    : isPromotions
                    ? "Business Promotions & Customer Growth Desk"
                    : "Customer Support & Appointment Automation Desk"}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C1F2D5] text-[#065F46] border border-[#16856B]/20">
                  Personalized
                </span>
              </div>
              <p className="text-xs text-[#707684] mt-0.5">
                {isAdmissions
                  ? "Tailored for student recruitment, applicant query resolution, open houses, and automated callbacks."
                  : isPublicAlerts
                  ? "Configured for mass civic advisories, community notifications, and time-critical alert broadcasts."
                  : isPromotions
                  ? "Fine-tuned for customer promotions, discount announcements, product follow-ups, and CSAT."
                  : "Optimized for 24/7 autonomous support, clinic appointments, inquiry triage, and escalation."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <Link
              href="/dashboard/settings?tab=swaram-preferences"
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#283A50] bg-[#FAF5E9] hover:bg-[#FAF3E4] border border-[#E9E1D4] transition-colors"
            >
              Edit Preferences →
            </Link>
          </div>
        </div>

        {/* Dynamic Focus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          {isAdmissions ? (
            <>
              <div
                onClick={() => setScheduleCallOpen(true)}
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#283A50] text-white flex items-center justify-center mb-2.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Launch Admissions Campaign</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Broadcast entrance reminders and scholarship counseling to prospective applicant lists.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Schedule outreach</span> →
                </span>
              </div>

              <Link
                href="/dashboard/callbacks"
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center justify-center mb-2.5">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Student Enquiry Follow-ups</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Review candidate queries requiring counselor callback or academic syllabus details.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>View enquiry queue</span> →
                </span>
              </Link>

              <Link
                href="/dashboard/knowledge"
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center justify-center mb-2.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Admissions Knowledge Sources</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Ground voice agents with program eligibility, hostel rules, fees, and campus dates.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Manage documents</span> →
                </span>
              </Link>
            </>
          ) : isPublicAlerts ? (
            <>
              <div
                onClick={() => setScheduleCallOpen(true)}
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#283A50] text-white flex items-center justify-center mb-2.5">
                    <Radio className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Broadcast Public Service Alert</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    High-concurrency mass alert dispatch for municipal advisories, weather warnings, or outages.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Start urgent alert</span> →
                </span>
              </div>

              <Link
                href="/dashboard/knowledge"
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center justify-center mb-2.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Approved Alert Directives</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Official protocols, safety measures, and helpline guidelines grounded into the AI.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Inspect guidelines</span> →
                </span>
              </Link>

              <Link
                href="/dashboard/contacts"
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center justify-center mb-2.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Civic Recipient Registry</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Manage area lists, emergency contact rosters, and regional language tags.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Review directory</span> →
                </span>
              </Link>
            </>
          ) : isPromotions ? (
            <>
              <div
                onClick={() => setScheduleCallOpen(true)}
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#283A50] text-white flex items-center justify-center mb-2.5">
                    <Tag className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Start Promotional Campaign</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Outreach with product announcements, seasonal discounts, and automated WhatsApp coupons.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Create promotion</span> →
                </span>
              </div>

              <Link
                href="/dashboard/callbacks"
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center justify-center mb-2.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Interested Customer Leads</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    High-intent prospects who expressed purchase intent during AI conversation.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Review hot leads</span> →
                </span>
              </Link>

              <div
                onClick={() => setTestCallOpen(true)}
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center justify-center mb-2.5">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Test Promotional Pitch</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Call test phone to audit objection handling, discounts, and natural tone.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Run audio test</span> →
                </span>
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => setScheduleCallOpen(true)}
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#283A50] text-white flex items-center justify-center mb-2.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Schedule Appointment Reminders</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Automated confirmation calls for upcoming appointments, clinic visits, or reservations.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Schedule calls</span> →
                </span>
              </div>

              <Link
                href="/dashboard/callbacks"
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center justify-center mb-2.5">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Unresolved Inquiries &amp; Callbacks</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Live tickets and caller requests waiting for supervisor attention.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Inspect callbacks</span> →
                </span>
              </Link>

              <div
                onClick={() => setTestCallOpen(true)}
                className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] hover:border-[#283A50] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center justify-center mb-2.5">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#283A50]">Test Voice Support Agent</h4>
                  <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                    Place an immediate two-way test call to check latency and knowledge accuracy.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#283A50] mt-3 inline-flex items-center gap-1">
                  <span>Simulate test call</span> →
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP METRIC CARDS (Vibrant High-Voltage Cards with Borders & Shapes)   */}
      {/* ========================================================================= */}
      <div id="overview-metric-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 scroll-mt-24">
        
        {/* CARD 1: Minutes Quota */}
        <div
          onClick={() => setTopUpOpen(true)}
          style={{
            backgroundColor: palette.colors.metricCard1.bg,
            color: palette.colors.metricCard1.text,
            borderColor: palette.colors.metricCard1.border,
            boxShadow: palette.colors.metricCard1.shadow,
          }}
          className="relative overflow-hidden rounded-[26px] border-2 p-5 sm:p-6 flex flex-col justify-between min-h-[185px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:brightness-[1.02] group select-none"
        >
          {/* Decorative geometric shapes */}
          <div
            className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: palette.colors.metricCard1.shapeFill,
              border: `2px solid ${palette.colors.metricCard1.shapeStroke}`,
            }}
          />
          <div
            className="absolute right-10 -bottom-3 w-16 h-16 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundColor: palette.colors.metricCard1.shapeFill }}
          />
          <div
            className="absolute right-3.5 top-3 w-8 h-8 rounded-xl rotate-12 pointer-events-none opacity-40 transition-transform duration-500 group-hover:rotate-45"
            style={{ border: `1.5px solid ${palette.colors.metricCard1.shapeStroke}` }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{
                  backgroundColor: palette.colors.metricCard1.iconBg,
                  color: palette.colors.metricCard1.iconColor,
                  borderColor: palette.colors.metricCard1.iconBorder || "rgba(255, 255, 255, 0.7)",
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 shrink-0 group-hover:scale-105 transition-transform"
              >
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs sm:text-[13px] tracking-tight whitespace-nowrap" style={{ color: palette.colors.metricCard1.text }}>
                Minutes Quota
              </span>
            </div>
            <span
              style={{
                backgroundColor: palette.colors.metricCard1.badgeBg,
                color: palette.colors.metricCard1.badgeText,
                borderColor: palette.colors.metricCard1.badgeBorder || "transparent",
              }}
              className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider leading-none flex items-center text-center whitespace-nowrap shadow-xs border"
            >
              {availableMinutes > 0 ? `${availableMinutes.toLocaleString()}m SLA` : "0m SLA"}
            </span>
          </div>

          {/* Value & Progress */}
          <div className="relative z-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[36px] sm:text-[42px] font-black tracking-tight leading-none" style={{ color: palette.colors.metricCard1.text }}>
                {availableMinutes.toLocaleString()}
              </span>
              <span className="text-xs font-bold opacity-80">min balance</span>
            </div>

            {/* Stepped Progress Bar */}
            <div className="w-full bg-black/15 h-2 rounded-full mt-3 overflow-hidden flex p-0.5 border border-black/10">
              <div
                className="bg-current h-full rounded-full opacity-90 transition-all duration-300"
                style={{ width: `${Math.min(100, (availableMinutes / 1000) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-2.5 text-[11px]">
              <span className="opacity-80 font-bold">{availableMinutes > 0 ? "Active Plan" : "No Minutes Balance"}</span>
              <span className="font-black group-hover:underline">
                + Top Up &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: Traffic Volume */}
        <div
          onClick={() => router.push("/dashboard/calls")}
          style={{
            backgroundColor: palette.colors.metricCard2.bg,
            color: palette.colors.metricCard2.text,
            borderColor: palette.colors.metricCard2.border,
            boxShadow: palette.colors.metricCard2.shadow,
          }}
          className="relative overflow-hidden rounded-[26px] border-2 p-5 sm:p-6 flex flex-col justify-between min-h-[185px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:brightness-[1.02] group select-none"
        >
          {/* Decorative geometric shapes */}
          <div
            className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: palette.colors.metricCard2.shapeFill,
              border: `2px solid ${palette.colors.metricCard2.shapeStroke}`,
            }}
          />
          <div
            className="absolute right-10 -bottom-3 w-16 h-16 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundColor: palette.colors.metricCard2.shapeFill }}
          />
          <div
            className="absolute right-3.5 top-3 w-8 h-8 rounded-xl rotate-12 pointer-events-none opacity-40 transition-transform duration-500 group-hover:rotate-45"
            style={{ border: `1.5px solid ${palette.colors.metricCard2.shapeStroke}` }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{
                  backgroundColor: palette.colors.metricCard2.iconBg,
                  color: palette.colors.metricCard2.iconColor,
                  borderColor: palette.colors.metricCard2.iconBorder || "rgba(255, 255, 255, 0.7)",
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 shrink-0 group-hover:scale-105 transition-transform"
              >
                <Phone className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm whitespace-nowrap" style={{ color: palette.colors.metricCard2.text }}>
                Traffic Volume
              </span>
            </div>
            <span
              style={{
                backgroundColor: palette.colors.metricCard2.badgeBg,
                color: palette.colors.metricCard2.badgeText,
                borderColor: palette.colors.metricCard2.badgeBorder || "transparent",
              }}
              className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider leading-none flex items-center text-center whitespace-nowrap shadow-xs border"
            >
              {totalCalls > 0 ? "ACTIVE TRAFFIC" : "STANDBY"}
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[36px] sm:text-[42px] font-black tracking-tight leading-none" style={{ color: palette.colors.metricCard2.text }}>
                {totalCalls.toLocaleString()}
              </span>
              <span className="text-xs font-bold opacity-80">calls today</span>
            </div>

            <div className="flex items-center gap-2 mt-2.5 text-xs font-bold flex-wrap">
              <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                <PhoneIncoming className="w-3 h-3" /> {inboundCallsCount.toLocaleString()} In
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                <PhoneOutgoing className="w-3 h-3" /> {outboundCallsCount.toLocaleString()} Out
              </span>
            </div>

            <div className="flex items-center justify-between pt-2.5 text-[11px]">
              <span className="opacity-80 font-bold">{minutesUsedToday} min consumed</span>
              <span
                style={{
                  backgroundColor: palette.colors.metricCard2.badgeBg,
                  color: palette.colors.metricCard2.badgeText,
                }}
                className="px-2 py-0.5 rounded-full font-black text-[10px] border border-white/20"
              >
                {totalCalls > 0
                  ? `${Math.round((callsList.filter((c) => c.status === "completed").length / totalCalls) * 100)}% PICKUP`
                  : "0% PICKUP"}
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: AI Workforce */}
        <div
          onClick={() => router.push("/dashboard/agents")}
          style={{
            backgroundColor: palette.colors.metricCard3.bg,
            color: palette.colors.metricCard3.text,
            borderColor: palette.colors.metricCard3.border,
            boxShadow: palette.colors.metricCard3.shadow,
          }}
          className="relative overflow-hidden rounded-[26px] border-2 p-5 sm:p-6 flex flex-col justify-between min-h-[185px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:brightness-[1.02] group select-none"
        >
          {/* Decorative geometric shapes */}
          <div
            className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: palette.colors.metricCard3.shapeFill,
              border: `2px solid ${palette.colors.metricCard3.shapeStroke}`,
            }}
          />
          <div
            className="absolute right-10 -bottom-3 w-16 h-16 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundColor: palette.colors.metricCard3.shapeFill }}
          />
          <div
            className="absolute right-3.5 top-3 w-8 h-8 rounded-xl rotate-12 pointer-events-none opacity-40 transition-transform duration-500 group-hover:rotate-45"
            style={{ border: `1.5px solid ${palette.colors.metricCard3.shapeStroke}` }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{
                  backgroundColor: palette.colors.metricCard3.iconBg,
                  color: palette.colors.metricCard3.iconColor,
                  borderColor: palette.colors.metricCard3.iconBorder || "rgba(255, 255, 255, 0.7)",
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 shrink-0 group-hover:scale-105 transition-transform"
              >
                <Bot className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm whitespace-nowrap" style={{ color: palette.colors.metricCard3.text }}>
                AI Workforce
              </span>
            </div>
            <span
              style={{
                backgroundColor: palette.colors.metricCard3.badgeBg,
                color: palette.colors.metricCard3.badgeText,
                borderColor: palette.colors.metricCard3.badgeBorder || "transparent",
              }}
              className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider leading-none flex items-center text-center whitespace-nowrap shadow-xs border"
            >
              {agentList.length > 0 ? `${agentList.length} ACTIVE` : "READY"}
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[36px] sm:text-[42px] font-black tracking-tight leading-none" style={{ color: palette.colors.metricCard3.text }}>
                {agentList.length}
              </span>
              <span className="text-xs font-bold opacity-80">agent personas</span>
            </div>

            <p className="text-[11px] font-bold mt-2 truncate opacity-90">
              {agentList.length > 0
                ? agentList.map((a) => a.name.split(" — ")[0]).join(" • ")
                : "No agents provisioned yet"}
            </p>

            <div className="flex items-center justify-between pt-2.5 text-[11px]">
              <span className="opacity-80 font-semibold">{agentList.length > 0 ? "Multi-lingual Voice" : "Deploy voice agent"}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCreateAgentOpen(true);
                }}
                className="font-black group-hover:underline cursor-pointer"
              >
                + Add Agent
              </button>
            </div>
          </div>
        </div>

        {/* CARD 4: Workspace Settings */}
        <div
          onClick={() => router.push("/dashboard/settings")}
          style={{
            backgroundColor: palette.colors.metricCard4.bg,
            color: palette.colors.metricCard4.text,
            borderColor: palette.colors.metricCard4.border,
            boxShadow: palette.colors.metricCard4.shadow,
          }}
          className="relative overflow-hidden rounded-[26px] border-2 p-5 sm:p-6 flex flex-col justify-between min-h-[185px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:brightness-[1.02] group select-none"
        >
          {/* Decorative geometric shapes */}
          <div
            className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: palette.colors.metricCard4.shapeFill,
              border: `2px solid ${palette.colors.metricCard4.shapeStroke}`,
            }}
          />
          <div
            className="absolute right-10 -bottom-3 w-16 h-16 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundColor: palette.colors.metricCard4.shapeFill }}
          />
          <div
            className="absolute right-3.5 top-3 w-8 h-8 rounded-xl rotate-12 pointer-events-none opacity-40 transition-transform duration-500 group-hover:rotate-45"
            style={{ border: `1.5px solid ${palette.colors.metricCard4.shapeStroke}` }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{
                  backgroundColor: palette.colors.metricCard4.iconBg,
                  color: palette.colors.metricCard4.iconColor,
                  borderColor: palette.colors.metricCard4.iconBorder || "rgba(255, 255, 255, 0.7)",
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 shrink-0 group-hover:rotate-45 transition-transform duration-300"
              >
                <Settings className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs sm:text-[13px] tracking-tight whitespace-nowrap" style={{ color: palette.colors.metricCard4.text }}>
                Workspace
              </span>
            </div>
            <span
              style={{
                backgroundColor: palette.colors.metricCard4.badgeBg,
                color: palette.colors.metricCard4.badgeText,
                borderColor: palette.colors.metricCard4.badgeBorder || "transparent",
              }}
              className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider leading-none flex items-center text-center whitespace-nowrap shadow-xs border"
            >
              CONFIGURED
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[34px] sm:text-[40px] font-black tracking-tight leading-none" style={{ color: palette.colors.metricCard4.text }}>
                Settings
              </span>
            </div>

            <p className="text-[11px] font-bold mt-2 truncate opacity-90">
              SIP Trunks &bull; API Keys &bull; Webhooks
            </p>

            <div className="flex items-center justify-between pt-2.5 text-[11px]">
              <span className="opacity-80 font-semibold">Telecom &amp; Governance</span>
              <span className="font-black flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Configure <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CENTRAL CONCURRENCY HEATMAP & HOURLY TELEPHONY TRACKS                  */}
      {/* ========================================================================= */}
      <div id="central-concurrency-section" className="w-full space-y-2 scroll-mt-24">
        <TelephonyActivityHeatmap currentCallsCount={callsList.length} />

        {/* Bottom Link Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 pt-1 text-xs">
          <span className="text-black/50 text-[11px]">
            Carrier trunk telemetry synced with sub-140ms voice latency SLA.
          </span>
          <Link
            href="/dashboard/calls"
            className="text-[#1A1A1A] font-bold hover:underline flex items-center gap-1 group text-xs self-start sm:self-center"
          >
            <span>View Verbatim Audio Transcripts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BUILD YOUR AI EMPLOYEE BANNER (PASTEL STYLE)                           */}
      {/* ========================================================================= */}
      <div id="build-ai-employee" className="scroll-mt-24">
        <BuildAIEmployeeBanner
          onOpenCreateModal={() => {
            setCreateAgentOpen(true);
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 5. REAL-TIME TELEPHONY CALL ACTIVITY & EXTRACTED OUTCOMES LEDGER          */}
      {/* ========================================================================= */}
      <div id="recent-calls-ledger" className="relative overflow-hidden bg-white rounded-[28px] border-2 border-black/[0.08] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.035)] space-y-4 scroll-mt-24">


        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.colors.success }} />
              <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                Real-Time Telephony Call Activity &amp; Extracted Outcomes Ledger
              </h3>
            </div>
            <p className="text-xs text-black/55 mt-0.5">
              Live call records, speaker turn durations, carrier latencies, and candidate qualification details.
            </p>
          </div>

          {/* Filter and Search controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Input */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-black/[0.08] text-xs"
              style={{ backgroundColor: palette.colors.surfaceAlt }}
            >
              <Search className="w-3.5 h-3.5 text-black/40" />
              <input
                type="text"
                placeholder="Filter caller, number, outcome..."
                value={searchCallQuery}
                onChange={(e) => setSearchCallQuery(e.target.value)}
                className="bg-transparent outline-none text-xs text-[#1A1A1A] placeholder:text-black/40 w-48 sm:w-72 md:w-80 font-medium"
              />
            </div>

            {/* Direction Filter Pills */}
            <div
              className="flex border-2 border-black/[0.08] rounded-full p-1 text-xs font-bold"
              style={{ backgroundColor: palette.colors.surfaceAlt }}
            >
              <button
                onClick={() => setCallFilter("all")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "all"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCallFilter("inbound")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "inbound"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                Inbound
              </button>
              <button
                onClick={() => setCallFilter("outbound")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "outbound"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                Outbound
              </button>
            </div>
          </div>
        </div>

        {/* Call Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-black/45 uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-2.5 px-3">Caller &amp; Number</th>
                <th className="py-2.5 px-3">Agent &amp; Time</th>
                <th className="py-2.5 px-3">Direction</th>
                <th className="py-2.5 px-3">Duration &amp; Latency</th>
                <th className="py-2.5 px-3">Extracted Outcome / Intent</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-black/40 text-xs">
                    No calls match the search query.
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => {
                  const isHighlighted = lastInspectedId === call.id;

                  return (
                    <tr
                      key={call.id}
                      onClick={() => openCallInDrawer(call)}
                      className={`hover:bg-black/[0.02] transition-colors cursor-pointer ${
                        isHighlighted ? "bg-black/[0.04]" : ""
                      }`}
                    >
                      {/* Caller & Number */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full border border-black/[0.08] flex items-center justify-center font-bold text-[11px] text-[#1A1A1A] shadow-2xs"
                            style={{ backgroundColor: palette.colors.surfaceAlt }}
                          >
                            {call.callerName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#1A1A1A]">{call.callerName}</div>
                            <div className="text-[11px] text-black/45">{call.phoneNumber}</div>
                          </div>
                        </div>
                      </td>

                      {/* Agent & Time */}
                      <td className="py-3 px-3">
                        <div className="font-medium text-[#1A1A1A]">{call.agentName}</div>
                        <div className="text-[11px] text-black/45">{call.timestamp}</div>
                      </td>

                      {/* Direction Badge */}
                      <td className="py-3 px-3">
                        {call.direction === "inbound" ? (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-2xs border"
                            style={{
                              backgroundColor: palette.colors.successBg,
                              color: palette.colors.successText,
                              borderColor: `${palette.colors.success}35`,
                            }}
                          >
                            <PhoneIncoming className="w-3 h-3" /> INBOUND
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-2xs border"
                            style={{
                              backgroundColor: palette.colors.metricCard4.bg,
                              color: palette.colors.metricCard4.text,
                              borderColor: `${palette.colors.metricCard4.border}45`,
                            }}
                          >
                            <PhoneOutgoing className="w-3 h-3" /> OUTBOUND
                          </span>
                        )}
                      </td>

                      {/* Duration & Latency */}
                      <td className="py-3 px-3">
                        <div className="font-semibold text-[#1A1A1A]">
                          {Math.floor(call.durationSeconds / 60)}m {call.durationSeconds % 60}s
                        </div>
                        <div className="text-[11px] text-black/45">{call.latencyMs} ms turnaround</div>
                      </td>

                      {/* Extracted Outcome / Intent */}
                      <td className="py-3 px-3">
                        <div className="font-medium text-[#1A1A1A] max-w-xs sm:max-w-sm truncate">
                          {call.outcome}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#F7EEDA] text-[#78350F] uppercase">
                            {call.sentiment}
                          </span>
                          {call.extractedTags?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/[0.04] text-black/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16856B]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openCallInDrawer(call);
                          }}
                          className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF3E4] text-[#1A1A1A] text-[11px] font-semibold border border-black/[0.08] shadow-2xs transition-colors cursor-pointer"
                        >
                          Inspect Audio
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Call Drawer */}
      <CallDrawer
        call={selectedCallForDrawer}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />


      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        currentCredits={availableMinutes}
      />
      <CreateAgentModal
        isOpen={createAgentOpen}
        onClose={() => setCreateAgentOpen(false)}
      />
      <StartCampaignModal
        isOpen={startCampaignOpen}
        onClose={() => setStartCampaignOpen(false)}
      />
      <ScheduleCallModal
        isOpen={scheduleCallOpen}
        onClose={() => setScheduleCallOpen(false)}
      />
      <TestCallModal
        isOpen={testCallOpen}
        onClose={() => setTestCallOpen(false)}
      />


    </div>
  );
}
