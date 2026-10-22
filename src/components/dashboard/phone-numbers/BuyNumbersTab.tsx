"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  PhoneCall,
  Check,
  Building2,
  Globe2,
  Radio,
  CheckCircle2,
  Info,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Smartphone,
  PhoneForwarded,
} from "lucide-react";
import {
  AvailableMarketplaceNumber,
  PhoneNumberType,
  PhoneNumberCapability,
} from "@/types/phoneNumbers";

interface BuyNumbersTabProps {
  catalog: AvailableMarketplaceNumber[];
  onSelectNumberToBuy: (number: AvailableMarketplaceNumber) => void;
  isLoading?: boolean;
}

const COUNTRIES = [
  { id: "all", name: "All Countries", flag: "🌐" },
  { id: "India", name: "India (+91)", flag: "🇮🇳" },
  { id: "United States", name: "United States (+1)", flag: "🇺🇸" },
  { id: "United Kingdom", name: "United Kingdom (+44)", flag: "🇬🇧" },
  { id: "Singapore", name: "Singapore (+65)", flag: "🇸🇬" },
  { id: "United Arab Emirates", name: "United Arab Emirates (+971)", flag: "🇦🇪" },
];

const NUMBER_TYPES: Array<{
  type: PhoneNumberType | "All";
  label: string;
  desc: string;
  icon: any;
}> = [
  {
    type: "All",
    label: "All Types",
    desc: "Show all available numbers across categories",
    icon: Globe2,
  },
  {
    type: "Local",
    label: "Local Number",
    desc: "Tied to a specific city or area code (e.g. 040 Hyderabad, 212 NYC)",
    icon: Building2,
  },
  {
    type: "Toll-Free",
    label: "Toll-Free Number",
    desc: "Free for callers (e.g. 1800 series). Ideal for centralized admissions helplines",
    icon: PhoneForwarded,
  },
  {
    type: "Mobile Virtual",
    label: "Mobile Virtual",
    desc: "Direct SMS and WhatsApp Business eligible virtual mobile number",
    icon: Smartphone,
  },
  {
    type: "National",
    label: "National Number",
    desc: "Nationwide recognizable presence without local geographic tie",
    icon: Radio,
  },
];

const CAPABILITY_OPTIONS: Array<{
  capability: PhoneNumberCapability;
  label: string;
}> = [
  { capability: "Voice Inbound", label: "Inbound Calls" },
  { capability: "Voice Outbound", label: "Outbound Calling" },
  { capability: "Two-Way SMS", label: "Two-Way SMS" },
  { capability: "WhatsApp Eligible", label: "WhatsApp Eligible" },
];

