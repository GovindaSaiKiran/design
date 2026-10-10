"use client";

import React, { useState } from "react";
import {
  Store,
  Sparkles,
  Bot,
  Play,
  Pause,
  Plus,
  Check,
  Search,
  Filter,
  Volume2,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
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
      emp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  const handlePlayVoice = (emp: EmployeeTemplate) => {
    if (playingId === emp.id) {
      soundSynth.stop();
      setPlayingId(null);
    } else {
      soundSynth.stop();
      setPlayingId(emp.id);
      soundSynth.speak(emp.sampleVoicePrompt, {
        rate: parseFloat(emp.speed) || 1.0,
      });
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
    <div className="space-y-8 pb-12 font-sans select-none animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 text-white overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-semibold text-purple-200">
            <Store className="w-3.5 h-3.5 text-purple-300" />
            <span>Swaram AI Employee Store</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Hire Ready-to-Work AI Employees
          </h1>
          <p className="text-sm text-purple-200 leading-relaxed max-w-2xl">
            Pre-trained AI telecallers with industry knowledge, regional Indic language fluency, and battle-tested calling scripts. Deploy in 1 click.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onCreateCustomAgent}
              className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom AI Employee</span>
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-purple-100 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Free 50 credits included on deployment</span>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Industry Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedIndustry === ind
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by role, skill, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none text-slate-900 shadow-2xs"
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
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-purple-300 hover:shadow-lg transition-all p-5 flex flex-col justify-between group"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-purple-50 border border-purple-100 shrink-0">
                      {emp.avatar}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                          {emp.name}
                        </h3>
                        {isDeployed && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" />
                            <span>Active</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-snug">{emp.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-slate-100 text-slate-700">
                    {emp.industry}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {emp.description}
                </p>

                {/* Voice Preview Bar */}
                <div className="mt-4 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayVoice(emp)}
                      className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer shrink-0 shadow-2xs"
                      title="Listen to sample voice"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                    </button>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-900 truncate">
                        {isPlaying ? "Playing Voice Sample..." : "Listen to Natural Voice"}
                      </p>
                      <p className="text-[10px] text-purple-700 font-medium truncate">
                        {emp.voiceGender} • {emp.speed}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                    <Volume2 className={`w-3.5 h-3.5 text-purple-600 ${isPlaying ? "animate-bounce" : ""}`} />
                  </div>
                </div>

                {/* Languages Supported */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <Languages className="w-3.5 h-3.5 text-slate-400" />
                  {emp.languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Key Skills Bullet List */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Capabilities:
                  </p>
                  {emp.keySkills.map((skill, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                      <Check className="w-3 h-3 text-purple-600 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400 font-medium">
                  {emp.connectedCallsCount}
                </span>

                <div className="flex items-center gap-2">
                  {isDeployed ? (
                    <button
                      onClick={() => alert(`Configuring script for ${emp.name}...`)}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Configure Script
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeploy(emp)}
                      className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
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
