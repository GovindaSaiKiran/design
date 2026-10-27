"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileSpreadsheet,
  RefreshCw,
  Sparkles,
  Layers,
  Database,
  ArrowRight,
  ShieldCheck,
  CalendarClock,
  PhoneOutgoing,
  MessageSquare,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import UploadKnowledgeModal from "@/components/dashboard/modals/UploadKnowledgeModal";
import { KnowledgeDocument } from "@/types/dashboard";
import { mockKnowledgeBase } from "@/data/mock/dashboardData";

export default function KnowledgePage() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(mockKnowledgeBase);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [testQuery, setTestQuery] = useState("");
  const [testResult, setTestResult] = useState<{
    query: string;
    matchedDoc: string;
    score: number;
    chunkText: string;
  } | null>(null);
  const [searching, setSearching] = useState(false);

  const handleTestSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuery.trim()) return;

    setSearching(true);
    setTimeout(() => {
      setTestResult({
        query: testQuery,
        matchedDoc: documents[0]?.title || "Enterprise Service Level Agreement & Carrier Runbook.pdf",
        score: 0.942,
        chunkText:
          "Section 3.1 (High-Availability Voice SLA): All inbound and outbound SIP trunk endpoints maintain 99.99% uptime with automated carrier failover within 120ms. Audio streams are encrypted via TLS 1.3 and SRTP.",
      });
      setSearching(false);
    }, 250);
  };

  const totalChunks = documents.reduce((acc, d) => acc + d.vectorChunks, 0);

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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A2D78] bg-[#D9C2FA] px-3 py-0.5 rounded-full">
              Knowledge &amp; Integrations
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Knowledge Base &amp; RAG Grounding
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Institutional knowledge files, fee catalogs, admissions brochures, and strict zero-hallucination vector grounding.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => alert("Vector indices re-synchronized successfully across active agents.")}
            className="inline-flex items-center gap-2 bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-full border border-black/[0.06] transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-black/50" />
            <span>Re-index Chunks</span>
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-white" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* AI Agent Business Knowledge Library Banner */}
      <div className="p-5 rounded-[24px] bg-[#FAF5E9] border border-[#E9E1D4] relative overflow-hidden shadow-2xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-3xl">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  The AI Agent&apos;s Business Knowledge Library
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                  Zero Hallucination Guaranteed
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Knowledge Base is the information your AI agent refers to when answering customers&apos; questions. Instead of making the AI invent answers, you provide business-approved information so it can respond accurately during <strong>phone calls</strong> and <strong>WhatsApp conversations</strong>.
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Think of it as the AI agent&apos;s business knowledge library. When scheduling inbound/outbound calls or automations, select from these approved documents to ground agent dialogues.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            <Link
              href="/dashboard/campaigns?new=true"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition-all shadow-xs"
              title="Schedule a call campaign using these knowledge documents"
            >
              <CalendarClock className="w-3.5 h-3.5 text-purple-600" />
              <span>Schedule Call</span>
            </Link>

            <Link
              href="/dashboard/outbound-scheduler"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white transition-all shadow-xs"
              title="Launch or schedule autonomous outbound calls with grounded knowledge"
            >
              <PhoneOutgoing className="w-3.5 h-3.5 text-amber-300" />
              <span>Outbound Scheduler</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Institutional Knowledge"
          icon={FileSpreadsheet}
          description="Vectorized documents grounding agent replies."
          metric={`${documents.length} documents`}
          metricLabel={documents.length > 0 ? `${totalChunks} total vector chunks` : "No documents indexed"}
          status={documents.length > 0 ? "Indexed" : "Standby"}
          statusType={documents.length > 0 ? "ready" : "neutral"}
          actionLabel="View vector chunks →"
        />

        <WorkspaceCard
          name="Vector Index Chunks"
          icon={BookOpen}
          description="512-token chunks with 50-token semantic overlap."
          metric={`${totalChunks} chunks`}
          metricLabel={totalChunks > 0 ? "Semantic search active" : "No vector embeddings"}
          status={totalChunks > 0 ? "Ready" : "Standby"}
          statusType={totalChunks > 0 ? "ready" : "neutral"}
          actionLabel="Inspect queries →"
        />

        <WorkspaceCard
          name="Retrieval Pipeline"
          icon={Layers}
          description="Cosine similarity threshold: 0.75 for verified facts."
          metric="Gemini Text"
          metricLabel="text-embedding-004 model"
          status="Active"
          statusType="ready"
          actionLabel="Test retrieval →"
        />

        <WorkspaceCard
          name="Compliance & Guardrails"
          icon={ShieldCheck}
          description="Strict fallback rules preventing out-of-scope hallucination."
          metric="Strict Fallback"
          metricLabel="Zero hallucination verified"
          status="Guarded"
          statusType="live"
          actionLabel="Configure policy →"
          href="/dashboard/agents"
        />
      </div>

      {/* Interactive RAG Retrieval Diagnostic Tester */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 space-y-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#D9C2FA] text-[#4A2D78] flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-4 h-4 text-[#4A2D78]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A]">
              RAG Retrieval Diagnostic Tester
            </h3>
            <p className="text-xs text-black/55 mt-0.5">
              Simulate semantic vector retrieval to inspect what exact context your agents retrieve before answering a caller.
            </p>
          </div>
        </div>

        <form onSubmit={handleTestSearch} className="flex gap-2.5 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-black/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. What is the SLA guarantee for high-concurrency SIP trunking?"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all placeholder:text-black/40"
            />
          </div>

          <button
            type="submit"
            disabled={searching}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#111111] hover:bg-black text-white transition-all cursor-pointer shrink-0 disabled:opacity-50 shadow-sm"
          >
            {searching ? (
              <span>Retrieving...</span>
            ) : (
              <>
                <Database className="w-3.5 h-3.5" />
                <span>Test Retrieval</span>
              </>
            )}
          </button>
        </form>

        {testResult && (
          <div className="p-5 rounded-[22px] bg-[#FBF7ED] border border-black/[0.06] space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs flex-wrap gap-2">
              <span className="font-bold text-[#1A1A1A]">
                Matched Source: {testResult.matchedDoc}
              </span>
              <span className="font-semibold text-[#0D593F] bg-[#C1F2D5] px-3 py-1 rounded-full text-[11px]">
                Cosine Similarity: {testResult.score}
              </span>
            </div>
            <p className="text-xs text-[#1A1A1A] leading-relaxed bg-white p-4 rounded-[18px] border border-black/[0.06] shadow-2xs">
              {testResult.chunkText}
            </p>
            <div className="text-[11px] text-[#0D593F] flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B]" />
              <span>Grounded truth verified • Fallback triggered if similarity &lt; 0.75</span>
            </div>
          </div>
        )}
      </div>

      {/* Indexed Documents Table */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] overflow-hidden shadow-2xs">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#1A1A1A]">
              Indexed Knowledge Documents
            </span>
            <span className="text-xs text-black/45 font-medium">
              ({documents.length} sources • {totalChunks} chunks)
            </span>
          </div>
          <span className="text-xs text-black/50 hidden sm:inline">
            Auto-chunked at 512 tokens with 50-token overlap
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-5">Document Title</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">File Size</th>
                <th className="py-3 px-5">Vector Chunks</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Last Updated</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#D9C2FA] text-[#4A2D78] flex items-center justify-center mx-auto">
                        <BookOpen className="w-6 h-6 text-[#4A2D78]" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">No documents uploaded</h3>
                      <p className="text-xs text-black/55 leading-relaxed">
                        Upload PDFs, spreadsheets, or manuals to ground your voice agents in verified factual truth.
                      </p>
                      <button
                        onClick={() => setUploadModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5 text-white" />
                        <span>Upload Knowledge Document</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-black/[0.015] transition-colors group text-[#1A1A1A]"
                  >
                    {/* Title */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-[#1A1A1A] flex items-center gap-2">
                        <FileText className="w-4 h-4 text-black/40" />
                        <span>{doc.title}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1A1A1A] bg-[#FBF7ED] px-3 py-0.5 rounded-full border border-black/[0.06]">
                        {doc.category}
                      </span>
                    </td>

                    {/* File Size */}
                    <td className="py-4 px-5 text-black/55">
                      {doc.fileSize}
                    </td>

                    {/* Chunks */}
                    <td className="py-4 px-5 font-semibold text-[#1A1A1A]">
                      {doc.vectorChunks} chunks
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      {doc.status === "ready" ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#C1F2D5] text-[#0D593F] px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-[#16856B]" />
                          Vectorized
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#D9C2FA] text-[#4A2D78] px-2.5 py-0.5 rounded-full">
                          <RefreshCw className="w-3 h-3 text-[#4A2D78] animate-spin" />
                          Indexing
                        </span>
                      )}
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-5 text-black/55 text-xs">
                      {doc.lastUpdated}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setTestQuery(doc.title.split(".")[0]);
                          handleTestSearch({ preventDefault: () => {} } as any);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                      >
                        <span>Test Query</span>
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
      <UploadKnowledgeModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onDocUploaded={(title, customCategory) => {
          const newDoc: KnowledgeDocument = {
            id: `doc-${Date.now()}`,
            title: title || "New Knowledge Document.pdf",
            category: customCategory || "Custom Category",
            fileSize: "2.4 MB",
            uploadedAt: "Today",
            status: "ready",
            vectorChunks: 142,
            lastUpdated: "Just now",
          };
          setDocuments((prev) => [newDoc, ...prev]);
        }}
      />
    </div>
  );
}
