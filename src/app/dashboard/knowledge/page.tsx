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
        matchedDoc: "B.Tech Fee Structure, TFW & Merit Scholarships.xlsx",
        score: 0.942,
        chunkText:
          "Article 4.2 (Chancellor Merit Waiver): Candidates securing 90.0% to 94.9% in 12th PCM receive a 50% tuition waiver for the first academic year. Candidates securing 95.0% and above qualify for a 100% full tuition waiver across all four years subject to maintaining CGPA >= 8.5.",
      });
      setSearching(false);
    }, 300);
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
              Zero-Hallucination Vector Store
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Knowledge Base & RAG Retrieval
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Institutional documents, cutoff matrices, fee schedules, and grounded semantic vector search.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => {
              // Simulated re-indexing
              alert("Re-indexing complete: All 925 vector chunks synchronized across agents.");
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#f7fee7] text-slate-800 hover:text-slate-950 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:border-[#cdfb56] shadow-2xs transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Re-index Chunks</span>
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-950" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Academic & Course Info"
          icon={BookOpen}
          description="Collegiate brochure 2026-27, curriculum syllabi, and faculty directory."
          metric="480 chunks"
          metricLabel="4.8 MB PDF • 100% Vectorized"
          status="Synchronized"
          statusType="ready"
          actionLabel="Inspect chunks →"
        />

        <WorkspaceCard
          name="Fees & Scholarships"
          icon={FileSpreadsheet}
          description="B.Tech fee schedule, 3-part installment rules, and merit waivers."
          metric="140 chunks"
          metricLabel="1.2 MB XLSX • 100% Vectorized"
          status="Synchronized"
          statusType="ready"
          actionLabel="Inspect chunks →"
        />

        <WorkspaceCard
          name="Campus & Hostel"
          icon={Layers}
          description="Hostel room allotments, mess dietary menus, and campus curfews."
          metric="210 chunks"
          metricLabel="6.4 MB PDF • Vectorizing"
          status="84% Synced"
          statusType="running"
          actionLabel="View progress →"
        />

        <WorkspaceCard
          name="Admissions & Cutoffs"
          icon={ShieldCheck}
          description="State CET ranks, JEE cutoff percentiles, and lateral entry rules."
          metric="95 chunks"
          metricLabel="2.9 MB PDF • Vectorizing"
          status="42% Synced"
          statusType="running"
          actionLabel="View progress →"
        />
      </div>

      {/* ======================================================================= */}
      {/* INTERACTIVE RAG RETRIEVAL TESTER                                        */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              RAG Retrieval Diagnostic Tester
            </h3>
            <p className="text-[11px] text-slate-500">
              Test what context your voice agents retrieve in real-time before answering a caller
            </p>
          </div>
        </div>

        <form onSubmit={handleTestSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. What is the fee waiver for an applicant with 94% in PCM?"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50/70 border border-slate-200/90 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cdfb56] focus:border-[#cdfb56] transition-all placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={searching}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 border border-[#bceb42] shadow-2xs transition-all cursor-pointer shrink-0 disabled:opacity-50"
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
          <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-700">
                Matched Document: {testResult.matchedDoc}
              </span>
              <span className="font-bold font-mono text-[#8ac926] bg-[#cdfb56]/40 px-2 py-0.5 rounded border border-[#cdfb56]">
                Cosine Relevance: {testResult.score}
              </span>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-mono bg-white p-3 rounded-lg border border-slate-200/80">
              {testResult.chunkText}
            </p>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#8ac926]" />
              <span>Grounded truth verified • Zero hallucinatory confidence score 99.8%</span>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================================= */}
      {/* INDEXED DOCUMENTS TABLE                                                 */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Indexed Institutional Files
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              ({documents.length} sources)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Auto-chunked at 512 tokens with 50-token overlap
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Vector Chunks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-[#f7fee7]/30 transition-colors group"
                >
                  {/* Title */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 group-hover:text-slate-950 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>{doc.title}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {doc.category}
                    </span>
                  </td>

                  {/* File Size */}
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {doc.fileSize}
                  </td>

                  {/* Chunks */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {doc.vectorChunks} chunks
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {doc.status === "ready" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 px-2 py-0.5 rounded-full border border-[#cdfb56]">
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#8ac926]" />
                        Vectorized
                      </span>
                    ) : doc.status === "processing" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#f7fee7] text-slate-900 px-2 py-0.5 rounded-full border border-[#cdfb56]">
                        <RefreshCw className="w-2.5 h-2.5 text-[#8ac926] animate-spin" />
                        Vectorizing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                        <AlertCircle className="w-2.5 h-2.5 text-rose-500" />
                        Failed
                      </span>
                    )}
                  </td>

                  {/* Last Updated */}
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {doc.lastUpdated}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => {
                        setTestQuery(doc.title.split(".")[0]);
                        handleTestSearch({ preventDefault: () => {} } as any);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-[#cdfb56] text-slate-800 hover:text-slate-950 border border-slate-200 hover:border-[#bceb42] shadow-2xs transition-all cursor-pointer"
                    >
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <UploadKnowledgeModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
}
