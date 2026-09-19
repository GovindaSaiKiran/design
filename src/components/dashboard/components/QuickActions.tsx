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
      desc: "Configure voice & persona",
      icon: <Bot className="w-5 h-5 text-black stroke-[2.5]" />,
      iconBg: "bg-[#c084fc]",
      cardBg: "bg-[#c084fc]/10 hover:bg-[#c084fc]/20",
      onClick: onCreateAgent,
    },
    {
      title: "Start Campaign",
      desc: "Launch student dialing batch",
      icon: <Send className="w-5 h-5 text-black stroke-[2.5]" />,
      iconBg: "bg-[#d6ff38]",
      cardBg: "bg-[#d6ff38]/10 hover:bg-[#d6ff38]/20",
      onClick: onStartCampaign,
    },
    {
      title: "Upload Students",
      desc: "Import CSV applicant list",
      icon: <Upload className="w-5 h-5 text-black stroke-[2.5]" />,
      iconBg: "bg-[#ffe600]",
      cardBg: "bg-[#ffe600]/10 hover:bg-[#ffe600]/20",
      onClick: onUploadContacts,
    },
    {
      title: "Upload Knowledge",
      desc: "Index syllabus & fee PDFs",
      icon: <FileText className="w-5 h-5 text-black stroke-[2.5]" />,
      iconBg: "bg-[#00f0ff]",
      cardBg: "bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20",
      onClick: onUploadKnowledge,
    },
    {
      title: "View Active Calls",
      desc: "Live stream acoustic monitor",
      icon: <PhoneCall className="w-5 h-5 text-black stroke-[2.5]" />,
      iconBg: "bg-[#ff8080]",
      cardBg: "bg-[#ff8080]/10 hover:bg-[#ff8080]/20",
      onClick: onViewCalls,
    },
    {
      title: "Export Report",
      desc: "Download admissions audit",
      icon: <Download className="w-5 h-5 text-black stroke-[2.5]" />,
      iconBg: "bg-white",
      cardBg: "bg-white hover:bg-slate-50",
      onClick: onExportReport,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border-3 border-black shadow-[6px_6px_0px_#000000] select-none">
      <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-black/70">
              Operations Shortcuts
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              6 Workflows
            </span>
          </div>
          <h3 className="text-xl font-black text-black tracking-tight uppercase mt-1">
            Quick Actions
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {actions.map((act) => (
          <button
            key={act.title}
            onClick={act.onClick}
            className={`p-4 rounded-xl border-2 border-black ${act.cardBg} text-left transition-all duration-150 shadow-[3px_3px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] flex flex-col justify-between group cursor-pointer`}
          >
            <div className={`w-10 h-10 rounded-xl ${act.iconBg} border-2 border-black flex items-center justify-center mb-3 group-hover:-rotate-3 transition-transform shadow-[2px_2px_0px_#000000]`}>
              {act.icon}
            </div>

            <div>
              <div className="text-xs font-black text-black leading-tight uppercase mb-1">
                {act.title}
              </div>
              <div className="text-[10px] font-bold text-black/70 line-clamp-1">
                {act.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
