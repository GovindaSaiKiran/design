"use client";

import React, { useState } from "react";
import {
  Store,
  Bot,
  Play,
  Pause,
  Plus,
  Check,
  Search,
  Volume2,
  Zap,
  ArrowRight,
  Languages,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface EmployeeTemplate {
  id: string;
  name: string;
  role: string;
  industry: "Education" | "HR" | "Real Estate" | "E-Commerce" | "Healthcare" | "Finance";
  avatar: string;
  languages: string[];
  description: string;
  keySkills: string[];
  sampleVoicePrompt: string;
  speed: string;
  voiceGender: "Female" | "Male";
  connectedCallsCount: string;
  hired: boolean;
}

const employeeTemplates: EmployeeTemplate[] = [
  {
    id: "anu-admissions",
    name: "Anu",
    role: "Admissions Counselor & Enrollment Copilot",
    industry: "Education",
    avatar: "🎓",
    languages: ["Telugu", "Hindi", "English"],
    description: "Qualifies high-intent applicants, explains fee installments and merit scholarships, and confirms campus counseling tours.",
    keySkills: [
      "12th Board & JEE/CET cutoff qualification",
      "Instant WhatsApp fee structure delivery",
      "Counseling slot booking on Google Calendar",
      "Sub-400ms Indic dialect switching",
    ],
    sampleVoicePrompt: "నమస్కారం! అపెక్స్ యూనివర్సిటీ అడ్మిషన్ల హెల్ప్‌లైన్‌కు స్వాగతం. మీ 12వ తరగతి మార్కుల ఆధారంగా 35% స్కాలర్‌షిప్ లభిస్తుంది.",
    speed: "1.0x",
    voiceGender: "Female",
    connectedCallsCount: "124,500+ calls handled",
    hired: true,
  },
  {
    id: "swara-hr",
    name: "Swara",
    role: "HR Recruiter & Talent Screening Specialist",
    industry: "HR",
    avatar: "💼",
    languages: ["Hindi", "English", "Marathi"],
    description: "Screens candidates from job portals (Naukri/LinkedIn), verifies notice period, salary expectations, and schedules technical interviews.",
    keySkills: [
      "Candidate pre-screening in < 3 minutes",
      "Notice period & current CTC verification",
      "Instant calendar invite dispatch",
      "Automated ATS scorecard generation",
    ],
    sampleVoicePrompt: "नमस्ते! मैं स्वरा बोल रही हूँ एक्सेंचर हायरिंग टीम से। क्या आप सीनियर डेवलपर रोल के लिए 5 मिनट बात कर सकते हैं?",
    speed: "1.05x",
    voiceGender: "Female",
    connectedCallsCount: "86,200+ calls handled",
    hired: false,
  },
  {
    id: "rahul-realestate",
    name: "Rahul",
    role: "Real Estate Telecaller & Property Advisor",
    industry: "Real Estate",
    avatar: "🏢",
    languages: ["Hindi", "English"],
    description: "Calls Meta/99acres property leads in under 30 seconds. Discovers budget, 2BHK/3BHK configuration, and books weekend site visits.",
    keySkills: [
      "Sub-30s lead response calling",
      "Budget & possession timeline discovery",
      "Weekend site visit confirmation",
      "WhatsApp brochure & location pin dispatch",
    ],
    sampleVoicePrompt: "नमस्ते जी, मैं राहुल बोल रहा हूँ गोदरेज प्रॉपर्टीज से। आपने हमारे नए 3BHK लग्जरी प्रोजेक्ट के लिए फॉर्म भरा था।",
    speed: "1.0x",
    voiceGender: "Male",
    connectedCallsCount: "210,000+ calls handled",
    hired: false,
  },
  {
    id: "pooja-ecommerce",
    name: "Pooja",
    role: "E-Commerce COD Order Verifier & Retention Agent",
    industry: "E-Commerce",
    avatar: "🛍️",
    languages: ["Hindi", "Tamil", "Telugu"],
    description: "Verifies Cash on Delivery (COD) orders, confirms complete shipping addresses, and offers prepay discounts to cut RTO losses by 42%.",
    keySkills: [
      "Address landmark confirmation",
      "Prepaid conversion discount offer",
      "Shopify/WooCommerce status auto-update",
      "Cancellation avoidance objection handling",
    ],
    sampleVoicePrompt: "வணக்கம்! உங்கள் ஆன்லைன் ஆர்டரை உறுதிப்படுத்த அமேசான் டெலிவரி குழுவிலிருந்து பூஜா பேசுகிறேன்.",
    speed: "1.0x",
    voiceGender: "Female",
    connectedCallsCount: "540,000+ calls handled",
    hired: false,
  },
  {
    id: "dr-neha-clinic",
    name: "Dr. Neha Assistant",
    role: "Hospital & Clinic Appointment Coordinator",
    industry: "Healthcare",
    avatar: "🏥",
    languages: ["Hindi", "English", "Kannada"],
    description: "Answers patient inquiries 24/7, coordinates doctor OPD schedules, collects preliminary symptom notes, and sends clinic location pins.",
    keySkills: [
      "Doctor OPD consultation booking",
      "Pre-consultation symptom collection",
      "Appointment reminder calls 2 hours before",
      "Hospital HMS calendar sync",
    ],
    sampleVoicePrompt: "Hello, this is Dr. Neha's clinic desk. I can book your cardiology consultation for tomorrow at 4:30 PM.",
    speed: "0.95x",
    voiceGender: "Female",
    connectedCallsCount: "94,000+ calls handled",
    hired: false,
  },
  {
    id: "vikram-collections",
    name: "Vikram",
    role: "EMI Payment & Debt Recovery Specialist",
    industry: "Finance",
    avatar: "💳",
    languages: ["Hindi", "Telugu", "Tamil"],
    description: "Polite, compliant EMI reminder calls for NBFCs and fintechs. Confirms payment date and instantly dispatches UPI payment links.",
    keySkills: [
      "RBI compliant tone & telecalling hours",
      "Promise-to-pay (PTP) date capture",
      "Instant WhatsApp UPI payment link",
      "Loan account status CRM update",
    ],
    sampleVoicePrompt: "नमस्ते, मैं विक्रम बात कर रहा हूँ बजाज फिनसर्व से। आपकी ईएमआई 15 तारीख को देय है। क्या मैं आपको पेमेंट लिंक भेज दूँ?",
    speed: "1.0x",
    voiceGender: "Male",
    connectedCallsCount: "380,000+ calls handled",
    hired: false,
  },
];

const industries = ["All", "Education", "HR", "Real Estate", "E-Commerce", "Healthcare", "Finance"] as const;

interface EmployeeStoreViewProps {
  onCreateCustomAgent?: () => void;
  onDeployAgent?: (agent: EmployeeTemplate) => void;
}

export default function EmployeeStoreView({
  onCreateCustomAgent,
  onDeployAgent,
}: EmployeeStoreViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [deployedList, setDeployedList] = useState<string[]>(["anu-admissions"]);

  const filteredEmployees = employeeTemplates.filter((emp) => {
    const matchesIndustry = selectedIndustry === "All" || emp.industry === selectedIndustry;
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.keySkills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesSearch;
  });

  const handlePlayVoice = (emp: EmployeeTemplate) => {
    if (playingId === emp.id) {
      soundSynth.stopAudio();
      setPlayingId(null);
    } else {
      soundSynth.play("click");
      soundSynth.speak(emp.sampleVoicePrompt, {
        rate: parseFloat(emp.speed) || 1.0,
      });
      setPlayingId(emp.id);

      setTimeout(() => {
        setPlayingId(null);
      }, 5000);
    }
  };

  const handleDeploy = (emp: EmployeeTemplate) => {
    if (!deployedList.includes(emp.id)) {
      setDeployedList([...deployedList, emp.id]);
    }
    if (onDeployAgent) {
      onDeployAgent(emp);
    }
    alert(`🎉 Successfully deployed "${emp.name}" to your AI Workforce!`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 text-[#1A1A1A]">
      {/* Hero Header */}
      <div className="relative p-6 sm:p-7 rounded-[26px] bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.035)] overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA] text-[#1A1A1A] text-xs font-semibold">
            <Store className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>AI AGENT WORKFORCE REPOSITORY</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A]">
            Deploy Ready-to-Work Autonomous AI Voice Agents
          </h1>
          <p className="text-xs sm:text-sm text-black/60 leading-relaxed max-w-2xl">
            Pre-configured voice agents with institutional domain knowledge, regional Indic dialect handling, and compliant calling protocols.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                try { soundSynth.play("confirm"); } catch {}
                if (onCreateCustomAgent) onCreateCustomAgent();
              }}
              className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Agent</span>
            </button>
            <div className="px-4 py-2 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-xs text-black/60 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>50 minutes included on new agent provisioning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Industry Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setSelectedIndustry(ind);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedIndustry === ind
                  ? "bg-[#111111] text-white shadow-2xs"
                  : "bg-white border border-black/[0.06] text-black/60 hover:text-[#1A1A1A] hover:bg-[#FAF3E4]"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-black/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by role, skill, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-black/[0.06] bg-white focus:outline-none focus:border-black/30 text-[#1A1A1A] placeholder:text-black/40 font-medium"
          />
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEmployees.map((emp) => {
          const isDeployed = deployedList.includes(emp.id);
          const isPlaying = playingId === emp.id;

          return (
            <div
              key={emp.id}
              className="bg-white rounded-[24px] border border-black/[0.06] shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.04] shrink-0">
                      {emp.avatar}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#1A1A1A]">
                          {emp.name}
                        </h3>
                        {isDeployed && (
                          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#C1F2D5] text-[#16856B] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16856B] animate-pulse" />
                            <span>Active</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-black/55 leading-snug">{emp.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FBF7ED] text-black/50 border border-black/[0.06]">
                    {emp.industry}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-black/65 mt-3 leading-relaxed">
                  {emp.description}
                </p>

                {/* Voice Preview Bar */}
                <div className="mt-4 p-3 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handlePlayVoice(emp)}
                      className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer shrink-0 shadow-2xs"
                      title="Listen to sample voice"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                    </button>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1A1A1A] truncate">
                        {isPlaying ? "Playing sample..." : "Sample Voice"}
                      </p>
                      <p className="text-[10px] text-black/45 truncate">
                        {emp.voiceGender} • {emp.speed}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-black/40">
                    <Volume2 className={`w-3.5 h-3.5 text-[#1A1A1A] ${isPlaying ? "animate-bounce" : ""}`} />
                  </div>
                </div>

                {/* Languages Supported */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <Languages className="w-3.5 h-3.5 text-black/40" />
                  {emp.languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#BCD0F5]/50 text-blue-950 border border-[#A8C3F0]/60"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Key Skills Bullet List */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-black/[0.06]">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-black/40">
                    Key Capabilities:
                  </p>
                  {emp.keySkills.map((skill, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-black/65">
                      <Check className="w-3 h-3 text-[#16856B] shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-black/[0.06] flex items-center justify-between gap-2">
                <span className="text-[10px] text-black/45">
                  {emp.connectedCallsCount}
                </span>

                <div className="flex items-center gap-2">
                  {isDeployed ? (
                    <button
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        alert(`Configuring script for ${emp.name}...`);
                      }}
                      className="px-4 py-2 rounded-full border border-black/[0.08] text-black/60 hover:text-[#1A1A1A] hover:bg-[#FAF3E4] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Configure Script
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeploy(emp)}
                      className="px-5 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Deploy</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
