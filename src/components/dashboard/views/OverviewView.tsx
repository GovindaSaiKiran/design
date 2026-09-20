"use client";

import React, { useState, useEffect } from "react";
import {
  KPIMetric,
  DashboardAgent,
  LiveCallItem,
  RecentCallRecord,
  CampaignData,
  OrganizationInfo,
} from "@/types/dashboard";
import InstitutionVitalsBar from "../components/InstitutionVitalsBar";
import LeadSegmentationHub, { StudentLeadItem } from "../components/LeadSegmentationHub";
import LiveOperationsCompactCard from "../components/LiveOperationsCompactCard";
import InteractiveAudioPlayerModal from "../components/InteractiveAudioPlayerModal";
import {
  Sparkles,
  Play,
  Square,
  Volume2,
  Send,
  CheckCircle2,
  Languages,
  Sliders,
  Cpu,
  Link2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  PhoneCall,
  Clock,
  Layers,
  ArrowUpRight,
  Bot,
  Database,
  Radio,
} from "lucide-react";

interface OverviewViewProps {
  currentOrg: OrganizationInfo;
  kpis: KPIMetric[];
  agents: DashboardAgent[];
  liveCalls: LiveCallItem[];
  recentCalls: RecentCallRecord[];
  activeCampaign: CampaignData;
  onCreateAgent: () => void;
  onStartCampaign: () => void;
  onUploadContacts: () => void;
  onUploadKnowledge: () => void;
  onViewCall: (call: LiveCallItem) => void;
  onSelectRecentCall: (call: RecentCallRecord) => void;
  onViewContact: (contactId: string) => void;
  onExportReport: () => void;
  onManageKnowledge: () => void;
  onManageTelephony: () => void;
  onViewAllCalls: () => void;
}

