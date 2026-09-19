"use client";

import React, { useState } from "react";
import { Users, Search, Filter, Upload, Download, Flame, CheckCircle2, RotateCw, Phone, ArrowUpRight } from "lucide-react";
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
      name: "Rahul Verma",
      phone: "+91 98401 55219",
      organization: "Applicant — B.Tech CSE (AI & Robotics)",
      category: "High Intent",
      lastOutcome: "Interested",
      lastTime: "4 min ago",
      agent: "Admissions Agent",
    },
    {
      id: "c-2",
      name: "Vikram Malhotra",
      phone: "+91 98401 77120",
      organization: "Applicant — B.Tech Data Science",
      category: "High Intent",
      lastOutcome: "Interested",
      lastTime: "2 min ago",
      agent: "Admissions Agent",
    },
    {
      id: "c-3",
      name: "Anita Roy",
      phone: "+91 98765 11980",
      organization: "Applicant — Lateral Entry Diploma",
      category: "Follow-up",
      lastOutcome: "Human Handoff",
      lastTime: "8 min ago",
      agent: "Student Support",
    },
    {
      id: "c-4",
      name: "Deepika Sen",
      phone: "+91 91760 88231",
      organization: "Applicant — 100% Merit Scholarship",
      category: "Resolved",
      lastOutcome: "Completed",
      lastTime: "25 min ago",
      agent: "Admissions Agent",
    },
    {
      id: "c-5",
      name: "Gaurav Joshi",
      phone: "+91 98840 33219",
      organization: "Parent — Hostel & Transport Inquiry",
      category: "Follow-up",
      lastOutcome: "Callback Requested",
      lastTime: "36 min ago",
      agent: "Student Support",
    },
  ];

  const filteredContacts = contactsList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.organization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Neo Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md bg-black text-[#d6ff38] border-2 border-black shadow-[2px_2px_0px_#000000] -rotate-1">
              📊 PIPELINE INTELLIGENCE
            </span>
            <span className="px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              412 CONTACTS CAPTURED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
            Students & Contacts Directory
          </h1>
          <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
            Auto-categorized student and parent profiles synthesized in real-time from autonomous admissions phone interactions.
          </p>
        </div>

        <button
          onClick={onUploadContacts}
          className="px-5 py-3 rounded-xl bg-[#d6ff38] hover:bg-[#bbf01b] text-black text-xs font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Upload className="w-4 h-4 stroke-[3]" />
          <span>Import CSV Contacts</span>
        </button>
      </div>

      {/* Overview Cards */}
      <ContactIntelligence onViewContact={onViewContactDossier} />

      {/* Searchable Contact Table */}
      <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-black">
          <h3 className="text-xl font-black text-black tracking-tight uppercase">
            Verified Student Contacts
          </h3>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="Search contact name, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl text-xs font-bold bg-white border-2 border-black shadow-[3px_3px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:outline-none text-black w-48 sm:w-64 transition-all placeholder:text-black/50"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border-3 border-black rounded-xl shadow-[4px_4px_0px_#000000]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-black text-white text-[11px] font-black uppercase tracking-wider border-b-2 border-black">
                <th className="py-3 px-3.5">Name & Degree Goal</th>
                <th className="py-3 px-3.5">Phone</th>
                <th className="py-3 px-3.5">Category</th>
                <th className="py-3 px-3.5">Last Call Outcome</th>
                <th className="py-3 px-3.5">Assigned Agent</th>
                <th className="py-3 px-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black bg-white font-bold text-black">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => onViewContactDossier(contact.id)}
                  className="hover:bg-[#d6ff38]/20 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-3.5">
                    <div className="font-black text-black group-hover:underline text-sm">{contact.name}</div>
                    <div className="text-[11px] font-bold text-black/60">{contact.organization}</div>
                  </td>
                  <td className="py-3.5 px-3.5 font-mono font-black text-black">{contact.phone}</td>
                  <td className="py-3.5 px-3.5">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] ${
                      contact.category === "High Intent"
                        ? "bg-[#ffe600] text-black"
                        : contact.category === "Resolved"
                        ? "bg-[#d6ff38] text-black"
                        : "bg-[#00f0ff] text-black"
                    }`}>
                      {contact.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3.5 font-black text-black">{contact.lastOutcome}</td>
                  <td className="py-3.5 px-3.5 font-black text-black">{contact.agent}</td>
                  <td className="py-3.5 px-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewContactDossier(contact.id);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#d6ff38] hover:bg-[#bbf01b] text-black border-2 border-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      Dossier
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
