"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  UserPlus,
  LogIn,
  Mail,
  Lock,
  User,
  Building2,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  ShieldCheck,
  Zap,
  PhoneCall,
  Globe,
  ArrowLeft,
  Bot,
} from "lucide-react";

interface AuthPageClientProps {
  initialMode: "login" | "signup" | "signin";
}

export default function AuthPageClient({ initialMode }: AuthPageClientProps) {
  const router = useRouter();
  const normalizedInitial =
    initialMode === "login" || initialMode === "signin" ? "login" : "signup";
  const [mode, setMode] = useState<"login" | "signup">(normalizedInitial);
  const [step, setStep] = useState<1 | 2>(1);

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
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Empty", color: "bg-slate-200" };
    if (pass.length < 6) return { score: 1, label: "Weak", color: "bg-rose-500" };
    if (pass.length < 10) return { score: 2, label: "Moderate", color: "bg-amber-500" };
    return { score: 3, label: "Strong", color: "bg-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setNoticeMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter a secure password.");
      return;
    }

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
        router.push("/dashboard");
      }, 700);
      return;
    }

    // SIGN UP FLOW (New user)
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
        setErrorMessage("Please accept the Terms of Service & DPDP Privacy Agreement.");
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "swaram_user",
            JSON.stringify({
              email: email.trim(),
              name: fullName.trim() || email.split("@")[0],
              fullName: fullName.trim() || email.split("@")[0],
              workspaceName: workspaceName.trim() || "Apex AI Call Center",
              agentUseCase,
              primaryLanguage,
              isNewUser: true,
              provider: "email",
              createdAt: new Date().toISOString(),
            })
          );
          localStorage.setItem("aeline_auth_token", "mock_jwt_token_" + Date.now());
        }
        setIsSubmitting(false);
        router.push("/dashboard");
      }, 900);
    }
  };

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
      router.push("/dashboard");
    }, 650);
  };

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
    setNoticeMessage(`Password reset link sent to ${email}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-[#FFD9A0]/60 selection:text-black">
      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center font-black text-sm">
            S
          </div>
          <span className="font-sans font-black text-xl tracking-tight text-slate-950">
            Swaram<span className="text-[#84cc16]">.ai</span>
          </span>
        </Link>
      </header>

      {/* Main Center Container */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        {/* Left Side: Auth Form Box (7 cols) */}
        <div className="lg:col-span-7 w-full max-w-lg mx-auto bg-white rounded-3xl sm:rounded-[36px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-200/90 p-6 sm:p-10 relative overflow-hidden">
          {/* Specular sheen */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-80" />

          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex p-1 bg-slate-100 rounded-full border border-slate-200/80">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMessage(null);
                  setNoticeMessage(null);
                }}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  mode === "login"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMessage(null);
                  setNoticeMessage(null);
                }}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  mode === "signup"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 text-[#cdfb56]" />
                <span>Sign Up Free</span>
              </button>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-6 text-center">
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
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {mode === "login" ? "Log in to Swaram AI" : "Create Your Free Account"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {mode === "login"
                ? "Access your live AI agent call center, active telephony lines, and telemetry."
                : "Deploy an autonomous AI call center in minutes for hospitals, e-commerce, institutes & enterprises."}
            </p>
          </div>

          {/* Google Auth Button */}
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

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {noticeMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-800 animate-in fade-in">
              <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{noticeMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-3.5">
            {/* Full Name in Sign Up */}
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

            {/* Email */}
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

            {/* Company / Workplace in Sign Up */}
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

              {/* Password strength meter in signup */}
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

            {/* Confirm Password in Sign Up */}
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

            {/* Checkbox */}
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

            {/* Submit */}
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
                      : "CREATE ACCOUNT & LAUNCH"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#cdfb56]" />
                </>
              )}
            </button>

            {/* Switch Mode Prompt */}
            <div className="pt-2 text-center text-xs text-slate-500">
              {mode === "login" ? (
                <p>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setErrorMessage(null);
                      setNoticeMessage(null);
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
                      setNoticeMessage(null);
                    }}
                    className="text-slate-950 font-bold hover:underline cursor-pointer ml-1"
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>

            {/* Quick Demo Fill Helper */}
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

        {/* Right Side: Feature Highlight Showcase (5 cols, Desktop) */}
        <div className="lg:col-span-5 hidden lg:flex flex-col gap-6 pl-4">
          <div className="p-8 rounded-[36px] bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0a3d1b] bg-[#cdfb56] px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#0a3d1b]" />
              <span>Autonomous AI Call Center</span>
            </div>

            <h2 className="text-2xl font-black text-slate-950 tracking-tight leading-snug mb-3">
              Replace Costly Call Centers with 24/7 AI Voice Agents.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Hospitals, e-commerce stores, colleges, and institutes spend heavily to maintain manual
              customer service desks. Swaram AI delivers autonomous, multilingual voice agents that
              resolve calls instantly at a fraction of the cost.
            </p>

            {/* Value Props Checklist */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#cdfb56]/40 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                </div>
                <span>100 Free Voice Minutes on Instant Signup</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#cdfb56]/40 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                </div>
                <span>Natural Hinglish, Telugu, Tamil, Kannada + 10 Dialects</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#cdfb56]/40 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                </div>
                <span>80%+ Cost Reduction vs. Traditional Call Centers</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-full bg-[#cdfb56]/40 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                </div>
                <span>Patient Bookings, Order Queries, Admissions & Helplines</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic">
              &ldquo;Switching our customer desk to Swaram AI reduced our call center costs by 76% while
              eliminating queue wait times completely during peak volume.&rdquo;
              <div className="mt-2 text-[11px] font-bold text-slate-900 not-italic">
                — Head of Customer Operations, QuickCart Retail
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Swaram Inc. Enterprise Multilingual Voice Telephony.
      </footer>
    </div>
  );
}

