"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor globally on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      document.body.style.cursor = "none";
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use QuickTo for better performance in GSAP
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Center the cursor
      xTo(e.clientX - 16);
      yTo(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand and rotate faster on hover over buttons, links, etc
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        gsap.to(cursor, { scale: 1.8, rotation: 45, duration: 0.3, ease: "back.out(1.5)" });
      } else {
        gsap.to(cursor, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden sm:block mix-blend-screen"
      style={{
        filter: "drop-shadow(0 0 10px rgba(255,107,0,0.8)) drop-shadow(0 0 20px rgba(255,107,0,0.6))"
      }}
    >
      {/* Abstract Four-Arm Logo representation */}
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full opacity-90 animate-[spin_10s_linear_infinite]">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" fill="#FF6B00" />
      </svg>
    </div>
  );
}
