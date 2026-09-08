"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, Building, Mail, Phone, User, Sparkles, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { soundSynth } from "@/lib/audio-synth";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    role: "Dean / Director of Admissions",
    email: "",
    phone: "",
    annualInquiries: "5,000 - 20,000 inquiries/year",
    preferredDate: "Next Available (Within 24h)"
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundSynth.playCallChime();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fffdf5] rounded-3xl border-4 border-black shadow-[12px_12px_0px_#000] p-6 md:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-black text-white hover:bg-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer shadow-[2px_2px_0px_#fff]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2 font-space">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
                <Zap className="w-3.5 h-3.5 text-black fill-black" />
                INSTITUTIONAL VIP PILOT
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
              Book a 1-on-1 <span className="bg-[#00f0ff] px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000] inline-block font-serif-editorial italic font-normal">Strategy Demo</span>
            </h3>
            <p className="mt-2 text-sm text-slate-800 font-sans font-medium">
              See how Maya can handle your incoming admission phone calls, qualify applicants, and integrate with your CRM.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-space font-black text-black mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-black" />
                    <input
                      type="text"
                      required
                      placeholder="Dr. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border-2 border-black rounded-xl focus:bg-[#ffe600]/20 font-medium outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-space font-black text-black mb-1">
                    Institution Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-4 h-4 text-black" />
                    <input
                      type="text"
                      required
                      placeholder="Apex University"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border-2 border-black rounded-xl focus:bg-[#ffe600]/20 font-medium outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-space font-black text-black mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-black" />
                    <input
                      type="email"
                      required
                      placeholder="rajesh@apexuniv.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border-2 border-black rounded-xl focus:bg-[#ffe600]/20 font-medium outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-space font-black text-black mb-1">
                    Direct Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-black" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border-2 border-black rounded-xl focus:bg-[#ffe600]/20 font-medium outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-space font-black text-black mb-1">
                  Expected Annual Call & Inquiry Volume
                </label>
                <select
                  value={formData.annualInquiries}
                  onChange={(e) => setFormData({ ...formData, annualInquiries: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm bg-white border-2 border-black rounded-xl focus:bg-[#ffe600]/20 font-medium outline-none shadow-[2px_2px_0px_#000]"
                >
                  <option>1,000 - 5,000 inquiries/year (Single College / School)</option>
                  <option>5,000 - 20,000 inquiries/year (Medium University / Campus)</option>
                  <option>20,000 - 100,000+ inquiries/year (Multi-Campus System)</option>
                </select>
              </div>

              <div className="pt-2 font-space">
                <button
                  type="submit"
                  className="w-full neo-btn neo-btn-primary py-4 px-4 rounded-2xl text-sm font-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Confirm Demo Invitation
                </button>
                <p className="mt-2 text-center text-xs text-slate-700 font-sans font-medium">
                  Includes full live SIP telephony testing & custom knowledge ingestion review.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 font-space">
            <div className="w-16 h-16 bg-[#a3e635] text-black border-3 border-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_#000]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="font-display text-2xl sm:text-3xl font-black text-black">DEMO SCHEDULED!</h4>
            <p className="mt-2 text-sm text-slate-800 max-w-sm mx-auto font-sans font-medium">
              Thank you, <span className="font-bold text-black font-space">{formData.name}</span>. An invitation and test phone number for <span className="font-bold text-black font-space">{formData.institution}</span> has been sent to <span className="font-bold text-black font-space">{formData.email}</span>.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-white border-2 border-black text-left text-xs space-y-1 text-black font-space shadow-[3px_3px_0px_#000]">
              <div className="flex justify-between">
                <span className="font-bold text-slate-600">Scheduled Time:</span>
                <span className="font-black text-black">Tomorrow at 11:00 AM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-600">Dedicated Specialist:</span>
                <span className="font-black text-black">Ms. Preeti Sen (Admissions AI)</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 w-full neo-btn bg-black text-white py-3 px-4 rounded-xl font-black text-xs cursor-pointer shadow-[3px_3px_0px_#000]"
            >
              Back to Landing Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
