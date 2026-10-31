import { Metadata } from "next";
import AuthPageClient from "@/components/aeline/AuthPageClient";

export const metadata: Metadata = {
  title: "Log In — Swaram AI Voice Operations",
  description: "Log in to your Swaram AI voice operations workspace and telephony console.",
};

export default function SignInPage() {
  return <AuthPageClient initialMode="login" />;
}
