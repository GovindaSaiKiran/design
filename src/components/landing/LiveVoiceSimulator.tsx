"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, Sparkles, Check, ArrowRight, ShieldCheck, Clock, Zap } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface LiveVoiceSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_QUERIES = [
  {
    id: "fees",
    title: "B.Tech CSE Fee Structure",
    studentPrompt: "What is the total fee for 4-year B.Tech CSE, and can I pay in installments?",
    mayaResponse: "The B.Tech CSE annual tuition is $9,500 ($4,750 per semester). You can pay in two equal semester installments. There are no additional laboratory or library charges.",
    citation: "Official Fee Matrix 2026-27 • Page 4",
    qualification: "Qualified • High Intent",
    color: "bg-[#ffe600]"
  },
  {
    id: "scholarship",
    title: "94% CBSE Merit Scholarship",
    studentPrompt: "I scored 94% in CBSE 12th. Am I eligible for any tuition fee scholarship?",
    mayaResponse: "Congratulations! With 94%, you qualify for our Chancellor's Tier-1 Merit Scholarship, which grants a 35% tuition waiver for all 4 years.",
    citation: "Scholarship Policy 2026 • Section 3.1",
    qualification: "Tier-1 Merit Qualified (35% Waiver)",
    color: "bg-[#a3e635]"
  },
  {
    id: "nri",
    title: "NRI / International Quota",
    studentPrompt: "Do you have an NRI quota for applicants residing in Dubai, UAE?",
    mayaResponse: "Yes, we reserve 15% supernumerary seats under the NRI/International category. Admission is based on SAT scores or Grade 12 equivalent marks without mandatory state CET.",
    citation: "International Admissions Handbook • Page 8",
    qualification: "International / NRI Category",
    color: "bg-[#00f0ff]"
  },
  {
    id: "hostel",
    title: "Hostel & AC Accommodation",
    studentPrompt: "What are the hostel room options, and is AC available for first-year students?",
    mayaResponse: "Yes, first-year students have priority access to Twin-Sharing AC rooms ($2,200/yr) and Triple-Sharing Non-AC ($1,500/yr), inclusive of meal plans and WiFi.",
    citation: "Hostel & Living Guide • Section 5.2",
    qualification: "Residential Inquiry",
    color: "bg-[#c084fc]"
  }
];

