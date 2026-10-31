"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Upload,
  FileText,
  Edit3,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ExternalLink,
  Search,
  MessageSquare,
  ShieldCheck,
  Eye,
  X,
  FileSpreadsheet,
  Info,
  Clock,
  Layers,
} from "lucide-react";
import { KnowledgeDocument } from "@/types/dashboard";
import { mockKnowledgeBase } from "@/data/mock/dashboardData";
import { KnowledgeSourceReference } from "@/types/schedule";
import { soundSynth } from "@/lib/audio-synth";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "processing" | "ready" | "error";
  progress: number;
  chunks?: number;
  errorMessage?: string;
}

interface PlaygroundReferenceItem {
  id: string;
  title: string;
  scenario: string;
  dialogueSnippet: string;
  approvedDate: string;
  agentName: string;
  turnCount: number;
}

const PLAYGROUND_APPROVED_REFERENCES: PlaygroundReferenceItem[] = [
  {
    id: "play-01",
    title: "Objection Handling: Tier Comparison & Scalability",
    scenario: "Client asks whether Enterprise plan is necessary compared to Starter tier for high call volumes.",
    dialogueSnippet:
      "Agent: 'I understand your focus on return on investment. For high-volume outreach, the Enterprise tier includes dedicated SIP trunks, sub-140ms latency, and SLA guarantees that reduce cost per successful conversation.'",
    approvedDate: "Approved Yesterday in Playground",
    agentName: "Voice Operations AI",
    turnCount: 4,
  },
  {
    id: "play-02",
    title: "Billing & Invoicing Cycle Guidance",
    scenario: "Client inquires about tax invoice generation, automated payment terms, and usage alerts.",
    dialogueSnippet:
      "Agent: 'Yes, tax-compliant invoices are generated automatically at the start of each billing cycle, and automated thresholds notify your finance team when 80% of prepaid minutes are utilized.'",
    approvedDate: "Approved Oct 20 in Playground",
    agentName: "Billing & Finance Desk",
    turnCount: 6,
  },
  {
    id: "play-03",
    title: "Custom CRM & Webhook Integration",
    scenario: "Technical lead inquires about webhook payload formats and bidirectional contact sync.",
    dialogueSnippet:
      "Agent: 'Our system delivers real-time call disposition webhooks with full sentiment scores, call recording URLs, and structured summaries formatted directly for standard REST API endpoints.'",
    approvedDate: "Approved Oct 18 in Playground",
    agentName: "Technical Solutions Desk",
    turnCount: 5,
  },
];

interface KnowledgeSectionProps {
  selectedKbIds: string[];
  onChangeSelectedKbs: (ids: string[]) => void;
  manualNotes: string;
  onChangeManualNotes: (notes: string) => void;
  uploadedFiles: UploadedFileItem[];
  onChangeUploadedFiles: (files: UploadedFileItem[]) => void;
  selectedPlaygroundIds: string[];
  onChangeSelectedPlaygroundIds: (ids: string[]) => void;
}

