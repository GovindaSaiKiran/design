"use client";

import React, { useState } from "react";
import { Users, Search, Upload, ArrowUpRight, X, Sparkles } from "lucide-react";
import ContactIntelligence from "../components/ContactIntelligence";

interface ContactsViewProps {
  onUploadContacts: () => void;
  onViewContactDossier: (contactId: string) => void;
}

export default function ContactsView({
  onUploadContacts,
  onViewContactDossier,
}: ContactsViewProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const contactsList = [
    {
      id: "c-1",
      name: "Rahul Verma (राहुल वर्मा)",
      phone: "+91 98401 55219",
      organization: "Applicant — B.Tech CSE (AI & Robotics)",
      category: "High Intent",
      lastOutcome: "Interested",
      lastTime: "4 min ago",
      agent: "Maya AI (Admissions)",
      locale: "Hindi / Eng",
      score: "94.2% PCM",
    },
    {
      id: "c-2",
      name: "Vikram Malhotra (విక్రమ్ మల్హోత్రా)",
      phone: "+91 98401 77120",
      organization: "Applicant — B.Tech Data Science & AI",
      category: "High Intent",
      lastOutcome: "Interested",
      lastTime: "2 min ago",
      agent: "Neha AI (Admissions)",
      locale: "Telugu / Eng",
      score: "91.8% PCM",
    },
    {
      id: "c-3",
      name: "Anita Roy (অনিতা রায়)",
      phone: "+91 98765 11980",
      organization: "Applicant — Lateral Entry Diploma (Mechanical)",
      category: "Follow-up",
      lastOutcome: "Human Handoff",
      lastTime: "8 min ago",
      agent: "Suhani AI (Support)",
      locale: "Bengali / Eng",
      score: "88.4% Poly",
    },
    {
      id: "c-4",
      name: "Deepika Sen (ದೀಪಿಕಾ ಸೇನ್)",
      phone: "+91 91760 88231",
      organization: "Applicant — 100% Chairman Merit Scholarship",
      category: "Resolved",
      lastOutcome: "Completed",
      lastTime: "25 min ago",
      agent: "Ishita AI (Scholarships)",
      locale: "Kannada / Eng",
      score: "96.5% PCM",
    },
    {
      id: "c-5",
      name: "Gaurav Joshi (गौरव जोशी)",
      phone: "+91 98840 33219",
      organization: "Parent — Hostel Accommodation & Bus Route Desk",
      category: "Follow-up",
      lastOutcome: "Callback Requested",
      lastTime: "36 min ago",
      agent: "Rohan AI (Affairs)",
      locale: "Hindi / Marathi",
      score: "Parent Inquiry",
    },
  ];

  const filteredContacts = contactsList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.organization.toLowerCase().includes(search.toLowerCase()) ||
      c.score.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      c.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans select-none text-[#1A1A1A]">
      {/* 1. Header Card */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-xs font-semibold text-[#5B21B6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Candidate Intelligence Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Applicants, Parents & Contact Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-sans">
              Auto-categorized student and parent profiles synthesized in real-time from autonomous admissions calls, board percentage verification, and merit scholarship consultations across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onUploadContacts}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Upload className="w-3.5 h-3.5 stroke-[2]" />
              <span>Import Candidate Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Contact Intelligence Overview Widget */}
      <ContactIntelligence onViewContact={onViewContactDossier} />

      {/* 3. Searchable Contact Table */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06]">
          <div>
            <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
              Verified Candidate Registry
            </h3>
            <p className="text-xs text-black/50 mt-0.5">
              Showing {filteredContacts.length} of {contactsList.length} verified applicant profiles with Indic phoneme tags
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                type="text"
                placeholder="Search candidate, score, branch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-full text-xs bg-[#FAF3E4]/60 border border-black/[0.06] focus:border-black/20 focus:bg-white text-[#1A1A1A] placeholder:text-black/40 focus:outline-none transition-all shadow-2xs"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-[#FAF3E4] p-1 rounded-full border border-black/[0.06] text-xs">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  categoryFilter === "all"
                    ? "bg-white text-[#1A1A1A] shadow-xs font-semibold"
                    : "text-black/60 hover:text-black"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategoryFilter("high intent")}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  categoryFilter === "high intent"
                    ? "bg-white text-[#1A1A1A] shadow-xs font-semibold"
                    : "text-black/60 hover:text-black"
                }`}
              >
                High Intent
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-[20px] border border-black/[0.06]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF3E4]/70 text-black/50 text-[11px] font-semibold tracking-wider uppercase border-b border-black/[0.06]">
                <th className="py-3.5 px-4">Candidate & Specialization</th>
                <th className="py-3.5 px-4">Phone & Locale</th>
                <th className="py-3.5 px-4">Score & Triage</th>
                <th className="py-3.5 px-4">Outcome</th>
                <th className="py-3.5 px-4">Assigned Agent</th>
                <th className="py-3.5 px-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] bg-white font-medium text-black/80">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => onViewContactDossier(contact.id)}
                  className="hover:bg-[#FAF3E4]/40 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#1A1A1A] group-hover:text-black transition-colors text-sm">
                      {contact.name}
                    </div>
                    <div className="text-xs text-black/50 mt-0.5">{contact.organization}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-mono text-black/80 text-xs">{contact.phone}</div>
                    <div className="text-[10px] text-black/50 mt-0.5 font-sans">{contact.locale}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono font-semibold text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full text-[11px]">
                      {contact.score}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        contact.category === "High Intent"
                          ? "bg-[#FFD9A0] text-[#7A4B00]"
                          : contact.category === "Resolved"
                          ? "bg-[#C1F2D5] text-[#16856B]"
                          : "bg-[#BCD0F5] text-[#1B365D]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          contact.category === "High Intent"
                            ? "bg-[#7A4B00]"
                            : contact.category === "Resolved"
                            ? "bg-[#16856B]"
                            : "bg-[#1B365D]"
                        }`}
                      />
                      {contact.lastOutcome}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-black/60 font-sans">{contact.agent}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewContactDossier(contact.id);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF3E4] hover:bg-[#111111] hover:text-white text-[#1A1A1A] border border-black/[0.06] font-semibold text-xs shadow-2xs transition-all inline-flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
