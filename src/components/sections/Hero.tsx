"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic GSAP Zoom effect on the background image
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.05 },
          {
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
          }
        );

        // ScrollTrigger: Fade out the image and shift Y smoothly as user scrolls down
        gsap.to(bgImageRef.current, {
          yPercent: 30, // Slight vertical shift
          opacity: 0,
          ease: "none",
          force3D: true, // Hardware acceleration
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top", // Ends exactly when hero leaves the viewport
            scrub: 0.5, // Smoothing the scrub to decouple from raw scroll event frequency
          },
        });
      }

      // Animate text reveal
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden flex items-center pt-20 pb-10">
      
      {/* Full-Screen Absolute Background Image & Gradient grouped for scroll fade-out */}
      <div 
        ref={bgImageRef} 
        className="absolute inset-0 w-full h-full z-5 origin-center"
        style={{ willChange: "transform, opacity" }}
      >
        <Image 
          src="/hero-3d.png" 
          alt="LuraLoop Futuristic Workspace" 
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Subtle Dark Gradient Overlay for Typography Contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B0B0B]/95 via-[#0B0B0B]/50 to-transparent pointer-events-none" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center">
        
        {/* Left Column: Text */}
        <div ref={textRef} className="flex flex-col items-start max-w-2xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-medium mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(255,107,0,0.2)]">
            Intelligent Operational Layer
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05] text-brand-white drop-shadow-2xl">
            Hire The <span className="text-brand-orange">Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-gray/90 mb-10 max-w-lg leading-relaxed drop-shadow-md">
            An Enterprise AI Automation company that acts as an intelligent operational layer on top of current systems.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#use-cases"
              className="group flex items-center gap-2 px-6 py-3.5 bg-brand-orange text-brand-black font-semibold rounded-xl hover:bg-[#ff8022] transition-colors shadow-[0_0_20px_rgba(255,107,0,0.3)]"
            >
              Explore Use Cases
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#download"
              className="flex items-center gap-2 px-6 py-3.5 bg-brand-black/40 backdrop-blur-md text-brand-white border border-white/20 font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Client
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
