"use client";

import { useEffect, useState } from "react";

export function CinematicOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden"
    >
      {/* 1. Fine CRT Scanline Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.4) 3px, transparent 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* 2. Micro SVG Noise Grain Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-overlay">
        <filter id="cinematic-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
      </svg>

      {/* 3. Dimensional Edge Vignette & Chromatic Border */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(7,6,13,0.95)]" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#07060D]/80" />

      {/* 4. Top and Bottom Ambient Light Leak */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-system-accent/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-system-accent/20 to-transparent" />
    </div>
  );
}
