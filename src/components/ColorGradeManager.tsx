"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MOTION_CONFIG } from "@/config/motion";

export function ColorGradeManager() {
  useEffect(() => {
    const root = document.documentElement;

    const setVars = (config: {
      accent: string;
      glow: string;
      bgTint: string;
      ambientLight: string;
    }) => {
      gsap.to(root, {
        duration: 0.8,
        ease: "power2.out",
        "--accent": config.accent,
        "--accent-glow": config.glow,
        "--bg-tint": config.bgTint,
        "--ambient-light": config.ambientLight,
        "--border-neon": `${config.accent}55`,
        "--border-neon-bright": `${config.accent}dd`,
      });
    };

    // Stage 1: Weak phase (Ch 1 - Ch 2)
    ScrollTrigger.create({
      trigger: "#chapter-1",
      start: "top center",
      endTrigger: "#chapter-2",
      end: "bottom center",
      onEnter: () => setVars(MOTION_CONFIG.colorTransitions.weak),
      onEnterBack: () => setVars(MOTION_CONFIG.colorTransitions.weak),
    });

    // Stage 2: Awakening phase (Ch 3 onwards)
    ScrollTrigger.create({
      trigger: "#chapter-3",
      start: "top center",
      endTrigger: "#chapter-3",
      end: "bottom center",
      onEnter: () => setVars(MOTION_CONFIG.colorTransitions.awakening),
      onEnterBack: () => setVars(MOTION_CONFIG.colorTransitions.awakening),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id?.startsWith("color-grade")) t.kill();
      });
    };
  }, []);

  return null;
}

