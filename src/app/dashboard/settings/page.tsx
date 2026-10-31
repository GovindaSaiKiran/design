"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Settings,
  ShieldCheck,
  RotateCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import SettingsNavigation from "@/components/dashboard/settings/SettingsNavigation";
import PersonalProfileTab from "@/components/dashboard/settings/tabs/PersonalProfileTab";
import BusinessWorkspaceTab from "@/components/dashboard/settings/tabs/BusinessWorkspaceTab";
import TeamMembersTab from "@/components/dashboard/settings/tabs/TeamMembersTab";
import PlanBillingTab from "@/components/dashboard/settings/tabs/PlanBillingTab";
import NotificationsTab from "@/components/dashboard/settings/tabs/NotificationsTab";
import SecurityPrivacyTab from "@/components/dashboard/settings/tabs/SecurityPrivacyTab";
import AppPreferencesTab from "@/components/dashboard/settings/tabs/AppPreferencesTab";
import MySwaramPreferencesTab from "@/components/dashboard/settings/tabs/MySwaramPreferencesTab";
import CampaignDefaultsTab from "@/components/dashboard/settings/tabs/CampaignDefaultsTab";
import AIServicesTab from "@/components/dashboard/settings/tabs/AIServicesTab";
import PhoneCallingTab from "@/components/dashboard/settings/tabs/PhoneCallingTab";
import WhatsAppTab from "@/components/dashboard/settings/tabs/WhatsAppTab";
import OtherAppsTab from "@/components/dashboard/settings/tabs/OtherAppsTab";
import AdvancedSettingsTab from "@/components/dashboard/settings/tabs/AdvancedSettingsTab";
import {
  SettingsTabKey,
  CompleteSwaramSettings,
  PersonalProfile,
  WorkspaceProfile,
  TeamMember,
  BillingPlanInfo,
  NotificationPreferences,
  SecuritySettings,
  AppPreferences,
  MySwaramPreferences,
  CampaignDefaultPreferences,
  AIServiceConnection,
  PhoneCallingConnection,
  WhatsAppConnection,
  AppIntegration,
  AdvancedConnectionSettings,
} from "@/types/settings";

function SettingsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab synchronization from URL
  const initialTab = (searchParams.get("tab") as SettingsTabKey) || "profile";
  const [activeTab, setActiveTab] = useState<SettingsTabKey>(initialTab);

  const [settings, setSettings] = useState<CompleteSwaramSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globalNotice, setGlobalNotice] = useState<string | null>(null);

  // Load settings from backend API
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const json = await res.json();
        if (json.success && json.settings) {
          setSettings(json.settings);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  // Sync tab changes with URL query parameter
  const handleTabSelect = (tab: SettingsTabKey) => {
    setActiveTab(tab);
    router.push(`/dashboard/settings?tab=${tab}`, { scroll: false });
  };

  const showGlobalNotice = (msg: string) => {
    setGlobalNotice(msg);
    setTimeout(() => setGlobalNotice(null), 3500);
  };

  // Section Save Handlers
  const handleSaveProfile = async (updated: PersonalProfile): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "profile", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, profile: updated } : prev));
        showGlobalNotice("Personal profile changes saved.");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveWorkspace = async (updated: WorkspaceProfile): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "workspace", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, workspace: updated } : prev));
        showGlobalNotice("Workspace parameters saved.");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveTeam = async (updated: TeamMember[]): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "team", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, team: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveBilling = async (updated: BillingPlanInfo): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "billing", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, billing: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveNotifications = async (updated: NotificationPreferences): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "notifications", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, notifications: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveSecurity = async (updated: SecuritySettings): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "security", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, security: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSavePreferences = async (updated: AppPreferences): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "preferences", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, preferences: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveMyPreferences = async (updated: MySwaramPreferences): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "myPreferences", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, myPreferences: updated } : prev));
        showGlobalNotice("My Swaram preferences saved.");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveCampaignDefaults = async (updated: CampaignDefaultPreferences): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "campaignDefaults", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, campaignDefaults: updated } : prev));
        showGlobalNotice("Campaign defaults saved.");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveAiServices = async (updated: AIServiceConnection[]): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "aiServices", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, aiServices: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSavePhoneCalling = async (updated: PhoneCallingConnection): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "phoneCalling", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, phoneCalling: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveWhatsApp = async (updated: WhatsAppConnection): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "whatsapp", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, whatsapp: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveOtherApps = async (updated: AppIntegration[]): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "otherApps", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, otherApps: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleSaveAdvanced = async (updated: AdvancedConnectionSettings): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "advanced", data: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setSettings((prev) => (prev ? { ...prev, advanced: updated } : prev));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Test Handlers
  const handleTestAiConnection = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test-ai" }),
      });
      return await res.json();
    } catch {
      return { success: false, latencyMs: 0, message: "AI ping test failed." };
    }
  };

  const handleTestPhoneConnection = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test-phone" }),
      });
      return await res.json();
    } catch {
      return { success: false, message: "Phone trunk test failed." };
    }
  };

  const handleTestWebhook = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test-webhook" }),
      });
      return await res.json();
    } catch {
      return { success: false, message: "Webhook ping delivery failed." };
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="py-24 text-center space-y-3 font-sans">
        <RotateCw className="w-6 h-6 animate-spin text-[#283A50] mx-auto" />
        <p className="text-xs text-[#707684]">Loading Swaram Settings &amp; Connections...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-[#283A50] max-w-7xl mx-auto pb-12">
      {/* Workspace Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#707684] hover:text-[#283A50] transition-colors"
            >
              Overview
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#283A50] bg-[#FAF5E9] border border-[#E9E1D4] px-3 py-0.5 rounded-full">
              Settings &amp; Connections
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#283A50] mt-2">
            Settings &amp; Service Connections
          </h1>

          <p className="text-xs sm:text-sm text-[#707684] mt-1 max-w-2xl leading-relaxed">
            Manage your account identity, institutional workspace rules, team permissions, subscription, and telecom connections in plain, non-technical language.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-[11px] font-semibold text-[#707684] bg-[#FAF5E9] px-3 py-1.5 rounded-xl border border-[#E9E1D4]">
            Workspace ID: ws-enterprise-01
          </span>
        </div>
      </div>

      {globalNotice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{globalNotice}</span>
        </div>
      )}

      {/* 2-Column Responsive Settings Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column: Navigation Sidebar */}
        <div className="lg:col-span-1 lg:sticky lg:top-6">
          <SettingsNavigation
            activeTab={activeTab}
            onSelectTab={handleTabSelect}
          />
        </div>

        {/* Right Column: Tab View */}
        <div className="lg:col-span-3 min-w-0">
          {/* 1. PERSONAL INFORMATION */}
          {activeTab === "profile" && (
            <PersonalProfileTab
              initialProfile={settings.profile}
              onSave={handleSaveProfile}
              onChangePasswordClick={() => handleTabSelect("security")}
            />
          )}

          {/* 2. SECURITY & PRIVACY */}
          {activeTab === "security" && (
            <SecurityPrivacyTab
              initialSecurity={settings.security}
              onSaveSecurity={handleSaveSecurity}
            />
          )}

          {/* 3. NOTIFICATION SETTINGS */}
          {activeTab === "notifications" && (
            <NotificationsTab
              initialNotifications={settings.notifications}
              onSaveNotifications={handleSaveNotifications}
            />
          )}

          {/* 4. ORGANIZATION PROFILE */}
          {(activeTab === "organization" || activeTab === "workspace") && (
            <BusinessWorkspaceTab
              initialWorkspace={settings.workspace}
              onSave={handleSaveWorkspace}
            />
          )}

          {/* 5. MY SWARAM PREFERENCES */}
          {(activeTab === "swaram-preferences" || activeTab === "preferences") && (
            <MySwaramPreferencesTab
              initialPreferences={settings.myPreferences}
              onSave={handleSaveMyPreferences}
            />
          )}

          {/* 6. COMMUNICATION & CAMPAIGN DEFAULTS */}
          {activeTab === "campaign-defaults" && (
            <CampaignDefaultsTab
              initialDefaults={settings.campaignDefaults}
              onSave={handleSaveCampaignDefaults}
            />
          )}

          {/* 7. TEAM & ACCESS */}
          {activeTab === "team" && (
            <TeamMembersTab
              initialTeam={settings.team}
              onSaveTeam={handleSaveTeam}
            />
          )}

          {/* 8. SUBSCRIPTION & BILLING */}
          {activeTab === "billing" && (
            <PlanBillingTab
              initialBilling={settings.billing}
              onSaveBilling={handleSaveBilling}
            />
          )}

          {/* SYSTEM CONNECTIONS */}
          {activeTab === "ai-services" && (
            <AIServicesTab
              initialServices={settings.aiServices}
              onSaveServices={handleSaveAiServices}
              onTestAiConnection={handleTestAiConnection}
            />
          )}

          {activeTab === "phone-calling" && (
            <PhoneCallingTab
              initialPhoneCalling={settings.phoneCalling}
              onSavePhoneCalling={handleSavePhoneCalling}
              onTestPhoneConnection={handleTestPhoneConnection}
            />
          )}

          {activeTab === "whatsapp" && (
            <WhatsAppTab
              initialWhatsApp={settings.whatsapp}
              onSaveWhatsApp={handleSaveWhatsApp}
            />
          )}

          {activeTab === "other-apps" ? (
            <OtherAppsTab
              initialApps={settings.otherApps}
              onSaveApps={handleSaveOtherApps}
            />
          ) : null}

          {activeTab === "advanced" && (
            <AdvancedSettingsTab
              initialAdvanced={settings.advanced}
              onSaveAdvanced={handleSaveAdvanced}
              onTestWebhook={handleTestWebhook}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center space-y-3 font-sans">
          <RotateCw className="w-6 h-6 animate-spin text-[#283A50] mx-auto" />
          <p className="text-xs text-[#707684]">Loading Settings...</p>
        </div>
      }
    >
      <SettingsPageContent />
    </Suspense>
  );
}
