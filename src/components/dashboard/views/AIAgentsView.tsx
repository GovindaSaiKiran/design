"use client";

import React, { useState } from "react";
import { DashboardAgent } from "@/types/dashboard";
import {
  ChevronDown,
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface AIAgentsViewProps {
  agents: DashboardAgent[];
  onCreateAgent: () => void;
  onEditAgent?: (agent: DashboardAgent) => void;
}

export default function AIAgentsView({
  agents,
  onCreateAgent,
  onEditAgent,
}: AIAgentsViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hindi");
  const [selectedVoice, setSelectedVoice] = useState<string>("Ritu");
  const [customPrompt, setCustomPrompt] = useState<string>(
    "भारत की सुबह का नज़ारा ही कुछ और होता है। चाय की चुस्की के साथ अख़बार, बच्चों की किलकारियां, और कॉलेज प्रवेश परामर्श की नई शुरुआत।"
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speedVal, setSpeedVal] = useState("1.0");
  const [activeDiscPlaying, setActiveDiscPlaying] = useState<string | null>(null);

  // Language options with authentic sample Indic text
  const languagePresets: Record<string, { prompt: string; voices: string[] }> = {
    Hindi: {
      prompt: "नमस्ते! हमारे कस्टमर केयर हेल्पलाइन में आपका स्वागत है। मैं आपकी सहायता के लिए तैयार हूँ।",
      voices: ["Ritu", "Shubh", "Shreya", "Manan"]
    },
    Telugu: {
      prompt: "నమస్కారం! మా కస్టమర్ సపోర్ట్ హెల్ప్‌లైన్‌కు స్వాగతం. మీ ప్రశ్నలకు సమాధానాలు అందించడానికి నేను ఇక్కడ ఉన్నాను.",
      voices: ["Neha", "Shashi", "Kavya", "Venkat"]
    },
    Tamil: {
      prompt: "வணக்கம்! எங்கள் வாடிக்கையாளர் ஆதரவு உதவி மையத்திற்கு வரவேற்கிறோம்.",
      voices: ["Ishita", "Anbu", "Priya", "Karthik"]
    },
    Kannada: {
      prompt: "ನಮಸ್ಕಾರ! ನಮ್ಮ ಗ್ರಾಹಕರ ಸೇವಾ ಸಹಾಯವಾಣಿಗೆ ಸುಸ್ವಾಗತ.",
      voices: ["Ishita", "Chetan", "Suhani", "Raghu"]
    },
    Marathi: {
      prompt: "नमस्कार! आमच्या ग्राहक सेवा हेल्पलाइनमध्ये आपले सहर्ष स्वागत आहे.",
      voices: ["Sneha", "Amol", "Ritu", "Vikram"]
    },
    Bengali: {
      prompt: "নমস্কার! আমাদের কাস্টমার সাপোর্ট হেল্পলাইনে আপনাকে স্বাগতম।",
      voices: ["Suhani", "Debnath", "Tanushree", "Ayan"]
    },
    English: {
      prompt: "Welcome to our customer service helpline. I can assist you with questions, service bookings, and support inquiries.",
      voices: ["Maya Pro", "Vikram", "Rohan", "Priya"]
    }
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    if (languagePresets[lang]) {
      setCustomPrompt(languagePresets[lang].prompt);
      setSelectedVoice(languagePresets[lang].voices[0]);
    }
  };

  // Voice personas
  const voiceDiscs = [
    {
      id: "ritu",
      name: "Ritu",
      lang: "Hindi",
      style: "Expressive • Emotional",
      accent: "Authentic North Indian Hindi",
      discClass: "sarvam-disc-periwinkle",
      tag: "Popular for Counseling"
    },
    {
      id: "neha",
      name: "Neha",
      lang: "Telugu",
      style: "Expressive • Emotional",
      accent: "Natural Coastal Andhra & Telangana",
      discClass: "sarvam-disc-peach",
      tag: "Low Latency 120ms"
    },
    {
      id: "ishita",
      name: "Ishita",
      lang: "Kannada",
      style: "Expressive • Warm",
      accent: "Bangalore & Mysuru Regional",
      discClass: "sarvam-disc-sage",
      tag: "Native Dialect"
    },
    {
      id: "suhani",
      name: "Suhani",
      lang: "Bengali",
      style: "Expressive • Emotional",
      accent: "Kolkata Standard Tone",
      discClass: "sarvam-disc-rose",
      tag: "Emotional Nuance"
    },
    {
      id: "shubh",
      name: "Shubh",
      lang: "Hindi",
      style: "Conversational • Formal",
      accent: "Delhi NCR Neutral Hindi",
      discClass: "sarvam-disc-amber",
      tag: "Authoritative"
    },
    {
      id: "vikram",
      name: "Vikram",
      lang: "Global English",
      style: "Executive • Direct",
      accent: "Pan-Indian Corporate English",
      discClass: "sarvam-disc-cyan",
      tag: "Executive Advisory"
    }
  ];

  const toggleDiscPlay = (id: string) => {
    if (activeDiscPlaying === id) {
      setActiveDiscPlaying(null);
    } else {
      setActiveDiscPlaying(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans select-none text-[#1A1A1A]">
      {/* 1. Header Card */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-xs font-semibold text-[#5B21B6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Indic Voice Personas & Fleets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              AI Voice Agents &amp; Personas
            </h1>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-sans">
              Configure, test, and deploy natural Indic voice personas for admissions counseling and student engagement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onCreateAgent}
              className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              Deploy New Voice Persona
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("speech-playground");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-full bg-[#FAF3E4] hover:bg-[#FAF3E4]/80 text-[#1A1A1A] text-xs font-semibold border border-black/[0.06] transition-all cursor-pointer shadow-2xs"
            >
              Try Interactive Playground
            </button>
          </div>
        </div>
      </div>

      {/* 2. Speech Playground Sandbox */}
      <div id="speech-playground" className="bg-white rounded-[26px] border border-black/[0.06] shadow-2xs overflow-hidden">
        {/* Top Playground Bar: Language Dropdown + Character Count */}
        <div className="p-5 sm:p-6 border-b border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] rounded-full pl-4 pr-10 py-2 text-xs font-semibold focus:outline-none focus:border-black/20 cursor-pointer transition-all"
              >
                {Object.keys(languagePresets).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-black/40 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <span className="text-[11px] text-black/50 font-medium hidden sm:inline-block">
              Bulbul V3 Indic Neural TTS
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-black/50">
            <span>{customPrompt.length} / 2000 chars</span>
            <span className="text-black/20">•</span>
            <span className="text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              ~140ms TTFB
            </span>
          </div>
        </div>

        {/* Text Area */}
        <div className="p-6 sm:p-7">
          <textarea
            rows={3}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full text-base sm:text-lg text-[#1A1A1A] font-normal leading-relaxed bg-transparent border-0 focus:outline-none resize-none placeholder:text-black/30"
            placeholder="Type text in any Indian language or select a voice..."
          />
        </div>

        {/* Voice Selection & Sliders Bar */}
        <div className="p-5 sm:p-6 bg-[#FAF3E4]/50 border-t border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Voices Pills */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-black/50 uppercase tracking-wider">
              Voices ({languagePresets[selectedLanguage]?.voices.length || 4} available)
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {languagePresets[selectedLanguage]?.voices.map((v) => {
                const isSelected = selectedVoice === v;
                return (
                  <button
                    key={v}
                    onClick={() => setSelectedVoice(v)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#111111] text-white border-[#111111] shadow-2xs"
                        : "bg-white text-black/70 hover:bg-black/5 border-black/[0.06]"
                    }`}
                  >
                    <span>{v}</span>
                    <span className="text-[10px] text-black/40">
                      {v.includes("a") || v.includes("i") || v.includes("Ritu") || v.includes("Neha") || v.includes("Suhani") || v.includes("Ishita") ? "Female" : "Male"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls: Speed & Play */}
          <div className="flex items-center gap-3 self-end md:self-center">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-black/[0.06] text-xs">
              <span className="text-black/40 text-[11px]">Speed:</span>
              <select
                value={speedVal}
                onChange={(e) => setSpeedVal(e.target.value)}
                className="bg-transparent font-mono text-[#1A1A1A] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="0.8">0.8x</option>
                <option value="1.0">1.0x</option>
                <option value="1.2">1.2x</option>
                <option value="1.5">1.5x</option>
              </select>
            </div>

            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold inline-flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pause Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Synthesize & Play</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Voice Personas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
              Emotion-rich Indic Voices
            </h2>
            <p className="text-xs text-black/50">
              Low-latency neural acoustic models calibrated for Indian dialects and educational terminology
            </p>
          </div>
          <span className="text-xs font-mono text-black/60 bg-white px-3 py-1 rounded-full border border-black/[0.06]">
            {voiceDiscs.length} Models
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {voiceDiscs.map((disc) => {
            const isPlaying = activeDiscPlaying === disc.id;

            return (
              <div
                key={disc.id}
                className="bg-white rounded-[26px] border border-black/[0.06] p-6 flex flex-col justify-between group relative overflow-hidden shadow-2xs hover:border-black/15 transition-all"
              >
                {/* 3D Organic Audio Disc Graphic */}
                <div className="flex items-center justify-center my-3 py-2">
                  <div
                    onClick={() => toggleDiscPlay(disc.id)}
                    className={`w-32 h-32 rounded-full ${disc.discClass} flex items-center justify-center cursor-pointer transition-transform duration-500 relative group-hover:scale-105 shadow-md ${
                      isPlaying ? "animate-spin-slow" : ""
                    }`}
                  >
                    {/* Inner Central Indent with White Play Button */}
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1A1A1A] shadow-md border border-white/60">
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-[#1A1A1A]" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-[#1A1A1A] ml-0.5" />
                      )}
                    </div>

                    {/* Outer Radial Ring */}
                    <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
                  </div>
                </div>

                {/* Disc Info */}
                <div className="pt-4 border-t border-black/[0.06]">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-[#1A1A1A]">
                      {disc.name}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-black/70 bg-[#FAF3E4] px-2.5 py-0.5 rounded-full border border-black/[0.06]">
                      {disc.lang}
                    </span>
                  </div>

                  <p className="text-xs text-black/50 mb-3">
                    {disc.style} • {disc.accent}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
                      {disc.tag}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedLanguage(disc.lang.includes("English") ? "English" : disc.lang);
                        setSelectedVoice(disc.name);
                        const el = document.getElementById("speech-playground");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs font-semibold text-[#1A1A1A] hover:text-black inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Test in Playground</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Autonomous Workflows */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-[11px] font-semibold text-[#5B21B6] mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Autonomous Workflows</span>
          </div>
          <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
            Set the outcome. Delegate the process.
          </h2>
          <p className="text-xs sm:text-sm text-black/60 mt-0.5">
            Describe the admissions counseling task and connect university knowledge documents. Voice Agents follow the process and log verified results.
          </p>
        </div>

        {/* 2 Flow Cards: Chat & Work */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inbound Voice Card */}
          <div className="bg-[#FAF3E4]/50 border border-black/[0.06] rounded-[20px] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7A4B00] bg-[#FFD9A0] px-2.5 py-0.5 rounded-full">
                Inbound Voice Inquiries
              </span>
              <span className="text-xs font-mono text-black/40">Direct Answering</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-black/[0.06] text-xs text-[#1A1A1A] italic shadow-2xs">
              &ldquo;Can you explain your enterprise SLA and whether you support SIP trunk peering with our existing PBX?&rdquo;
            </div>

            <p className="text-xs text-black/60 leading-relaxed">
              Synthesizes real-time verified answers from grounded knowledge bases and compliance policies with sub-140ms voice latency.
            </p>
          </div>

          {/* Outbound Calling Card */}
          <div className="bg-[#FAF3E4]/50 border border-black/[0.06] rounded-[20px] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
                Outbound Calling Batches
              </span>
              <span className="text-xs font-mono text-black/40">Multi-Step Execution</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-black/80 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B]" />
                <span>Verify enterprise inquiry requirements and volume</span>
              </div>
              <div className="flex items-center gap-2 text-black/80 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B]" />
                <span>Qualify customer for dedicated account executive discovery</span>
              </div>
              <div className="flex items-center gap-2 text-black/80 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B]" />
                <span>Schedule technical demonstration for Thursday 2:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-black/40">
                <span className="w-3.5 h-3.5 rounded-full border border-black/20 inline-block" />
                <span>Trigger WhatsApp confirmation calendar invite and summary</span>
              </div>
            </div>

            <p className="text-xs text-black/60 leading-relaxed">
              Executes autonomous multi-step voice campaigns and syncs qualified leads directly into your CRM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
