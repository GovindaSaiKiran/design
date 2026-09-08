"use client";

import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [annualBilling, setAnnualBilling] = useState(false);

  const plans = [
    {
      name: "Starter Campus Plan",
      description: "Ideal for individual colleges or departments beginning with 24/7 AI admissions.",
      monthlyPrice: 2500,
      popular: false,
      features: [
        "Up to 5,000 monthly voice call minutes",
        "Institutional knowledge RAG ingestion (up to 20 documents)",
        "3 Dedicated DID phone numbers with SIP trunking",
        "CRM integration (Slate, Salesforce, HubSpot)",
        "Real-time transcript logging and student intent tagging",
        "Email and Slack admission support"
      ],
      buttonText: "START CAMPUS PILOT",
      buttonStyle: "bg-slate-900 text-white hover:bg-slate-800"
    },
    {
      name: "Collegiate Growth Plan",
      description: "Designed for universities needing robust peak enrollment deadline coverage.",
      monthlyPrice: 8500,
      popular: true,
      features: [
        "Up to 25,000 monthly voice call minutes",
        "Sub-400ms low-latency Maya voice agent",
        "Unlimited institutional document & prospectus RAG",
        "Smart warm handoff to human admissions counselors",
        "Live call telemetry & conversion analytics dashboard",
        "Priority 24/7 peak intake SLA & dedicated integration engineer"
      ],
      buttonText: "SELECT GROWTH PLAN",
      buttonStyle: "bg-[#cdfb56] text-black hover:bg-[#bef03f] font-bold shadow-[0_4px_16px_rgba(205,251,86,0.35)]"
    },
    {
      name: "University System Enterprise",
      description: "Custom-built for multi-campus university systems and statewide collegiate networks.",
      monthlyPrice: 10500,
      popular: false,
      features: [
        "Unlimited monthly voice minutes & concurrent trunks",
        "Multi-campus multi-department intelligent routing",
        "Custom collegiate voice branding & bilingual accents",
        "SIS database bi-directional read/write integration",
        "Private VPC, FERPA compliance certification, & HIPAA alignment",
        "Dedicated account manager & 24/7 white-glove engineering support"
      ],
      buttonText: "CONTACT ADMISSIONS SALES",
      buttonStyle: "bg-slate-900 text-white hover:bg-slate-800"
    }
  ];

  return (
    <section id="pricing" className="w-full bg-[#fbfbfb] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block" />
            INSTITUTIONAL PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight leading-tight mb-4">
            Flexible Plans Built for Every Collegiate Campus
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Whether you&apos;re piloting AI voice for a single admissions cycle or scaling across an entire university network, we offer transparent plans tailored to your student volume.
          </p>

          {/* Billing Toggle (Monthly / Annual with 20% discount) */}
          <div className="mt-8 inline-flex items-center gap-3 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !annualBilling
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                annualBilling
                  ? "bg-white text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Academic Year (Annual)</span>
              <span className="bg-[#cdfb56] text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan) => {
            const price = annualBilling
              ? Math.round(plan.monthlyPrice * 0.8)
              : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`bg-white rounded-[32px] p-8 sm:p-9 border flex flex-col justify-between relative transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-slate-900 ring-2 ring-slate-900/10 shadow-lg scale-100 lg:-translate-y-2"
                    : "border-slate-200/80 shadow-sm"
                }`}
              >
                {/* Popular Pill Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-[#cdfb56] text-[11px] font-extrabold uppercase tracking-widest py-1 px-4 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#cdfb56]" />
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[36px] mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-100">
                    <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
                      ${price.toLocaleString("en-US")}.00
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      /month
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs text-slate-700 font-medium leading-normal"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan?.(plan.name)}
                  className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
