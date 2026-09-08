"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, ShieldCheck, School, Landmark } from "lucide-react";

const universities = [
  {
    name: "Stanford Edu",
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    name: "Oxford Collegiate",
    icon: <Landmark className="w-5 h-5" />
  },
  {
    name: "MIT Global",
    icon: <Award className="w-5 h-5" />
  },
  {
    name: "BITS Pilani",
    icon: <School className="w-5 h-5" />
  },
  {
    name: "Amrita University",
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    name: "Texas A&M",
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    name: "VIT Global",
    icon: <GraduationCap className="w-5 h-5" />
  }
];

export default function LogoMarquee() {
  return (
    <div className="w-full bg-white py-8 border-b border-slate-100/80 overflow-hidden relative">
      {/* Subtle fade edges */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex animate-marquee items-center gap-12 sm:gap-16 text-slate-400 font-bold text-base tracking-tight">
        {universities.map((uni, idx) => (
          <div
            key={`uni-1-${idx}`}
            className="flex items-center gap-2.5 hover:text-slate-700 transition-colors cursor-pointer select-none"
          >
            <span className="text-slate-400">{uni.icon}</span>
            <span className="text-slate-500 font-bold text-sm tracking-normal uppercase">
              {uni.name}
            </span>
          </div>
        ))}

        {universities.map((uni, idx) => (
          <div
            key={`uni-2-${idx}`}
            className="flex items-center gap-2.5 hover:text-slate-700 transition-colors cursor-pointer select-none"
          >
            <span className="text-slate-400">{uni.icon}</span>
            <span className="text-slate-500 font-bold text-sm tracking-normal uppercase">
              {uni.name}
            </span>
          </div>
        ))}

        {universities.map((uni, idx) => (
          <div
            key={`uni-3-${idx}`}
            className="flex items-center gap-2.5 hover:text-slate-700 transition-colors cursor-pointer select-none"
          >
            <span className="text-slate-400">{uni.icon}</span>
            <span className="text-slate-500 font-bold text-sm tracking-normal uppercase">
              {uni.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
