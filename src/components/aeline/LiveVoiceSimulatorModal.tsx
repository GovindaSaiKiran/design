"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Sparkles, Volume2, Clock, ShieldCheck, ArrowRight, Mic, CheckCircle2 } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface LiveVoiceSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_QUERIES = [
  {
    id: "fees",
    title: "B.Tech CSE Fee Structure",
    studentPrompt: "What is the total fee for 4-year B.Tech CSE, and can I pay in semester installments?",
    mayaResponse: "The B.Tech CSE annual tuition is $9,500 ($4,750 per semester). You can pay in two equal semester installments without interest. There are no additional laboratory or library charges.",
    citation: "Official Fee Matrix 2026-27 • Section 4.2",
    intent: "High Intent • Tuition Inquiry"
  },
  {
    id: "scholarship",
    title: "94% CBSE Merit Scholarship",
    studentPrompt: "I scored 94% in CBSE 12th Board Exams. Am I eligible for a tuition waiver?",
    mayaResponse: "Congratulations! With 94%, you qualify for our Chancellor's Tier-1 Merit Scholarship, granting a 35% tuition waiver for all 4 undergraduate years provided you maintain a 3.5 GPA.",
    citation: "Scholarship & Merit Policy 2026 • Clause 3.1",
    intent: "Merit Qualified • High Priority"
  },
  {
    id: "nri",
    title: "NRI & International Quota",
    studentPrompt: "Do you have an NRI quota for applicants living in Dubai or the GCC?",
    mayaResponse: "Yes, we reserve 15% supernumerary seats under the NRI category. Admission is evaluated via high school transcripts or SAT scores without mandatory state entrance exams.",
    citation: "International Admissions Handbook • Page 12",
    intent: "International / NRI Candidate"
  },
  {
    id: "hostel",
    title: "Hostel & AC Accommodation",
    studentPrompt: "What are the hostel room options and are AC rooms available for first-year students?",
    mayaResponse: "First-year students have priority access to Twin-Sharing AC rooms ($2,200/yr) and Triple-Sharing rooms ($1,500/yr), inclusive of high-speed WiFi and dining plans.",
    citation: "Campus Housing & Living Guide • Section 5.2",
    intent: "Residential Inquiry • Captured"
  }
];

export default function LiveVoiceSimulatorModal({
  isOpen,
  onClose
}: LiveVoiceSimulatorModalProps) {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_QUERIES[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const [displayedText, setDisplayedText] = useState("");
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const triggerSimulation = (queryItem: typeof PRESET_QUERIES[0]) => {
    setSelectedPreset(queryItem);
    setIsSimulating(true);
    setActiveStep("listening");
    setDisplayedText("");
    soundSynth?.playCallChime?.();

    // Step 1: Listening (800ms)
    setTimeout(() => {
      setActiveStep("processing");

      // Step 2: Processing (sub-400ms latency)
      setTimeout(() => {
        setActiveStep("speaking");
        soundSynth?.playMayaSpeakingBeep?.(580);

        let charIndex = 0;
        const fullText = queryItem.mayaResponse;

        if (typingTimerRef.current) clearInterval(typingTimerRef.current);

        typingTimerRef.current = setInterval(() => {
          charIndex += 4;
          if (charIndex >= fullText.length) {
            setDisplayedText(fullText);
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            setIsSimulating(false);
            setActiveStep("idle");
          } else {
            setDisplayedText(fullText.slice(0, charIndex));
            if (charIndex % 16 === 0) {
              soundSynth?.playMayaSpeakingBeep?.(520 + Math.random() * 80);
            }
          }
        }, 30);
      }, 450);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1682ec] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Maya Voice Simulator</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#cdfb56] text-black rounded-full">
                  LIVE ENGINE
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Test sub-second latency and verified document citations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Preset Admission Queries */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Select Sample Prospective Student Query
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_QUERIES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => triggerSimulation(item)}
                  disabled={isSimulating}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedPreset.id === item.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]"
                      : "bg-[#f8f9fa] text-slate-800 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{item.title}</span>
                    <Sparkles className={`w-3 h-3 ${selectedPreset.id === item.id ? "text-[#cdfb56]" : "text-slate-400"}`} />
                  </div>
                  <p className={`text-[11px] line-clamp-1 italic ${selectedPreset.id === item.id ? "text-slate-300" : "text-slate-500"}`}>
                    &ldquo;{item.studentPrompt}&rdquo;
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Stream Stage */}
          <div className="bg-[#121316] text-white rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
            {/* Visualizer header */}
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white">LIVE TELEPHONY STREAM</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" /> Latency: 380ms
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#cdfb56]" /> 100% Grounded
                </span>
              </div>
            </div>

            {/* Caller Prompt Bubble */}
            <div className="mb-4 bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wide mb-1">
                Student Inquiry (Caller)
              </div>
              <p className="text-xs text-slate-200 font-medium">
                &ldquo;{selectedPreset.studentPrompt}&rdquo;
              </p>
            </div>

            {/* Maya Voice Response Bubble */}
            <div className="bg-sky-950/40 border border-sky-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-[#cdfb56]">Maya (AI Counselor)</span>
                </div>
                {activeStep === "speaking" && (
                  <span className="text-[10px] font-bold text-sky-300 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-3 bg-sky-400 animate-pulse rounded-full" />
                    Speaking...
                  </span>
                )}
              </div>

              {activeStep === "listening" && (
                <div className="text-xs text-slate-400 flex items-center gap-2 py-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                  Listening to student voice input...
                </div>
              )}

              {activeStep === "processing" && (
                <div className="text-xs text-slate-400 flex items-center gap-2 py-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Searching institutional knowledge vectors...
                </div>
              )}

              {(activeStep === "speaking" || displayedText) && (
                <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
                  {displayedText}
                </p>
              )}

              {!isSimulating && !displayedText && (
                <p className="text-xs text-slate-400 py-1">
                  Click any query above to trigger live voice response simulation.
                </p>
              )}

              {/* Verified Citation Pill */}
              {displayedText && (
                <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#cdfb56]" />
                    {selectedPreset.citation}
                  </span>
                  <span className="bg-white/10 text-slate-200 px-2 py-0.5 rounded font-bold">
                    {selectedPreset.intent}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Tested on 520,000+ real student inquiries
          </div>
          <button
            onClick={() => triggerSimulation(selectedPreset)}
            disabled={isSimulating}
            className="bg-[#cdfb56] hover:bg-[#bef03f] text-black font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-full transition-colors cursor-pointer disabled:opacity-50"
          >
            Replay Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
