"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Play,
  Pause,
  Volume2,
  ChevronDown,
  Globe,
  Radio,
  Sliders,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function IndicVoicePlaygroundSection() {
  const [activeTab, setActiveTab] = useState<"try" | "personas">("try");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hindi");
  const [selectedVoice, setSelectedVoice] = useState<string>("Shubh");
  const [speed, setSpeed] = useState<string>("1.0x");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playingDiscId, setPlayingDiscId] = useState<string | null>(null);

  const sampleTexts: Record<string, string> = {
    Hindi:
      "नमस्ते! हमारे वॉइस असिस्टेंट हेल्पलाइन में आपका स्वागत है। मैं आपकी सेवाओं और जानकारी संबंधी प्रश्नों के उत्तर देने के लिए यहाँ हूँ।",
    Telugu:
      "నమస్కారం! మా వాయిస్ అసిస్టెంట్ హెల్ప్‌లైన్‌కు స్వాగతం. మీ ప్రశ్నలకు మరియు సేవా వివరాలకు సమాధానాలు అందించడానికి నేను ఇక్కడ ఉన్నాను.",
    Kannada:
      "ನಮಸ್ಕಾರ! ನಮ್ಮ ಧ್ವನಿ ಸಹಾಯಕ ಸಹಾಯವಾಣಿಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಸೇವಾ ವಿವರಗಳು ಮತ್ತು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ.",
    Bengali:
      "নমস্কার! আমাদের ভয়েস অ্যাসিস্ট্যান্ট হেল্পলাইনে আপনাকে স্বাগতম। আপনার সেবামূলক যেকোনো তথ্যের উত্তর দিতে আমরা প্রস্তুত।",
    Tamil:
      "வணக்கம்! எங்கள் குரல் உதவி மையத்திற்கு வரவேற்கிறோம். உங்கள் வாடிக்கையாளர் சேவை மற்றும் கேள்விகளுக்கு உதவ நாங்கள் தயாராக உள்ளோம்.",
    English:
      "Welcome to our customer service voice helpline. I am your autonomous AI assistant. How can I assist you with your inquiries today?",
  };

  const [currentPrompt, setCurrentPrompt] = useState<string>(sampleTexts["Hindi"]);

  const voicesList = [
    { name: "Shubh", gender: "Male" },
    { name: "Ritu", gender: "Female" },
    { name: "Neha", gender: "Female" },
    { name: "Ishita", gender: "Female" },
    { name: "Suhani", gender: "Female" },
    { name: "Vikram", gender: "Male" },
  ];

  const personaDiscs = [
    {
      id: "ishita",
      name: "Ishita",
      nativeScript: "ಕನ್ನಡ",
      language: "Kannada",
      tone: "Articulate • Professional",
      gradient: "from-emerald-400/20 via-teal-300/10 to-transparent",
      accent: "#059669",
    },
    {
      id: "suhani",
      name: "Suhani",
      nativeScript: "বাংলা",
      language: "Bengali",
      tone: "Polite • Persuasive",
      gradient: "from-rose-400/20 via-pink-300/10 to-transparent",
      accent: "#e11d48",
    },
    {
      id: "ritu",
      name: "Ritu",
      nativeScript: "हिन्दी",
      language: "Hindi",
      tone: "Expressive • Empathetic",
      gradient: "from-purple-400/20 via-indigo-300/10 to-transparent",
      accent: "#7c3aed",
    },
    {
      id: "neha",
      name: "Neha",
      nativeScript: "తెలుగు",
      language: "Telugu",
      tone: "Warm • Encouraging",
      gradient: "from-amber-400/20 via-yellow-300/10 to-transparent",
      accent: "#d97706",
    },
  ];

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    if (sampleTexts[lang]) {
      setCurrentPrompt(sampleTexts[lang]);
    }
  };

  const handlePlayTTS = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);

    // Browser SpeechSynthesis fallback for true live voice demonstration
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentPrompt);
      utterance.rate = parseFloat(speed.replace("x", "")) || 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  const handlePlayDisc = (discId: string, discText: string) => {
    if (playingDiscId === discId) {
      setPlayingDiscId(null);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    setPlayingDiscId(discId);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(discText);
      utterance.rate = 1.0;
      utterance.onend = () => setPlayingDiscId(null);
      utterance.onerror = () => setPlayingDiscId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingDiscId(null), 3000);
    }
  };

  return (
    <section className="w-full mb-10 font-sans select-none" id="indic-tts-hub">
      <div className="bg-white border border-black/[0.06] rounded-[26px] p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#FAF3E4] border border-black/[0.06] text-[#1A1A1A]">
            <Globe className="w-3.5 h-3.5 text-[#16856B]" />
            <span>WORK AGENTS & INDIC TEXT TO SPEECH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.15]">
            Text to Speech that feels natural<br />
            <span className="text-black/55 font-medium">across India&apos;s languages</span>
          </h2>

          <p className="text-xs sm:text-sm text-black/60 max-w-2xl mx-auto leading-relaxed">
            Turn text into voices that feel human, carry emotion, and sound natural in every conversation.
          </p>

          {/* Segmented Controller (Matches PDF Page 3) */}
          <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 border border-neutral-200 mt-2">
            <button
              onClick={() => setActiveTab("try")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "try"
                  ? "bg-white text-neutral-900 shadow-2xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Try it
            </button>
            <button
              onClick={() => setActiveTab("personas")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "personas"
                  ? "bg-white text-neutral-900 shadow-2xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Persona Discs
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE TTS PLAYER (Matches PDF Page 3) */}
        {activeTab === "try" && (
          <div className="max-w-4xl mx-auto bg-neutral-50/70 border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs animate-in fade-in duration-200">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-200/80">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-white border border-neutral-200 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-semibold text-neutral-800 cursor-pointer shadow-2xs focus:outline-none"
                >
                  <option value="Hindi">Hindi (हिन्दी)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="English">English (Indian)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Status & Speed */}
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
                <span>{currentPrompt.length} / 2000</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-neutral-600">Speed:</span>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    className="bg-white border border-neutral-200 rounded-lg px-2 py-0.5 text-xs font-semibold text-neutral-800 cursor-pointer"
                  >
                    <option value="0.8x">0.8x</option>
                    <option value="1.0x">1.0x</option>
                    <option value="1.2x">1.2x</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Prompt Text Input */}
            <textarea
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              rows={3}
              className="w-full bg-transparent text-sm sm:text-base text-neutral-800 font-medium leading-relaxed resize-none focus:outline-none mb-4"
            />

            {/* Bottom Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-neutral-200/80">
              {/* Voices Selector Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-neutral-500 mr-1">Voices:</span>
                {voicesList.map((voice) => {
                  const isSelected = selectedVoice === voice.name;
                  return (
                    <button
                      key={voice.name}
                      onClick={() => setSelectedVoice(voice.name)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-neutral-900 text-white font-semibold shadow-xs"
                          : "bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 shadow-2xs"
                      }`}
                    >
                      <span>{voice.name}</span>
                      <span className="text-[10px] text-neutral-400 ml-1">({voice.gender})</span>
                    </button>
                  );
                })}
              </div>

              {/* Speak Button */}
              <button
                onClick={handlePlayTTS}
                className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Stop Playback</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Speak {selectedVoice}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PERSONA DISCS (Matches PDF Page 5-6) */}
        {activeTab === "personas" && (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
              {personaDiscs.map((disc) => {
                const isPlaying = playingDiscId === disc.id;
                return (
                  <div
                    key={disc.id}
                    className="bg-neutral-50/80 border border-neutral-200/90 rounded-2xl p-5 flex flex-col items-center justify-between text-center relative overflow-hidden group hover:border-neutral-300 transition-all shadow-2xs"
                  >
                    {/* Visualizer Disc */}
                    <div className="relative w-28 h-28 my-3 flex items-center justify-center">
                      {/* Radiating Waves */}
                      <div
                        className={`absolute inset-0 rounded-full border border-neutral-300/60 bg-gradient-to-br ${disc.gradient} transition-transform ${
                          isPlaying ? "animate-ping scale-110 opacity-75" : "scale-100"
                        }`}
                      />
                      <div className="absolute inset-2 rounded-full border border-neutral-200 bg-white shadow-inner flex items-center justify-center">
                        <button
                          onClick={() => handlePlayDisc(disc.id, sampleTexts[disc.language] || sampleTexts["Hindi"])}
                          className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-white" />
                          ) : (
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Persona Metadata */}
                    <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/70">
                      <div className="text-left">
                        <div className="text-sm font-bold text-neutral-900">{disc.name}</div>
                        <div className="text-[11px] text-neutral-500">{disc.tone}</div>
                      </div>
                      <div className="text-base font-bold text-neutral-600 font-mono">
                        {disc.nativeScript}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3 Stat Tiles (Matches PDF Page 7) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8 mt-6 border-t border-black/[0.06]">
          <div className="text-center md:text-left space-y-1">
            <div className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              2.4M+
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-black/70">
              Characters Streamed Daily
            </div>
            <p className="text-[11px] text-black/50">
              Real-time synthesis across 11 native Indic languages with 99.98% carrier uptime.
            </p>
          </div>

          <div className="text-center md:text-left space-y-1">
            <div className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              11
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-black/70">
              Supported Indian Languages
            </div>
            <p className="text-[11px] text-black/50">
              Hindi, Telugu, Kannada, Bengali, Tamil, Marathi, Gujarati, Punjabi, Odia, Malayalam, Assamese.
            </p>
          </div>

          <div className="text-center md:text-left space-y-1">
            <div className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
              ₹0.12
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-black/70">
              Unit Cost / 10,000 Characters
            </div>
            <p className="text-[11px] text-black/50">
              High efficiency speech synthesis designed for collegiate admissions scale.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
