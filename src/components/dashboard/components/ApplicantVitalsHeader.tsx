"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  SlidersHorizontal,
  GraduationCap,
  Award,
  FileText,
  CreditCard,
  Home,
  UserCheck,
  PhoneCall,
  Activity,
  Zap,
  Sparkles
} from "lucide-react";

export interface CallerProfile {
  id: string;
  name: string;
  avatar: string;
  meta: string;
  intent: string;
  tempo: string;
  latency: string;
  confidence: string;
  sentiment: string;
  direction: "inbound" | "outbound";
}

const callersList: CallerProfile[] = [
  {
    id: "caller-1",
    name: "Rahul Sharma",
    avatar: "/images/woman-portrait.jpg",
    meta: "Applicant • CBSE 94% • B.Tech CSE '28",
    intent: "Chancellor Scholarship (35% Waiver)",
    tempo: "142 wpm",
    latency: "382/64 ms",
    confidence: "98%",
    sentiment: "+92 High",
    direction: "inbound"
  },
  {
    id: "caller-2",
    name: "Ananya Iyer",
    avatar: "/images/woman-portrait.jpg",
    meta: "Applicant • CAT 98.2%ile • MBA FinTech",
    intent: "Hostel AC Rooms & Counseling Slabs",
    tempo: "138 wpm",
    latency: "360/58 ms",
    confidence: "99%",
    sentiment: "+96 High",
    direction: "outbound"
  },
  {
    id: "caller-3",
    name: "Vikramaditya Rao",
    avatar: "/images/woman-portrait.jpg",
    meta: "Applicant • JEE 96%ile • B.Tech AI/ML",
    intent: "Direct Human Counselor Transfer",
    tempo: "148 wpm",
    latency: "395/72 ms",
    confidence: "95%",
    sentiment: "+88 Warm",
    direction: "inbound"
  }
];

interface ApplicantVitalsHeaderProps {
  onFilterChange?: (filterId: string) => void;
  onSelectCaller?: (caller: CallerProfile) => void;
}

export default function ApplicantVitalsHeader({
  onFilterChange,
  onSelectCaller
}: ApplicantVitalsHeaderProps) {
  const [selectedCaller, setSelectedCaller] = useState<CallerProfile>(callersList[0]);
  const [activeFilter, setActiveFilter] = useState<string>("all-inquiries");

  const filterPills = [
    { id: "all-inquiries", label: "All Inquiries", icon: GraduationCap },
    { id: "scholarships", label: "Scholarship Slabs", icon: Award },
    { id: "prospectus", label: "Prospectus RAG", icon: FileText },
    { id: "fees", label: "Fee Slabs (₹7.98L)", icon: CreditCard },
    { id: "hostel", label: "Hostel Allocation", icon: Home },
    { id: "escalations", label: "Counselor Handoff", icon: UserCheck }
  ];

  const handleCallerSwitch = () => {
    const currentIndex = callersList.findIndex((c) => c.id === selectedCaller.id);
    const nextCaller = callersList[(currentIndex + 1) % callersList.length];
    setSelectedCaller(nextCaller);
    onSelectCaller?.(nextCaller);
  };

  const handleFilterClick = (id: string) => {
    setActiveFilter(id);
    onFilterChange?.(id);
  };

  return (
    <div className="w-full mb-6 select-none">
      {/* Top Row: Active Caller Profile Card + Admissions & Telephony Vitals */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-8 mb-5">
        {/* Left: Active Applicant Profile Card */}
        <div
          onClick={handleCallerSwitch}
          className="bg-white/80 hover:bg-white transition-all duration-200 border border-black/5 rounded-[28px] p-3.5 sm:p-4 pr-6 sm:pr-8 flex items-center gap-4 shadow-sm cursor-pointer group shrink-0"
          title="Click to switch live applicant call profile"
        >
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-black/10 shadow-xs">
            <Image
              src={selectedCaller.avatar}
              alt={selectedCaller.name}
              fill
              sizes="72px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                <PhoneCall className="w-2.5 h-2.5" />
                {selectedCaller.direction === "inbound" ? "Inbound Call" : "Outbound Followup"}
              </span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight leading-snug">
              {selectedCaller.name}
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-tight mt-0.5 truncate max-w-[200px]">
              {selectedCaller.meta}
            </span>
          </div>
        </div>

        {/* Center & Right: Live Telephony & Admissions Vitals Metric Bar */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center bg-white/40 p-4 sm:p-5 rounded-[28px] border border-black/5">
          {/* Vitals 1: Primary Inquiry Intent */}
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Primary Inquiry
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-950 tracking-tight block truncate">
              {selectedCaller.intent}
            </span>
          </div>

          {/* Vitals 2: Call Tempo / Pacing */}
          <div>
            <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Voice Cadence
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                {selectedCaller.tempo.split(" ")[0]}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                wpm
              </span>
            </div>
          </div>

          {/* Vitals 3: Telephony Latency */}
          <div>
            <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Voice Latency
            </span>
            <span className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
              {selectedCaller.latency.split(" ")[0]}
            </span>
          </div>

          {/* Vitals 4: Intent Qualification */}
          <div>
            <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Qualification
            </span>
            <span className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight text-emerald-600">
              {selectedCaller.confidence}
            </span>
          </div>

          {/* Vitals 5: Sentiment Score */}
          <div>
            <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
              Sentiment CSAT
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                {selectedCaller.sentiment.split(" ")[0]}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                / 100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Pill Filter Bar */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-50 transition-colors shadow-xs shrink-0 cursor-pointer"
          title="Filter Parameters"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {filterPills.map((pill) => {
          const isActive = activeFilter === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => handleFilterClick(pill.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-150 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-white text-slate-950 border border-black/10 shadow-xs font-bold"
                  : "bg-white/40 hover:bg-white/70 text-slate-600 border border-transparent"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
