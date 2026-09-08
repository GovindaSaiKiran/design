"use client";

import React, { useState } from "react";
import { BookOpen, FileText, CheckCircle2, ShieldCheck, Search, Sparkles, ArrowRight } from "lucide-react";
import SceneContainer from "../three/SceneContainer";
import KnowledgeCore3D from "../three/KnowledgeCore3D";
import { institutionalDocuments } from "@/data/mock/knowledge";
import { soundSynth } from "@/lib/audio-synth";

export default function KnowledgeSection() {
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const activeDoc = institutionalDocuments[selectedDocIndex] || institutionalDocuments[0];

  const handleSelectDoc = (idx: number) => {
    soundSynth.playClick();
    setSelectedDocIndex(idx);
    soundSynth.playMayaSpeakingBeep(520);
  };

  return (
    <section id="knowledge" className="py-20 md:py-32 bg-[#fffdf5] border-b-3 border-black relative bg-neo-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#00f0ff] text-black border-2 border-black text-xs font-space font-black mb-4 shadow-[3px_3px_0px_#000] rotate-1">
            <BookOpen className="w-3.5 h-3.5" />
            ZERO HALLUCINATION GUARANTEE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight">
            Your institution's knowledge. <br />
            <span className="bg-[#ffe600] text-black px-3 py-0.5 border-2 border-black shadow-[4px_4px_0px_#000] inline-block font-serif-editorial italic font-normal mt-2 rotate-[-0.5deg]">
              Your AI's answers.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
            Maya does not guess or make up answers. Every response is strictly retrieved and grounded in your official university PDFs, fee schedules, and academic brochures.
          </p>
        </div>

        {/* 3D Spatial Knowledge Vector Core & Interactive Doc Explorer */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Knowledge Core Orb */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Neo-Brutal Window Frame */}
            <div className="relative w-full h-[370px] sm:h-[430px] bg-white rounded-3xl border-3 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-[#ffe600] border-b-2 border-black flex items-center justify-between z-20 font-space text-xs font-black">
                <span>RAG_VECTOR_DATABASE.INDEX</span>
                <span className="bg-black text-[#00f0ff] px-2 py-0.5 rounded text-[10px]">
                  5 SOURCES SYNCED
                </span>
              </div>

              <div className="w-full h-full pt-8 cursor-grab active:cursor-grabbing">
                <SceneContainer cameraPosition={[0, 0, 4.5]} fov={42}>
                  <KnowledgeCore3D activeDocIndex={selectedDocIndex} />
                </SceneContainer>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#a3e635] border-2 border-black px-4 py-1.5 rounded-xl shadow-[3px_3px_0px_#000] flex items-center gap-2 font-space">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span className="text-xs font-black text-black tracking-wide">
                  100% VERIFIED INSTITUTIONAL GROUNDING
                </span>
              </div>
            </div>

            {/* Document Badges Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 font-space">
              {institutionalDocuments.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDoc(idx)}
                  className={`p-2.5 rounded-xl border-2 border-black text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    selectedDocIndex === idx
                      ? "bg-[#ffe600] text-black shadow-[4px_4px_0px_#000] translate-x-[-1px] translate-y-[-1px] font-black"
                      : "bg-white text-black hover:bg-[#00f0ff] shadow-[2px_2px_0px_#000] font-bold"
                  }`}
                >
                  <FileText className="w-4 h-4 text-black shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-black block truncate">{doc.title}</span>
                    <span className="text-[10px] text-slate-700 font-semibold">{doc.category} • {doc.fileSize}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Document Citation & Grounded Answering Preview */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_#000] space-y-5">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <div>
                <span className="text-xs font-mono font-black text-slate-600 uppercase">
                  {activeDoc.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-black text-black tracking-tight flex items-center gap-2 mt-0.5">
                  <FileText className="w-4 h-4 text-[#ff53cd]" />
                  {activeDoc.title}
                </h3>
              </div>
              <span className="text-[11px] font-space font-black bg-[#a3e635] text-black px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] shrink-0">
                VECTOR INDEXED
              </span>
            </div>

            <p className="text-xs text-slate-800 font-sans font-medium">
              When a prospective applicant asks a question related to this policy, Maya quotes verified clauses with exact page references.
            </p>

            {/* Sample Verified QA Pair */}
            <div className="space-y-3.5">
              {activeDoc.sampleQuestions.map((qa, qIdx) => (
                <div key={qIdx} className="p-4 rounded-2xl bg-[#fffdf5] border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                  <div className="flex items-start gap-2">
                    <Search className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span className="text-xs font-space font-black text-black">
                      Applicant asks: "{qa.question}"
                    </span>
                  </div>

                  <div className="pl-6 border-l-3 border-[#00f0ff] text-xs text-slate-900 leading-relaxed font-sans font-medium">
                    <span className="font-space font-black text-black block mb-0.5">Maya Answers:</span>
                    {qa.answer}
                  </div>

                  <div className="flex items-center justify-end gap-1 text-[11px] font-mono text-black pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                    Citation: <strong className="text-black font-mono font-bold bg-[#ffe600] px-1.5 py-0.2 border border-black rounded">{qa.citation}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Institutional Assurance */}
            <div className="p-3.5 rounded-xl bg-[#c084fc] text-black border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-between text-xs font-space">
              <span className="font-bold">Upload your PDFs once. Maya syncs updates instantly.</span>
              <Sparkles className="w-4 h-4 text-black shrink-0 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
