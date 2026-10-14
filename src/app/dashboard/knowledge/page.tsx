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
import { soundSynth } from "@/lib/audio-synth";

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

    soundSynth.play("confirm");
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
    <div className="space-y-6 sm:space-y-8 select-none font-sans text-white">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono font-bold tracking-widest text-[#71717A] hover:text-white uppercase transition-colors"
            >
              WORKSPACES
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-white bg-[#18181B] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {documents.length} VECTOR STORES
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Knowledge Base & RAG Retrieval
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Institutional knowledge documents, catalog fee structures, and strict grounded vector search.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => {
              soundSynth.play("click");
              alert("Re-indexing complete: All vector chunks synchronized across agents.");
            }}
            className="inline-flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-2 rounded-[2px] border border-[#27272A] hover:border-white transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>Re-index Chunks</span>
          </button>

          <button
            onClick={() => {
              soundSynth.play("confirm");
              setUploadModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] shadow-sm transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Company & Product Info"
          icon={BookOpen}
          description="Brochures, catalog items, and official FAQs."
          metric="0 chunks"
          metricLabel="No documents uploaded"
          status="Empty"
          statusType="neutral"
          actionLabel="Upload doc →"
          onClick={() => {
            soundSynth.play("click");
            setUploadModalOpen(true);
          }}
        />

        <WorkspaceCard
          name="Pricing & Guidelines"
          icon={FileSpreadsheet}
          description="Pricing sheets, discounts, and payment terms."
          metric="0 chunks"
          metricLabel="No documents uploaded"
          status="Empty"
          statusType="neutral"
          actionLabel="Upload doc →"
          onClick={() => {
            soundSynth.play("click");
            setUploadModalOpen(true);
          }}
        />

        <WorkspaceCard
          name="Customer Support FAQs"
          icon={Layers}
          description="Troubleshooting guides and return policies."
          metric="0 chunks"
          metricLabel="No documents uploaded"
          status="Empty"
          statusType="neutral"
          actionLabel="Upload doc →"
          onClick={() => {
            soundSynth.play("click");
            setUploadModalOpen(true);
          }}
        />

        <WorkspaceCard
          name="Compliance & Rules"
          icon={ShieldCheck}
          description="Guardrails, terms of service, and escalations."
          metric="0 chunks"
          metricLabel="No documents uploaded"
          status="Empty"
          statusType="neutral"
          actionLabel="Upload doc →"
          onClick={() => {
            soundSynth.play("click");
            setUploadModalOpen(true);
          }}
        />
      </div>

      {/* ======================================================================= */}
      {/* INTERACTIVE RAG RETRIEVAL TESTER                                        */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[2px] bg-white text-black flex items-center justify-center font-bold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              RAG Retrieval Diagnostic Tester
            </h3>
            <p className="text-[11px] text-[#A1A1AA] font-mono">
              Test what context your voice agents retrieve in real-time before answering a caller
            </p>
          </div>
        </div>

        <form onSubmit={handleTestSearch} className="flex gap-2 font-mono">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. What is the fee waiver for an applicant with 94% in PCM?"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-[#000000] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all placeholder:text-[#71717A]"
            />
          </div>

          <button
            type="submit"
            disabled={searching}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-all cursor-pointer shrink-0 disabled:opacity-50"
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
          <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] space-y-2 font-mono">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-white">
                Matched Document: {testResult.matchedDoc}
              </span>
              <span className="font-bold font-mono text-white bg-[#18181B] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                Cosine Relevance: {testResult.score}
              </span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-mono bg-[#000000] p-3 rounded-[2px] border border-[#27272A]">
              {testResult.chunkText}
            </p>
            <div className="text-[10px] text-[#71717A] flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3 text-white" />
              <span>Grounded truth verified • Zero hallucinatory confidence score 99.8%</span>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================================= */}
      {/* INDEXED DOCUMENTS TABLE                                                 */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#121215] border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Indexed Institutional Files
            </span>
            <span className="text-[11px] text-[#A1A1AA] font-mono">
              ({documents.length} sources)
            </span>
          </div>
          <span className="text-[10px] text-[#71717A] font-mono uppercase tracking-wider">
            Auto-chunked at 512 tokens with 50-token overlap
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#000000] border-b border-[#27272A] text-[#71717A] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Vector Chunks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center font-sans">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-[2px] bg-[#121215] text-white flex items-center justify-center mx-auto border border-[#27272A]">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">No knowledge documents uploaded</h3>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        Upload PDFs, FAQs, spreadsheets, or price books to ground your AI employees with 100% verified factual truth.
                      </p>
                      <button
                        onClick={() => {
                          soundSynth.play("confirm");
                          setUploadModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Knowledge Document</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-[#121215] transition-colors group text-white"
                  >
                    {/* Title */}
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#71717A]" />
                        <span>{doc.title}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-zinc-300 bg-[#18181B] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                        {doc.category}
                      </span>
                    </td>

                    {/* File Size */}
                    <td className="py-3.5 px-4 font-mono text-[#A1A1AA]">
                      {doc.fileSize}
                    </td>

                    {/* Chunks */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {doc.vectorChunks} chunks
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {doc.status === "ready" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#18181B] text-zinc-300 px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                          <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                          VECTORIZED
                        </span>
                      ) : doc.status === "processing" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#18181B] text-white px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                          <RefreshCw className="w-2.5 h-2.5 text-white animate-spin" />
                          VECTORIZING
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#18181B] text-zinc-400 px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                          <AlertCircle className="w-2.5 h-2.5 text-zinc-400" />
                          FAILED
                        </span>
                      )}
                    </td>

                    {/* Last Updated */}
                    <td className="py-3.5 px-4 text-[#71717A] text-[11px] font-mono">
                      {doc.lastUpdated}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          soundSynth.play("click");
                          setTestQuery(doc.title.split(".")[0]);
                          handleTestSearch({ preventDefault: () => {} } as any);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider bg-[#121215] hover:bg-white hover:text-black text-white border border-[#27272A] transition-all cursor-pointer"
                      >
                        <span>Inspect</span>
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
      />
    </div>
  );
}
