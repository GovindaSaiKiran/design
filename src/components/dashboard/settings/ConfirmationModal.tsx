import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm Action",
  cancelLabel = "Cancel",
  isDestructive = true,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl border border-[#E9E1D4] max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isDestructive
                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#283A50]">{title}</h3>
              <span className="text-[11px] text-[#707684]">Please verify before proceeding</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#707684] leading-relaxed bg-[#FAF5E9]/60 p-3.5 rounded-xl border border-[#E9E1D4]/80">
          {description}
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#283A50] bg-white hover:bg-slate-50 border border-[#E9E1D4] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition-colors ${
              isDestructive
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-[#283A50] hover:bg-[#1f2d3e]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
