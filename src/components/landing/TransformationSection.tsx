"use client";

import React, { useState } from "react";
import { PhoneCall, MessageSquareQuote, BrainCircuit, UserCheck, GraduationCap, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

export default function TransformationSection() {
  const [activeStage, setActiveStage] = useState<number>(2); // Default on Understanding

  const stages = [
    {
      id: 0,
      badge: "01",
      name: "CALL",
      icon: PhoneCall,
      headline: "Incoming Telephony Stream",
      description: "A student or parent dials your campus admission hotline. Sub-second SIP routing connects the call directly to Maya without IVR maze delays.",
      bgColor: "bg-[#00f0ff]",
      borderColor: "border-black"
    },
    {
      id: 1,
      badge: "02",
      name: "CONVERSATION",
      icon: MessageSquareQuote,
      headline: "Natural Voice Dialogue",
      description: "Maya listens, understands pauses and interruptions, and speaks naturally with human warmth and institutional clarity.",
      bgColor: "bg-[#c084fc]",
      borderColor: "border-black"
    },
    {
      id: 2,
      badge: "03",
      name: "UNDERSTANDING",
      icon: BrainCircuit,
      headline: "Real-Time Intent & Semantic Extraction",
      description: "As the conversation flows, Maya extracts academic preferences, scores, intent levels, financial constraints, and sentiment on the fly.",
      bgColor: "bg-[#ffe600]",
      borderColor: "border-black"
    },
    {
      id: 3,
      badge: "04",
      name: "LEAD",
      icon: UserCheck,
      headline: "Enriched Qualified Lead Profile",
      description: "Unstructured phone audio instantly turns into a complete student profile synced to your CRM with score qualification and communication history.",
      bgColor: "bg-[#a3e635]",
      borderColor: "border-black"
    },
    {
      id: 4,
      badge: "05",
      name: "ADMISSION",
      icon: GraduationCap,
      headline: "Actionable Enrollment Outcome",
      description: "Maya schedules a campus visit, sends official brochures via WhatsApp, or routes the applicant to their designated faculty counselor for final enrollment.",
      bgColor: "bg-[#fb923c]",
      borderColor: "border-black"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#fffdf5] border-b-3 border-black relative bg-neo-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-[#a3e635] text-black border-2 border-black text-xs font-space font-black mb-4 shadow-[3px_3px_0px_#000] rotate-1">
            <Sparkles className="w-3.5 h-3.5" />
            END-TO-END TRANSFORMATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight">
            What happens when every call gets an <br />
            <span className="bg-[#00f0ff] text-black px-3 py-0.5 border-2 border-black shadow-[4px_4px_0px_#000] inline-block font-serif-editorial italic font-normal mt-2 rotate-[-0.5deg]">
              intelligent response?
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
            Edu-Voice-Ai transforms unstructured phone audio into structured student intent, verified eligibility, and actionable campus admissions.
          </p>
        </div>

        {/* 5-Stage Spatial Pipeline Stepper with Neo-Brutal Colors */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 bg-white p-2 rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] font-space">
            {stages.map((stg) => {
              const Icon = stg.icon;
              const isActive = activeStage === stg.id;
              return (
                <button
                  key={stg.id}
                  onClick={() => {
                    soundSynth.playClick();
                    setActiveStage(stg.id);
                  }}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 border-black transition-all cursor-pointer ${
                    isActive
                      ? `${stg.bgColor} text-black shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px] font-black`
                      : "bg-slate-50 text-slate-700 hover:bg-[#ffe600] font-bold shadow-[1px_1px_0px_#000]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-black">{stg.badge}</span>
                    <Icon className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-xs font-space mt-1 tracking-tight">{stg.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Interactive Showcase Card */}
          <div className="mt-8 bg-white rounded-3xl border-3 border-black p-6 sm:p-10 shadow-[8px_8px_0px_#000] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Stage Summary Description */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-black px-3 py-1 rounded-md border-2 border-black ${stages[activeStage].bgColor} text-black shadow-[2px_2px_0px_#000]`}>
                    STAGE {stages[activeStage].badge}
                  </span>
                  <span className="text-xs font-space font-black uppercase tracking-wider text-black">
                    {stages[activeStage].name}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-black tracking-tight">
                  {stages[activeStage].headline}
                </h3>

                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans font-medium">
                  {stages[activeStage].description}
                </p>

                <div className="pt-2 flex items-center gap-2 font-space">
                  {activeStage < 4 ? (
                    <button
                      onClick={() => {
                        soundSynth.playClick();
                        setActiveStage(activeStage + 1);
                      }}
                      className="neo-btn neo-btn-primary px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5"
                    >
                      Next Step: {stages[activeStage + 1].name}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-black bg-[#a3e635] text-black border-2 border-black px-3 py-1 rounded-lg shadow-[2px_2px_0px_#000]">
                      <CheckCircle2 className="w-4 h-4" />
                      Admission Completed & Enrolled
                    </span>
                  )}
                </div>
              </div>

              {/* Stage Dynamic Visualization Panel */}
              <div className="lg:col-span-7">
                {/* 1. CALL STAGE */}
                {activeStage === 0 && (
                  <div className="bg-[#00f0ff] text-black rounded-2xl p-6 border-3 border-black shadow-[5px_5px_0px_#000]">
                    <div className="flex items-center justify-between pb-3 border-b-2 border-black font-space font-black text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
                        <span>INCOMING SIP CALL</span>
                      </div>
                      <span>Gateway: Cloud PBX</span>
                    </div>
                    <div className="mt-5 space-y-3">
                      <div className="bg-white p-4 rounded-xl border-2 border-black flex items-center justify-between shadow-[3px_3px_0px_#000]">
                        <div>
                          <div className="text-xs font-space text-slate-600 font-bold">Caller ID:</div>
                          <div className="text-lg font-mono font-black text-black">+91 98401 22340</div>
                          <div className="text-xs text-slate-800 font-medium mt-0.5">Location: Hyderabad, Telangana</div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#ffe600] border-2 border-black text-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                          <PhoneCall className="w-6 h-6 animate-pulse" />
                        </div>
                      </div>
                      <div className="text-xs font-mono font-bold text-black flex items-center justify-between px-1">
                        <span>Latency: 48ms</span>
                        <span>Routing: Instant Direct-to-Maya</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CONVERSATION STAGE */}
                {activeStage === 1 && (
                  <div className="bg-[#c084fc] text-black rounded-2xl p-6 border-3 border-black shadow-[5px_5px_0px_#000] space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b-2 border-black font-space font-black text-xs">
                      <span>Live Voice Dialogue</span>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 bg-black rounded-full animate-wave-1" />
                        <span className="w-1.5 bg-black rounded-full animate-wave-2" />
                        <span className="w-1.5 bg-black rounded-full animate-wave-3" />
                      </div>
                    </div>

                    {/* Student Bubble */}
                    <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[3px_3px_0px_#000] font-sans">
                      <div className="text-[11px] font-space font-black text-black mb-1">Student (Rahul):</div>
                      <p className="text-sm text-black font-semibold italic">
                        "I want to know about B.Tech CSE fees, and is there a scholarship for 94% board marks?"
                      </p>
                    </div>

                    {/* Maya Bubble */}
                    <div className="bg-[#ffe600] rounded-xl p-3.5 border-2 border-black shadow-[3px_3px_0px_#000] font-sans">
                      <div className="text-[11px] font-space font-black text-black mb-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-black" />
                        Maya (AI Admission Counselor):
                      </div>
                      <p className="text-sm text-black font-semibold">
                        "Certainly, Rahul! For B.Tech CSE, the annual fee is $9,500. With your 94% score, you qualify for our Chancellor's Tier-1 Merit Scholarship, which gives a 35% tuition waiver."
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. UNDERSTANDING STAGE */}
                {activeStage === 2 && (
                  <div className="bg-[#ffe600] text-black rounded-2xl p-6 border-3 border-black shadow-[5px_5px_0px_#000] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b-2 border-black font-space font-black text-xs">
                      <span>Extracted Semantic Intelligence</span>
                      <span className="bg-black text-[#a3e635] px-2 py-0.5 rounded text-[11px] font-mono">
                        CONFIDENCE: 99.2%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-space">
                      <div className="bg-white p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                        <div className="text-[10px] text-slate-500 uppercase font-black">Intent</div>
                        <div className="text-xs sm:text-sm font-black text-black mt-0.5">Fee & Scholarship Inquiry</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                        <div className="text-[10px] text-slate-500 uppercase font-black">Target Course</div>
                        <div className="text-xs sm:text-sm font-black text-[#c084fc] mt-0.5">B.Tech Computer Science</div>
                      </div>

                      <div className="bg-[#a3e635] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                        <div className="text-[10px] text-black uppercase font-black">Interest Level</div>
                        <div className="text-xs sm:text-sm font-black text-black mt-0.5">
                          High Intent (94/100)
                        </div>
                      </div>

                      <div className="bg-[#00f0ff] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                        <div className="text-[10px] text-black uppercase font-black">Sentiment</div>
                        <div className="text-xs sm:text-sm font-black text-black mt-0.5">Positive & Decisive</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. LEAD STAGE */}
                {activeStage === 3 && (
                  <div className="bg-[#a3e635] text-black rounded-2xl p-6 border-3 border-black shadow-[5px_5px_0px_#000] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b-2 border-black font-space">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-black text-white font-syne font-black text-xs flex items-center justify-center border border-black shadow-[2px_2px_0px_#fff]">
                          RV
                        </div>
                        <div>
                          <h4 className="font-syne font-black text-sm text-black">Rahul Verma</h4>
                          <span className="text-[11px] text-slate-800 font-mono font-bold">+91 98401 22340</span>
                        </div>
                      </div>
                      <span className="text-xs font-space font-black px-2.5 py-1 rounded-md bg-black text-[#a3e635] border border-black">
                        HOT LEAD (TIER-1)
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-sans text-black bg-white p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                      <div className="flex justify-between py-1 border-b border-slate-200 font-medium">
                        <span className="text-slate-600">Program:</span>
                        <span className="font-bold">B.Tech Computer Science</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200 font-medium">
                        <span className="text-slate-600">Score:</span>
                        <span className="font-black text-black font-space">94% CBSE 12th</span>
                      </div>
                      <div className="flex justify-between py-1 font-medium">
                        <span className="text-slate-600">Scholarship:</span>
                        <span className="font-black text-black font-space bg-[#ffe600] px-1.5 py-0.5 border border-black rounded">35% Merit Waiver</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. ADMISSION STAGE */}
                {activeStage === 4 && (
                  <div className="bg-[#fb923c] text-black rounded-2xl p-6 border-3 border-black shadow-[5px_5px_0px_#000] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b-2 border-black font-space font-black text-xs">
                      <span>Admissions Action Triggered</span>
                      <span className="bg-black text-white px-2.5 py-0.5 rounded text-[10px]">
                        AUTOMATED
                      </span>
                    </div>

                    <div className="space-y-3 font-sans">
                      <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-black text-black font-space">Campus Visit Scheduled</div>
                          <div className="text-xs text-slate-800 mt-0.5 font-medium">Saturday, 11:00 AM • Assigned Counselor: Vikram Mehta</div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-black text-black font-space">Brochure & Voucher Delivered</div>
                          <div className="text-xs text-slate-800 mt-0.5 font-medium">Instant WhatsApp PDF sent with personalized scholarship code</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
