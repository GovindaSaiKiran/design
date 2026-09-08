import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Syne,
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  title: "Edu-Voice-Ai — Spatial AI Admission Counselor for Higher Education",
  description:
    "Edu-Voice-Ai answers admission calls 24/7, understands prospective student inquiries, grounds answers in institutional knowledge, and connects prospects with your team.",
  keywords: [
    "Edu-Voice-Ai",
    "AI Admission Counselor",
    "Maya Voice AI",
    "University Telephony",
    "Higher Education Admissions",
    "Institutional RAG",
    "Zero Hold Times"
  ],
  authors: [{ name: "Edu-Voice-Ai Inc." }],
  openGraph: {
    title: "Edu-Voice-Ai — Spatial AI Admission Counselor",
    description:
      "Edu-Voice-Ai answers admission calls 24/7, understands prospective student inquiries, and connects prospects with your team.",
    type: "website",
    locale: "en_US",
    siteName: "Edu-Voice-Ai"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${syne.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#fbfbfb] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}
