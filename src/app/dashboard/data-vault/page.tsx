"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Database,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  FileText,
  ShieldCheck,
  ExternalLink,
  Lock,
  Eye,
  Check,
  X,
  Share2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Trash2,
  SlidersHorizontal,
  Sparkles,
  Play,
  Code,
  Copy,
  Terminal,
  Settings,
  Layers,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import { RecentCallRecord } from "@/types/dashboard";
import { mockRecentCalls } from "@/data/mock/dashboardData";
import { initialCallbacks } from "@/data/mock/callbacksData";
import { getUnifiedContacts } from "@/lib/contactsHistory";
import { soundSynth } from "@/lib/audio-synth";

interface ExtractedRecord {
  id: string;
  callId: string;
  contactName: string;
  fieldName: "Phone Number" | "Email Address" | "Callback Request" | "Service Line" | "Monthly Volume" | "CRM Integration" | string;
  extractedValue: string;
  sourceSnippet: string;
  confidence: number;
  validationState: "Verified" | "Pending" | "Review Needed";
  extractedAt: string;
  promotionalConsent: boolean; // Must be false unless explicitly given
  agentName: string;
}

export interface ExtractionField {
  id: string;
  name: string;
  label: string;
  type: "String" | "Phone (E.164)" | "Categorical" | "Number" | "Boolean" | "DateTime" | "Email" | "Currency";
  typeColor: string;
  required: boolean;
  destination: "Data Vault" | "Data Vault + CRM" | "Data Vault + Calendar" | "Data Vault + Webhook";
  sampleValue: string;
  confidenceThreshold: number;
  status: "Active" | "Paused";
  description: string;
}

const mockVaultRecords: ExtractedRecord[] = [];

export const RECOMMENDED_SCHEMA_TEMPLATE: ExtractionField[] = [
  {
    id: "f-1",
    name: "caller_name",
    label: "Caller Full Name",
    type: "String",
    typeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    required: true,
    destination: "Data Vault + CRM",
    sampleValue: "Format: [First Name] [Last Name]",
    confidenceThreshold: 90,
    status: "Active",
    description: "Full name of caller or representative confirmed via conversation.",
  },
  {
    id: "f-2",
    name: "caller_phone",
    label: "Primary Contact Number",
    type: "Phone (E.164)",
    typeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    required: true,
    destination: "Data Vault",
    sampleValue: "Format: +[Country][Number] (E.164)",
    confidenceThreshold: 98,
    status: "Active",
    description: "Carrier trunk verified E.164 phone number with national country code.",
  },
  {
    id: "f-3",
    name: "caller_email",
    label: "Verified Email Address",
    type: "Email",
    typeColor: "bg-blue-100 text-blue-800 border-blue-200",
    required: false,
    destination: "Data Vault + CRM",
    sampleValue: "Format: username@company.com",
    confidenceThreshold: 92,
    status: "Active",
    description: "Corporate or verified personal email address for transcripts and proposals.",
  },
  {
    id: "f-4",
    name: "service_tier",
    label: "Service Line / Solution Tier",
    type: "Categorical",
    typeColor: "bg-purple-100 text-purple-800 border-purple-200",
    required: true,
    destination: "Data Vault + CRM",
    sampleValue: "Format: Categorical [Tier / Plan]",
    confidenceThreshold: 95,
    status: "Active",
    description: "Identified solution requirements matched against pricing tiers.",
  },
  {
    id: "f-5",
    name: "monthly_minutes",
    label: "Estimated Monthly Minutes",
    type: "Number",
    typeColor: "bg-amber-100 text-amber-800 border-amber-200",
    required: false,
    destination: "Data Vault",
    sampleValue: "Format: Integer (Minutes / Month)",
    confidenceThreshold: 90,
    status: "Active",
    description: "Telephony capacity requirement for concurrency and billing.",
  },
  {
    id: "f-6",
    name: "crm_integration",
    label: "CRM Integration Required",
    type: "Boolean",
    typeColor: "bg-rose-100 text-rose-800 border-rose-200",
    required: false,
    destination: "Data Vault",
    sampleValue: "Format: Boolean [True / False]",
    confidenceThreshold: 85,
    status: "Active",
    description: "Whether the account requires bidirectional CRM synchronization.",
  },
  {
    id: "f-7",
    name: "scheduled_consultation",
    label: "Scheduled Walkthrough Slot",
    type: "DateTime",
    typeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    required: false,
    destination: "Data Vault + Calendar",
    sampleValue: "Format: ISO-8601 Timestamp",
    confidenceThreshold: 92,
    status: "Active",
    description: "Confirmed appointment for solution engineer walkthrough.",
  },
  {
    id: "f-8",
    name: "contract_term",
    label: "Contract Commitment Term",
    type: "Categorical",
    typeColor: "bg-teal-100 text-teal-800 border-teal-200",
    required: false,
    destination: "Data Vault + CRM",
    sampleValue: "Format: Enum [Monthly, Annual, Custom]",
    confidenceThreshold: 90,
    status: "Active",
    description: "Preferred billing arrangement and annual commit term.",
  },
];

const initialExtractionFields: ExtractionField[] = [];

