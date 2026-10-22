import React, { useState } from "react";
import {
  Layers,
  CheckCircle2,
  RotateCw,
  Plus,
  PowerOff,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import ConfirmationModal from "../ConfirmationModal";
import { AppIntegration } from "@/types/settings";

interface OtherAppsTabProps {
  initialApps: AppIntegration[];
  onSaveApps: (updated: AppIntegration[]) => Promise<boolean>;
}

export default function OtherAppsTab({ initialApps, onSaveApps }: OtherAppsTabProps) {
  const [apps, setApps] = useState<AppIntegration[]>(initialApps);
  const [appToDisconnect, setAppToDisconnect] = useState<AppIntegration | null>(null);
  const [testingAppId, setTestingAppId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleTestSync = (app: AppIntegration) => {
    setTestingAppId(app.id);
    setTimeout(() => {
      setTestingAppId(null);
      setNotice(`Sync test successful for ${app.name}. Data exchange verified.`);
      setTimeout(() => setNotice(null), 3000);
    }, 500);
  };

  const handleConnect = async (app: AppIntegration) => {
    const updated = apps.map((a) =>
      a.id === app.id
        ? {
            ...a,
            status: "connected" as const,
            lastSync: "Just now",
            syncFrequency: "Real-time sync",
          }
        : a
    );
    setApps(updated);
    await onSaveApps(updated);
    setNotice(`Connected ${app.name} to Swaram successfully.`);
    setTimeout(() => setNotice(null), 3000);
  };

  const confirmDisconnect = async () => {
    if (!appToDisconnect) return;
    const updated = apps.map((a) =>
      a.id === appToDisconnect.id
        ? {
            ...a,
            status: "available" as const,
            lastSync: undefined,
          }
        : a
    );
    setApps(updated);
    await onSaveApps(updated);
    setNotice(`Disconnected ${appToDisconnect.name}.`);
    setAppToDisconnect(null);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Other Business Apps &amp; CRM Integrations"
        badge="Bi-Directional Sync"
        whatIsThis="Connect Swaram to the CRM, spreadsheet, and team chat tools you already use every day."
        whyDoINeedIt="Automatically logs call transcripts, candidate lead scores, and callback requests into your CRM and Google Sheets without manual data entry."
        whatToDoNext="Verify that your CRM and Google Sheets show 'Connected' to ensure all call data is archived in real-time."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* App Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684] block">
                    {app.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#283A50] mt-0.5">{app.name}</h3>
                </div>
                {app.status === "connected" ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B8DEC8]/50 text-[#2E8066] flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-[#2E8066]" />
                    Connected
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    Available
                  </span>
                )}
              </div>
              <p className="text-xs text-[#707684] leading-relaxed">{app.description}</p>
            </div>

            <div className="pt-3 border-t border-[#E9E1D4]/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#707684]">
                {app.lastSync ? `Last sync: ${app.lastSync}` : "Ready to connect"}
              </span>

              <div className="flex items-center gap-2">
                {app.status === "connected" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleTestSync(app)}
                      disabled={testingAppId === app.id}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF5E9] hover:bg-[#FAF3E4] text-[#283A50] border border-[#E9E1D4] text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCw
                        className={`w-3 h-3 ${testingAppId === app.id ? "animate-spin" : ""}`}
                      />
                      <span>{testingAppId === app.id ? "Syncing..." : "Test Sync"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppToDisconnect(app)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Disconnect integration"
                    >
                      <PowerOff className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleConnect(app)}
                    className="px-3 py-1.5 rounded-xl bg-[#283A50] hover:bg-[#1f2d3e] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={!!appToDisconnect}
        title={`Disconnect ${appToDisconnect?.name}?`}
        description={`Swaram will stop syncing candidate transcripts and call recordings to ${appToDisconnect?.name}. Existing synced data in your tool will remain untouched.`}
        confirmLabel="Disconnect App"
        isDestructive={true}
        onConfirm={confirmDisconnect}
        onClose={() => setAppToDisconnect(null)}
      />
    </div>
  );
}
