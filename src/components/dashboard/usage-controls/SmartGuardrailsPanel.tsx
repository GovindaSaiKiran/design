"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Bell,
  Lock,
  PauseCircle,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
  Mail,
  Smartphone,
  Info,
  Clock,
  History,
} from "lucide-react";
import { UsageGuardrailsConfig } from "@/types/usageControls";

interface SmartGuardrailsPanelProps {
  guardrails: UsageGuardrailsConfig;
  onSaveGuardrails: (updated: Partial<UsageGuardrailsConfig>) => Promise<boolean>;
  currency?: string;
}

export default function SmartGuardrailsPanel({
  guardrails,
  onSaveGuardrails,
  currency = "INR",
}: SmartGuardrailsPanelProps) {
  const [thresholdPercent, setThresholdPercent] = useState(
    guardrails.lowAllowanceThresholdPercent
  );
  const [emailNotify, setEmailNotify] = useState(guardrails.lowAllowanceEmailNotify);
  const [inAppNotify, setInAppNotify] = useState(guardrails.lowAllowanceInAppNotify);

  const [spendingAlertEnabled, setSpendingAlertEnabled] = useState(
    guardrails.spendingAlertEnabled
  );
  const [spendingThreshold, setSpendingThreshold] = useState(
    guardrails.spendingAlertThreshold
  );

  const [hardCapEnabled, setHardCapEnabled] = useState(guardrails.enforcedHardCapEnabled);
  const [hardCapAmount, setHardCapAmount] = useState(guardrails.enforcedHardCapAmount);
  const [pausePolicy, setPausePolicy] = useState(guardrails.hardCapPolicy);

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessNotice, setSavedSuccessNotice] = useState(false);

  const currencySymbol = currency === "INR" ? "₹" : "$";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setSavedSuccessNotice(false);

    const ok = await onSaveGuardrails({
      lowAllowanceThresholdPercent: thresholdPercent,
      lowAllowanceEmailNotify: emailNotify,
      lowAllowanceInAppNotify: inAppNotify,
      spendingAlertEnabled,
      spendingAlertThreshold: spendingThreshold,
      enforcedHardCapEnabled: hardCapEnabled,
      enforcedHardCapAmount: hardCapAmount,
      hardCapPolicy: pausePolicy,
    });

    setIsSaving(false);
    if (ok) {
      setSavedSuccessNotice(true);
      setTimeout(() => setSavedSuccessNotice(false), 4000);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E9E1D4] p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
              <ShieldAlert className="w-4 h-4 text-[#2E8066]" />
            </span>
            <h3 className="text-base font-bold text-[#283A50]">
              Smart Usage Guardrails &amp; Spend Ceilings
            </h3>
          </div>
          <p className="text-xs text-[#707684] mt-1">
            Configure automated low-allowance warnings, overage spend alerts, and enterprise concurrency pause policies.
          </p>
        </div>

        {savedSuccessNotice && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8DEC8]/50 border border-[#2E8066]/30 text-[#165B4C] text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Guardrails Updated</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Guardrail 1: Low-Allowance Notification Alert */}
        <div className="p-5 rounded-2xl bg-[#FAF5E9]/50 border border-[#E9E1D4] space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                Alert 1 · Capacity Warning
              </span>
              <h4 className="text-sm font-bold text-[#283A50] flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#C4A5E8]" />
                Low-Allowance Notification Threshold
              </h4>
              <p className="text-xs text-[#707684]">
                Receive proactive notice before workspace calling minutes reach zero.
              </p>
            </div>
            <span className="text-xs font-bold font-mono text-[#283A50] bg-white px-3 py-1 rounded-xl border border-[#E9E1D4]">
              Trigger at {thresholdPercent}% used ({100 - thresholdPercent}% remaining)
            </span>
          </div>

          {/* Slider */}
          <div className="space-y-1.5">
            <input
              type="range"
              min={60}
              max={95}
              step={5}
              value={thresholdPercent}
              onChange={(e) => setThresholdPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#283A50]"
            />
            <div className="flex justify-between text-[10px] text-[#707684]">
              <span>60% Used (Early Warning)</span>
              <span>80% Used (Recommended)</span>
              <span>95% Used (Critical)</span>
            </div>
          </div>

          {/* Notification Channel Toggles */}
          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs text-[#283A50] cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={emailNotify}
                onChange={(e) => setEmailNotify(e.target.checked)}
                className="w-4 h-4 rounded text-[#283A50] accent-[#283A50]"
              />
              <Mail className="w-3.5 h-3.5 text-[#707684]" />
              <span>Email workspace administrators</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#283A50] cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={inAppNotify}
                onChange={(e) => setInAppNotify(e.target.checked)}
                className="w-4 h-4 rounded text-[#283A50] accent-[#283A50]"
              />
              <Bell className="w-3.5 h-3.5 text-[#707684]" />
              <span>In-app banner warning</span>
            </label>
          </div>
        </div>

        {/* Guardrail 2: Monthly Spending Alert (Informational Only) */}
        <div className="p-5 rounded-2xl bg-white border border-[#E9E1D4] space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                Alert 2 · Informational Budget Alert
              </span>
              <h4 className="text-sm font-bold text-[#283A50] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Monthly Spending Alert
              </h4>
              <p className="text-xs text-[#707684]">
                Get notified when overage costs exceed a chosen threshold.{" "}
                <span className="font-semibold text-[#283A50]">
                  This is strictly an informational alert; calls are never halted.
                </span>
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={spendingAlertEnabled}
                onChange={(e) => setSpendingAlertEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#283A50] accent-[#283A50]"
              />
              <span>Enabled</span>
            </label>
          </div>

          {spendingAlertEnabled && (
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-[#707684]">Notify me when unbilled overage exceeds:</span>
              <div className="relative w-40">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs text-[#707684]">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  min={500}
                  step={250}
                  value={spendingThreshold}
                  onChange={(e) => setSpendingThreshold(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-xl text-xs font-mono font-bold text-[#283A50] focus:outline-hidden focus:border-[#283A50] focus:bg-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Guardrail 3: Enforced Spending Ceiling & Safe Pause Policy */}
        <div className="p-5 rounded-2xl bg-[#FAF5E9]/30 border border-[#E9E1D4] space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E8066]">
                Enforced Safeguard · Hard Stop Ceiling
              </span>
              <h4 className="text-sm font-bold text-[#283A50] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#283A50]" />
                Enforced Maximum Spending Cap
              </h4>
              <p className="text-xs text-[#707684]">
                Establish a hard monetary ceiling per billing cycle to eliminate runaway dialing budget risk.
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={hardCapEnabled}
                onChange={(e) => setHardCapEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#283A50] accent-[#283A50]"
              />
              <span>Enforced</span>
            </label>
          </div>

          {hardCapEnabled && (
            <div className="space-y-4 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs text-[#283A50] font-medium">
                  Maximum overage ceiling per cycle:
                </span>
                <div className="relative w-44">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs text-[#707684]">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    min={1000}
                    step={500}
                    value={hardCapAmount}
                    onChange={(e) => setHardCapAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E9E1D4] rounded-xl text-xs font-mono font-bold text-[#283A50] focus:outline-hidden focus:border-[#283A50]"
                  />
                </div>
              </div>

              {/* Pause Policy Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                  Automated Enforcement Policy
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPausePolicy("pause_outbound_only")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      pausePolicy === "pause_outbound_only"
                        ? "bg-white border-[#283A50] shadow-xs"
                        : "bg-[#FAF5E9]/50 border-[#E9E1D4] hover:bg-white"
                    }`}
                  >
                    <div className="font-bold text-xs text-[#283A50]">
                      Pause Outbound Campaigns Only (Recommended)
                    </div>
                    <p className="text-[10px] text-[#707684] mt-1 leading-relaxed">
                      Halts new bulk outbound queue dispatches. Critical incoming calls to your admissions helpline continue uninterrupted.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPausePolicy("pause_all_campaigns")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      pausePolicy === "pause_all_campaigns"
                        ? "bg-white border-[#283A50] shadow-xs"
                        : "bg-[#FAF5E9]/50 border-[#E9E1D4] hover:bg-white"
                    }`}
                  >
                    <div className="font-bold text-xs text-[#283A50]">
                      Pause Outbound &amp; Switch Inbound to Voicemail
                    </div>
                    <p className="text-[10px] text-[#707684] mt-1 leading-relaxed">
                      Halts outbound calls and routes inbound callers to an automated audio voicemail transcription message.
                    </p>
                  </button>
                </div>
              </div>

              {/* Safe Concurrency & Graceful Drain Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed text-[11px]">
                  <span className="font-bold">Safe Concurrency Execution:</span> When the hard spend ceiling is reached, running calls are never abruptly cut off mid-sentence. Existing SIP sessions finish naturally and cleanly, while subsequent queued batches are held until approval or allowance reset.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Audit Trail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E9E1D4]">
          <div className="flex items-center gap-2 text-[11px] text-[#707684]">
            <History className="w-3.5 h-3.5" />
            <span>
              Last modified by <span className="font-semibold text-[#283A50]">{guardrails.lastUpdatedBy}</span> on {guardrails.lastUpdatedAt}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#283A50] hover:bg-black text-white transition-all cursor-pointer shadow-xs disabled:opacity-50 self-end sm:self-auto"
          >
            {isSaving ? "Saving Guardrails..." : "Save Guardrails & Policies"}
          </button>
        </div>
      </form>
    </div>
  );
}
