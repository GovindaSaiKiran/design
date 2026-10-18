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
  Phone,
  X,
  ArrowUpRight,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import UploadContactsModal from "@/components/dashboard/modals/UploadContactsModal";
import ContactDossierModal from "@/components/dashboard/modals/ContactDossierModal";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import { ContactItem, LiveCallItem } from "@/types/dashboard";
import { mockContacts } from "@/data/mock/dashboardData";

export default function ContactsPage() {
  const [contactsList, setContactsList] = useState<ContactItem[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [dossierModalOpen, setDossierModalOpen] = useState(false);
  const [liveCallModalOpen, setLiveCallModalOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<LiveCallItem | null>(null);
  const [confirmCallContact, setConfirmCallContact] = useState<ContactItem | null>(null);

  const filteredContacts = useMemo(() => {
    return contactsList.filter((c) => {
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
  }, [contactsList, searchQuery, categoryFilter]);

  const handleOpenDossier = (contact: ContactItem) => {
    setSelectedContact(contact);
    setDossierModalOpen(true);
  };

  const handleInitiateCallConfirmed = () => {
    if (!confirmCallContact) return;
    const contact = confirmCallContact;
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
    setConfirmCallContact(null);
    setLiveCallModalOpen(true);
  };

  const highIntentCount = contactsList.filter((c) => c.category === "High Intent").length;
  const followUpCount = contactsList.filter((c) => c.category === "Follow-up").length;
  const resolvedCount = contactsList.filter((c) => c.category === "Resolved").length;

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A]">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/45 hover:text-black transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-[#BCD0F5] px-3 py-0.5 rounded-full">
              Contacts &amp; Lists
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Contacts &amp; Applicant Lists
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Manage caller contacts, qualification dossiers, lead temperature, and outbound campaign lists.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-full border border-black/[0.06] transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-black/50" />
            <span>Upload Contacts CSV</span>
          </button>

          <Link
            href="/dashboard/campaigns"
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span>Launch Outreach</span>
          </Link>
        </div>
      </div>

      {/* 4 Workspace Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="High Intent Contacts"
          icon={Star}
          description="Candidates with high qualification scores and confirmed intent."
          metric={`${highIntentCount} contacts`}
          metricLabel="Ready for follow-up"
          status="Priority"
          statusType="ready"
          actionLabel="View high intent →"
          onClick={() => setCategoryFilter("High Intent")}
        />

        <WorkspaceCard
          name="Scheduled Appointments"
          icon={CheckCircle2}
          description="Candidates with confirmed counseling slots and campus visits."
          metric={`${resolvedCount} confirmed`}
          metricLabel="Bookings verified"
          status="Confirmed"
          statusType="ready"
          actionLabel="View appointments →"
          onClick={() => setCategoryFilter("Resolved")}
        />

        <WorkspaceCard
          name="Pending Follow-ups"
          icon={AlertCircle}
          description="Callers who requested evening callback windows."
          metric={`${followUpCount} queued`}
          metricLabel="Action required"
          status="Pending"
          statusType="warning"
          actionLabel="Inspect callbacks →"
          onClick={() => setCategoryFilter("Follow-up")}
        />

        <WorkspaceCard
          name="Total Directory"
          icon={Users}
          description="Verified applicant and lead registry with telephone and notes."
          metric={`${contactsList.length} contacts`}
          metricLabel="100% consent verified"
          status="Synced"
          statusType="neutral"
          actionLabel="Show all contacts →"
          onClick={() => setCategoryFilter("all")}
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: `All Contacts (${contactsList.length})` },
              { id: "High Intent", label: `High Intent (${highIntentCount})` },
              { id: "Follow-up", label: `Follow-up (${followUpCount})` },
              { id: "Resolved", label: `Resolved (${resolvedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-[#111111] text-white shadow-sm"
                    : "bg-[#FBF7ED] text-black/60 hover:text-black border border-black/[0.06]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, phone, email, course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all placeholder:text-black/40"
            />
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] overflow-hidden shadow-2xs">
        {/* Table Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1A1A1A]">
              Contact Records
            </span>
            <span className="text-xs text-black/45 font-medium">
              ({filteredContacts.length} verified)
            </span>
          </div>
          <span className="text-xs text-black/50 hidden sm:inline">
            Click Dossier to view complete qualification profile
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-5">Contact Name</th>
                <th className="py-3 px-5">Academic Segment</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Last Outcome</th>
                <th className="py-3 px-5">Assigned Agent</th>
                <th className="py-3 px-5">Score</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#BCD0F5] text-[#1E3A8A] flex items-center justify-center mx-auto">
                        <Users className="w-6 h-6 text-[#1E3A8A]" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">No contacts found</h3>
                      <p className="text-xs text-black/55 leading-relaxed">
                        No contacts match your active filter. Upload a CSV list or adjust search criteria.
                      </p>
                      <button
                        onClick={() => setUploadModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5 text-white" />
                        <span>Upload Contacts CSV</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-black/[0.015] transition-colors group text-[#1A1A1A]"
                  >
                    {/* Name & Phone */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-[#1A1A1A]">
                        {contact.name}
                      </div>
                      <div className="text-[11px] text-black/50 mt-0.5">
                        {contact.phone} • {contact.email}
                      </div>
                    </td>

                    {/* Organization / Academic Segment */}
                    <td className="py-4 px-5 max-w-xs">
                      <div className="font-medium text-[#1A1A1A] truncate">
                        {contact.organization}
                      </div>
                      <div className="text-[11px] text-black/50 truncate mt-0.5">
                        {contact.notes}
                      </div>
                    </td>

                    {/* Category Pill */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium ${
                          contact.category === "High Intent"
                            ? "bg-[#C1F2D5] text-[#0D593F]"
                            : contact.category === "Follow-up"
                            ? "bg-[#FFD9A0] text-[#733F00]"
                            : "bg-[#BCD0F5] text-[#1E3A8A]"
                        }`}
                      >
                        {contact.category}
                      </span>
                    </td>

                    {/* Last Outcome */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="font-medium text-[#1A1A1A]">
                        {contact.lastCallOutcome}
                      </span>
                      <span className="text-[11px] text-black/50 block mt-0.5">
                        {contact.lastContacted}
                      </span>
                    </td>

                    {/* Assigned Agent */}
                    <td className="py-4 px-5 whitespace-nowrap text-black/55 font-medium">
                      {contact.assignedAgent}
                    </td>

                    {/* Priority Score */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[#1A1A1A]">
                          {contact.priorityScore}
                        </span>
                        <span className="text-[11px] text-black/45">/ 100</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setConfirmCallContact(contact)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#111111] hover:bg-black text-white transition-all cursor-pointer shadow-xs"
                      >
                        <PhoneCall className="w-3 h-3 text-white" />
                        <span>Call</span>
                      </button>

                      <button
                        onClick={() => handleOpenDossier(contact)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                      >
                        <FileText className="w-3 h-3 text-black/50" />
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

      {/* Confirmation Modal Before Initiating Outbound Live Call (Requirement 4) */}
      {confirmCallContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-black/[0.06] rounded-[28px] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD9A0] text-[#733F00] flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 text-[#733F00]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A1A1A]">Confirm Outbound Call</h3>
                <p className="text-xs text-black/50">Telephony carrier dispatch verification</p>
              </div>
            </div>

            <p className="text-xs text-[#1A1A1A] leading-relaxed">
              Are you sure you want to trigger a live outbound call to <strong>{confirmCallContact.name}</strong> ({confirmCallContact.phone})? The assigned agent <strong>{confirmCallContact.assignedAgent}</strong> will initiate conversation immediately.
            </p>

            <div className="p-3.5 bg-[#FBF7ED] rounded-[18px] border border-black/[0.06] text-xs text-black/60">
              <span className="font-semibold text-[#1A1A1A]">Carrier Compliance Note:</span> Outbound calls consume telephony minute balance and are recorded with caller disclosure.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setConfirmCallContact(null)}
                className="px-4 py-2 text-xs font-semibold text-black/60 hover:text-black border border-black/[0.06] bg-[#FBF7ED] hover:bg-[#FAF3E4] rounded-full transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleInitiateCallConfirmed}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-black rounded-full shadow-sm transition-all cursor-pointer"
              >
                Confirm &amp; Dial Now
              </button>
            </div>
          </div>
        </div>
      )}

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
