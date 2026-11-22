"use client";

import React from "react";

interface LevelUpLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LevelUpLogo({ className = "", size = "md" }: LevelUpLogoProps) {
  const scale = size === "sm" ? 0.8 : size === "lg" ? 1.25 : 1;
  const height = Math.round(38 * scale);

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* 1. Official Glowing Star Icon Box */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-lg bg-[#070A14] border border-[#38BDF8]/80 shadow-[0_0_15px_rgba(56,189,248,0.45)] group-hover:shadow-[0_0_22px_rgba(56,189,248,0.8)] transition-all duration-300"
        style={{
          width: `${Math.round(36 * scale)}px`,
          height: `${Math.round(36 * scale)}px`,
        }}
      >
        <svg
          viewBox="0 0 32 32"
          className="w-5/6 h-5/6 text-[#38BDF8] filter drop-shadow-[0_0_6px_rgba(56,189,248,0.9)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main 4-point Diamond Star */}
          <path
            d="M 16 3 C 16.8 11.5 20.5 15.2 29 16 C 20.5 16.8 16.8 20.5 16 29 C 15.2 20.5 11.5 16.8 3 16 C 11.5 15.2 15.2 11.5 16 3 Z"
            fill="currentColor"
          />
          {/* Center High-Luminance White Core */}
          <path
            d="M 16 9 C 16.4 13.5 18.5 15.6 23 16 C 18.5 16.4 16.4 18.5 16 23 C 15.6 18.5 13.5 16.4 9 16 C 13.5 15.6 15.6 13.5 16 9 Z"
            fill="#FFFFFF"
          />
          {/* Satellite Sparkle 1 (Top-Right) */}
          <circle cx="26" cy="6" r="1.5" fill="#38BDF8" className="animate-ping" style={{ animationDuration: "2s" }} />
          {/* Satellite Sparkle 2 (Bottom-Left) */}
          <circle cx="7" cy="25" r="1.2" fill="#38BDF8" />
        </svg>
      </div>

      {/* 2. Vertical Divider with Top Notch */}
      <div className="flex flex-col items-center shrink-0" style={{ height: `${Math.round(30 * scale)}px` }}>
        <div className="w-1.5 h-0.5 bg-white/90 self-start" />
        <div className="w-[1.5px] flex-1 bg-white/80" />
      </div>

      {/* 3. High-Contrast Vector Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className="font-orbitron font-black text-white tracking-[0.14em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(139,92,246,0.8)] transition-all"
          style={{ fontSize: `${Math.round(17 * scale)}px` }}
        >
          LEVEL UP
        </span>
        <span
          className="font-mono font-bold text-[#38BDF8] tracking-[0.24em] uppercase mt-1"
          style={{ fontSize: `${Math.round(8.5 * scale)}px` }}
        >
          HUNTER RPG SYSTEM
        </span>
      </div>
    </div>
  );
}
