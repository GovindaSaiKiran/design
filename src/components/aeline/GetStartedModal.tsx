"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ArrowRight, Sparkles, Building2, User, Mail, MessageSquare } from "lucide-react";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export default function GetStartedModal({
  isOpen,
  onClose,
  defaultPlan = "Growth Plan"
}: GetStartedModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    plan: defaultPlan,
    message: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 p-7 sm:p-9">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-950 mb-2">
              Welcome to Aeline!
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
              We&apos;ve received your request for the <strong>{formData.plan}</strong>. Our senior AI strategist will reach out within 2 hours to schedule your onboarding.
            </p>
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition-colors cursor-pointer"
            >
              Back to Website
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                GET STARTED
              </span>
              <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                Unlock Your AI Strategy
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Begin with our consulting partners today. No long-term lock-in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="alex@company.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Company
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Acme Corp"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Selected Plan
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) =>
                      setFormData({ ...formData, plan: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 cursor-pointer"
                  >
                    <option value="Starter Plan">Starter ($2,500/mo)</option>
                    <option value="Growth Plan">Growth ($8,500/mo)</option>
                    <option value="Enterprise Plan">Enterprise ($10,500/mo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Project Goals (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your team size, tech stack, or automation goals..."
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder-slate-400 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#cdfb56] hover:bg-[#bef03f] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>CONFIRM & GET STARTED</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
