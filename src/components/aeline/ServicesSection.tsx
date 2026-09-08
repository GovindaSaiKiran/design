"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  BookOpen,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Headphones
} from "lucide-react";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  const capabilities = [
    {
      id: "voice-telephony",
      title: "24/7 Conversational Telephony",
      tagline: "Natural human-grade voice with zero hold times",
      description:
        "Maya speaks with a warm, natural collegiate voice and sub-400ms latency. She answers thousands of simultaneous inquiries during peak application deadlines, weekends, and holidays without dropped calls or busy signals.",
      icon: <PhoneCall className="w-6 h-6 text-sky-500" />,
      features: [
        "Instant answer with zero queue or hold time",
        "Sub-400ms natural conversational latency",
        "Supports accent diversity and multilingual inquiries",
        "Automatic call recording and real-time transcripts"
      ],
      stat: "Sub-400ms",
      statLabel: "Average conversational voice response time"
    },
    {
      id: "institutional-rag",
      title: "Institutional Knowledge RAG",
      tagline: "Grounded strictly in verified university data",
      description:
        "Every answer Maya provides is vector-grounded in your institution's official documents: fee structures, merit slabs, hostel options, accreditation reports, and admission deadlines. Maya never hallucinates or provides outdated info.",
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
      features: [
        "Ingests college prospectuses, PDFs, and syllabus guides",
        "Accurate fee calculations and installment breakdowns",
        "Hostel, dining, and campus residency guidelines",
        "Continuous syncing with real-time SIS updates"
      ],
      stat: "100%",
      statLabel: "Grounded accuracy with citation traceability"
    },
    {
      id: "human-handoff",
      title: "Smart Human Handoff & CRM",
      tagline: "Seamless escalation & lead qualification",
      description:
        "When an inquiry requires discretionary dean review, special exceptions, or emotional guidance, Maya executes a warm transfer to your human admissions officers with complete student context and intent analysis.",
      icon: <UserCheck className="w-6 h-6 text-emerald-500" />,
      features: [
        "Warm call escalation with student summary briefing",
        "Automated intent scoring (High, Medium, Information)",
        "Instant sync to Salesforce, Slate, and HubSpot CRM",
        "After-hours callback scheduling with SMS confirmation"
      ],
      stat: "4.2x",
      statLabel: "Increase in qualified completed applications"
    }
  ];

  return (
    <section id="capabilities" className="w-full bg-[#fafafa] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block" />
            CORE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight mb-4">
            Comprehensive voice telephony and admissions intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Transform your admissions office from overwhelmed phone banks to an autonomous 24/7 student engagement powerhouse.
          </p>
        </div>

        {/* 3 Interactive Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveService(index)}
              className={`bg-white rounded-[28px] p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                activeService === index
                  ? "border-slate-900 ring-2 ring-slate-900/10 shadow-lg"
                  : "border-slate-200/80 shadow-sm"
              }`}
            >
              <div>
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    0{index + 1}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mb-4">
                  {item.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                {/* Feature checklist */}
                <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
                  {item.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-normal"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Stat Card & CTA */}
              <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">
                    {item.stat}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {item.statLabel}
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
