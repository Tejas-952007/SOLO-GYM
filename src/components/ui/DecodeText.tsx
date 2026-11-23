"use client";

import { useEffect, useState, useRef } from "react";

interface DecodeTextProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnView?: boolean;
  repeatOnHover?: boolean;
}

const GLYPHS = "█▓▒░#$*<>{}[]/\\_ΔΨΩЖ⚔⚡";

export function DecodeText({
  text,
  className = "",
  speed = 15,
  triggerOnView = true,
  repeatOnHover = true,
}: DecodeTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const startDecode = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += 1.5;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (!triggerOnView) {
      startDecode();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startDecode();
        }
      },
      { threshold: 0.2 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [text]);

  return (
    <span
      ref={elementRef}
      onMouseEnter={() => repeatOnHover && startDecode()}
      className={`inline-block cursor-default transition-colors duration-200 ${className}`}
    >
      {displayText}
    </span>
  );
}
