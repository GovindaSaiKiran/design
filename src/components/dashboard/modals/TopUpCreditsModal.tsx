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
    description: "Best for active admissions and daily outbound sales teams.",
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
    description: "Maximum efficiency for large universities and call centers.",
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
  currentCredits = 50.0,
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
    }, 1200);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200 cursor-default"
    >
      <div className="relative w-full max-w-2xl bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl overflow-hidden font-sans text-white">
        {/* Header */}
        <div className="bg-[#121215] px-6 py-5 border-b border-[#27272A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[2px] bg-white text-black flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 fill-black" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <span>Top Up Calling Credits</span>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-[#18181B] text-zinc-300 px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                  {currentCredits} Credits Remaining
                </span>
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-0.5 font-mono">
                Pure pay-per-minute model. Unused minutes never expire.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-[2px] text-[#71717A] hover:text-white hover:bg-[#18181B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {success ? (
            <div className="py-12 text-center space-y-3 font-mono">
              <div className="w-14 h-14 rounded-[2px] bg-white text-black flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wider">Credits Added Successfully</h4>
              <p className="text-xs text-[#A1A1AA]">Your account balance has been recharged.</p>
            </div>
          ) : (
            <>
              {/* Packs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {creditPacks.map((pack) => {
                  const isSelected = selectedPack === pack.id;
                  return (
                    <div
                      key={pack.id}
                      onClick={() => setSelectedPack(pack.id)}
                      className={`relative p-4 rounded-[2px] border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? "border-white bg-[#121215] shadow-sm"
                          : "border-[#27272A] hover:border-[#3F3F46] bg-[#000000]"
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2.5 right-3 bg-white text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded-[2px] uppercase tracking-wider">
                          Standard
                        </span>
                      )}

                      <div>
                        <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">{pack.title}</h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-xl font-extrabold font-mono text-white">
                            ₹{pack.priceInr.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-[#71717A] font-mono">+ GST</span>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-300 mt-0.5">
                          ₹{pack.ratePerMin} / connected min
                        </p>
                        <p className="text-[10px] text-[#71717A] mt-2 leading-relaxed font-sans">
                          {pack.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#27272A] space-y-1.5 font-mono">
                        {pack.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[10px] text-[#A1A1AA]">
                            <Check className="w-3 h-3 text-white shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary & Checkout CTA */}
              <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[2px] bg-[#000000] border border-[#27272A] flex items-center justify-center text-white">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Razorpay / UPI / NetBanking / Cards
                    </p>
                    <p className="text-[10px] text-[#71717A] font-sans">
                      Instant wallet activation with GST tax invoice generated automatically.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRecharge}
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-[2px] bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <span>Recharge Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#121215] border-t border-[#27272A] flex items-center justify-between text-[10px] text-[#71717A] font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>256-bit Encrypted Banking Gateway</span>
          </div>
          <span className="font-bold text-white uppercase tracking-wider">SWARAM TELEPHONY</span>
        </div>
      </div>
    </div>
  );
}
