"use client";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Draw cover
      ctx.fillStyle = "#18181b"; // zinc-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw text
      ctx.fillStyle = "#FF6B00"; 
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch for Offer", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current || isScratched) return;
      e.preventDefault();

      const { x, y } = getCoordinates(e);

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      checkScratchedPercentage();
    };

    const checkScratchedPercentage = () => {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      if (transparentPixels / totalPixels > 0.6 && !isScratched) {
        setIsScratched(true);
        triggerConfetti();
      }
    };

    const triggerConfetti = () => {
      // High-velocity color explosion effect
      const end = Date.now() + 1000;

      const frame = () => {
        confetti({
          particleCount: 15,
          angle: 60,
          spread: 80,
          startVelocity: 60,
          origin: { x: 0, y: 0.8 },
          colors: ["#FF6B00", "#FFFFFF"]
        });
        confetti({
          particleCount: 15,
          angle: 120,
          spread: 80,
          startVelocity: 60,
          origin: { x: 1, y: 0.8 },
          colors: ["#FF6B00", "#FFFFFF"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true;
      scratch(e);
    };

    const stopDrawing = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", scratch, { passive: false });
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchcancel", stopDrawing);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", scratch);
      canvas.removeEventListener("touchend", stopDrawing);
      canvas.removeEventListener("touchcancel", stopDrawing);
    };
  }, [isScratched]);

  return (
    <div className="mb-6">
      <p className="text-sm text-brand-gray font-medium uppercase tracking-wider mb-3">Deployment Setup</p>
      
      <div 
        ref={containerRef}
        className="relative w-full max-w-[300px] h-16 rounded-xl overflow-hidden border border-white/10 select-none bg-brand-black"
      >
        {/* Hidden Reward (Revealed state) */}
        <div className="absolute inset-0 flex flex-row items-center px-4 bg-brand-orange/5">
          <div className="flex items-end gap-3">
            <span className={`text-2xl font-bold transition-all duration-700 ${isScratched ? "text-brand-gray line-through decoration-brand-orange/50" : "text-brand-white"}`}>
              ₹75,000
            </span>
            <span className={`text-4xl font-black text-brand-orange drop-shadow-[0_0_10px_rgba(255,107,0,0.8)] transition-all duration-700 delay-300 ${isScratched ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
              ₹50,000
            </span>
          </div>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 cursor-pointer touch-none transition-opacity duration-700 ${
            isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      </div>
      <p className="text-sm text-brand-orange mt-2">One-time architecture fee</p>
    </div>
  );
}
