"use client";

import React, { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  scrambleOnHover?: boolean;
}

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function GlitchText({
  text,
  className = "",
  as: Component = "span",
  scrambleOnHover = true,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleMouseEnter = () => {
    if (!scrambleOnHover || isGlitching) return;
    setIsGlitching(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (char === " " || char === ".") return char;
            if (index < iteration) return text[index];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 30);
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block select-none transition-all duration-150 ${className} ${
        isGlitching ? "glitch-active" : ""
      }`}
      style={{
        textShadow: isGlitching
          ? "2px 0 #ef4444, -2px 0 #38bdf8, 0 0 12px var(--accent-glow)"
          : undefined,
      }}
    >
      {displayText}
    </Component>
  );
}

