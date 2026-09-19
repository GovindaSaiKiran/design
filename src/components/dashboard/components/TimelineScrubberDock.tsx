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
        colors: ["#d6ff38", "#10b981", "#38bdf8"]
      });
    } catch (e) {}
    onOpenExportModal?.();
  };

  return (
    <div className="w-full flex items-center justify-center select-none">
      {/* Light & Refined Neo-Brutalist Dock Container */}
      <div className="bg-white border-[1.5px] border-black rounded-xl px-3 py-1.5 shadow-[2px_2px_0px_#000000] flex items-center gap-2 max-w-full overflow-x-auto scrollbar-none">
        {/* Left: Academic Calendar Year Selector */}
        <button className="flex items-center gap-1.5 bg-black text-[#d6ff38] border border-black px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 shadow-[1px_1px_0px_#000000] hover:bg-neutral-800 transition-colors cursor-pointer">
          <Calendar className="w-3 h-3 stroke-[2]" />
          <span className="text-[10px] uppercase tracking-wider">2026 Intake</span>
        </button>

        {/* Milestone Icon Pill 1 */}
        <div className="w-7 h-7 rounded-lg bg-neutral-50 border border-neutral-300 flex items-center justify-center text-neutral-800 shrink-0" title="Prospectus Downloads">
          <FileText className="w-3.5 h-3.5 stroke-[2]" />
        </div>

        {/* Milestone Icon Pill 2 */}
        <div className="relative shrink-0" title="Active Dialed Helplines">
          <div className="w-7 h-7 rounded-lg bg-neutral-50 border border-neutral-300 flex items-center justify-center text-neutral-800">
            <PhoneCall className="w-3.5 h-3.5 stroke-[2]" />
          </div>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#d6ff38] text-black border border-black text-[8px] font-bold flex items-center justify-center">
            6
          </span>
        </div>

        {/* Months Scrubber Sequence */}
        <div className="flex items-center gap-1 shrink-0">
          {timelineData.map((item) => {
            const isSelected = selectedRange.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleMonth(item.id)}
                className={`relative px-2.5 py-0.5 rounded-lg text-xs transition-all duration-120 cursor-pointer flex items-center gap-1 border ${
                  isSelected
                    ? "bg-[#d6ff38] text-black font-bold border-black shadow-[1px_1px_0px_#000000]"
                    : "bg-white text-neutral-700 border-transparent hover:border-neutral-300 hover:bg-neutral-50 font-medium"
                }`}
                title={item.stageLabel}
              >
                <span className="text-[11px]">{item.name}</span>

                {item.count && (
                  <span
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-bold shrink-0 border ${
                      isSelected
                        ? "bg-black text-[#d6ff38] border-black"
                        : "bg-neutral-100 text-neutral-700 border-neutral-300"
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
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d6ff38] hover:bg-[#cbf72e] text-black border border-black text-xs font-bold shadow-[1px_1px_0px_#000000] active:translate-x-0.5 cursor-pointer transition-all"
            title="Export complete institutional archive and call logs"
          >
            <Download className="w-3 h-3 stroke-[2]" />
            <span className="text-[11px] uppercase tracking-wider">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
