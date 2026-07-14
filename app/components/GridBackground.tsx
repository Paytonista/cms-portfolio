"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const spacing = 60;
    const radius = 350;   // how far the distortion reaches
    const strength = 50;  // how far lines get pushed

    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", handleMove);

    // push a point away from the mouse, falling off with distance
    const distort = (x: number, y: number) => {
      const { x: mx, y: my } = mouseRef.current;
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius || dist === 0) return { x, y };
      const falloff = (1 - dist / radius) ** 2; // smoothstep-ish falloff
      const force = falloff * strength;
      const angle = Math.atan2(dy, dx);
      return {
        x: x + Math.cos(angle) * force,
        y: y + Math.sin(angle) * force,
      };
    };

    const drawLine = (points: { x: number; y: number }[]) => {
      ctx.beginPath();
      points.forEach((p, i) => {
        const d = distort(p.x, p.y);
        i === 0 ? ctx.moveTo(d.x, d.y) : ctx.lineTo(d.x, d.y);
      });
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;

      const step = 2; // segment resolution — smaller = smoother curves

      // vertical lines
      for (let x = 0; x <= canvas.width; x += spacing) {
        const points = [];
        for (let y = 0; y <= canvas.height; y += step) points.push({ x, y });
        drawLine(points);
      }

      // horizontal lines
      for (let y = 0; y <= canvas.height; y += spacing) {
        const points = [];
        for (let x = 0; x <= canvas.width; x += step) points.push({ x, y });
        drawLine(points);
      }

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}