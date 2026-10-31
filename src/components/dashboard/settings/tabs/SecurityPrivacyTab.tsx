import React, { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Smartphone,
  Laptop,
  LogOut,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Database,
  History,
  Lock,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import ConfirmationModal from "../ConfirmationModal";
import { SecuritySettings } from "@/types/settings";

interface SecurityPrivacyTabProps {
  initialSecurity: SecuritySettings;
  onSaveSecurity: (updated: SecuritySettings) => Promise<boolean>;
}

export default function SecurityPrivacyTab({
  initialSecurity,
  onSaveSecurity,
}: SecurityPrivacyTabProps) {
  const [security, setSecurity] = useState<SecuritySettings>(initialSecurity);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Password Modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Confirmation Modals
  const [isSignOutAllModalOpen, setIsSignOutAllModalOpen] = useState(false);
  const [isDeleteWorkspaceModalOpen, setIsDeleteWorkspaceModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const showNotice = (msg: string) => {
    setSaveNotice(msg);
    setTimeout(() => setSaveNotice(null), 3500);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const updated = {
      ...security,
      passwordLastChanged: "Today",
    };
    setSecurity(updated);
    await onSaveSecurity(updated);
    setIsPasswordModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showNotice("Password changed successfully.");
  };

  const handleToggle2FA = async () => {
    const updated = {
      ...security,
      twoFactorEnabled: !security.twoFactorEnabled,
    };
    setSecurity(updated);
    await onSaveSecurity(updated);
    showNotice(
      updated.twoFactorEnabled
        ? "Two-Step Verification (2FA) is now active."
        : "Two-Step Verification has been disabled."
    );
  };

  const handleSignOutOtherSessions = async () => {
    const currentOnly = security.activeSessions.filter((s) => s.isCurrent);
    const updated = { ...security, activeSessions: currentOnly };
    setSecurity(updated);
    await onSaveSecurity(updated);
    showNotice("Signed out of all other remote device sessions.");
  };

  const handleRetentionChange = async (days: number) => {
    const updated = { ...security, dataRetentionDays: days };
    setSecurity(updated);
    await onSaveSecurity(updated);
    showNotice(`Call transcript & audio retention set to ${days} days.`);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Security, Privacy &amp; DPDP Compliance"
        badge="Enterprise Hardened"
        whatIsThis="Your login credentials, two-step verification, active login sessions, and data privacy policies."
        whyDoINeedIt="Protecting candidate transcripts, recordings, and phone numbers is legally required under India's Digital Personal Data Protection (DPDP) Act."
        whatToDoNext="Keep two-step verification enabled and review active sessions to confirm only authorized computers are connected."
      />

      {saveNotice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* Password & 2FA Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Password Card */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
              Account Authentication
            </span>
            <Lock className="w-4 h-4 text-[#707684]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#283A50]">Account Password</h4>
            <span className="text-xs text-[#707684]">
              Last changed on {security.passwordLastChanged}
            </span>
          </div>
          <p className="text-xs text-[#707684] leading-relaxed">
            Use at least 8 characters with letters, numbers, and symbols to ensure maximum security.
          </p>
          <div className="pt-2 border-t border-[#E9E1D4]/60">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF5E9] hover:bg-[#FAF3E4] text-[#283A50] border border-[#E9E1D4] transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* 2FA Card */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
              Second-Factor Protection
            </span>
            <Smartphone className="w-4 h-4 text-[#707684]" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#283A50]">Two-Step Verification (2FA)</h4>
              <span className="text-xs text-[#707684]">
                Authenticator app or OTP verification code
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggle2FA}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                security.twoFactorEnabled
                  ? "bg-[#2E8066] text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {security.twoFactorEnabled ? "Active" : "Disabled"}
            </button>
          </div>
          <p className="text-xs text-[#707684] leading-relaxed">
            Requires entering a secure 6-digit code from Google Authenticator or SMS whenever signing in.
          </p>
          <div className="text-[11px] text-[#2E8066] font-semibold pt-2 border-t border-[#E9E1D4]/60 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Recommended for all workspace owners</span>
          </div>
        </div>
      </div>

      {/* Active Sessions List */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#707684]">
              Active Login Sessions
            </h4>
            <p className="text-xs text-[#707684] mt-0.5">
              Devices currently signed into this Swaram workspace.
            </p>
          </div>
          {security.activeSessions.length > 1 && (
            <button
              type="button"
              onClick={() => setIsSignOutAllModalOpen(true)}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out of other devices</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-[#E9E1D4]/60">
          {security.activeSessions.map((session) => (
            <div
              key={session.id}
              className="py-3 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50]">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#283A50]">
                      {session.device} • {session.browser}
                    </span>
                    {session.isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B8DEC8]/50 text-[#2E8066]">
                        Current Device
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#707684] block mt-0.5">
                    IP: {session.ip} • {session.location} • {session.lastActive}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Retention & DPDP Settings */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#707684]">
          Data Retention &amp; Export Archive
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] space-y-2">
            <strong className="text-[#283A50] block font-bold">
              Automatic Call Recording Retention
            </strong>
            <p className="text-[#707684] text-[11px] leading-relaxed">
              Recordings older than this threshold will be automatically purged in compliance with your retention policy.
            </p>
            <select
              value={security.dataRetentionDays}
              onChange={(e) => handleRetentionChange(Number(e.target.value))}
              className="text-xs px-3 py-1.5 rounded-lg bg-white border border-[#E9E1D4] text-[#283A50] font-semibold focus:outline-none"
            >
              <option value={90}>90 Days (Standard Enterprise / Clinic Policy)</option>
              <option value={180}>180 Days (Half-Yearly Audit)</option>
              <option value={365}>1 Year (365 Days)</option>
              <option value={0}>Indefinite Retention (Manual Delete Only)</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] space-y-2">
            <strong className="text-[#283A50] block font-bold">
              Complete Data Export Archive
            </strong>
            <p className="text-[#707684] text-[11px] leading-relaxed">
              Download all conversation transcripts, customer contact lists, agent prompts, and billing receipts as a secure ZIP.
            </p>
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-[#283A50] border border-[#E9E1D4] inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Request DPDP Archive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-rose-50/50 rounded-2xl border border-rose-200 p-5 sm:p-6 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
          Danger Zone
        </h4>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <strong className="text-xs font-bold text-rose-900 block">
              Delete Workspace &amp; Voice Assets
            </strong>
            <p className="text-xs text-rose-700/80 mt-0.5">
              Permanently delete this workspace, all trained voice agents, phone trunks, customer logs, and recordings. This action cannot be reversed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsDeleteWorkspaceModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shrink-0 shadow-xs cursor-pointer"
          >
            Delete Workspace
          </button>
        </div>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPasswordModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl border border-[#E9E1D4] max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-[#283A50]">Change Password</h3>

            {passwordError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold">
                {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#283A50]">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283A50]">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#283A50]">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9E1D4]">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E9E1D4] font-semibold text-[#707684]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#283A50] hover:bg-[#1f2d3e] text-white font-semibold"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={isSignOutAllModalOpen}
        title="Sign Out of All Other Devices?"
        description="All other active web browsers and mobile companion sessions will be signed out immediately. You will remain signed in on this current browser."
        confirmLabel="Sign Out Sessions"
        isDestructive={false}
        onConfirm={handleSignOutOtherSessions}
        onClose={() => setIsSignOutAllModalOpen(false)}
      />

      <ConfirmationModal
        isOpen={isExportModalOpen}
        title="Generate DPDP / GDPR Complete Archive?"
        description="We will compile an encrypted archive of your candidate logs, voice recordings, and configuration files. A secure download link will be dispatched to admissions.director@apex.edu.in within 15 minutes."
        confirmLabel="Generate Archive"
        isDestructive={false}
        onConfirm={() => showNotice("Data archive generation requested. Check your email shortly.")}
        onClose={() => setIsExportModalOpen(false)}
      />

      <ConfirmationModal
        isOpen={isDeleteWorkspaceModalOpen}
        title="Permanently Delete Workspace?"
        description="WARNING: This will permanently delete your workspace tenant, terminate all active PRI phone trunks, and permanently delete all call recordings and contact history. This action CANNOT be undone."
        confirmLabel="Yes, Permanently Delete"
        isDestructive={true}
        onConfirm={() => alert("Workspace deletion protection active. Please contact support@swaram.ai for manual offboarding verification.")}
        onClose={() => setIsDeleteWorkspaceModalOpen(false)}
      />
    </div>
  );
}
