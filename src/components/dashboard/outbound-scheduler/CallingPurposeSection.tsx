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
    label: "🎓 Merit Scholarship & Admissions Counseling",
    data: {
      goal: "Verify Class 12 board examination marks and confirm eligibility for the 35% Chancellor Merit Scholarship.",
      keyInformation: "Apex Global Institutions has shortlisted the candidate based on JoSAA/State rank. 35% tuition waiver available if aggregate is >=85%.",
      questionsToAsk: "1. Did you score above 85% in PCM/PCB? 2. Have you shortlisted any other engineering colleges? 3. Can your family attend Saturday's open campus day?",
      desiredOutcome: "Secure candidate's verbal confirmation and book a VIP campus tour slot for Saturday 11:00 AM.",
      onInterested: "Confirm candidate's Saturday 11 AM appointment and immediately dispatch the campus map and scholarship eligibility token via WhatsApp.",
      onDeclined: "Politely thank the candidate, ask if they would like the digital course prospectus sent to their email, and conclude courteously.",
      humanHandoffCriteria: "If candidate asks for sports quota exemptions, customized payment installments, or speaks in regional language unable to be understood.",
      callEndingProtocol: "Summarize confirmed appointment details, provide Admissions Helpdesk direct line (+91 40 4590 1199), and offer warm sign-off.",
    },
  },
  {
    label: "🏛️ National Entrance CET Admit Card Verification",
    data: {
      goal: "Verify registered candidate attendance and test center allocation for Sunday's state entrance examination.",
      keyInformation: "Admit cards are now downloadable from the portal. Exam starts strictly at 09:30 AM with biometrics closing at 09:00 AM.",
      questionsToAsk: "1. Have you downloaded your Hall Ticket? 2. Do you have any questions regarding test center commute or allowed stationary?",
      desiredOutcome: "Confirm candidate attendance and verify test city/center details.",
      onInterested: "Log confirmation and send examination center GPS pin and guidelines to registered phone.",
      onDeclined: "Log non-attendance reason (e.g. opting for other exam) and update CRM registry.",
      humanHandoffCriteria: "If candidate reports name spelling mismatch on admit card or photo upload error.",
      callEndingProtocol: "Wish the candidate best of luck, remind about original photo ID requirement, and conclude call.",
    },
  },
  {
    label: "💳 Fee Schedule Installment Follow-up",
    data: {
      goal: "Follow up on provisional seat allotment token and explain flexible tuition fee installment options.",
      keyInformation: "Term installment 1 due in 7 days. Flexible 40-30-30 schedule available with 0% interest education loan subvention via SBI/HDFC.",
      questionsToAsk: "1. Have you received the provisional seat allotment letter? 2. Would you like assistance with education loan documentation?",
      desiredOutcome: "Confirm date of installment payment or schedule consultation with student finance desk.",
      onInterested: "Send fee invoice link and bank loan sanction support guide via WhatsApp.",
      onDeclined: "Inquire if candidate wishes to surrender provisional hold or transfer deposit to another program.",
      humanHandoffCriteria: "If parent requests special installment extension beyond the 7-day grace period.",
      callEndingProtocol: "Reiterate payment deadline, share finance desk contact email, and offer helpful assistance.",
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
              placeholder="e.g. Verify candidate's Class 12 board marks and determine eligibility for 35% Chancellor Merit Scholarship."
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
              placeholder="e.g. State rank was shortlisted for direct counseling; explain scholarship percentage and limited seats."
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
              placeholder="e.g. Did you score above 85%? Have you confirmed Saturday tour attendance? Any hostel inquiries?"
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
