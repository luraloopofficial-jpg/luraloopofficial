"use client";
import { ReactLenis } from '@studio-freight/react-lenis';
import { ReactNode, useEffect } from 'react';
import gsap from 'gsap';

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Sync GSAP ticker and disable lag smoothing to prevent ScrollTrigger jitter
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, syncTouch: true, wheelMultiplier: 1.1 }}>
      {/* @ts-expect-error React 19 vs React 18 type mismatch in Lenis */}
      {children}
    </ReactLenis>
  );
}
