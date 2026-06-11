"use client";

import React from "react";

import useMousePosition from "@/app/hooks/useMousePosition";

type MouseGlowProps = {
  
};

export default function MouseGlow() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 90%)`,
      }}
    />
  );
}
