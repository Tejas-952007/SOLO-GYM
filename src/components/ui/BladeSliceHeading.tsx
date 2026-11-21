"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface BladeSliceHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  accentText?: string;
}

export function BladeSliceHeading({
  children,
  className = "",
  as: Component = "h2",
  accentText,
}: BladeSliceHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const glint = glintRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });

      tl.fromTo(
        el,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0, x: -30 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      if (glint) {
        tl.fromTo(
          glint,
          { left: "-30%", opacity: 0 },
          { left: "130%", opacity: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.6"
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block overflow-hidden will-change-transform">
      <Component className={className}>
        {children}
        {accentText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-system-cyan via-white to-purple-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.7)] ml-2">
            {accentText}
          </span>
        )}
      </Component>

      {/* Laser Blade Slash Glint */}
      <span
        ref={glintRef}
        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent skew-x-[-25deg] pointer-events-none opacity-0"
      />
    </div>
  );
}
