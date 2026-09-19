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
      desc: "Configure voice, language & prompts",
      icon: <Bot className="w-4 h-4 text-blue-600" />,
      bg: "bg-blue-50/80 hover:bg-blue-100/80 border-blue-200/70",
      onClick: onCreateAgent,
      featured: true,
    },
    {
      title: "Start Campaign",
      desc: "Launch student follow-up dialing",
      icon: <Send className="w-4 h-4 text-violet-600" />,
      bg: "bg-violet-50/80 hover:bg-violet-100/80 border-violet-200/70",
      onClick: onStartCampaign,
      featured: true,
    },
    {
      title: "Upload Students & Contacts",
      desc: "Import CSV applicant list",
      icon: <Upload className="w-4 h-4 text-emerald-600" />,
      bg: "bg-emerald-50/80 hover:bg-emerald-100/80 border-emerald-200/70",
      onClick: onUploadContacts,
    },
    {
      title: "Upload Knowledge",
      desc: "Index syllabus, fee & hostel PDFs",
      icon: <FileText className="w-4 h-4 text-amber-600" />,
      bg: "bg-amber-50/80 hover:bg-amber-100/80 border-amber-200/70",
      onClick: onUploadKnowledge,
    },
    {
      title: "View Active Calls",
      desc: "Live stream acoustic monitor",
      icon: <PhoneCall className="w-4 h-4 text-cyan-600" />,
      bg: "bg-cyan-50/80 hover:bg-cyan-100/80 border-cyan-200/70",
      onClick: onViewCalls,
    },
    {
      title: "Export Report",
      desc: "Download CSV admissions audit",
      icon: <Download className="w-4 h-4 text-slate-700" />,
      bg: "bg-slate-50/90 hover:bg-slate-100 border-slate-200/70",
      onClick: onExportReport,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border-3 border-black shadow-[6px_6px_0px_#000000] select-none">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Operations Shortcuts
            </span>
            <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-[#d6ff38] text-black border border-black shadow-[1.5px_1.5px_0px_#000000]">
              6 WORKFLOWS
            </span>
          </div>
          <h3 className="text-lg font-black text-black tracking-tight mt-1 uppercase">
            Quick Actions
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {actions.map((act) => (
          <button
            key={act.title}
            onClick={act.onClick}
            className="p-3.5 rounded-xl border-2 border-black bg-white hover:bg-[#fcffe0] text-left transition-all duration-150 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000000] shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#d6ff38] border-2 border-black shadow-[1.5px_1.5px_0px_#000000] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-black">
              {act.icon}
            </div>

            <div>
              <div className="text-xs font-black text-black leading-tight mb-1 uppercase">
                {act.title}
              </div>
              <div className="text-[10px] font-bold text-black/60 line-clamp-1">
                {act.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