export default function BuyNumbersTab({
  catalog,
  onSelectNumberToBuy,
  isLoading = false,
}: BuyNumbersTabProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const [selectedType, setSelectedType] = useState<PhoneNumberType | "All">("All");
  const [selectedCapabilities, setSelectedCapabilities] = useState<PhoneNumberCapability[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [areaCodeQuery, setAreaCodeQuery] = useState("");

  const toggleCapability = (cap: PhoneNumberCapability) => {
    setSelectedCapabilities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]
    );
  };

  const filteredNumbers = useMemo(() => {
    return catalog.filter((num) => {
      // Country filter
      if (selectedCountry !== "all" && num.country !== selectedCountry) {
        return false;
      }
      // Type filter
      if (selectedType !== "All" && num.type !== selectedType) {
        return false;
      }
      // Capabilities filter
      if (selectedCapabilities.length > 0) {
        const hasAll = selectedCapabilities.every((cap) =>
          num.capabilities.includes(cap)
        );
        if (!hasAll) return false;
      }
      // Search query filter (digits or text)
      if (searchQuery.trim()) {
        const cleanQuery = searchQuery.trim().toLowerCase().replace(/[\s\-\+]/g, "");
        const cleanNumber = num.phoneNumber.replace(/[\s\-\+]/g, "").toLowerCase();
        const matchesPhone = cleanNumber.includes(cleanQuery);
        const matchesRegion = num.region.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesProvider = num.provider.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesPhone && !matchesRegion && !matchesProvider) return false;
      }
      // Area code query filter
      if (areaCodeQuery.trim()) {
        const code = areaCodeQuery.trim().toLowerCase();
        if (
          !num.cityAreaCode.toLowerCase().includes(code) &&
          !num.phoneNumber.includes(code)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [catalog, selectedCountry, selectedType, selectedCapabilities, searchQuery, areaCodeQuery]);

  const resetFilters = () => {
    setSelectedCountry("all");
    setSelectedType("All");
    setSelectedCapabilities([]);
    setSearchQuery("");
    setAreaCodeQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Step 1 & 2 Filter Cards Grid */}
      <div className="bg-white rounded-3xl border border-[#E9E1D4] p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
          <div>
            <h2 className="text-base font-bold text-[#283A50] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C4A5E8]" />
              Discover &amp; Rent Phone Numbers
            </h2>
            <p className="text-xs text-[#707684] mt-0.5">
              Filter by country jurisdiction, phone number format, and telephony features backed by enterprise carrier routing.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="self-start md:self-auto text-xs font-semibold text-[#283A50] hover:text-[#2E8066] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Step 1: Choose Location */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707684] mb-2.5">
            Step 1: Choose Country Location
          </label>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map((c) => {
              const isSelected = selectedCountry === c.name || (c.id === "all" && selectedCountry === "all");
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountry(c.id === "all" ? "all" : c.name)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#283A50] text-white border-[#283A50] shadow-sm"
                      : "bg-[#FAF5E9]/60 text-[#283A50] border-[#E9E1D4] hover:bg-[#FAF5E9] hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Number Type */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707684] mb-2.5">
            Step 2: Choose Number Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {NUMBER_TYPES.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedType === item.type;
              return (
                <button
                  key={item.type}
                  onClick={() => setSelectedType(item.type)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#FAF5E9] border-[#283A50] shadow-xs"
                      : "bg-white border-[#E9E1D4] hover:border-slate-300 hover:bg-[#FAF5E9]/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-[#283A50] text-white" : "bg-[#FAF5E9] text-[#283A50]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#2E8066] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#283A50]">{item.label}</h4>
                    <p className="text-[10px] text-[#707684] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Select Features & Search */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707684] mb-2.5">
            Step 3: Select Telephony Capabilities &amp; Filter
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {CAPABILITY_OPTIONS.map((cap) => {
              const isSelected = selectedCapabilities.includes(cap.capability);
              return (
                <button
                  key={cap.capability}
                  onClick={() => toggleCapability(cap.capability)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#B8DEC8]/50 text-[#165B4C] border-[#2E8066] font-semibold"
                      : "bg-white text-[#707684] border-[#E9E1D4] hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[9px] ${
                      isSelected
                        ? "bg-[#2E8066] border-[#2E8066] text-white"
                        : "border-[#707684]/40 bg-white"
                    }`}
                  >
                    {isSelected && "✓"}
                  </div>
                  <span>{cap.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search digits (e.g. 4590, 800) or region (Hyderabad, London)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5E9]/40 border border-[#E9E1D4] rounded-2xl text-xs text-[#283A50] placeholder:text-slate-400 focus:outline-hidden focus:border-[#283A50] focus:bg-white transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={areaCodeQuery}
                onChange={(e) => setAreaCodeQuery(e.target.value)}
                placeholder="Filter by Area Code (e.g. 040, 080, 212, 020, 1800)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5E9]/40 border border-[#E9E1D4] rounded-2xl text-xs text-[#283A50] placeholder:text-slate-400 focus:outline-hidden focus:border-[#283A50] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Billing Notice */}
      <div className="p-4 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-start gap-3 text-xs text-[#283A50]">
        <Info className="w-4 h-4 text-[#283A50] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Transparent Telecommunications Pricing:</span> Number rental is billed on a monthly recurring basis to retain ownership. Talk-time minutes (inbound &amp; outbound) are billed at carrier usage rates as calls occur. You can release rented numbers anytime with zero lock-in.
        </div>
      </div>

      {/* Step 4: Search Results Table */}
      <div className="bg-white rounded-3xl border border-[#E9E1D4] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E9E1D4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-[#283A50]">
              Available Numbers Marketplace
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF5E9] border border-[#E9E1D4] text-[#283A50]">
              {filteredNumbers.length} numbers found
            </span>
          </div>
          <span className="text-[11px] text-[#707684]">
            Prices listed in local billing currency
          </span>
        </div>

        {filteredNumbers.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] mx-auto flex items-center justify-center text-[#707684]">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#283A50]">No phone numbers match your criteria</h4>
            <p className="text-xs text-[#707684] max-w-sm mx-auto">
              Try adjusting your area code, removing capability filters, or switching countries to explore available inventory.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#283A50] text-white hover:bg-black transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E9E1D4] bg-[#FAF5E9]/50 text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                  <th className="py-3 px-5">Phone Number</th>
                  <th className="py-3 px-5">Location / Region</th>
                  <th className="py-3 px-5">Number Type</th>
                  <th className="py-3 px-5">Supported Capabilities</th>
                  <th className="py-3 px-5">Monthly Rental</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E1D4]">
                {filteredNumbers.map((num) => {
                  return (
                    <tr
                      key={num.id}
                      className="hover:bg-[#FAF5E9]/30 transition-colors group"
                    >
                      {/* Phone Number */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{num.flagEmoji}</span>
                          <div>
                            <span className="font-mono font-bold text-sm text-[#283A50] tracking-tight">
                              {num.phoneNumber}
                            </span>
                            <div className="text-[10px] text-[#707684] mt-0.5">
                              Carrier: {num.provider}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Region */}
                      <td className="py-4 px-5">
                        <div className="font-medium text-[#283A50]">{num.region}</div>
                        <div className="text-[10px] text-[#707684]">{num.country}</div>
                      </td>

                      {/* Number Type */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                            num.type === "Toll-Free"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : num.type === "Mobile Virtual"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : num.type === "National"
                              ? "bg-sky-50 text-sky-800 border-sky-200"
                              : "bg-[#FAF5E9] text-[#283A50] border-[#E9E1D4]"
                          }`}
                        >
                          {num.type}
                        </span>
                      </td>

                      {/* Capabilities */}
                      <td className="py-4 px-5">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {num.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium ${
                                cap === "WhatsApp Eligible"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                                  : cap === "Two-Way SMS"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]"
                              }`}
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="py-4 px-5">
                        <div className="font-mono font-bold text-sm text-[#283A50]">
                          {num.currency === "INR" ? "₹" : num.currency === "USD" ? "$" : num.currency === "GBP" ? "£" : `${num.currency} `}
                          {num.monthlyPrice.toLocaleString()}
                          <span className="text-[10px] font-sans font-normal text-[#707684]">
                            /mo
                          </span>
                        </div>
                        <div className="text-[10px] text-[#2E8066] font-medium">
                          {num.setupFee === 0 ? "Zero setup fee" : `+${num.currency} ${num.setupFee} setup`}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => onSelectNumberToBuy(num)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#283A50] hover:bg-black text-white transition-all cursor-pointer shadow-xs group-hover:scale-[1.02]"
                        >
                          <span>Buy Number</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
