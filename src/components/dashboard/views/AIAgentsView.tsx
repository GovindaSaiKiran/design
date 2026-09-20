"use client";

import React, { useState, useMemo } from "react";
import { DashboardAgent } from "@/types/dashboard";
import {
  Search,
  ChevronDown,
  Bot,
  Plus,
  Mic,
  Globe,
  Sparkles,
  Phone,
  Play,
  Pause,
  Settings2,
  Volume2,
  CheckCircle2,
  X,
  Radio,
  Zap,
  Sliders,
  Flame,
  Layers,
  FileText,
  Check,
  RotateCcw,
  VolumeX,
  ArrowRight,
  Headphones,
  SlidersHorizontal
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
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [speedVal, setSpeedVal] = useState("1.0");
  const [expressionMode, setExpressionMode] = useState("Expressive");
  const [activeDiscPlaying, setActiveDiscPlaying] = useState<string | null>(null);

  // Language options with authentic sample Indic text
  const languagePresets: Record<string, { prompt: string; voices: string[] }> = {
    Hindi: {
      prompt: "भारत की सुबह का नज़ारा ही कुछ और होता है। चाय की चुस्की के साथ अख़बार, बच्चों की किलकारियां, और कॉलेज प्रवेश परामर्श की नई शुरुआत।",
      voices: ["Ritu", "Shubh", "Shreya", "Manan"]
    },
    Telugu: {
      prompt: "నమస్కారం! అపెక్స్ యూనివర్సిటీ B.Tech కంప్యూటర్ సైన్స్ మరియు ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ అడ్మిషన్ల వివరాల కోసం స్వాగతం.",
      voices: ["Neha", "Shashi", "Kavya", "Venkat"]
    },
    Tamil: {
      prompt: "வணக்கம்! அப்பெக்ஸ் பல்கலைக்கழகத்தின் பொறியியல் சேர்க்கை மற்றும் தகுதி உதவித்தொகை விவரங்களுக்கு வரவேற்கிறோம்.",
      voices: ["Ishita", "Anbu", "Priya", "Karthik"]
    },
    Kannada: {
      prompt: "ನಮಸ್ಕಾರ! ಅಪೆಕ್ಸ್ ಇಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜಿನ ಪ್ರವೇಶ ಮತ್ತು 35% ಚಾನ್ಸಲರ್ ಮೆರಿಟ್ ಸ್ಕಾಲರ್‌ಶಿಪ್ ವಿವರಗಳನ್ನು ತಿಳಿಯಿರಿ.",
      voices: ["Ishita", "Chetan", "Suhani", "Raghu"]
    },
    Marathi: {
      prompt: "नमस्कार! अपेक्स कॉलेजच्या बी.टेक इंजिनिअरिंग व मेरिट स्कॉलरशिप प्रवेश प्रक्रियेत आपले सहर्ष स्वागत आहे.",
      voices: ["Sneha", "Amol", "Ritu", "Vikram"]
    },
    Bengali: {
      prompt: "নমস্কার! অ্যাপেক্স ইনস্টিটিউট অব টেকনোলজির বি.টেক এবং উচ্চশিক্ষা ভর্তি পোর্টালে আপনাকে স্বাগতম।",
      voices: ["Suhani", "Debnath", "Tanushree", "Ayan"]
    },
    English: {
      prompt: "Welcome to Apex University Admissions Helpline. I can assist you with B.Tech cutoffs, Chancellor Scholarships, and campus hostel tours.",
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

  // Sarvam 3D claymorphic voice disc personas
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
    <div className="space-y-12 animate-in fade-in duration-300 font-sans select-none">
      {/* ========================================================================= */}
      {/* 1. SARVAM EDITORIAL HERO & ORNAMENTAL CREST                               */}
      {/* ========================================================================= */}
      <div className="text-center max-w-3xl mx-auto pt-4 pb-2 space-y-3">
        {/* Subtle Ornamental Filigree Emblem */}
        <div className="flex items-center justify-center gap-3 text-neutral-400">
          <span className="w-8 h-px bg-neutral-300" />
          <span className="text-xs font-serif tracking-widest uppercase">~ 𑁍 ~</span>
          <span className="w-8 h-px bg-neutral-300" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 font-serif-display leading-[1.15]">
          Text to Speech that feels natural across India&apos;s languages
        </h1>

        <p className="text-sm sm:text-base text-neutral-500 font-normal max-w-2xl mx-auto leading-relaxed">
          Turn text into voices that feel human, carry emotion, and sound natural in every admissions interaction.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onCreateAgent}
            className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
          >
            Deploy New Voice Persona
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("speech-playground");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-medium border border-black/10 transition-all cursor-pointer shadow-xs"
          >
            Try Interactive Playground
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SARVAM SPEECH PLAYGROUND SANDBOX (FROM TEMPLATE 1)                     */}
      {/* ========================================================================= */}
      <div id="speech-playground" className="max-w-4xl mx-auto liquid-glass-card rounded-3xl overflow-hidden">
        {/* Top Playground Bar: Language Dropdown + Character Count */}
        <div className="p-5 sm:p-6 border-b border-black/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border border-black/10 rounded-2xl pl-4 pr-10 py-2 text-xs font-medium focus:outline-none focus:border-black cursor-pointer transition-all"
              >
                {Object.keys(languagePresets).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline-block">
              Bulbul V3 Indic Neural TTS
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
            <span>{customPrompt.length} / 2000 chars</span>
            <span className="text-neutral-300">•</span>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-[11px] font-medium">
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
            className="w-full text-base sm:text-lg text-neutral-800 font-normal leading-relaxed bg-transparent border-0 focus:outline-none resize-none placeholder:text-neutral-400"
            placeholder="Type text in any Indian language or select a voice..."
          />
        </div>

        {/* Voice Selection & Sliders Bar */}
        <div className="p-5 sm:p-6 bg-neutral-50/70 border-t border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Voices Pills */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
              Voices ({languagePresets[selectedLanguage]?.voices.length || 4} available)
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {languagePresets[selectedLanguage]?.voices.map((v) => {
                const isSelected = selectedVoice === v;
                return (
                  <button
                    key={v}
                    onClick={() => setSelectedVoice(v)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                        : "bg-white text-neutral-700 hover:bg-neutral-100 border-black/10"
                    }`}
                  >
                    <span>{v}</span>
                    <span className="text-[10px] text-neutral-400">
                      {v.includes("a") || v.includes("i") || v.includes("Ritu") || v.includes("Neha") || v.includes("Suhani") || v.includes("Ishita") ? "Female" : "Male"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls: Speed, Expression & Play */}
          <div className="flex items-center gap-3 self-end md:self-center">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-black/10 text-xs">
              <span className="text-neutral-400 text-[11px]">Speed:</span>
              <select
                value={speedVal}
                onChange={(e) => setSpeedVal(e.target.value)}
                className="bg-transparent font-mono text-neutral-800 font-medium focus:outline-none cursor-pointer"
              >
                <option value="0.8">0.8x</option>
                <option value="1.0">1.0x</option>
                <option value="1.2">1.2x</option>
                <option value="1.5">1.5x</option>
              </select>
            </div>

            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="px-5 py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium inline-flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
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

      {/* ========================================================================= */}
      {/* 3. SARVAM 3D CLAYMORPHIC ORGANIC AUDIO DISCS (FROM TEMPLATE 1, PAGE 6)    */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Explore Voice Personas
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 font-serif-display">
            Emotion-rich and human-like Indic voices
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {voiceDiscs.map((disc) => {
            const isPlaying = activeDiscPlaying === disc.id;

            return (
              <div
                key={disc.id}
                className="liquid-glass-card rounded-3xl p-7 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* 3D Organic Audio Disc Graphic */}
                <div className="flex items-center justify-center my-4 py-2">
                  <div
                    onClick={() => toggleDiscPlay(disc.id)}
                    className={`w-36 h-36 rounded-full ${disc.discClass} flex items-center justify-center cursor-pointer transition-transform duration-500 relative group-hover:scale-105 shadow-xl ${
                      isPlaying ? "animate-spin-slow" : ""
                    }`}
                  >
                    {/* Inner Central Indent with White Play Button */}
                    <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-md border border-white/60">
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-neutral-900" />
                      ) : (
                        <Play className="w-4 h-4 fill-neutral-900 ml-0.5" />
                      )}
                    </div>

                    {/* Outer Organic Radial Rings */}
                    <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
                  </div>
                </div>

                {/* Disc Info */}
                <div className="pt-4 border-t border-black/5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-neutral-900 font-serif-display">
                      {disc.name}
                    </h3>
                    <span className="text-xs font-mono font-medium text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-black/5">
                      {disc.lang}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500 mb-3">
                    {disc.style} • {disc.accent}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {disc.tag}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedLanguage(disc.lang.includes("English") ? "English" : disc.lang);
                        setSelectedVoice(disc.name);
                        const el = document.getElementById("speech-playground");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs font-medium text-neutral-800 hover:text-blue-600 inline-flex items-center gap-1 cursor-pointer transition-colors"
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

      {/* ========================================================================= */}
      {/* 4. WORK AGENTS GOAL DELEGATION (FROM TEMPLATE 2, PAGE 1-3)                */}
      {/* ========================================================================= */}
      <div className="bg-neutral-50/90 rounded-3xl p-8 sm:p-10 border border-black/10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Autonomous Workflows
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 font-serif-display">
            Set the outcome. Delegate the process.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Describe the admissions counseling task and connect university knowledge documents. Voice Agents follows the process and logs verified results.
          </p>
        </div>

        {/* 2 Flow Cards: Chat & Work */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chat Card */}
          <div className="liquid-glass-subtle rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50/80 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                Inbound Voice Inquiries
              </span>
              <span className="text-xs font-mono text-neutral-400">Direct Answering</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-black/5 text-xs text-neutral-800 italic shadow-2xs">
              &ldquo;What is the cutoff score for B.Tech AI & Data Science and can I pay tuition in 3-part zero interest EMI?&rdquo;
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              Synthesizes real-time verified answers from college prospectus and scholarship slabs with zero hallucination.
            </p>
          </div>

          {/* Work Card */}
          <div className="liquid-glass-subtle rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Outbound Calling Batches
              </span>
              <span className="text-xs font-mono text-neutral-400">Multi-Step Execution</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-black/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verify student 12th Board PCM marks</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Qualify for 35% Chancellor Merit Scholarship</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Book campus visit slot for Saturday 11:00 AM</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 inline-block" />
                <span>Trigger WhatsApp confirmation pass with QR</span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              Executes autonomous multi-step admissions campaigns and syncs candidate dossiers into CRM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
