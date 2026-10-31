"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Camera,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Globe,
  Clock,
  Calendar,
  ShieldCheck,
  X,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { PersonalProfile } from "@/types/settings";

interface PersonalProfileTabProps {
  initialProfile: PersonalProfile;
  onSave: (updated: PersonalProfile) => Promise<boolean>;
  onChangePasswordClick: () => void;
}

const DISPLAY_LANGUAGES = [
  "English (India)",
  "English (US)",
  "English (UK)",
  "Hindi (हिंदी)",
  "Telugu (తెలుగు)",
  "Tamil (தமிழ்)",
  "Kannada (ಕನ್ನಡ)",
  "Marathi (मराठी)",
];

const TIMEZONES = [
  "Asia/Kolkata (IST • UTC+05:30)",
  "Asia/Dubai (GST • UTC+04:00)",
  "Asia/Singapore (SGT • UTC+08:00)",
  "Europe/London (GMT/BST • UTC+00:00)",
  "America/New_York (EST • UTC-05:00)",
  "America/Los_Angeles (PST • UTC-08:00)",
];

export default function PersonalProfileTab({
  initialProfile,
  onSave,
  onChangePasswordClick,
}: PersonalProfileTabProps) {
  const [profile, setProfile] = useState<PersonalProfile>({
    displayLanguage: "English (India)",
    timezone: "Asia/Kolkata (IST • UTC+05:30)",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
    ...initialProfile,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sensitive Verification Modal for Email Change
  const [showEmailConfirmModal, setShowEmailConfirmModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const mockUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatarUrl: mockUrl }));
    }
  };

  const handleAvatarRemove = () => {
    setProfile((prev) => ({ ...prev, avatarUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!profile.fullName.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }

    if (!profile.email.trim() || !profile.email.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    // Check if email was changed - require verification
    if (profile.email.trim().toLowerCase() !== initialProfile.email.trim().toLowerCase() && !verificationSent) {
      setShowEmailConfirmModal(true);
      return;
    }

    setIsSaving(true);
    const success = await onSave(profile);
    setIsSaving(false);

    if (success) {
      setSaveSuccess(true);
      setShowEmailConfirmModal(false);
      setVerificationSent(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setErrorMessage("Unable to save personal profile. Please retry.");
    }
  };

  const confirmEmailChange = async () => {
    if (!verificationCode || verificationCode.length < 4) {
      setErrorMessage("Please enter the 6-digit confirmation code sent to your new email.");
      return;
    }
    setVerificationSent(true);
    setIsSaving(true);
    const success = await onSave(profile);
    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      setShowEmailConfirmModal(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Personal Information"
        badge="Account-Level Identity"
        whatIsThis="Your personal user profile used for authentication, team presence, and notifications across Swaram."
        whyDoINeedIt="Call handoffs, supervisor alerts, and security notifications use these credentials to reach you directly."
        whatToDoNext="Verify your name, email, time zone, and display preferences. Sensitive changes require email verification."
      >
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? "Saving..." : "Save Profile"}</span>
        </button>
      </SectionHeader>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Your personal profile has been updated successfully.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E9E1D4] p-6 shadow-2xs space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-[#E9E1D4]/60">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF5E9] border-2 border-[#E9E1D4] flex items-center justify-center overflow-hidden text-[#283A50] font-bold text-xl shadow-xs">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{profile.fullName.charAt(0) || "U"}</span>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-[#283A50] text-white hover:bg-[#1f2d3e] cursor-pointer shadow-xs transition-colors"
              title="Upload new photo"
            >
              <Camera className="w-3 h-3" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#283A50]">Profile Photo</h4>
            <p className="text-xs text-[#707684] mt-0.5">
              JPG or PNG up to 5MB. Displayed in user capsule, team member directories, and audit logs.
            </p>
            {profile.avatarUrl && (
              <button
                type="button"
                onClick={handleAvatarRemove}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 mt-2 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove photo</span>
              </button>
            )}
          </div>
        </div>

        {/* Primary Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium transition-all"
                placeholder="Operations Administrator"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium transition-all"
                placeholder="admin@enterprise.ai"
                required
              />
            </div>
            <span className="text-[10px] text-[#707684] block">
              Changing email requires security verification to protect your account.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium transition-all"
                placeholder="+91 98401 22345"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Job Title / Designation (Optional)
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={profile.jobTitle || ""}
                onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium transition-all"
                placeholder="Head of Voice Operations & Telephony"
              />
            </div>
          </div>
        </div>

        {/* Display, Language, Timezone, and Date/Time Format */}
        <div className="pt-4 border-t border-[#E9E1D4]/60 space-y-4">
          <h4 className="text-xs font-bold text-[#283A50] uppercase tracking-wider">
            Display &amp; Localization Preferences
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#707684]" />
                <span>Preferred Language</span>
              </label>
              <select
                value={profile.displayLanguage || "English (India)"}
                onChange={(e) => setProfile({ ...profile, displayLanguage: e.target.value })}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              >
                {DISPLAY_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#707684]" />
                <span>Time Zone</span>
              </label>
              <select
                value={profile.timezone || "Asia/Kolkata (IST • UTC+05:30)"}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#707684]" />
                <span>Date Format</span>
              </label>
              <select
                value={profile.dateFormat || "DD/MM/YYYY"}
                onChange={(e) => setProfile({ ...profile, dateFormat: e.target.value as any })}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (31/10/2026)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (10/31/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-10-31)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#707684]" />
                <span>Time Format</span>
              </label>
              <select
                value={profile.timeFormat || "12h"}
                onChange={(e) => setProfile({ ...profile, timeFormat: e.target.value as any })}
                className="w-full text-xs px-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium"
              >
                <option value="12h">12-Hour (09:30 AM)</option>
                <option value="24h">24-Hour (21:30)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Quick Link */}
        <div className="pt-4 border-t border-[#E9E1D4]/60 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#283A50] block">Security &amp; Password</span>
            <span className="text-[11px] text-[#707684]">
              Last changed on Sep 14, 2026 • Two-factor authentication is active
            </span>
          </div>
          <button
            type="button"
            onClick={onChangePasswordClick}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#283A50] bg-[#FAF5E9] hover:bg-[#FAF3E4] border border-[#E9E1D4] transition-colors cursor-pointer"
          >
            Manage Security →
          </button>
        </div>
      </form>

      {/* SENSITIVE EMAIL CHANGE CONFIRMATION MODAL */}
      {showEmailConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E9E1D4] shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setShowEmailConfirmModal(false)}
                className="p-1 rounded-lg text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#283A50]">
                Verify Email Address Change
              </h3>
              <p className="text-xs text-[#707684] mt-1 leading-relaxed">
                You are updating your account login email to{" "}
                <strong className="text-[#283A50]">{profile.email}</strong>.
                To prevent unauthorized lockouts, please enter the 6-digit confirmation code sent to your new email.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#283A50] block">
                Security Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="e.g. 582194"
                className="w-full text-center tracking-widest text-base font-mono font-bold py-2 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50]"
              />
              <p className="text-[10px] text-[#707684]">
                Enter any 6 digits for instant sandbox verification.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEmailConfirmModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#707684] hover:bg-[#FAF5E9]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmEmailChange}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] text-white hover:bg-[#1f2d3e]"
              >
                {isSaving ? "Verifying..." : "Confirm & Update Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
