"use client";

import React from "react";
import { PhoneMissed, Clock, AlertTriangle, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { simulatedMissedCalls } from "@/data/mock/calls";

interface ProblemSectionProps {
  onOpenDemo: () => void;
}

export default function ProblemSection({ onOpenDemo }: ProblemSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-[#fffdf5] border-b-3 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#fb923c] text-black border-2 border-black text-xs font-space font-black mb-4 shadow-[3px_3px_0px_#000] rotate-[-1deg]">
            <AlertTriangle className="w-3.5 h-3.5" />
            THE ADMISSIONS BOTTLENECK
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight">
            Every missed call can be a <br className="hidden sm:inline" />
            <span className="bg-[#ff53cd] text-white px-3 py-0.5 border-2 border-black shadow-[4px_4px_0px_#000] inline-block font-serif-editorial font-normal italic mt-1 rotate-1">
              missed admission.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
            When campus admissions offices close at 5:00 PM or counselors are on other lines, prospective students and parents move to the next university on their list.
          </p>
        </div>

        {/* Visual Call Stream & Missed Opportunity Timeline */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: The Reality of Missed Calls */}
          <div className="md:col-span-7 space-y-3">
            <div className="text-xs font-space font-black text-black uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Unanswered Inquiries (Peak Spikes)</span>
              <span className="bg-[#ff53cd] text-white px-2 py-0.5 rounded border border-black text-[11px] font-bold shadow-[2px_2px_0px_#000]">
                5 Lost Opportunities
              </span>
            </div>

            {simulatedMissedCalls.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex items-center justify-between p-3.5 rounded-xl border-2 border-black bg-white hover:bg-[#ffe600] transition-all shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#fb923c] border-2 border-black text-black flex items-center justify-center font-mono text-xs shadow-[2px_2px_0px_#000]">
                    <PhoneMissed className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-600 font-bold">{item.time}</span>
                      <span className="text-xs font-mono font-black text-black">{item.phone}</span>
                    </div>
                    <span className="text-xs font-sans font-bold text-slate-800">{item.course}</span>
                  </div>
                </div>

                <div className="text-right font-space">
                  <span className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#ff53cd] text-white border border-black shadow-[1px_1px_0px_#000]">
                    {item.status}
                  </span>
                  <div className="text-[11px] font-black text-black mt-0.5">
                    {item.lostValue}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: The Impact Card with Neo-Brutal Stamping */}
          <div className="md:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-[#ffe600] border-3 border-black text-black shadow-[7px_7px_0px_#000]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black text-white text-xs font-space font-black mb-4 shadow-[2px_2px_0px_#fff]">
                <Clock className="w-3.5 h-3.5 text-[#ffe600]" />
                THE STUDENT EXPECTATION
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-black text-black tracking-tight leading-snug">
                Students don't wait for office hours. <br />
                <span className="font-serif-editorial font-normal italic underline decoration-black decoration-3">
                  They call when they need answers.
                </span>
              </h3>

              <div className="mt-6 space-y-3 text-xs font-sans text-slate-900 font-medium">
                <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="w-5 h-5 rounded bg-[#fb923c] border border-black text-black font-black flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs">
                    ✕
                  </div>
                  <span><strong className="font-space font-black">68% of student inquiries</strong> occur during evenings, weekends, and board result release spikes.</span>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="w-5 h-5 rounded bg-[#fb923c] border border-black text-black font-black flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs">
                    ✕
                  </div>
                  <span><strong className="font-space font-black">14-hour callback delay</strong> drastically reduces enrollment conversion likelihood.</span>
                </div>

                <div className="flex items-start gap-2.5 bg-[#a3e635] p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <div className="w-5 h-5 rounded bg-black text-[#a3e635] font-black flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span><strong className="font-space font-black">With Edu-Voice-Ai:</strong> 0.8s pickup, 100% verified answers, 0 missed inquiries.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-black font-space">
              <button
                onClick={onOpenDemo}
                className="w-full neo-btn bg-black text-white hover:bg-slate-800 py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Protect Your Institution's Enrollment
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
