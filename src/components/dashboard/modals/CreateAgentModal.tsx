"use client";

import React, { useState } from "react";
import {
  X,
  Bot,
  ChevronRight,
  ChevronLeft,
  Check,
  Play,
  Volume2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import type { AIAgent } from "@/data/mock/dashboardData";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentCreated?: (agent: AIAgent) => void;
}

export default function CreateAgentModal({
  isOpen,
  onClose,
  onAgentCreated,
}: CreateAgentModalProps) {
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("University Admissions Desk");
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi + English (Bilingual)");
  const [selectedVoice, setSelectedVoice] = useState("Maya (Warm Admissions Pro)");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an empathetic, authoritative admissions counselor. Answer questions regarding cutoffs, seat matrices, scholarships, and campus facilities accurately using institutional knowledge."
  );

  if (!isOpen) return null;

  const languages = [
    "Hindi + English (Bilingual)",
    "Telugu + English (Bilingual)",
    "Tamil + English (Bilingual)",
    "Kannada + English (Bilingual)",
    "Bengali + English (Bilingual)",
    "Marathi + English (Bilingual)",
    "Global English (Neutral Accent)",
  ];

  const voices = [
    { name: "Maya (Warm Admissions Pro)", style: "Empathetic, clear, professional female tone" },
    { name: "Vikram (Executive Voice)", style: "Calm, authoritative, executive male tone" },
    { name: "Neha (Academic Advisor)", style: "Supportive, energetic, articulate female tone" },
    { name: "Rohan (Technical Specialist)", style: "Direct, knowledgeable male tone" },
    { name: "Ishita (Student Counselor)", style: "Gentle, helpful, youth-friendly female tone" },
    { name: "Ananya (International Desk)", style: "Global neutral English, refined female tone" },
  ];

  const handleClose = () => {
    try {
      soundSynth.play("click");
    } catch {}
    setStep(1);
    onClose();
  };

  const handleNextStep = () => {
    try {
      soundSynth.play("click");
    } catch {}
    if (step === 1 && !name.trim()) {
      alert("Please provide an agent title before continuing.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    try {
      soundSynth.play("click");
    } catch {}
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSave = () => {
    try {
      soundSynth.play("confirm");
      soundSynth.speak(`Voice Agent ${name || "New Persona"} deployed successfully.`);
    } catch {}

    const newId = `agt_${Date.now()}`;
    onAgentCreated?.({
      id: newId,
      name: name || "Custom AI Voice Agent",
      role: role || "Admissions Desk",
      department: department,
      status: "active",
      language: selectedLanguage,
      voice: {
        name: selectedVoice,
        gender: selectedVoice.includes("Female") || selectedVoice.includes("Maya") || selectedVoice.includes("Neha") || selectedVoice.includes("Ishita") || selectedVoice.includes("Ananya") ? "Female" : "Male",
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-150 select-none cursor-default"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-[28px] border border-black/[0.08] shadow-2xl p-6 sm:p-7 overflow-hidden text-[#1A1A1A]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A7F5] text-[#3B0764] flex items-center justify-center shrink-0 font-bold shadow-2xs">
              <Bot className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">
                VOICE AGENT CREATOR
              </span>
              <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                Create AI Voice Agent
              </h3>
              <p className="text-xs text-black/50">
                Step {step} of 3 • Persona, Speech Synthesis &amp; Grounding
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
            className="p-1.5 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 pointer-events-none" />
          </button>
        </div>

        {/* Step Tabs Indicator */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <div className={`h-1.5 rounded-full transition-all duration-150 ${step >= 1 ? "bg-[#111111]" : "bg-black/10"}`} />
          <div className={`h-1.5 rounded-full transition-all duration-150 ${step >= 2 ? "bg-[#111111]" : "bg-black/10"}`} />
          <div className={`h-1.5 rounded-full transition-all duration-150 ${step >= 3 ? "bg-[#111111]" : "bg-black/10"}`} />
        </div>

        {/* STEP 1: IDENTITY & ROLE */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                Agent Name &amp; Role
              </label>
              <input
                type="text"
                placeholder="e.g. Maya AI — Senior Admissions &amp; Scholarship Specialist"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FBF7ED]/60 border border-black/[0.08] focus:border-black/40 text-[#1A1A1A] placeholder:text-black/40 focus:outline-none transition-all text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Admissions Domain / Intent
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech Cutoffs &amp; Fee Waivers"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FBF7ED]/60 border border-black/[0.08] focus:border-black/40 text-[#1A1A1A] placeholder:text-black/40 focus:outline-none transition-all text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FBF7ED]/60 border border-black/[0.08] text-[#1A1A1A] focus:outline-none focus:border-black/40 cursor-pointer transition-all text-xs"
                >
                  <option value="University Admissions Desk">University Admissions Desk</option>
                  <option value="Executive &amp; EdTech Training">Executive &amp; EdTech Training</option>
                  <option value="Campus Operations &amp; Student Affairs">Campus Operations &amp; Student Affairs</option>
                  <option value="Tuition Fee Installments &amp; Loan Desk">Tuition Fee Installments &amp; Loan Desk</option>
                  <option value="Placements &amp; Career Pathways">Placements &amp; Career Pathways</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-2">
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
                    className={`p-2.5 rounded-2xl text-xs text-left transition-all cursor-pointer border ${
                      selectedLanguage === lang
                        ? "bg-[#FBF7ED] text-[#1A1A1A] font-bold border-black/30 shadow-2xs ring-1 ring-black/5"
                        : "bg-white text-black/60 hover:text-[#1A1A1A] border-black/[0.06] hover:bg-[#FAF7F0]"
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
          <div className="space-y-4 animate-in fade-in duration-150 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-2.5">
                Select Ready-Made Voice
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
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-[#FBF7ED] text-[#1A1A1A] border-black/30 shadow-2xs ring-1 ring-black/5"
                          : "bg-white border-black/[0.06] text-[#1A1A1A] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-[#111111] text-white" : "bg-[#FBF7ED] text-black/60 border border-black/[0.06]"
                        }`}>
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                        <div>
                          <div className="font-bold text-xs">
                            {v.name}
                          </div>
                          <div className="text-[10px] text-black/50">
                            {v.style}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] flex items-center justify-between text-xs text-black/60">
              <span className="flex items-center gap-2 font-medium">
                <Volume2 className="w-4 h-4 text-[#16856B]" />
                Low-Latency WebSocket Streaming (~140ms acoustic response)
              </span>
              <span className="text-[10px] font-bold text-[#16856B] bg-[#E8F5EF] px-2.5 py-0.5 rounded-full">
                Active Tier
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: CONTEXT & SYSTEM INSTRUCTIONS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                Agent System Instructions &amp; Role Guidelines
              </label>
              <textarea
                rows={5}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-3.5 rounded-2xl text-xs bg-[#FBF7ED]/60 border border-black/[0.08] text-[#1A1A1A] leading-relaxed focus:border-black/40 focus:outline-none transition-all"
                placeholder="Define role guidelines, admissions guardrails, escalation triggers..."
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E8F5EF] border border-[#16856B]/20 flex items-start gap-3 text-xs text-[#16856B]">
              <ShieldCheck className="w-4 h-4 text-[#16856B] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-0.5">
                  Zero-Hallucination Institutional Knowledge Grounding
                </strong>
                <span className="text-black/60 leading-relaxed text-[11px]">
                  This agent is automatically bound to your uploaded institutional documents, cutoff matrices, and fee schedules with automated citations.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-black/[0.06]">
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 rounded-full text-xs font-semibold text-black/60 hover:text-[#1A1A1A] bg-white hover:bg-[#FAF3E4] border border-black/[0.08] transition-all inline-flex items-center gap-1 cursor-pointer"
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
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-black transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-black transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Deploy Voice Agent</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
