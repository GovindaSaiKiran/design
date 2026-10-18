"use client";

import React, { useState } from "react";
import {
  X,
  Zap,
  Check,
  CreditCard,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Radio,
  Building2,
} from "lucide-react";

interface TopUpCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits?: number;
}

const creditPacks = [
  {
    id: "starter",
    title: "Starter Pack",
    minutes: 500,
    priceInr: 2250,
    ratePerMin: 4.5,
    popular: false,
    description: "Ideal for testing workflows and pilot calling campaigns.",
    features: [
      "500 Connected Calling Minutes",
      "All 12+ Indic Languages (Telugu, Hindi, etc.)",
      "Real-time CRM & Webhooks",
      "Standard DID Carrier Routing",
    ],
  },
  {
    id: "growth",
    title: "Growth Pack",
    minutes: 2500,
    priceInr: 9500,
    ratePerMin: 3.8,
    popular: true,
    description: "Best for active admissions and daily outbound counseling teams.",
    features: [
      "2,500 Connected Calling Minutes",
      "Instant WhatsApp Post-Call Dispatches",
      "Custom Sub-30s Meta Ads Lead Webhooks",
      "Priority Carrier SIP Trunking",
      "Extracted Variables Export",
    ],
  },
  {
    id: "enterprise",
    title: "Scale Pack",
    minutes: 10000,
    priceInr: 32000,
    ratePerMin: 3.2,
    popular: false,
    description: "Maximum efficiency for large institutions and multi-campus centers.",
    features: [
      "10,000 Connected Calling Minutes",
      "Dedicated DLT Telephony Numbers",
      "Custom LLM Fine-Tuning & Prompt Tuning",
      "Bespoke Enterprise Human Transfer",
      "24/7 Dedicated Technical Account Manager",
    ],
  },
];

export default function TopUpCreditsModal({
  isOpen,
  onClose,
  currentCredits = 14.0,
}: TopUpCreditsModalProps) {
  const [selectedPack, setSelectedPack] = useState(creditPacks[1].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRecharge = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-200 cursor-default select-none"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-[28px] border border-black/[0.08] shadow-2xl overflow-hidden font-sans text-[#1A1A1A]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A7F5] text-[#3B0764] flex items-center justify-center font-bold shadow-2xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2">
                <span>Top Up Calling Minutes</span>
                <span className="text-[11px] font-bold bg-[#FAF0D7] text-[#78350F] px-2.5 py-0.5 rounded-full">
                  {currentCredits.toFixed(1)} Min Remaining
                </span>
              </h3>
              <p className="text-xs text-black/50 mt-0.5">
                Pay per actual connected minute. Unused minutes never expire.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {success ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#E8F5EF] text-[#16856B] flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h4 className="text-base font-bold text-[#1A1A1A]">Minutes Added Successfully</h4>
              <p className="text-xs text-black/50">Your account balance has been recharged.</p>
            </div>
          ) : (
            <>
              {/* Pack Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {creditPacks.map((pack) => {
                  const isSelected = selectedPack === pack.id;
                  return (
                    <div
                      key={pack.id}
                      onClick={() => setSelectedPack(pack.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative ${
                        isSelected
                          ? "border-black/30 bg-[#FBF7ED] shadow-2xs ring-1 ring-black/5"
                          : "border-black/[0.06] hover:border-black/20 bg-white"
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2.5 right-3 text-[10px] font-bold bg-[#111111] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                          Most Popular
                        </span>
                      )}

                      <div>
                        <h4 className="font-bold text-sm text-[#1A1A1A]">{pack.title}</h4>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-2xl font-bold text-[#1A1A1A]">
                            ₹{pack.priceInr.toLocaleString()}
                          </span>
                          <span className="text-xs text-black/45">+ GST</span>
                        </div>
                        <p className="text-xs font-semibold text-[#16856B] mt-0.5">
                          {pack.minutes.toLocaleString()} minutes (₹{pack.ratePerMin}/min)
                        </p>
                      </div>

                      <p className="text-[11px] text-black/55 leading-relaxed">
                        {pack.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Security Note & Payment Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-black/[0.06]">
                <div className="flex items-center gap-2 text-xs text-black/50">
                  <ShieldCheck className="w-4 h-4 text-[#16856B]" />
                  <span>Secure 256-bit encrypted checkout with Razorpay &amp; GST Invoicing</span>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-black/60 hover:text-black border border-black/[0.08] bg-white hover:bg-[#FAF3E4] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRecharge}
                    disabled={isProcessing}
                    className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-black shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{isProcessing ? "Processing..." : "Proceed to Pay"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
