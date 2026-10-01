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
      <div className="bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        
        {/* Section Header (Matches PDF Page 10) */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-neutral-100 border border-neutral-200 text-neutral-800">
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.15]">
            Comprehensive voice telephony and<br />
            <span className="font-serif italic text-neutral-500">admissions intelligence</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
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
                className="bg-neutral-50/70 border border-neutral-200/90 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-2xs hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-2xs">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      {c.num}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl font-normal text-neutral-900 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {c.desc}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-neutral-200/70">
                    {c.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200/70">
                  <div className="font-serif-display text-3xl font-normal text-neutral-900">
                    {c.metric}
                  </div>
                  <div className="text-[11px] text-neutral-500">
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
