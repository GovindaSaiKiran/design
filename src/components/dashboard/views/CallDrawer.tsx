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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col font-sans border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  {call.contactName || call.contactNumber}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {call.outcome}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {call.contactNumber} • {call.direction === "inbound" ? "Inbound Call" : "Outbound Campaign"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-100/70 px-2 py-1 rounded-md border border-purple-200">
              ⚡ 1.2 Credits Used
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Player Bar */}
        <div className="p-4 bg-purple-50/60 border-b border-purple-100 flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>
              <div>
                <p className="text-xs font-bold text-slate-900">Call Audio Recording</p>
                <p className="text-[10px] text-slate-500">
                  Duration: {call.duration} • Sample Rate: 16kHz
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {(["1x", "1.5x", "2x"] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    playbackSpeed === spd
                      ? "bg-purple-600 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {spd}
                </button>
              ))}
              <a
                href={call.audioRecordingUrl || "#"}
                download
                className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
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
                  className={`flex-1 rounded-full transition-all cursor-pointer ${
                    i < 8 ? "bg-purple-600" : "bg-purple-200 hover:bg-purple-400"
                  }`}
                  style={{ height: `${h}%` }}
                />
              )
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 border-b border-slate-200 flex items-center gap-6 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab("transcript")}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "transcript"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Chat Transcript ({transcriptTurns.length})
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "data"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Extracted Variables ({extractedVariables.length})
          </button>
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "whatsapp"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            WhatsApp Action
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "telemetry"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
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
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                      {isAgent ? (
                        <>
                          <Bot className="w-3 h-3 text-purple-600" />
                          <span className="font-bold text-purple-700">{call.agentName}</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3 text-slate-500" />
                          <span className="font-semibold text-slate-700">{call.contactName || "Caller"}</span>
                        </>
                      )}
                      <span>• {turn.time}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                        isAgent
                          ? "bg-purple-50 text-slate-900 border border-purple-200/80 rounded-tl-xs"
                          : "bg-slate-100 text-slate-900 border border-slate-200 rounded-tr-xs"
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
            <div className="space-y-2.5">
              <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-xs text-purple-900">
                <span className="font-bold">Automated Post-Call Extraction:</span> Swaram AI extracted these variables dynamically during the call and auto-synced with CRM.
              </div>

              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                {extractedVariables.map((v, i) => (
                  <div key={i} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                    <span className="font-medium text-slate-500">{v.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{v.value}</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
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
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900">WhatsApp Template Delivered</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Triggered automatically 12 seconds after call concluded via Meta Cloud API.
                  </p>
                </div>
              </div>

              {/* WhatsApp Mock Card */}
              <div className="max-w-sm mx-auto p-4 bg-[#e5ddd5] rounded-2xl border border-slate-300 shadow-sm">
                <div className="bg-white p-3.5 rounded-xl shadow-xs text-xs space-y-2 text-slate-800">
                  <p className="font-bold text-slate-900">
                    Hi Rahul! 👋 Thank you for speaking with {call.agentName}.
                  </p>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    As discussed on the call, here are your B.Tech CSE details:
                    <br />• 35% Chancellor Merit Scholarship Applied
                    <br />• Campus Tour Scheduled: <b>Saturday, 11:00 AM</b>
                  </p>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200 text-[10px] text-purple-700 font-medium flex items-center justify-between">
                    <span>📄 BTech_Admissions_Brochure.pdf</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                  <p className="text-[9px] text-slate-400 text-right">Delivered 10:52 AM ✓✓</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACOUSTIC TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">STT Latency</p>
                  <p className="text-base font-extrabold text-slate-900 mt-1">115 ms</p>
                  <p className="text-[9px] text-emerald-600 font-semibold mt-0.5">Whisper Indic</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">LLM Thinking</p>
                  <p className="text-base font-extrabold text-slate-900 mt-1">178 ms</p>
                  <p className="text-[9px] text-purple-600 font-semibold mt-0.5">RAG Grounded</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">TTS Generation</p>
                  <p className="text-base font-extrabold text-slate-900 mt-1">92 ms</p>
                  <p className="text-[9px] text-indigo-600 font-semibold mt-0.5">Indic Neural</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">Total Turn-around Latency</span>
                  <span className="font-bold text-emerald-600">385 ms (Human-Speed)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: "30%" }} />
                  <div className="h-full bg-purple-600" style={{ width: "45%" }} />
                  <div className="h-full bg-indigo-500" style={{ width: "25%" }} />
                </div>
                <p className="text-[10px] text-slate-400">
                  Carrier routing via Exotel Direct SIP Trunk with sub-500ms voice pipeline.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Initiating redial to ${call.contactNumber}...`)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Redial Contact</span>
            </button>
            <button
              onClick={() => alert("Contact synced to CRM (HubSpot/Zoho/Salesforce)!")}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Sync to CRM
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-900 text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
