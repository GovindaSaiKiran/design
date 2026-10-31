"use client";

import React from "react";
import {
  User,
  Building2,
  Users,
  CreditCard,
  Bell,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Layers,
  KeyRound,
  Sliders,
  PhoneForwarded,
} from "lucide-react";
import { SettingsTabKey } from "@/types/settings";

interface SettingsNavigationProps {
  activeTab: SettingsTabKey;
  onSelectTab: (tab: SettingsTabKey) => void;
  hasUnsavedChanges?: boolean;
}

interface NavItemDef {
  key: SettingsTabKey;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ACCOUNT_ITEMS: NavItemDef[] = [
  {
    key: "profile",
    label: "1. Personal Information",
    description: "Name, photo, email & display locale",
    icon: User,
  },
  {
    key: "security",
    label: "2. Security & Privacy",
    description: "Password, 2FA, sessions & DPDP data retention",
    icon: ShieldCheck,
  },
  {
    key: "notifications",
    label: "3. Notification Settings",
    description: "11 telephony event channels & email alerts",
    icon: Bell,
  },
];

const WORKSPACE_ITEMS: NavItemDef[] = [
  {
    key: "organization",
    label: "4. Organization Profile",
    description: "Company details, address, logo & workspaces",
    icon: Building2,
  },
  {
    key: "swaram-preferences",
    label: "5. My Swaram Preferences",
    description: "Multi-select goals, audience & channels",
    icon: Sparkles,
  },
  {
    key: "campaign-defaults",
    label: "6. Communication Preferences",
    description: "Reusable campaign defaults & calling window",
    icon: PhoneForwarded,
  },
  {
    key: "team",
    label: "7. Team & Access",
    description: "Manage members, invitations & permissions",
    icon: Users,
  },
  {
    key: "billing",
    label: "8. Subscription & Billing",
    description: "Included minutes, usage, trunks & invoices",
    icon: CreditCard,
  },
];

const CONNECTION_ITEMS: NavItemDef[] = [
  {
    key: "ai-services",
    label: "AI Services",
    description: "Voice models, speech recognition & synthesis",
    icon: Sparkles,
  },
  {
    key: "phone-calling",
    label: "Phone Calling",
    description: "Enterprise PRI, SIP trunks & caller ID",
    icon: PhoneCall,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    description: "Official Business API connection",
    icon: MessageSquare,
  },
  {
    key: "other-apps",
    label: "Other Apps",
    description: "CRMs, Google Sheets, Slack & Zapier",
    icon: Layers,
  },
  {
    key: "advanced",
    label: "Advanced Settings",
    description: "Developer webhooks & secure API access keys",
    icon: KeyRound,
  },
];

export default function SettingsNavigation({
  activeTab,
  onSelectTab,
  hasUnsavedChanges,
}: SettingsNavigationProps) {
  // Normalize alias keys
  const effectiveTab =
    activeTab === "workspace"
      ? "organization"
      : activeTab === "preferences"
      ? "swaram-preferences"
      : activeTab;

  return (
    <div className="space-y-6">
      {/* Mobile Selector Dropdown */}
      <div className="lg:hidden bg-white p-3.5 rounded-2xl border border-[#E9E1D4] shadow-xs">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707684] mb-1.5">
          Settings Section:
        </label>
        <select
          value={effectiveTab}
          onChange={(e) => onSelectTab(e.target.value as SettingsTabKey)}
          className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] text-[#283A50] focus:outline-none"
        >
          <optgroup label="ACCOUNT SETTINGS">
            {ACCOUNT_ITEMS.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="WORKSPACE SETTINGS">
            {WORKSPACE_ITEMS.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="SYSTEM CONNECTIONS">
            {CONNECTION_ITEMS.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block bg-white rounded-2xl border border-[#E9E1D4] p-3 shadow-2xs space-y-5">
        {/* Group 1: ACCOUNT SETTINGS */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] px-3 block mb-2">
            Account Settings
          </span>
          <nav className="space-y-1">
            {ACCOUNT_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = effectiveTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectTab(item.key)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                    isActive
                      ? "bg-[#FAF5E9] text-[#283A50] font-bold border border-[#E9E1D4] shadow-2xs"
                      : "text-[#707684] hover:text-[#283A50] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isActive ? "text-[#283A50]" : "text-[#707684]"
                    }`}
                  />
                  <div className="min-w-0">
                    <span className="text-xs block leading-tight">{item.label}</span>
                    <span className="text-[10px] text-[#707684] block font-normal truncate mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="h-px bg-[#E9E1D4]" />

        {/* Group 2: WORKSPACE SETTINGS */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] px-3 block mb-2">
            Workspace Settings
          </span>
          <nav className="space-y-1">
            {WORKSPACE_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = effectiveTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectTab(item.key)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                    isActive
                      ? "bg-[#FAF5E9] text-[#283A50] font-bold border border-[#E9E1D4] shadow-2xs"
                      : "text-[#707684] hover:text-[#283A50] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isActive ? "text-[#283A50]" : "text-[#707684]"
                    }`}
                  />
                  <div className="min-w-0">
                    <span className="text-xs block leading-tight">{item.label}</span>
                    <span className="text-[10px] text-[#707684] block font-normal truncate mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="h-px bg-[#E9E1D4]" />

        {/* Group 3: CONNECTIONS */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] px-3 block mb-2">
            System Connections
          </span>
          <nav className="space-y-1">
            {CONNECTION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = effectiveTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectTab(item.key)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                    isActive
                      ? "bg-[#FAF5E9] text-[#283A50] font-bold border border-[#E9E1D4] shadow-2xs"
                      : "text-[#707684] hover:text-[#283A50] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isActive ? "text-[#283A50]" : "text-[#707684]"
                    }`}
                  />
                  <div className="min-w-0">
                    <span className="text-xs block leading-tight">{item.label}</span>
                    <span className="text-[10px] text-[#707684] block font-normal truncate mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {hasUnsavedChanges && (
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
            ⚠️ You have unsaved changes. Remember to save your settings.
          </div>
        )}
      </div>
    </div>
  );
}