export default function OverviewView({
  currentOrg,
  kpis,
  agents,
  liveCalls,
  recentCalls,
  activeCampaign,
  onCreateAgent,
  onStartCampaign,
  onUploadContacts,
  onUploadKnowledge,
  onViewCall,
  onSelectRecentCall,
  onViewContact,
  onExportReport,
  onManageKnowledge,
  onManageTelephony,
  onViewAllCalls,
}: OverviewViewProps) {
  const [selectedLeadForAudio, setSelectedLeadForAudio] = useState<StudentLeadItem | null>(null);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "interested" | "call_later" | "not_interested" | "inbound">("interested");

  // Interactive TTS Playground state (from PDF 1 Pg 1)
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const [textInput, setTextInput] = useState(
    "भारत की सुबह का नज़ारा ही कुछ और होता है। चाय की चुस्की के साथ अखबार, बच्चों की किलकारियां, और मंदिर की घंटियों की आवाज़, सब मिलकर एक ऐसा माहौल बनाते हैं जो दिल को छू जाता है।"
  );
  const [activeVoice, setActiveVoice] = useState("Shubh");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [charCount, setCharCount] = useState(138);

  // Work Agents goal input state (from PDF 2 Pg 1)
  const [goalInput, setGoalInput] = useState(
    "Draft the September admissions qualification batch and verify 35% merit scholarships for 85%+ PCM scorers in Hindi and Telugu"
  );
  const [isGoalDelegated, setIsGoalDelegated] = useState(false);

  // Sample texts per Indian language
  const languageSamples: Record<string, { text: string; defaultVoice: string }> = {
    Hindi: {
      text: "भारत की सुबह का नज़ारा ही कुछ और होता है। चाय की चुस्की के साथ अखबार, बच्चों की किलकारियां, और मंदिर की घंटियों की आवाज़, सब मिलकर एक ऐसा माहौल बनाते हैं जो दिल को छू जाता है।",
      defaultVoice: "Shubh",
    },
    Telugu: {
      text: "భారతీయ సాంకేతిక సంస్థలో ఇంజనీరింగ్ ప్రవేశాల వివరాలు మరియు మెరిట్ స్కాలర్‌షిప్ అర్హతలను తక్షణమే తెలుసుకోండి. మీ భవిష్యత్తును ఇప్పుడే తీర్చిదిద్దుకోండి.",
      defaultVoice: "Neha",
    },
    Kannada: {
      text: "ಅಪೆಕ್ಸ್ ಎಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜಿನ ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಹಾಗೂ ಆರ್ಟಿಫಿಶಿಯಲ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಕೋರ್ಸ್‌ಗಳ ಪ್ರವೇಶ ಪ್ರಕ್ರಿಯೆ ಆರಂಭವಾಗಿದೆ. ತಕ್ಷಣವೇ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      defaultVoice: "Ishita",
    },
    Bengali: {
      text: "অ্যাপেক্স ইঞ্জিনিয়ারিং কলেজের বি.টেক কম্পিউটার সায়েন্স ও এআই কোর্সে ভর্তির আবেদন শুরু হয়েছে। মেধা স্কলারশিপের বিস্তারিত তথ্য অবিলম্বে জানুন।",
      defaultVoice: "Suhani",
    },
    Tamil: {
      text: "அபெக்ஸ் இன்ஜினியரிங் கல்லூரியின் பி.டெக் கம்ப்யூட்டர் சயின்ஸ் மற்றும் ஏஐ பாடப்பிரிவுக்கான சேர்க்கை விவரங்கள் மற்றும் கல்வி உதவித்தொகை விவரங்களை அறியவும்.",
      defaultVoice: "Ananya",
    },
    Marathi: {
      text: "अपेक्स अभियांत्रिकी महाविद्यालयात बी.टेक संगणक विज्ञान आणि कृत्रिम बुद्धिमत्ता अभ्यासक्रमाचे प्रवेश सुरू झाले आहेत. आजच संपर्क साधा.",
      defaultVoice: "Arjun",
    },
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    if (languageSamples[lang]) {
      setTextInput(languageSamples[lang].text);
      setActiveVoice(languageSamples[lang].defaultVoice);
      setCharCount(languageSamples[lang].text.length);
    }
  };

  // 4 Giant Sarvam 3D Voice Discs (from PDF 1 Pg 6)
  const voiceDiscs = [
    {
      id: "ritu",
      name: "Ritu",
      lang: "Hindi",
      style: "Expressive • Emotional",
      discClass: "sarvam-disc-periwinkle",
      sampleText: "नमस्ते! मैं रितु हूँ, आपकी एआई प्रवेश परामर्शदाता।",
    },
    {
      id: "neha",
      name: "Neha",
      lang: "Telugu",
      style: "Expressive • Emotional",
      discClass: "sarvam-disc-peach",
      sampleText: "నమస్కారం! నేను నేహాను, మీ అడ్మిషన్ల సలహాదారుని.",
    },
    {
      id: "ishita",
      name: "Ishita",
      lang: "Kannada",
      style: "Expressive • Emotional",
      discClass: "sarvam-disc-sage",
      sampleText: "ನಮಸ್ಕಾರ! ನಾನು ಇಶಿತಾ, ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಮಾರ್ಗದರ್ಶಕಿ.",
    },
    {
      id: "suhani",
      name: "Suhani",
      lang: "Bengali",
      style: "Expressive • Emotional",
      discClass: "sarvam-disc-rose",
      sampleText: "নমস্কার! আমি সুহানী, আপনার ভর্তি সহায়িকা।",
    },
  ];

  const enterpriseConnectors = [
    { name: "Google Drive", type: "Collegiate Docs", status: "Synced", icon: "📁" },
    { name: "Notion", type: "Admissions SOPs", status: "Synced", icon: "📑" },
    { name: "Slack", type: "Counselor Desk", status: "Active", icon: "💬" },
    { name: "Linear", type: "Escalations", status: "Connected", icon: "⚡" },
    { name: "GitHub", type: "Campus API", status: "Connected", icon: "🐙" },
    { name: "Zoho CRM", type: "Applicant Leads", status: "Live Sync", icon: "👥" },
  ];

  const handlePlayVoice = (voiceName: string, textToSpeak?: string) => {
    setActiveVoice(voiceName);
    setIsPlaying(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak || textInput);
      utterance.rate = speed;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleStopVoice = () => {
    setIsPlaying(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleOpenLeadModal = (lead?: StudentLeadItem) => {
    if (lead) {
      setSelectedLeadForAudio(lead);
      setAudioModalOpen(true);
    } else if (liveCalls.length > 0) {
      onViewCall(liveCalls[0]);
    }
  };

  const handleFilterCategoryFromTile = (category: string) => {
    const validCategory = category as "all" | "interested" | "call_later" | "not_interested" | "inbound";
    setSelectedCategory(validCategory);

    // Smooth scroll to lead table for immediate focus
    const el = document.getElementById("lead-table-hub");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full space-y-12 select-none animate-in fade-in duration-300 pb-16">
      {/* ========================================================================= */}
      {/* 1. SARVAM EDITORIAL HERO: TEXT TO SPEECH ACROSS INDIA'S LANGUAGES        */}
      {/* ========================================================================= */}
      <div className="text-center max-w-4xl mx-auto pt-4 pb-2 space-y-4">
        {/* Filigree Ornament */}
        <div className="text-xl text-neutral-400 font-serif tracking-widest">
          ~ 𑁍 ~
        </div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-black/10 text-xs font-semibold">
          <span>WORK AGENTS & INDIC TEXT TO SPEECH</span>
        </div>

        <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-900 leading-tight">
          Text to Speech that feels natural across India&apos;s languages
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed font-sans">
          Turn text into voices that feel human, carry emotion, and sound natural in every interaction. Set the outcome. Delegate the process.
        </p>

        {/* Hero Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={() => handlePlayVoice(activeVoice)}
            className="px-6 py-2.5 rounded-full border border-black/20 text-neutral-900 hover:bg-neutral-100 text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Try it
          </button>
          <button
            onClick={onStartCampaign}
            className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
          >
            Launch Outreach Goal
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE TEXT-TO-SPEECH PLAYGROUND (DIRECT FROM SARVAM PDF 1 PG 1)  */}
      {/* ========================================================================= */}
      <div className="max-w-3xl mx-auto liquid-glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-black/5">
          <div className="flex items-center gap-2">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-black/5 text-xs font-semibold text-neutral-800 focus:outline-none cursor-pointer transition-all"
            >
              <option value="Hindi">Hindi (हिन्दी)</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
              <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
              <option value="Bengali">Bengali (বাংলা)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Marathi">Marathi (मराठी)</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span>{charCount}/2000</span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-semibold">
              Speed: {speed.toFixed(1)}x
            </span>
          </div>
        </div>

        {/* Textarea with authentic Indic scripts */}
        <div>
          <textarea
            rows={4}
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              setCharCount(e.target.value.length);
            }}
            className="w-full p-2 bg-transparent text-sm sm:text-base text-neutral-900 leading-relaxed focus:outline-none resize-none font-normal"
            placeholder="Type or paste Indian language text here..."
          />
        </div>

        {/* Voices Selection List & Play Action */}
        <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-neutral-900 mr-2">Voices</span>
            {[
              { name: "Shubh", gender: "Male", disc: "sarvam-disc-amber" },
              { name: "Ritu", gender: "Female", disc: "sarvam-disc-periwinkle" },
              { name: "Neha", gender: "Female", disc: "sarvam-disc-peach" },
              { name: "Ishita", gender: "Female", disc: "sarvam-disc-sage" },
              { name: "Suhani", gender: "Female", disc: "sarvam-disc-rose" },
              { name: "Vikram", gender: "Male", disc: "sarvam-disc-cyan" },
            ].map((v) => (
              <button
                key={v.name}
                onClick={() => setActiveVoice(v.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer border ${
                  activeVoice === v.name
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                    : "bg-[#fbfbfd] text-neutral-700 hover:bg-neutral-100 border-black/10"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${v.disc}`} />
                <span>{v.name}</span>
                <span className={`text-[10px] ${activeVoice === v.name ? "text-neutral-300" : "text-neutral-400"}`}>
                  {v.gender}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isPlaying ? (
              <button
                onClick={handleStopVoice}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                onClick={() => handlePlayVoice(activeVoice)}
                className="px-6 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Speak {activeVoice}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. WORK AGENTS: SET THE OUTCOME. DELEGATE THE PROCESS (FROM PDF 2 PG 1/2)  */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-serif">
            WORK AGENTS BY SARVAM
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900">
            Set the outcome. Delegate the process.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
            Describe the job and connect the tools and documents it needs. Work Agents follows the process and returns the result for review.
          </p>
        </div>

        {/* Goal Handoff Input Box (PDF 2 Pg 1) */}
        <div className="p-6 rounded-3xl liquid-glass-card space-y-4">
          <textarea
            rows={2}
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            className="w-full text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none resize-none bg-transparent leading-relaxed"
            placeholder="Describe the work you want to hand off..."
          />
          <div className="flex items-center justify-between pt-3 border-t border-black/5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/60 text-neutral-800 text-xs font-medium border border-black/5 flex items-center gap-1.5 shadow-2xs">
                <span>∞ Work</span>
                <span className="text-[10px] text-neutral-500">• Admissions</span>
              </span>
              <span className="text-xs text-neutral-400 hidden sm:inline">
                Connected: JoSAA Register, UGC Fee Rules, Bulbul V3 SIP
              </span>
            </div>

            <button
              onClick={() => {
                setIsGoalDelegated(true);
                setTimeout(() => setIsGoalDelegated(false), 5000);
              }}
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center cursor-pointer shadow-sm hover:shadow transition-all active:scale-95"
              title="Delegate Goal to Work Agent"
            >
              <Send className="w-4 h-4 stroke-[2.2] ml-0.5" />
            </button>
          </div>
        </div>

        {/* Live Step Execution Card (from PDF 2 Pg 2) */}
        <div className="p-6 rounded-3xl liquid-glass-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Active Delegated Goal
              </div>
              <h4 className="font-semibold text-neutral-900 text-sm sm:text-base mt-0.5">
                September Admissions Qualification & Merit Scholarship Grant
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Step 3 in Progress</span>
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3 text-neutral-900 font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] shrink-0">
                ✓
              </span>
              <span>Pull 1,240 candidate records & PCM scores from JoSAA state rank database</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-900 font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] shrink-0">
                ✓
              </span>
              <span>Match 35% - 50% Chancellor Merit Scholarship fee waivers per candidate</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-900 font-semibold bg-amber-50/80 p-2 rounded-xl border border-amber-200/80">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] shrink-0 animate-spin">
                ⟳
              </span>
              <span>Synthesizing Bulbul V3 Neural Voice calls in Hindi & Telugu (140ms first-byte stream)</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400 font-medium">
              <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center text-[11px] shrink-0">
                ○
              </span>
              <span>Assemble confirmed applicant dossier and dispatch WhatsApp counseling passes</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. "TRY ALL OUR VOICES" — 4 GIANT 3D CLAY DISCS (FROM PDF 1 PG 6)         */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold border border-black/5">
            Try all our Voices
          </div>
          <h2 className="font-serif-display text-3xl font-normal text-neutral-900">
            Emotion-rich and human-like voices across Indian languages
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {voiceDiscs.map((disc) => (
            <div
              key={disc.id}
              onClick={() => handlePlayVoice(disc.name, disc.sampleText)}
              className="liquid-glass-card rounded-3xl p-6 flex flex-col items-center justify-between text-center group cursor-pointer"
            >
              {/* Giant 3D Clay Disc Sphere with Center Play Button */}
              <div className="w-full aspect-square max-w-[200px] my-4 rounded-full flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <div className={`w-full h-full rounded-full ${disc.discClass} flex items-center justify-center shadow-lg relative`}>
                  {/* Central Play/Pause Capsule */}
                  <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                    {isPlaying && activeVoice === disc.name ? (
                      <Square className="w-4 h-4 fill-current text-neutral-900" />
                    ) : (
                      <Play className="w-4 h-4 fill-current text-neutral-900 ml-0.5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Disc Metadata Footer */}
              <div className="w-full flex items-baseline justify-between pt-4 border-t border-black/5 text-left">
                <div>
                  <h4 className="font-semibold text-neutral-900 text-base group-hover:text-blue-600 transition-colors">
                    {disc.name}
                  </h4>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    {disc.style}
                  </div>
                </div>
                <span className="text-xs font-medium text-neutral-700 bg-white/60 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-black/5">
                  {disc.lang}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. EDITORIAL BIG NUMBERS (FROM PDF 1 PG 9)                                */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card rounded-3xl p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        <div className="space-y-1 sm:border-r border-black/10 sm:pr-6">
          <div className="font-serif-display text-4xl sm:text-5xl font-normal text-neutral-900">
            2.4M+
          </div>
          <div className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
            Characters Streamed Daily
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">
            Real-time synthesis across 11 native Indic languages with 99.98% carrier uptime.
          </p>
        </div>

        <div className="space-y-1 sm:border-r border-black/10 sm:pr-6">
          <div className="font-serif-display text-4xl sm:text-5xl font-normal text-neutral-900">
            11
          </div>
          <div className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
            Supported Indian Languages
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">
            Hindi, Telugu, Kannada, Bengali, Tamil, Marathi, Gujarati, Punjabi, Odia, Malayalam, Assamese.
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-serif-display text-4xl sm:text-5xl font-normal text-neutral-900">
            ₹ 30
          </div>
          <div className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
            Unit Cost / 10,000 Characters
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">
            High efficiency speech synthesis designed for collegiate admissions scale.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. ENTERPRISE APP CONNECTORS (FROM PDF 2 PG 5 & 6)                        */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card rounded-3xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 font-serif">
              INTEGRATED CONNECTORS
            </div>
            <h3 className="font-serif-display text-2xl font-normal text-neutral-900">
              Connectors
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Connect Notion, Slack, Google Drive, Linear, GitHub, Jira, and Zoho CRM. Agents read updated records in real-time.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-600 bg-white/60 backdrop-blur-md px-3 py-1 rounded-xl border border-black/5 shadow-2xs">
            6 Connected Apps
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {enterpriseConnectors.map((conn, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl liquid-glass-interactive text-center flex flex-col items-center justify-between cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md border border-black/5 flex items-center justify-center text-xl mb-2 shadow-2xs">
                {conn.icon}
              </div>
              <div>
                <div className="font-semibold text-neutral-900 text-xs">{conn.name}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">{conn.type}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-black/5 w-full flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-800">{conn.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. LIVE OPERATIONS & VERIFIED CANDIDATE REGISTRY TABLE                     */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-4">
        <InstitutionVitalsBar
          currentOrg={currentOrg}
          activeCategory={selectedCategory}
          onUploadContacts={onUploadContacts}
          onExportReport={onExportReport}
          onStartCampaign={onStartCampaign}
          onCreateAgent={onCreateAgent}
          onFilterCategory={handleFilterCategoryFromTile}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div id="lead-table-hub" className="lg:col-span-8 w-full scroll-mt-8">
            <LeadSegmentationHub
              activeCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
              onInspectCall={handleOpenLeadModal}
              onOpenExportModal={onExportReport}
            />
          </div>

          <div className="lg:col-span-4 w-full">
            <LiveOperationsCompactCard
              agents={agents}
              liveCalls={liveCalls}
              onOpenLiveCallModal={() => handleOpenLeadModal()}
              onCreateAgent={onCreateAgent}
              onStartCampaign={onStartCampaign}
              onUploadKnowledge={onUploadKnowledge}
            />
          </div>
        </div>
      </div>

      {/* Interactive Audio Modal */}
      <InteractiveAudioPlayerModal
        lead={selectedLeadForAudio}
        isOpen={audioModalOpen}
        onClose={() => {
          setAudioModalOpen(false);
          setSelectedLeadForAudio(null);
        }}
      />
    </div>
  );
}
