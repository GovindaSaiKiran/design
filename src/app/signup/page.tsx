import { Metadata } from "next";
import AuthPageClient from "@/components/aeline/AuthPageClient";

export const metadata: Metadata = {
  title: "Sign Up Free — Swaram AI Voice Operations",
  description: "Create your free Swaram AI account and deploy autonomous collegiate voice telephony.",
};

export default function SignUpPage() {
  return <AuthPageClient initialMode="signup" />;
}

