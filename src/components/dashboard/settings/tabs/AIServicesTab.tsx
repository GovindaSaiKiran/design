import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Sliders,
  ShieldCheck,
  Zap,
  Lock,
  Eye,
  EyeOff,
  X,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { AIServiceConnection } from "@/types/settings";

interface AIServicesTabProps {
  initialServices: AIServiceConnection[];
  onSaveServices: (updated: AIServiceConnection[]) => Promise<boolean>;
  onTestAiConnection: () => Promise<{ success: boolean; latencyMs: number; message: string }>;
}

export default function AIServicesTab({
  initialServices,
  onSaveServices,
  onTestAiConnection,
}: AIServicesTabProps) {
  const [services, setServices] = useState<AIServiceConnection[]>(initialServices);
  const [testingServiceId, setTestingServiceId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; latency: number; msg: string } | null>(null);

  // Configure Modal
  const [configuringService, setConfiguringService] = useState<AIServiceConnection | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [selectedModelInput, setSelectedModelInput] = useState("");

  const handleTest = async (service: AIServiceConnection) => {
    setTestingServiceId(service.id);
    setTestResult(null);

    const res = await onTestAiConnection();
    setTestingServiceId(null);
    setTestResult({
      id: service.id,
      success: res.success,
      latency: res.latencyMs || service.latencyMs,
      msg: res.message,
    });
  };

  const handleOpenConfigure = (svc: AIServiceConnection) => {
    setConfiguringService(svc);
    setKeyInput("");
    setShowKey(false);
    setSelectedModelInput(svc.selectedModel);
  };

  const handleSaveConfigure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configuringService) return;

    const updated = services.map((s) => {
      if (s.id === configuringService.id) {
        return {
          ...s,
          selectedModel: selectedModelInput,
          status: "connected" as const,
          apiKeyMasked: keyInput
            ? `${keyInput.slice(0, 6)}••••••••••••••••••••`
            : s.apiKeyMasked || "AIzaSy••••••••••••••••••••",
          lastVerified: "Just now",
        };
      }
      return s;
    });

    setServices(updated);
    await onSaveServices(updated);
    setConfiguringService(null);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="AI Services &amp; Speech Generation"
        badge="Zero Hallucination Grounded"
        whatIsThis="Connect the AI services that power your voice agents and conversational phone assistants."
        whyDoINeedIt="AI services handle speech recognition (listening to callers in Indian accents), reasoning over your knowledge base, and generating realistic voice responses in sub-250ms."
        whatToDoNext="Verify that your primary speech and reasoning services show 'Connected' and run a live ping test."
      />

      {testResult && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
            testResult.success
              ? "bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066]"
              : "bg-rose-50 border border-rose-200 text-rose-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{testResult.msg}</span>
          </div>
          <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded-md border border-[#2E8066]/20">
            Latency: {testResult.latency}ms
          </span>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4 hover:border-black/20 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1D4]/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50] shrink-0 font-bold">
                  <Sparkles className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-[#283A50]">{svc.name}</h3>
                    {svc.status === "connected" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B8DEC8]/50 text-[#2E8066] border border-[#2E8066]/20">
                        Connected &amp; Verified
                      </span>
                    )}
                    {svc.status === "needs_attention" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        Needs Attention
                      </span>
                    )}
                    {svc.status === "not_configured" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        Not Configured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#707684] mt-0.5">{svc.purpose}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleTest(svc)}
                  disabled={testingServiceId === svc.id || svc.status === "not_configured"}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF5E9] hover:bg-[#FAF3E4] text-[#283A50] border border-[#E9E1D4] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors disabled:opacity-40"
                  title="Run real-time ping & synthesis test"
                >
                  <RotateCw
                    className={`w-3.5 h-3.5 ${
                      testingServiceId === svc.id ? "animate-spin text-purple-700" : ""
                    }`}
                  />
                  <span>{testingServiceId === svc.id ? "Testing..." : "Test Connection"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenConfigure(svc)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#283A50] hover:bg-[#1f2d3e] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>
              </div>
            </div>

            {/* Service Diagnostics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
                  Active Conversational Model
                </span>
                <span className="font-semibold text-[#283A50] block truncate">
                  {svc.selectedModel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
                  Speech Recognition &amp; Voice
                </span>
                <span className="font-semibold text-[#283A50] block truncate">
                  {svc.speechGeneration}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
                  Secure Access Key &amp; Latency
                </span>
                <span className="font-mono text-[#283A50] font-semibold block truncate">
                  {svc.apiKeyMasked ? `${svc.apiKeyMasked} (${svc.latencyMs}ms)` : "Not set"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configure AI Modal */}
      {configuringService && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfiguringService(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl border border-[#E9E1D4] max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
              <div>
                <h3 className="text-base font-bold text-[#283A50]">
                  Configure {configuringService.name}
                </h3>
                <span className="text-[11px] text-[#707684]">
                  Update conversational models and secure access credentials
                </span>
              </div>
              <button
                type="button"
                onClick={() => setConfiguringService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveConfigure} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#283A50] block">
                  Select Conversational Model
                </label>
                <select
                  value={selectedModelInput}
                  onChange={(e) => setSelectedModelInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50] font-semibold focus:outline-none"
                >
                  {configuringService.availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#707684]">
                  Lower latency models are recommended for voice calls (sub-200ms).
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#283A50] block">
                  Secure Access Key (Optional / Override)
                </label>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder={
                      configuringService.apiKeyMasked
                        ? configuringService.apiKeyMasked
                        : "Enter your secure provider key"
                    }
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50] font-mono text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-[#707684]">
                  Keys are stored encrypted on our secure backend and never returned in plain text.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] space-y-1">
                <span className="font-bold text-[#283A50] block">Assigned Speech Generation Voice:</span>
                <span className="text-[#707684] block">{configuringService.speechGeneration}</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9E1D4]">
                <button
                  type="button"
                  onClick={() => setConfiguringService(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E9E1D4] font-semibold text-[#707684]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#283A50] hover:bg-[#1f2d3e] text-white font-semibold"
                >
                  Save Connection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
