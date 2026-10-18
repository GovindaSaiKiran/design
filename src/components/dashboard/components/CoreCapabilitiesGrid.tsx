"use client";

import React from "react";
import {
  PhoneCall,
  BookOpen,
  Users2,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";

export default function CoreCapabilitiesGrid() {
  const capabilities = [
    {
      num: "01",
      icon: PhoneCall,
      title: "24/7 Conversational Telephony",
      desc: "Natural human-grade voice with zero hold times during peak application deadlines.",
      bullets: [
        "Instant answer with zero queue or hold time",
        "Sub-400ms natural conversational latency",
        "Supports accent diversity and multilingual inquiries",
        "Automatic call recording and real-time transcripts",
      ],
      metric: "Sub-400ms",
      metricLabel: "Average conversational voice response time",
    },
    {
      num: "02",
      icon: BookOpen,
      title: "Institutional Knowledge RAG",
      desc: "Grounded strictly in verified university prospectuses, fee charts & guidelines.",
      bullets: [
        "Ingests college prospectuses, PDFs, and syllabus guides",
        "Accurate fee calculations and installment breakdowns",
        "Hostel, dining, and campus residency guidelines",
        "Continuous syncing with real-time SIS updates",
      ],
      metric: "100%",
      metricLabel: "Grounded accuracy with citation traceability",
    },
    {
      num: "03",
      icon: Users2,
      title: "Smart Human Handoff & CRM",
      desc: "Seamless escalation & lead qualification with complete context dossiers.",
      bullets: [
        "Warm call escalation with student summary briefing",
        "Automated intent scoring (High, Medium, Information)",
        "Instant sync to Salesforce, Slate, and HubSpot CRM",
        "After-hours callback scheduling with SMS confirmation",
      ],
      metric: "4.2x",
      metricLabel: "Increase in qualified completed applications",
    },
  ];

  return (
    <section className="w-full mb-10 font-sans select-none" id="core-capabilities-hub">
      <div className="bg-white border border-black/[0.06] rounded-[26px] p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
        
        {/* Section Header (Matches PDF Page 10) */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#FAF3E4] border border-black/[0.06] text-[#1A1A1A]">
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.15]">
            Comprehensive voice telephony and<br />
            <span className="text-black/55 font-medium">admissions intelligence</span>
          </h2>

          <p className="text-xs sm:text-sm text-black/60 max-w-2xl mx-auto leading-relaxed">
            Transform your admissions office from overwhelmed phone banks to an autonomous 24/7 student engagement powerhouse.
          </p>
        </div>

        {/* 3 Capabilities Columns (Matches PDF Page 10-11) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.num}
                className="bg-[#FAF3E4]/50 border border-black/[0.06] rounded-[22px] p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#111111] shadow-xs">
                      <Icon className="w-4 h-4 text-[#16856B]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-black/45">
                      {c.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-black/60 leading-relaxed mb-4">
                    {c.desc}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-black/[0.06]">
                    {c.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-black/75">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06]">
                  <div className="text-3xl font-extrabold text-[#1A1A1A]">
                    {c.metric}
                  </div>
                  <div className="text-[11px] text-black/50">
                    {c.metricLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
