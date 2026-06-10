"use client";
import { useEffect, useRef, Suspense } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  offset: number;
  speed: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = width < 768 ? 60 : 120; // Reduced for performance
    
    for (let i = 0; i < particleCount; i++) {
      const startX = Math.random() * width;
      const startY = height / 2 + (Math.random() - 0.5) * (height * 0.5);
      particles.push({
        x: startX,
        y: startY,
        baseX: startX,
        baseY: startY,
        size: Math.random() * 1.5 + 0.5,
        offset: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    let animationFrameId: number;
    let time = 0;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = () => {
      time += 0.002;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        // Base flow
        p.baseX += p.speed;
        if (p.baseX > width) p.baseX = 0;

        const waveAmplitude = 150;
        const waveY = Math.sin(p.baseX * 0.003 + time + p.offset) * waveAmplitude;
        
        // Final positions (No scroll parallax so it stays globally visible!)
        p.x = p.baseX;
        p.y = p.baseY + waveY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 0, 0.8)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          if (Math.abs(dx) > 180) continue;

          const dy = p.y - p2.y;
          if (Math.abs(dy) > 180) continue;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            const opacity = 1 - dist / 180;
            ctx.strokeStyle = `rgba(255, 107, 0, ${opacity * 0.6})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <div 
        style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
          zIndex: -1, 
          pointerEvents: "none",
          backgroundColor: "#0B0B0B",
          overflow: "hidden"
        }}
      >
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ opacity: 0.25, willChange: "transform, opacity" }}
        />
      </div>
    </Suspense>
  );
}
