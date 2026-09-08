"use client";

import React from "react";
import { ArrowUpRight, Clock } from "lucide-react";

export default function BlogSection() {
  const articles = [
    {
      title: "Why Unanswered Calls Cost Universities Millions in Lost Enrollment",
      excerpt:
        "Every dropped admission call during peak intake represents a lost prospective student. Discover how 24/7 telephony protects institutional tuition revenue.",
      date: "September 16, 2026",
      readTime: "5 min read",
      category: "Enrollment Strategy",
      badgeColor: "bg-sky-100 text-sky-700"
    },
    {
      title: "How Grounded AI Voice Agents Eliminate Admissions Misinformation",
      excerpt:
        "Why hallucination-free RAG grounded directly in official fee matrices, merit slabs, and course catalogs is crucial for campus accreditation compliance.",
      date: "October 2, 2026",
      readTime: "6 min read",
      category: "Knowledge RAG",
      badgeColor: "bg-emerald-100 text-emerald-700"
    },
    {
      title: "Human+AI: Designing the Modern Collegiate Admissions Office",
      excerpt:
        "How voice AI handles high-volume repetitive inquiries so human admissions officers can devote their energy to holistic evaluations and student relationships.",
      date: "October 15, 2026",
      readTime: "4 min read",
      category: "Higher Ed Operations",
      badgeColor: "bg-purple-100 text-purple-700"
    }
  ];

  return (
    <section id="blog" className="w-full bg-[#fbfbfb] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block" />
              ADMISSIONS INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
              Latest higher education research
            </h2>
          </div>

          <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-sky-600 transition-colors cursor-pointer self-start md:self-auto">
            <span>VIEW ALL RESEARCH</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="group bg-white rounded-[28px] p-7 sm:p-8 border border-slate-200/80 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div>
                {/* Category & Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${article.badgeColor}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-sky-600 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mb-6">
                  {article.excerpt}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{article.date}</span>
                <span className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
