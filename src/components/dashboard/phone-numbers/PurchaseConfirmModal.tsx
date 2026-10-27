import React, { useState } from "react";
import {
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  Building,
  UserCheck,
  Zap,
} from "lucide-react";
import { AvailableMarketplaceNumber } from "@/types/phoneNumbers";

interface PurchaseConfirmModalProps {
  isOpen: boolean;
  number: AvailableMarketplaceNumber | null;
  availableAgents: Array<{ id: string; name: string; role: string }>;
  onConfirmPurchase: (params: {
    numberId: string;
    label: string;
    assignedAgentId: string;
    assignedAgentName: string;
    intendedUse: "inbound" | "outbound" | "both";
  }) => Promise<boolean>;
  onClose: () => void;
}

export default function PurchaseConfirmModal({
  isOpen,
  number,
  availableAgents,
  onConfirmPurchase,
  onClose,
}: PurchaseConfirmModalProps) {
  const [label, setLabel] = useState("");
  const [assignedAgentId, setAssignedAgentId] = useState(availableAgents[0]?.id || "agent-maya");
  const [intendedUse, setIntendedUse] = useState<"inbound" | "outbound" | "both">("both");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen || !number) return null;

  const selectedAgent = availableAgents.find((a) => a.id === assignedAgentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate clicks
    setIsSubmitting(true);
    setErrorMessage("");

    const success = await onConfirmPurchase({
      numberId: number.id,
      label: label.trim() || `${number.region} Helpline`,
      assignedAgentId,
      assignedAgentName: selectedAgent?.name || "Maya (Admissions Desk)",
      intendedUse,
    });

    setIsSubmitting(false);
    if (!success) {
      setErrorMessage("Purchase request could not be processed. Please retry.");
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-3xl border border-[#E9E1D4] max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 text-xs text-[#283A50] font-sans">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#E9E1D4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50] font-bold text-lg">
              {number.flagEmoji}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                Confirm Number Purchase &amp; Activation
              </span>
              <h3 className="text-base font-bold text-[#283A50] font-mono mt-0.5">
                {number.phoneNumber}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 disabled:opacity-30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pricing & Terms Summary */}
          <div className="p-4 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[#707684] font-medium">Monthly Number Rental:</span>
              <span className="font-bold text-sm text-[#283A50]">
                ₹{number.monthlyPrice.toLocaleString("en-IN")}/month
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#707684] font-medium">One-Time Activation Fee:</span>
              <span className="font-semibold text-[#2E8066]">
                {number.setupFee === 0 ? "₹0 (Free Setup)" : `₹${number.setupFee}`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#707684] font-medium">Number Type &amp; Region:</span>
              <span className="font-semibold text-[#283A50]">
                {number.type} • {number.region}
              </span>
            </div>
            <div className="pt-2 border-t border-[#E9E1D4]/80 text-[11px] text-[#707684] leading-relaxed">
              💡 <strong>Usage Note:</strong> Talk-time call minutes are consumed from your existing subscription plan. Monthly rental auto-renews until released.
            </div>
          </div>

          {/* Intended Use Selection */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[#283A50] block">
              Intended Calling Capability
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setIntendedUse("both")}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  intendedUse === "both"
                    ? "bg-[#FAF5E9] border-[#283A50] font-bold text-[#283A50] shadow-2xs"
                    : "bg-white border-[#E9E1D4] text-[#707684] hover:bg-slate-50"
                }`}
              >
                Inbound &amp; Outbound
              </button>
              <button
                type="button"
                onClick={() => setIntendedUse("inbound")}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  intendedUse === "inbound"
                    ? "bg-[#FAF5E9] border-[#283A50] font-bold text-[#283A50] shadow-2xs"
                    : "bg-white border-[#E9E1D4] text-[#707684] hover:bg-slate-50"
                }`}
              >
                Inbound Only
              </button>
              <button
                type="button"
                onClick={() => setIntendedUse("outbound")}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  intendedUse === "outbound"
                    ? "bg-[#FAF5E9] border-[#283A50] font-bold text-[#283A50] shadow-2xs"
                    : "bg-white border-[#E9E1D4] text-[#707684] hover:bg-slate-50"
                }`}
              >
                Outbound Only
              </button>
            </div>
          </div>

          {/* Department Label */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[#283A50] block">
              Friendly Label / Department Name
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={`e.g. ${number.region} Admissions Helpline`}
              className="w-full px-3 py-2.5 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] text-[#283A50] font-medium focus:outline-none"
            />
          </div>

          {/* Assign AI Agent */}
          <div className="space-y-1.5">
            <label className="font-semibold text-[#283A50] block">
              Assign AI Agent to Handle Calls
            </label>
            <select
              value={assignedAgentId}
              onChange={(e) => setAssignedAgentId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] text-[#283A50] font-semibold focus:outline-none cursor-pointer"
            >
              {availableAgents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} — {agent.role}
                </option>
              ))}
            </select>
          </div>

          {/* Regulatory KYC Notice */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>DoT &amp; Telecom Verification:</strong> Number is bound to your verified enterprise workspace account under Indian Telecom commercial rules.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E9E1D4]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#E9E1D4] font-semibold text-[#707684] hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#283A50] hover:bg-[#1f2d3e] text-white font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? "Activating Number..."
                  : `Confirm & Rent (₹${number.monthlyPrice.toLocaleString("en-IN")}/mo)`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
