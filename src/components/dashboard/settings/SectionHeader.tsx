import React from "react";
import { Info } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  badge?: string;
  whatIsThis: string;
  whyDoINeedIt: string;
  whatToDoNext: string;
  children?: React.ReactNode;
}

export default function SectionHeader({
  title,
  badge,
  whatIsThis,
  whyDoINeedIt,
  whatToDoNext,
  children,
}: SectionHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 mb-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1D4]/70">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-bold text-[#283A50] tracking-tight">
            {title}
          </h2>
          {badge && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
              {badge}
            </span>
          )}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>

      {/* Beginner-friendly 3-question guidance strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-3.5 text-xs">
        <div className="p-3 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4]/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
            1. What is this?
          </span>
          <p className="text-[#283A50] leading-relaxed font-medium">{whatIsThis}</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4]/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
            2. Why do I need it?
          </span>
          <p className="text-[#283A50] leading-relaxed font-medium">{whyDoINeedIt}</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4]/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block mb-1">
            3. What should I do next?
          </span>
          <p className="text-[#283A50] leading-relaxed font-medium">{whatToDoNext}</p>
        </div>
      </div>
    </div>
  );
}
