"use client";

import React, { useState } from "react";
import { Users, Bot, PhoneForwarded, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

export default function HumanHandoffSection() {
  const [activeScenario, setActiveScenario] = useState<number>(0);

  const scenarios = [
    {
      title: "Special Scholarship Appeal",
      trigger: "Parent requests custom fee waiver review exceeding standard policy matrix",
      counselorAction: "Warm transfer to Senior Admissions Director with student's 95% score and financial documents pre-loaded on screen.",
      resolutionTime: "Transfer latency < 3.2 seconds"
    },
    {
      title: "Complex Credit Transfer / Migration",
      trigger: "International transfer student with European ECTS credits requesting transcript equivalency evaluation",
      counselorAction: "Transfers to Academic Dean of Engineering with full course syllabus and equivalency breakdown pre-attached.",
      resolutionTime: "Direct SIP transfer with zero hold music"
    },
    {
      title: "Distressed Parent / Campus Safety",
      trigger: "Parent inquiring about medical accommodations and special needs residential hostel",
      counselorAction: "Connects with Chief Warden & Campus Health Officer with empathetic briefing and priority flag.",
      resolutionTime: "Immediate high-priority counselor ring"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#fffdf5] border-b-3 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#a3e635] text-black border-2 border-black text-xs font-space font-black mb-4 shadow-[3px_3px_0px_#000] rotate-1">
            <HeartHandshake className="w-3.5 h-3.5" />
            HUMAN-IN-THE-LOOP SAFEGUARDS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight">
            AI when it can. <br />
            <span className="bg-[#fb923c] text-black px-3 py-0.5 border-2 border-black shadow-[4px_4px_0px_#000] inline-block font-serif-editorial italic font-normal mt-2 rotate-[-1deg]">
              Humans when it should.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
            Edu-Voice-Ai is designed to empower—not replace—your admissions team. Routine questions are resolved autonomously, while nuanced appeals are smoothly handed off with full context.
          </p>
        </div>

        {/* Dual Lane Architecture Visualization */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lane 1: 96% Autonomous Resolution */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_#000] space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-xl bg-[#00f0ff] border-2 border-black text-black flex items-center justify-center font-bold shadow-[2px_2px_0px_#000]">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-syne font-black text-black text-base">Autonomous AI Resolution</h3>
                    <span className="text-xs font-space font-black text-[#c084fc]">96.7% of Inbound Inquiries</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-black bg-[#a3e635] text-black border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#000]">
                  TIER 1
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs font-sans text-slate-900 font-medium">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fffdf5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span>Fee schedules, installment options, and refund policies.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fffdf5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span>Eligibility criteria, cutoff marks, and entrance exam requirements.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fffdf5] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span>Hostel accommodations, campus tour bookings, and brochure delivery.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-black text-xs text-black flex items-center justify-between font-space font-black">
              <span>Avg Handling Time: <strong>2m 45s</strong></span>
              <span className="bg-[#a3e635] px-2 py-0.5 rounded border border-black">0 HOLD TIME</span>
            </div>
          </div>

          {/* Lane 2: Seamless Human Counselor Escalation */}
          <div className="bg-[#ffe600] rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_#000] space-y-5 flex flex-col justify-between text-black">
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-xl bg-[#ff53cd] border-2 border-black text-white flex items-center justify-center font-bold shadow-[2px_2px_0px_#000]">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-syne font-black text-black text-base">Intelligent Warm Escalation</h3>
                    <span className="text-xs font-space font-black text-slate-800">Exceptions & Nuanced Cases</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-black bg-[#fb923c] text-black border-2 border-black px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#000]">
                  TIER 2
                </span>
              </div>

              {/* Scenario Switcher Tabs */}
              <div className="mt-4 space-y-2 font-space">
                {scenarios.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundSynth.playClick();
                      setActiveScenario(idx);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border-2 border-black text-xs transition-all cursor-pointer ${
                      activeScenario === idx
                        ? "bg-black text-[#ffe600] font-black shadow-[3px_3px_0px_#fff] translate-x-[-1px] translate-y-[-1px]"
                        : "bg-white text-black hover:bg-[#00f0ff] font-bold shadow-[2px_2px_0px_#000]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{sc.title}</span>
                      <PhoneForwarded className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Scenario Preview */}
              <div className="mt-4 p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-xs space-y-1 font-sans">
                <div className="text-black font-space font-black">
                  Trigger: {scenarios[activeScenario].trigger}
                </div>
                <div className="text-slate-800 font-medium">
                  {scenarios[activeScenario].counselorAction}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-black text-xs text-black flex items-center justify-between font-space font-black">
              <span>{scenarios[activeScenario].resolutionTime}</span>
              <span className="bg-[#a3e635] px-2 py-0.5 rounded border border-black">100% CONTEXT RETENTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
