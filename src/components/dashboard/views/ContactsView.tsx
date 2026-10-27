"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Upload, ArrowUpRight, X, Sparkles } from "lucide-react";
import ContactIntelligence from "../components/ContactIntelligence";
import { getUnifiedContacts, StoredContact } from "@/lib/contactsHistory";

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
  const [contactsList, setContactsList] = useState<StoredContact[]>([]);

  useEffect(() => {
    setContactsList(getUnifiedContacts());
    const handleUpdate = () => {
      setContactsList(getUnifiedContacts());
    };
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("contacts-updated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("contacts-updated", handleUpdate);
    };
  }, []);

  const filteredContacts = contactsList.filter((c) => {
    const nameStr = c.name || "";
    const phoneStr = c.phone || "";
    const orgStr = c.organization || c.email || "";
    const scoreStr = (c as any).score || (c.priorityScore ? `${c.priorityScore}%` : "");

    const matchesSearch =
      nameStr.toLowerCase().includes(search.toLowerCase()) ||
      phoneStr.includes(search) ||
      orgStr.toLowerCase().includes(search.toLowerCase()) ||
      scoreStr.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      (c.category || "").toLowerCase() === categoryFilter.toLowerCase();

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
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF3E4] border border-black/[0.08] flex items-center justify-center text-black/40">
                        <Users className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#1A1A1A]">No contacts found</p>
                        <p className="text-xs text-black/50 max-w-sm">
                          {search || categoryFilter !== "all"
                            ? "Try adjusting your search criteria or filter to see more candidate records."
                            : "Import a contact register via CSV or manual entry to begin tracking outreach intelligence."}
                        </p>
                      </div>
                      <button
                        onClick={onUploadContacts}
                        className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Import Contacts</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => {
                  const scoreDisplay =
                    (contact as any).score ||
                    (contact.priorityScore ? `${contact.priorityScore}% Priority` : "Unscored");
                  const outcomeDisplay =
                    (contact as any).lastOutcome || contact.lastCallOutcome || "Pending";
                  const agentDisplay =
                    (contact as any).agent || contact.assignedAgent || "Unassigned";
                  const localeDisplay =
                    (contact as any).locale ||
                    (contact.city ? `${contact.city} • Indic` : "Bilingual");

                  return (
                    <tr
                      key={contact.id}
                      onClick={() => onViewContactDossier(contact.id)}
                      className="hover:bg-[#FAF3E4]/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4">
                        <div className="font-semibold text-[#1A1A1A] group-hover:text-black transition-colors text-sm">
                          {contact.name}
                        </div>
                        <div className="text-xs text-black/50 mt-0.5">
                          {contact.organization || contact.email || "No organization"}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-mono text-black/80 text-xs">{contact.phone}</div>
                        <div className="text-[10px] text-black/50 mt-0.5 font-sans">{localeDisplay}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-mono font-semibold text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full text-[11px]">
                          {scoreDisplay}
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
                          {outcomeDisplay}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-black/60 font-sans">{agentDisplay}</td>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
