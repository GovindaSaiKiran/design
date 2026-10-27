"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Filter,
  Check,
  Search,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  ClipboardList,
  UserPlus,
  AlertTriangle,
  ArrowRight,
  Info,
} from "lucide-react";
import { StoredContact, INITIAL_UNIFIED_CONTACTS } from "@/lib/contactsHistory";
import { normalizePhoneNumber } from "@/lib/utils/phoneAndDateUtils";
import { soundSynth } from "@/lib/audio-synth";

export interface ContactRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  organization?: string;
  isValid: boolean;
  isDuplicate: boolean;
  isSuppressed: boolean;
  validationError?: string;
}

interface ContactSelectionSectionProps {
  contactSourceMode: "cohort" | "directory" | "csv" | "manual";
  onChangeSourceMode: (mode: "cohort" | "directory" | "csv" | "manual") => void;
  selectedCohortId: string;
  onChangeSelectedCohort: (id: string) => void;
  selectedDirectoryContactIds: string[];
  onChangeDirectoryContacts: (ids: string[]) => void;
  importedContacts: ContactRecord[];
  onChangeImportedContacts: (contacts: ContactRecord[]) => void;
  manualContacts: ContactRecord[];
  onChangeManualContacts: (contacts: ContactRecord[]) => void;
  excludeInvalidAndSuppressed: boolean;
  onToggleExcludeInvalid: (val: boolean) => void;
  consentAcknowledged: boolean;
  onToggleConsent: (val: boolean) => void;
}

export const COHORTS_LIST = [
  {
    id: "cohort-leads",
    name: "Outbound Qualified Leads",
    count: 0,
    tag: "Priority • Verified",
    description: "Contacts qualified for outbound communication and proactive outreach.",
  },
  {
    id: "cohort-followups",
    name: "Scheduled Account Follow-ups",
    count: 0,
    tag: "Follow-up Desk",
    description: "Customers awaiting scheduled consultation or follow-up discussion.",
  },
  {
    id: "cohort-user-history",
    name: "Previous Contacts History (CRM Synced)",
    count: 0,
    tag: "CRM Synced",
    description: "All contacts previously synced across directory and spreadsheet imports.",
  },
];

// Sample CSV raw rows for demo import
const SAMPLE_CSV_ROWS = [
  { name: "Aarav Patel", rawPhone: "+91 98401 22345", email: "aarav.patel@example.com", course: "Enterprise Support" },
  { name: "Ananya Iyer", rawPhone: "+91 94401 88319", email: "ananya.iyer@example.com", course: "Direct Inquiry" },
  { name: "Devansh Patil", rawPhone: "+91 97110 33499", email: "devansh.patil@example.com", course: "Priority Account" },
  { name: "Meera Krishnan", rawPhone: "+91 98210 55678", email: "meera.k@example.com", course: "Follow-up Queue" },
  { name: "Siddharth Verma", rawPhone: "+91 98112 34567", email: "siddharth.v@example.com", course: "Standard Client" },
  { name: "Duplicate Entry Test", rawPhone: "+91 98401 22345", email: "duplicate@example.com", course: "Duplicate" },
  { name: "Invalid Number Test", rawPhone: "12345", email: "invalid@example.com", course: "Invalid" },
  { name: "DND Suppressed Test", rawPhone: "+919999999999", email: "dnd@example.com", course: "Suppressed DND" },
];

