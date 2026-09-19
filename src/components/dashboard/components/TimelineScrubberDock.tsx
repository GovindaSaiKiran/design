"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Calendar,
  FileText,
  PhoneCall,
  GraduationCap,
  Award,
  Sparkles,
  Download,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";

interface TimelineMonth {
  id: string;
  name: string;
  count?: number;
  stageLabel?: string;
  active?: boolean;
}

const timelineData: TimelineMonth[] = [
  { id: "jan", name: "Jan", count: 6, stageLabel: "Spring Intake" },
  { id: "feb", name: "Feb", stageLabel: "Webinar Queries" },
  { id: "mar", name: "Mar", count: 3, stageLabel: "Early Decisions" },
  { id: "apr", name: "Apr", stageLabel: "Scholarship Slabs" },
  { id: "may", name: "May", count: 2, stageLabel: "Entrance Tests" },
  { id: "jun", name: "Jun", stageLabel: "Rank Lists" },
  { id: "jul", name: "Jul", stageLabel: "Seat Matrix" },
  { id: "aug", name: "Aug", count: 4, stageLabel: "Peak Intake", active: true },
  { id: "sep", name: "Sep", count: 2, stageLabel: "Counseling Slabs", active: true },
  { id: "oct", name: "Oct", count: 6, stageLabel: "Hostel Allocation" }
];

interface TimelineScrubberDockProps {
  onSelectPeriod?: (periodId: string) => void;
  onOpenExportModal?: () => void;
}

export default function TimelineScrubberDock({
  onSelectPeriod,
  onOpenExportModal
}: TimelineScrubberDockProps) {
  const [selectedRange, setSelectedRange] = useState<string[]>(["aug", "sep"]);

  const toggleMonth = (id: string) => {
    if (selectedRange.includes(id)) {
      if (selectedRange.length > 1) {
        setSelectedRange(selectedRange.filter((m) => m !== id));
      }
    } else {
      setSelectedRange([...selectedRange, id]);
    }
    onSelectPeriod?.(id);
  };

  const handleDownloadAll = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.9 },
        colors: ["#6366f1", "#10b981", "#38bdf8", "#f59e0b"]
      });
    } catch (e) {}
    onOpenExportModal?.();
  };

  return (
    <div className="w-full flex items-center justify-center select-none">
      {/* Authentic Neo-Brutalist Dock Container */}
      <div className="bg-white border-3 border-black rounded-2xl px-3.5 py-2 shadow-[5px_5px_0px_#000000] flex items-center gap-2.5 max-w-full overflow-x-auto select-none">
        {/* Left: Academic Calendar Year Selector */}
        <button className="flex items-center gap-1.5 bg-black text-[#d6ff38] border-2 border-black px-3 py-1 rounded-xl text-xs font-black shrink-0 shadow-[2px_2px_0px_#000000] -rotate-1 cursor-pointer">
          <Calendar className="w-3.5 h-3.5 stroke-[2.5] text-[#d6ff38]" />
          <span className="text-[10px] uppercase tracking-wider">2026 Intake</span>
        </button>

        {/* Milestone Icon Pill 1 */}
        <div className="w-8 h-8 rounded-xl bg-[#00f0ff] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_#000000]" title="Prospectus Downloads">
          <FileText className="w-4 h-4 stroke-[2.5]" />
        </div>

        {/* Milestone Icon Pill 2 */}
        <div className="relative shrink-0" title="Active Dialed Helplines">
          <div className="w-8 h-8 rounded-xl bg-[#ffe600] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000000]">
            <PhoneCall className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-black text-[#d6ff38] border border-black text-[9px] font-black flex items-center justify-center">
            6
          </span>
        </div>

        {/* Months Scrubber Sequence */}
        <div className="flex items-center gap-1.5 shrink-0">
          {timelineData.map((item) => {
            const isSelected = selectedRange.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleMonth(item.id)}
                className={`relative px-2.5 py-1 rounded-xl text-xs transition-all duration-120 cursor-pointer flex items-center gap-1.5 border-2 ${
                  isSelected
                    ? "bg-[#d6ff38] text-black font-black border-black shadow-[2px_2px_0px_#000000] -translate-y-0.5"
                    : "bg-white text-black border-transparent hover:border-black hover:bg-slate-100 font-bold"
                }`}
                title={item.stageLabel}
              >
                <span className="text-[11px] uppercase tracking-tight">{item.name}</span>

                {item.count && (
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-mono font-black shrink-0 ${
                      isSelected
                        ? "bg-black text-[#d6ff38]"
                        : "bg-slate-200 text-black border border-black/30"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Action: 1-Click Export Complete Dossier */}
        <div className="pl-1 shrink-0">
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00f0ff] hover:bg-[#00ddf0] text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all"
            title="Export complete institutional archive and call logs"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="text-[11px] uppercase tracking-wider">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
