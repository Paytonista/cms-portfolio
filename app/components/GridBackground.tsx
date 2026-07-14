"use client";

import { useEffect, useRef } from "react";

interface Wave {
  x: number;
  y: number;
  startTime: number;
}

interface Light {
  axis: "h" | "v";     // travels along a horizontal or vertical line
  line: number;         // the fixed coordinate (y for h, x for v)
  pos: number;          // current position along the line
  dir: 1 | -1;
  speed: number;        // px per second
  trail: { x: number; y: number }[];
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const wavesRef = useRef<Wave[]>([]);
  const lightsRef = useRef<Light[]>([]);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const spacing = 60;
    const radius = 350;
    const strength = 50;

    const waveSpeed = 500;
    const waveLife = 1200;
    const waveWidth = 120;
    const waveStrength = 60;

    // light tuning
    const lightSpawnInterval = 1400; // ms between spawns
    const maxLights = 6;
    const lightSpeedMin = 250;
    const lightSpeedMax = 450;
    const trailLength = 26;
    const glowRadius = 22;

    let raf: number;
    let lastTime = performance.now();

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

    const handleClick = (e: PointerEvent) => {
      wavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
      });
    };
    window.addEventListener("pointerdown", handleClick);

    const hoverDistort = (x: number, y: number) => {
      const { x: mx, y: my } = mouseRef.current;
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius || dist === 0) return { x: 0, y: 0 };
      const falloff = (1 - dist / radius) ** 2;
      const force = falloff * strength;
      const angle = Math.atan2(dy, dx);
      return { x: Math.cos(angle) * force, y: Math.sin(angle) * force };
    };

    const waveDistort = (x: number, y: number, now: number) => {
      let totalX = 0;
      let totalY = 0;
      for (const wave of wavesRef.current) {
        const age = now - wave.startTime;
        if (age < 0 || age > waveLife) continue;
        const dx = x - wave.x;
        const dy = y - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ringRadius = (age / 1000) * waveSpeed;
        const distFromRing = Math.abs(dist - ringRadius);
        if (distFromRing > waveWidth) continue;
        const bandFalloff = 1 - distFromRing / waveWidth;
        const lifeFalloff = 1 - age / waveLife;
        const force = bandFalloff * lifeFalloff * waveStrength;
        if (dist === 0 || force <= 0) continue;
        const angle = Math.atan2(dy, dx);
        totalX += Math.cos(angle) * force;
        totalY += Math.sin(angle) * force;
      }
      return { x: totalX, y: totalY };
    };

    const distort = (x: number, y: number, now: number) => {
      const h = hoverDistort(x, y);
      const w = waveDistort(x, y, now);
      return { x: x + h.x + w.x, y: y + h.y + w.y };
    };

    const drawLine = (points: { x: number; y: number }[], now: number) => {
      ctx.beginPath();
      points.forEach((p, i) => {
        const d = distort(p.x, p.y, now);
        i === 0 ? ctx.moveTo(d.x, d.y) : ctx.lineTo(d.x, d.y);
      });
      ctx.stroke();
    };

    const spawnLight = () => {
      const axis: "h" | "v" = Math.random() < 0.5 ? "h" : "v";
      const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      const speed = lightSpeedMin + Math.random() * (lightSpeedMax - lightSpeedMin);

      if (axis === "h") {
        const rows = Math.floor(canvas.height / spacing);
        const line = Math.floor(Math.random() * rows) * spacing;
        const pos = dir === 1 ? 0 : canvas.width;
        lightsRef.current.push({ axis, line, pos, dir, speed, trail: [] });
      } else {
        const cols = Math.floor(canvas.width / spacing);
        const line = Math.floor(Math.random() * cols) * spacing;
        const pos = dir === 1 ? 0 : canvas.height;
        lightsRef.current.push({ axis, line, pos, dir, speed, trail: [] });
      }
    };

    const updateLights = (dt: number, now: number) => {
      if (
        now - lastSpawnRef.current > lightSpawnInterval &&
        lightsRef.current.length < maxLights
      ) {
        spawnLight();
        lastSpawnRef.current = now;
      }

      lightsRef.current = lightsRef.current.filter((light) => {
        light.pos += light.dir * light.speed * dt;

        const rawX = light.axis === "h" ? light.pos : light.line;
        const rawY = light.axis === "h" ? light.line : light.pos;

        light.trail.unshift({ x: rawX, y: rawY });
        if (light.trail.length > trailLength) light.trail.pop();

        const outOfBounds =
          light.pos < -50 || light.pos > (light.axis === "h" ? canvas.width : canvas.height) + 50;

        return !outOfBounds;
      });
    };

    const drawLights = (now: number) => {
      for (const light of lightsRef.current) {
        // trail: fading, shrinking dots along recent positions
        for (let i = light.trail.length - 1; i >= 0; i--) {
          const t = light.trail[i];
          const d = distort(t.x, t.y, now);
          const alpha = (1 - i / trailLength) * 0.5;
          const r = 2 + (1 - i / trailLength) * 3;

          ctx.beginPath();
          ctx.fillStyle = `rgba(140, 200, 255, ${alpha})`;
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // glow head
        const rawX = light.axis === "h" ? light.pos : light.line;
        const rawY = light.axis === "h" ? light.line : light.pos;
        const d = distort(rawX, rawY, now);

        const gradient = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, glowRadius);
        gradient.addColorStop(0, "rgba(200, 230, 255, 0.9)");
        gradient.addColorStop(0.4, "rgba(140, 200, 255, 0.4)");
        gradient.addColorStop(1, "rgba(140, 200, 255, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(d.x, d.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      wavesRef.current = wavesRef.current.filter(
        (w) => now - w.startTime < waveLife
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;

      const step = 2;

      for (let x = 0; x <= canvas.width; x += spacing) {
        const points = [];
        for (let y = 0; y <= canvas.height; y += step) points.push({ x, y });
        drawLine(points, now);
      }
      for (let y = 0; y <= canvas.height; y += spacing) {
        const points = [];
        for (let x = 0; x <= canvas.width; x += step) points.push({ x, y });
        drawLine(points, now);
      }

      updateLights(dt, now);

      ctx.globalCompositeOperation = "lighter";
      drawLights(now);
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}