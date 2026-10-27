"use client";

import React from "react";
import {
  Target,
  Sparkles,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  PhoneForwarded,
  PhoneOff,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import { StructuredCallingPurpose } from "@/types/schedule";

interface CallingPurposeSectionProps {
  purpose: StructuredCallingPurpose;
  onChangePurpose: (updated: StructuredCallingPurpose) => void;
}

const TEMPLATES: { label: string; data: StructuredCallingPurpose }[] = [
  {
    label: "💼 Enterprise Lead Qualification & Discovery",
    data: {
      goal: "Verify prospective client requirements and confirm eligibility for our dedicated enterprise voice telephony tier.",
      keyInformation: "Our voice platform provides low-latency telephony infrastructure, carrier PRI trunks, and custom LLM grounding. Special enterprise onboarding terms available this month.",
      questionsToAsk: "1. What is your estimated monthly call volume? 2. Are you looking to integrate with an existing CRM? 3. Can your team attend an executive demo this week?",
      desiredOutcome: "Confirm client interest and book an executive demonstration slot with a solution engineer.",
      onInterested: "Confirm demo time and dispatch calendar invite and product brief via WhatsApp and email.",
      onDeclined: "Politely thank the contact, offer to send a digital product overview, and close courteously.",
      humanHandoffCriteria: "If client requests complex custom security audits, specialized compliance terms, or immediate live engineer transfer.",
      callEndingProtocol: "Summarize scheduled consultation time, share support desk helpline, and provide warm sign-off.",
    },
  },
  {
    label: "📋 Customer Renewal & Service Cadence",
    data: {
      goal: "Engage active accounts approaching agreement renewal and review telephony utilization metrics.",
      keyInformation: "Account eligible for preferred renewal rates and expanded concurrent call lines upon early confirmation.",
      questionsToAsk: "1. Have you reviewed your team's monthly minute utilization report? 2. Are there any new channels (e.g. WhatsApp, SMS) you wish to activate?",
      desiredOutcome: "Secure verbal renewal commitment or schedule an account review meeting.",
      onInterested: "Log renewal confirmation and dispatch agreement documentation via secure portal.",
      onDeclined: "Log feedback, address potential questions regarding pricing or features, and flag for account manager.",
      humanHandoffCriteria: "If customer reports critical service dissatisfaction or requests custom contract terms.",
      callEndingProtocol: "Reiterate support channels, thank them for their business partnership, and conclude call.",
    },
  },
  {
    label: "💳 Invoice & Payment Schedule Verification",
    data: {
      goal: "Follow up on upcoming billing cycle and ensure invoice routing details are up to date.",
      keyInformation: "Tax invoices generated automatically with net-30 terms. Automated payment via corporate card or bank transfer supported.",
      questionsToAsk: "1. Has your accounts department received the latest monthly statement? 2. Do you require updated purchase order references?",
      desiredOutcome: "Confirm scheduled payment clearance date or connect with finance desk.",
      onInterested: "Send updated invoice copy and payment coordinates via WhatsApp and email.",
      onDeclined: "Inquire if invoice requires adjustment or dispute resolution review.",
      humanHandoffCriteria: "If contact requests invoice revision, credit notes, or escalation to accounts head.",
      callEndingProtocol: "Confirm agreed payment timeline, share finance desk contact email, and offer courteous sign-off.",
    },
  },
];

export default function CallingPurposeSection({
  purpose,
  onChangePurpose,
}: CallingPurposeSectionProps) {
  const updateField = (field: keyof StructuredCallingPurpose, value: string) => {
    onChangePurpose({
      ...purpose,
      [field]: value,
    });
  };

  const handleApplyTemplate = (tmpl: StructuredCallingPurpose) => {
    onChangePurpose(tmpl);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#707684]">
              Step 3 · Call Objective &amp; Logic
            </span>
            <span className="text-xs text-[#283A50]/30">•</span>
            <span className="text-xs text-[#707684]">Define the Exact Mission of These Calls</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#283A50] mt-0.5">
            What is the goal of these calls?
          </h3>
          <p className="text-xs text-[#707684] mt-0.5 leading-relaxed">
            Keep purpose distinct from reference documents: purpose defines the tactical objective and dialogue rules, while knowledge sources provide supporting facts.
          </p>
        </div>

        {/* Quick Template Picker */}
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[11px] text-[#707684] font-medium">Quick Template:</span>
          <select
            onChange={(e) => {
              const idx = Number(e.target.value);
              if (idx >= 0 && TEMPLATES[idx]) {
                handleApplyTemplate(TEMPLATES[idx].data);
              }
            }}
            defaultValue=""
            className="bg-white border border-[#E9E1D4] rounded-lg px-2.5 py-1.5 text-xs text-[#283A50] font-medium focus:outline-none focus:ring-1 focus:ring-[#283A50]"
          >
            <option value="" disabled>Choose a proven template...</option>
            {TEMPLATES.map((t, i) => (
              <option key={i} value={i}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4">
        {/* Row 1: Why Calling & What to Communicate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#283A50] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#283A50]" />
              <span>Why the Agent is Calling (Primary Objective) *</span>
            </label>
            <textarea
              rows={3}
              value={purpose.goal}
              onChange={(e) => updateField("goal", e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl p-3 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white resize-none"
              placeholder="e.g. Verify prospect requirements, qualify volume tier, and schedule discovery demonstration."
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#283A50] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#283A50]" />
              <span>What it Should Communicate (Key Talking Points) *</span>
            </label>
            <textarea
              rows={3}
              value={purpose.keyInformation}
              onChange={(e) => updateField("keyInformation", e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl p-3 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white resize-none"
              placeholder="e.g. Highlight sub-140ms voice latency, multi-carrier SIP trunking, and native CRM integrations."
              required
            />
          </div>
        </div>

        {/* Row 2: Questions to Ask & Desired Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#283A50] flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#283A50]" />
              <span>What Questions it Should Ask</span>
            </label>
            <textarea
              rows={3}
              value={purpose.questionsToAsk}
              onChange={(e) => updateField("questionsToAsk", e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl p-3 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white resize-none"
              placeholder="e.g. What is your estimated monthly call volume? Are you looking to integrate with an existing PBX or CRM?"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#283A50] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8066]" />
              <span>Desired Outcome (Success Criteria) *</span>
            </label>
            <textarea
              rows={3}
              value={purpose.desiredOutcome}
              onChange={(e) => updateField("desiredOutcome", e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl p-3 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white resize-none"
              placeholder="e.g. Candidate confirms provisional registration and accepts Saturday 11 AM campus visit booking."
              required
            />
          </div>
        </div>

        {/* Row 3: If Interested vs If Declined */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E9E1D4]/80">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2E8066] flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#2E8066]" />
              <span>What to Do if the Contact is Interested</span>
            </label>
            <input
              type="text"
              value={purpose.onInterested}
              onChange={(e) => updateField("onInterested", e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl px-3 py-2 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white"
              placeholder="e.g. Confirm Saturday 11 AM appointment and send campus directions pass via WhatsApp."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#707684] flex items-center gap-1.5">
              <PhoneOff className="w-3.5 h-3.5 text-[#707684]" />
              <span>What to Do if the Contact Declines</span>
            </label>
            <input
              type="text"
              value={purpose.onDeclined}
              onChange={(e) => updateField("onDeclined", e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl px-3 py-2 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white"
              placeholder="e.g. Courteously thank them, ask if they prefer an email summary, and do not persist."
            />
          </div>
        </div>

        {/* Row 4: Human Handoff & How Call Ends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E9E1D4]/80">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#283A50] flex items-center gap-1.5">
              <PhoneForwarded className="w-3.5 h-3.5 text-amber-600" />
              <span>When to Hand Off to a Human (Escalation Trigger)</span>
            </label>
            <input
              type="text"
              value={purpose.humanHandoffCriteria || ""}
              onChange={(e) => updateField("humanHandoffCriteria", e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl px-3 py-2 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white"
              placeholder="e.g. If caller requests fee installment concessions, sports quota review, or becomes agitated."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#283A50] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#283A50]" />
              <span>How the Call Should End (Wrap-up Protocol)</span>
            </label>
            <input
              type="text"
              value={purpose.callEndingProtocol || ""}
              onChange={(e) => updateField("callEndingProtocol", e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl px-3 py-2 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white"
              placeholder="e.g. Summarize confirmed next steps, mention admissions helpline (+91 40 4590 1199), warm sign-off."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
