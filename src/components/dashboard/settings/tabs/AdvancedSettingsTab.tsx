import React, { useState } from "react";
import {
  KeyRound,
  Webhook,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import ConfirmationModal from "../ConfirmationModal";
import { AdvancedConnectionSettings, ApiKeyRecord } from "@/types/settings";

interface AdvancedSettingsTabProps {
  initialAdvanced: AdvancedConnectionSettings;
  onSaveAdvanced: (updated: AdvancedConnectionSettings) => Promise<boolean>;
  onTestWebhook: () => Promise<{ success: boolean; message: string }>;
}

export default function AdvancedSettingsTab({
  initialAdvanced,
  onSaveAdvanced,
  onTestWebhook,
}: AdvancedSettingsTabProps) {
  const [advanced, setAdvanced] = useState<AdvancedConnectionSettings>(initialAdvanced);
  const [webhookUrl, setWebhookUrl] = useState(initialAdvanced.webhookUrl);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [keyToRevoke, setKeyToRevoke] = useState<ApiKeyRecord | null>(null);
  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyRole, setNewKeyRole] = useState<"Full Access" | "Read-Only" | "Outbound Dispatcher">("Full Access");
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleTestWebhook = async () => {
    setIsTestingWebhook(true);
    setTestResult(null);
    const res = await onTestWebhook();
    setIsTestingWebhook(false);
    setTestResult(res.message);
  };

  const handleSaveWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...advanced, webhookUrl };
    setAdvanced(updated);
    await onSaveAdvanced(updated);
    showNotice("Webhook URL and event parameters saved.");
  };

  const handleCopyPrefix = (prefix: string, id: string) => {
    navigator.clipboard.writeText(prefix);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newKey: ApiKeyRecord = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      prefix: `swm_live_${randomSuffix}••••••••`,
      createdDate: "Today",
      lastUsedDate: "Never",
      role: newKeyRole,
    };

    const updatedKeys = [newKey, ...advanced.apiKeys];
    const updated = { ...advanced, apiKeys: updatedKeys };
    setAdvanced(updated);
    await onSaveAdvanced(updated);
    setIsCreateKeyModalOpen(false);
    setNewKeyName("");
    showNotice(`Created new API Key: "${newKey.name}"`);
  };

  const confirmRevokeKey = async () => {
    if (!keyToRevoke) return;
    const updatedKeys = advanced.apiKeys.filter((k) => k.id !== keyToRevoke.id);
    const updated = { ...advanced, apiKeys: updatedKeys };
    setAdvanced(updated);
    await onSaveAdvanced(updated);
    showNotice(`Revoked API Key: "${keyToRevoke.name}".`);
    setKeyToRevoke(null);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Advanced Developer Settings &amp; Webhooks"
        badge="API &amp; Diagnostics"
        whatIsThis="Technical developer configuration for automated webhooks and secure API access keys."
        whyDoINeedIt="Allows your technical team or backend systems to dispatch automated calls and receive real-time JSON payloads whenever a conversation finishes."
        whatToDoNext="Configure your webhook URL or generate a restricted API key for your backend developers."
      />

      {notice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {testResult && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{testResult}</span>
          </div>
          <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded-md border border-[#2E8066]/20">
            HTTP 200 OK
          </span>
        </div>
      )}

      {/* Webhook Configuration */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1D4]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50] shrink-0 font-bold">
              <Webhook className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#283A50]">Event Webhooks</h3>
              <p className="text-xs text-[#707684] mt-0.5">
                An automatic update that lets Swaram notify another app or server when an event occurs.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestWebhook}
            disabled={isTestingWebhook}
            className="px-3.5 py-1.5 rounded-xl bg-[#FAF5E9] hover:bg-[#FAF3E4] text-[#283A50] border border-[#E9E1D4] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isTestingWebhook ? "animate-spin" : ""}`} />
            <span>{isTestingWebhook ? "Sending Ping..." : "Test Webhook"}</span>
          </button>
        </div>

        <form onSubmit={handleSaveWebhook} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-[#283A50] block">
              Webhook Endpoint URL (HTTPS)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://api.yourdomain.com/webhooks/swaram"
                className="flex-1 px-3 py-2.5 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50] font-mono text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#283A50] hover:bg-[#1f2d3e] text-white font-semibold shadow-xs"
              >
                Save URL
              </button>
            </div>
          </div>

          {/* Subscribed Events */}
          <div>
            <label className="font-semibold text-[#283A50] block mb-2">
              Subscribed Event Triggers
            </label>
            <div className="flex flex-wrap gap-2">
              {advanced.subscribedEvents.map((ev) => (
                <span
                  key={ev}
                  className="px-2.5 py-1 rounded-lg bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] font-mono text-[11px] font-semibold"
                >
                  ✓ {ev}
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* API Keys Table */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] overflow-hidden shadow-2xs">
        <div className="px-6 py-4 bg-[#FAF5E9]/50 border-b border-[#E9E1D4] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#283A50] block">
              Secure Access Keys ({advanced.apiKeys.length})
            </span>
            <span className="text-[11px] text-[#707684]">
              For authenticating programmatic REST API requests
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateKeyModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-[#283A50] hover:bg-[#1f2d3e] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate New Key</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E9E1D4] text-[#707684] font-semibold text-[11px] uppercase tracking-wider bg-white">
                <th className="py-3 px-5">Key Name</th>
                <th className="py-3 px-5">Key Token Prefix</th>
                <th className="py-3 px-5">Permission Scope</th>
                <th className="py-3 px-5">Last Used</th>
                <th className="py-3 px-5 text-right">Revoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1D4]/60">
              {advanced.apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-[#FAF5E9]/30 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-[#283A50]">{key.name}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[#283A50] font-semibold bg-[#FAF5E9] px-2 py-0.5 rounded border border-[#E9E1D4]">
                        {key.prefix}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyPrefix(key.prefix, key.id)}
                        className="p-1 rounded text-slate-400 hover:text-[#283A50]"
                        title="Copy key prefix"
                      >
                        {copiedKeyId === key.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-[11px] font-semibold text-[#283A50] bg-[#FAF5E9] px-2 py-0.5 rounded-full border border-[#E9E1D4]">
                      {key.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-[#707684]">{key.lastUsedDate}</td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setKeyToRevoke(key)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Revoke and deactivate API key"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Key Modal */}
      {isCreateKeyModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCreateKeyModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl border border-[#E9E1D4] max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-[#283A50]">Generate Secure Access Key</h3>

            <form onSubmit={handleCreateKey} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#283A50] block">Key Identifier / Label</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. LeadSquared CRM Sync Key"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#283A50] block">Permission Role</label>
                <select
                  value={newKeyRole}
                  onChange={(e) => setNewKeyRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50] font-semibold focus:outline-none"
                >
                  <option value="Full Access">Full Access (Read + Write + Dispatch)</option>
                  <option value="Outbound Dispatcher">Outbound Dispatcher Only (Calls &amp; WhatsApp)</option>
                  <option value="Read-Only">Read-Only (Analytics &amp; Transcripts)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9E1D4]">
                <button
                  type="button"
                  onClick={() => setIsCreateKeyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E9E1D4] font-semibold text-[#707684]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#283A50] hover:bg-[#1f2d3e] text-white font-semibold"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revoke Key Modal */}
      <ConfirmationModal
        isOpen={!!keyToRevoke}
        title={`Revoke API Key "${keyToRevoke?.name}"?`}
        description={`Any backend scripts or webhooks using this access key (${keyToRevoke?.prefix}) will immediately be rejected with HTTP 401 Unauthorized.`}
        confirmLabel="Revoke Key"
        isDestructive={true}
        onConfirm={confirmRevokeKey}
        onClose={() => setKeyToRevoke(null)}
      />
    </div>
  );
}
