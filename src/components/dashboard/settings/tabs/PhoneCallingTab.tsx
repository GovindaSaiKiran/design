import React, { useState } from "react";
import {
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Radio,
  Server,
  Lock,
  PhoneForwarded,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { PhoneCallingConnection } from "@/types/settings";

interface PhoneCallingTabProps {
  initialPhoneCalling: PhoneCallingConnection;
  onSavePhoneCalling: (updated: PhoneCallingConnection) => Promise<boolean>;
  onTestPhoneConnection: () => Promise<{ success: boolean; message: string }>;
}

export default function PhoneCallingTab({
  initialPhoneCalling,
  onSavePhoneCalling,
  onTestPhoneConnection,
}: PhoneCallingTabProps) {
  const [phoneState, setPhoneState] = useState<PhoneCallingConnection>(initialPhoneCalling);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; msg: string } | null>(null);
  const [showAdvancedSip, setShowAdvancedSip] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await onTestPhoneConnection();
    setIsTesting(false);
    setTestResult({
      success: res.success,
      msg: res.message,
    });
  };

  const handleCallerIdSelect = async (num: string) => {
    const updatedNumbers = phoneState.phoneNumbers.map((n) => ({
      ...n,
      isDefaultCallerId: n.number === num,
    }));
    const updated = {
      ...phoneState,
      defaultCallerId: num,
      phoneNumbers: updatedNumbers,
    };
    setPhoneState(updated);
    await onSavePhoneCalling(updated);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2500);
  };

  const handleSrtpToggle = async () => {
    const updated = {
      ...phoneState,
      sipSettings: {
        ...phoneState.sipSettings,
        srtpEncryption: !phoneState.sipSettings.srtpEncryption,
      },
    };
    setPhoneState(updated);
    await onSavePhoneCalling(updated);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2500);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Phone Calling &amp; Telecom Carrier Trunks"
        badge="Enterprise PRI Connected"
        whatIsThis="Connect your institutional phone lines so Swaram AI agents can place and receive live phone calls."
        whyDoINeedIt="Call recipients see your verified institutional caller ID (e.g. +91 40 4590 1197) rather than an unknown spam number, maximizing answer rates."
        whatToDoNext="Verify that your primary line is selected as the default caller ID and run a carrier trunk latency test."
      >
        <button
          type="button"
          onClick={handleTest}
          disabled={isTesting}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isTesting ? "animate-spin" : ""}`} />
          <span>{isTesting ? "Testing Carrier..." : "Test Carrier Trunk"}</span>
        </button>
      </SectionHeader>

      {saveNotice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Telephony caller ID and carrier preferences updated.</span>
        </div>
      )}

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
          <span className="text-[11px] font-mono text-[#2E8066] font-bold">
            Carrier Status: Online
          </span>
        </div>
      )}

      {/* Primary Carrier Card */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1D4]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50] shrink-0 font-bold">
              <PhoneCall className="w-5 h-5 text-[#F2A18B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#283A50]">{phoneState.provider}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B8DEC8]/50 text-[#2E8066]">
                  Dedicated PRI Trunk
                </span>
              </div>
              <p className="text-xs text-[#707684] mt-0.5">
                Primary carrier connection for high-volume admissions and outbound campaigns.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#283A50] block">
              Default Caller ID: {phoneState.defaultCallerId}
            </span>
            <span className="text-[11px] text-[#707684]">
              Permitted hours: {phoneState.permittedCallingHours} ({phoneState.timezone})
            </span>
          </div>
        </div>

        {/* Assigned Numbers Table */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#707684] block">
            Available Business Numbers &amp; Caller ID Selection
          </label>
          <div className="divide-y divide-[#E9E1D4]/60 border border-[#E9E1D4] rounded-xl overflow-hidden">
            {phoneState.phoneNumbers.map((num) => (
              <div
                key={num.id}
                onClick={() => handleCallerIdSelect(num.number)}
                className={`p-3 sm:px-4 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                  num.isDefaultCallerId
                    ? "bg-[#FAF5E9]/70 font-semibold"
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="callerIdRadio"
                    checked={num.isDefaultCallerId}
                    onChange={() => handleCallerIdSelect(num.number)}
                    className="w-4 h-4 text-[#283A50] cursor-pointer"
                  />
                  <div>
                    <span className="font-mono text-sm font-bold text-[#283A50] block">
                      {num.number}
                    </span>
                    <span className="text-[11px] text-[#707684]">{num.label}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
                    {num.channelType}
                  </span>
                  {num.isDefaultCallerId && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B8DEC8]/50 text-[#2E8066]">
                      Primary Outbound Caller ID
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable Advanced SIP Settings Area */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-2xs space-y-4">
        <button
          type="button"
          onClick={() => setShowAdvancedSip(!showAdvancedSip)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div>
            <h4 className="text-xs font-bold text-[#283A50] uppercase tracking-wider">
              Advanced Telephony &amp; SIP Trunk Configuration
            </h4>
            <p className="text-xs text-[#707684] mt-0.5">
              A business phone connection that links Swaram to your private PBX or carrier gateway.
            </p>
          </div>
          <div className="p-1 rounded-lg bg-[#FAF5E9] text-[#283A50]">
            {showAdvancedSip ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAdvancedSip && (
          <div className="pt-4 border-t border-[#E9E1D4]/60 space-y-4 text-xs animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
                  SIP Registrar / Gateway
                </span>
                <span className="font-mono text-[#283A50] font-bold block">
                  {phoneState.sipSettings.sipRegistrar}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
                  SIP Port &amp; Protocol
                </span>
                <span className="font-mono text-[#283A50] font-bold block">
                  Port {phoneState.sipSettings.port} • {phoneState.sipSettings.transport}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
                  Trunk Auth Account
                </span>
                <span className="font-mono text-[#283A50] font-bold block">
                  {phoneState.sipSettings.authUsernameMasked}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold text-[#283A50] block">
                  Enforce Secure RTP (SRTP) Media Encryption
                </strong>
                <p className="text-[11px] text-[#707684] mt-0.5">
                  Encrypts voice audio payloads in transit to prevent interception over public networks.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSrtpToggle}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  phoneState.sipSettings.srtpEncryption
                    ? "bg-[#2E8066] text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {phoneState.sipSettings.srtpEncryption ? "Encrypted (TLS)" : "Plain (UDP)"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
