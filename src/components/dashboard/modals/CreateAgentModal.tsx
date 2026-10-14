"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Bot,
  Check,
  ChevronRight,
  ChevronLeft,
  Play,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { DashboardAgent } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";

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
  const [department, setDepartment] = useState("University Admissions Desk");
  const [selectedVoice, setSelectedVoice] = useState("Ritu (Hindi Expressive)");
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi + English Bilingual");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an admissions specialist for the University. Greet prospective applicants and parents with respectful Indian honorifics (Aap/Namaste/Namaskaram). Explain B.Tech CSE (AI & Robotics) and Data Science programs, calculate merit scholarship fee waivers from PCM percentages, and book campus counseling sessions with zero hallucination."
  );

  const handleClose = () => {
    try {
      soundSynth.play("click");
    } catch {
      // safe fallback
    }
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const voices = [
    { name: "Ritu (Hindi Expressive)", gender: "Female", lang: "Hindi", style: "Expressive • Emotional", code: "VOX-HIN-01" },
    { name: "Neha (Telugu Warm)", gender: "Female", lang: "Telugu", style: "Warm • Natural", code: "VOX-TEL-02" },
    { name: "Ishita (Kannada Academic)", gender: "Female", lang: "Kannada", style: "Clear • Academic", code: "VOX-KAN-03" },
    { name: "Suhani (Bengali Empathetic)", gender: "Female", lang: "Bengali", style: "Gentle • Empathetic", code: "VOX-BEN-04" },
    { name: "Shubh (Hindi Formal)", gender: "Male", lang: "Hindi", style: "Deep • Authoritative", code: "VOX-HIN-05" },
    { name: "Vikram (Global English)", gender: "Male", lang: "Indian English", style: "Direct • Professional", code: "VOX-ENG-06" },
  ];

  const languages = [
    "Hindi + English Bilingual",
    "Telugu + English",
    "Kannada + English",
    "Bengali + English",
    "Tamil + English",
    "Marathi + English",
  ];

  const handleNextStep = () => {
    try {
      soundSynth.play("click");
    } catch {}
    setStep((prev) => (prev + 1) as 1 | 2 | 3);
  };

  const handlePrevStep = () => {
    try {
      soundSynth.play("click");
    } catch {}
    setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const handleSave = () => {
    try {
      soundSynth.play("confirm");
    } catch {}
    onAgentCreated?.({
      name: name || "Maya AI (Admissions Coordinator)",
      role: role || "B.Tech & Merit Scholarship Counselor",
      department,
      status: "active",
      language: selectedLanguage,
      voice: {
        name: selectedVoice,
        gender: selectedVoice.includes("Female") || selectedVoice.includes("Ritu") || selectedVoice.includes("Neha") || selectedVoice.includes("Ishita") || selectedVoice.includes("Suhani") ? "Female" : "Male",
        accent: "Indian English / Indic Regional",
      },
      systemPromptPreview: systemPrompt,
      callsToday: 0,
      accuracy: 99.4,
      assignedNumber: "+91 40 4590 1199",
      activeLiveCount: 0,
    });
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 select-none cursor-default"
    >
      <div className="relative w-full max-w-2xl bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl p-6 sm:p-7 overflow-hidden text-white font-sans">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[2px] bg-white text-black flex items-center justify-center shrink-0 border border-white">
              <Bot className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A1AA]">
                VOICE ENGINE WORKFORCE // PROVISIONING
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                Provision Indic AI Voice Persona
              </h3>
              <p className="text-[11px] text-[#A1A1AA] font-mono">
                Step {step} of 3 • Persona, Speech Synthesis & Grounding Guardrails
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close modal"
            className="p-1.5 rounded-[2px] bg-[#121215] border border-[#27272A] hover:border-white text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 pointer-events-none" />
          </button>
        </div>

        {/* Step Tabs Indicator */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <div className={`h-1 rounded-[1px] transition-all duration-150 ${step >= 1 ? "bg-white" : "bg-[#27272A]"}`} />
          <div className={`h-1 rounded-[1px] transition-all duration-150 ${step >= 2 ? "bg-white" : "bg-[#27272A]"}`} />
          <div className={`h-1 rounded-[1px] transition-all duration-150 ${step >= 3 ? "bg-white" : "bg-[#27272A]"}`} />
        </div>

        {/* STEP 1: IDENTITY & ROLE */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                Agent Name &amp; Title
              </label>
              <input
                type="text"
                placeholder="e.g. Maya AI — Senior Admissions & Scholarship Specialist"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-[2px] text-xs font-mono bg-[#121215] border border-[#27272A] focus:border-white text-white placeholder:text-[#71717A] focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                  Admissions Domain / Intent
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech Cutoffs & Fee Waivers"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-[2px] text-xs font-mono bg-[#121215] border border-[#27272A] focus:border-white text-white placeholder:text-[#71717A] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-[2px] text-xs font-mono bg-[#121215] border border-[#27272A] text-white focus:outline-none focus:border-white cursor-pointer transition-all"
                >
                  <option value="University Admissions Desk">University Admissions Desk</option>
                  <option value="Executive & EdTech Training">Executive & EdTech Training</option>
                  <option value="Campus Operations & Student Affairs">Campus Operations & Student Affairs</option>
                  <option value="Tuition Fee Installments & Loan Desk">Tuition Fee Installments & Loan Desk</option>
                  <option value="Placements & Career Pathways">Placements & Career Pathways</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-2">
                Primary Regional Language Pair
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      soundSynth.play("click");
                      setSelectedLanguage(lang);
                    }}
                    className={`p-2 rounded-[2px] text-xs font-mono text-left transition-all cursor-pointer border ${
                      selectedLanguage === lang
                        ? "bg-white text-black font-bold border-white shadow-2xs"
                        : "bg-[#121215] text-[#A1A1AA] hover:text-white border-[#27272A] hover:border-white"
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
              <label className="block text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-2.5">
                Select Neural Voice Persona
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {voices.map((v) => {
                  const isSelected = selectedVoice === v.name;
                  return (
                    <div
                      key={v.name}
                      onClick={() => {
                        soundSynth.play("click");
                        setSelectedVoice(v.name);
                      }}
                      className={`p-3 rounded-[2px] border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-white text-black border-white shadow-2xs"
                          : "bg-[#121215] border-[#27272A] text-white hover:border-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-[1px] flex items-center justify-center shrink-0 border ${
                          isSelected ? "bg-black text-white border-black" : "bg-[#18181B] text-white border-[#27272A]"
                        }`}>
                          <Play className={`w-3 h-3 fill-current ml-0.5 ${isSelected ? "text-white" : "text-[#A1A1AA]"}`} />
                        </div>
                        <div>
                          <div className={`font-bold font-mono text-xs ${isSelected ? "text-black" : "text-white"}`}>
                            {v.name}
                          </div>
                          <div className={`text-[10px] font-mono ${isSelected ? "text-zinc-600" : "text-[#71717A]"}`}>
                            {v.style}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-[1px] bg-black text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2 text-[#A1A1AA]">
                <Terminal className="w-3.5 h-3.5 text-white" />
                WebSocket Low-Latency Streaming (~140ms TTFB)
              </span>
              <span className="font-mono text-[10px] font-bold text-white bg-[#18181B] px-2 py-0.5 rounded-[1px] border border-[#27272A]">
                STIR/SHAKEN A
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: CONTEXT & SYSTEM INSTRUCTIONS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-mono font-bold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                Agent System Prompt &amp; Instructions
              </label>
              <textarea
                rows={5}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-3.5 rounded-[2px] text-xs bg-[#121215] border border-[#27272A] text-white font-mono leading-relaxed focus:border-white focus:outline-none transition-all shadow-2xs"
                placeholder="Define role guidelines, admissions guardrails, escalation triggers..."
              />
            </div>

            <div className="p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] flex items-start gap-3 text-xs font-mono text-white shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-0.5 text-white uppercase tracking-wider text-[11px]">
                  Zero-Hallucination Grounding with Institutional RAG Store
                </strong>
                <span className="text-[#A1A1AA] leading-relaxed text-[11px]">
                  This voice agent is bound to your uploaded admissions brochure, cutoff matrices, and fee schedules with automated citations.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-[#27272A]">
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 rounded-[2px] text-xs font-mono font-bold text-[#A1A1AA] hover:text-white bg-[#121215] hover:bg-[#18181B] border border-[#27272A] hover:border-white transition-all inline-flex items-center gap-1 cursor-pointer uppercase"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={handleNextStep}
              className="px-5 py-2 rounded-[2px] text-xs font-mono font-bold text-black bg-white hover:bg-zinc-200 border border-white shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer uppercase active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-[2px] text-xs font-mono font-bold text-black bg-white hover:bg-zinc-200 border border-white shadow-2xs transition-all inline-flex items-center gap-2 cursor-pointer uppercase active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Deploy Voice Agent</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
