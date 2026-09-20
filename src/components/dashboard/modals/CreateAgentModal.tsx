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
  ShieldCheck,
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
  const [department, setDepartment] = useState("University Admissions Desk");
  const [selectedVoice, setSelectedVoice] = useState("Ritu (Hindi Expressive)");
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi + English Bilingual");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an admissions specialist for the University. Greet prospective applicants and parents with respectful Indian honorifics (Aap/Namaste/Namaskaram). Explain B.Tech CSE (AI & Robotics) and Data Science programs, calculate merit scholarship fee waivers from PCM percentages, and book campus counseling sessions with zero hallucination."
  );
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  if (!isOpen) return null;

  const voices = [
    { name: "Ritu (Hindi Expressive)", gender: "Female", lang: "Hindi", style: "Expressive • Emotional", discClass: "sarvam-disc-periwinkle" },
    { name: "Neha (Telugu Warm)", gender: "Female", lang: "Telugu", style: "Warm • Natural", discClass: "sarvam-disc-peach" },
    { name: "Ishita (Kannada Academic)", gender: "Female", lang: "Kannada", style: "Clear • Academic", discClass: "sarvam-disc-sage" },
    { name: "Suhani (Bengali Empathetic)", gender: "Female", lang: "Bengali", style: "Gentle • Empathetic", discClass: "sarvam-disc-rose" },
    { name: "Shubh (Hindi Formal)", gender: "Male", lang: "Hindi", style: "Deep • Authoritative", discClass: "sarvam-disc-amber" },
    { name: "Vikram (Global English)", gender: "Male", lang: "Indian English", style: "Direct • Professional", discClass: "sarvam-disc-cyan" },
  ];

  const languages = [
    "Hindi + English Bilingual",
    "Telugu + English",
    "Kannada + English",
    "Bengali + English",
    "Tamil + English",
    "Marathi + English",
  ];

  const handleSave = () => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-900">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 font-serif">~ 𑁍 Bulbul V3 Engine 𑁍 ~</div>
              <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
                Create Indic AI Voice Agent
              </h3>
              <p className="text-xs text-neutral-500">
                Step {step} of 3 • Persona, Speech Synthesis & Grounding Guardrails
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Tabs Indicator */}
        <div className="grid grid-cols-3 gap-2.5 my-6">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 1 ? "bg-neutral-900" : "bg-neutral-200"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 2 ? "bg-neutral-900" : "bg-neutral-200"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 3 ? "bg-neutral-900" : "bg-neutral-200"
            }`}
          />
        </div>

        {/* STEP 1: IDENTITY & ROLE */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Agent Name & Title
              </label>
              <input
                type="text"
                placeholder="e.g. Maya AI — Senior Admissions & Scholarship Specialist"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#fbfbfd] border border-black/10 focus:border-black/30 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Admissions Domain / Intent
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech Cutoffs & Fee Waivers"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-[#fbfbfd] border border-black/10 focus:border-black/30 focus:bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs font-medium bg-[#fbfbfd] border border-black/10 text-neutral-800 focus:outline-none focus:border-black cursor-pointer transition-all"
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
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                Primary Regional Language Pair
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`p-2.5 rounded-xl text-xs text-left transition-all cursor-pointer border ${
                      selectedLanguage === lang
                        ? "bg-neutral-900 text-white font-semibold border-neutral-900 shadow-xs"
                        : "bg-[#fbfbfd] text-neutral-700 hover:bg-neutral-100 border-black/10 font-medium"
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
              <label className="block text-xs font-semibold text-neutral-700 mb-2.5">
                Select Bulbul V3 Neural Voice Persona (3D Acoustic Clay)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-60 overflow-y-auto pr-1">
                {voices.map((v) => (
                  <div
                    key={v.name}
                    onClick={() => setSelectedVoice(v.name)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedVoice === v.name
                        ? "bg-neutral-50 border-neutral-900 shadow-sm ring-1 ring-neutral-900"
                        : "bg-[#fbfbfd] border-black/10 hover:border-black/30 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${v.discClass} flex items-center justify-center shrink-0 shadow-xs`}>
                        <div className="w-4 h-4 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-2 h-2 fill-current text-neutral-800 ml-0.5" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 text-xs">
                          {v.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          {v.style}
                        </div>
                      </div>
                    </div>

                    {selectedVoice === v.name && (
                      <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/10 flex items-center justify-between text-xs text-neutral-700">
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-amber-600" />
                WebSocket Low-Latency Streaming (~140ms TTFB)
              </span>
              <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Level A STIR/SHAKEN
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: CONTEXT & SYSTEM INSTRUCTIONS */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Agent System Prompt & Instructions
              </label>
              <textarea
                rows={5}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-4 rounded-xl text-xs bg-[#fbfbfd] border border-black/10 text-neutral-900 font-mono leading-relaxed focus:border-black/30 focus:bg-white focus:outline-none transition-all"
                placeholder="Define role guidelines, admissions guardrails, escalation triggers..."
              />
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3 text-xs text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">
                  Zero-Hallucination Grounding with Institutional RAG Store
                </strong>
                <span className="text-emerald-800 leading-relaxed">
                  This voice agent is bound to your uploaded admissions brochure, cutoff matrices, and fee schedules with automated citations.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-black/10">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-black/5 transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((prev) => (prev + 1) as 1 | 2 | 3)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 shadow-md transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Deploy Indic AI Agent</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
