"use client";

import React from "react";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "“Maya transformed our admissions helpline during peak enrollment. Hold times dropped from 24 minutes to zero, and completed applications jumped 38%.”",
      author: "Dr. Jonathan Reed",
      role: "Dean of Admissions",
      institution: "Western Tech University",
      metric: "+38% Completed Apps"
    },
    {
      quote:
        "“Students calling at 2 AM with questions about NRI quotas or merit slabs get instant, accurate, grounded answers without our counselors burning out.”",
      author: "Sunita Rao",
      role: "Director of Global Admissions",
      institution: "Amrita Collegiate System",
      metric: "Zero Hold Times"
    },
    {
      quote:
        "“The warm human handoff is remarkable. When a student needs financial aid appeal guidance, Maya transfers them to my team with complete dialogue context.”",
      author: "Marcus Vance",
      role: "University Registrar",
      institution: "Apex Collegiate Institute",
      metric: "4.2x Lead Conversion"
    },
    {
      quote:
        "“We ingested our 140-page university handbook in 10 minutes. Maya has never once given an incorrect tuition quote or hallucinated campus policy.”",
      author: "Dr. Evelyn Thorne",
      role: "VP of Student Enrollment",
      institution: "Metro State University",
      metric: "100% Grounded RAG"
    }
  ];

  return (
    <section id="testimonials" className="w-full bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block" />
            INSTITUTIONAL TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight mb-4">
            What Deans and Admissions Directors say
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Discover how leading universities use Edu-Voice-Ai to answer every prospective applicant and elevate enrollment yield.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#f8f9fa] rounded-[28px] p-7 sm:p-9 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
            >
              <div>
                {/* 5 Stars + Metric Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#f59e0b]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold bg-[#cdfb56] text-black px-2.5 py-1 rounded-full">
                    {t.metric}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed mb-6 italic">
                  {t.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-200/60">
                <div>
                  <h4 className="text-sm font-bold text-slate-950">
                    {t.author}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t.role}, <span className="font-semibold text-slate-700">{t.institution}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
