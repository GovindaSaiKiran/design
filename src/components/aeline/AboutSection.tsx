"use client";

import React from "react";
import Image from "next/image";
import { Clock, Lightbulb } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto">
        {/* Eyebrow */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-slate-700 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block" />
            ABOUT EDU-VOICE-AI
          </span>
        </div>

        {/* Big Headline with Inline Graphic Badges */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-slate-950 tracking-[-0.03em] leading-[1.15]">
            An autonomous admissions partner <br />
            dedicated to building{" "}
            <span className="inline-flex items-center align-middle mx-1 sm:mx-1.5">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#38c6f6] flex items-center justify-center shadow-sm">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </span>
            </span>
            <span className="text-slate-900">smarter</span> <br />
            and{" "}
            <span className="inline-flex items-center align-middle mx-1 sm:mx-1.5">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#cdfb56] flex items-center justify-center shadow-sm">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 fill-slate-900" />
              </span>
            </span>
            <span className="text-slate-500 font-medium">zero-hold-time campuses</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* CARD 1: Left Tall Sky Blue Card (spans 4 cols, full height) */}
          <div className="lg:col-span-4 bg-[#1880ec] rounded-[28px] sm:rounded-[34px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[500px] shadow-sm">
            {/* Top Bar: EDUVOICE Logo + Pill with Audio Equalizer Bars */}
            <div className="flex items-center justify-between z-10">
              <span className="text-white font-black text-xl sm:text-2xl tracking-tight">
                EDUVOICE
              </span>

              {/* Pill with 3 Equalizer Bars */}
              <div className="bg-white rounded-full px-3 py-2 flex items-center gap-1 shadow-sm">
                <span className="w-1 h-3 bg-slate-900 rounded-full" />
                <span className="w-1 h-4 bg-slate-900 rounded-full" />
                <span className="w-1 h-2 bg-slate-900 rounded-full" />
              </div>
            </div>

            {/* Center: Admissions Specialist Portrait */}
            <div className="relative w-full h-64 sm:h-72 my-3 z-0 flex items-center justify-center">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/man-portrait.jpg"
                  alt="University Admissions Specialist"
                  fill
                  sizes="300px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Overlaid Bottom White Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md z-10 mt-auto">
              <div className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-950 tracking-tight leading-none mb-2">
                120+
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 font-medium leading-relaxed">
                Collaborating with accredited universities & collegiate systems worldwide.
              </p>
            </div>
          </div>

          {/* CARD 2: Middle Light Gray Card (spans 4 cols) */}
          <div className="lg:col-span-4 bg-[#f4f5f7] rounded-[28px] sm:rounded-[34px] p-7 sm:p-8 flex flex-col justify-between min-h-[500px]">
            <div>
              <span className="text-xs font-semibold text-slate-500 tracking-tight">
                Commitment to prospective students
              </span>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight mt-3 mb-6">
                100%
              </div>

              {/* Overlapping Avatar Row */}
              <div className="flex items-center -space-x-2 my-6">
                <div
                  className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-200"
                  style={{
                    backgroundImage: "url('/images/avatars-grid.jpg')",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "0% 0%"
                  }}
                />
                <div
                  className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-200"
                  style={{
                    backgroundImage: "url('/images/avatars-grid.jpg')",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "100% 0%"
                  }}
                />
                <div
                  className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-200"
                  style={{
                    backgroundImage: "url('/images/avatars-grid.jpg')",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "0% 100%"
                  }}
                />
                <div
                  className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-200"
                  style={{
                    backgroundImage: "url('/images/avatars-grid.jpg')",
                    backgroundSize: "200% 200%",
                    backgroundPosition: "100% 100%"
                  }}
                />
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="mt-6 border-t border-slate-200/80 pt-6">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
                “Maya transformed our admissions helpline during peak enrollment. Hold times vanished and qualified applications jumped 38%.”
              </p>
              <div className="mt-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                — Dean of Admissions & Enrollment
              </div>
            </blockquote>
          </div>

          {/* Right Column (spans 4 cols, split vertically into Lime Card & Black Card) */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 justify-between">
            {/* CARD 3: Top Right Neon Lime Card */}
            <div className="bg-[#cdfb56] rounded-[28px] sm:rounded-[34px] p-7 sm:p-8 flex flex-col justify-between flex-1 min-h-[300px]">
              <div>
                <span className="text-xs font-bold text-slate-900 tracking-tight">
                  Student Inquiries Handled
                </span>
                <div className="text-4xl sm:text-5xl lg:text-[56px] font-black text-slate-950 tracking-tight mt-3 mb-4">
                  520k+
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-800 font-medium leading-relaxed">
                Answered accurately 24/7 across tuition, hostels, eligibility, and scholarship programs.
              </p>
            </div>

            {/* CARD 4: Bottom Right Black Pill Card */}
            <div className="bg-[#121316] rounded-[24px] sm:rounded-[30px] p-6 sm:p-7 flex items-center justify-between shadow-sm">
              <span className="text-slate-400 font-medium text-xs sm:text-sm">
                Global Campuses
              </span>
              <span className="text-white font-black text-3xl sm:text-4xl tracking-tight">
                20+
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
