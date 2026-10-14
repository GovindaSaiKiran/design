"use client";

import React, { useState } from "react";
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
  Phone,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "get-started";
}

export default function AuthOnboardingModal({
  isOpen,
  onClose,
  initialMode = "get-started",
}: AuthOnboardingModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "get-started">(initialMode);
  const [step, setStep] = useState<1 | 2 | 3>(1); // Step 1: Email/Password, Step 2: Workspace Setup, Step 3: Launching

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [agentUseCase, setAgentUseCase] = useState("Admissions & Counseling");
  const [primaryLanguage, setPrimaryLanguage] = useState("Hindi + English (Hinglish)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep(1);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (mode === "login") {
      // Direct login path: simulate instant verification and redirect to dashboard
      setIsSubmitting(true);
      setTimeout(() => {
        if (typeof window !== "undefined") {
          localStorage.setItem("swaram_user", JSON.stringify({ email, name: email.split("@")[0] }));
          localStorage.setItem("aeline_auth_token", "mock_jwt_token_" + Date.now());
        }
        setIsSubmitting(false);
        onClose();
        router.push("/dashboard");
      }, 700);
    } else {
      // Get started onboarding path: proceed to step 2 for workspace personalization
      setStep(2);
      if (!workspaceName) {
        const domain = email.includes("@") ? email.split("@")[1].split(".")[0] : "Campus";
        setWorkspaceName(domain.charAt(0).toUpperCase() + domain.slice(1) + " Voice AI");
      }
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStep(3);

    // Save mock user session and workspace settings
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "swaram_user",
        JSON.stringify({
          email,
          fullName: fullName || email.split("@")[0],
          workspaceName: workspaceName || "My Voice Workspace",
          agentUseCase,
          primaryLanguage,
        })
      );
      localStorage.setItem("aeline_auth_token", "mock_jwt_token_" + Date.now());
    }

    // Give visual animation feedback before routing to dashboard
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      router.push("/dashboard");
    }, 1200);
  };

  const handleGoogleAuth = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      const mockGoogleUser = {
        email: "alex.morgan.ai@gmail.com",
        fullName: "Alex Morgan",
        workspaceName: "Apex Voice AI Campus",
        agentUseCase: "Admissions & Student Counseling",
        primaryLanguage: "Hindi + English (Hinglish)",
        provider: "google",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
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
        // Pre-populate data and take to step 2 for immediate personalized review
        setEmail("alex.morgan.ai@gmail.com");
        setFullName("Alex Morgan");
        setWorkspaceName("Apex Voice AI Campus");
        setStep(2);
      }
    }, 600);
  };

  const handleQuickDemoFill = () => {
    setEmail("admissions@university.edu");
    setPassword("swaram2026");
    setFullName("Dr. Rajesh Sharma");
    setWorkspaceName("Apex University AI Hotline");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.2)] border border-slate-200/90 p-6 sm:p-9 text-slate-900 transition-all">
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

        {/* Mode Toggle (Login vs Get Started) */}
        {step === 1 && (
          <div className="flex items-center justify-center mb-6">
            <div className="flex p-1 bg-slate-100 rounded-full border border-slate-200/80">
              <button
                type="button"
                onClick={() => setMode("get-started")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  mode === "get-started"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Get Started Free
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  mode === "login"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                Log In
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: Email & Credentials */}
        {step === 1 && (
          <div>
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-900 bg-[#cdfb56]/40 border border-[#cdfb56] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2.5 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#0a3d1b]" />
                <span>{mode === "login" ? "Welcome Back" : "Zero Friction Access"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {mode === "login" ? "Log in to Swaram AI" : "Start Building Free"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                {mode === "login"
                  ? "Access your live telephony agents, calls telemetry, and analytics."
                  : "Begin with 100 free voice minutes. No credit card required."}
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
                    <span>{mode === "login" ? "Log in with Google" : "Continue with Google"}</span>
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200/90 w-full" />
                <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                  {mode === "login" ? "or continue with email" : "or register with work email"}
                </span>
                <div className="border-t border-slate-200/90 w-full" />
              </div>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Work or University Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admissions@university.edu"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => alert("Password reset link sent to your email.")}
                      className="text-[11px] text-[#0284c7] hover:underline font-semibold cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400 transition-all"
                  />
                </div>
              </div>

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
                    <span>{mode === "login" ? "CONTINUE TO DASHBOARD" : "CONTINUE ONBOARDING"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#cdfb56]" />
                  </>
                )}
              </button>

              {/* Quick Fill Mock Helper */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="text-[11px] text-slate-500 hover:text-slate-900 font-medium underline underline-offset-2 cursor-pointer transition-colors"
                >
                  Fill with demo institutional credentials
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Onboarding Setup (Workspace & Use Case) */}
        {step === 2 && (
          <div>
            <div className="mb-5 text-center">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#0a3d1b] bg-[#cdfb56] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-[#0a3d1b]" />
                <span>Step 2 of 2: Setup Workspace</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Personalize Your AI Agent
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
                  Campus or Organization Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="e.g. Apex Institute of Technology"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Voice Agent Purpose
                </label>
                <select
                  value={agentUseCase}
                  onChange={(e) => setAgentUseCase(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 cursor-pointer"
                >
                  <option value="Admissions & Student Counseling">Admissions & Student Counseling</option>
                  <option value="Fee Inquiries & Financial Aid">Fee Inquiries & Financial Aid</option>
                  <option value="Campus Facilities & Hostel Desk">Campus Facilities & Hostel Desk</option>
                  <option value="24/7 Academic Knowledge RAG">24/7 Academic Knowledge RAG</option>
                  <option value="Alumni Outreach & Placement">Alumni Outreach & Placement</option>
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
