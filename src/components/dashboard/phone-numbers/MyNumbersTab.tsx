"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Settings2,
  Trash2,
  Bot,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Radio,
  X,
  Search,
  Check,
  ChevronRight,
  Info,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { OwnedWorkspaceNumber, PhoneNumberStatus } from "@/types/phoneNumbers";

interface MyNumbersTabProps {
  numbers: OwnedWorkspaceNumber[];
  availableAgents: Array<{ id: string; name: string; role: string }>;
  onUpdateRouting: (params: {
    numberId: string;
    label?: string;
    assignedAgentId?: string;
    assignedAgentName?: string;
    inboundEnabled?: boolean;
    outboundEnabled?: boolean;
    isDefaultCallerId?: boolean;
  }) => Promise<boolean>;
  onReleaseNumber: (numberId: string) => Promise<boolean>;
  onTestNumber: (number: OwnedWorkspaceNumber) => Promise<{ success: boolean; latencyMs?: number; message: string }>;
  onNavigateToBuy: () => void;
}

export default function MyNumbersTab({
  numbers,
  availableAgents,
  onUpdateRouting,
  onReleaseNumber,
  onTestNumber,
  onNavigateToBuy,
}: MyNumbersTabProps) {
  const [selectedNumber, setSelectedNumber] = useState<OwnedWorkspaceNumber | null>(null);
  const [releaseTarget, setReleaseTarget] = useState<OwnedWorkspaceNumber | null>(null);
  const [isReleasing, setIsReleasing] = useState(false);
  const [testResult, setTestResult] = useState<{ numberId: string; message: string; success: boolean } | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Edit Drawer Form state
  const [drawerLabel, setDrawerLabel] = useState("");
  const [drawerAgentId, setDrawerAgentId] = useState("");
  const [drawerInbound, setDrawerInbound] = useState(true);
  const [drawerOutbound, setDrawerOutbound] = useState(true);
  const [drawerIsDefault, setDrawerIsDefault] = useState(false);

  const openDrawer = (num: OwnedWorkspaceNumber) => {
    setSelectedNumber(num);
    setDrawerLabel(num.label);
    setDrawerAgentId(num.assignedAgentId);
    setDrawerInbound(num.inboundEnabled);
    setDrawerOutbound(num.outboundEnabled);
    setDrawerIsDefault(num.isDefaultCallerId);
    setTestResult(null);
  };

  const closeDrawer = () => {
    setSelectedNumber(null);
    setTestResult(null);
  };

  const handleSaveDrawer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNumber || isUpdating) return;
    setIsUpdating(true);

    const agentObj = availableAgents.find((a) => a.id === drawerAgentId);
    const ok = await onUpdateRouting({
      numberId: selectedNumber.id,
      label: drawerLabel.trim() || selectedNumber.label,
      assignedAgentId: drawerAgentId,
      assignedAgentName: agentObj?.name || selectedNumber.assignedAgentName,
      inboundEnabled: drawerInbound,
      outboundEnabled: drawerOutbound,
      isDefaultCallerId: drawerIsDefault,
    });

    setIsUpdating(false);
    if (ok) {
      closeDrawer();
    }
  };

  const handleRunDiagnostic = async (num: OwnedWorkspaceNumber) => {
    setTestResult(null);
    const res = await onTestNumber(num);
    setTestResult({
      numberId: num.id,
      message: res.message,
      success: res.success,
    });
  };

  const handleConfirmRelease = async () => {
    if (!releaseTarget || isReleasing) return;
    setIsReleasing(true);
    const ok = await onReleaseNumber(releaseTarget.id);
    setIsReleasing(false);
    if (ok) {
      if (selectedNumber?.id === releaseTarget.id) {
        closeDrawer();
      }
      setReleaseTarget(null);
    }
  };

  const filtered = numbers.filter((n) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      n.phoneNumber.toLowerCase().includes(q) ||
      n.label.toLowerCase().includes(q) ||
      n.region.toLowerCase().includes(q) ||
      n.assignedAgentName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="bg-white rounded-3xl border border-[#E9E1D4] p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search numbers, labels, agents..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-2xl text-xs text-[#283A50] placeholder:text-slate-400 focus:outline-hidden focus:border-[#283A50] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs text-[#707684]">
            {filtered.length} of {numbers.length} Active Lines
          </span>
          <button
            onClick={onNavigateToBuy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#283A50] text-white hover:bg-black transition-all cursor-pointer shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Buy a Number</span>
          </button>
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="bg-white rounded-3xl border border-[#E9E1D4] overflow-hidden shadow-xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] mx-auto flex items-center justify-center text-[#707684]">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#283A50]">
                {numbers.length === 0
                  ? "No phone numbers in your workspace yet"
                  : "No numbers matched your search"}
              </h3>
              <p className="text-xs text-[#707684] max-w-md mx-auto mt-1">
                {numbers.length === 0
                  ? "Rent your first business phone number to start routing inbound calls directly to your AI workforce."
                  : "Try clearing your search query to see all active workspace phone numbers."}
              </p>
            </div>
            {numbers.length === 0 && (
              <button
                onClick={onNavigateToBuy}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#283A50] text-white hover:bg-black transition-all cursor-pointer shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Explore Available Numbers</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E9E1D4] bg-[#FAF5E9]/50 text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                  <th className="py-3 px-5">Phone Number &amp; Label</th>
                  <th className="py-3 px-5">Assigned AI Agent</th>
                  <th className="py-3 px-5">Call Routing</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Monthly Cost</th>
                  <th className="py-3 px-5">Renewal</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E1D4]">
                {filtered.map((num) => {
                  return (
                    <tr
                      key={num.id}
                      className="hover:bg-[#FAF5E9]/30 transition-colors group cursor-pointer"
                      onClick={() => openDrawer(num)}
                    >
                      {/* Phone Number & Label */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{num.flagEmoji}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-[#283A50]">
                                {num.phoneNumber}
                              </span>
                              {num.isDefaultCallerId && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#B8DEC8]/60 text-[#165B4C] border border-[#2E8066]/30">
                                  Default Caller ID
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] font-medium text-[#707684] mt-0.5">
                              {num.label} · <span className="text-[10px]">{num.region} ({num.type})</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Assigned AI Agent */}
                      <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] text-[#283A50] font-medium">
                          <Bot className="w-3.5 h-3.5 text-[#C4A5E8]" />
                          <span>{num.assignedAgentName}</span>
                        </div>
                      </td>

                      {/* Call Routing Toggles */}
                      <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold border ${
                              num.inboundEnabled
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-slate-50 text-slate-400 border-slate-200 line-through"
                            }`}
                          >
                            <PhoneIncoming className="w-3 h-3" />
                            Inbound
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold border ${
                              num.outboundEnabled
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-slate-50 text-slate-400 border-slate-200 line-through"
                            }`}
                          >
                            <PhoneOutgoing className="w-3 h-3" />
                            Outbound
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                            num.status === "Active"
                              ? "bg-[#B8DEC8]/40 text-[#165B4C] border-[#2E8066]/30"
                              : num.status === "Pending Setup"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-rose-50 text-rose-800 border-rose-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              num.status === "Active" ? "bg-[#2E8066]" : "bg-amber-500"
                            }`}
                          />
                          {num.status}
                        </span>
                      </td>

                      {/* Monthly Rental */}
                      <td className="py-4 px-5">
                        <div className="font-mono font-bold text-xs text-[#283A50]">
                          {num.currency === "INR" ? "₹" : "$"}
                          {num.monthlyPrice.toLocaleString()}
                          <span className="font-sans text-[10px] font-normal text-[#707684]">
                            /mo
                          </span>
                        </div>
                        <div className="text-[10px] text-[#707684]">
                          {num.callsToday} calls today
                        </div>
                      </td>

                      {/* Renewal */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1 text-[11px] text-[#283A50]">
                          <Clock className="w-3 h-3 text-[#707684]" />
                          <span>{num.renewalDate}</span>
                        </div>
                        <div className="text-[10px] text-[#2E8066] font-medium">Auto-renew active</div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openDrawer(num)}
                            className="p-1.5 rounded-xl border border-[#E9E1D4] bg-[#FAF5E9]/50 hover:bg-[#FAF5E9] text-[#283A50] transition-colors cursor-pointer"
                            title="Manage Routing & Details"
                          >
                            <Settings2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setReleaseTarget(num)}
                            className="p-1.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                            title="Release Number"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Side Drawer: Number Details & Routing */}
      {selectedNumber && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget && !isUpdating) closeDrawer();
          }}
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white border-l border-[#E9E1D4] w-full max-w-lg h-full overflow-y-auto p-6 sm:p-7 shadow-2xl space-y-6 text-xs text-[#283A50] font-sans animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E9E1D4]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base">{selectedNumber.flagEmoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                    Number Configuration &amp; Routing
                  </span>
                </div>
                <h3 className="text-lg font-bold font-mono text-[#283A50] mt-1">
                  {selectedNumber.phoneNumber}
                </h3>
                <p className="text-[11px] text-[#707684]">
                  {selectedNumber.region} · {selectedNumber.type} · Provider: {selectedNumber.provider}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                disabled={isUpdating}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Test Line Diagnostic Banner */}
            {testResult && (
              <div
                className={`p-3.5 rounded-2xl border flex items-center gap-2.5 text-xs ${
                  testResult.success
                    ? "bg-[#B8DEC8]/40 border-[#2E8066]/30 text-[#165B4C]"
                    : "bg-rose-50 border-rose-200 text-rose-700"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="font-medium">{testResult.message}</span>
              </div>
            )}

            {/* Drawer Edit Form */}
            <form onSubmit={handleSaveDrawer} className="space-y-6">
              {/* Section 1: Label & Identity */}
              <div className="space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                  Helpline Label
                </label>
                <input
                  type="text"
                  value={drawerLabel}
                  onChange={(e) => setDrawerLabel(e.target.value)}
                  placeholder="e.g. Main Campus Admissions Hotline"
                  className="w-full px-3.5 py-2.5 bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-2xl text-xs text-[#283A50] focus:outline-hidden focus:border-[#283A50] focus:bg-white transition-all"
                />
                <p className="text-[10px] text-[#707684]">
                  An internal friendly reference to identify this number in call logs and analytics.
                </p>
              </div>

              {/* Section 2: AI Agent Assignment */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                    Assigned Swaram AI Agent
                  </label>
                  <span className="text-[10px] text-[#2E8066] font-semibold">
                    Instant SIP Routing
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {availableAgents.map((ag) => {
                    const isSelected = drawerAgentId === ag.id;
                    return (
                      <button
                        type="button"
                        key={ag.id}
                        onClick={() => setDrawerAgentId(ag.id)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FAF5E9] border-[#283A50] shadow-xs"
                            : "bg-white border-[#E9E1D4] hover:bg-[#FAF5E9]/30"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-white border border-[#E9E1D4] flex items-center justify-center text-[#283A50]">
                            <Bot className="w-4 h-4 text-[#C4A5E8]" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#283A50]">{ag.name}</div>
                            <div className="text-[10px] text-[#707684]">{ag.role}</div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#283A50] text-white flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Inbound / Outbound Permission Toggles */}
              <div className="space-y-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                  Call Permissions &amp; Channel Rules
                </label>
                <div className="space-y-2">
                  {/* Inbound Toggle */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF5E9]/50 border border-[#E9E1D4] cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <PhoneIncoming className="w-4 h-4 text-[#2E8066]" />
                      <div>
                        <div className="font-bold text-xs text-[#283A50]">Allow Inbound Calls</div>
                        <div className="text-[10px] text-[#707684]">
                          Inbound callers will be directly routed to the assigned AI agent.
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={drawerInbound}
                      onChange={(e) => setDrawerInbound(e.target.checked)}
                      className="w-4 h-4 rounded text-[#283A50] focus:ring-0 cursor-pointer accent-[#283A50]"
                    />
                  </label>

                  {/* Outbound Toggle */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF5E9]/50 border border-[#E9E1D4] cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <PhoneOutgoing className="w-4 h-4 text-[#283A50]" />
                      <div>
                        <div className="font-bold text-xs text-[#283A50]">Allow Outbound Calling</div>
                        <div className="text-[10px] text-[#707684]">
                          Permit automated campaigns and scheduled outreach using this line.
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={drawerOutbound}
                      onChange={(e) => setDrawerOutbound(e.target.checked)}
                      className="w-4 h-4 rounded text-[#283A50] focus:ring-0 cursor-pointer accent-[#283A50]"
                    />
                  </label>

                  {/* Default Caller ID Toggle */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF5E9]/50 border border-[#E9E1D4] cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Radio className="w-4 h-4 text-[#C4A5E8]" />
                      <div>
                        <div className="font-bold text-xs text-[#283A50]">Primary Outbound Caller ID</div>
                        <div className="text-[10px] text-[#707684]">
                          Display this phone number as caller ID for outbound outreach campaigns.
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={drawerIsDefault}
                      onChange={(e) => setDrawerIsDefault(e.target.checked)}
                      className="w-4 h-4 rounded text-[#283A50] focus:ring-0 cursor-pointer accent-[#283A50]"
                    />
                  </label>
                </div>
              </div>

              {/* Section 4: Carrier Line Diagnostics */}
              <div className="p-4 rounded-2xl bg-white border border-[#E9E1D4] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-[#283A50]">Carrier Route Diagnostic</div>
                  <button
                    type="button"
                    onClick={() => handleRunDiagnostic(selectedNumber)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 border border-[#E9E1D4] text-[#283A50] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Ping Route</span>
                  </button>
                </div>
                <p className="text-[10px] text-[#707684]">
                  Verifies SIP signalling between the carrier trunk and Swaram's AI voice engine. Last verified latency: {selectedNumber.lastLatencyMs}ms.
                </p>
              </div>

              {/* Section 5: Subscription & Billing Summary */}
              <div className="p-4 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#707684]">Monthly Rental Fee</span>
                  <span className="font-mono font-bold text-[#283A50]">
                    {selectedNumber.currency === "INR" ? "₹" : "$"}
                    {selectedNumber.monthlyPrice.toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">Next Renewal Date</span>
                  <span className="font-medium text-[#283A50]">{selectedNumber.renewalDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">Activation Date</span>
                  <span className="font-medium text-[#283A50]">{selectedNumber.activatedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707684]">Talk-time Consumed (Month)</span>
                  <span className="font-medium text-[#283A50]">{selectedNumber.totalMinutesUsed} mins</span>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E9E1D4]">
                <button
                  type="button"
                  onClick={() => setReleaseTarget(selectedNumber)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Release Number</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeDrawer}
                    disabled={isUpdating}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#707684] hover:text-[#283A50] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#283A50] hover:bg-black text-white transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save Configuration"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Release Confirmation Dialog */}
      {releaseTarget && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget && !isReleasing) setReleaseTarget(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-3xl border border-[#E9E1D4] max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4 text-xs text-[#283A50] font-sans">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E9E1D4]">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                  Release Phone Number
                </span>
                <h3 className="text-base font-bold font-mono text-[#283A50] mt-0.5">
                  {releaseTarget.phoneNumber}
                </h3>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1.5 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 text-xs text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                Permanent Telecommunications Release
              </div>
              <p className="text-[11px]">
                Releasing this phone number will immediately disconnect incoming calls to{" "}
                <span className="font-semibold text-black">{releaseTarget.assignedAgentName}</span>.
                The number will be returned to the carrier pool and <span className="font-semibold">may not be recoverable</span> if re-requested later.
              </p>
            </div>

            <p className="text-[#707684] text-[11px]">
              Active billing for this number will terminate at the end of the current billing cycle on{" "}
              <span className="font-semibold text-[#283A50]">{releaseTarget.renewalDate}</span>.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E9E1D4]">
              <button
                type="button"
                onClick={() => setReleaseTarget(null)}
                disabled={isReleasing}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#707684] hover:text-[#283A50] transition-colors cursor-pointer"
              >
                Keep Number
              </button>
              <button
                type="button"
                onClick={handleConfirmRelease}
                disabled={isReleasing}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-rose-700 hover:bg-rose-800 text-white transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isReleasing ? "Releasing..." : "Confirm & Release"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
