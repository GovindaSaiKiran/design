"use client";

import React, { useState } from "react";
import Image from "next/image";
import { KnowledgeDocument } from "@/types/dashboard";
import {
  Upload,
  FileText,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Link2,
  ShieldCheck,
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
  const enterpriseConnectors = [
    { name: "Google Drive", type: "Collegiate Records", count: "148 Docs", status: "Synced", image: "/images/connectors/google-drive.png" },
    { name: "Notion", type: "Admissions SOPs", count: "42 Pages", status: "Synced", image: "/images/connectors/notion.png" },
    { name: "Slack", type: "Counselor Channels", count: "12 Channels", status: "Active", image: "/images/connectors/slack.png" },
    { name: "Microsoft Excel", type: "Applicant Rosters", count: "36 Sheets", status: "Live Sync", image: "/images/connectors/excel.png" },
    { name: "GitHub", type: "Campus API & Webhooks", count: "6 Repos", status: "Connected", image: "/images/connectors/github.png" },
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
    <div className="space-y-6 animate-in fade-in duration-300 font-sans select-none text-[#1A1A1A]">
      {/* 1. Header Card */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-xs font-semibold text-[#5B21B6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Work Agents • Grounded Knowledge & Connectors</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Use your documents. Add one document or one lakh documents.
            </h1>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-sans">
              Connect company brochures, product specifications, policies, FAQs, and CRM data. AI Voice Agents use them as zero-hallucination context when conducting voice calls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onUploadDoc}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Upload className="w-3.5 h-3.5 stroke-[2]" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Enterprise App Connectors */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9C2FA]/30 border border-[#D9C2FA] text-[11px] font-semibold text-[#5B21B6] mb-2">
              <Link2 className="w-3 h-3" />
              <span>Integrated Ecosystem</span>
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
              Enterprise Data Connectors
            </h3>
            <p className="text-xs text-black/60 mt-0.5">
              Connect Google Drive, Notion, Slack, Microsoft Excel, and GitHub. Agents read updated records in real-time.
            </p>
          </div>
          <span className="text-xs font-mono text-black/60 bg-[#FAF3E4] px-3 py-1 rounded-full border border-black/[0.06]">
            5 Connectors Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {enterpriseConnectors.map((conn, idx) => (
            <div
              key={idx}
              className="bg-[#FAF3E4]/50 border border-black/[0.06] p-4 rounded-[20px] text-center flex flex-col items-center justify-between group cursor-pointer hover:bg-[#FAF3E4] transition-all"
            >
              <div className="w-12 h-12 p-2 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
                <Image
                  src={conn.image}
                  alt={conn.name}
                  width={32}
                  height={32}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <div className="font-semibold text-[#1A1A1A] text-xs">{conn.name}</div>
                <div className="text-[10px] text-black/50 mt-0.5">{conn.type}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-black/[0.06] w-full flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
                <span className="text-[10px] font-semibold text-[#16856B]">{conn.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Knowledge Base Status Widget */}
      <KnowledgeBaseStatus
        onManageKnowledge={() => {}}
        onUploadDoc={onUploadDoc}
      />

      {/* 4. Agent Skills & Rules */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C1F2D5] text-[11px] font-semibold text-[#16856B] mb-2">
              <ShieldCheck className="w-3 h-3" />
              <span>Safety & Grounding Directives</span>
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
              Configured Agent Skills & Rules
            </h3>
            <p className="text-xs text-black/60 mt-0.5">
              Skills set the strict instructions and verification checks each voice agent follows on every call.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agentSkills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-[#FAF3E4]/50 p-5 rounded-[20px] border border-black/[0.06] hover:border-black/15 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C1F2D5] text-[#16856B]">
                    {skill.status}
                  </span>
                  <span className="text-xs font-mono text-black/40">Rule #{idx + 1}</span>
                </div>
                <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">
                  {skill.title}
                </h4>
                <p className="text-xs text-black/60 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Vectorized Document Repository */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
          <div>
            <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
              Vectorized Document Repository
            </h3>
            <p className="text-xs text-black/50 mt-0.5">
              Synced across all Bulbul V3 inference endpoints & real-time telephony SIP trunks
            </p>
          </div>
          <span className="text-xs font-mono text-black/60 bg-[#FAF3E4] px-3 py-1 rounded-full border border-black/[0.06]">
            {documents.length} Grounding Files
          </span>
        </div>

        <div className="space-y-3">
          {documents.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF3E4]/30 rounded-[20px] border border-black/[0.06] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF3E4] border border-black/[0.08] flex items-center justify-center mx-auto text-black/40">
                <FileText className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#1A1A1A]">No grounding documents uploaded</p>
                <p className="text-xs text-black/50 max-w-sm mx-auto">
                  Upload PDF brochures, fee schedules, or policy manuals to ground your voice agents in authoritative knowledge.
                </p>
              </div>
              <button
                onClick={onUploadDocument}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#FAF3E4]/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[20px] border border-black/[0.06] hover:bg-[#FAF3E4] transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <FileText className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A1A1A] text-sm">
                      {doc.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-black/50 mt-1">
                      <span className="bg-black/5 text-[#1A1A1A] font-medium px-2 py-0.5 rounded-full text-[11px]">
                        {doc.category}
                      </span>
                      <span>• {doc.fileSize}</span>
                      <span>• {doc.vectorChunks} embedding chunks</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                  <span className="text-black/40 font-mono text-xs">{doc.lastUpdated}</span>
                  {doc.status === "ready" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#C1F2D5] text-[#16856B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B]" />
                      <span>Vectorized</span>
                    </span>
                  )}
                  {doc.status === "processing" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FFD9A0] text-[#7A4B00]">
                      <RefreshCw className="w-3.5 h-3.5 text-[#7A4B00] animate-spin" />
                      <span>Processing</span>
                    </span>
                  )}
                  {doc.status === "failed" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FFD9A0]/50 text-red-600">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                      <span>Failed</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
