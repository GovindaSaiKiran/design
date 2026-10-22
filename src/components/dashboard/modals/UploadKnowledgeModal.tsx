"use client";

import React, { useState, useRef } from "react";
import {
  X,
  FileText,
  Database,
  Check,
  ShieldCheck,
  Tag,
  Plus,
  RotateCcw,
  Sparkles,
  UploadCloud,
  Edit3,
} from "lucide-react";

interface UploadKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocUploaded?: (title: string, category?: string) => void;
}

const PRESET_CATEGORIES = [
  "Academic & Course Info",
  "Fee Structures & Scholarships",
  "Hostel & Amenities",
  "Placement Statistics",
  "Admissions Policies",
];

const SUGGESTED_MANUAL_CATEGORIES = [
  "Campus Placement Rules",
  "Examination Bylaws",
  "Fee Concessions & TFW",
  "Sports & Gymnasium",
  "Hostel Curfew & Dining",
  "Transportation & Bus Routes",
  "International Student Cell",
  "Refund & Cancellation Policy",
];

export default function UploadKnowledgeModal({
  isOpen,
  onClose,
  onDocUploaded,
}: UploadKnowledgeModalProps) {
  const [docName, setDocName] = useState("JoSAA_Cutoffs_Scholarship_Matrix_2026-27.pdf");
  const [fileSize, setFileSize] = useState("2.4 MB");
  const [category, setCategory] = useState("Academic & Course Info");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const manualInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb} MB`);
    }
  };

  const handleSelectCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "__manual__") {
      setIsCustomCategory(true);
      setTimeout(() => manualInputRef.current?.focus(), 50);
    } else {
      setCategory(val);
      setIsCustomCategory(false);
    }
  };

  const handleUpload = () => {
    setIsProcessing(true);
    const finalCategory = isCustomCategory
      ? customCategory.trim() || "General Knowledge"
      : category;

    setTimeout(() => {
      onDocUploaded?.(docName, finalCategory);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-150 select-none cursor-default"
    >
      <div className="relative w-full max-w-lg bg-white rounded-[28px] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.16)] p-6 sm:p-7 overflow-hidden text-[#1A1A1A] font-sans space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D9C2FA] text-[#1A1A1A] shadow-xs flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-[#4A2D78]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/45">
                KNOWLEDGE REPOSITORY
              </span>
              <h3 className="text-base font-bold text-[#1A1A1A]">
                Upload Knowledge Document
              </h3>
              <p className="text-xs text-black/55">
                Ingest PDF, spreadsheet, or FAQ manual into vector store
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-black/40 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.txt"
          className="hidden"
        />

        {/* Form Body */}
        <div className="space-y-4">
          {/* Category Section with Manual Entry Freedom */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-700" />
                <span>Knowledge Category:</span>
              </label>

              {/* Mode Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !isCustomCategory;
                  setIsCustomCategory(nextState);
                  if (nextState) {
                    setTimeout(() => manualInputRef.current?.focus(), 50);
                  }
                }}
                className="text-[11px] font-bold text-[#4A2D78] hover:text-black inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF5E9] hover:bg-[#F5ECE0] border border-[#E9E1D4] transition-all cursor-pointer shadow-2xs"
                title={isCustomCategory ? "Switch back to standard presets" : "Manually enter a custom category name"}
              >
                {isCustomCategory ? (
                  <>
                    <RotateCcw className="w-3 h-3 text-[#4A2D78]" />
                    <span>Choose from Presets</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 text-[#4A2D78]" />
                    <span>Manual Entry / Custom</span>
                  </>
                )}
              </button>
            </div>

            {/* If Preset Mode */}
            {!isCustomCategory ? (
              <div className="space-y-2">
                <select
                  value={category}
                  onChange={handleSelectCategoryChange}
                  className="w-full text-xs px-4 py-2.5 bg-[#FAF5E9] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-purple-600 focus:bg-white transition-all cursor-pointer font-medium"
                >
                  {PRESET_CATEGORIES.map((preset) => (
                    <option key={preset} value={preset}>
                      {preset}
                    </option>
                  ))}
                  <option value="__manual__" className="text-purple-700 font-bold">
                    + Enter Custom Category (Manual Entry)...
                  </option>
                </select>

                <p className="text-[11px] text-black/50">
                  Select a business category or click &ldquo;Manual Entry / Custom&rdquo; to type your own department or domain.
                </p>
              </div>
            ) : (
              /* If Manual Entry Mode */
              <div className="space-y-2.5 animate-in fade-in duration-150">
                <div className="relative">
                  <Tag className="w-3.5 h-3.5 text-purple-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    ref={manualInputRef}
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Type custom category (e.g. Examination Bylaws, Campus Placements)..."
                    className="w-full text-xs pl-9 pr-24 py-2.5 bg-[#FAF5E9] border-2 border-purple-300 focus:border-purple-600 rounded-xl text-[#1A1A1A] placeholder:text-black/40 focus:outline-none focus:bg-white font-medium transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCategory(false)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-purple-700 hover:text-purple-900 font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-purple-200"
                  >
                    Reset
                  </button>
                </div>

                {/* Quick Suggestion Pills */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-black/40 tracking-wider block mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    Quick Suggestions (Click to fill):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_MANUAL_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCustomCategory(cat)}
                        className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          customCategory === cat
                            ? "bg-purple-100 text-purple-900 border-purple-300 font-semibold"
                            : "bg-[#FAF5E9] text-black/70 border-black/[0.06] hover:bg-white hover:text-black hover:border-black/20"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-200/80 text-[11px] text-purple-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>
                    Active Category: <strong>{customCategory.trim() || "Type above to define..."}</strong>. Voice agents &amp; WhatsApp workflows will prioritize this category during customer questions.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* File Selected Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-4 sm:p-5 rounded-2xl border-2 border-dashed border-black/15 bg-[#FAF5E9] hover:bg-[#F5ECE0] text-center cursor-pointer transition-all group"
            title="Click to browse your files or replace this document"
          >
            <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] shadow-2xs text-[#1A1A1A] flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-4 h-4 text-purple-700" />
            </div>

            {/* Editable Title */}
            {isEditingTitle ? (
              <div
                className="max-w-xs mx-auto mb-1 flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1 bg-white border border-purple-400 rounded-lg text-center font-semibold text-[#1A1A1A] focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(false)}
                  className="p-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5 font-semibold text-xs text-[#1A1A1A]">
                <FileText className="w-4 h-4 text-purple-700 opacity-80 shrink-0" />
                <span className="truncate max-w-[280px]">{docName}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingTitle(true);
                  }}
                  className="text-black/40 hover:text-black p-0.5"
                  title="Rename document"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )}

            <p className="text-[11px] text-black/55 mt-0.5">
              PDF / Excel Document • {fileSize} • Click to browse another file
            </p>

            <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#16856B] bg-[#C1F2D5] px-3 py-1 rounded-full border border-[#16856B]/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16856B]" />
              <span>Chunks: 142 vectors • Strict zero-hallucination policy</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-black/60 hover:text-[#1A1A1A] bg-white border border-black/[0.08] hover:bg-[#FAF3E4] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpload}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-black shadow-sm inline-flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" />
            <span>
              {isProcessing
                ? "Vectorizing Chunks..."
                : isCustomCategory && customCategory.trim()
                ? `Ingest with "${customCategory.trim()}"`
                : "Confirm & Ingest"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
