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

const mockContactsList: ContactItem[] = [
  {
    id: "cont-01",
    name: "Rahul Verma",
    phone: "+91 98401 55219",
    email: "rahul.verma94@gmail.com",
    category: "High Intent",
    organization: "B.Tech CSE (AI & Robotics) • PCM 94.2%",
    lastCallOutcome: "Interested",
    lastContacted: "4 min ago",
    notes: "Scored 94% in 12th PCM. Eligible for 50% Chancellor Merit Scholarship. Booked campus tour for this Saturday.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 96,
  },
  {
    id: "cont-02",
    name: "Priya Sharma",
    phone: "+91 94402 11980",
    email: "priya.sharma_in@outlook.com",
    category: "Resolved",
    organization: "B.Tech Electronics & VLSI • PCM 89.0%",
    lastCallOutcome: "Completed",
    lastContacted: "18 min ago",
    notes: "Confirmed girls' hostel 2-sharing AC room with meal plan. Paid reservation advance fee.",
    assignedAgent: "Neha (Support)",
    priorityScore: 88,
  },
  {
    id: "cont-03",
    name: "Ananya Kumar",
    phone: "+91 98840 55120",
    email: "ananya.sports@yahoo.com",
    category: "High Intent",
    organization: "B.Tech Mechanical • Sports Quota",
    lastCallOutcome: "Interested",
    lastContacted: "25 min ago",
    notes: "State gold medalist in athletics. Inquired regarding 25% sports quota fee waiver and training facilities.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 94,
  },
  {
    id: "cont-04",
    name: "Gaurav Joshi",
    phone: "+91 98840 33219",
    email: "gaurav.joshi.mech@gmail.com",
    category: "Follow-up",
    organization: "B.Tech Data Science • Enrolled Student",
    lastCallOutcome: "Callback Requested",
    lastContacted: "1 hour ago",
    notes: "Parent requested callback after 5:30 PM regarding college transport bus routes from Secunderabad.",
    assignedAgent: "Neha (Support)",
    priorityScore: 78,
  },
  {
    id: "cont-05",
    name: "Anita Roy",
    phone: "+91 98765 11980",
    email: "anita.diploma@rediffmail.com",
    category: "Follow-up",
    organization: "Lateral Entry 2nd-Year Diploma",
    lastCallOutcome: "Human Handoff",
    lastContacted: "2 hours ago",
    notes: "Completed 3-year Mechanical Diploma with 88%. Transferred to Senior Admissions Dean for credit transfer review.",
    assignedAgent: "Neha (Support)",
    priorityScore: 82,
  },
  {
    id: "cont-06",
    name: "Vikram Malhotra",
    phone: "+91 98401 77120",
    email: "vikram.malhotra2006@gmail.com",
    category: "Resolved",
    organization: "B.Tech CSE (Autonomous Systems)",
    lastCallOutcome: "Completed",
    lastContacted: "Today, 09:30 AM",
    notes: "Counseling session booked for Saturday 10:30 AM. WhatsApp pass delivered successfully.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 91,
  },
  {
    id: "cont-07",
    name: "Deepika Sen",
    phone: "+91 91760 88231",
    email: "deepika.sen.scholar@gmail.com",
    category: "High Intent",
    organization: "B.Tech AI & Data Science • PCM 96.8%",
    lastCallOutcome: "Completed",
    lastContacted: "Yesterday",
    notes: "100% Chancellor Scholarship candidate. Online application submitted and document checklist completed.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 99,
  },
];

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
    setSelectedContact(contact);
    setDossierModalOpen(true);
  };

  const handleCallContact = (contact: ContactItem) => {
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
        { speaker: "agent", text: `Hello ${contact.name}, this is Priya from Apex Engineering College following up on your application.`, time: "00:04" },
      ],
    };
    setActiveCall(liveCallObj);
    setLiveCallModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase transition-colors"
            >
              WORKSPACES
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-950 bg-[#cdfb56]/30 px-2.5 py-0.5 rounded-full border border-[#cdfb56]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926]" />
              Directory Synced
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Contacts & Applicant Directory
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Applicant qualification profiles, PCM cutoff scores, conversation history, and CRM dossiers.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#f7fee7] text-slate-800 hover:text-slate-950 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:border-[#cdfb56] shadow-2xs transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Upload CSV</span>
          </button>

          <Link
            href="/dashboard/campaigns"
            className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-slate-950" />
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
          description="Candidates with PCM > 90% and confirmed counseling intent."
          metric="31 students"
          metricLabel="96.2 average qualification score"
          status="Priority queue"
          statusType="ready"
          actionLabel="View high intent →"
          onClick={() => setCategoryFilter("High Intent")}
        />

        <WorkspaceCard
          name="Counseling Confirmed"
          icon={CheckCircle2}
          description="Students scheduled for Saturday campus tours and dean interviews."
          metric="182 confirmed"
          metricLabel="Passes issued via WhatsApp & SMS"
          status="Active schedule"
          statusType="running"
          actionLabel="View appointments →"
          onClick={() => setCategoryFilter("Resolved")}
        />

        <WorkspaceCard
          name="Pending Follow-up"
          icon={AlertCircle}
          description="Callbacks requested by parents for evening hours or fee assistance."
          metric="19 queued"
          metricLabel="Auto-retry scheduled after 5:00 PM"
          status="Action needed"
          statusType="neutral"
          actionLabel="Inspect callbacks →"
          onClick={() => setCategoryFilter("Follow-up")}
        />

        <WorkspaceCard
          name="Total Directory"
          icon={Users}
          description="Verified collegiate applicant registry with phone and academic records."
          metric="1,840 contacts"
          metricLabel="412 reached today across departments"
          status="Directory active"
          statusType="ready"
          actionLabel="Show all contacts →"
          onClick={() => setCategoryFilter("all")}
        />
      </div>

      {/* ======================================================================= */}
      {/* SEARCH & FILTER BAR                                                     */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Contacts", count: mockContactsList.length },
              { id: "High Intent", label: "High Intent (31)" },
              { id: "Follow-up", label: "Follow-up Needed (19)" },
              { id: "Resolved", label: "Resolved (52)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-[#cdfb56] text-slate-950 border border-[#bceb42] shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, phone, email, course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/70 border border-slate-200/90 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cdfb56] focus:border-[#cdfb56] transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* CONTACTS TABLE                                                          */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Table Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Applicant Records
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              ({filteredContacts.length} verified)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Click Dossier to view complete qualification profile
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Academic Segment</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Last Outcome</th>
                <th className="py-3 px-4">Assigned Agent</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-[#f7fee7]/30 transition-colors group"
                >
                  {/* Name & Phone */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 group-hover:text-slate-950">
                      {contact.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {contact.phone} • {contact.email}
                    </div>
                  </td>

                  {/* Organization / Academic Segment */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-medium text-slate-800 truncate">
                      {contact.organization}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {contact.notes}
                    </div>
                  </td>

                  {/* Category Pill */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        contact.category === "High Intent"
                          ? "bg-[#cdfb56]/40 text-slate-950 border-[#cdfb56]"
                          : contact.category === "Follow-up"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {contact.category}
                    </span>
                  </td>

                  {/* Last Outcome */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-700">
                      {contact.lastCallOutcome}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {contact.lastContacted}
                    </span>
                  </td>

                  {/* Assigned Agent */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                    {contact.assignedAgent}
                  </td>

                  {/* Priority Score */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900 font-mono">
                        {contact.priorityScore}
                      </span>
                      <span className="text-[10px] text-slate-400">/ 100</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => handleCallContact(contact)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 border border-[#bceb42] shadow-2xs transition-all cursor-pointer"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call</span>
                    </button>

                    <button
                      onClick={() => handleOpenDossier(contact)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Dossier</span>
                    </button>
                  </td>
                </tr>
              ))}
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