export default function LiveVoiceSimulator({ isOpen, onClose }: LiveVoiceSimulatorProps) {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_QUERIES[0]);
  const [customInput, setCustomInput] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const [displayedText, setDisplayedText] = useState("");
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const triggerSimulation = (queryItem: typeof PRESET_QUERIES[0]) => {
    setSelectedPreset(queryItem);
    setIsSimulating(true);
    setActiveStep("listening");
    setDisplayedText("");
    soundSynth.playCallChime();

    // Step 1: Listening
    setTimeout(() => {
      setActiveStep("processing");

      // Step 2: Processing (600ms latency simulation)
      setTimeout(() => {
        setActiveStep("speaking");
        soundSynth.playMayaSpeakingBeep(580);

        // Step 3: Progressive streaming text
        let charIndex = 0;
        const fullText = queryItem.mayaResponse;

        if (typingTimerRef.current) clearInterval(typingTimerRef.current);

        typingTimerRef.current = setInterval(() => {
          charIndex += 3;
          if (charIndex >= fullText.length) {
            setDisplayedText(fullText);
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            setIsSimulating(false);
            setActiveStep("idle");
          } else {
            setDisplayedText(fullText.slice(0, charIndex));
            if (charIndex % 15 === 0) {
              soundSynth.playMayaSpeakingBeep(520 + Math.random() * 80);
            }
          }
        }, 35);
      }, 650);
    }, 1200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const customQuery = {
      id: "custom",
      title: "Custom Inquiry",
      studentPrompt: customInput,
      mayaResponse: `Regarding "${customInput}": Based on Apex University 2026 Guidelines, all undergraduate applications are open until October 15th. Eligibility requires a minimum 60% aggregate in 10+2. Would you like me to connect you with an advisor or send the prospectus?`,
      citation: "Apex Institutional Knowledge Base • Real-time RAG Search",
      qualification: "Custom Inquiry • Lead Captured",
      color: "bg-[#ffe600]"
    };

    triggerSimulation(customQuery);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-black shadow-[12px_12px_0px_#000] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b-3 border-black flex items-center justify-between bg-[#ffe600]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-[#ffe600] flex items-center justify-center font-syne font-black text-base shadow-[2px_2px_0px_#fff]">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne font-black text-black text-base">Maya AI Voice Simulator</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-space font-black bg-black text-[#a3e635] px-2 py-0.5 rounded shadow-[1px_1px_0px_#fff]">
                  LIVE ENGINE
                </span>
              </div>
              <p className="text-xs text-black font-sans font-medium">Test sub-second latency and verified document citations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black text-white hover:bg-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer shadow-[2px_2px_0px_#fff]"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#fffdf5]">
          {/* Preset Inquiries */}
          <div>
            <label className="block text-xs font-space font-black text-black uppercase tracking-wider mb-2.5">
              Select a Sample Admission Query
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-space">
              {PRESET_QUERIES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => triggerSimulation(item)}
                  disabled={isSimulating}
                  className={`text-left p-3.5 rounded-2xl border-2 border-black transition-all cursor-pointer ${
                    selectedPreset.id === item.id
                      ? `${item.color} text-black shadow-[4px_4px_0px_#000] font-black translate-x-[-1px] translate-y-[-1px]`
                      : "bg-white text-black hover:bg-slate-50 shadow-[2px_2px_0px_#000] font-bold"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-xs text-black">{item.title}</span>
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-800 line-clamp-1 italic font-sans font-medium">
                    "{item.studentPrompt}"
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Stage */}
          <div className="bg-black text-white rounded-2xl p-5 border-3 border-black shadow-[6px_6px_0px_#000] relative overflow-hidden">
            {/* Visualizer Background */}
            <div className="flex items-center justify-between mb-3 border-b-2 border-slate-800 pb-3 font-space">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-xs font-black text-white">LIVE TELEPHONY STREAM</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#00f0ff]" /> Latency: 480ms
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" /> 100% Grounded
                </span>
              </div>
            </div>

            {/* Caller Prompt Bubble */}
            <div className="bg-slate-900 rounded-xl p-3.5 mb-3 border-2 border-slate-700 font-sans shadow-[2px_2px_0px_#333]">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-space font-black text-[#00f0ff]">PROSPECTIVE APPLICANT</span>
                <span className="text-[10px] font-mono">00:14</span>
              </div>
              <p className="text-sm text-white font-medium italic">
                "{selectedPreset.studentPrompt}"
              </p>
            </div>

            {/* Voice Wave Animation */}
            {isSimulating && (
              <div className="flex items-center justify-center gap-1.5 py-3 font-space">
                <div className="w-1.5 bg-[#ffe600] rounded-full animate-wave-1" />
                <div className="w-1.5 bg-[#00f0ff] rounded-full animate-wave-2" />
                <div className="w-1.5 bg-[#a3e635] rounded-full animate-wave-3" />
                <div className="w-1.5 bg-[#ff53cd] rounded-full animate-wave-4" />
                <div className="w-1.5 bg-[#ffe600] rounded-full animate-wave-5" />
                <span className="text-xs text-[#ffe600] ml-3 font-black">
                  {activeStep === "listening" && "Maya listening..."}
                  {activeStep === "processing" && "Searching institutional RAG knowledge..."}
                  {activeStep === "speaking" && "Synthesizing natural voice response..."}
                </span>
              </div>
            )}

            {/* Maya Response Output */}
            <div className="bg-[#ffe600] text-black rounded-xl p-4 border-2 border-black shadow-[4px_4px_0px_#fff] min-h-[90px] font-sans">
              <div className="flex items-center justify-between text-xs text-black mb-1.5 font-space">
                <span className="font-black flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-black" />
                  MAYA (AI ADMISSION COUNSELOR)
                </span>
                <span className="text-[10px] font-mono bg-black text-[#ffe600] px-2 py-0.5 rounded font-bold">
                  {selectedPreset.citation}
                </span>
              </div>
              <p className="text-sm text-black font-semibold leading-relaxed">
                {displayedText || selectedPreset.mayaResponse}
              </p>
            </div>

            {/* Structured Intelligence Tag */}
            <div className="mt-3 pt-3 border-t-2 border-slate-800 flex items-center justify-between text-xs text-slate-300 font-space font-bold">
              <span>Qualification Status:</span>
              <span className="font-black text-black bg-[#a3e635] px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_#fff]">
                {selectedPreset.qualification}
              </span>
            </div>
          </div>

          {/* Custom Typed Question Form */}
          <div>
            <form onSubmit={handleCustomSubmit} className="flex gap-2.5">
              <input
                type="text"
                placeholder="Or type a custom question (e.g. 'What is the hostel curfew?')..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 px-4 py-3 text-sm bg-white border-2 border-black rounded-xl focus:bg-[#ffe600]/20 outline-none font-sans font-medium shadow-[3px_3px_0px_#000]"
              />
              <button
                type="submit"
                className="neo-btn neo-btn-primary px-5 py-3 rounded-xl text-sm font-black flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                Ask Maya
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#fffdf5] border-t-2 border-black flex items-center justify-between text-xs text-black font-space font-bold">
          <span>Trained on university policy PDFs. 0% Hallucination.</span>
          <button
            onClick={onClose}
            className="neo-btn bg-black text-white px-4 py-2 rounded-xl font-black text-xs cursor-pointer shadow-[2px_2px_0px_#000]"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
}
