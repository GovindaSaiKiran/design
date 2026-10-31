"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  Volume2,
  Megaphone,
  Radio,
  HeartPulse,
  Tag,
  BellRing,
  GraduationCap,
  CalendarCheck,
  MessageSquare,
  Sliders,
  Check,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { MySwaramPreferences, SwaramPrimaryGoal } from "@/types/settings";

interface MySwaramPreferencesTabProps {
  initialPreferences?: MySwaramPreferences;
  onSave: (updated: MySwaramPreferences) => Promise<boolean>;
}

interface GoalOption {
  id: SwaramPrimaryGoal;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const GOAL_OPTIONS: GoalOption[] = [
  {
    id: "customer_support",
    title: "Customer Support Automation",
    description: "Autonomous 24/7 call center tier-1 resolution, FAQs, and ticket logging.",
    icon: PhoneCall,
  },
  {
    id: "bulk_voice",
    title: "Bulk Voice Campaigns",
    description: "High-throughput concurrent outreach to contact lists with live transfer.",
    icon: Megaphone,
  },
  {
    id: "public_announcements",
    title: "Public & Government Announcements",
    description: "Official civic notifications, municipal advisories, and welfare updates.",
    icon: Radio,
  },
  {
    id: "weather_service_alerts",
    title: "Weather & Service Alerts",
    description: "Real-time urgency broadcasts for outages, transit updates, and weather alarms.",
    icon: BellRing,
  },
  {
    id: "awareness_campaigns",
    title: "Awareness Campaigns",
    description: "Public health, compliance, safety protocols, and community drives.",
    icon: HeartPulse,
  },
  {
    id: "business_promotions",
    title: "Business Promotions",
    description: "Product launches, loyalty promotions, seasonal offers, and win-back calls.",
    icon: Tag,
  },
  {
    id: "customer_notifications",
    title: "Customer Notifications",
    description: "Transactional call updates, dispatch statuses, and invoice receipts.",
    icon: BellRing,
  },
  {
    id: "admissions_enquiry",
    title: "Admissions & Enquiry Calls",
    description: "Student recruitment, prospective applicant verification, and open house follow-ups.",
    icon: GraduationCap,
  },
  {
    id: "appointment_reminders",
    title: "Appointment Reminders",
    description: "Clinic visits, consultations, service appointments, and confirmation RSVPs.",
    icon: CalendarCheck,
  },
  {
    id: "feedback_collection",
    title: "Customer Feedback Collection",
    description: "Post-service CSAT, NPS surveys, and voice feedback analysis.",
    icon: MessageSquare,
  },
  {
    id: "whatsapp_automation",
    title: "WhatsApp Automation",
    description: "Multi-channel voice-to-WhatsApp collateral, brochures, and links.",
    icon: MessageSquare,
  },
  {
    id: "custom_communication",
    title: "Other Custom Communication Goals",
    description: "Specialized workflows, custom CRM webhooks, and unique telephony triggers.",
    icon: Sliders,
  },
];

const INDUSTRIES = [
  "Hospital & Healthcare Services",
  "Higher Education & Institutes",
  "E-commerce & Retail",
  "Financial Services & Banking",
  "Real Estate & Property Development",
  "Government & Civic Organizations",
  "Logistics & Field Services",
  "Automotive & Dealerships",
  "B2B SaaS & Tech",
  "Other Industry",
];

const AUDIENCES = [
  "Patients & Healthcare Clients",
  "Prospective Applicants & Students",
  "Online Shoppers & E-commerce Buyers",
  "General Public & Citizens",
  "Corporate Clients & Enterprises",
  "Subscribers & Account Holders",
  "Field Technicians & Vendors",
];

const POPULAR_LANGUAGES = [
  "English",
  "Hindi",
  "Telugu",
  "Tamil",
  "Kannada",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Malayalam",
];

const CHANNELS = ["Voice Call (AI Autonomous)", "WhatsApp Automation", "SMS Shortlink", "CRM Webhook Dispatch"];

export default function MySwaramPreferencesTab({
  initialPreferences,
  onSave,
}: MySwaramPreferencesTabProps) {
  const [preferences, setPreferences] = useState<MySwaramPreferences>(
    initialPreferences || {
      primaryGoals: ["customer_support", "customer_notifications"],
      customGoalText: "",
      industry: "Hospital & Healthcare Services",
      mainAudience: "Patients & Healthcare Clients",
      preferredLanguages: ["English", "Hindi"],
      preferredChannels: ["Voice Call (AI Autonomous)", "WhatsApp Automation"],
      typicalCampaignFrequency: "daily",
      preferredCallingMode: "ai_autonomous",
      technicalExperienceLevel: "intermediate",
      mainBusinessObjective: "Automate call answering, routine reminders, and customer support with natural human-like voice agents.",
    }
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleGoal = (goalId: SwaramPrimaryGoal) => {
    setPreferences((prev) => {
      const exists = prev.primaryGoals.includes(goalId);
      const updated = exists
        ? prev.primaryGoals.filter((g) => g !== goalId)
        : [...prev.primaryGoals, goalId];
      return { ...prev, primaryGoals: updated };
    });
  };

  const toggleLanguage = (lang: string) => {
    setPreferences((prev) => {
      const current = prev.preferredLanguages || [];
      const updated = current.includes(lang)
        ? current.filter((l) => l !== lang)
        : [...current, lang];
      return { ...prev, preferredLanguages: updated };
    });
  };

  const toggleChannel = (channel: string) => {
    setPreferences((prev) => {
      const current = prev.preferredChannels || [];
      const updated = current.includes(channel)
        ? current.filter((c) => c !== channel)
        : [...current, channel];
      return { ...prev, preferredChannels: updated };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (preferences.primaryGoals.length === 0) {
      setErrorMessage("Please select at least one primary communication goal.");
      return;
    }

    setIsSaving(true);
    const success = await onSave({
      ...preferences,
      lastUpdated: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setIsSaving(false);

    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } else {
      setErrorMessage("Failed to save preferences. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Swaram Preferences"
        badge="Personalization Engine"
        whatIsThis="Your tailored goals and operational intent. Tells Swaram what you build and who you serve."
        whyDoINeedIt="Your responses automatically personalize your dashboard widgets, quick-start templates, and voice suggestions."
        whatToDoNext="Select what you want to achieve, your primary audience, and update these choices anytime as your workflows evolve."
      >
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "Saving..." : "Save Preferences"}</span>
        </button>
      </SectionHeader>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-[#C1F2D5]/30 border border-[#16856B]/30 flex items-center gap-3 text-xs text-[#065F46] animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
          <div>
            <p className="font-semibold">Preferences Saved Successfully</p>
            <p className="text-[11px] text-[#065F46]/80">
              Your dashboard, campaign templates, and quick actions have been adapted to your communication goals.
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
        {/* SECTION 1: PRIMARY COMMUNICATION GOALS (Multi-select) */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E9E1D4]/70">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#283A50] flex items-center gap-2">
                <span>What do you primarily want to achieve using Swaram?</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
                  Multiple selections allowed
                </span>
              </h3>
              <p className="text-xs text-[#707684] mt-0.5">
                Choose one or more operational priorities. You can adjust these at any time.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#283A50] bg-[#FAF5E9] px-3 py-1 rounded-lg border border-[#E9E1D4]">
              {preferences.primaryGoals.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {GOAL_OPTIONS.map((goal) => {
              const isSelected = preferences.primaryGoals.includes(goal.id);
              const Icon = goal.icon;
              return (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 flex flex-col justify-between select-none ${
                    isSelected
                      ? "bg-[#FAF5E9] border-[#283A50] shadow-xs ring-1 ring-[#283A50]/20"
                      : "bg-white hover:bg-[#FAF5E9]/40 border-[#E9E1D4]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#283A50] text-white"
                          : "bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#283A50] text-white"
                          : "border border-[#E9E1D4] bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#283A50] leading-snug">
                      {goal.title}
                    </h4>
                    <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom goal input if 'custom_communication' is selected */}
          {preferences.primaryGoals.includes("custom_communication") && (
            <div className="mt-4 p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] space-y-1.5 animate-in fade-in duration-200">
              <label className="text-xs font-semibold text-[#283A50] block">
                Describe your custom communication objective:
              </label>
              <input
                type="text"
                value={preferences.customGoalText || ""}
                onChange={(e) =>
                  setPreferences({ ...preferences, customGoalText: e.target.value })
                }
                placeholder="e.g. Automated field engineer dispatch confirmation and GPS location collection"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E1D4] bg-white focus:outline-none focus:border-[#283A50] text-[#283A50]"
              />
            </div>
          )}
        </div>

        {/* SECTION 2: OPERATIONAL CONTEXT (Optional) */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="pb-3 border-b border-[#E9E1D4]/70">
            <h3 className="text-sm sm:text-base font-bold text-[#283A50]">
              Operational Profile &amp; Audience (Optional)
            </h3>
            <p className="text-xs text-[#707684] mt-0.5">
              These optional details help fine-tune tone, vocabulary, and default scheduling rules. None of these fields are mandatory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Primary Industry
              </label>
              <select
                value={preferences.industry || ""}
                onChange={(e) => setPreferences({ ...preferences, industry: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              >
                <option value="">Select industry (optional)</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Main Audience
              </label>
              <select
                value={preferences.mainAudience || ""}
                onChange={(e) => setPreferences({ ...preferences, mainAudience: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              >
                <option value="">Select audience (optional)</option>
                {AUDIENCES.map((aud) => (
                  <option key={aud} value={aud}>
                    {aud}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Typical Campaign Frequency
              </label>
              <select
                value={preferences.typicalCampaignFrequency || "daily"}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    typicalCampaignFrequency: e.target.value as any,
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              >
                <option value="daily">Daily Continuous (Inbound inquiries &amp; live tickets)</option>
                <option value="weekly">Weekly Recurring Batches (Follow-ups &amp; updates)</option>
                <option value="monthly">Monthly Broadcasts (Statements &amp; reminders)</option>
                <option value="ad_hoc">Ad-hoc / On-demand Only (Spur-of-the-moment campaigns)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Preferred Calling Mode
              </label>
              <select
                value={preferences.preferredCallingMode || "ai_autonomous"}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    preferredCallingMode: e.target.value as any,
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              >
                <option value="ai_autonomous">AI Autonomous (Full two-way natural dialogue)</option>
                <option value="interactive_ivr">Interactive Smart IVR (DTMF keypress + speech)</option>
                <option value="agent_assisted">Agent-Assisted (AI qualifies, warms up &amp; transfers)</option>
                <option value="hybrid">Hybrid (Contextual escalation to human agents)</option>
              </select>
            </div>
          </div>

          {/* Languages selection */}
          <div>
            <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
              Preferred Languages for Customer Conversations
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {POPULAR_LANGUAGES.map((lang) => {
                const isSelected = (preferences.preferredLanguages || []).includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#283A50] text-white border-[#283A50]"
                        : "bg-white hover:bg-[#FAF5E9] text-[#283A50] border-[#E9E1D4]"
                    }`}
                  >
                    {lang} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Channels selection */}
          <div>
            <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
              Preferred Communication Channels
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {CHANNELS.map((channel) => {
                const isSelected = (preferences.preferredChannels || []).includes(channel);
                return (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => toggleChannel(channel)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#283A50] text-white border-[#283A50]"
                        : "bg-white hover:bg-[#FAF5E9] text-[#283A50] border-[#E9E1D4]"
                    }`}
                  >
                    {channel} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Technical level & Main objective */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Technical Experience Level
              </label>
              <select
                value={preferences.technicalExperienceLevel || "intermediate"}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    technicalExperienceLevel: e.target.value as any,
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50]"
              >
                <option value="beginner">Beginner (Guided walkthroughs &amp; simple forms)</option>
                <option value="intermediate">Intermediate (Standard campaigns &amp; knowledge base)</option>
                <option value="advanced">Advanced (Webhooks, custom SIP trunking &amp; APIs)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#283A50] mb-1.5">
                Main Business Objective
              </label>
              <textarea
                rows={2}
                value={preferences.mainBusinessObjective || ""}
                onChange={(e) =>
                  setPreferences({ ...preferences, mainBusinessObjective: e.target.value })
                }
                placeholder="e.g. Ensure all customer calls are answered within 3 seconds and follow-up receipts are sent instantly via WhatsApp."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E1D4] bg-white text-[#283A50] focus:outline-none focus:border-[#283A50] resize-none"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SAVE BAR */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E9E1D4] shadow-xs">
          <p className="text-xs text-[#707684]">
            Changes take effect immediately across all dashboard shortcuts and campaign assistants.
          </p>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving Preferences..." : "Save My Preferences"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

