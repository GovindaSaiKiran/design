"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Upload,
  Download,
  PhoneCall,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Star,
  Eye,
  Filter,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import UploadContactsModal from "@/components/dashboard/modals/UploadContactsModal";
import ContactDossierModal from "@/components/dashboard/modals/ContactDossierModal";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import { ContactItem, LiveCallItem } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";

const mockContactsList: ContactItem[] = [];

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [dossierModalOpen, setDossierModalOpen] = useState(false);
  const [liveCallModalOpen, setLiveCallModalOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<LiveCallItem | null>(null);

  const filteredContacts = useMemo(() => {
    return mockContactsList.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.organization.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        categoryFilter === "all" ||
        (categoryFilter === "High Intent" && c.category === "High Intent") ||
        (categoryFilter === "Follow-up" && c.category === "Follow-up") ||
        (categoryFilter === "Resolved" && c.category === "Resolved");

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, categoryFilter]);

  const handleOpenDossier = (contact: ContactItem) => {
    try { soundSynth.play("click"); } catch {}
    setSelectedContact(contact);
    setDossierModalOpen(true);
  };

  const handleCallContact = (contact: ContactItem) => {
    try { soundSynth.play("confirm"); } catch {}
    const liveCallObj: LiveCallItem = {
      id: `call-${contact.id}`,
      callerNumber: contact.phone,
      callerName: contact.name,
      agentId: "agent-admissions",
      agentName: contact.assignedAgent,
      direction: "outbound",
      durationSeconds: 15,
      durationFormatted: "00:15",
      currentSentiment: "positive",
      intent: contact.organization,
      latestSnippet: contact.notes,
      audioWaveLevels: [30, 60, 85, 45, 70, 90, 65, 80, 50, 75, 40],
      startedAt: "Just now",
      latencyMs: 138,
      transcript: [
        { speaker: "system", text: `Outbound call connected to ${contact.name}.`, time: "00:00" },
        { speaker: "agent", text: `Hello ${contact.name}, this is our voice assistant calling regarding your inquiry.`, time: "00:04" },
      ],
    };
    setActiveCall(liveCallObj);
    setLiveCallModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none text-white">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#71717A] hover:text-white transition-colors"
            >
              DIRECTORY WORKSPACE
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white bg-[#121215] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              DIRECTORY SYNCED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Contacts & Applicant Directory
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Applicant qualification profiles, PCM cutoff metrics, conversation history, and institutional CRM dossiers.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setUploadModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-mono uppercase tracking-wider px-3.5 py-2 rounded-[2px] border border-[#27272A] hover:border-white transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>Upload CSV</span>
          </button>

          <Link
            href="/dashboard/campaigns"
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-black" />
            <span>Launch Outreach</span>
          </Link>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="High Intent Applicants"
          icon={Star}
          description="Candidates with high qualification scores and confirmed intent."
          metric="0 contacts"
          metricLabel="0% qualification yield"
          status="Empty"
          statusType="neutral"
          actionLabel="View high intent →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setCategoryFilter("High Intent");
          }}
        />

        <WorkspaceCard
          name="Counseling Confirmed"
          icon={CheckCircle2}
          description="Candidates scheduled for appointments and consultations."
          metric="0 confirmed"
          metricLabel="No appointments scheduled"
          status="None"
          statusType="ready"
          actionLabel="View appointments →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setCategoryFilter("Resolved");
          }}
        />

        <WorkspaceCard
          name="Pending Follow-up"
          icon={AlertCircle}
          description="Callbacks requested by callers for evening hours or assistance."
          metric="0 queued"
          metricLabel="No pending callbacks"
          status="Clean"
          statusType="neutral"
          actionLabel="Inspect callbacks →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setCategoryFilter("Follow-up");
          }}
        />

        <WorkspaceCard
          name="Total Directory"
          icon={Users}
          description="Verified applicant and lead registry with phone and notes."
          metric="0 contacts"
          metricLabel="0 reached today"
          status="Ready for import"
          statusType="ready"
          actionLabel="Show all contacts →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setCategoryFilter("all");
          }}
        />
      </div>

      {/* ======================================================================= */}
      {/* SEARCH & FILTER BAR                                                     */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-3.5 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Contacts (0)" },
              { id: "High Intent", label: "High Intent (0)" },
              { id: "Follow-up", label: "Follow-up (0)" },
              { id: "Resolved", label: "Resolved (0)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setCategoryFilter(tab.id);
                }}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-white text-black font-bold shadow-xs"
                    : "bg-[#121215] text-[#71717A] hover:text-white border border-[#27272A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, phone, email, course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-[#121215] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all placeholder:text-[#71717A]"
            />
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* CONTACTS TABLE                                                          */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
        {/* Table Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#121215] border-b border-[#27272A]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Applicant Records
            </span>
            <span className="text-[11px] text-[#A1A1AA] font-mono">
              ({filteredContacts.length} VERIFIED)
            </span>
          </div>
          <span className="text-[11px] text-[#71717A] font-mono hidden sm:inline">
            Click Dossier to view complete qualification profile
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#121215]/80 border-b border-[#27272A] text-[#71717A] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Student Name</th>
                <th className="py-3 px-4 font-bold">Academic Segment</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Last Outcome</th>
                <th className="py-3 px-4 font-bold">Assigned Agent</th>
                <th className="py-3 px-4 font-bold">Score</th>
                <th className="py-3 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181B]">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-[2px] bg-[#121215] text-white flex items-center justify-center mx-auto border border-[#27272A]">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-white">No contacts in directory</h3>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        Upload a CSV contact list or connect Meta Ads/Webhooks to start automated outreach with your AI workforce.
                      </p>
                      <button
                        onClick={() => {
                          try { soundSynth.play("confirm"); } catch {}
                          setUploadModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-black" />
                        <span>Upload Contacts (CSV)</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-[#121215] transition-colors group"
                  >
                    {/* Name & Phone */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white group-hover:text-white">
                        {contact.name}
                      </div>
                      <div className="text-[11px] text-[#A1A1AA] font-mono mt-0.5">
                        {contact.phone} • {contact.email}
                      </div>
                    </td>

                    {/* Organization / Academic Segment */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-medium text-zinc-300 truncate">
                        {contact.organization}
                      </div>
                      <div className="text-[11px] text-[#71717A] truncate mt-0.5">
                        {contact.notes}
                      </div>
                    </td>

                    {/* Category Pill */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase bg-[#121215] text-zinc-300 border border-[#27272A]">
                        {contact.category}
                      </span>
                    </td>

                    {/* Last Outcome */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-medium text-zinc-300">
                        {contact.lastCallOutcome}
                      </span>
                      <span className="text-[10px] text-[#71717A] font-mono block">
                        {contact.lastContacted}
                      </span>
                    </td>

                    {/* Assigned Agent */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[#A1A1AA] font-mono">
                      {contact.assignedAgent}
                    </td>

                    {/* Priority Score */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-mono">
                        <span className="font-bold text-white">
                          {contact.priorityScore}
                        </span>
                        <span className="text-[10px] text-[#71717A]">/ 100</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => handleCallContact(contact)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-all cursor-pointer shadow-xs"
                      >
                        <PhoneCall className="w-3 h-3 text-black" />
                        <span>Call</span>
                      </button>

                      <button
                        onClick={() => handleOpenDossier(contact)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider bg-transparent hover:bg-white text-zinc-300 hover:text-black border border-[#27272A] hover:border-white transition-all cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <UploadContactsModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
      <ContactDossierModal
        isOpen={dossierModalOpen}
        onClose={() => setDossierModalOpen(false)}
        contact={selectedContact}
      />
      <LiveCallModal
        isOpen={liveCallModalOpen}
        onClose={() => setLiveCallModalOpen(false)}
        call={activeCall}
      />
    </div>
  );
}
