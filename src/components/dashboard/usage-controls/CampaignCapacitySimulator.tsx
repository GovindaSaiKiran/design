"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Users,
  Sliders,
  PhoneCall,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Bot,
  Zap,
  Info,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { WorkspaceCapacity } from "@/types/usageControls";

interface CampaignCapacitySimulatorProps {
  capacity: WorkspaceCapacity;
  availableAgents: Array<{ id: string; name: string }>;
}

const PRESET_CONTACT_COUNTS = [250, 500, 1000, 2500, 5000];

export default function CampaignCapacitySimulator({
  capacity,
  availableAgents,
}: CampaignCapacitySimulatorProps) {
  const [contacts, setContacts] = useState<number>(1000);
  const [answerRate, setAnswerRate] = useState<number>(65); // 65%
  const [avgAnsweredDuration, setAvgAnsweredDuration] = useState<number>(1.8); // 1.8 mins
  const [unansweredDurationSec, setUnansweredDurationSec] = useState<number>(12); // 12 seconds carrier connect
  const [attempts, setAttempts] = useState<number>(1);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(availableAgents[0]?.id || "agent-maya");

  const resetToDefaults = () => {
    setContacts(1000);
    setAnswerRate(65);
    setAvgAnsweredDuration(1.8);
    setUnansweredDurationSec(12);
    setAttempts(1);
    setSelectedAgentId(availableAgents[0]?.id || "agent-maya");
  };

  // Calculations
  const simulation = useMemo(() => {
    const totalAttemptInstances = contacts * attempts;

    // Typical scenario
    const typicalAnsweredCount = Math.round(totalAttemptInstances * (answerRate / 100));
    const typicalUnansweredCount = totalAttemptInstances - typicalAnsweredCount;
    const typicalAnsweredMinutes = typicalAnsweredCount * avgAnsweredDuration;
    const typicalUnansweredMinutes = typicalUnansweredCount * (unansweredDurationSec / 60);
    const typicalTotalMinutes = Math.round(typicalAnsweredMinutes + typicalUnansweredMinutes);

    // Conservative scenario (higher answer rate + longer calls)
    const conservativeAnswerRate = Math.min(95, answerRate + 15);
    const conservativeDuration = avgAnsweredDuration * 1.2;
    const conservativeAnsweredCount = Math.round(totalAttemptInstances * (conservativeAnswerRate / 100));
    const conservativeUnansweredCount = totalAttemptInstances - conservativeAnsweredCount;
    const conservativeAnsweredMinutes = conservativeAnsweredCount * conservativeDuration;
    const conservativeUnansweredMinutes = conservativeUnansweredCount * ((unansweredDurationSec + 6) / 60);
    const conservativeTotalMinutes = Math.round(conservativeAnsweredMinutes + conservativeUnansweredMinutes);

    // Surplus or Deficit
    const available = capacity.remainingMinutes;
    const typicalBalanceDiff = available - typicalTotalMinutes;
    const conservativeBalanceDiff = available - conservativeTotalMinutes;

    // Cost calculations if deficit
    const typicalDeficit = typicalBalanceDiff < 0 ? Math.abs(typicalBalanceDiff) : 0;
    const conservativeDeficit = conservativeBalanceDiff < 0 ? Math.abs(conservativeBalanceDiff) : 0;

    const typicalCost = Math.round(typicalDeficit * capacity.overageRatePerMinute);
    const conservativeCost = Math.round(conservativeDeficit * capacity.overageRatePerMinute);

    const formatHM = (mins: number) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h}h ${m}m`;
    };

    return {
      typicalTotalMinutes,
      typicalHM: formatHM(typicalTotalMinutes),
      typicalAnsweredCount,
      typicalUnansweredCount,
      typicalBalanceDiff,
      typicalDeficit,
      typicalCost,
      conservativeTotalMinutes,
      conservativeHM: formatHM(conservativeTotalMinutes),
      conservativeBalanceDiff,
      conservativeDeficit,
      conservativeCost,
      status:
        typicalBalanceDiff >= 0
          ? "sufficient"
          : conservativeBalanceDiff < 0
          ? "deficit"
          : "tight",
    };
  }, [
    contacts,
    answerRate,
    avgAnsweredDuration,
    unansweredDurationSec,
    attempts,
    capacity.remainingMinutes,
    capacity.overageRatePerMinute,
  ]);

  const currencySymbol = capacity.currency === "INR" ? "₹" : "$";
  const selectedAgent = availableAgents.find((a) => a.id === selectedAgentId);

  return (
    <div className="bg-white rounded-3xl border border-[#E9E1D4] p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
              <Calculator className="w-4 h-4 text-[#C4A5E8]" />
            </span>
            <h3 className="text-base font-bold text-[#283A50]">
              Campaign Capacity &amp; Cost Simulator
            </h3>
          </div>
          <p className="text-xs text-[#707684] mt-1 max-w-xl">
            Forecast exact minute consumption and budget requirements before launching an outbound dialer campaign.
          </p>
        </div>

        <button
          onClick={resetToDefaults}
          className="self-start md:self-auto text-xs font-semibold text-[#283A50] hover:text-[#2E8066] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* Simulator Body: Dual Column (Controls on Left, Dual Scenario Forecast on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Interactive Input Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Parameter 1: Number of Contacts */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#283A50] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#707684]" />
                Target Audience Contacts
              </label>
              <span className="font-mono font-bold text-sm text-[#283A50] bg-[#FAF5E9] px-2.5 py-0.5 rounded-lg border border-[#E9E1D4]">
                {contacts.toLocaleString()} contacts
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex items-center gap-2">
              {PRESET_CONTACT_COUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setContacts(preset)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    contacts === preset
                      ? "bg-[#283A50] text-white border-[#283A50] shadow-xs"
                      : "bg-[#FAF5E9]/50 text-[#707684] border-[#E9E1D4] hover:bg-[#FAF5E9]"
                  }`}
                >
                  {preset.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Slider */}
            <input
              type="range"
              min={100}
              max={10000}
              step={50}
              value={contacts}
              onChange={(e) => setContacts(Number(e.target.value))}
              className="w-full h-2 bg-[#FAF5E9] rounded-lg appearance-none cursor-pointer accent-[#283A50]"
            />
          </div>

          {/* Parameter 2: Expected Answer Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#283A50] flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#2E8066]" />
                Expected Caller Answer Rate
              </label>
              <span className="font-mono font-bold text-xs text-[#283A50] bg-[#FAF5E9] px-2.5 py-0.5 rounded-lg border border-[#E9E1D4]">
                {answerRate}% pickup
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={95}
              step={5}
              value={answerRate}
              onChange={(e) => setAnswerRate(Number(e.target.value))}
              className="w-full h-2 bg-[#FAF5E9] rounded-lg appearance-none cursor-pointer accent-[#283A50]"
            />
            <div className="flex justify-between text-[10px] text-[#707684]">
              <span>Cold outreach (35-45%)</span>
              <span>Engaged Leads (60-75%)</span>
              <span>High-Intent (80-90%)</span>
            </div>
          </div>

          {/* Parameter 3: Average Call Duration & Unanswered Ring Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#283A50]">
                  Avg Answered Length
                </label>
                <span className="font-mono font-bold text-xs text-[#283A50]">
                  {avgAnsweredDuration.toFixed(1)} min
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5.0}
                step={0.1}
                value={avgAnsweredDuration}
                onChange={(e) => setAvgAnsweredDuration(Number(e.target.value))}
                className="w-full h-2 bg-[#FAF5E9] rounded-lg appearance-none cursor-pointer accent-[#283A50]"
              />
              <p className="text-[10px] text-[#707684]">
                Typical counseling: 1.8 to 2.5 min
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#283A50]">
                  Unanswered Ring Time
                </label>
                <span className="font-mono font-bold text-xs text-[#283A50]">
                  {unansweredDurationSec}s ({((unansweredDurationSec / 60)).toFixed(2)}m)
                </span>
              </div>
              <input
                type="range"
                min={6}
                max={30}
                step={2}
                value={unansweredDurationSec}
                onChange={(e) => setUnansweredDurationSec(Number(e.target.value))}
                className="w-full h-2 bg-[#FAF5E9] rounded-lg appearance-none cursor-pointer accent-[#283A50]"
              />
              <p className="text-[10px] text-[#707684]">
                Carrier network ring cutoff
              </p>
            </div>
          </div>

          {/* Parameter 4: Planned Attempts & Agent Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#283A50]">
                Max Callback Retries
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAttempts(num)}
                    className={`py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      attempts === num
                        ? "bg-[#283A50] text-white border-[#283A50]"
                        : "bg-white text-[#707684] border-[#E9E1D4] hover:bg-[#FAF5E9]"
                    }`}
                  >
                    {num} {num === 1 ? "Attempt" : "Attempts"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#283A50]">
                Assigned AI Agent
              </label>
              <select
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-[#E9E1D4] bg-[#FAF5E9]/50 text-xs text-[#283A50] font-medium focus:outline-hidden focus:border-[#283A50] focus:bg-white transition-all cursor-pointer"
              >
                {availableAgents.map((ag) => (
                  <option key={ag.id} value={ag.id}>
                    {ag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Dual Scenario Output Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Output Card 1: Typical Scenario (Primary) */}
          <div className="p-5 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#283A50] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C4A5E8]" />
                Typical Forecast
              </span>
              <span className="text-xs font-medium text-[#707684]">
                Based on {answerRate}% pickup
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold font-mono text-[#283A50]">
                {simulation.typicalTotalMinutes.toLocaleString()} min
              </span>
              <span className="text-xs text-[#707684] font-medium">
                ~{simulation.typicalHM}
              </span>
            </div>

            {/* Capacity Fit Indicator */}
            <div className="p-3 rounded-xl bg-white border border-[#E9E1D4] text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#707684]">Current Allowance:</span>
                <span className="font-mono font-bold text-[#283A50]">
                  {capacity.remainingMinutes.toLocaleString()} min
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#707684]">Post-Campaign Balance:</span>
                <span
                  className={`font-mono font-bold ${
                    simulation.typicalBalanceDiff >= 0
                      ? "text-[#2E8066]"
                      : "text-rose-700"
                  }`}
                >
                  {simulation.typicalBalanceDiff >= 0
                    ? `+${simulation.typicalBalanceDiff.toLocaleString()} min (Surplus)`
                    : `-${simulation.typicalDeficit.toLocaleString()} min (Deficit)`}
                </span>
              </div>
              {simulation.typicalDeficit > 0 && (
                <div className="flex items-center justify-between pt-1 border-t border-[#E9E1D4] text-[11px]">
                  <span className="text-[#707684]">Estimated Overage Cost:</span>
                  <span className="font-mono font-bold text-rose-700">
                    {currencySymbol}{simulation.typicalCost.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Output Card 2: Conservative Scenario (Stress Test) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E1D4] space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#707684]">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Conservative Stress Test (+15% pickup, +20% length)
              </span>
              <span className="font-mono font-bold text-[#283A50]">
                {simulation.conservativeTotalMinutes.toLocaleString()} min
              </span>
            </div>
            <p className="text-[11px] text-[#707684] leading-relaxed">
              If candidate engagement spikes, usage could reach {simulation.conservativeTotalMinutes.toLocaleString()} mins (~{simulation.conservativeHM}).
              {simulation.conservativeBalanceDiff >= 0 ? (
                <span className="text-[#2E8066] font-medium ml-1">
                  Your current allowance still comfortably covers this scenario.
                </span>
              ) : (
                <span className="text-amber-800 font-medium ml-1">
                  Would require {simulation.conservativeDeficit.toLocaleString()} mins top-up ({currencySymbol}{simulation.conservativeCost}).
                </span>
              )}
            </p>
          </div>

          {/* Carry to Outbound Scheduler Action */}
          <Link
            href={`/dashboard/outbound-scheduler?simContacts=${contacts}&simAgent=${selectedAgentId}&simDuration=${avgAnsweredDuration}`}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#283A50] hover:bg-black text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.01]"
          >
            <span>Open in Outbound Campaign Scheduler</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Strict Simulation Disclaimer */}
          <div className="flex items-start gap-2 text-[10px] text-[#707684] leading-tight px-1">
            <Info className="w-3 h-3 text-[#707684] shrink-0 mt-0.5" />
            <span>
              Forecasts are planning estimates only. Actual billing depends on real-world caller pickups and carrier connect seconds. No credits are deducted by this simulator.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
