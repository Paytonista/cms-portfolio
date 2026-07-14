"use client";

import { useEffect, useRef } from "react";
import useMousePosition from "@/app/hooks/useMousePosition";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { x, y } = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 40;
    const RADIUS = 220;
    const MAX_DISPLACEMENT = 12;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Pre-calculate base vertex positions
    const cols = Math.ceil(canvas.width / SPACING) + 1;
    const rows = Math.ceil(canvas.height / SPACING) + 1;
    const baseX = Array.from({ length: cols }, (_, i) => i * SPACING);
    const baseY = Array.from({ length: rows }, (_, i) => i * SPACING);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          const dx = baseX[i] - x;
          const dy = baseY[j] - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const strength = Math.max(0, 1 - dist / RADIUS);
          const px = baseX[i] + (dx / (dist || 1)) * strength * MAX_DISPLACEMENT;
          const py = baseY[j] + (dy / (dist || 1)) * strength * MAX_DISPLACEMENT;
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
          const dx = baseX[i] - x;
          const dy = baseY[j] - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const strength = Math.max(0, 1 - dist / RADIUS);
          const px = baseX[i] + (dx / (dist || 1)) * strength * MAX_DISPLACEMENT;
          const py = baseY[j] + (dy / (dist || 1)) * strength * MAX_DISPLACEMENT;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}