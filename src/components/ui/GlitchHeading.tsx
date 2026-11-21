"use client";

import { ReactNode } from "react";

interface GlitchHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "div";
}

export function GlitchHeading({
  children,
  className = "",
  as: Component = "h2",
}: GlitchHeadingProps) {
  return (
    <Component className={`relative inline-block group select-none ${className}`}>
      <span className="relative z-10 transition-transform duration-200 group-hover:-translate-x-0.5">
        {children}
      </span>
      {/* Cyan Shadow Offset */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-75 transition-opacity duration-150 transform translate-x-1 -translate-y-0.5 blur-[0.5px] pointer-events-none mix-blend-screen"
      >
        {children}
      </span>
      {/* Violet/Red Shadow Offset */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-fuchsia-500 opacity-0 group-hover:opacity-75 transition-opacity duration-150 transform -translate-x-1 translate-y-0.5 blur-[0.5px] pointer-events-none mix-blend-screen"
      >
        {children}
      </span>
    </Component>
  );
}