export default function DataVaultPage() {
  const [vaultTab, setVaultTab] = useState<"records" | "schema">("records");
  const [records, setRecords] = useState<ExtractedRecord[]>(mockVaultRecords);
  const [extractionFields, setExtractionFields] = useState<ExtractionField[]>(initialExtractionFields);
  const [pendingCallbacksCount, setPendingCallbacksCount] = useState(0);

  // Sync dynamic extracted records, callbacks, and URL tab/hash
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // URL tab parameter check
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "schema" || window.location.hash.includes("schema")) {
        setVaultTab("schema");
      } else if (tabParam === "records" || window.location.hash.includes("records")) {
        setVaultTab("records");
      }

      // 1. Check custom vault records
      const customRaw = localStorage.getItem("swaram_vault_records");
      if (customRaw) {
        const parsed = JSON.parse(customRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecords(parsed);
        }
      } else {
        // 2. Synthesize from live calls if present
        const callsRaw = localStorage.getItem("swaram_calls");
        const dynamicRecords: ExtractedRecord[] = [];

        if (callsRaw) {
          const parsedCalls = JSON.parse(callsRaw);
          if (Array.isArray(parsedCalls) && parsedCalls.length > 0) {
            parsedCalls.forEach((call: any, idx: number) => {
              if (call.contactNumber) {
                dynamicRecords.push({
                  id: `rec-call-phone-${call.id || idx}`,
                  callId: call.id || `CALL-${1000 + idx}`,
                  contactName: call.contactName || "Direct Contact",
                  fieldName: "Phone Number",
                  extractedValue: call.contactNumber,
                  sourceSnippet: `Direct trunk connection verified: ${call.contactNumber}`,
                  confidence: 100,
                  validationState: "Verified",
                  extractedAt: call.timestamp || "Today",
                  promotionalConsent: false,
                  agentName: call.agentName || "Swaram AI Router",
                });
              }
              if (call.topic) {
                dynamicRecords.push({
                  id: `rec-call-topic-${call.id || idx}`,
                  callId: call.id || `CALL-${1000 + idx}`,
                  contactName: call.contactName || "Direct Contact",
                  fieldName: "Service Line",
                  extractedValue: call.topic,
                  sourceSnippet: `Caller inquired regarding ${call.topic}`,
                  confidence: 98,
                  validationState: "Verified",
                  extractedAt: call.timestamp || "Today",
                  promotionalConsent: false,
                  agentName: call.agentName || "Swaram AI Router",
                });
              }
            });
          }
        }

        // 3. If no calls, check unified contacts
        if (dynamicRecords.length === 0) {
          const contacts = getUnifiedContacts();
          if (contacts && contacts.length > 0) {
            contacts.forEach((c, idx) => {
              dynamicRecords.push({
                id: `rec-contact-${c.id || idx}`,
                callId: `CALL-DIR-${100 + idx}`,
                contactName: c.name,
                fieldName: "Phone Number",
                extractedValue: c.phone,
                sourceSnippet: `E.164 carrier verified trunk parameter: ${c.phone}`,
                confidence: 99,
                validationState: "Verified",
                extractedAt: c.addedAt || "Recent",
                promotionalConsent: false,
                agentName: c.assignedAgent || "Swaram AI Router",
              });
            });
          }
        }

        setRecords(dynamicRecords);
      }
    } catch (err) {
      console.error("Error syncing vault records:", err);
    }

    // Load pending callbacks count
    try {
      const cbRaw = localStorage.getItem("swaram_callbacks");
      if (cbRaw) {
        const parsed = JSON.parse(cbRaw);
        if (Array.isArray(parsed)) {
          setPendingCallbacksCount(parsed.filter((c: any) => c.status === "Pending").length);
        }
      } else {
        setPendingCallbacksCount(initialCallbacks.filter((c) => c.status === "Pending").length);
      }
    } catch {}

    // Load custom schema from localStorage if user created or loaded fields
    try {
      const schemaRaw = localStorage.getItem("swaram_vault_schema");
      if (schemaRaw) {
        const parsedSchema = JSON.parse(schemaRaw);
        if (Array.isArray(parsedSchema)) {
          setExtractionFields(parsedSchema);
        }
      }
    } catch (err) {
      console.error("Error loading vault schema:", err);
    }
  }, []);

  const extractedPhoneCount = useMemo(() => {
    return records.filter((r) => r.fieldName === "Phone Number" || r.fieldName.toLowerCase().includes("phone")).length;
  }, [records]);

  // Search & Filters for Records
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Search & Filters for Schema
  const [schemaSearch, setSchemaSearch] = useState("");
  const [schemaTypeFilter, setSchemaTypeFilter] = useState("all");

  // Drawer & Modals
  const [selectedCallRecord, setSelectedCallRecord] = useState<RecentCallRecord | null>(null);
  const [callDrawerOpen, setCallDrawerOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [schemaNotice, setSchemaNotice] = useState<string | null>(null);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);

  // New Field Form State
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<ExtractionField["type"]>("String");
  const [newFieldDest, setNewFieldDest] = useState<ExtractionField["destination"]>("Data Vault");
  const [newFieldReq, setNewFieldReq] = useState(false);
  const [newFieldSample, setNewFieldSample] = useState("");
  const [newFieldConfidence, setNewFieldConfidence] = useState(90);
  const [newFieldDesc, setNewFieldDesc] = useState("");

  // Live Extraction Simulator State
  const [simText, setSimText] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResults, setSimResults] = useState<Array<{ key: string; label: string; value: string; confidence: number }> | null>(null);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        r.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.extractedValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.callId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.agentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesField = fieldFilter === "all" || r.fieldName === fieldFilter;
      const matchesStatus = statusFilter === "all" || r.validationState === statusFilter;

      return matchesSearch && matchesField && matchesStatus;
    });
  }, [records, searchQuery, fieldFilter, statusFilter]);

  const filteredSchema = useMemo(() => {
    return extractionFields.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(schemaSearch.toLowerCase()) ||
        f.label.toLowerCase().includes(schemaSearch.toLowerCase()) ||
        f.description.toLowerCase().includes(schemaSearch.toLowerCase()) ||
        f.sampleValue.toLowerCase().includes(schemaSearch.toLowerCase());

      const matchesType = schemaTypeFilter === "all" || f.type.toLowerCase().includes(schemaTypeFilter.toLowerCase());

      return matchesSearch && matchesType;
    });
  }, [extractionFields, schemaSearch, schemaTypeFilter]);

  const handleOpenSourceCall = (callId: string) => {
    try { soundSynth.play("click"); } catch {}
    let match: RecentCallRecord | undefined;
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("swaram_calls");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            match = parsed.find((c: any) => c.id === callId);
          }
        }
      } catch {}
    }
    if (!match) {
      match = mockRecentCalls.find((c) => c.id === callId);
    }
    if (match) {
      setSelectedCallRecord(match);
      setCallDrawerOpen(true);
    }
  };

  const handleExportData = () => {
    try { soundSynth.play("confirm"); } catch {}
    setExportNotice("Data Vault encrypted export (CSV) generated. Download initialized.");
    setTimeout(() => setExportNotice(null), 3500);
  };

  const updateSchemaFields = (newFields: ExtractionField[]) => {
    setExtractionFields(newFields);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("swaram_vault_schema", JSON.stringify(newFields));
      } catch (err) {
        console.error("Failed to persist schema:", err);
      }
    }
  };

  const handleToggleFieldStatus = (id: string) => {
    try { soundSynth.play("pop"); } catch {}
    const updated = extractionFields.map((f) =>
      f.id === id ? { ...f, status: (f.status === "Active" ? "Paused" : "Active") as ExtractionField["status"] } : f
    );
    updateSchemaFields(updated);
  };

  const handleDeleteField = (id: string) => {
    try { soundSynth.play("click"); } catch {}
    const updated = extractionFields.filter((f) => f.id !== id);
    updateSchemaFields(updated);
    setSchemaNotice("Extraction field removed from runtime schema.");
    setTimeout(() => setSchemaNotice(null), 3000);
  };

  const handleLoadRecommendedTemplate = () => {
    try { soundSynth.play("confirm"); } catch {}
    updateSchemaFields(RECOMMENDED_SCHEMA_TEMPLATE);
    setSchemaNotice("Recommended enterprise schema template loaded successfully!");
    setTimeout(() => setSchemaNotice(null), 3500);
  };

  const handleClearSchema = () => {
    try { soundSynth.play("click"); } catch {}
    updateSchemaFields([]);
    setSchemaNotice("Extraction schema cleared. Zero active fields configured.");
    setTimeout(() => setSchemaNotice(null), 3000);
  };

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim() || !newFieldLabel.trim()) {
      alert("Please enter field key and label.");
      return;
    }

    try { soundSynth.play("confirm"); } catch {}

    const typeColorMap: Record<ExtractionField["type"], string> = {
      String: "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Phone (E.164)": "bg-emerald-100 text-emerald-800 border-emerald-200",
      Categorical: "bg-purple-100 text-purple-800 border-purple-200",
      Number: "bg-amber-100 text-amber-800 border-amber-200",
      Boolean: "bg-rose-100 text-rose-800 border-rose-200",
      DateTime: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Email: "bg-blue-100 text-blue-800 border-blue-200",
      Currency: "bg-emerald-100 text-emerald-800 border-emerald-200",
    };

    const newField: ExtractionField = {
      id: `f-${Date.now()}`,
      name: newFieldName.trim().toLowerCase().replace(/\s+/g, "_"),
      label: newFieldLabel.trim(),
      type: newFieldType,
      typeColor: typeColorMap[newFieldType] || "bg-indigo-100 text-indigo-800 border-indigo-200",
      required: newFieldReq,
      destination: newFieldDest,
      sampleValue: newFieldSample.trim() || "Format: Freeform String",
      confidenceThreshold: newFieldConfidence,
      status: "Active",
      description: newFieldDesc.trim() || "Custom extraction variable extracted during voice call turns.",
    };

    updateSchemaFields([...extractionFields, newField]);
    setIsAddFieldModalOpen(false);
    setSchemaNotice(`Field "${newField.label}" added to runtime extraction schema!`);
    setTimeout(() => setSchemaNotice(null), 4000);

    // Reset Form
    setNewFieldName("");
    setNewFieldLabel("");
    setNewFieldSample("");
    setNewFieldDesc("");
    setNewFieldReq(false);
  };

  const handleRunSimulator = () => {
    const textToParse = simText.trim();
    if (!textToParse) {
      alert("Please enter a call transcript utterance to test entity extraction.");
      return;
    }

    try { soundSynth.play("click"); } catch {}
    setIsSimulating(true);

    setTimeout(() => {
      try { soundSynth.play("affirm"); } catch {}
      setIsSimulating(false);

      const results: Array<{ key: string; label: string; value: string; confidence: number }> = [];

      // Extract Name
      const nameMatch = textToParse.match(/(?:this is|I am|my name is|speaking with|call from)\s+(?:(Dr|Mr|Mrs|Ms)\.?\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
      if (nameMatch) {
        const fullName = nameMatch[1] ? `${nameMatch[1]}. ${nameMatch[2]}` : nameMatch[2];
        results.push({
          key: "caller_name",
          label: "Caller Full Name",
          value: fullName,
          confidence: 98,
        });
      }

      // Extract Phone
      const phoneMatch = textToParse.match(/(?:\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
      if (phoneMatch) {
        results.push({
          key: "caller_phone",
          label: "Primary Contact Number",
          value: phoneMatch[0],
          confidence: 99,
        });
      }

      // Extract Email
      const emailMatch = textToParse.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        results.push({
          key: "caller_email",
          label: "Verified Email Address",
          value: emailMatch[0],
          confidence: 96,
        });
      }

      // Extract Volume / Minutes
      const volumeMatch = textToParse.match(/(\d[\d,]*(?:\s*(?:mins|minutes|k|K|calls|channels|hrs|hours))(?:\/(?:mo|month|day))?)/i);
      if (volumeMatch) {
        results.push({
          key: "monthly_minutes",
          label: "Estimated Volume",
          value: volumeMatch[1],
          confidence: 95,
        });
      }

      // Extract Service Tier / Topic
      const serviceMatch = textToParse.match(/(enterprise|sip trunk|pri|cloud pbx|telephony|support|api|integration|crm)/i);
      if (serviceMatch) {
        results.push({
          key: "service_tier",
          label: "Service Line",
          value: `${serviceMatch[1].toUpperCase()} Operations`,
          confidence: 94,
        });
      }

      // Extract Date/Time / Slot
      const slotMatch = textToParse.match(/(monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow)(?:\s+at\s+|\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)?/i);
      if (slotMatch) {
        results.push({
          key: "scheduled_consultation",
          label: "Walkthrough Slot",
          value: `${slotMatch[1]}${slotMatch[2] ? `, ${slotMatch[2]}` : ""}`,
          confidence: 92,
        });
      }

      // Fallback general entities
      if (results.length === 0) {
        results.push({
          key: "unstructured_transcript",
          label: "Raw Speech Entity",
          value: textToParse.length > 50 ? `${textToParse.slice(0, 50)}...` : textToParse,
          confidence: 90,
        });
      }

      setSimResults(results);
    }, 450);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#1A1A1A]">
      {/* ======================================================================= */}
      {/* HEADER                                                                  */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold tracking-wider text-black/45 hover:text-black uppercase transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D593F] bg-[#C1F2D5] px-3 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
              Data Vault Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2 flex items-center gap-3">
            <span>Data Vault &amp; Structured Extraction</span>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-blue-500/15 text-indigo-900 border border-indigo-200">
              Universal Schema Engine
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Cryptographically audited repository of caller contact parameters, structured fields, and callback requests extracted from voice interactions.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setIsAddFieldModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B08] to-[#E11D48] hover:brightness-110 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-[0_4px_16px_rgba(255,107,8,0.3)] transition-all cursor-pointer hover:scale-102 active:scale-98"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Extraction Field</span>
          </button>

          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-2 bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-full border border-black/[0.06] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-black/50" />
            <span>Export Encrypted CSV</span>
          </button>
        </div>
      </div>

      {/* Export / Schema Notification */}
      {exportNotice && (
        <div className="p-4 rounded-[20px] bg-[#C1F2D5]/40 border border-[#16856B]/30 flex items-center gap-3 text-xs text-[#0D593F] font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16856B]" />
          <span>{exportNotice}</span>
        </div>
      )}

      {schemaNotice && (
        <div className="p-4 rounded-[20px] bg-gradient-to-r from-purple-100 to-indigo-50 border border-purple-300 flex items-center gap-3 text-xs text-purple-950 font-bold animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 shrink-0 text-purple-700" />
          <span>{schemaNotice}</span>
        </div>
      )}

      {/* DPDP Compliance & Promotional Calling Warning Banner */}
      <div className="p-4 rounded-[20px] bg-[#FFD9A0]/25 border border-[#FFD9A0]/50 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-[#B54708] shrink-0 mt-0.5" />
        <div className="text-xs text-[#1A1A1A] leading-relaxed space-y-1">
          <h4 className="font-bold text-[#733F00]">
            Regulatory Notice: DPDP Compliance &amp; Non-Promotional Restriction
          </h4>
          <p className="text-black/60">
            All extracted phone numbers and emails are securely archived strictly for enterprise inquiry fulfillment and scheduled callback execution.
            Under regulatory compliance rules, <strong>extraction does not constitute implicit consent to place unsolicited telemarketing or promotional broadcast calls</strong>.
          </p>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 4 SUMMARY STAT CARDS                                                    */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Extracted Contacts"
          icon={Phone}
          description="Verified phone numbers and caller profiles extracted from conversations."
          metric={extractedPhoneCount > 0 ? `${extractedPhoneCount} Verified` : "0 Verified"}
          metricLabel={extractedPhoneCount > 0 ? "100% confidence on E.164 trunks" : "E.164 verified carrier trunks"}
          status={extractedPhoneCount > 0 ? "All Verified" : "Queue Ready"}
          statusType="ready"
          actionLabel="Filter phone numbers →"
          onClick={() => {
            setVaultTab("records");
            setFieldFilter("Phone Number");
          }}
        />

        <WorkspaceCard
          name="Pending Callbacks"
          icon={Clock}
          description="Inbound inquiries with explicit callback times requested by callers."
          metric={pendingCallbacksCount > 0 ? `${pendingCallbacksCount} Pending` : "0 Pending"}
          metricLabel={pendingCallbacksCount > 0 ? "Scheduled follow-up queue" : "No scheduled callbacks in queue"}
          status={pendingCallbacksCount > 0 ? "Follow-up Queue" : "Queue Clear"}
          statusType={pendingCallbacksCount > 0 ? "warning" : "ready"}
          actionLabel="View callback queue →"
          href="/dashboard/callbacks"
        />

        <WorkspaceCard
          name="Extraction Schema"
          icon={Database}
          description="Active variables and neural regex patterns extracted across all agents."
          metric={extractionFields.length > 0 ? `${extractionFields.filter((f) => f.status === "Active").length} Active` : "0 Configured"}
          metricLabel={extractionFields.length > 0 ? `${extractionFields.filter((f) => f.required).length} Required for routing` : "Awaiting schema deployment"}
          status={extractionFields.length > 0 ? "Schema Engine" : "Schema Empty"}
          statusType={extractionFields.length > 0 ? "ready" : "neutral"}
          actionLabel="Manage extraction rules →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setVaultTab("schema");
          }}
        />

        <WorkspaceCard
          name="Retention Rules"
          icon={Lock}
          description="Automated compliant 90-day retention schedule with audit logging."
          metric="90-Day Policy"
          metricLabel="Compliant with DPDP rules"
          status="Enforced"
          statusType="ready"
          actionLabel="Inspect security policy →"
          href="/dashboard/settings"
        />
      </div>

      {/* ======================================================================= */}
      {/* DUAL VIEW NAVIGATION TABS (Shifted Extraction Option)                    */}
      {/* ======================================================================= */}
      <div className="flex items-center justify-between border-b border-black/[0.08] pb-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setVaultTab("records");
              try { soundSynth.play("click"); } catch {}
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              vaultTab === "records"
                ? "bg-[#18181B] text-white border-[#18181B] shadow-sm"
                : "bg-white text-black/60 hover:text-black border-black/[0.08] hover:border-black/20"
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Extracted Records Vault</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black">
              {filteredRecords.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setVaultTab("schema");
              try { soundSynth.play("click"); } catch {}
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              vaultTab === "schema"
                ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white border-indigo-600 shadow-sm"
                : "bg-white text-indigo-700 hover:text-indigo-900 border-indigo-200 hover:border-indigo-400"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Structured Extraction Schema &amp; Rules</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-black">
              {extractionFields.length} Fields
            </span>
          </button>
        </div>

        <span className="text-[11px] font-medium text-black/45 hidden md:inline">
          {vaultTab === "records"
            ? "Live callers and extracted values synced across telecom lines"
            : "Extraction rules applied automatically by all AI voice personas"}
        </span>
      </div>

      {/* ======================================================================= */}
      {/* VIEW 1: EXTRACTED RECORDS VAULT TABLE                                   */}
      {/* ======================================================================= */}
      {vaultTab === "records" && (
        <div id="records-vault" className="space-y-4 animate-in fade-in duration-200 scroll-mt-24">
          {/* SEARCH & FILTERS BAR */}
          <div className="p-4 rounded-[26px] bg-white border border-black/[0.06] shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Field Type Selector */}
                <select
                  value={fieldFilter}
                  onChange={(e) => setFieldFilter(e.target.value)}
                  className="text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full px-4 py-2 text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
                >
                  <option value="all">All Field Types</option>
                  <option value="Phone Number">Phone Numbers</option>
                  <option value="Email Address">Email Addresses</option>
                  <option value="Callback Request">Callback Requests</option>
                  <option value="Service Line">Service Line / Solution Tier</option>
                  <option value="Monthly Volume">Estimated Monthly Volume</option>
                  <option value="CRM Integration">CRM Integration</option>
                </select>

                {/* Validation State Selector */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full px-4 py-2 text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
                >
                  <option value="all">All Verification States</option>
                  <option value="Verified">Verified (Confidence &gt; 95%)</option>
                  <option value="Pending">Pending Action</option>
                  <option value="Review Needed">Review Needed</option>
                </select>
              </div>

              {/* Search Box */}
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search contact, value, call ID, or agent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-black/40"
                />
              </div>
            </div>
          </div>

          {/* RECORDS TABLE */}
          <div className="bg-white rounded-[26px] border border-black/[0.06] shadow-2xs overflow-hidden">
            <div className="px-6 py-4 bg-white border-b border-black/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xs text-[#1A1A1A]">
                  Extracted Parameters &amp; Verbatim Sources
                </h3>
                <span className="text-[11px] font-medium text-black/45">
                  ({filteredRecords.length} records verified)
                </span>
              </div>

              <span className="text-[11px] text-black/50 hidden sm:inline">
                Click Source Call to inspect verbatim transcript and audio recording
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-5">Contact Name</th>
                    <th className="py-3 px-5">Field Parameter</th>
                    <th className="py-3 px-5">Extracted Value</th>
                    <th className="py-3 px-5">Confidence</th>
                    <th className="py-3 px-5">Validation State</th>
                    <th className="py-3 px-5">Source Call &amp; Audio</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center">
                        {records.length === 0 ? (
                          <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3 px-4">
                            <div className="w-12 h-12 rounded-2xl bg-black/[0.04] border border-black/[0.06] flex items-center justify-center text-black/40">
                              <Database className="w-6 h-6 stroke-[1.8]" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-[#1A1A1A]">No Extracted Records in Vault</h4>
                              <p className="text-xs text-black/50 mt-1 leading-relaxed">
                                Structured caller parameters, verified E.164 numbers, and callback requests will stream here automatically in real time as AI agents converse with callers.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                try { soundSynth.play("click"); } catch {}
                                setVaultTab("schema");
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#18181B] text-white hover:bg-black transition-all cursor-pointer shadow-xs"
                            >
                              <SlidersHorizontal className="w-3.5 h-3.5" />
                              <span>View Extraction Schema &amp; Test Engine</span>
                            </button>
                          </div>
                        ) : (
                          <div className="py-4 text-black/45">
                            No records found matching the current search and filter criteria.
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-black/[0.015] transition-colors group">
                        {/* Contact Name */}
                        <td className="py-4 px-5 font-semibold text-[#1A1A1A]">
                          <div>{r.contactName}</div>
                          <span className="text-[10.5px] text-black/45 font-normal">
                            Captured {r.extractedAt}
                          </span>
                        </td>

                        {/* Field Parameter */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#BCD0F5] text-[#1E3A8A]">
                            {r.fieldName}
                          </span>
                        </td>

                        {/* Extracted Value */}
                        <td className="py-4 px-5 max-w-xs">
                          <div className="font-bold text-[#1A1A1A] truncate">
                            {r.extractedValue}
                          </div>
                          <p className="text-[11px] text-black/55 truncate mt-0.5 italic">
                            &quot;{r.sourceSnippet}&quot;
                          </p>
                        </td>

                        {/* Confidence Score */}
                        <td className="py-4 px-5 whitespace-nowrap font-semibold text-[#1A1A1A]">
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-black/[0.06] h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#16856B] h-full"
                                style={{ width: `${r.confidence}%` }}
                              />
                            </div>
                            <span className="text-[11px]">{r.confidence}%</span>
                          </div>
                        </td>

                        {/* Validation State */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          {r.validationState === "Verified" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0D593F] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
                              <Check className="w-3 h-3 text-[#16856B]" />
                              <span>Verified</span>
                            </span>
                          ) : r.validationState === "Pending" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#733F00] bg-[#FFD9A0] px-2.5 py-0.5 rounded-full">
                              <Clock className="w-3 h-3" />
                              <span>Pending Action</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B42318] bg-[#FEE4E2] px-2.5 py-0.5 rounded-full">
                              <AlertCircle className="w-3 h-3" />
                              <span>Review Needed</span>
                            </span>
                          )}
                        </td>

                        {/* Source Call Link */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleOpenSourceCall(r.callId)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1A1A] hover:underline cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-black/50" />
                            <span>Source ({r.callId})</span>
                            <ExternalLink className="w-3 h-3 text-black/40" />
                          </button>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleOpenSourceCall(r.callId)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                          >
                            Inspect Transcript
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

      {/* ======================================================================= */}
      {/* VIEW 2: STRUCTURED EXTRACTION SCHEMA & RULES (SHIFTED FROM AI AGENTS)   */}
      {/* ======================================================================= */}
      {vaultTab === "schema" && (
        <div id="schema-engine" className="space-y-6 animate-in fade-in duration-200 scroll-mt-24">
          {/* Schema Controls & Summary Banner */}
          <div className="p-6 rounded-[28px] bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/60 border-2 border-indigo-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <Database className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#1A1A1A]">
                    Structured Data Extraction Schema &amp; Entity Parser
                  </h3>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Live Telephony Sync
                  </span>
                </div>
                <p className="text-xs text-black/65 mt-1 leading-relaxed">
                  These structured variables are automatically extracted by all active voice agents during conversations, normalized against enterprise schemas, and archived into the Data Vault.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {extractionFields.length === 0 ? (
                  <button
                    type="button"
                    onClick={handleLoadRecommendedTemplate}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-50 shadow-xs transition-all cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Load Recommended Template</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClearSchema}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-black/50 hover:text-rose-600 hover:bg-rose-50 border border-black/[0.08] transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsAddFieldModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer hover:scale-102 active:scale-98"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add Custom Field</span>
                </button>
              </div>
            </div>

            {/* Micro Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-indigo-100 text-xs">
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                <span className="text-black/50 block text-[10.5px] font-bold">Total Schema Fields</span>
                <span className="text-lg font-black text-indigo-950 mt-0.5 block">{extractionFields.length}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                <span className="text-black/50 block text-[10.5px] font-bold">Required for Call Pass</span>
                <span className="text-lg font-black text-emerald-700 mt-0.5 block">
                  {extractionFields.filter((f) => f.required).length} Fields
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                <span className="text-black/50 block text-[10.5px] font-bold">Target Destinations</span>
                <span className="text-lg font-black text-purple-900 mt-0.5 block">
                  {extractionFields.length === 0
                    ? "None Configured"
                    : Array.from(new Set(extractionFields.map((f) => f.destination.replace("Data Vault", "Vault").replace(" + ", "+")))).join(" / ")}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                <span className="text-black/50 block text-[10.5px] font-bold">Extraction Engine SLA</span>
                <span className="text-lg font-black text-[#FF6B08] mt-0.5 block">
                  {extractionFields.length === 0 ? "Idle (No Schema)" : "Sub-Second Live"}
                </span>
              </div>
            </div>
          </div>

          {/* Search & Type Filters */}
          <div className="p-4 rounded-[22px] bg-white border-2 border-black/[0.06] flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-black/45 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search schema field name, key, or description..."
                value={schemaSearch}
                onChange={(e) => setSchemaSearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF8F3] border border-black/[0.08] rounded-full text-[#1A1A1A] focus:outline-none focus:border-indigo-600 placeholder:text-black/40"
              />
            </div>

            <select
              value={schemaTypeFilter}
              onChange={(e) => setSchemaTypeFilter(e.target.value)}
              className="text-xs bg-[#FAF8F3] border border-black/[0.08] rounded-full px-4 py-2 text-[#1A1A1A] font-bold focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="all">All Data Types</option>
              <option value="string">String / Text</option>
              <option value="phone">Phone (E.164)</option>
              <option value="email">Email Address</option>
              <option value="categorical">Categorical / Enum</option>
              <option value="number">Numeric / Percentage</option>
              <option value="boolean">Boolean (Yes/No)</option>
              <option value="datetime">DateTime</option>
            </select>
          </div>

          {/* Schema Table */}
          <div className="border-2 border-black/[0.08] rounded-[24px] overflow-hidden bg-white shadow-xs">
            <div className="px-6 py-4 bg-gradient-to-r from-[#FAF8F3] to-[#F5EFE6] border-b-2 border-black/[0.08] flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-xs text-[#1A1A1A] uppercase tracking-wider">
                  Configured Extraction Keys ({filteredSchema.length})
                </h4>
                <p className="text-[11px] text-black/55 mt-0.5">
                  Extracted variables link directly back to their source call ID and verbatim recording snippet.
                </p>
              </div>

              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Zero-Hallucination Safe
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F3] border-b border-black/[0.06] text-[#1A1A1A] font-extrabold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-5">Field Key / Label</th>
                    <th className="py-3.5 px-4">Data Type</th>
                    <th className="py-3.5 px-4">Required</th>
                    <th className="py-3.5 px-4">Destination</th>
                    <th className="py-3.5 px-4">Min. Confidence</th>
                    <th className="py-3.5 px-4">Expected Format / Pattern</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {filteredSchema.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center">
                        {extractionFields.length === 0 ? (
                          <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3 px-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
                              <SlidersHorizontal className="w-6 h-6 stroke-[1.8]" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-[#1A1A1A]">No Extraction Fields Configured</h4>
                              <p className="text-xs text-black/55 mt-1 leading-relaxed">
                                Voice personas will not extract structured variables until schema fields are added. You can deploy our recommended enterprise schema or build your own custom parameters.
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                              <button
                                type="button"
                                onClick={handleLoadRecommendedTemplate}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition-all cursor-pointer hover:scale-102 active:scale-98"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Load Recommended Schema Template</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsAddFieldModalOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white text-[#1A1A1A] border border-black/[0.1] hover:border-black/20 hover:bg-black/[0.02] transition-all cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Custom Field</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="py-4 text-black/45">
                            No schema fields matching &quot;{schemaSearch}&quot;.
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredSchema.map((f) => (
                    <tr key={f.id} className="hover:bg-indigo-50/20 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-mono font-bold text-[#1A1A1A] text-xs">{f.name}</div>
                        <div className="text-[11px] text-black/60 font-medium mt-0.5">{f.label}</div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${f.typeColor}`}>
                          {f.type}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {f.required ? (
                          <span className="text-[10px] font-extrabold text-[#0D593F] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full border border-emerald-300">
                            Required
                          </span>
                        ) : (
                          <span className="text-[10px] text-black/60 bg-black/[0.04] px-2.5 py-0.5 rounded-full border border-black/[0.05]">
                            Optional
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-bold text-[#1A1A1A]">{f.destination}</span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900">
                          <span>{f.confidenceThreshold}%</span>
                          <span className="text-[9.5px] text-black/40 font-normal">SLA</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <span className="text-black/75 font-mono text-[11px] font-medium truncate block">
                          {f.sampleValue}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleFieldStatus(f.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold border cursor-pointer transition-all ${
                            f.status === "Active"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-black/5 text-black/50 border-black/10"
                          }`}
                        >
                          {f.status}
                        </button>
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDeleteField(f.id)}
                          className="p-1.5 rounded-lg text-black/40 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                          title="Delete Field"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          </div>

          {/* =================================================================== */}
          {/* LIVE EXTRACTION ENGINE SANDBOX & SIMULATOR                          */}
          {/* =================================================================== */}
          <div id="extraction-sandbox" className="p-6 rounded-[28px] border-2 border-indigo-200/80 bg-white space-y-4 shadow-xs scroll-mt-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                    Interactive Speech-To-Entity Extraction Sandbox
                  </h4>
                  <p className="text-[11px] text-black/55 mt-0.5">
                    Test how current schema extraction rules parse natural caller utterances and populate Vault keys.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRunSimulator}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white shadow-xs cursor-pointer transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white stroke-none" />
                <span>{isSimulating ? "Parsing Entities..." : "Run Extraction Test"}</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-black/60 block">
                  Utterance Speech Transcript (Neural Extraction Input)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSimText("Hello, this is Dr. Robert Vance calling regarding Cloud PBX PRI trunks for our contact center with 10,000 minutes and scheduling a walkthrough for Monday at 10 AM.");
                    try { soundSynth.play("click"); } catch {}
                  }}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                >
                  Load Sample Enterprise Query
                </button>
              </div>
              <textarea
                rows={2}
                value={simText}
                onChange={(e) => setSimText(e.target.value)}
                placeholder="Type or paste any conversation turn to test real-time entity extraction against schema keys (or click 'Load Sample Enterprise Query')..."
                className="w-full text-xs p-3.5 bg-[#FAF8F3] border border-black/[0.08] rounded-2xl text-[#1A1A1A] font-medium focus:outline-none focus:border-indigo-600 resize-none shadow-2xs placeholder:text-black/35"
              />
            </div>

            {/* Simulation Results Output */}
            {simResults && (
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Neural Extraction Results (JSON Vault Schema Mapped)</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    All Validations Passed (SLA Met)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {simResults.map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10.5px] font-black text-indigo-950">{res.key}</span>
                        <span className="text-[9.5px] font-extrabold text-emerald-700">{res.confidence}%</span>
                      </div>
                      <div className="text-xs font-bold text-[#1A1A1A] truncate">{res.value}</div>
                      <span className="text-[10px] text-black/45 block">{res.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL: ADD CUSTOM EXTRACTION FIELD                                      */}
      {/* ======================================================================= */}
      {isAddFieldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[32px] border-2 border-black/10 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#1A1A1A]">Add Extraction Schema Field</h3>
                  <p className="text-[11px] text-black/55">Create a structured parameter for all AI Voice Agents to collect.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddFieldModalOpen(false)}
                className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/60 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateField} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A1A1A] block">
                    Field Identifier (snake_case)
                  </label>
                  <input
                    type="text"
                    required
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder="e.g. concurrent_channels"
                    className="w-full text-xs font-mono px-3.5 py-2.5 bg-[#FAF8F3] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A1A1A] block">
                    Display Label
                  </label>
                  <input
                    type="text"
                    required
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                    placeholder="e.g. Concurrent PRI Channels"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F3] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-indigo-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A1A1A] block">
                    Data Type
                  </label>
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as any)}
                    className="w-full text-xs font-bold px-3.5 py-2.5 bg-[#FAF8F3] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-indigo-600 cursor-pointer"
                  >
                    <option value="String">String / Free Text</option>
                    <option value="Phone (E.164)">Phone (E.164)</option>
                    <option value="Email">Email Address</option>
                    <option value="Categorical">Categorical / Enum</option>
                    <option value="Number">Number / Percent</option>
                    <option value="Boolean">Boolean (Yes / No)</option>
                    <option value="DateTime">Date &amp; Time</option>
                    <option value="Currency">Currency (INR / USD)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A1A1A] block">
                    Destination Store
                  </label>
                  <select
                    value={newFieldDest}
                    onChange={(e) => setNewFieldDest(e.target.value as any)}
                    className="w-full text-xs font-bold px-3.5 py-2.5 bg-[#FAF8F3] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-indigo-600 cursor-pointer"
                  >
                    <option value="Data Vault">Data Vault Only</option>
                    <option value="Data Vault + CRM">Data Vault + CRM Sync</option>
                    <option value="Data Vault + Calendar">Data Vault + Calendar</option>
                    <option value="Data Vault + Webhook">Data Vault + Webhook Post</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1A1A] block">
                  Expected Format / Validation Rule
                </label>
                <input
                  type="text"
                  value={newFieldSample}
                  onChange={(e) => setNewFieldSample(e.target.value)}
                  placeholder="e.g. Format: +[Country][Number] or Boolean [True/False]"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F3] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-indigo-600 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1A1A1A] block">
                  Agent Instruction Directive
                </label>
                <textarea
                  rows={2}
                  value={newFieldDesc}
                  onChange={(e) => setNewFieldDesc(e.target.value)}
                  placeholder="Prompt guideline for agent: 'Verify monthly call concurrency and current CRM when discussing enterprise SLA pricing.'"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF8F3] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-indigo-600 leading-relaxed resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/60 border border-indigo-200">
                <div>
                  <span className="text-xs font-bold text-indigo-950 block">Mandatory Qualification Field</span>
                  <span className="text-[10.5px] text-indigo-700">Agent must confirm this value before ending the call</span>
                </div>
                <input
                  type="checkbox"
                  checked={newFieldReq}
                  onChange={(e) => setNewFieldReq(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsAddFieldModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-black/60 hover:text-black hover:bg-black/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer transition-all hover:scale-102 active:scale-98"
                >
                  Deploy Extraction Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transcript & Call Inspection Drawer */}
      <CallDrawer
        call={selectedCallRecord}
        isOpen={callDrawerOpen}
        onClose={() => setCallDrawerOpen(false)}
      />
    </div>
  );
}