export default function KnowledgeSection({
  selectedKbIds,
  onChangeSelectedKbs,
  manualNotes,
  onChangeManualNotes,
  uploadedFiles,
  onChangeUploadedFiles,
  selectedPlaygroundIds,
  onChangeSelectedPlaygroundIds,
}: KnowledgeSectionProps) {
  const [activeSourceTab, setActiveSourceTab] = useState<"upload" | "manual" | "kb" | "playground">("kb");
  const [kbSearchQuery, setKbSearchQuery] = useState("");
  const [previewPlaygroundItem, setPreviewPlaygroundItem] = useState<PlaygroundReferenceItem | null>(null);

  // File Upload Simulation
  const handleSimulateFileUpload = (fileName: string, fileSize: string, type: string) => {
    try { soundSynth.play("confirm"); } catch {}
    const newFileId = `up-${Date.now()}`;
    const initialItem: UploadedFileItem = {
      id: newFileId,
      name: fileName,
      size: fileSize,
      type,
      status: "uploading",
      progress: 30,
    };

    onChangeUploadedFiles([...uploadedFiles, initialItem]);

    // Simulate upload -> processing -> ready progression
    setTimeout(() => {
      onChangeUploadedFiles([
        ...uploadedFiles,
        { ...initialItem, status: "processing", progress: 75 },
      ]);
    }, 900);

    setTimeout(() => {
      onChangeUploadedFiles([
        ...uploadedFiles,
        { ...initialItem, status: "ready", progress: 100, chunks: 32 },
      ]);
      try { soundSynth.playSuccess(); } catch {}
    }, 2000);
  };

  const handleRemoveFile = (fileId: string) => {
    try { soundSynth.play("click"); } catch {}
    onChangeUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId));
  };

  const toggleKbSelection = (kbId: string) => {
    try { soundSynth.play("click"); } catch {}
    if (selectedKbIds.includes(kbId)) {
      onChangeSelectedKbs(selectedKbIds.filter((id) => id !== kbId));
    } else {
      onChangeSelectedKbs([...selectedKbIds, kbId]);
    }
  };

  const togglePlaygroundSelection = (playId: string) => {
    try { soundSynth.play("click"); } catch {}
    if (selectedPlaygroundIds.includes(playId)) {
      onChangeSelectedPlaygroundIds(selectedPlaygroundIds.filter((id) => id !== playId));
    } else {
      onChangeSelectedPlaygroundIds([...selectedPlaygroundIds, playId]);
    }
  };

  // Filtered KBs
  const filteredKbs = mockKnowledgeBase.filter(
    (k) =>
      k.title.toLowerCase().includes(kbSearchQuery.toLowerCase()) ||
      k.category.toLowerCase().includes(kbSearchQuery.toLowerCase())
  );

  // Summary counts
  const readyUploadsCount = uploadedFiles.filter((f) => f.status === "ready").length;
  const kbCount = selectedKbIds.length;
  const playgroundCount = selectedPlaygroundIds.length;
  const hasManualNotes = manualNotes.trim().length > 0;

  const totalCalculatedChunks =
    selectedKbIds.reduce((sum, id) => {
      const doc = mockKnowledgeBase.find((k) => k.id === id);
      return sum + (doc ? doc.vectorChunks : 0);
    }, 0) +
    uploadedFiles
      .filter((f) => f.status === "ready")
      .reduce((sum, f) => sum + (f.chunks || 0), 0) +
    (hasManualNotes ? 12 : 0) +
    playgroundCount * 8;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#707684]">
              Step 4 · Grounding Intelligence
            </span>
            <span className="text-xs text-[#283A50]/30">•</span>
            <span className="text-xs text-[#707684]">Zero-Hallucination Knowledge Layer</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#283A50] mt-0.5">
            What should your AI agent know?
          </h3>
          <p className="text-xs text-[#707684] mt-0.5 leading-relaxed">
            Attach verified knowledge collections, manual facts, or approved dialogue examples so the agent provides 100% accurate information on calls.
          </p>
        </div>

        {/* Total Grounding Indicator */}
        <div className="shrink-0 flex items-center gap-2 bg-[#FAF5E9] px-3 py-1.5 rounded-xl border border-[#E9E1D4]">
          <BookOpen className="w-4 h-4 text-[#283A50]" />
          <div className="text-[11px]">
            <span className="text-[#707684]">Active Grounding:</span>{" "}
            <span className="font-bold text-[#283A50]">{totalCalculatedChunks} Chunks</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-[#2E8066] font-bold">
            Zero-Hallucination
          </span>
        </div>
      </div>

      {/* 4 Knowledge Source Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E9E1D4] pb-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveSourceTab("kb")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            activeSourceTab === "kb"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#283A50] border border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Existing Knowledge Base ({kbCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSourceTab("upload")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            activeSourceTab === "upload"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#283A50] border border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File ({readyUploadsCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSourceTab("manual")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            activeSourceTab === "manual"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#283A50] border border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Write Information Manually {hasManualNotes && "•"}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSourceTab("playground")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold transition-all ${
            activeSourceTab === "playground"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#283A50] border border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Playground Dialogue References ({playgroundCount})</span>
        </button>
      </div>

      {/* TAB 1: Existing Knowledge Base */}
      {activeSourceTab === "kb" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#707684]" />
              <input
                type="text"
                placeholder="Search knowledge documents..."
                value={kbSearchQuery}
                onChange={(e) => setKbSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#E9E1D4] bg-[#FAF5E9]/30 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50]"
              />
            </div>
            <Link
              href="/dashboard/knowledge"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-[#707684] hover:text-[#283A50] font-semibold"
            >
              <span>Manage Knowledge Collections</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {filteredKbs.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-[#E9E1D4] bg-[#FAF5E9]/20">
              <BookOpen className="w-8 h-8 text-[#707684]/50 mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#283A50]">No knowledge documents found</p>
              <p className="text-[11px] text-[#707684] mt-1">Try a different search term or upload supporting files in the Upload tab.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {filteredKbs.map((doc) => {
                const isSelected = selectedKbIds.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleKbSelection(doc.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#FAF5E9]/60 border-[#283A50] shadow-xs ring-1 ring-[#283A50]"
                        : "bg-white border-[#E9E1D4] hover:border-[#283A50]/40 hover:bg-[#FAF5E9]/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#283A50] shrink-0" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                            {doc.category}
                          </span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "border-[#283A50] bg-[#283A50] text-white"
                              : "border-[#E9E1D4] bg-white"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                      </div>

                      <h4 className="font-bold text-xs text-[#283A50] mt-2 line-clamp-2">
                        {doc.title}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E9E1D4]/80 flex items-center justify-between text-[10px] text-[#707684]">
                      <span className="font-mono">{doc.vectorChunks} chunks</span>
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        Ready &amp; Synced
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Upload a File */}
      {activeSourceTab === "upload" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
              Upload Campaign Supporting Material (PDF, DOCX, TXT, CSV)
            </h4>
            <p className="text-xs text-[#707684] mt-0.5">
              Documents are converted into zero-hallucination semantic vector chunks and made available strictly upon successful processing.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-[#E9E1D4] hover:border-[#283A50]/40 rounded-2xl p-6 text-center space-y-3 bg-[#FAF5E9]/20">
            <div className="w-10 h-10 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center mx-auto text-[#283A50]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#283A50]">
                Drag and drop your document here, or choose an example below
              </p>
              <p className="text-[11px] text-[#707684] mt-0.5">
                Supported formats: PDF, DOCX, TXT, CSV (Up to 25 MB)
              </p>
            </div>

            {/* Quick Demo Upload Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  handleSimulateFileUpload("Standard_Service_Agreement_Q3.pdf", "1.8 MB", "pdf")
                }
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#E9E1D4] hover:bg-[#FAF5E9] text-[#283A50]"
              >
                + Upload Service_Agreement.pdf
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSimulateFileUpload("Product_Pricing_and_Billing_Policy.docx", "840 KB", "docx")
                }
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#E9E1D4] hover:bg-[#FAF5E9] text-[#283A50]"
              >
                + Upload Pricing_Policy.docx
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSimulateFileUpload("Customer_Operations_FAQ.txt", "240 KB", "txt")
                }
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-[#E9E1D4] hover:bg-[#FAF5E9] text-[#283A50]"
              >
                + Upload Operations_FAQ.txt
              </button>
            </div>
          </div>

          {/* Uploaded Documents List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-[#283A50] block">Processed Campaign Documents:</span>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#E9E1D4] bg-white text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#283A50]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#283A50]">{file.name}</span>
                          <span className="text-[10px] text-[#707684]">({file.size})</span>
                        </div>
                        {file.status === "ready" ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-[#2E8066] font-semibold mt-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Ready · {file.chunks} Vector Chunks Grounded</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[10px] text-amber-700 font-medium mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span>
                              {file.status === "uploading" ? "Uploading file..." : "Extracting & Vectorizing..."}{" "}
                              ({file.progress}%)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1 rounded-lg text-[#707684] hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Write Information Manually */}
      {activeSourceTab === "manual" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
                Write Information Manually
              </h4>
              <p className="text-xs text-[#707684] mt-0.5">
                Enter business facts, temporary campaign offers, qualification criteria, or talking points directly.
              </p>
            </div>
            <span className="text-[10px] text-[#707684] font-mono">
              {manualNotes.length} chars · ~{Math.ceil(manualNotes.length / 4)} tokens
            </span>
          </div>

          <textarea
            rows={5}
            value={manualNotes}
            onChange={(e) => onChangeManualNotes(e.target.value)}
            className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl p-3.5 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white resize-none font-sans leading-relaxed"
            placeholder="Type or paste campaign-specific facts here...&#10;&#10;Example:&#10;• Special seasonal discount: 15% off annual commit plans before month end.&#10;• Dedicated onboarding support included for teams over 5 agents.&#10;• Priority support helpline: +1 (800) 555-0199."
          />
        </div>
      )}

      {/* TAB 4: Reuse AI Agent Playground References */}
      {activeSourceTab === "playground" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
              Reuse Approved Agent Playground Dialogues
            </h4>
            <p className="text-xs text-[#707684] mt-0.5 leading-relaxed">
              Select verified high-performing turns previously simulated in Agent Playground. These act as supplementary stylistic guidance while preserving base security rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PLAYGROUND_APPROVED_REFERENCES.map((ref) => {
              const isSelected = selectedPlaygroundIds.includes(ref.id);
              return (
                <div
                  key={ref.id}
                  onClick={() => togglePlaygroundSelection(ref.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#FAF5E9]/60 border-[#283A50] shadow-xs ring-1 ring-[#283A50]"
                      : "bg-white border-[#E9E1D4] hover:border-[#283A50]/40 hover:bg-[#FAF5E9]/20"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                        {ref.turnCount} Verified Turns
                      </span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "border-[#283A50] bg-[#283A50] text-white"
                            : "border-[#E9E1D4] bg-white"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-[#283A50] mt-2">
                      {ref.title}
                    </h4>
                    <p className="text-[11px] text-[#707684] mt-1 line-clamp-2">
                      {ref.scenario}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E9E1D4]/80 flex items-center justify-between text-[10px]">
                    <span className="text-[#707684]">{ref.agentName}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewPlaygroundItem(ref);
                      }}
                      className="text-[#283A50] font-bold hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Combined Knowledge Sources Summary Banner */}
      <div className="bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-[#283A50]">Selected Knowledge Configuration:</span>
          {selectedKbIds.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#283A50] border border-[#E9E1D4] text-[11px] font-medium">
              📚 {selectedKbIds.length} KB Collections
            </span>
          )}
          {readyUploadsCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#283A50] border border-[#E9E1D4] text-[11px] font-medium">
              📄 {readyUploadsCount} Uploaded Files
            </span>
          )}
          {hasManualNotes && (
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#283A50] border border-[#E9E1D4] text-[11px] font-medium">
              ✍️ Manual Facts Attached
            </span>
          )}
          {playgroundCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#283A50] border border-[#E9E1D4] text-[11px] font-medium">
              🧪 {playgroundCount} Playground Examples
            </span>
          )}
          {selectedKbIds.length === 0 && readyUploadsCount === 0 && !hasManualNotes && playgroundCount === 0 && (
            <span className="text-[#707684] italic">No sources attached yet (using agent base prompt)</span>
          )}
        </div>

        <span className="text-[11px] text-[#2E8066] font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Zero-Hallucination Safe
        </span>
      </div>

      {/* Preview Playground Modal */}
      {previewPlaygroundItem && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E9E1D4] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h4 className="font-bold text-sm text-[#283A50]">{previewPlaygroundItem.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPlaygroundItem(null)}
                className="p-1 rounded-lg text-[#707684] hover:bg-[#FAF5E9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#707684] uppercase tracking-wider text-[10px]">Context / Scenario:</span>
              <p className="text-[#283A50] bg-[#FAF5E9]/50 p-2.5 rounded-xl border border-[#E9E1D4]">
                {previewPlaygroundItem.scenario}
              </p>

              <span className="font-bold text-[#707684] uppercase tracking-wider text-[10px] block pt-2">
                Approved Agent Dialogue Exemplar:
              </span>
              <p className="text-[#283A50] bg-white p-3 rounded-xl border border-[#E9E1D4] font-serif italic leading-relaxed">
                {previewPlaygroundItem.dialogueSnippet}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E9E1D4] flex items-center justify-between">
              <span className="text-[11px] text-[#707684]">{previewPlaygroundItem.approvedDate}</span>
              <button
                type="button"
                onClick={() => setPreviewPlaygroundItem(null)}
                className="px-4 py-1.5 rounded-xl bg-[#283A50] text-white text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
