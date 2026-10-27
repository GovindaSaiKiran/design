"use client";

import React, { useState } from "react";
import {
  Sparkles,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Clock,
  Phone,
  PhoneOff,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface TestCallSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  agentRole: string;
  openingScript: string;
  campaignGoal: string;
  knowledgeSummary: string;
}

interface ChatMessage {
  sender: "caller" | "agent";
  text: string;
  time: string;
}

export default function TestCallSetupModal({
  isOpen,
  onClose,
  agentName,
  agentRole,
  openingScript,
  campaignGoal,
  knowledgeSummary,
}: TestCallSetupModalProps) {
  const [testTab, setTestTab] = useState<"chat" | "phone">("chat");

  // Chat test state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "agent",
      text: openingScript.replace(/\{name\}/g, "Customer").replace(/\{organization\}/g, "Enterprise Workspace"),
      time: "Just now",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  // Phone test state
  const [testPhoneNumber, setTestPhoneNumber] = useState("+91 98401 22345");
  const [testConsentConfirmed, setTestConsentConfirmed] = useState(false);
  const [testCallStatus, setTestCallStatus] = useState<"idle" | "dialing" | "connected" | "completed">("idle");
  const [testCallSid, setTestCallSid] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle sending a test chat turn
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    try { soundSynth.play("click"); } catch {}

    const newMsg: ChatMessage = {
      sender: "caller",
      text: userInput.trim(),
      time: "Just now",
    };
    setMessages((prev) => [...prev, newMsg]);
    setUserInput("");
    setIsAgentTyping(true);

    setTimeout(() => {
      let reply = "Thank you for asking. Based on our grounded knowledge layer, our voice system is configured to assist with inquiry qualification, onboarding, and scheduling follow-ups. Would you like me to record your preferences?";
      const lower = newMsg.text.toLowerCase();
      if (lower.includes("pricing") || lower.includes("cost") || lower.includes("fee") || lower.includes("plan")) {
        reply = "Our plans include predictable usage-based billing with dedicated SIP trunks, zero overage surprises, and enterprise SLA guarantees. I can send a detailed summary directly to your contact number.";
      } else if (lower.includes("feature") || lower.includes("integration") || lower.includes("support") || lower.includes("technical")) {
        reply = "We offer native CRM integrations, live webhook event streams, and sub-140ms latency voice models optimized for regional and conversational flow.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: reply,
          time: "Just now",
        },
      ]);
      setIsAgentTyping(false);
      try { soundSynth.play("confirm"); } catch {}
    }, 1100);
  };

  // Handle phone test call
  const handleTriggerTestPhoneCall = () => {
    if (!testConsentConfirmed || !testPhoneNumber.trim()) return;
    try { soundSynth.play("confirm"); } catch {}

    setTestCallStatus("dialing");
    const fakeSid = `TEST-SID-${Date.now()}`;
    setTestCallSid(fakeSid);

    setTimeout(() => {
      setTestCallStatus("connected");
      try { soundSynth.playSuccess(); } catch {}
    }, 2000);

    setTimeout(() => {
      setTestCallStatus("completed");
    }, 6000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E9E1D4] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#FAF5E9] px-6 py-4 border-b border-[#E9E1D4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#283A50] text-[#FAF5E9] flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4 text-[#C4A5E8]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#283A50]">Test This Call Setup (Optional)</h3>
              <p className="text-[11px] text-[#707684]">
                Simulate interaction before launching to recipients
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#707684] hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Test Tabs */}
        <div className="flex border-b border-[#E9E1D4] px-6 pt-3 gap-4 text-xs font-bold text-[#707684]">
          <button
            type="button"
            onClick={() => setTestTab("chat")}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              testTab === "chat"
                ? "border-[#283A50] text-[#283A50]"
                : "border-transparent hover:text-[#283A50]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Interactive Conversation Test</span>
          </button>

          <button
            type="button"
            onClick={() => setTestTab("phone")}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              testTab === "phone"
                ? "border-[#283A50] text-[#283A50]"
                : "border-transparent hover:text-[#283A50]"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Authorized Phone-Call Test</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: Chat Test */}
          {testTab === "chat" && (
            <div className="space-y-4">
              <div className="bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-xl p-3 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#283A50]">Simulated AI Agent: {agentName}</span>
                  <span className="text-[10px] text-[#2E8066] font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-[#B8DEC8]">
                    Grounded Session
                  </span>
                </div>
                <p className="text-[11px] text-[#707684] line-clamp-1">
                  Goal: {campaignGoal || "Merit scholarship verification and counseling"}
                </p>
              </div>

              {/* Chat Thread */}
              <div className="border border-[#E9E1D4] rounded-2xl p-4 bg-[#FAF5E9]/20 min-h-[220px] max-h-[260px] overflow-y-auto space-y-3 text-xs">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === "caller" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        m.sender === "caller"
                          ? "bg-[#283A50] text-white rounded-br-xs"
                          : "bg-white border border-[#E9E1D4] text-[#283A50] rounded-bl-xs shadow-2xs"
                      }`}
                    >
                      <span className="text-[10px] font-bold block mb-0.5 opacity-80">
                        {m.sender === "caller" ? "You (Prospect)" : agentName.split("—")[0].trim()}
                      </span>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isAgentTyping && (
                  <div className="flex items-center gap-1.5 text-xs text-[#707684] bg-white border border-[#E9E1D4] px-3 py-1.5 rounded-full w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#283A50] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#283A50] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#283A50] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] ml-1">{agentName.split("—")[0].trim()} is speaking...</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a question (e.g. 'What is the scholarship cutoff?')..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-[#FAF5E9]/40 border border-[#E9E1D4] rounded-xl px-3.5 py-2 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50]"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="bg-[#283A50] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#283A50]/90 transition-all flex items-center gap-1.5"
                >
                  <span>Send</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Phone Call Test */}
          {testTab === "phone" && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-2xl p-4 space-y-2">
                <h4 className="font-bold text-[#283A50]">Place a Single Authorized Test Call</h4>
                <p className="text-[11px] text-[#707684] leading-relaxed">
                  Dials your personal authorized mobile to let you experience the exact voice latency, conversational code-switching, and script greeting before campaign launch.
                </p>
                <div className="pt-2 text-[10px] text-[#2E8066] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Complimentary sandbox test call • Recorded separately from campaign analytics</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-[#283A50] block">
                  Authorized Destination Mobile Number *
                </label>
                <input
                  type="tel"
                  value={testPhoneNumber}
                  onChange={(e) => setTestPhoneNumber(e.target.value)}
                  placeholder="+91 98401 22345"
                  className="w-full bg-[#FAF5E9]/40 border border-[#E9E1D4] rounded-xl px-3.5 py-2 text-xs text-[#283A50] font-mono focus:outline-none focus:ring-1 focus:ring-[#283A50]"
                />
              </div>

              {/* Destination Callout */}
              <div className="bg-white border border-[#E9E1D4] rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#707684] uppercase font-bold tracking-wider block">
                    Outbound Dialing Destination
                  </span>
                  <span className="font-mono font-bold text-sm text-[#283A50]">{testPhoneNumber}</span>
                </div>
                <span className="text-[11px] text-[#707684] bg-[#FAF5E9] px-2 py-0.5 rounded border border-[#E9E1D4]">
                  Via Apex PRI Line 01
                </span>
              </div>

              {/* Explicit Confirmation Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={testConsentConfirmed}
                  onChange={(e) => setTestConsentConfirmed(e.target.checked)}
                  className="mt-0.5 accent-[#283A50] cursor-pointer"
                />
                <span className="text-[11px] text-[#283A50] leading-snug">
                  I explicitly authorize placing 1 test call to this verified number using the intended campaign prompt.
                </span>
              </label>

              {/* Status Output */}
              {testCallStatus !== "idle" && (
                <div className="p-3.5 rounded-xl border border-[#E9E1D4] bg-[#FAF5E9]/40 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#283A50]">Test Call Telephony Status:</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        testCallStatus === "dialing"
                          ? "bg-amber-100 text-amber-800"
                          : testCallStatus === "connected"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {testCallStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707684] font-mono">
                    SID: {testCallSid} · Latency: 138ms · Carrier: Airtel PRI Trunk
                  </p>
                </div>
              )}

              <button
                type="button"
                disabled={!testConsentConfirmed || testCallStatus === "dialing" || testCallStatus === "connected"}
                onClick={handleTriggerTestPhoneCall}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  testConsentConfirmed && testCallStatus === "idle"
                    ? "bg-[#283A50] text-white hover:bg-[#283A50]/90 shadow-sm cursor-pointer"
                    : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>
                  {testCallStatus === "dialing"
                    ? "Dialing Carrier..."
                    : testCallStatus === "connected"
                    ? "Test Call Live on Line"
                    : testCallStatus === "completed"
                    ? "Test Call Completed Successfully"
                    : "Place Single Test Call Now"}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF5E9] px-6 py-3.5 border-t border-[#E9E1D4] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#707684]">
            Testing is optional. You may close and proceed to campaign review.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-[#E9E1D4] text-[#283A50] font-bold hover:bg-[#FAF5E9] transition-colors"
          >
            Done Testing
          </button>
        </div>
      </div>
    </div>
  );
}
