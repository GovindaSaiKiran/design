"use client";

import React from "react";
import { usePalette } from "@/context/PaletteContext";
import { Check, Sparkles, X, Palette } from "lucide-react";

export default function PaletteSwitcherModal() {
  const { palette, allPalettes, setPaletteById, isSwitcherOpen, setIsSwitcherOpen } = usePalette();

  if (!isSwitcherOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Dashboard Color Palettes
              </h3>
              <p className="text-xs text-slate-500">
                Extracted from Coolors trending palettes. Only colors are transformed.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSwitcherOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Palettes */}
        <div className="p-4 space-y-3 max-h-[440px] overflow-y-auto">
          {allPalettes.map((p) => {
            const isSelected = p.id === palette.id;

            return (
              <div
                key={p.id}
                onClick={() => setPaletteById(p.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                  isSelected
                    ? "border-slate-900 bg-slate-50/80 shadow-xs ring-1 ring-slate-900"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {p.name}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {p.subtitle}
                    </span>
                  </div>

                  {isSelected ? (
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Select</span>
                  )}
                </div>

                <p className="text-xs text-slate-500 leading-snug">
                  {p.tagline}
                </p>

                {/* 5 Swatches bar */}
                <div className="flex items-center h-6 rounded-lg overflow-hidden border border-black/5 shadow-2xs">
                  {p.previewSwatches.map((color, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full relative group/swatch"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant live color switch • Persisted locally</span>
          </span>
          <button
            onClick={() => setIsSwitcherOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black transition-colors cursor-pointer shadow-xs"
          >
            Apply &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
