"use client";
import { useEffect, useRef } from "react";

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
    const particleCount = width < 768 ? 80 : 150; 
    
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
        vx: 0,
        vy: 0,
      });
    }

    let animationFrameId: number;
    let time = 0;
    let scrollY = window.scrollY;

    let mouseX = -1000;
    let mouseY = -1000;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOut = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const ex = e.clientX;
      const ey = e.clientY;
      particles.forEach(p => {
        const dx = p.x - ex;
        const dy = p.y - ey;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          const force = (400 - dist) / 400;
          // Massive velocity impulse outward
          p.vx += (dx / dist) * force * 60;
          p.vy += (dy / dist) * force * 60;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    const render = () => {
      time += 0.002;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        // Base flow
        p.baseX += p.speed;
        if (p.baseX > width) p.baseX = 0;

        const waveAmplitude = 150;
        const waveY = Math.sin(p.baseX * 0.003 + time + p.offset) * waveAmplitude;
        
        const targetX = p.baseX;
        const targetY = p.baseY + waveY - (scrollY * 0.25);

        // Spring physics pulling towards target
        p.vx += (targetX - p.x) * 0.03;
        p.vy += (targetY - p.y) * 0.03;

        // Mouse repulse
        const dxMouse = p.x - mouseX;
        const dyMouse = p.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 200) {
          const force = (200 - distMouse) / 200;
          p.vx += (dxMouse / distMouse) * force * 1.5;
          p.vy += (dyMouse / distMouse) * force * 1.5;
        }

        // Apply velocity with friction
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.88;
        p.vy *= 0.88;

        const drawX = p.x;
        const drawY = p.y;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 0, 0.8)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const p2DrawX = p2.x;
          const dx = drawX - p2DrawX;
          if (Math.abs(dx) > 180) continue;

          const p2DrawY = p2.y;
          const dy = drawY - p2DrawY;
          if (Math.abs(dy) > 180) continue;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(p2DrawX, p2DrawY);
            
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0B0B0B] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ opacity: 0.18, willChange: "transform, opacity" }}
      />
    </div>
  );
}
