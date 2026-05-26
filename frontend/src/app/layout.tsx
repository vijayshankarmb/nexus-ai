import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nexus AI | Autonomous Research Assistant",
    template: "%s | Nexus AI",
  },
  description: "Production-grade multi-agent AI research system that orchestrates autonomous research workflows using specialized AI agents to generate structured research outputs in real time.",
  authors: [{ name: "Vijay Shankar M B", url: "https://vijayx.in" }],
  creator: "Vijay Shankar M B",
  keywords: ["AI", "Research Assistant", "LangGraph", "Multi-Agent", "Gemini API", "FastAPI", "Next.js", "Nexus AI", "Autonomous Workflow"],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nexus AI | Autonomous Research Assistant",
    description: "Production-grade multi-agent AI research system that orchestrates autonomous workflows to generate structured research outputs in real time.",
    siteName: "Nexus AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus AI | Autonomous Research Assistant",
    description: "Production-grade multi-agent AI research system generating structured research outputs in real time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
