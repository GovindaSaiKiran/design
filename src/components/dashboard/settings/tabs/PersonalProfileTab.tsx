import React, { useState } from "react";
import { User, Mail, Phone, Briefcase, Camera, Trash2, Save, CheckCircle2, AlertCircle } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { PersonalProfile } from "@/types/settings";

interface PersonalProfileTabProps {
  initialProfile: PersonalProfile;
  onSave: (updated: PersonalProfile) => Promise<boolean>;
  onChangePasswordClick: () => void;
}

export default function PersonalProfileTab({
  initialProfile,
  onSave,
  onChangePasswordClick,
}: PersonalProfileTabProps) {
  const [profile, setProfile] = useState<PersonalProfile>(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setIsSaving(true);
    const success = await onSave(profile);
    setIsSaving(false);

    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setErrorMessage("Unable to save personal profile. Please retry.");
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Personal Profile"
        badge="Account Owner"
        whatIsThis="Your personal account information used for signing into Swaram and identifying your actions."
        whyDoINeedIt="Your team and system notifications use this identity to send urgent call alerts, reports, and administrative receipts."
        whatToDoNext="Verify your contact email and phone number are accurate so you never miss critical call escalation alerts."
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
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Your personal profile has been updated successfully.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
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
            <h4 className="text-sm font-bold text-[#283A50]">Profile Picture</h4>
            <p className="text-xs text-[#707684] mt-0.5">
              JPG or PNG up to 5MB. Displayed in team collaboration logs and call handoffs.
            </p>
            {profile.avatarUrl && (
              <button
                type="button"
                onClick={handleAvatarRemove}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 mt-2"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove photo</span>
              </button>
            )}
          </div>
        </div>

        {/* Inputs Grid */}
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
              Work Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#707684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-none focus:border-[#283A50] font-medium transition-all"
                placeholder="operations@enterprise.ai"
                required
              />
            </div>
            <span className="text-[10px] text-[#707684] block">
              Changing your email sends a verification link to confirm ownership.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#283A50] block">
              Mobile Phone Number
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
              Job Title / Role (Optional)
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

        {/* Security Quick Link */}
        <div className="pt-4 border-t border-[#E9E1D4]/60 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#283A50] block">Account Password &amp; 2FA</span>
            <span className="text-[11px] text-[#707684]">
              Last changed on Sep 14, 2026 • 2-Step Verification is active
            </span>
          </div>
          <button
            type="button"
            onClick={onChangePasswordClick}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#283A50] bg-[#FAF5E9] hover:bg-[#FAF3E4] border border-[#E9E1D4] transition-colors"
          >
            Manage Password →
          </button>
        </div>
      </form>
    </div>
  );
}
