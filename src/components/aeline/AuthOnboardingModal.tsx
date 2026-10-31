"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Bot,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  User,
  UserPlus,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  LogIn,
} from "lucide-react";

export type AuthMode = "login" | "signup" | "signin" | "get-started";

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export default function AuthOnboardingModal({
  isOpen,
  onClose,
  initialMode = "signup",
}: AuthOnboardingModalProps) {
  const router = useRouter();

  // Normalize initial mode: "signin" -> "login", "get-started" -> "signup"
  const normalizedInitialMode =
    initialMode === "login" || initialMode === "signin" ? "login" : "signup";

  const [mode, setMode] = useState<"login" | "signup">(normalizedInitialMode);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Auth form, 2: Workspace personalization, 3: Launching

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [agentUseCase, setAgentUseCase] = useState("Customer Support & Inquiries (E-commerce / Retail)");
  const [primaryLanguage, setPrimaryLanguage] = useState("Hindi + English (Hinglish)");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const initial =
        initialMode === "login" || initialMode === "signin" ? "login" : "signup";
      setMode(initial);
      setStep(1);
      setErrorMessage(null);
      setForgotPasswordNotice(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // Password strength helper
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Empty", color: "bg-slate-200" };
    if (pass.length < 6) return { score: 1, label: "Weak", color: "bg-rose-500" };
    if (pass.length < 10) return { score: 2, label: "Moderate", color: "bg-amber-500" };
    return { score: 3, label: "Strong", color: "bg-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  // Submit Handler for Step 1
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setForgotPasswordNotice(null);

    if (!email.trim()) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter a secure password.");
      return;
    }

    // LOG IN FLOW (Existing user)
    if (mode === "login") {
      setIsSubmitting(true);
      setTimeout(() => {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "swaram_user",
            JSON.stringify({
              email: email.trim(),
              name: fullName.trim() || email.split("@")[0],
              fullName: fullName.trim() || email.split("@")[0],
              workspaceName: "Apex AI Call Center",
              provider: "email",
            })
          );
          localStorage.setItem("aeline_auth_token", "mock_jwt_token_" + Date.now());
        }
        setIsSubmitting(false);
        onClose();
        router.push("/dashboard");
      }, 700);
      return;
    }

    // SIGN UP FLOW (New user registration)
    if (mode === "signup") {
      if (!fullName.trim()) {
        setErrorMessage("Please enter your full name.");
        return;
      }

      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match. Please verify both fields.");
        return;
      }

      if (!agreeTerms) {
        setErrorMessage("Please accept the Terms of Service & DPDP Privacy Agreement to proceed.");
        return;
      }

      // Auto-derive workspace name if not entered
      if (!workspaceName.trim()) {
        const domain = email.includes("@") ? email.split("@")[1].split(".")[0] : "Business";
        setWorkspaceName(domain.charAt(0).toUpperCase() + domain.slice(1) + " AI Call Center");
      }

      // Proceed to Step 2 for workspace personalization
      setStep(2);
    }
  };

  // Submit Handler for Step 2 (Workspace Personalization)
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStep(3);

    // Save newly created user profile & session in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "swaram_user",
        JSON.stringify({
          email: email.trim(),
          name: fullName.trim() || email.split("@")[0],
          fullName: fullName.trim() || email.split("@")[0],
          workspaceName: workspaceName.trim() || "My Voice Workspace",
          agentUseCase,
          primaryLanguage,
          isNewUser: true,
          provider: "email",
          createdAt: new Date().toISOString(),
        })
      );
      localStorage.setItem("aeline_auth_token", "mock_jwt_token_" + Date.now());
    }

    // Visual transition animation before routing to dashboard
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      router.push("/dashboard");
    }, 1200);
  };

  // Google OAuth Handler (Frontend Mock)
  const handleGoogleAuth = () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      const mockGoogleUser = {
        email: "alex.morgan.ai@gmail.com",
        fullName: "Alex Morgan",
        name: "Alex Morgan",
        workspaceName: "Apex AI Call Center",
        agentUseCase: "Customer Support & Inquiries",
        primaryLanguage: "Hindi + English (Hinglish)",
        provider: "google",
        isNewUser: mode === "signup",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("swaram_user", JSON.stringify(mockGoogleUser));
        localStorage.setItem("aeline_auth_token", "mock_google_oauth_token_" + Date.now());
      }

      setIsGoogleLoading(false);

      if (mode === "login") {
        onClose();
        router.push("/dashboard");
      } else {
        // For new user signup via Google: pre-populate and give quick chance to review workspace details
        setEmail("alex.morgan.ai@gmail.com");
        setFullName("Alex Morgan");
        setWorkspaceName("Apex AI Call Center");
        setStep(2);
      }
    }, 650);
  };

  // Demo Fill Helpers
  const handleQuickDemoFill = () => {
    if (mode === "login") {
      setEmail("support@carehealth.org");
      setPassword("swaram2026");
      setFullName("Dr. Rajesh Sharma");
      setErrorMessage(null);
    } else {
      setFullName("Priya Sharma");
      setEmail("priya@quickcart.in");
      setWorkspaceName("QuickCart 24/7 AI Customer Desk");
      setPassword("VoiceAI@2026!");
      setConfirmPassword("VoiceAI@2026!");
      setAgentUseCase("Customer Support & Inquiries (E-commerce / Retail)");
      setAgreeTerms(true);
      setErrorMessage(null);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setErrorMessage("Please type your email above first to receive reset instructions.");
      return;
    }
    setForgotPasswordNotice(`Password reset instructions sent to ${email}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.2)] border border-slate-200/90 p-6 sm:p-9 text-slate-900 transition-all max-h-[92vh] overflow-y-auto">
        {/* Subtle Top Specular Sheen */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-80" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mode Switcher Pills (Log In vs Sign Up for New Users) */}
        {step === 1 && (
          <div className="flex items-center justify-center mb-6">
            <div className="flex p-1 bg-slate-100 rounded-full border border-slate-200/80">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMessage(null);
                  setForgotPasswordNotice(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  mode === "login"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <LogIn className="w-3 h-3" />
                <span>Log In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMessage(null);
                  setForgotPasswordNotice(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  mode === "signup"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <UserPlus className="w-3 h-3 text-[#cdfb56]" />
                <span>Sign Up Free</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: Main Authentication Form */}
        {step === 1 && (
          <div>
            {/* Header Content */}
            <div className="mb-5 text-center">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-900 bg-[#cdfb56]/40 border border-[#cdfb56] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2.5 shadow-2xs">
                {mode === "login" ? (
                  <>
                    <Sparkles className="w-3 h-3 text-[#0a3d1b]" />
                    <span>Welcome Back</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3 text-[#0a3d1b]" />
                    <span>New User Registration</span>
                  </>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {mode === "login" ? "Log in to Swaram AI" : "Create Your Free Account"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                {mode === "login"
                  ? "Access your live AI voice call center, active telephony lines, and telemetry."
                  : "Deploy an AI agent call center in minutes for hospitals, e-commerce, institutes & enterprises."}
              </p>
            </div>

            {/* Google Authentication Button */}
            <div className="space-y-4 mb-5">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isGoogleLoading || isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-xs hover:border-slate-300 active:scale-98 cursor-pointer disabled:opacity-70"
              >
                {isGoogleLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>
                      {mode === "login" ? "Log in with Google" : "Continue with Google"}
                    </span>
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200/90 w-full" />
                <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                  {mode === "login" ? "or log in with email" : "or register with work email"}
                </span>
                <div className="border-t border-slate-200/90 w-full" />
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Notice Alert (e.g. Forgot Password) */}
            {forgotPasswordNotice && (
              <div className="mb-4 p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-800 animate-in fade-in">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{forgotPasswordNotice}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {/* Full Name field (Only in Sign Up for New Users) */}
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Priya Sen"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com or support@hospital.org"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400 transition-all"
                  />
                </div>
              </div>

              {/* Company / Workplace Name (Sign Up only) */}
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company or Workplace Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      placeholder="e.g. Metro Care Hospital, QuickCart Retail, Apex Institute"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {mode === "signup" ? "Create Password" : "Password"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[11px] text-[#0284c7] hover:underline font-semibold cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter in Sign Up */}
                {mode === "signup" && password.length > 0 && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden flex gap-1">
                      <div
                        className={`h-full flex-1 rounded-full transition-all ${
                          passwordStrength.score >= 1 ? passwordStrength.color : "bg-slate-200"
                        }`}
                      />
                      <div
                        className={`h-full flex-1 rounded-full transition-all ${
                          passwordStrength.score >= 2 ? passwordStrength.color : "bg-slate-200"
                        }`}
                      />
                      <div
                        className={`h-full flex-1 rounded-full transition-all ${
                          passwordStrength.score >= 3 ? passwordStrength.color : "bg-slate-200"
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password (Sign Up only) */}
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-[10.5px] text-rose-600 mt-1">Passwords do not match.</p>
                  )}
                </div>
              )}

              {/* Options Row */}
              {mode === "login" ? (
                <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-slate-950 focus:ring-slate-950 w-3.5 h-3.5"
                    />
                    <span>Remember me for 30 days</span>
                  </label>
                </div>
              ) : (
                <div className="pt-0.5">
                  <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] text-slate-600">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="rounded border-slate-300 text-slate-950 focus:ring-slate-950 w-3.5 h-3.5 mt-0.5 shrink-0"
                    />
                    <span>
                      I agree to the{" "}
                      <span className="text-slate-900 font-semibold underline">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-slate-900 font-semibold underline">
                        DPDP Privacy Policy
                      </span>
                      .
                    </span>
                  </label>
                </div>
              )}

              {/* Action Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-slate-950 hover:bg-slate-900 text-white font-black py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {mode === "login"
                        ? "LOG IN TO DASHBOARD"
                        : "CREATE ACCOUNT & SETUP WORKSPACE"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#cdfb56]" />
                  </>
                )}
              </button>

              {/* Mode Toggle Switch Prompt at Bottom */}
              <div className="pt-2 text-center text-xs text-slate-500">
                {mode === "login" ? (
                  <p>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setErrorMessage(null);
                        setForgotPasswordNotice(null);
                      }}
                      className="text-slate-950 font-bold hover:underline cursor-pointer ml-1"
                    >
                      Sign up for free
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setErrorMessage(null);
                        setForgotPasswordNotice(null);
                      }}
                      className="text-slate-950 font-bold hover:underline cursor-pointer ml-1"
                    >
                      Log in
                    </button>
                  </p>
                )}
              </div>

              {/* Quick Fill Mock Helper for Instant Testing */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="text-[11px] text-slate-500 hover:text-slate-900 font-medium underline underline-offset-2 cursor-pointer transition-colors"
                >
                  {mode === "login"
                    ? "Fill with demo call center credentials"
                    : "Fill with demo workplace registration data"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Onboarding Setup (Workspace & Use Case for New Users) */}
        {step === 2 && (
          <div>
            <div className="mb-5 text-center">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0a3d1b] bg-[#cdfb56] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-[#0a3d1b]" />
                <span>Step 2 of 2: Setup Workspace</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Personalize Your Voice AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Configure your organization details to preload your voice models.
              </p>
            </div>

            <form onSubmit={handleStep2Submit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company or Workplace Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="e.g. Metro Care Hospital, QuickCart Retail, Apex Institute"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Voice Call Center Purpose
                </label>
                <select
                  value={agentUseCase}
                  onChange={(e) => setAgentUseCase(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 cursor-pointer"
                >
                  <option value="Customer Support & Inquiries (E-commerce / Retail)">
                    Customer Support & Inquiries (E-commerce / Retail)
                  </option>
                  <option value="Patient Appointments & Reception (Hospitals & Clinics)">
                    Patient Appointments & Reception (Hospitals & Clinics)
                  </option>
                  <option value="Admissions & Student Counseling (Colleges & Institutes)">
                    Admissions & Student Counseling (Colleges & Institutes)
                  </option>
                  <option value="Order Tracking, Delivery & Return Inquiries">
                    Order Tracking, Delivery & Return Inquiries
                  </option>
                  <option value="Payment Follow-ups, Reminders & Collections">
                    Payment Follow-ups, Reminders & Collections
                  </option>
                  <option value="24/7 Multilingual Inbound Helpline">
                    24/7 Multilingual Inbound Helpline
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Multilingual Dialect
                </label>
                <select
                  value={primaryLanguage}
                  onChange={(e) => setPrimaryLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 cursor-pointer"
                >
                  <option value="Hindi + English (Hinglish)">Hindi + English (Hinglish)</option>
                  <option value="Telugu + English">Telugu + English</option>
                  <option value="Tamil + English">Tamil + English</option>
                  <option value="Kannada + English">Kannada + English</option>
                  <option value="Marathi + English">Marathi + English</option>
                  <option value="Bengali + English">Bengali + English</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 font-black py-3 sm:py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(205,251,86,0.35)] hover:scale-[1.01] active:scale-98 cursor-pointer"
              >
                <span>COMPLETE SETUP & LAUNCH DASHBOARD</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitting(true);
                    if (typeof window !== "undefined") {
                      localStorage.setItem(
                        "swaram_user",
                        JSON.stringify({
                          email: email.trim(),
                          fullName: fullName.trim() || email.split("@")[0],
                          workspaceName: workspaceName.trim() || "My Voice Workspace",
                          agentUseCase,
                          primaryLanguage,
                          isNewUser: true,
                        })
                      );
                      localStorage.setItem("aeline_auth_token", "mock_jwt_token_" + Date.now());
                    }
                    onClose();
                    router.push("/dashboard");
                  }}
                  className="text-xs text-slate-500 hover:text-slate-900 font-semibold underline cursor-pointer"
                >
                  Skip for now and launch dashboard &rarr;
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: Animated Transitioning to Dashboard */}
        {step === 3 && (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#cdfb56]/30 border border-[#cdfb56] flex items-center justify-center mb-5 animate-pulse">
              <Bot className="w-8 h-8 text-slate-950" />
            </div>
            <h3 className="text-2xl font-black text-slate-950 tracking-tight mb-2">
              Provisioning Voice Agent...
            </h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">
              Setting up SIP trunks, multilingual speech models, and routing directly to your Operations Dashboard.
            </p>
            <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-full h-full bg-slate-950 rounded-full animate-[progress_1s_ease-in-out_infinite]" />
            </div>
          </div>
        )}

        {/* Security & Grounding Micro-Footer */}
        {step !== 3 && (
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[10.5px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              FERPA & DPDP Grounded
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Sub-140ms SIP Engine
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
