import type { Metadata } from "next";
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
  title: "Free AI Agent Starter Pack | Agent OS",
  description: "Build a personal AI operating system. Get the free Agent OS Starter Pack — 5-agent framework, thinking templates, and clarity tools. Instant download.",
  openGraph: {
    title: "Free AI Agent Starter Pack | Agent OS",
    description: "Stop feeling mentally overloaded. Get the free Agent OS Starter Pack and start building AI systems that think with you.",
    url: "https://agent-os-landing.vercel.app",
    siteName: "Agent OS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Agent Starter Pack | Agent OS",
    description: "Stop feeling mentally overloaded. Get the free Agent OS Starter Pack and start building AI systems that think with you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
