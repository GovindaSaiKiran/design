"use client";

import React, { useState } from "react";
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

  if (!isOpen || !call) return null;

  // Realistic multi-turn transcript for the Outpero dual-bubble chat
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
      text: "Yes, definitely. Can you tell me what the total annual fee would be including AC hostel and meals?",
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
    { label: "Candidate Name", value: call.contactName || "Rahul Sharma", confidence: "100%" },
    { label: "Target Course", value: "B.Tech Computer Science (AI/ML)", confidence: "98%" },
    { label: "Board Score", value: "94.2% (CBSE PCM)", confidence: "99%" },
    { label: "Scholarship Eligibility", value: "35% Merit Scholarship", confidence: "96%" },
    { label: "Hostel Preference", value: "Twin-Sharing AC Room", confidence: "95%" },
    { label: "Action Confirmed", value: "Campus Tour (Sat 11:00 AM)", confidence: "99%" },
    { label: "Lead Temperature", value: "🔥 Hot / High-Intent", confidence: "94%" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#09090B] text-white h-full shadow-2xl flex flex-col font-sans border-l border-[#27272A] animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="p-5 border-b border-[#27272A] bg-[#121215] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[2px] bg-white text-black flex items-center justify-center font-bold text-sm">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">
                  {call.contactName || call.contactNumber}
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#18181B] text-zinc-300 border border-[#27272A]">
                  {call.outcome}
                </span>
              </div>
              <p className="text-xs text-[#71717A] font-mono mt-0.5">
                {call.contactNumber} • {call.direction === "inbound" ? "Inbound Route" : "Outbound Campaign"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-white bg-[#18181B] px-2.5 py-1 rounded-[2px] border border-[#27272A]">
              1.2 CREDITS BILLED
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-[2px] text-[#71717A] hover:text-white hover:bg-[#18181B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Player Bar */}
        <div className="p-4 bg-[#000000] border-b border-[#27272A] flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-[2px] bg-white text-black hover:bg-zinc-200 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>
              <div>
                <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">Acoustic Audio Recording</p>
                <p className="text-[10px] text-[#71717A] font-mono">
                  Duration: {call.duration} • Sample Rate: 16kHz Opus
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {(["1x", "1.5x", "2x"] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-[2px] ${
                    playbackSpeed === spd
                      ? "bg-white text-black"
                      : "bg-[#121215] text-[#A1A1AA] border border-[#27272A] hover:text-white"
                  }`}
                >
                  {spd}
                </button>
              ))}
              <a
                href={call.audioRecordingUrl || "#"}
                download
                className="p-1.5 rounded-[2px] text-[#71717A] hover:text-white hover:bg-[#18181B] border border-transparent hover:border-[#27272A] transition-colors"
                title="Download MP3"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Waveform Scrubber */}
          <div className="flex items-center gap-1 h-7 pt-1 px-1">
            {[30, 45, 80, 95, 60, 40, 70, 85, 30, 60, 75, 90, 50, 40, 80, 95, 60, 45, 30, 65, 85, 40, 50, 70].map(
              (h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-[1px] transition-all cursor-pointer ${
                    i < 8 ? "bg-white" : "bg-[#27272A] hover:bg-[#3F3F46]"
                  }`}
                  style={{ height: `${h}%` }}
                />
              )
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 border-b border-[#27272A] bg-[#121215] flex items-center gap-6 text-xs font-mono font-bold uppercase tracking-wider shrink-0">
          <button
            onClick={() => setActiveTab("transcript")}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "transcript"
                ? "border-white text-white"
                : "border-transparent text-[#71717A] hover:text-white"
            }`}
          >
            Transcript ({transcriptTurns.length})
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "data"
                ? "border-white text-white"
                : "border-transparent text-[#71717A] hover:text-white"
            }`}
          >
            Extracted Data ({extractedVariables.length})
          </button>
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "whatsapp"
                ? "border-white text-white"
                : "border-transparent text-[#71717A] hover:text-white"
            }`}
          >
            WhatsApp Dispatch
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "telemetry"
                ? "border-white text-white"
                : "border-transparent text-[#71717A] hover:text-white"
            }`}
          >
            Acoustics
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: DUAL CHAT TRANSCRIPT */}
          {activeTab === "transcript" && (
            <div className="space-y-3.5">
              {transcriptTurns.map((turn) => {
                const isAgent = turn.speaker === "agent";
                return (
                  <div
                    key={turn.id}
                    className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#71717A] mb-1 px-1">
                      {isAgent ? (
                        <>
                          <Bot className="w-3 h-3 text-white" />
                          <span className="font-bold text-white">{call.agentName}</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3 text-[#A1A1AA]" />
                          <span className="font-semibold text-zinc-300">{call.contactName || "Caller"}</span>
                        </>
                      )}
                      <span>• {turn.time}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-[2px] text-xs leading-relaxed ${
                        isAgent
                          ? "bg-[#121215] text-white border border-[#27272A]"
                          : "bg-[#000000] text-zinc-200 border border-[#27272A]"
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
            <div className="space-y-2.5 font-mono">
              <div className="p-3 bg-[#121215] border border-[#27272A] rounded-[2px] text-xs text-[#A1A1AA]">
                <span className="font-bold text-white uppercase tracking-wider">Dynamic CRM Extraction:</span> Verified against conversation audio stream and automatically synced to lead records.
              </div>

              <div className="border border-[#27272A] bg-[#000000] rounded-[2px] divide-y divide-[#27272A] overflow-hidden">
                {extractedVariables.map((v, i) => (
                  <div key={i} className="p-3 flex items-center justify-between text-xs hover:bg-[#121215]">
                    <span className="text-[#71717A]">{v.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{v.value}</span>
                      <span className="text-[10px] font-bold text-zinc-300 bg-[#18181B] px-1.5 py-0.5 rounded-[2px] border border-[#27272A]">
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
            <div className="space-y-4 font-mono">
              <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] text-xs text-zinc-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider">WhatsApp Template Delivered</h4>
                  <p className="text-[11px] text-[#71717A] mt-0.5">
                    Triggered automatically 12 seconds after call concluded via Meta Cloud API.
                  </p>
                </div>
              </div>

              {/* WhatsApp Mock Card in Stark Dark */}
              <div className="max-w-sm mx-auto p-4 bg-[#000000] rounded-[2px] border border-[#27272A]">
                <div className="bg-[#121215] p-3.5 rounded-[2px] border border-[#27272A] text-xs space-y-2 text-zinc-200">
                  <p className="font-bold text-white">
                    Hi Rahul! 👋 Thank you for speaking with {call.agentName}.
                  </p>
                  <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                    As discussed on the call, here are your B.Tech CSE details:
                    <br />• 35% Chancellor Merit Scholarship Applied
                    <br />• Campus Tour Scheduled: <b>Saturday, 11:00 AM</b>
                  </p>
                  <div className="p-2 bg-[#000000] rounded-[2px] border border-[#27272A] text-[10px] text-white font-medium flex items-center justify-between">
                    <span>📄 BTech_Admissions_Brochure.pdf</span>
                    <ExternalLink className="w-3 h-3 text-[#71717A]" />
                  </div>
                  <p className="text-[9px] text-[#71717A] text-right font-mono">Delivered 10:52 AM ✓✓</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACOUSTIC TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="space-y-3.5 text-xs font-mono">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-[2px] bg-[#121215] border border-[#27272A]">
                  <p className="text-[10px] text-[#71717A] font-bold uppercase">STT Ingestion</p>
                  <p className="text-base font-extrabold text-white mt-1">115 ms</p>
                  <p className="text-[9px] text-[#A1A1AA] mt-0.5">Whisper Indic</p>
                </div>
                <div className="p-3 rounded-[2px] bg-[#121215] border border-[#27272A]">
                  <p className="text-[10px] text-[#71717A] font-bold uppercase">LLM Inference</p>
                  <p className="text-base font-extrabold text-white mt-1">178 ms</p>
                  <p className="text-[9px] text-[#A1A1AA] mt-0.5">RAG Grounded</p>
                </div>
                <div className="p-3 rounded-[2px] bg-[#121215] border border-[#27272A]">
                  <p className="text-[10px] text-[#71717A] font-bold uppercase">TTS Acoustic</p>
                  <p className="text-base font-extrabold text-white mt-1">92 ms</p>
                  <p className="text-[9px] text-[#A1A1AA] mt-0.5">Native Neural</p>
                </div>
              </div>

              <div className="p-4 rounded-[2px] border border-[#27272A] bg-[#000000] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A1A1AA]">Total Turn-around Latency</span>
                  <span className="font-bold text-white">385 ms (Human-Speed)</span>
                </div>
                <div className="w-full h-2 bg-[#121215] rounded-[1px] overflow-hidden flex border border-[#27272A]">
                  <div className="h-full bg-white" style={{ width: "30%" }} />
                  <div className="h-full bg-[#71717A]" style={{ width: "45%" }} />
                  <div className="h-full bg-[#3F3F46]" style={{ width: "25%" }} />
                </div>
                <p className="text-[10px] text-[#71717A]">
                  Carrier routing via Exotel Direct SIP Trunk with sub-500ms voice pipeline.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-[#27272A] bg-[#121215] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Initiating redial to ${call.contactNumber}...`)}
              className="px-3.5 py-2 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Redial</span>
            </button>
            <button
              onClick={() => alert("Contact synced to CRM (HubSpot/Zoho/Salesforce)!")}
              className="px-3.5 py-2 rounded-[2px] border border-[#27272A] text-white hover:bg-[#18181B] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Sync CRM
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-[2px] text-[#71717A] hover:text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
