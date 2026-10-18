"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Phone,
  Play,
  Pause,
  Download,
  Share2,
  Clock,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  Zap,
  Activity,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Database,
  ArrowUpRight,
} from "lucide-react";
import { RecentCallRecord } from "@/types/dashboard";

interface CallDrawerProps {
  call: RecentCallRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CallDrawer({ call, isOpen, onClose }: CallDrawerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.5x" | "2x">("1x");
  const [activeTab, setActiveTab] = useState<"transcript" | "data" | "whatsapp" | "telemetry">("transcript");
  const [showRedialConfirm, setShowRedialConfirm] = useState(false);

  if (!isOpen || !call) return null;

  // Multi-turn transcript for conversational inspection
  const transcriptTurns = [
    {
      id: 1,
      speaker: "agent",
      text: `Hello, good morning! I am ${call.agentName} calling from the campus admissions office. Am I speaking with ${call.contactName || "the candidate"}?`,
      time: "00:03",
    },
    {
      id: 2,
      speaker: "caller",
      text: "Yes, this is Rahul. I had registered on your website yesterday regarding B.Tech CSE admissions.",
      time: "00:08",
    },
    {
      id: 3,
      speaker: "agent",
      text: "Great to speak with you, Rahul! I see you scored 94.2% in your 12th board exams. With that score, you qualify for our 35% Chancellor Merit Scholarship. Are you looking for hostel accommodation as well?",
      time: "00:16",
    },
    {
      id: 4,
      speaker: "caller",
      text: "Yes, definitely. Can you tell me what the total annual fee would be including AC hostel and dining?",
      time: "00:27",
    },
    {
      id: 5,
      speaker: "agent",
      text: "With your scholarship, tuition is ₹5.18 Lakhs and twin-sharing AC hostel with dining is ₹1.85 Lakhs per year. I have also shared the complete brochure on your WhatsApp. Would you like to schedule a campus tour this Saturday at 11 AM?",
      time: "00:39",
    },
    {
      id: 6,
      speaker: "caller",
      text: "Yes, please confirm Saturday 11 AM. My father and I will visit the campus.",
      time: "00:48",
    },
    {
      id: 7,
      speaker: "agent",
      text: "Your VIP campus pass for Saturday 11 AM is confirmed! Counselor Mr. Vikram will greet you at the admissions lounge. Have a wonderful day!",
      time: "00:55",
    },
  ];

  const extractedVariables = [
    { label: "Candidate Name", value: call.contactName || "Rahul Sharma", confidence: "100%", vaultId: "DV-091" },
    { label: "Phone Number", value: call.contactNumber, confidence: "100%", vaultId: "DV-092" },
    { label: "Target Course", value: "B.Tech Computer Science (AI/ML)", confidence: "98%", vaultId: "DV-093" },
    { label: "Board Score", value: "94.2% (CBSE PCM)", confidence: "99%", vaultId: "DV-094" },
    { label: "Scholarship Eligibility", value: "35% Merit Scholarship", confidence: "96%", vaultId: "DV-095" },
    { label: "Hostel Preference", value: "Twin-Sharing AC Room", confidence: "95%", vaultId: "DV-096" },
    { label: "Action Confirmed", value: "Campus Tour (Sat 11:00 AM)", confidence: "99%", vaultId: "DV-097" },
    { label: "Lead Temperature", value: "High Intent", confidence: "94%", vaultId: "DV-098" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/25 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-[#1A1A1A] h-full shadow-2xl flex flex-col font-sans border-l border-black/[0.08] animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-5 border-b border-black/[0.06] bg-[#FAF3E4]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A7F5] text-[#3B0764] flex items-center justify-center font-bold text-sm shadow-2xs">
              <Phone className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#1A1A1A]">
                  {call.contactName || call.contactNumber}
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#C1F2D5] text-[#065F46]">
                  {call.outcome}
                </span>
              </div>
              <p className="text-xs text-black/55 mt-0.5">
                {call.contactNumber} • {call.direction === "inbound" ? "Inbound Route" : "Outbound Campaign"} • {call.timestamp}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#1A1A1A] bg-white px-3 py-1 rounded-full border border-black/[0.08] shadow-2xs">
              1.2 min billed
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close call drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Player Bar */}
        <div className="p-4 bg-white border-b border-black/[0.06] flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-[#111111] hover:bg-black text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause audio recording" : "Play audio recording"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>
              <div>
                <p className="text-xs font-bold text-[#1A1A1A]">Acoustic Call Recording</p>
                <p className="text-[11px] text-black/55">
                  Duration: {call.duration} • Sample Rate: 16kHz Opus • Stereo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {(["1x", "1.5x", "2x"] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full transition-colors cursor-pointer ${
                    playbackSpeed === spd
                      ? "bg-[#111111] text-white shadow-2xs"
                      : "bg-[#FAF3E4] text-black/60 border border-black/[0.06] hover:text-black"
                  }`}
                >
                  {spd}
                </button>
              ))}
              <a
                href={call.audioRecordingUrl || "#"}
                download
                className="p-1.5 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors"
                title="Download MP3"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Waveform Scrubber */}
          <div className="flex items-center gap-1 h-7 pt-1 px-1">
            {[30, 45, 80, 95, 60, 40, 70, 85, 30, 60, 75, 90, 50, 40, 80, 95, 60, 45, 30, 65, 85, 40, 50, 70].map(
              (h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all cursor-pointer ${
                    i < 8 ? "bg-[#111111]" : "bg-[#FAF0D7] hover:bg-[#FFA98B]"
                  }`}
                  style={{ height: `${h}%` }}
                />
              )
            )}
          </div>
        </div>

        {/* Tab Navigation (Pills) */}
        <div className="px-5 py-2.5 border-b border-black/[0.06] bg-[#FAF3E4]/30 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-medium shrink-0">
          {(
            [
              { id: "transcript", label: `Transcript (${transcriptTurns.length})` },
              { id: "data", label: `Extracted Fields (${extractedVariables.length})` },
              { id: "whatsapp", label: "WhatsApp Follow-up" },
              { id: "telemetry", label: "Acoustics & Latency" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer text-xs ${
                activeTab === t.id
                  ? "bg-[#111111] text-white font-semibold shadow-xs"
                  : "bg-white text-black/60 hover:text-black border border-black/[0.06]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: DUAL CHAT TRANSCRIPT */}
          {activeTab === "transcript" && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs text-black/70 bg-[#FAF3E4] p-3 rounded-2xl border border-black/[0.06]">
                <span>Language: <strong className="text-[#1A1A1A]">Hindi + Indian English (Auto Code-switch)</strong></span>
                <span>Agent: <strong className="text-[#1A1A1A]">{call.agentName}</strong></span>
              </div>

              {transcriptTurns.map((turn) => {
                const isAgent = turn.speaker === "agent";
                return (
                  <div
                    key={turn.id}
                    className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] text-black/50 mb-1 px-1">
                      {isAgent ? (
                        <>
                          <Bot className="w-3.5 h-3.5 text-[#4C1D95]" />
                          <span className="font-semibold text-[#1A1A1A]">{call.agentName}</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3.5 h-3.5 text-[#1E3A8A]" />
                          <span className="font-semibold text-[#1A1A1A]">{call.contactName || "Caller"}</span>
                        </>
                      )}
                      <span>• {turn.time}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                        isAgent
                          ? "bg-[#F3E8FF] text-[#1A1A1A] border border-[#D9C2FA]"
                          : "bg-white text-[#1A1A1A] border border-black/[0.08]"
                      }`}
                    >
                      {turn.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: EXTRACTED VARIABLES */}
          {activeTab === "data" && (
            <div className="space-y-3">
              <div className="p-3.5 bg-[#FAF3E4] border border-black/[0.06] rounded-2xl text-xs text-[#1A1A1A] flex items-start gap-2.5">
                <Database className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-[#1A1A1A]">Structured Data Vault Synced</p>
                  <p className="text-[11px] text-black/60 leading-relaxed">
                    Extracted parameters are indexed in the centralized Data Vault with audit trails linking directly to this call session.
                  </p>
                  <Link
                    href={`/dashboard/data-vault?query=${encodeURIComponent(call.contactNumber)}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] hover:underline pt-1"
                  >
                    <span>Inspect these fields in Data Vault</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="border border-black/[0.06] bg-white rounded-2xl divide-y divide-black/[0.06] overflow-hidden shadow-2xs">
                {extractedVariables.map((v, i) => (
                  <div key={i} className="p-3.5 flex items-center justify-between text-xs hover:bg-[#FAF3E4]/40 transition-colors">
                    <span className="text-black/60 font-medium">{v.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1A1A1A]">{v.value}</span>
                      <span className="text-[10px] font-semibold text-[#065F46] bg-[#C1F2D5] px-2 py-0.5 rounded-full">
                        {v.confidence}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WHATSAPP ACTION PREVIEW */}
          {activeTab === "whatsapp" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#C1F2D5] text-[#065F46] text-xs flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#065F46]">WhatsApp Template Delivered</h4>
                  <p className="text-[11px] text-[#047857] mt-0.5">
                    Triggered automatically 12 seconds after call concluded via Meta Cloud API.
                  </p>
                </div>
              </div>

              {/* WhatsApp Mock Card */}
              <div className="max-w-sm mx-auto p-4 bg-[#FAF3E4] rounded-2xl border border-black/[0.06]">
                <div className="bg-white p-3.5 rounded-xl border border-black/[0.08] text-xs space-y-2 text-[#1A1A1A] shadow-xs">
                  <p className="font-semibold text-[#1A1A1A]">
                    Hi Rahul! 👋 Thank you for speaking with {call.agentName}.
                  </p>
                  <p className="text-[11px] text-black/65 leading-relaxed">
                    As discussed on the call, here are your B.Tech CSE details:
                    <br />• 35% Chancellor Merit Scholarship Applied
                    <br />• Campus Tour Scheduled: <strong className="text-[#1A1A1A]">Saturday, 11:00 AM</strong>
                  </p>
                  <div className="p-2.5 bg-[#FAF3E4] rounded-lg border border-black/[0.06] text-[11px] text-[#1A1A1A] font-medium flex items-center justify-between">
                    <span>📄 BTech_Admissions_Brochure.pdf</span>
                    <ExternalLink className="w-3.5 h-3.5 text-black/50" />
                  </div>
                  <p className="text-[10px] text-black/45 text-right">Delivered 10:52 AM ✓✓</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACOUSTIC TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-[#FAF3E4] border border-black/[0.06]">
                  <p className="text-[11px] text-black/60 font-medium">STT Ingestion</p>
                  <p className="text-base font-bold text-[#1A1A1A] mt-1">115 ms</p>
                  <p className="text-[10px] text-black/45 mt-0.5">Whisper Indic</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF3E4] border border-black/[0.06]">
                  <p className="text-[11px] text-black/60 font-medium">LLM Inference</p>
                  <p className="text-base font-bold text-[#1A1A1A] mt-1">178 ms</p>
                  <p className="text-[10px] text-black/45 mt-0.5">RAG Grounded</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF3E4] border border-black/[0.06]">
                  <p className="text-[11px] text-black/60 font-medium">TTS Acoustic</p>
                  <p className="text-base font-bold text-[#1A1A1A] mt-1">92 ms</p>
                  <p className="text-[10px] text-black/45 mt-0.5">Native Neural</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-black/[0.06] bg-white space-y-2 shadow-2xs">
                <div className="flex justify-between text-xs">
                  <span className="text-black/60">Total Turn-around Latency</span>
                  <span className="font-bold text-[#16856B]">385 ms (Conversational SLA)</span>
                </div>
                <div className="w-full h-2.5 bg-[#FAF0D7] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#111111]" style={{ width: "30%" }} />
                  <div className="h-full bg-[#A8C3F0]" style={{ width: "45%" }} />
                  <div className="h-full bg-[#C1F2D5]" style={{ width: "25%" }} />
                </div>
                <p className="text-[11px] text-black/55">
                  SIP gateway carrier routing via Exotel Direct Trunk with sub-400ms voice pipeline.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-black/[0.06] bg-[#FAF3E4]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Outbound call dispatched to ${call.contactNumber}`);
              }}
              className="px-4 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Redial Contact</span>
            </button>
            <Link
              href={`/dashboard/data-vault?query=${encodeURIComponent(call.contactNumber)}`}
              className="px-4 py-2 rounded-full border border-black/[0.08] bg-white hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Database className="w-3.5 h-3.5 text-black/50" />
              <span>Data Vault</span>
            </Link>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-black/60 hover:text-black hover:bg-black/5 text-xs font-medium cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
