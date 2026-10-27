"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Plus,
  Clock,
  Calendar,
  Sparkles,
  Database,
  History,
  Tag,
  Check,
  Trash2,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import UploadContactsModal from "@/components/dashboard/modals/UploadContactsModal";
import ContactDossierModal from "@/components/dashboard/modals/ContactDossierModal";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import { ContactItem, LiveCallItem } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";
import {
  StoredContact,
  ContactBatchHistoryItem,
  ENTERPRISE_CALL_CENTER_METRICS,
  INITIAL_UNIFIED_CONTACTS,
  INITIAL_PREVIOUS_BATCHES,
  getUnifiedContacts,
  getUserContactsHistory,
  getUserContactBatches,
  saveUserContact,
  saveUserContactBatch,
} from "@/lib/contactsHistory";

export default function ContactsPage() {
  // Main contacts list (unified from system + user provided history)
  const [contactsList, setContactsList] = useState<StoredContact[]>(INITIAL_UNIFIED_CONTACTS);
  const [userBatches, setUserBatches] = useState<ContactBatchHistoryItem[]>(INITIAL_PREVIOUS_BATCHES);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "user-history" | "system">("all");

  // Active view tab: "directory" vs "batches"
  const [activeViewTab, setActiveViewTab] = useState<"directory" | "user-history" | "batches">("directory");

  // Modals state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [addContactModalOpen, setAddContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [dossierModalOpen, setDossierModalOpen] = useState(false);
  const [liveCallModalOpen, setLiveCallModalOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<LiveCallItem | null>(null);
  const [confirmCallContact, setConfirmCallContact] = useState<ContactItem | null>(null);

  // New Contact form state
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newOrg, setNewOrg] = useState("");
  const [newCategory, setNewCategory] = useState<"High Intent" | "Follow-up" | "Resolved">("High Intent");
  const [newCity, setNewCity] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load contacts and batches from persistent storage
  const reloadContacts = () => {
    const unified = getUnifiedContacts();
    setContactsList(unified);
    const batches = getUserContactBatches();
    setUserBatches(batches);
  };

  useEffect(() => {
    reloadContacts();
  }, []);

  // Filtered contacts based on search, category, and source
  const filteredContacts = useMemo(() => {
    return contactsList.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.organization && c.organization.toLowerCase().includes(q)) ||
        (c.city && c.city.toLowerCase().includes(q));

      const matchesCat =
        categoryFilter === "all" ||
        (categoryFilter === "High Intent" && c.category === "High Intent") ||
        (categoryFilter === "Follow-up" && c.category === "Follow-up") ||
        (categoryFilter === "Resolved" && c.category === "Resolved");

      // Source filter or active view tab
      if (activeViewTab === "user-history") {
        if (c.source === "system") return false;
      }

      if (sourceFilter === "user-history" && c.source === "system") return false;
      if (sourceFilter === "system" && c.source !== "system") return false;

      return matchesSearch && matchesCat;
    });
  }, [contactsList, searchQuery, categoryFilter, sourceFilter, activeViewTab]);

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
      agentName: contact.assignedAgent || "Maya (Admissions)",
      direction: "outbound",
      durationSeconds: 15,
      durationFormatted: "00:15",
      currentSentiment: "positive",
      intent: contact.organization,
      latestSnippet: contact.notes || "Inquired about eligibility and scholarships.",
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

  // Add new contact provided by user
  const handleAddNewContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    try {
      soundSynth.playSuccess();
    } catch {}

    saveUserContact({
      name: newName.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      organization: newOrg,
      category: newCategory,
      city: newCity,
      notes: newNotes.trim() || "User manual entry saved in contact history.",
      assignedAgent: "Maya (Admissions)",
      priorityScore: 85,
      source: "user_manual",
      lastCallOutcome: "New Contact",
      lastContacted: "Just added",
    });

    setToastMessage(`Contact "${newName}" successfully saved to contacts history!`);
    setNewName("");
    setNewPhone("");
    setNewEmail("");
    setNewNotes("");
    setAddContactModalOpen(false);
    reloadContacts();

    setTimeout(() => setToastMessage(null), 5000);
  };

  // Handle CSV import callback
  const handleContactsUploaded = (count: number, fileName?: string) => {
    try {
      soundSynth.playSuccess();
    } catch {}

    const sampleImportedContacts: StoredContact[] = Array.from({ length: Math.min(count, 5) }, (_, i) => ({
      id: `imp-${Date.now()}-${i + 1}`,
      name: `Contact #${i + 1}`,
      phone: `+91 98000 ${String(10000 + i).slice(-4)}`,
      email: `contact${i + 1}@example.com`,
      category: "High Intent",
      organization: "Direct Contact",
      city: "National",
      notes: `Imported via CSV: ${fileName || "Contacts_List.csv"}`,
      assignedAgent: "Maya AI",
      priorityScore: 90,
      source: "user_csv",
      addedAt: "Just now",
      lastCallOutcome: "Queued for Outreach",
      lastContacted: "Imported today",
    }));

    saveUserContactBatch(
      `Imported: ${fileName || "Contacts_List.csv"} (${count} leads)`,
      sampleImportedContacts,
      "csv_upload",
      "Maya AI"
    );

    setToastMessage(`Successfully imported ${count} contacts and logged to user history!`);
    reloadContacts();
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Counts
  const userHistoryContacts = contactsList.filter((c) => c.source !== "system");
  const highIntentCount = contactsList.filter((c) => c.category === "High Intent").length;
  const followUpCount = contactsList.filter((c) => c.category === "Follow-up").length;
  const resolvedCount = contactsList.filter((c) => c.category === "Resolved").length;

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A] pb-16">
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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full">
              Contacts
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2 flex items-center gap-2.5">
            Contacts &amp; User History
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {contactsList.length.toLocaleString()} Leads in Call Center Directory
            </span>
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Enterprise AI Call Center Contacts Directory. Manage high-volume applicant cohorts, track previous contacts history provided by user, monitor automated inbound and outbound call disposition, and launch bulk AI voice campaigns.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setAddContactModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-900 text-xs font-semibold px-3.5 py-2.5 rounded-full border border-slate-200 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-purple-600" />
            <span>Add Contact</span>
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-full border border-black/[0.06] transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-black/50" />
            <span>Upload Contacts CSV</span>
          </button>

          <Link
            href="/dashboard/outbound-scheduler"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm shadow-purple-600/20"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span>Outbound Scheduler</span>
          </Link>
        </div>
      </div>

      {/* Success Toast */}
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="p-1 text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4 Workspace Summary Cards (Enterprise Call Center Telemetry) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="User Contacts History"
          icon={History}
          description="Contacts and cohorts explicitly provided by user via Outbound Scheduler, CSV, or manual entries."
          metric={`${userHistoryContacts.length.toLocaleString()} leads`}
          metricLabel={userBatches.length > 0 ? `Stored across ${userBatches.length} user batches` : "No user batches yet"}
          status={userHistoryContacts.length > 0 ? "Persistent" : "Empty"}
          statusType={userHistoryContacts.length > 0 ? "ready" : "neutral"}
          actionLabel="View user history →"
          onClick={() => {
            setActiveViewTab("user-history");
            setCategoryFilter("all");
          }}
        />

        <WorkspaceCard
          name="High Intent Contacts"
          icon={Star}
          description="Contacts with high engagement or conversion probability ready for outreach."
          metric={`${highIntentCount.toLocaleString()} leads`}
          metricLabel={highIntentCount > 0 ? "Ready for outbound cadence" : "No high intent leads"}
          status={highIntentCount > 0 ? "Priority" : "Idle"}
          statusType={highIntentCount > 0 ? "ready" : "neutral"}
          actionLabel="View high intent →"
          onClick={() => {
            setActiveViewTab("directory");
            setCategoryFilter("High Intent");
          }}
        />

        <WorkspaceCard
          name="Call Center Traffic"
          icon={PhoneCall}
          description="High-volume enterprise call center calls handled today by autonomous AI agent pool."
          metric={`${(ENTERPRISE_CALL_CENTER_METRICS.inboundCallsHandled + ENTERPRISE_CALL_CENTER_METRICS.outboundCallsHandled).toLocaleString()} Calls`}
          metricLabel={`${ENTERPRISE_CALL_CENTER_METRICS.inboundCallsHandled.toLocaleString()} In • ${ENTERPRISE_CALL_CENTER_METRICS.outboundCallsHandled.toLocaleString()} Out`}
          status={ENTERPRISE_CALL_CENTER_METRICS.inboundCallsHandled + ENTERPRISE_CALL_CENTER_METRICS.outboundCallsHandled > 0 ? "Active" : "Idle"}
          statusType="ready"
          actionLabel="Inspect dialer queue →"
          onClick={() => {
            setActiveViewTab("batches");
          }}
        />

        <WorkspaceCard
          name="Ingestion Batches"
          icon={Database}
          description="Historical logs of contact lists and cohorts imported into the platform for automated dialing."
          metric={`${userBatches.length} batches`}
          metricLabel={`${contactsList.length.toLocaleString()} leads indexed`}
          status={userBatches.length > 0 ? "Active" : "Idle"}
          statusType="neutral"
          actionLabel="Inspect batches →"
          onClick={() => setActiveViewTab("batches")}
        />
      </div>

      {/* Primary Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-black/[0.06] pb-3">
        <button
          onClick={() => {
            setActiveViewTab("directory");
            setSourceFilter("all");
            try {
              soundSynth.play("click");
            } catch {}
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeViewTab === "directory"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>All Contacts ({ENTERPRISE_CALL_CENTER_METRICS.totalDirectoryContacts.toLocaleString()} Directory Leads)</span>
        </button>

        <button
          onClick={() => {
            setActiveViewTab("user-history");
            try {
              soundSynth.play("click");
            } catch {}
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeViewTab === "user-history"
              ? "bg-purple-600 text-white shadow-xs"
              : "text-purple-700 hover:bg-purple-50 bg-purple-50/50"
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>User Contacts History ({ENTERPRISE_CALL_CENTER_METRICS.userHistoryCount.toLocaleString()} Leads)</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              activeViewTab === "user-history" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-800"
            }`}
          >
            Provided by User
          </span>
        </button>

        <button
          onClick={() => {
            setActiveViewTab("batches");
            try {
              soundSynth.play("click");
            } catch {}
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeViewTab === "batches"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Ingestion Logs ({userBatches.length} Batches)</span>
        </button>
      </div>

      {/* =========================================================================
          VIEW 1 & 2: CONTACTS DIRECTORY / USER CONTACTS HISTORY
      ========================================================================= */}
      {activeViewTab !== "batches" && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-[26px] border border-black/[0.06] p-4 space-y-3 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {[
                  { id: "all", label: `All (${activeViewTab === "user-history" ? userHistoryContacts.length : contactsList.length})` },
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
                  placeholder="Search by student name, phone, email, course, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-black/40"
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
                  {activeViewTab === "user-history" ? "Previous Contacts Given by User" : "Contact Records"}
                </span>
                <span className="text-xs text-black/45 font-medium">
                  ({filteredContacts.length} records)
                </span>
              </div>
              <span className="text-xs text-black/50 hidden sm:inline">
                Click Dossier to view complete qualification profile &amp; interaction notes
              </span>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-5">Contact &amp; Details</th>
                    <th className="py-3 px-5">Academic Segment</th>
                    <th className="py-3 px-5">Category &amp; Source</th>
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
                          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                            <Users className="w-6 h-6 text-purple-700" />
                          </div>
                          <h3 className="text-sm font-bold text-[#1A1A1A]">No contacts found</h3>
                          <p className="text-xs text-black/55 leading-relaxed">
                            {activeViewTab === "user-history"
                              ? "No previous contacts history matches your search. Add contacts manually or upload a CSV."
                              : "No contacts match your active filter. Adjust search criteria or add new contacts."}
                          </p>
                          <button
                            onClick={() => setAddContactModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5 text-white" />
                            <span>Add Contact to History</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="hover:bg-purple-50/20 transition-colors group text-[#1A1A1A]"
                      >
                        {/* Name, Phone & Email */}
                        <td className="py-4 px-5">
                          <div className="font-semibold text-[#1A1A1A] group-hover:text-purple-700 transition-colors">
                            {contact.name}
                          </div>
                          <div className="text-[11px] text-black/50 mt-0.5 font-mono">
                            {contact.phone} • <span className="font-sans">{contact.email}</span>
                          </div>
                          {contact.city && (
                            <span className="text-[10px] text-slate-400 block mt-0.5">{contact.city}</span>
                          )}
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

                        {/* Category & Source Pill */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="space-y-1">
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

                            {/* Source Pill */}
                            <div>
                              {contact.source === "outbound_scheduler" && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                                  Outbound Scheduler
                                </span>
                              )}
                              {contact.source === "user_csv" && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                                  CSV Upload
                                </span>
                              )}
                              {contact.source === "user_manual" && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                                  Manual Entry
                                </span>
                              )}
                              {contact.source === "system" && (
                                <span className="text-[10px] text-slate-400 block">
                                  System Directory
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Last Outcome */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className="font-medium text-[#1A1A1A] block">
                            {contact.lastCallOutcome || "Ready for Outreach"}
                          </span>
                          <span className="text-[11px] text-black/50 block mt-0.5">
                            {contact.lastContacted || contact.addedAt || "Active"}
                          </span>
                        </td>

                        {/* Assigned Agent */}
                        <td className="py-4 px-5 whitespace-nowrap text-black/55 font-medium">
                          <Link
                            href="/dashboard/agents"
                            className="hover:text-purple-600 transition-colors"
                          >
                            {contact.assignedAgent || "Maya (Admissions)"}
                          </Link>
                        </td>

                        {/* Priority Score */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#1A1A1A]">
                              {contact.priorityScore || 85}
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
        </div>
      )}

      {/* =========================================================================
          VIEW 3: INGESTION LOGS & USER CONTACT BATCHES
      ========================================================================= */}
      {activeViewTab === "batches" && (
        <div className="space-y-4">
          <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  User Contacts Ingestion Logs &amp; Previous Batches
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete historical record of contact lists uploaded by user or scheduled in outbound campaigns.
                </p>
              </div>

              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Batch</span>
              </button>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {userBatches.map((batch) => (
                <div key={batch.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Database className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{batch.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span>{batch.timestamp}</span>
                        <span>•</span>
                        <span className="font-semibold text-purple-700">{batch.count} contacts</span>
                        <span>•</span>
                        <span className="capitalize">{batch.source.replace("_", " ")}</span>
                        <span>•</span>
                        <span>Assigned: {batch.agentAssigned}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveViewTab("user-history");
                        setSearchQuery(batch.title.split(":")[0]);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      View Contacts
                    </button>

                    <Link
                      href={`/dashboard/outbound-scheduler?cohort=${batch.id}`}
                      className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Dial Cohort</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD NEW CONTACT TO HISTORY
      ========================================================================= */}
      {addContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold">
                  <Plus className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Add Contact to User History</h3>
                  <p className="text-xs text-slate-500">Record a new student lead into persistent contacts memory</p>
                </div>
              </div>
              <button
                onClick={() => setAddContactModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewContact} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Student / Candidate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harish Chandra"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (E.164)</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98400 12345"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Organization / Department</label>
                  <input
                    type="text"
                    placeholder="Acme Technologies"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Lead Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="High Intent">High Intent (Priority)</option>
                    <option value="Follow-up">Follow-up Needed</option>
                    <option value="Resolved">Resolved / Demo Confirmed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Notes / Qualification Summary</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Inquired about enterprise voice SLA and CRM integration..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddContactModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-full shadow-sm"
                >
                  Save to History
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal Before Initiating Outbound Live Call */}
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
              Are you sure you want to trigger a live outbound call to <strong>{confirmCallContact.name}</strong> ({confirmCallContact.phone})? The assigned agent <strong>{confirmCallContact.assignedAgent || "Maya"}</strong> will initiate conversation immediately.
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
        onContactsUploaded={handleContactsUploaded}
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
