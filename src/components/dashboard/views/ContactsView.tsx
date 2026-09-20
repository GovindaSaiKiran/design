"use client";

import React, { useState } from "react";
import { Users, Search, Filter, Upload, Download, Flame, CheckCircle2, RotateCw, Phone, ArrowUpRight, X, Sparkles } from "lucide-react";
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
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. SARVAM EDITORIAL HERO & CONTACTS DIRECTORY HEADER                     */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-xs font-semibold text-neutral-800">
              <span className="text-amber-600 font-serif">~ 𑁍 ~</span>
              <span>Candidate Intelligence Directory</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight leading-tight">
              Applicants, Parents & Contact Intelligence
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Auto-categorized student and parent profiles synthesized in real-time from autonomous admissions calls, board percentage verification, and merit scholarship consultations across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onUploadContacts}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Upload className="w-4 h-4 stroke-[2]" />
              <span>Import Candidate Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTACT INTELLIGENCE OVERVIEW WIDGET                                   */}
      {/* ========================================================================= */}
      <ContactIntelligence onViewContact={onViewContactDossier} />

      {/* ========================================================================= */}
      {/* 3. SEARCHABLE CONTACT TABLE WITH SARVAM STYLING                           */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 hover:border-black/20 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/10">
          <div>
            <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
              Verified Candidate Registry
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Showing {filteredContacts.length} of {contactsList.length} verified applicant profiles with Indic phoneme tags
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search candidate, score, branch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white/70 backdrop-blur-md border border-black/10 focus:border-black/30 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all shadow-2xs"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-neutral-100/80 p-1 rounded-xl border border-black/5 text-xs">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  categoryFilter === "all"
                    ? "bg-white text-neutral-900 shadow-xs font-semibold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCategoryFilter("high intent")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  categoryFilter === "high intent"
                    ? "bg-white text-neutral-900 shadow-xs font-semibold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                High Intent
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white/40 backdrop-blur-md">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/60 text-neutral-500 text-[11px] font-semibold tracking-wider uppercase border-b border-black/10">
                <th className="py-3.5 px-4">Candidate & Specialization</th>
                <th className="py-3.5 px-4">Phone & Locale</th>
                <th className="py-3.5 px-4">Score & Triage</th>
                <th className="py-3.5 px-4">Outcome</th>
                <th className="py-3.5 px-4">Assigned Agent</th>
                <th className="py-3.5 px-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-transparent font-medium text-neutral-800">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => onViewContactDossier(contact.id)}
                  className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4">
                    <div className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors text-sm">
                      {contact.name}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">{contact.organization}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-mono text-neutral-700 text-xs">{contact.phone}</div>
                    <div className="text-[10px] text-neutral-500 mt-0.5 font-sans">{contact.locale}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                      {contact.score}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        contact.category === "High Intent"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : contact.category === "Resolved"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-blue-50 text-blue-800 border-blue-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          contact.category === "High Intent"
                            ? "bg-amber-500"
                            : contact.category === "Resolved"
                            ? "bg-emerald-500"
                            : "bg-blue-500"
                        }`}
                      />
                      {contact.lastOutcome}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-neutral-600 font-sans">{contact.agent}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewContactDossier(contact.id);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 border border-black/10 font-semibold text-xs shadow-xs transition-all inline-flex items-center gap-1 cursor-pointer active:scale-95"
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
