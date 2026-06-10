import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import NeuralBackground from "@/components/ui/NeuralBackground";
import Chatbot from "@/components/ui/Chatbot";
import { AuthProvider } from "@/components/auth/AuthContext";
import { AboutProvider } from "@/components/modals/AboutContext";

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
    default: "LuraLoop | Enterprise AI Automation & Intelligent Operational Layer",
    template: "%s | LuraLoop"
  },
  description: "LuraLoop is an Enterprise AI Automation company acting as an intelligent operational layer on top of current HMS, CRM, ERP systems with Zero-Data-Retention.",
  keywords: ["Enterprise AI", "Workflow Automation", "Healthcare AI", "AI Receptionist", "Ziya Patient Agent", "Zero-Data-Retention", "AI Agents"],
  authors: [{ name: "LuraLoop Inc." }],
  creator: "LuraLoop Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luraloopofficial.vercel.app/",
    siteName: "LuraLoop",
    title: "LuraLoop | Hire The Future",
    description: "An Enterprise AI Automation company acting as an intelligent operational layer on top of current systems with zero data retention.",
    images: [
      {
        url: "https://luraloopofficial.vercel.app/hero-3d.png",
        width: 1200,
        height: 630,
        alt: "LuraLoop Enterprise AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuraLoop | Enterprise AI Automation",
    description: "Hire The Future. An intelligent operational layer acting securely on top of current enterprise systems.",
    images: ["https://luraloopofficial.vercel.app/hero-3d.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "LuraLoop",
      "url": "https://luraloopofficial.vercel.app/",
      "logo": "https://luraloopofficial.vercel.app/Logo.svg",
      "description": "LuraLoop is an enterprise AI automation company providing intelligent operational layers for businesses.",
      "sameAs": [
        "https://twitter.com/luraloop",
        "https://github.com/luraloopofficial-jpg"
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Enterprise AI Automation",
      "provider": {
        "@type": "Organization",
        "name": "LuraLoop"
      },
      "areaServed": "Worldwide",
      "description": "Intelligent operational layer acting securely on top of current HMS, CRM, and ERP systems via temporary session context with a Zero-Data-Retention architecture."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-brand-white selection:bg-brand-orange selection:text-white bg-transparent`}
      >
        <NeuralBackground />
        <SmoothScrolling>
          <AuthProvider>
            <AboutProvider>
              <Cursor />
              <Header />
              <main className="min-h-screen pt-24 pb-16 overflow-hidden relative z-10">
                {children}
              </main>
              <Footer />
              <Chatbot />
            </AboutProvider>
          </AuthProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
