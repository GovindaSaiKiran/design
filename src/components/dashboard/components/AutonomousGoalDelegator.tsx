"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Check,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Database,
  PhoneCall,
  Send,
  Sliders,
  Zap,
  RotateCcw,
} from "lucide-react";

interface AutonomousGoalDelegatorProps {
  onStartCampaign?: (title: string, count: number) => void;
}

export default function AutonomousGoalDelegator({
  onStartCampaign,
}: AutonomousGoalDelegatorProps) {
  const quickGoals = [
    {
      id: "merit",
      label: "Merit Scholarship Grant",
      prompt:
        "Draft the September admissions qualification batch and verify 35% merit scholarships for 85%+ PCM scorers in Hindi and Telugu",
      records: 1240,
      steps: [
        "Pull 1,240 candidate records & PCM scores from JoSAA state rank database",
        "Match 35% - 50% Chancellor Merit Scholarship fee waivers per candidate",
        "Synthesizing Bulbul V3 Neural Voice calls in Hindi & Telugu (140ms first-byte stream)",
        "Assemble confirmed applicant dossier and dispatch WhatsApp counseling passes",
      ],
    },
    {
      id: "seat",
      label: "B.Tech Seat Confirmation",
      prompt:
        "Contact verified JEE candidates for Computer Science round-2 seat reservation and deposit confirmation in Kannada & English",
      records: 840,
      steps: [
        "Import CS & AI shortlist from central counseling allocation portal",
        "Verify seat lock status and calculate semester deposit vouchers",
        "Deploy Ishita & Maya agents for personalized confirmation calls",
        "Update registrar ERP with confirmed candidates and send payment links",
      ],
    },
    {
      id: "hostel",
      label: "Hostel Allotment Sync",
      prompt:
        "Run outreach to out-of-state first-year admissions for AC campus residency, mess preferences, and guardian affidavits",
      records: 520,
      steps: [
        "Filter non-local enrollees needing campus residential accommodation",
        "Present block allocation tiers (Twin AC, Deluxe, Standard)",
        "Record student dietary choices and roommate preferences via voice",
        "Push approved room tokens directly into Campus ERP & Warden desk",
      ],
    },
    {
      id: "fees",
      label: "Fee Installment Reminder",
      prompt:
        "Outbound reminder for 2nd installment tuition fee payment with instant UPI & NetBanking payment links over WhatsApp",
      records: 615,
      steps: [
        "Sync ledger balances from Finance & Accounts SAP system",
        "Call fee payers with polite empathetic Hindi and Marathi reminders",
        "Offer flexible 2-part installment scheduling for approved guardians",
        "Trigger immediate SMS and WhatsApp receipt upon payment acknowledgment",
      ],
    },
  ];

  const [selectedGoalId, setSelectedGoalId] = useState<string>("merit");
  const activePreset = quickGoals.find((g) => g.id === selectedGoalId) || quickGoals[0];
  const [goalText, setGoalText] = useState<string>(activePreset.prompt);
  const [isDelegating, setIsDelegating] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number>(2); // 2 steps done, 3rd in progress
  const [delegatedSuccess, setDelegatedSuccess] = useState<boolean>(false);

  const handleSelectGoal = (goal: (typeof quickGoals)[0]) => {
    setSelectedGoalId(goal.id);
    setGoalText(goal.prompt);
    setCompletedSteps(2);
    setDelegatedSuccess(false);
  };

  const handleDelegateExecution = () => {
    if (isDelegating) return;
    setIsDelegating(true);
    setCompletedSteps(2);
    setDelegatedSuccess(false);

    // Simulated progressive execution
    setTimeout(() => {
      setCompletedSteps(3);
    }, 1200);

    setTimeout(() => {
      setCompletedSteps(4);
      setIsDelegating(false);
      setDelegatedSuccess(true);
      onStartCampaign?.(goalText.slice(0, 48) + "...", activePreset.records);
    }, 2500);
  };

  return (
    <section className="w-full mb-10 font-sans select-none" id="autonomous-goals-hub">
      <div className="bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        
        {/* Subtle Decorative Backdrop Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-lime-100/40 via-emerald-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-neutral-100 border border-neutral-200 text-neutral-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>AUTONOMOUS WORK AGENTS</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.15]">
            Set the outcome. <span className="font-serif italic text-neutral-500">Delegate the process.</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Describe the admissions or counseling goal and connect your campus documents.
            VoicePilot orchestrates autonomous voice agents, verifies scholarships, and updates student dossiers in real-time.
          </p>
        </div>

        {/* Quick Goal Pills (Matches PDF Page 4) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 relative z-10">
          <span className="text-xs font-semibold text-neutral-500 mr-1">Quick Goals:</span>
          {quickGoals.map((goal) => {
            const isSelected = goal.id === selectedGoalId;
            return (
              <button
                key={goal.id}
                onClick={() => handleSelectGoal(goal)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white font-semibold shadow-xs"
                    : "bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 border border-neutral-200/80"
                }`}
              >
                {goal.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Goal Dispatcher Container (Matches PDF Page 4) */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-neutral-50/70 rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-xs focus-within:border-neutral-400 transition-all">
            
            {/* Editable Prompt Area */}
            <textarea
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              rows={2}
              className="w-full bg-transparent text-sm sm:text-base text-neutral-900 font-medium placeholder-neutral-400 resize-none focus:outline-none leading-relaxed"
              placeholder="Describe your admissions outreach goal..."
            />

            {/* Bottom Status Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-3 border-t border-neutral-200/70">
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-600">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-neutral-200 font-semibold text-neutral-800 shadow-2xs">
                  <Bot className="w-3.5 h-3.5 text-blue-600" />
                  <span>Admissions Copilot • Multi-Agent</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-neutral-500">
                  <Database className="w-3 h-3 text-neutral-400" />
                  <span>Connected: JoSAA Register, UGC Guidelines, Bulbul V3 SIP</span>
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {delegatedSuccess ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Goal Dispatched ({activePreset.records} Candidates)</span>
                  </span>
                ) : (
                  <button
                    onClick={handleDelegateExecution}
                    disabled={isDelegating}
                    className="px-5 py-2 rounded-xl bg-white hover:bg-neutral-900 hover:text-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isDelegating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Orchestrating Agents...</span>
                      </>
                    ) : (
                      <>
                        <span>Delegate Goal</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Live Multi-Agent Progress Checklist (Matches PDF Page 5) */}
          <div className="mt-5 space-y-2.5 px-1 sm:px-2">
            {activePreset.steps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isCompleted = completedSteps >= stepNumber;
              const isActive = completedSteps === stepNumber - 1 && isDelegating;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-[13px] transition-all ${
                    idx === 2
                      ? "bg-amber-50/60 border border-amber-200/80 text-neutral-900 font-medium shadow-2xs"
                      : isCompleted
                      ? "bg-white/80 border border-neutral-200/60 text-neutral-700"
                      : "bg-neutral-50/50 border border-neutral-200/40 text-neutral-400"
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="shrink-0 flex items-center justify-center">
                    {idx === 2 ? (
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px]">
                        ⚡
                      </span>
                    ) : isCompleted ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[2.8]" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-neutral-300 text-neutral-400 flex items-center justify-center text-[10px]">
                        ○
                      </span>
                    )}
                  </div>

                  {/* Step Description */}
                  <div className="flex-1 leading-normal">
                    <span>{step}</span>
                  </div>

                  {/* Tag on active synthesis */}
                  {idx === 2 && (
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                      Active Stream
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
