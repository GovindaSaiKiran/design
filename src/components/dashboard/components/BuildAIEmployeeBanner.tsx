"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Megaphone,
  Mic,
  LayoutGrid,
  Volume2,
  Building,
  GraduationCap,
  Stethoscope,
  Car,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface BuildAIEmployeeBannerProps {
  onOpenCreateModal?: (initialData?: { prompt: string; mode: string; language: string }) => void;
}

export default function BuildAIEmployeeBanner({
  onOpenCreateModal,
}: BuildAIEmployeeBannerProps) {
  const [callMode, setCallMode] = useState<"instant" | "bulk">("instant");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [promptText, setPromptText] = useState("");
  const [isTalkingToSwara, setIsTalkingToSwara] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const languages = [
    { label: "తెలుగు", code: "Telugu" },
    { label: "हिन्दी", code: "Hindi" },
    { label: "தமிழ்", code: "Tamil" },
    { label: "ಕನ್ನಡ", code: "Kannada" },
    { label: "മലയാളം", code: "Malayalam" },
    { label: "मराठी", code: "Marathi" },
    { label: "English", code: "English" },
  ];

  const presets = [
    {
      id: "realestate",
      label: "Real estate",
      icon: Building,
      prompt: "Call every new property enquiry from Meta Ads in under 30 seconds, qualify their 2BHK/3BHK budget and timeline, and book a weekend site visit.",
    },
    {
      id: "coaching",
      label: "Coaching & tuition",
      icon: GraduationCap,
      prompt: "Call student inquiries for JEE/NEET repeaters batch, explain installment scholarship discounts, and confirm demo class attendance.",
    },
    {
      id: "hospital",
      label: "Hospital & clinic",
      icon: Stethoscope,
      prompt: "Handle 24/7 patient inquiries, qualify department symptoms, schedule doctor OPD consultations, and dispatch clinic location on WhatsApp.",
    },
    {
      id: "auto",
      label: "Car & bike dealer",
      icon: Car,
      prompt: "Contact test drive requests, verify driving license status and preferred vehicle variant, and confirm showroom slot.",
    },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    try { soundSynth.play("click"); } catch {}
    setActivePreset(p.id);
    setPromptText(p.prompt);
  };

  const handleTalkToSwara = () => {
    try { soundSynth.play("chime"); } catch {}
    setIsTalkingToSwara(true);

    soundSynth.speak(
      "Hi, I'm Swara! Tell me what job you want your AI employee to handle, and what they should accomplish on every call.",
      { rate: 1.0 }
    );

    setTimeout(() => {
      setIsTalkingToSwara(false);
      if (!promptText) {
        setPromptText("Call every new enquiry from my Instagram ad, ask what they need, and book a visit.");
      }
    }, 5500);
  };

  const handleBuild = () => {
    try { soundSynth.play("confirm"); } catch {}
    if (onOpenCreateModal) {
      onOpenCreateModal({
        prompt: promptText || "Call every new enquiry from my Instagram ad, ask what they need, and book a visit.",
        mode: callMode,
        language: selectedLanguage,
      });
    } else {
      soundSynth.speak("Building your custom AI voice employee now.", { rate: 1.05 });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.035)] p-5 sm:p-6 text-[#1A1A1A]">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT SECTION (Col 1 to 9) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          {/* Top Tag & App Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#D9C2FA] text-[#4C1D95] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI VOICE EMPLOYEE BUILDER</span>
              </span>
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#065F46] bg-[#C1F2D5] px-2 py-0.5 rounded-full">
                FREE SETUP
              </span>
            </div>

            <button
              onClick={() => { try { soundSynth.play("click"); } catch {} }}
              className="w-7 h-7 rounded-xl bg-[#FAF3E4] hover:bg-[#F6EBC8] flex items-center justify-center text-black/50 hover:text-black transition-colors cursor-pointer"
              title="Workforce Templates"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
              Describe the job, Swaram builds the agent
            </h3>
            <p className="text-xs sm:text-sm text-black/60 mt-1 leading-relaxed">
              Define the telephony script and goal in a few lines. Outbound dialing routes automatically via SIP trunks.
            </p>
          </div>

          {/* Mode & Language Track */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {/* Mode Pills */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setCallMode("instant");
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  callMode === "instant"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "bg-[#FAF3E4] text-black/60 hover:text-black border border-black/[0.06]"
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Instant Inbound</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setCallMode("bulk");
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  callMode === "bulk"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "bg-[#FAF3E4] text-black/60 hover:text-black border border-black/[0.06]"
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>Outbound Campaign</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-[#FAF3E4] border border-black/[0.06] rounded-full px-2.5 py-1">
              <span className="text-[10px] font-bold text-black/40 uppercase mr-1">
                LANG
              </span>
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                {languages.map((lang) => {
                  const isSelected = selectedLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        setSelectedLanguage(lang.code);
                      }}
                      className={`text-xs px-2.5 py-0.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? "bg-[#FFA98B] text-[#7C2D12] font-bold shadow-2xs"
                          : "text-black/60 hover:text-black font-medium"
                      }`}
                    >
                      {lang.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. Call every new enquiry from Meta Ads in under 30s, qualify their 2BHK/3BHK budget, and book a weekend site visit."
              className="w-full bg-[#FAF3E4]/50 border border-black/[0.08] focus:border-black/30 rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm text-[#1A1A1A] placeholder:text-black/40 focus:outline-none transition-all resize-none shadow-inner leading-relaxed"
            />
          </div>

          {/* Bottom Presets & Build Button */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleTalkToSwara}
                className="w-8 h-8 rounded-full bg-[#D9C2FA] hover:bg-[#C9A7F5] text-[#4C1D95] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                title="Dictate with voice"
              >
                <Mic className="w-4 h-4" />
              </button>

              {presets.map((preset) => {
                const Icon = preset.icon;
                const isCurrent = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      isCurrent
                        ? "bg-[#111111] text-white font-semibold"
                        : "bg-[#FAF3E4] hover:bg-[#F6EBC8] text-black/70 border border-black/[0.06]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleBuild}
              className="bg-[#111111] hover:bg-black text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#FFA98B]" />
              <span>Build my employee</span>
            </button>
          </div>
        </div>

        {/* CENTER DIVIDER */}
        <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative">
          <div className="h-full w-px bg-black/[0.08] absolute" />
          <span className="relative z-10 text-[10px] font-bold tracking-widest text-black/40 uppercase bg-white py-1 px-1.5 rounded-full border border-black/[0.08]">
            OR
          </span>
        </div>

        {/* RIGHT SECTION: Talk to Swara (Col 10 to 12) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center p-4 text-center border-t lg:border-t-0 border-black/[0.06] pt-4 lg:pt-0 bg-[#FAF3E4]/30 rounded-2xl">
          <div className="mb-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#7C2D12] bg-[#FFA98B] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#7C2D12]" />
              <span>BEST RESULT</span>
            </span>
          </div>

          {/* Interactive Voice Orb */}
          <div className="relative my-3">
            {isTalkingToSwara && (
              <>
                <span className="absolute -inset-2.5 rounded-full bg-[#C9A7F5]/40 animate-ping" />
                <span className="absolute -inset-5 rounded-full bg-[#FFA98B]/30 animate-pulse" />
              </>
            )}

            <button
              type="button"
              onClick={handleTalkToSwara}
              className={`relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#C9A7F5] via-[#A8C3F0] to-[#FFA98B] shadow-[0_8px_24px_rgba(201,167,245,0.4)] flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group ${
                isTalkingToSwara ? "ring-4 ring-[#FFA98B] scale-105" : ""
              }`}
              title="Click to speak with Swara"
            >
              <Mic className="w-8 h-8 text-[#1A1A1A] stroke-[2.2] group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <h4 className="text-base font-bold text-[#1A1A1A] tracking-tight">
            Talk to Swara
          </h4>
          <p className="text-xs text-black/60 mt-0.5 max-w-[170px] leading-tight">
            {isTalkingToSwara ? (
              <span className="text-[#D97706] font-semibold flex items-center justify-center gap-1">
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                Listening to you...
              </span>
            ) : (
              "She asks what you'd forget to type"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
