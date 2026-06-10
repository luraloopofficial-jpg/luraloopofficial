"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import ScratchCard from "@/components/ui/ScratchCard";
import Link from "next/link";

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="pricing" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Transparent <span className="text-brand-orange">Enterprise Pricing</span>
          </h2>
          <p className="text-lg text-brand-gray">
            Predictable costs. Infinite scalability.
          </p>
        </div>

        {/* Pricing Card */}
        <div 
          ref={cardRef}
          className="relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
            
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold mb-2">Ziya Patient Agent</h3>
              <p className="text-brand-gray mb-8">Full-suite intelligent reception & patient management.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span className="text-brand-white">WhatsApp Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span className="text-brand-white">Appointment Booking Engine</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span className="text-brand-white">Temporary Context Memory</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                  <span className="text-brand-white">Custom Hospital Knowledge Base</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-brand-black p-8 rounded-2xl border border-white/5 shadow-2xl">
              
              <ScratchCard />

              <div className="h-px w-full bg-white/10 mb-6" />

              <div className="mb-8">
                <p className="text-sm text-brand-gray font-medium uppercase tracking-wider mb-2">Monthly Operations</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-brand-white">₹15,000</span>
                  <span className="text-brand-gray mb-1">/ month</span>
                </div>
                <p className="text-sm text-brand-gray mt-1">Includes hosting, maintenance & support</p>
              </div>

              <Link href="/deployment/register" className="w-full group flex items-center justify-center gap-2 px-6 py-4 bg-brand-white text-brand-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                Start Deployment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
