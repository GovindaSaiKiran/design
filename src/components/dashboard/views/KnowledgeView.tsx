"use client";

import React, { useState } from "react";
import { KnowledgeDocument } from "@/types/dashboard";
import {
  BookOpen,
  Upload,
  FileText,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Database,
  Search,
  ArrowUpRight,
  Sparkles,
  Link2,
  Layers,
  ShieldCheck,
  Cpu,
  Boxes,
  Plus,
} from "lucide-react";
import KnowledgeBaseStatus from "../components/KnowledgeBaseStatus";

interface KnowledgeViewProps {
  documents: KnowledgeDocument[];
  onUploadDoc: () => void;
}

export default function KnowledgeView({
  documents,
  onUploadDoc,
}: KnowledgeViewProps) {
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);

  const enterpriseConnectors = [
    { name: "Google Drive", type: "Collegiate Records", count: "148 Docs", status: "Synced", color: "bg-amber-500", icon: "📁" },
    { name: "Notion", type: "Admissions SOPs", count: "42 Pages", status: "Synced", color: "bg-slate-900", icon: "📑" },
    { name: "Slack", type: "Counselor Channels", count: "12 Channels", status: "Active", color: "bg-purple-600", icon: "💬" },
    { name: "Linear", type: "Student Escalations", count: "28 Issues", status: "Connected", color: "bg-indigo-600", icon: "⚡" },
    { name: "GitHub", type: "Campus API & Portals", count: "6 Repos", status: "Connected", color: "bg-neutral-800", icon: "🐙" },
    { name: "Zoho CRM", type: "Applicant Leads", count: "1,240 Records", status: "Live Sync", color: "bg-emerald-600", icon: "👥" },
  ];

  const agentSkills = [
    {
      title: "Fee Transparency & UGC Regulations",
      description: "Require exact semester fee disclosure, UGC compliant refund calculation rules, and strict prohibition of unapproved seat reservation claims.",
      status: "Enforced",
    },
    {
      title: "Merit Scholarship Scoring Guardrail",
      description: "Cross-references candidate 12th PCM / Board % and JEE percentile against official institutional tier cutoffs before issuing scholarship grant quotes.",
      status: "Active",
    },
    {
      title: "Multilingual Indic Tone Adaptation",
      description: "Ensures polite, respectful formal honorifics (e.g. 'Aap / Namaskaram / Vanakkam') tailored to parents and students across 11 Indian languages.",
      status: "Enforced",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. SARVAM EDITORIAL HERO & GROUNDING HEADER                               */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-xs font-semibold text-neutral-800">
              <span className="text-amber-600 font-serif">~ 𑁍 ~</span>
              <span>Work Agents • Grounded Knowledge & Connectors</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight leading-tight">
              Use your documents. Add one document or one lakh documents.
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Connect institutional brochures, JoSAA rank cutoffs, hostel guides, fee schedules, and CRM data. AI Voice Agents use them as zero-hallucination context when conducting admissions calls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onUploadDoc}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Upload className="w-4 h-4 stroke-[2]" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ENTERPRISE APP CONNECTORS (DIRECT FROM SARVAM TEMPLATE 2 PG 5 & 6)     */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 hover:border-black/20 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-[11px] font-semibold text-neutral-800 mb-2">
              <Link2 className="w-3 h-3 text-indigo-600" />
              <span>Integrated Ecosystem</span>
            </div>
            <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
              Enterprise Data Connectors
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Connect Notion, Slack, Google Drive, Linear, GitHub, and Zoho CRM. Agents read updated records in real-time.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1 rounded-xl border border-black/5">
            6 Connectors Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {enterpriseConnectors.map((conn, idx) => (
            <div
              key={idx}
              className="liquid-glass-interactive p-4 rounded-2xl text-center flex flex-col items-center justify-between group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md border border-black/5 flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform shadow-2xs">
                {conn.icon}
              </div>
              <div>
                <div className="font-semibold text-neutral-900 text-xs">{conn.name}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">{conn.type}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-black/5 w-full flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-800">{conn.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. KNOWLEDGE BASE STATUS WIDGET                                           */}
      {/* ========================================================================= */}
      <KnowledgeBaseStatus
        onManageKnowledge={() => {}}
        onUploadDoc={onUploadDoc}
      />

      {/* ========================================================================= */}
      {/* 4. AGENT SKILLS & COMPLIANCE GUARDRAILS (FROM SARVAM WORK AGENTS PG 6)    */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 hover:border-black/20 transition-all">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-[11px] font-semibold text-neutral-800 mb-2">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Safety & Grounding Directives</span>
            </div>
            <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
              Configured Agent Skills & Rules
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Skills set the strict instructions and verification checks each voice agent follows on every call.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agentSkills.map((skill, idx) => (
            <div
              key={idx}
              className="liquid-glass-subtle p-6 rounded-2xl border border-black/10 hover:border-black/25 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {skill.status}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">Rule #{idx + 1}</span>
                </div>
                <h4 className="font-semibold text-neutral-900 text-sm mb-2">
                  {skill.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. VECTORIZED DOCUMENT REPOSITORY                                         */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 hover:border-black/20 transition-all">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
          <div>
            <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
              Vectorized Document Repository
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Synced across all Bulbul V3 inference endpoints & real-time telephony SIP trunks
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1 rounded-xl border border-black/5">
            {documents.length} Grounding Files
          </span>
        </div>

        <div className="space-y-3.5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="liquid-glass-subtle p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-black/10 hover:border-black/30 hover:bg-white/80 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <FileText className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">
                    {doc.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mt-1">
                    <span className="bg-neutral-200/70 text-neutral-800 font-medium px-2 py-0.5 rounded-md text-[11px]">
                      {doc.category}
                    </span>
                    <span>• {doc.fileSize}</span>
                    <span>• {doc.vectorChunks} embedding chunks</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3.5 text-xs">
                <span className="text-neutral-400 font-mono text-xs">{doc.lastUpdated}</span>
                {doc.status === "ready" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Vectorized</span>
                  </span>
                )}
                {doc.status === "processing" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                    <span>Processing</span>
                  </span>
                )}
                {doc.status === "failed" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Failed</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
