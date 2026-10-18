"use client";

import React from "react";
import { Plus, Send, Upload, FileText, PhoneCall, Download, Sparkles, Bot, Layers } from "lucide-react";

interface QuickActionsProps {
  onCreateAgent?: () => void;
  onStartCampaign?: () => void;
  onUploadContacts?: () => void;
  onUploadKnowledge?: () => void;
  onViewCalls?: () => void;
  onExportReport?: () => void;
}

export default function QuickActions({
  onCreateAgent,
  onStartCampaign,
  onUploadContacts,
  onUploadKnowledge,
  onViewCalls,
  onExportReport,
}: QuickActionsProps) {
  const actions = [
    {
      title: "Create AI Agent",
      desc: "Voice & persona tuning",
      icon: <Bot className="w-5 h-5 text-[#553C9A] stroke-[1.8]" />,
      iconBg: "bg-[#D9C2FA]/40",
      onClick: onCreateAgent,
    },
    {
      title: "Start Campaign",
      desc: "Launch dialing batch",
      icon: <Send className="w-5 h-5 text-[#2451B2] stroke-[1.8]" />,
      iconBg: "bg-[#BCD0F5]/40",
      onClick: onStartCampaign,
    },
    {
      title: "Upload Students",
      desc: "Import CSV applicants",
      icon: <Upload className="w-5 h-5 text-[#9A5B00] stroke-[1.8]" />,
      iconBg: "bg-[#FFD9A0]/40",
      onClick: onUploadContacts,
    },
    {
      title: "Upload Knowledge",
      desc: "Index syllabus & fees",
      icon: <FileText className="w-5 h-5 text-[#16856B] stroke-[1.8]" />,
      iconBg: "bg-[#C1F2D5]/40",
      onClick: onUploadKnowledge,
    },
    {
      title: "Live Calls Feed",
      desc: "Acoustic live monitor",
      icon: <PhoneCall className="w-5 h-5 text-[#A81D47] stroke-[1.8]" />,
      iconBg: "bg-[#FFC0D3]/40",
      onClick: onViewCalls,
    },
    {
      title: "Export Report",
      desc: "Download call logs",
      icon: <Download className="w-5 h-5 text-[#1A1A1A] stroke-[1.8]" />,
      iconBg: "bg-[#FAF3E4]",
      onClick: onExportReport,
    },
  ];

  return (
    <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] select-none">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.05]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-black/45">
              Operations Shortcuts
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06]">
              6 Workflows
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight font-sans mt-1">
            Quick Actions
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {actions.map((act) => (
          <button
            key={act.title}
            onClick={act.onClick}
            className="bg-[#FAF3E4]/30 hover:bg-white p-5 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:shadow-xs text-left flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div className={`w-10 h-10 rounded-xl ${act.iconBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-2xs`}>
              {act.icon}
            </div>

            <div>
              <div className="text-xs font-bold text-[#1A1A1A] leading-tight mb-1 font-sans">
                {act.title}
              </div>
              <div className="text-[11px] text-black/50 line-clamp-1">
                {act.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