export default function ContactSelectionSection({
  contactSourceMode,
  onChangeSourceMode,
  selectedCohortId,
  onChangeSelectedCohort,
  selectedDirectoryContactIds,
  onChangeDirectoryContacts,
  importedContacts,
  onChangeImportedContacts,
  manualContacts,
  onChangeManualContacts,
  excludeInvalidAndSuppressed,
  onToggleExcludeInvalid,
  consentAcknowledged,
  onToggleConsent,
}: ContactSelectionSectionProps) {
  // Manual single contact input
  const [singleName, setSingleName] = useState("");
  const [singlePhone, setSinglePhone] = useState("");
  const [singleEmail, setSingleEmail] = useState("");
  const [singleOrg, setSingleOrg] = useState("Enterprise Solutions");

  // Raw paste area
  const [pasteText, setPasteText] = useState("");

  // Directory search
  const [directorySearch, setDirectorySearch] = useState("");

  // CSV column mapping state
  const [nameCol, setNameCol] = useState("Name");
  const [phoneCol, setPhoneCol] = useState("Phone Number");
  const [emailCol, setEmailCol] = useState("Email Address");
  const [courseCol, setCourseCol] = useState("Organization / Department");
  const [csvFileName, setCsvFileName] = useState<string | null>(null);

  // Process raw sample rows into validated records
  const handleSimulateCsvUpload = () => {
    try { soundSynth.play("confirm"); } catch {}
    setCsvFileName("Outbound_Contacts_2026.csv");

    const seenPhones = new Set<string>();
    const knownDnd = new Set(["+919999999999", "+919876500000", "+919000000000"]);

    const processed: ContactRecord[] = SAMPLE_CSV_ROWS.map((r, i) => {
      const norm = normalizePhoneNumber(r.rawPhone);
      const isDup = norm.isValid && seenPhones.has(norm.normalized);
      if (norm.isValid) seenPhones.add(norm.normalized);
      const isSupp = norm.isValid && knownDnd.has(norm.normalized);

      return {
        id: `csv-${Date.now()}-${i}`,
        name: r.name,
        phone: norm.normalized || r.rawPhone,
        email: r.email,
        organization: r.course,
        isValid: norm.isValid,
        isDuplicate: isDup,
        isSuppressed: isSupp,
        validationError: !norm.isValid ? norm.error : isDup ? "Duplicate phone number in file" : isSupp ? "Number registered on National DND Registry" : undefined,
      };
    });

    onChangeImportedContacts(processed);
  };

  // Add single manual contact
  const handleAddSingleContact = () => {
    if (!singleName.trim() || !singlePhone.trim()) return;
    try { soundSynth.play("click"); } catch {}

    const norm = normalizePhoneNumber(singlePhone);
    const newRecord: ContactRecord = {
      id: `man-${Date.now()}`,
      name: singleName.trim(),
      phone: norm.normalized || singlePhone.trim(),
      email: singleEmail.trim(),
      organization: singleOrg,
      isValid: norm.isValid,
      isDuplicate: manualContacts.some((c) => c.phone === (norm.normalized || singlePhone)),
      isSuppressed: norm.normalized === "+919999999999",
      validationError: !norm.isValid ? norm.error : undefined,
    };

    onChangeManualContacts([newRecord, ...manualContacts]);
    setSingleName("");
    setSinglePhone("");
    setSingleEmail("");
  };

  // Parse raw multi-line pasted contacts
  const handleParsePastedText = () => {
    if (!pasteText.trim()) return;
    try { soundSynth.play("confirm"); } catch {}

    const lines = pasteText.split("\n").filter((l) => l.trim().length > 0);
    const seen = new Set<string>();
    const newItems: ContactRecord[] = [];

    lines.forEach((line, idx) => {
      const parts = line.split(",").map((p) => p.trim());
      const name = parts[0] || `Contact ${idx + 1}`;
      const rawPhone = parts[1] || parts[0];
      const norm = normalizePhoneNumber(rawPhone);
      const isDup = norm.isValid && seen.has(norm.normalized);
      if (norm.isValid) seen.add(norm.normalized);

      newItems.push({
        id: `paste-${Date.now()}-${idx}`,
        name,
        phone: norm.normalized || rawPhone,
        email: parts[2] || undefined,
        organization: parts[3] || "General Inbound",
        isValid: norm.isValid,
        isDuplicate: isDup,
        isSuppressed: norm.normalized === "+919999999999",
        validationError: !norm.isValid ? norm.error : isDup ? "Duplicate in pasted list" : undefined,
      });
    });

    onChangeManualContacts([...newItems, ...manualContacts]);
    setPasteText("");
  };

  // Directory filter
  const filteredDirectoryContacts = INITIAL_UNIFIED_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      c.phone.includes(directorySearch) ||
      (c.organization && c.organization.toLowerCase().includes(directorySearch.toLowerCase()))
  );

  const toggleDirectoryContact = (id: string) => {
    try { soundSynth.play("click"); } catch {}
    if (selectedDirectoryContactIds.includes(id)) {
      onChangeDirectoryContacts(selectedDirectoryContactIds.filter((cid) => cid !== id));
    } else {
      onChangeDirectoryContacts([...selectedDirectoryContactIds, id]);
    }
  };

  const selectAllDirectoryContacts = () => {
    try { soundSynth.play("click"); } catch {}
    onChangeDirectoryContacts(filteredDirectoryContacts.map((c) => c.id));
  };

  // Calculate Eligible Contacts based on active source
  const stats = useMemo(() => {
    if (contactSourceMode === "cohort") {
      const cohort = COHORTS_LIST.find((c) => c.id === selectedCohortId) || COHORTS_LIST[0];
      const total = cohort.count;
      const suppressed = Math.round(total * 0.012); // ~1.2% DND suppression
      const eligible = total - suppressed;
      return { total, eligible, invalid: 0, duplicate: 0, suppressed };
    }

    if (contactSourceMode === "directory") {
      const total = selectedDirectoryContactIds.length;
      return { total, eligible: total, invalid: 0, duplicate: 0, suppressed: 0 };
    }

    if (contactSourceMode === "csv") {
      const total = importedContacts.length;
      const invalid = importedContacts.filter((c) => !c.isValid).length;
      const duplicate = importedContacts.filter((c) => c.isDuplicate).length;
      const suppressed = importedContacts.filter((c) => c.isSuppressed).length;
      const excludedCount = excludeInvalidAndSuppressed ? invalid + duplicate + suppressed : 0;
      const eligible = Math.max(0, total - excludedCount);
      return { total, eligible, invalid, duplicate, suppressed };
    }

    // manual
    const total = manualContacts.length;
    const invalid = manualContacts.filter((c) => !c.isValid).length;
    const duplicate = manualContacts.filter((c) => c.isDuplicate).length;
    const suppressed = manualContacts.filter((c) => c.isSuppressed).length;
    const excludedCount = excludeInvalidAndSuppressed ? invalid + duplicate + suppressed : 0;
    const eligible = Math.max(0, total - excludedCount);
    return { total, eligible, invalid, duplicate, suppressed };
  }, [
    contactSourceMode,
    selectedCohortId,
    selectedDirectoryContactIds,
    importedContacts,
    manualContacts,
    excludeInvalidAndSuppressed,
  ]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#707684]">
              Step 5 · Audience Selection
            </span>
            <span className="text-xs text-[#283A50]/30">•</span>
            <span className="text-xs text-[#707684]">Integrated with Contacts &amp; Lists</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#283A50] mt-0.5">
            Select or Import Contacts
          </h3>
          <p className="text-xs text-[#707684] mt-0.5 leading-relaxed">
            Select verified cohorts, pick individual candidates from your CRM directory, import spreadsheets, or paste raw phone numbers.
          </p>
        </div>

        {/* Live Eligible Count Badge */}
        <div className="shrink-0 flex items-center gap-2 bg-[#FAF5E9] px-3.5 py-2 rounded-xl border border-[#E9E1D4]">
          <Users className="w-4 h-4 text-[#283A50]" />
          <div className="text-xs">
            <span className="text-[#707684]">Eligible Recipients:</span>{" "}
            <span className="font-bold text-[#2E8066] font-mono text-sm">
              {stats.eligible.toLocaleString()}
            </span>
          </div>
          {stats.suppressed > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
              {stats.suppressed} Suppressed
            </span>
          )}
        </div>
      </div>

      {/* 4 Contact Source Mode Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E9E1D4] pb-2 text-xs">
        <button
          type="button"
          onClick={() => onChangeSourceMode("cohort")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            contactSourceMode === "cohort"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#283A50] border border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Pre-Configured Cohorts</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeSourceMode("directory")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            contactSourceMode === "directory"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#283A50] border border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Contacts Directory Picker ({selectedDirectoryContactIds.length})</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeSourceMode("csv")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            contactSourceMode === "csv"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#283A50] border border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>CSV / Excel Import ({importedContacts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeSourceMode("manual")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            contactSourceMode === "manual"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#283A50] border border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Manual Entry &amp; Paste ({manualContacts.length})</span>
        </button>
      </div>

      {/* MODE 1: Cohort Selection */}
      {contactSourceMode === "cohort" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COHORTS_LIST.map((cohort) => {
              const isSelected = cohort.id === selectedCohortId;
              return (
                <div
                  key={cohort.id}
                  onClick={() => onChangeSelectedCohort(cohort.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#FAF5E9]/60 border-[#283A50] shadow-xs ring-1 ring-[#283A50]"
                      : "bg-white border-[#E9E1D4] hover:border-[#283A50]/40 hover:bg-[#FAF5E9]/20"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#2E8066] border border-[#B8DEC8]">
                        {cohort.tag}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "border-[#283A50] bg-[#283A50] text-white"
                            : "border-[#E9E1D4] bg-white"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-[#283A50] mt-2">
                      {cohort.name}
                    </h4>
                    <p className="text-[11px] text-[#707684] mt-1 line-clamp-2">
                      {cohort.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E9E1D4]/80 flex items-center justify-between text-[11px]">
                    <span className="text-[#707684]">Verified Leads:</span>
                    <span className="font-mono font-bold text-[#283A50]">
                      {cohort.count.toLocaleString()} Contacts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: Contacts Directory Picker */}
      {contactSourceMode === "directory" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#707684]" />
              <input
                type="text"
                placeholder="Search by name, phone, program..."
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E9E1D4] bg-[#FAF5E9]/30 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAllDirectoryContacts}
                className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 text-[#283A50] border border-[#E9E1D4]"
              >
                Select All ({filteredDirectoryContacts.length})
              </button>
              <Link
                href="/dashboard/contacts"
                target="_blank"
                className="inline-flex items-center gap-1 text-xs text-[#707684] hover:text-[#283A50] font-semibold"
              >
                <span>View Full Contacts Database</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="border border-[#E9E1D4] rounded-xl overflow-hidden max-h-72 overflow-y-auto divide-y divide-[#E9E1D4] text-xs">
            {filteredDirectoryContacts.map((c) => {
              const isSelected = selectedDirectoryContactIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => toggleDirectoryContact(c.id)}
                  className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected ? "bg-[#FAF5E9]/60 font-medium" : "hover:bg-[#FAF5E9]/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // handled by parent onClick
                      className="accent-[#283A50] cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-[#283A50]">{c.name}</span>
                      <span className="text-[11px] text-[#707684] ml-2 font-mono">{c.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#707684]">
                    <span>{c.organization || "Direct Contact"}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[#283A50] text-[10px]">
                      {c.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 3: CSV / Excel Import */}
      {contactSourceMode === "csv" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
              Spreadsheet Import &amp; Multi-Step Verification
            </h4>
            <p className="text-xs text-[#707684] mt-0.5">
              Preview data, map headers, normalize phone numbers to E.164, and filter invalid or DND suppressed numbers.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-[#E9E1D4] rounded-2xl p-6 text-center space-y-3 bg-[#FAF5E9]/20">
            <div className="w-10 h-10 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center mx-auto text-[#283A50]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#283A50]">
                {csvFileName ? `File Loaded: ${csvFileName}` : "Upload Excel or CSV file containing customer phone numbers"}
              </p>
              <p className="text-[11px] text-[#707684] mt-0.5">
                Standard headers: Name, Phone Number, Email, Program
              </p>
            </div>

            <button
              type="button"
              onClick={handleSimulateCsvUpload}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#283A50] text-white hover:bg-[#283A50]/90 transition-all shadow-xs"
            >
              {csvFileName ? "Re-Upload / Refresh Spreadsheet" : "+ Load Sample Contacts Spreadsheet"}
            </button>
          </div>

          {/* 1. Preview & 2. Column Mapping */}
          {importedContacts.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="bg-[#FAF5E9]/40 p-4 rounded-xl border border-[#E9E1D4] space-y-3">
                <span className="text-[11px] font-bold text-[#283A50] uppercase tracking-wider block">
                  Column Mapping Configuration:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-[#707684] font-medium block mb-1">Name Column</label>
                    <select
                      value={nameCol}
                      onChange={(e) => setNameCol(e.target.value)}
                      className="w-full bg-white border border-[#E9E1D4] rounded-lg px-2 py-1 text-xs text-[#283A50]"
                    >
                      <option value="Name">Name (Mapped)</option>
                      <option value="Candidate Name">Candidate Name</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#707684] font-medium block mb-1">Phone Column</label>
                    <select
                      value={phoneCol}
                      onChange={(e) => setPhoneCol(e.target.value)}
                      className="w-full bg-white border border-[#E9E1D4] rounded-lg px-2 py-1 text-xs text-[#283A50]"
                    >
                      <option value="Phone Number">Phone Number (Mapped)</option>
                      <option value="Mobile">Mobile</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#707684] font-medium block mb-1">Email Column</label>
                    <select
                      value={emailCol}
                      onChange={(e) => setEmailCol(e.target.value)}
                      className="w-full bg-white border border-[#E9E1D4] rounded-lg px-2 py-1 text-xs text-[#283A50]"
                    >
                      <option value="Email Address">Email Address (Mapped)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#707684] font-medium block mb-1">Custom / Program</label>
                    <select
                      value={courseCol}
                      onChange={(e) => setCourseCol(e.target.value)}
                      className="w-full bg-white border border-[#E9E1D4] rounded-lg px-2 py-1 text-xs text-[#283A50]"
                    >
                      <option value="Program / Course">Program / Course (Mapped)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Data Preview Table */}
              <div className="border border-[#E9E1D4] rounded-xl overflow-hidden">
                <div className="bg-[#FAF5E9] px-4 py-2 border-b border-[#E9E1D4] flex items-center justify-between text-xs font-bold text-[#283A50]">
                  <span>Spreadsheet Data Preview &amp; Number Validation ({importedContacts.length} Rows)</span>
                  <span className="text-[10px] text-[#707684] font-normal">
                    Showing first 5 sample records
                  </span>
                </div>
                <div className="divide-y divide-[#E9E1D4] text-xs">
                  {importedContacts.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="p-3 flex items-center justify-between gap-4">
                      <div>
                        <span className="font-bold text-[#283A50]">{contact.name}</span>
                        <span className="text-[#707684] text-[11px] ml-2 font-mono">{contact.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {contact.isValid && !contact.isDuplicate && !contact.isSuppressed ? (
                          <span className="text-[10px] font-bold text-[#2E8066] bg-emerald-50 px-2 py-0.5 rounded border border-[#B8DEC8]">
                            Valid E.164
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            {contact.validationError}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 4: Manual Entry & Multi-Line Paste */}
      {contactSourceMode === "manual" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
              Manually Enter or Paste Phone Numbers
            </h4>
            <p className="text-xs text-[#707684] mt-0.5">
              Add individual contacts or paste a raw list of comma-separated numbers from WhatsApp or notes.
            </p>
          </div>

          {/* Single Contact Entry Form */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 bg-[#FAF5E9]/40 p-3.5 rounded-xl border border-[#E9E1D4] text-xs">
            <input
              type="text"
              placeholder="Candidate Name *"
              value={singleName}
              onChange={(e) => setSingleName(e.target.value)}
              className="bg-white border border-[#E9E1D4] rounded-lg px-3 py-1.5 text-xs text-[#283A50]"
            />
            <input
              type="tel"
              placeholder="Mobile (+91 98401 22345) *"
              value={singlePhone}
              onChange={(e) => setSinglePhone(e.target.value)}
              className="bg-white border border-[#E9E1D4] rounded-lg px-3 py-1.5 text-xs text-[#283A50]"
            />
            <input
              type="text"
              placeholder="Course / Program"
              value={singleOrg}
              onChange={(e) => setSingleOrg(e.target.value)}
              className="bg-white border border-[#E9E1D4] rounded-lg px-3 py-1.5 text-xs text-[#283A50]"
            />
            <button
              type="button"
              onClick={handleAddSingleContact}
              className="bg-[#283A50] text-white rounded-lg px-3 py-1.5 font-bold hover:bg-[#283A50]/90 transition-colors"
            >
              + Add Contact
            </button>
          </div>

          {/* Bulk Paste Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#283A50] block">
              Or Paste Multiple Numbers (Format: Name, Phone, Email, Organization):
            </label>
            <textarea
              rows={3}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl p-3 text-xs text-[#283A50] font-mono focus:outline-none focus:ring-1 focus:ring-[#283A50] resize-none"
              placeholder="Rohan Varma, +919840122345, rohan@example.com, Acme Corp&#10;Pooja Hegde, +919440188319, pooja@example.com, Global Retail"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleParsePastedText}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#E9E1D4] hover:bg-[#FAF5E9] text-xs font-bold text-[#283A50]"
              >
                Parse &amp; Validate Pasted Lines
              </button>
            </div>
          </div>

          {/* List of Manual Contacts */}
          {manualContacts.length > 0 && (
            <div className="border border-[#E9E1D4] rounded-xl overflow-hidden divide-y divide-[#E9E1D4] text-xs">
              {manualContacts.map((c) => (
                <div key={c.id} className="p-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#283A50]">{c.name}</span>
                    <span className="text-[#707684] ml-2 font-mono">{c.phone}</span>
                    {c.organization && (
                      <span className="text-[#707684] text-[10px] ml-2">({c.organization})</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onChangeManualContacts(manualContacts.filter((m) => m.id !== c.id))}
                    className="text-[#707684] hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Exclusion & DND Compliance Controls */}
      <div className="bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-2xl p-4 space-y-3 text-xs">
        <div className="flex items-start justify-between gap-3">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeInvalidAndSuppressed}
              onChange={(e) => onToggleExcludeInvalid(e.target.checked)}
              className="mt-0.5 accent-[#283A50] cursor-pointer"
            />
            <div>
              <span className="font-bold text-[#283A50]">
                Automatically Exclude Invalid Numbers &amp; DND / Opt-Out Records
              </span>
              <p className="text-[11px] text-[#707684] mt-0.5">
                Protects carrier reputation and regulatory compliance. Filters malformed phone numbers, duplicates, and recipients on the National Do Not Call registry.
              </p>
            </div>
          </label>

          <span className="shrink-0 text-[10px] font-bold text-[#2E8066] bg-emerald-50 px-2 py-0.5 rounded border border-[#B8DEC8]">
            Active Shield
          </span>
        </div>

        {/* Regulatory Consent Requirement */}
        <div className="pt-2.5 border-t border-[#E9E1D4] flex items-start gap-2.5">
          <input
            type="checkbox"
            checked={consentAcknowledged}
            onChange={(e) => onToggleConsent(e.target.checked)}
            className="mt-0.5 accent-[#283A50] cursor-pointer"
            required
          />
          <div>
            <span className="font-bold text-[#283A50]">
              Regulatory Consent Confirmation (Required) *
            </span>
            <p className="text-[10px] text-[#707684] mt-0.5 leading-relaxed">
              I certify that our organization holds verifiable prior relationship or explicit consent to contact these recipients for this institutional purpose. An uploaded spreadsheet is not proof of consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
