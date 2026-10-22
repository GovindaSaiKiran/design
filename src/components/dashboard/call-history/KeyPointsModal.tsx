"use client";

import React, { useState } from "react";
import {
  X,
  FileSpreadsheet,
  FileText,
  Printer,
  Download,
  Edit2,
  Check,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Bot,
  Tag,
  Phone,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import {
  CallIntelligenceRecord,
  ExtractedFieldItem,
} from "@/types/callIntelligence";
import {
  downloadIndividualKeyPointsPdf,
  downloadIndividualKeyPointsExcel,
  downloadIndividualKeyPointsDoc,
  formatMaskedPhone,
} from "@/lib/utils/callIntelligenceExport";

interface KeyPointsModalProps {
  call: CallIntelligenceRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTranscript?: (call: CallIntelligenceRecord) => void;
  onUpdateField?: (callId: string, fieldKey: string, newValue: string) => void;
}

export default function KeyPointsModal({
  call,
  isOpen,
  onClose,
  onOpenTranscript,
  onUpdateField,
}: KeyPointsModalProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [localFields, setLocalFields] = useState<ExtractedFieldItem[]>([]);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Sync local fields when call changes
  React.useEffect(() => {
    if (call) {
      setLocalFields(call.purposeSpecificFields || []);
      setEditingKey(null);
    }
  }, [call]);

  if (!isOpen || !call) return null;

  const handleStartEdit = (field: ExtractedFieldItem) => {
    setEditingKey(field.key);
    setEditValue(field.value);
  };

  const handleSaveEdit = (fieldKey: string) => {
    setLocalFields((prev) =>
      prev.map((f) =>
        f.key === fieldKey
          ? {
              ...f,
              value: editValue,
              isEdited: true,
              editedBy: "Current User",
              editedAt: "Just now",
              originalValue: f.originalValue || f.value,
            }
          : f
      )
    );
    onUpdateField?.(call.id, fieldKey, editValue);
    setEditingKey(null);
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
  };

  const isPending = call.keyPointsStatus === "pending" || call.lifecycleStatus === "queued";
  const isFailed = call.keyPointsStatus === "failed";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#E9E1D4] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#283A50] my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-6 bg-[#FAF5E9] border-b border-[#E9E1D4] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-[#283A50] bg-white border border-[#E9E1D4] px-2.5 py-0.5 rounded-full">
                {call.id}
              </span>
              <span className="text-xs font-bold bg-[#EAF5F0] text-[#2E8066] border border-[#B8E2D4] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#2E8066]" />
                <span>{call.callingPurpose}</span>
              </span>
              <span className="text-xs font-medium text-[#707684] bg-white border border-[#E9E1D4] px-2.5 py-0.5 rounded-full">
                Campaign: <strong>{call.campaignName}</strong>
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-[#283A50] tracking-tight flex items-center gap-2 mt-1">
              <span>{call.contactName}</span>
              <span className="text-xs font-mono font-normal text-[#707684]">
                ({formatMaskedPhone(call.contactPhone)})
              </span>
            </h3>

            <div className="flex items-center gap-3 text-xs text-[#707684] flex-wrap">
              <span>
                Agent: <strong className="text-[#283A50]">{call.agentName}</strong>
              </span>
              <span>•</span>
              <span>
                Language: <strong className="text-[#283A50]">{call.language}</strong>
              </span>
              <span>•</span>
              <span>
                Time: <strong>{call.date} {call.timestamp}</strong>
              </span>
              <span>•</span>
              <span>
                Duration: <strong className="font-mono text-[#283A50]">{call.duration}</strong>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E9E1D4] hover:bg-black/5 text-[#707684] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
          {/* Status vs Outcome Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E1D4] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#283A50]" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#707684] uppercase tracking-wider">Execution Status</div>
                <div className="text-sm font-bold text-[#283A50] capitalize flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      call.lifecycleStatus === "completed"
                        ? "bg-[#2E8066]"
                        : call.lifecycleStatus === "in-progress"
                        ? "bg-blue-600 animate-pulse"
                        : call.lifecycleStatus === "queued"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                  />
                  <span>{call.lifecycleStatus}</span>
                  {call.plannedStartTime && (
                    <span className="text-xs text-[#707684] font-normal">
                      (Scheduled: {call.plannedStartTime})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-[#E9E1D4] pt-2 sm:pt-0 sm:pl-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E1D4] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#2E8066]" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#707684] uppercase tracking-wider">Conversation Outcome</div>
                <div className="text-sm font-bold text-[#2E8066] mt-0.5">
                  {call.conversationOutcome || "No outcome recorded"}
                </div>
              </div>
            </div>
          </div>

          {/* Key Points Pending Notice if applicable */}
          {isPending && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">Key Points Pending</h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  This call is currently {call.lifecycleStatus}. Real-time key points and purpose-specific entities will be extracted automatically once the conversation concludes and the audio is processed.
                </p>
              </div>
            </div>
          )}

          {/* Section A: Purpose-Specific Extracted Key Points */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#2E8066]" />
                <h4 className="text-xs font-bold text-[#707684] uppercase tracking-wider">
                  Purpose-Specific Data Extraction ({call.callingPurpose})
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-[#707684]">
                {localFields.length} extracted fields
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {localFields.map((field) => {
                const isEditing = editingKey === field.key;
                return (
                  <div
                    key={field.key}
                    className="p-3.5 rounded-2xl bg-[#FAF5E9]/50 border border-[#E9E1D4] flex flex-col justify-between transition-all hover:border-[#283A50]/30"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-[#707684] text-[11px] uppercase tracking-wider">
                          {field.label}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {field.isEdited && (
                            <span className="text-[9.5px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">
                              Edited by user
                            </span>
                          )}
                          {!isEditing && (
                            <button
                              type="button"
                              onClick={() => handleStartEdit(field)}
                              className="text-[#707684] hover:text-[#283A50] p-1 rounded hover:bg-white transition-colors"
                              title="Edit this extracted value"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-1 space-y-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white border border-[#283A50] focus:outline-hidden"
                            autoFocus
                          />
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="px-2 py-1 text-[11px] rounded bg-white border border-[#E9E1D4] text-[#707684]"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(field.key)}
                              className="px-2.5 py-1 text-[11px] rounded bg-[#283A50] text-white font-bold flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs font-semibold text-[#283A50] mt-0.5">
                          {field.value || <span className="text-[#707684] italic">Not mentioned</span>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section B: General Key Points */}
          <div className="space-y-3 pt-2 border-t border-[#E9E1D4]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#283A50]" />
              <h4 className="text-xs font-bold text-[#707684] uppercase tracking-wider">
                General Conversation Intelligence
              </h4>
            </div>

            {/* Executive Summary */}
            <div className="p-4 rounded-2xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
              <div className="text-[11px] font-bold text-[#707684] uppercase tracking-wider mb-1">
                Executive Call Summary
              </div>
              <p className="text-xs leading-relaxed font-medium text-[#283A50]">
                {call.summary || "No summary generated."}
              </p>
            </div>

            {/* Questions & Needs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Main Questions Asked */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E9E1D4]">
                <div className="text-[11px] font-bold text-[#707684] uppercase tracking-wider mb-2">
                  Contact&apos;s Main Questions
                </div>
                {call.generalKeyPoints.mainQuestions && call.generalKeyPoints.mainQuestions.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-[#283A50]">
                    {call.generalKeyPoints.mainQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#707684] shrink-0">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-[#707684] italic">No specific questions identified</div>
                )}
              </div>

              {/* Contact's Needs & Interests */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E9E1D4]">
                <div className="text-[11px] font-bold text-[#707684] uppercase tracking-wider mb-2">
                  Contact&apos;s Needs &amp; Interests
                </div>
                {call.generalKeyPoints.needsAndInterests && call.generalKeyPoints.needsAndInterests.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-[#283A50]">
                    {call.generalKeyPoints.needsAndInterests.map((n, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#2E8066] shrink-0">•</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-[#707684] italic">Not mentioned</div>
                )}
              </div>
            </div>

            {/* Agreed Actions & Follow-up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Follow-up card */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E9E1D4]">
                <div className="text-[11px] font-bold text-[#707684] uppercase tracking-wider mb-1.5">
                  Follow-up Requirement
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      call.generalKeyPoints.followUpRequired
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-slate-100 text-slate-700 border border-slate-300"
                    }`}
                  >
                    {call.generalKeyPoints.followUpRequired ? "Follow-up Required" : "No Follow-up Needed"}
                  </span>
                  {call.generalKeyPoints.followUpDateTime && (
                    <span className="text-xs font-medium text-[#283A50]">
                      ({call.generalKeyPoints.followUpDateTime})
                    </span>
                  )}
                </div>
              </div>

              {/* Notes for Team */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#E9E1D4]">
                <div className="text-[11px] font-bold text-[#707684] uppercase tracking-wider mb-1">
                  Notes for Human Team
                </div>
                <p className="text-xs text-[#283A50] font-medium">
                  {call.generalKeyPoints.notesForHumanTeam || "No internal notes recorded."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions: Individual Downloads */}
        <div className="p-4 px-6 bg-[#FAF5E9] border-t border-[#E9E1D4] flex items-center justify-between shrink-0 flex-wrap gap-2.5">
          <div className="flex items-center gap-2">
            {onOpenTranscript && (
              <button
                type="button"
                onClick={() => onOpenTranscript(call)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
              >
                <span>View Full Transcript</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#707684]" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#707684] mr-1">Download Key Points:</span>

            {/* PDF Report */}
            <button
              type="button"
              onClick={() => downloadIndividualKeyPointsPdf(call)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
              title="Download print-ready PDF Key Points Dossier"
            >
              <Printer className="w-3.5 h-3.5 text-[#2E8066]" />
              <span>PDF</span>
            </button>

            {/* Excel Report */}
            <button
              type="button"
              onClick={() => downloadIndividualKeyPointsExcel(call)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
              title="Download Excel spreadsheet of extracted fields"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Excel</span>
            </button>

            {/* Word Document */}
            <button
              type="button"
              onClick={() => downloadIndividualKeyPointsDoc(call)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
              title="Download editable Word Document (.doc)"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Word (.doc)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold bg-[#283A50] hover:bg-[#1C2B3C] text-white shadow-xs transition-colors cursor-pointer ml-1"
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
