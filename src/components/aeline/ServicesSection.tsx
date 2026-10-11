"use client";

import React, { useState } from "react";
import { soundSynth } from "@/lib/audio-synth";

interface ServicesSectionProps {
  onOpenDemo?: () => void;
}

export default function ServicesSection({ onOpenDemo }: ServicesSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      id: "voice",
      title: "voice",
      stackedTitle: false,
      hasDivider: false,
      bg: "bg-[#1d644d]", // Rich pine green from template
      textColor: "text-white",
      bulletColor: "text-[#a7f3d0]",
      rotation: "-rotate-[6deg]",
      zIndex: "z-10",
      stickerPos: "-top-8 right-3",
      sticker: (
        <div className="relative transform -rotate-10 hover:rotate-0 hover:scale-110 transition-transform duration-300 drop-shadow-[0_5px_12px_rgba(0,0,0,0.25)]">
          {/* Die-cut Black Retro Camera with White Flash Sparks */}
          <svg width="68" height="62" viewBox="0 0 76 70" fill="none">
            {/* White die-cut outer silhouette outline */}
            <path
              d="M22 24 L26 18 L40 18 L44 24 L60 24 C64 24 68 28 68 32 L68 56 C68 60 64 64 60 64 L18 64 C14 64 10 60 10 56 L10 32 C10 28 14 24 18 24 Z"
              fill="#18181b"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <circle cx="39" cy="44" r="13" stroke="#ffffff" strokeWidth="3" fill="#27272a" />
            <circle cx="39" cy="44" r="6" fill="#ffffff" />
            <circle cx="56" cy="32" r="2.8" fill="#ffffff" />
            <path d="M30 10 L34 4 M44 4 L48 10 M22 14 L16 10" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M52 10 L60 7 M64 16 L70 14" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>
      ),
      bullets: [
        "Sub-400ms Voice",
        "11+ Indic Languages",
        "Natural Conversational Tone",
        "Carrier SIP & WebRTC Ready",
      ],
    },
    {
      id: "rag",
      title: "vector rag",
      stackedTitle: false,
      hasDivider: false,
      bg: "bg-[#6384f7]", // Periwinkle blue from template
      textColor: "text-white",
      bulletColor: "text-[#dbeafe]",
      rotation: "-rotate-[2.5deg]",
      zIndex: "z-20",
      stickerPos: "-top-8 left-2",
      sticker: (
        <div className="relative transform -rotate-12 hover:rotate-0 hover:scale-110 transition-transform duration-300 drop-shadow-[0_5px_12px_rgba(0,0,0,0.22)]">
          {/* Die-cut Pale Lime Hand Holding Phone with Radio Waves */}
          <svg width="64" height="66" viewBox="0 0 70 74" fill="none">
            <rect
              x="10"
              y="12"
              width="44"
              height="52"
              rx="18"
              fill="#d9f99d"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinejoin="round"
              transform="rotate(6 32 38)"
            />
            <rect
              x="22"
              y="16"
              width="24"
              height="42"
              rx="5"
              fill="#ffffff"
              stroke="#b91c1c"
              strokeWidth="2.5"
            />
            <line x1="30" y1="20" x2="38" y2="20" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
            <circle cx="34" cy="52" r="1.8" fill="#b91c1c" />
            <path
              d="M16 36 C16 36 24 36 24 42 C24 48 16 48 16 48"
              stroke="#b91c1c"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M14 22 C10 26 10 32 14 36" stroke="#b91c1c" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M52 20 C56 24 56 30 52 34" stroke="#b91c1c" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      ),
      bullets: [
        "Prospectus & Fee RAG",
        "Zero-Hallucination Answers",
        "Cutoff & Eligibility Matching",
        "Multi-Turn Student Memory",
      ],
    },
    {
      id: "fleet",
      title: "24/7 fleet",
      stackedTitle: false,
      hasDivider: false,
      bg: "bg-[#f65723]", // Vibrant Tomato Orange from template
      textColor: "text-white",
      bulletColor: "text-[#fed7aa]",
      rotation: "rotate-[0.5deg]",
      zIndex: "z-30",
      stickerPos: "-top-8 left-1/2 -translate-x-1/2",
      sticker: (
        <div className="relative transform rotate-6 hover:rotate-0 hover:scale-110 transition-transform duration-300 drop-shadow-[0_5px_12px_rgba(0,0,0,0.22)]">
          {/* Die-cut Periwinkle Blue Winking Smiley Face */}
          <svg width="60" height="60" viewBox="0 0 66 66" fill="none">
            <circle cx="33" cy="33" r="27" fill="#3b82f6" stroke="#ffffff" strokeWidth="4.5" />
            <path d="M23 29 C24 26 28 26 29 29" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse cx="41" cy="28" rx="2.5" ry="3.5" fill="#ffffff" />
            <path
              d="M23 37 C25 44 39 44 43 37"
              stroke="#ffffff"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      ),
      bullets: [
        "Zero-Hold Telephony Lines",
        "10,000+ Concurrent Calls",
        "Admissions Peak Elasticity",
        "Automated Callback Queues",
      ],
    },
    {
      id: "handoff",
      title: "smart handoff",
      stackedTitle: true,
      hasDivider: false,
      bg: "bg-[#8c264a]", // Deep Burgundy Wine from template
      textColor: "text-white",
      bulletColor: "text-[#fbcfe8]",
      rotation: "rotate-[4deg]",
      zIndex: "z-40",
      stickerPos: "-top-8 right-4",
      sticker: (
        <div className="relative transform rotate-8 hover:rotate-0 hover:scale-110 transition-transform duration-300 drop-shadow-[0_5px_12px_rgba(0,0,0,0.22)]">
          {/* Die-cut Pale Yellow Handshake / Watch Hand with Sparkles */}
          <svg width="66" height="62" viewBox="0 0 74 68" fill="none">
            <path
              d="M14 30 C14 20 22 16 34 16 C46 16 58 18 62 28 C66 38 62 50 50 54 C38 58 20 56 16 46 Z"
              fill="#fef08a"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <rect x="20" y="26" width="10" height="14" rx="2" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
            <circle cx="25" cy="33" r="3.5" fill="#ffffff" stroke="#c2410c" strokeWidth="1.2" />
            <path
              d="M30 28 C38 24 48 24 54 30 C58 34 56 40 48 42 C40 44 32 40 30 36"
              stroke="#c2410c"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M24 12 L26 8 M36 10 L38 6 M48 12 L52 8" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
      ),
      bullets: [
        "Sentiment & Tone Triggers",
        "Warm Counselor Routing",
        "Live Student Dossiers",
        "Zero-Drop Call Transfers",
      ],
    },
    {
      id: "crm",
      title: "crm bi-sync",
      stackedTitle: true,
      hasDivider: true, // Specific design element from template image
      bg: "bg-[#e0a6ff]", // Soft Lilac Pink from template
      textColor: "text-[#18181b]", // Dark charcoal text on light card
      bulletColor: "text-[#4a044e]",
      rotation: "rotate-[7.5deg]",
      zIndex: "z-50",
      stickerPos: "-top-8 right-3",
      sticker: (
        <div className="relative transform rotate-14 hover:rotate-0 hover:scale-110 transition-transform duration-300 drop-shadow-[0_5px_12px_rgba(0,0,0,0.22)]">
          {/* Die-cut Burgundy Heart with 2 White Sparkle Stars */}
          <svg width="64" height="60" viewBox="0 0 70 66" fill="none">
            <path
              d="M35 56 C35 56 12 42 12 26 C12 18 18 12 26 12 C32 12 35 16 35 16 C35 16 38 12 44 12 C52 12 58 18 58 26 C58 42 35 56 35 56 Z"
              fill="#831843"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path
              d="M45 20 Q45 26 49 26 Q45 26 45 32 Q45 26 41 26 Q45 26 45 20 Z"
              fill="#ffffff"
            />
            <path
              d="M32 28 Q32 31 34 31 Q32 31 32 34 Q32 31 30 31 Q32 31 32 28 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      ),
      bullets: [
        "Salesforce & HubSpot CRM",
        "LeadSquared & ExtraaEdge",
        "Campus SIS ERP Webhooks",
        "WhatsApp Cloud API",
      ],
    },
  ];

  return (
    <section
      id="capabilities"
      className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100/90 overflow-hidden select-none"
    >
      <div className="max-w-[1340px] mx-auto">
        {/* ================================================================= */}
        {/* WARM CREAM RETRO POSTER CONTAINER BLENDED SEAMLESSLY ON WHITE     */}
        {/* ================================================================= */}
        <div className="bg-[#fcfaf4] rounded-[36px] sm:rounded-[46px] p-6 sm:p-9 lg:p-12 border border-stone-200/80 shadow-[0_10px_35px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden">
          {/* =============================================================== */}
          {/* TOP BAR: Orange Starburst 'work' | Cursive 'swaram' | WhatsApp   */}
          {/* =============================================================== */}
          <div className="flex items-center justify-between pb-6 sm:pb-9 relative z-10">
            {/* Left Orange Starburst Badge with 'work' */}
            <div
              onClick={() => onOpenDemo?.()}
              className="flex items-center gap-2 group cursor-pointer"
              title="Swaram Work Capabilities"
            >
              <div className="relative flex items-center justify-center">
                {/* 12-point jagged starburst */}
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 48 48"
                  className="text-[#f95723] drop-shadow-2xs group-hover:rotate-45 transition-transform duration-500"
                  fill="currentColor"
                >
                  <path d="M24 0 L28 10 L39 5 L36 16 L48 18 L40 26 L48 34 L36 36 L39 47 L28 42 L24 52 L20 42 L9 47 L12 36 L0 34 L8 26 L0 18 L12 16 L9 5 L20 10 Z" />
                </svg>
                {/* Black lowercase 'work' text matching template */}
                <span className="absolute font-black text-xs lowercase tracking-tight text-slate-950 select-none">
                  work
                </span>
              </div>
            </div>

            {/* Center Fluid Cursive Wordmark: 'swaram' */}
            <div className="text-center">
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="italic font-black text-3xl sm:text-4xl text-slate-950 tracking-tight select-none lowercase"
              >
                swaram
              </span>
            </div>

            {/* Right WhatsApp / Chat Icon Badge */}
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us"
              className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              {/* WhatsApp speech bubble & handset glyph */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C16.58 3.68 20.27 7.37 20.27 11.91C20.27 16.45 16.58 20.15 12.04 20.15ZM16.56 14.36C16.31 14.24 15.09 13.64 14.86 13.56C14.64 13.47 14.47 13.43 14.31 13.68C14.14 13.93 13.66 14.49 13.51 14.66C13.37 14.82 13.22 14.85 12.97 14.72C12.72 14.6 11.93 14.34 10.99 13.5C10.26 12.85 9.77 12.04 9.63 11.79C9.48 11.54 9.61 11.41 9.74 11.28C9.85 11.17 9.98 11 10.11 10.85C10.23 10.71 10.28 10.6 10.36 10.44C10.44 10.27 10.4 10.13 10.34 10.01C10.28 9.88 9.78 8.66 9.58 8.16C9.37 7.67 9.17 7.74 9.02 7.73C8.87 7.72 8.71 7.72 8.54 7.72C8.37 7.72 8.1 7.79 7.87 8.03C7.64 8.28 7 8.88 7 10.1C7 11.32 7.89 12.5 8.01 12.67C8.14 12.83 9.75 15.32 12.22 16.38C12.81 16.63 13.26 16.78 13.62 16.9C14.21 17.08 14.75 17.06 15.17 17C15.64 16.93 16.61 16.41 16.82 15.83C17.02 15.25 17.02 14.76 16.96 14.65C16.9 14.55 16.75 14.49 16.56 14.36Z" />
              </svg>
            </a>
          </div>

          {/* =============================================================== */}
          {/* DISPLAY HEADLINE: 'call us if you need:' (EXACT MATCH TEMPLATE) */}
          {/* =============================================================== */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 relative z-10">
            <h2 className="text-3xl sm:text-5xl lg:text-[60px] font-black text-slate-950 tracking-tight leading-none font-sans">
              call us if you{" "}
              <span className="font-serif italic font-normal relative inline-block text-slate-950 ml-1">
                need:
                {/* Hand-drawn double sketchy underlines from template */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full overflow-visible pointer-events-none"
                  viewBox="0 0 130 18"
                  fill="none"
                >
                  <path
                    d="M 2 5 C 32 1.5, 85 2.5, 128 6"
                    stroke="#0f172a"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 8 13 C 38 10, 92 11, 122 14"
                    stroke="#0f172a"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* =============================================================== */}
          {/* 5 OVERLAPPING TILTED CARDS (COMPACT LENGTH / REDUCED HEIGHT)    */}
          {/* =============================================================== */}
          <div className="relative z-10 pt-3 pb-2">
            {/* Desktop / Tablet Fan-Out Container */}
            <div className="hidden md:flex items-stretch justify-center -space-x-3 lg:-space-x-5 xl:-space-x-6 max-w-[1200px] mx-auto px-2">
              {cards.map((card, idx) => {
                const isHovered = hoveredCard === idx;
                return (
                  <div
                    key={card.id}
                    onMouseEnter={() => {
                      setHoveredCard(idx);
                      soundSynth.playPop();
                    }}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => {
                      soundSynth.playPop();
                      onOpenDemo?.();
                    }}
                    className={`relative w-48 lg:w-52 xl:w-56 min-h-[290px] lg:min-h-[310px] rounded-[22px] sm:rounded-[26px] p-5 lg:p-5 flex flex-col justify-between transition-all duration-300 origin-bottom cursor-pointer shadow-md hover:shadow-xl ${
                      card.bg
                    } ${
                      isHovered
                        ? "rotate-0 scale-105 z-60 -translate-y-4 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.28)]"
                        : `${card.rotation} ${card.zIndex}`
                    }`}
                  >
                    {/* Die-Cut Sticker Placed on Top */}
                    <div className={`absolute ${card.stickerPos} pointer-events-none`}>
                      {card.sticker}
                    </div>

                    {/* Card Title (Bold Lowercase from Reference) */}
                    <div className="pt-1">
                      {card.stackedTitle ? (
                        <h3
                          className={`text-xl sm:text-[22px] font-black tracking-tight leading-tight lowercase ${card.textColor}`}
                        >
                          {card.title.split(" ").map((word, wIdx) => (
                            <span key={wIdx} className="block">
                              {word}
                            </span>
                          ))}
                        </h3>
                      ) : (
                        <h3
                          className={`text-xl sm:text-[22px] font-black tracking-tight leading-none lowercase ${card.textColor}`}
                        >
                          {card.title}
                        </h3>
                      )}

                      {/* Card 5 Distinctive Horizontal Separator Line */}
                      {card.hasDivider && (
                        <div className="w-full h-[1.5px] bg-[#18181b]/80 my-2 rounded-full" />
                      )}
                    </div>

                    {/* Compact Bullet Points with ✦ Stars */}
                    <ul className={`space-y-1.5 sm:space-y-2 my-auto ${card.hasDivider ? "pt-1 pb-2" : "py-2"}`}>
                      {card.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className={`text-[11.5px] sm:text-xs font-medium leading-snug flex items-start gap-1.5 ${card.textColor}`}
                        >
                          <span className={`text-[9px] mt-0.5 shrink-0 ${card.bulletColor}`}>✦</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Clean compact bottom margin */}
                    <div className="h-1" />
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipeable / Scrollable Carousel */}
            <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-3.5 pb-5 pt-7 px-4 no-scrollbar">
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => {
                    soundSynth.playPop();
                    onOpenDemo?.();
                  }}
                  className={`snap-center shrink-0 w-[240px] min-h-[290px] rounded-[22px] p-5 flex flex-col justify-between shadow-lg relative ${card.bg}`}
                >
                  {/* Top Sticker */}
                  <div className={`absolute ${card.stickerPos} pointer-events-none`}>
                    {card.sticker}
                  </div>

                  {/* Card Title */}
                  <div className="pt-1">
                    {card.stackedTitle ? (
                      <h3 className={`text-xl font-black tracking-tight leading-tight lowercase ${card.textColor}`}>
                        {card.title.split(" ").map((word, wIdx) => (
                          <span key={wIdx} className="block">
                            {word}
                          </span>
                        ))}
                      </h3>
                    ) : (
                      <h3 className={`text-xl font-black tracking-tight lowercase ${card.textColor}`}>
                        {card.title}
                      </h3>
                    )}

                    {card.hasDivider && (
                      <div className="w-full h-[1.5px] bg-[#18181b]/80 my-2 rounded-full" />
                    )}
                  </div>

                  {/* Bullets */}
                  <ul className={`space-y-2 my-auto ${card.hasDivider ? "pt-1 pb-2" : "py-2"}`}>
                    {card.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className={`text-xs font-medium leading-snug flex items-start gap-1.5 ${card.textColor}`}
                      >
                        <span className={`text-[9px] mt-0.5 shrink-0 ${card.bulletColor}`}>✦</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="h-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
