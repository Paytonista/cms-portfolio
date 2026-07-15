"use client";

import { useEffect, useRef } from "react";

interface Wave {
  x: number;
  y: number;
  startTime: number;
  kind: "click" | "move";
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
  const lastMoveWaveRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const spacing = 60;
    const radius = 350;
    const strength = 50;

    // click wave tuning
    const waveSpeed = 500;      // px per second the ring expands
    const waveLife = 1500;      // ms before a wave fully fades
    const waveWidth = 120;      // thickness of the ripple band
    const waveStrength = 60;    // max push from a wave

    // mouse-move wave tuning (lighter, quicker, more frequent)
    const moveWaveSpeed = 400;
    const moveWaveLife = 800;
    const moveWaveWidth = 70;
    const moveWaveStrength = 22;
    const moveWaveInterval = 70; // ms between spawns while moving

    //light tuning
    const maxLights = 10;
    const minLightSpeed = 250;
    const maxLightSpeed = 300;
    const lightSpawnInterval = 1000;

    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      if (now - lastMoveWaveRef.current > moveWaveInterval) {
        lastMoveWaveRef.current = now;
        wavesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          startTime: now,
          kind: "move",
        });
      }
    };
    window.addEventListener("pointermove", handleMove);

    const handleClick = (e: PointerEvent) => {
      wavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
        kind: "click",
      });
    };
    window.addEventListener("pointerdown", handleClick);

    //spawn light

    const spawnLight = () => {
      const axis: "h" | "v" = Math.random() < 0.5 ? "h" : "v";
      const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      const speed = minLightSpeed + Math.random() * (maxLightSpeed - minLightSpeed);


    }

    // hover push
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

    // click ripple + move ripple push
    const waveDistort = (x: number, y: number, now: number) => {
      let totalX = 0;
      let totalY = 0;

      for (const wave of wavesRef.current) {
        const isMove = wave.kind === "move";
        const life = isMove ? moveWaveLife : waveLife;
        const speed = isMove ? moveWaveSpeed : waveSpeed;
        const width = isMove ? moveWaveWidth : waveWidth;
        const strengthForKind = isMove ? moveWaveStrength : waveStrength;

        const age = now - wave.startTime;
        if (age < 0 || age > life) continue;

        const dx = x - wave.x;
        const dy = y - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const ringRadius = (age / 1000) * speed;
        const distFromRing = Math.abs(dist - ringRadius);
        if (distFromRing > width) continue;

        // band falloff: strongest right at the ring, fading over the width
        const bandFalloff = 1 - distFromRing / width;
        // life falloff: ring weakens as it ages
        const lifeFalloff = 1 - age / life;

        const force = bandFalloff * lifeFalloff * strengthForKind;
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

    const render = (now: number) => {
      // drop dead waves (each kind has its own lifespan)
      wavesRef.current = wavesRef.current.filter((w) => {
        const life = w.kind === "move" ? moveWaveLife : waveLife;
        return now - w.startTime < life;
      });

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