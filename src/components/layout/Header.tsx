"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openAuth } = useAuth();

  const navLinks = [
    { name: "Product", href: "#product" },
    { name: "Industries", href: "#industries" },
    { name: "Architecture", href: "#architecture" },
    { name: "Pricing", href: "#pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mt-4 mx-4 md:mx-8 ${scrolled ? "bg-brand-black/70 backdrop-blur-md border border-white/10 rounded-2xl" : "bg-brand-black/40 backdrop-blur-md border border-white/10 rounded-2xl"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
          <img 
            src="/logo.svg" 
            alt="LuraLoop Logo" 
            style={{ width: '140px', height: '36px' }} 
            className="object-contain"
          />
        </Link>

        {/* Center: Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => 
            link.action ? (
              <button
                key={link.name}
                onClick={link.action}
                className="text-sm font-medium text-brand-gray hover:text-brand-white transition-colors"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href || "#"}
                className="text-sm font-medium text-brand-gray hover:text-brand-white transition-colors"
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => openAuth("login")}
            className="text-sm font-medium text-brand-gray hover:text-brand-white transition-colors hidden md:block"
          >
            Login
          </button>
          <button
            onClick={() => openAuth("signup")}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-white text-brand-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors group"
          >
            Sign Up
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
}
