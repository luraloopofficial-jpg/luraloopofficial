"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Database, Lock, Users, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const rbac = [
  { role: "Patients", access: "Appointment Booking, Basic Queries, Tokens", color: "border-blue-500/50" },
  { role: "Doctors", access: "Patient History (Temporary context), Scheduling", color: "border-green-500/50" },
  { role: "HR / Staff", access: "Roster Management, Department Workflow", color: "border-purple-500/50" },
  { role: "Management", access: "Revenue Analytics, Hospital Overview", color: "border-brand-orange/50" },
];

export default function SecurityArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (elementsRef.current.length > 0) {
        gsap.fromTo(
          elementsRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const addToElements = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} id="architecture" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16" ref={addToElements} style={{ willChange: "transform, opacity" }}>
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6">
            <ShieldCheck className="w-10 h-10 text-brand-orange" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Zero-Data-Retention <span className="text-brand-orange">Architecture</span>
          </h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            We act as a secure processing layer. Your data never leaves your infrastructure permanently.
          </p>
        </div>

        {/* Flowchart / Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div ref={addToElements} className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20" style={{ willChange: "transform, opacity" }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold">✕</div>
              <h3 className="text-xl font-semibold text-brand-white">What We Don't Do</h3>
            </div>
            <p className="text-brand-gray leading-relaxed">
              LuraLoop <strong className="text-brand-white">DOES NOT</strong> store patient records, business data, or customer databases permanently. We do not train models on your proprietary internal data without explicit enterprise licensing agreements.
            </p>
          </div>

          <div ref={addToElements} className="p-8 rounded-2xl bg-green-500/5 border border-green-500/20" style={{ willChange: "transform, opacity" }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">✓</div>
              <h3 className="text-xl font-semibold text-brand-white">What We Do</h3>
            </div>
            <p className="text-brand-gray leading-relaxed">
              LuraLoop <strong className="text-brand-white">ONLY</strong> processes requests and executes workflows via temporary session context in memory. Once the transaction is complete, the data is immediately cleared.
            </p>
          </div>
        </div>

        {/* Visual Architecture */}
        <div ref={addToElements} className="relative py-12 px-6 rounded-3xl border border-white/10 bg-white/[0.02] mb-20 overflow-hidden" style={{ willChange: "transform, opacity" }}>
          <h3 className="text-2xl font-semibold text-center mb-12">Data Flow</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center p-6 bg-brand-black border border-white/10 rounded-xl w-48 text-center z-10">
              <Users className="w-8 h-8 mb-3 text-brand-gray" />
              <span className="font-medium">User Query</span>
            </div>
            
            <div className="h-8 md:h-1 w-1 md:w-16 bg-brand-orange animate-pulse" />
            
            <div className="flex flex-col items-center p-6 bg-brand-orange/10 border border-brand-orange rounded-xl w-56 text-center z-10 shadow-[0_0_30px_rgba(255,107,0,0.15)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-brand-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                Temporary Memory
              </div>
              <Server className="w-8 h-8 mb-3 text-brand-orange" />
              <span className="font-medium">LuraLoop Agent</span>
            </div>

            <div className="h-8 md:h-1 w-1 md:w-16 bg-green-500/50" />

            <div className="flex flex-col items-center p-6 bg-brand-black border border-white/10 rounded-xl w-48 text-center z-10">
              <Database className="w-8 h-8 mb-3 text-brand-gray" />
              <span className="font-medium">Client HMS / ERP</span>
              <span className="text-xs text-brand-gray mt-2">100% Data Ownership</span>
            </div>
          </div>
        </div>

        {/* RBAC Matrix */}
        <div ref={addToElements} style={{ willChange: "transform, opacity" }}>
          <div className="text-center mb-10">
            <Lock className="w-8 h-8 mx-auto text-brand-orange mb-4" />
            <h3 className="text-2xl font-semibold text-brand-white">Role-Based Access Control</h3>
            <p className="text-brand-gray mt-2">Strict context isolation based on user roles.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rbac.map((role) => (
              <div key={role.role} className={`p-6 rounded-xl border bg-brand-black ${role.color}`}>
                <h4 className="text-lg font-bold text-brand-white mb-2">{role.role}</h4>
                <p className="text-sm text-brand-gray">{role.access}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
