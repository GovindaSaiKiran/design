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
  return (
    <div className="w-full mb-6 select-none font-sans">
      {/* Top Row: Active Caller Profile Card + Admissions & Telephony Vitals */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 sm:gap-6 mb-5">
        {/* Left: Active Applicant Profile Card */}
        <div
          onClick={handleCallerSwitch}
          className="bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 border border-black/[0.06] rounded-[26px] p-3.5 sm:p-4 pr-6 sm:pr-8 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer group shrink-0"
          title="Click to switch live applicant call profile"
        >
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-[#FAF3E4] shrink-0 border border-black/[0.06] shadow-2xs">
            <Image
              src={selectedCaller.avatar}
              alt={selectedCaller.name}
              fill
              sizes="72px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#16856B] border-2 border-white shadow-2xs" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#C1F2D5] text-[#16856B]">
                <PhoneCall className="w-2.5 h-2.5" />
                {selectedCaller.direction === "inbound" ? "Inbound Call" : "Outbound Followup"}
              </span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight leading-snug font-sans">
              {selectedCaller.name}
            </span>
            <span className="text-xs font-medium text-black/50 tracking-tight mt-0.5 truncate max-w-[200px]">
              {selectedCaller.meta}
            </span>
          </div>
        </div>

        {/* Center & Right: Live Telephony & Admissions Vitals Metric Bar */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 items-center bg-white p-4 sm:p-5 rounded-[26px] border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          {/* Vitals 1: Primary Inquiry Intent */}
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-[11px] font-semibold text-black/45 mb-0.5 uppercase tracking-wider">
              Primary Inquiry
            </span>
            <span className="text-sm sm:text-base font-bold text-[#1A1A1A] tracking-tight block truncate font-sans">
              {selectedCaller.intent}
            </span>
          </div>

          {/* Vitals 2: Call Tempo / Pacing */}
          <div>
            <span className="block text-[11px] font-semibold text-black/45 mb-0.5 uppercase tracking-wider">
              Voice Cadence
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight font-sans">
                {selectedCaller.tempo.split(" ")[0]}
              </span>
              <span className="text-[11px] font-medium text-black/50">
                wpm
              </span>
            </div>
          </div>

          {/* Vitals 3: Telephony Latency */}
          <div>
            <span className="block text-[11px] font-semibold text-black/45 mb-0.5 uppercase tracking-wider">
              Voice Latency
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight font-sans">
              {selectedCaller.latency.split(" ")[0]}
            </span>
          </div>

          {/* Vitals 4: Intent Qualification */}
          <div>
            <span className="block text-[11px] font-semibold text-black/45 mb-0.5 uppercase tracking-wider">
              Qualification
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#16856B] tracking-tight font-sans">
              {selectedCaller.confidence}
            </span>
          </div>

          {/* Vitals 5: Sentiment Score */}
          <div>
            <span className="block text-[11px] font-semibold text-black/45 mb-0.5 uppercase tracking-wider">
              Sentiment CSAT
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight font-sans">
                {selectedCaller.sentiment.split(" ")[0]}
              </span>
              <span className="text-[11px] font-medium text-black/50">
                / 100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Pill Filter Bar */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-[#1A1A1A] hover:bg-[#FAF3E4] transition-colors shadow-2xs shrink-0 cursor-pointer"
          title="Filter Parameters"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/60" />
        </button>

        {filterPills.map((pill) => {
          const isActive = activeFilter === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => handleFilterClick(pill.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-150 cursor-pointer whitespace-nowrap shadow-2xs ${
                isActive
                  ? "bg-[#111111] text-white shadow-xs"
                  : "bg-white hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.08]"
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
