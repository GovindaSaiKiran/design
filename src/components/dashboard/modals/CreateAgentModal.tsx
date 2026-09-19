"use client";

import React, { useState } from "react";
import {
  X,
  Bot,
  Mic,
  Globe,
  FileText,
  Volume2,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Play,
  Layers,
} from "lucide-react";
import { DashboardAgent } from "@/types/dashboard";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentCreated?: (agent: Partial<DashboardAgent>) => void;
}

export default function CreateAgentModal({
  isOpen,
  onClose,
  onAgentCreated,
}: CreateAgentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("Admissions & Outreach");
  const [selectedVoice, setSelectedVoice] = useState("Priya (Neural)");
  const [selectedLanguage, setSelectedLanguage] = useState("English + Hindi Bilingual");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a senior admissions and student guidance coordinator for Apex Engineering College. Greet prospective students and parents warmly, explain B.Tech specializations (CSE, AI & Data Science, ECE), clarify fee structures and scholarship eligibility, and book campus counseling tours or escalate complex admissions queries to counselors."
  );
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  if (!isOpen) return null;

  const voices = [
    { name: "Priya (Neural)", gender: "Female", accent: "Indian English / Hindi", tone: "Empathetic & Warm" },
    { name: "Rohan (Studio)", gender: "Male", accent: "Indian English Natural", tone: "Calm & Professional" },
    { name: "Ananya (Warm)", gender: "Female", accent: "Pan-Indian English", tone: "Reassuring & Clear" },
    { name: "Vikram (Deep)", gender: "Male", accent: "Neutral English", tone: "Authoritative & Direct" },
  ];

  const languages = [
    "English + Hindi Bilingual",
    "English + Telugu",
    "English + Tamil",
    "English + Kannada",
    "English + Marathi",
    "Global Neutral English",
  ];

  const handleSave = () => {
    onAgentCreated?.({
      name: name || "Event Reminder Agent",
      role: role || "Campus Event & Orientation Coordinator",
      department,
      status: "active",
      language: selectedLanguage,
      voice: {
        name: selectedVoice,
        gender: selectedVoice.includes("Female") || selectedVoice.includes("Priya") || selectedVoice.includes("Ananya") ? "Female" : "Male",
        accent: "Indian English",
      },
      systemPromptPreview: systemPrompt,
      callsToday: 0,
      accuracy: 99.1,
      assignedNumber: "+91 40 4590 1166",
      activeLiveCount: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border-4 border-black shadow-[12px_12px_0px_#000000] p-6 sm:p-8 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
              <Bot className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-black uppercase">
                Create AI Voice Agent
              </h3>
              <p className="text-xs font-bold text-black/70">
                Step {step} of 3 • Voice & Personality Studio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#fcffe0] text-black border-2 border-black flex items-center justify-center transition-all shadow-[2px_2px_0px_#000000] active:translate-x-0.5 cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Step Tabs Indicator */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <div
            className={`h-2 rounded-full border-2 border-black transition-all ${
              step >= 1 ? "bg-[#d6ff38]" : "bg-neutral-200"
            }`}
          />
          <div
            className={`h-2 rounded-full border-2 border-black transition-all ${
              step >= 2 ? "bg-[#d6ff38]" : "bg-neutral-200"
            }`}
          />
          <div
            className={`h-2 rounded-full border-2 border-black transition-all ${
              step >= 3 ? "bg-[#d6ff38]" : "bg-neutral-200"
            }`}
          />
        </div>

        {/* STEP 1: IDENTITY & ROLE */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                Agent Name
              </label>
              <input
                type="text"
                placeholder="e.g. Maya AI (Senior Admissions Counselor)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-white border-2 border-black text-black placeholder-black/50 shadow-[3px_3px_0px_#000000] focus:bg-[#fcffe0] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                  Primary Role / Intent
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech Admissions Counseling"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-white border-2 border-black text-black placeholder-black/50 shadow-[3px_3px_0px_#000000] focus:bg-[#fcffe0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000000] focus:outline-none cursor-pointer"
                >
                  <option value="Admissions & Outreach">Admissions & Outreach</option>
                  <option value="Student Affairs & Hostels">Student Affairs & Hostels</option>
                  <option value="Academics & Examination">Academics & Examination</option>
                  <option value="Fee & Scholarships Cell">Fee & Scholarships Cell</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                Target Language Support
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`p-2.5 rounded-xl text-xs font-black border-2 border-black text-left transition-all cursor-pointer ${
                      selectedLanguage === lang
                        ? "bg-[#d6ff38] text-black shadow-[3px_3px_0px_#000000] -translate-y-0.5"
                        : "bg-white text-black shadow-[2px_2px_0px_#000000] hover:bg-[#fcffe0]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: VOICE & SYNTHESIS */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
                Select Neural Voice Persona
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {voices.map((v) => (
                  <div
                    key={v.name}
                    onClick={() => setSelectedVoice(v.name)}
                    className={`p-3.5 rounded-xl border-2 border-black cursor-pointer transition-all ${
                      selectedVoice === v.name
                        ? "bg-[#d6ff38] text-black shadow-[3px_3px_0px_#000000] -translate-y-0.5"
                        : "bg-white text-black shadow-[2px_2px_0px_#000000] hover:bg-[#fcffe0]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-black text-[#d6ff38] border border-black flex items-center justify-center font-black text-xs">
                          {v.gender === "Female" ? "F" : "M"}
                        </div>
                        <div>
                          <div className="font-black text-black text-sm">
                            {v.name}
                          </div>
                          <div className="text-[10px] font-bold text-black/70">
                            {v.accent}
                          </div>
                        </div>
                      </div>

                      {selectedVoice === v.name && (
                        <div className="w-5 h-5 rounded-full bg-black text-[#d6ff38] flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-black/20 flex items-center justify-between text-xs font-bold">
                      <span className="text-[11px] text-black/80">
                        {v.tone}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingVoice(!isPlayingVoice);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-black text-black underline"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Preview Voice</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#fcffe0] border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-between text-xs text-black">
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
                Adaptive Voice Activity Detection (VAD) Enabled
              </span>
              <span className="font-mono text-xs font-black bg-black text-[#d6ff38] px-2 py-0.5 rounded">
                120ms latency
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: CONTEXT & SYSTEM INSTRUCTIONS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5">
                Agent System Prompt & Instructions
              </label>
              <textarea
                rows={5}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-3.5 rounded-xl text-xs bg-white border-2 border-black text-black font-mono font-bold leading-relaxed shadow-[3px_3px_0px_#000000] focus:bg-[#fcffe0] focus:outline-none"
                placeholder="Define role guidelines, clinical guardrails, escalation triggers..."
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[#d6ff38] border-2 border-black shadow-[3px_3px_0px_#000000] flex items-start gap-3 text-xs text-black">
              <Sparkles className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[3]" />
              <div>
                <strong className="font-black block mb-0.5 uppercase">
                  Auto-grounded with University Prospectus
                </strong>
                <span className="font-bold text-black/80">
                  This agent will have real-time access to tuition fee slabs, syllabus, hostel rules, and merit cutoffs.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t-2 border-black">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
              className="px-4 py-2 rounded-xl text-xs font-black text-black bg-white hover:bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((prev) => (prev + 1) as 1 | 2 | 3)}
              className="px-5 py-2.5 rounded-xl text-xs font-black text-black bg-[#d6ff38] hover:bg-[#cbf72e] border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              Next Step
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl text-xs font-black text-black bg-[#d6ff38] hover:bg-[#cbf72e] border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Deploy AI Agent
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
