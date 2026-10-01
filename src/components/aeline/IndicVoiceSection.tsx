"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Square, ChevronDown } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface IndicVoiceSectionProps {
  onOpenDemo?: () => void;
  onOpenSimulator?: () => void;
}

interface VoicePersona {
  name: string;
  gender: "Male" | "Female";
  disc: string;
  pitch: number;
}

export default function IndicVoiceSection({
  onOpenDemo,
  onOpenSimulator,
}: IndicVoiceSectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi");
  const [textInput, setTextInput] = useState(
    "भारत की सुबह का नज़ारा ही कुछ और होता है। चाय की चुस्की के साथ अखबार, बच्चों की किलकारियां, और मंदिर की घंटियों की आवाज़, सब मिलकर एक ऐसा माहौल बनाते हैं जो दिल को छू जाता है।"
  );
  const [activeVoice, setActiveVoice] = useState("Shubh");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [charCount, setCharCount] = useState(138);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Authentic language samples across India's major languages
  const languageSamples: Record<
    string,
    { text: string; defaultVoice: string; langCode: string; nativeLabel: string }
  > = {
    Hindi: {
      text: "भारत की सुबह का नज़ारा ही कुछ और होता है। चाय की चुस्की के साथ अखबार, बच्चों की किलकारियां, और मंदिर की घंटियों की आवाज़, सब मिलकर एक ऐसा माहौल बनाते हैं जो दिल को छू जाता है।",
      defaultVoice: "Shubh",
      langCode: "hi-IN",
      nativeLabel: "हिन्दी",
    },
    Telugu: {
      text: "భారతీయ సాంకేతిక సంస్థలో ఇంజనీరింగ్ ప్రవేశాల వివరాలు మరియు మెరిట్ స్కాలర్‌షిప్ అర్హతలను తక్షణమే తెలుసుకోండి. మీ భవిష్యత్తును ఇప్పుడే తీర్చిదిద్దుకోండి.",
      defaultVoice: "Neha",
      langCode: "te-IN",
      nativeLabel: "తెలుగు",
    },
    Kannada: {
      text: "ಅಪೆಕ್ಸ್ ಎಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜಿನ ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಹಾಗೂ ಆರ್ಟಿಫಿಶಿಯಲ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಕೋರ್ಸ್‌ಗಳ ಪ್ರವೇಶ ಪ್ರಕ್ರಿಯೆ ಆರಂಭವಾಗಿದೆ. ತಕ್ಷಣವೇ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      defaultVoice: "Ishita",
      langCode: "kn-IN",
      nativeLabel: "ಕನ್ನಡ",
    },
    Bengali: {
      text: "অ্যাপেক্স ইঞ্জিনিয়ারিং কলেজের বি.টেক কম্পিউটার সায়েন্স ও এআই কোর্সে ভর্তির আবেদন শুরু হয়েছে। মেধা স্কলারশিপের বিস্তারিত তথ্য অবিলম্বে জানুন।",
      defaultVoice: "Suhani",
      langCode: "bn-IN",
      nativeLabel: "বাংলা",
    },
    Tamil: {
      text: "அபெக்ஸ் இன்ஜினியரிங் கல்லூரியின் பி.டெக் கம்ப்யூட்டர் சயின்ஸ் மற்றும் ஏஐ பாடப்பிரிவுக்கான சேர்க்கை விவரங்கள் மற்றும் கல்வி உதவித்தொகை விவரங்களை அறியவும்.",
      defaultVoice: "Ritu",
      langCode: "ta-IN",
      nativeLabel: "தமிழ்",
    },
    Marathi: {
      text: "भारतीय तंत्रज्ञान संस्थेमध्ये अभियांत्रिकी प्रवेश प्रक्रिया सुरू झाली आहे. गुणवत्ता शिष्यवृत्तीच्या पात्रतेची त्वरित पडताळणी करा.",
      defaultVoice: "Vikram",
      langCode: "mr-IN",
      nativeLabel: "मराठी",
    },
    Gujarati: {
      text: "એપેક્સ એન્જિનિયરિંગ કોલેજમાં કોમ્પ્યુટર સાયન્સ અને એઆઈ કોર્સ માટે પ્રવેશ પ્રક્રિયા શરૂ થઈ ગઈ છે. સ્કોલરશીપ માટે તરત જ તપાસ કરો.",
      defaultVoice: "Shubh",
      langCode: "gu-IN",
      nativeLabel: "ગુજરાતી",
    },
    Malayalam: {
      text: "അപെക്സ് എഞ്ചിനീയറിംഗ് കോളേജിൽ കമ്പ്യൂട്ടർ സയൻസ്, എഐ കോഴ്സുകളിലേക്കുള്ള പ്രവേശന നടപടികൾ ആരംഭിച്ചു. നിങ്ങളുടെ യോഗ്യത ഉടൻ പരിശോധിക്കുക.",
      defaultVoice: "Ishita",
      langCode: "ml-IN",
      nativeLabel: "മലയാളം",
    },
    Punjabi: {
      text: "ਐਪੈਕਸ ਇੰਜੀਨੀਅਰਿੰਗ ਕਾਲਜ ਵਿੱਚ ਕੰਪਿਊਟਰ ਸਾਇੰਸ ਅਤੇ ਏਆਈ ਕੋਰਸਾਂ ਲਈ ਦਾਖਲਾ ਪ੍ਰਕਿਰਿਆ ਸ਼ੁਰੂ ਹੋ ਗਈ ਹੈ। ਆਪਣੀ ਯੋਗਤਾ ਦੀ ਤੁਰੰਤ ਜਾਂਚ ਕਰੋ।",
      defaultVoice: "Vikram",
      langCode: "pa-IN",
      nativeLabel: "ਪੰਜਾਬੀ",
    },
    English: {
      text: "VoicePilot delivers human-grade, emotion-rich speech synthesis across all official languages of India with ultra-low sub-400ms latency.",
      defaultVoice: "Shubh",
      langCode: "en-IN",
      nativeLabel: "English",
    },
  };

  const voices: VoicePersona[] = [
    { name: "Shubh", gender: "Male", disc: "bg-amber-500", pitch: 0.95 },
    { name: "Ritu", gender: "Female", disc: "bg-indigo-400", pitch: 1.15 },
    { name: "Neha", gender: "Female", disc: "bg-orange-400", pitch: 1.2 },
    { name: "Ishita", gender: "Female", disc: "bg-emerald-400", pitch: 1.1 },
    { name: "Suhani", gender: "Female", disc: "bg-rose-400", pitch: 1.25 },
    { name: "Vikram", gender: "Male", disc: "bg-cyan-500", pitch: 0.85 },
  ];

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    if (languageSamples[lang]) {
      const sample = languageSamples[lang];
      setTextInput(sample.text);
      setActiveVoice(sample.defaultVoice);
      setCharCount(sample.text.length);
      if (isPlaying) {
        handleStopVoice();
      }
    }
  };

  const handleCycleSpeed = () => {
    const speeds = [0.8, 1.0, 1.2, 1.5];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  const handlePlayVoice = (voiceName: string, textToSpeak?: string) => {
    setActiveVoice(voiceName);
    setIsPlaying(true);
    soundSynth.playCallChime();

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const currentVoiceObj = voices.find((v) => v.name === voiceName);
      const text = textToSpeak || textInput;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.rate = speed;
      utterance.pitch = currentVoiceObj?.pitch || 1.0;

      const currentLang = languageSamples[selectedLanguage]?.langCode || "hi-IN";
      utterance.lang = currentLang;

      const allVoices = window.speechSynthesis.getVoices();
      const matchedVoice = allVoices.find(
        (v) =>
          v.lang.toLowerCase() === currentLang.toLowerCase() ||
          v.lang.toLowerCase().startsWith(currentLang.split("-")[0].toLowerCase())
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 3500);
    }
  };

  const handleStopVoice = () => {
    setIsPlaying(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section
      id="indic-tts"
      className="w-full bg-white pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative select-none scroll-mt-24"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-b from-slate-100/50 via-slate-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        {/* Editorial Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100/90 text-neutral-700 border border-black/10 text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-2xs">
            <span>WORK AGENTS &amp; INDIC TEXT TO SPEECH</span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-neutral-900 leading-[1.15] max-w-3xl mx-auto">
            Text to Speech that feels natural
            <span className="block">across India&apos;s languages</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed font-sans px-2">
            Turn text into voices that feel human, carry emotion, and sound natural in every interaction.
            <span className="block sm:inline"> Set the outcome. Delegate the process.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => handlePlayVoice(activeVoice)}
              className="px-6 py-2.5 rounded-full border border-black/15 bg-white hover:bg-neutral-50 text-neutral-900 text-xs sm:text-[13px] font-medium transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Try it
            </button>
            <button
              onClick={onOpenDemo}
              className="px-6 py-2.5 rounded-full bg-[#121316] hover:bg-neutral-800 text-white text-xs sm:text-[13px] font-medium transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
            >
              Launch Outreach Goal
            </button>
          </div>
        </div>

        {/* Interactive TTS Playground Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 space-y-6 border border-slate-200/80 shadow-[0_14px_44px_-10px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <div className="relative inline-flex items-center">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-[#f4f4f6] hover:bg-[#eaebee] border border-black/[0.06] text-neutral-800 text-xs sm:text-sm font-medium py-1.5 pl-3.5 pr-8 rounded-xl cursor-pointer focus:outline-none transition-all"
              >
                {Object.entries(languageSamples).map(([langKey, data]) => (
                  <option key={langKey} value={langKey}>
                    {langKey} ({data.nativeLabel})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 pointer-events-none" />
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
              <span>{charCount}/2000</span>
              <button
                type="button"
                onClick={handleCycleSpeed}
                title="Click to cycle voice speed"
                className="hover:text-neutral-700 cursor-pointer transition-colors"
              >
                Speed: {speed.toFixed(1)}x
              </button>
            </div>
          </div>

          <div className="py-2">
            <textarea
              ref={textareaRef}
              rows={3}
              value={textInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 2000) {
                  setTextInput(val);
                  setCharCount(val.length);
                }
              }}
              className="w-full bg-transparent text-base sm:text-[17px] text-neutral-800 leading-[1.8] focus:outline-none resize-none font-normal"
              placeholder="Type or paste Indian language text here..."
            />
          </div>

          <div className="pt-2 flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="space-y-2.5 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-neutral-900 mr-1.5">Voices</span>
                {voices.slice(0, 4).map((v) => {
                  const isSelected = activeVoice === v.name;
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setActiveVoice(v.name);
                        if (isPlaying) {
                          handleStopVoice();
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#121316] text-white border-[#121316] shadow-2xs"
                          : "bg-white text-neutral-800 hover:bg-neutral-50 border-black/10"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${v.disc}`} />
                      <span>{v.name}</span>
                      <span
                        className={`text-[10px] ${
                          isSelected ? "text-neutral-400" : "text-neutral-400"
                        }`}
                      >
                        {v.gender}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 flex-wrap pl-0 sm:pl-[58px]">
                {voices.slice(4).map((v) => {
                  const isSelected = activeVoice === v.name;
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setActiveVoice(v.name);
                        if (isPlaying) {
                          handleStopVoice();
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#121316] text-white border-[#121316] shadow-2xs"
                          : "bg-white text-neutral-800 hover:bg-neutral-50 border-black/10"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${v.disc}`} />
                      <span>{v.name}</span>
                      <span
                        className={`text-[10px] ${
                          isSelected ? "text-neutral-400" : "text-neutral-400"
                        }`}
                      >
                        {v.gender}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="shrink-0 flex items-end justify-end">
              {isPlaying ? (
                <button
                  type="button"
                  onClick={handleStopVoice}
                  className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-3 cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  <Square className="w-3.5 h-3.5 fill-current shrink-0 text-white" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-100">
                      Stop
                    </span>
                    <span className="text-xs font-medium">{activeVoice}</span>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePlayVoice(activeVoice)}
                  className="px-5 py-2.5 rounded-full bg-[#121316] hover:bg-neutral-800 text-white flex items-center gap-3 cursor-pointer shadow-md hover:shadow-lg active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current shrink-0 text-white" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[11px] font-semibold text-neutral-200">Speak</span>
                    <span className="text-xs font-semibold text-white">{activeVoice}</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
