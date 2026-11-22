"use client";

import { useEffect, useRef, useState } from "react";

interface FloatingRune {
  id: number;
  char: string;
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

const RUNES = ["룬", "시스템", "각성", "군주", "일어나라", "그림자", "마나", "헌터", "EXP", "RANK-S"];

export function SpatialDungeonPerspective() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [runes, setRunes] = useState<FloatingRune[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate 18 floating 3D dungeon runes across the viewport
    const generated: FloatingRune[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      char: RUNES[i % RUNES.length],
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      z: -150 + Math.random() * 300,
      size: 14 + Math.random() * 22,
      opacity: 0.15 + Math.random() * 0.35,
      speed: 0.3 + Math.random() * 0.7,
      color: i % 3 === 0 ? "rgba(56, 189, 248, 0.7)" : i % 3 === 1 ? "rgba(139, 92, 246, 0.7)" : "rgba(245, 197, 66, 0.7)",
    }));
    setRunes(generated);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[4] overflow-hidden"
      style={{
        perspective: "1200px",
        perspectiveOrigin: `${50 + mousePos.x * 10}% ${50 + mousePos.y * 10}%`,
      }}
    >
      {/* 3D Parallax Deep Atmospheric Fog */}
      <div
        className="absolute inset-[-10%] transition-transform duration-700 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -25}px, -100px)`,
          background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Floating 3D Dimensional Runes */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${mousePos.x * 4}deg) rotateX(${-mousePos.y * 4}deg)`,
        }}
      >
        {runes.map((rune) => (
          <div
            key={rune.id}
            className="absolute font-mono select-none font-bold tracking-widest pointer-events-none transition-transform duration-300"
            style={{
              left: `${rune.x}%`,
              top: `${rune.y}%`,
              transform: `translate3d(${mousePos.x * rune.speed * 30}px, ${mousePos.y * rune.speed * 30}px, ${rune.z}px)`,
              fontSize: `${rune.size}px`,
              color: rune.color,
              opacity: rune.opacity,
              textShadow: `0 0 15px ${rune.color}`,
              filter: "blur(0.4px)",
            }}
          >
            {rune.char}
          </div>
        ))}
      </div>

      {/* Foreground Holographic Crosshairs & Horizon Reticles (+100px Z) */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, 60px)`,
        }}
      >
        {/* Subtle Edge Grid Lines */}
        <div className="absolute top-1/4 left-6 w-12 h-[1px] bg-system-cyan/30" />
        <div className="absolute top-1/4 left-6 w-[1px] h-12 bg-system-cyan/30" />
        <div className="absolute bottom-1/4 right-6 w-12 h-[1px] bg-system-gold/30" />
        <div className="absolute bottom-1/4 right-6 w-[1px] h-12 bg-system-gold/30" />
      </div>
    </div>
  );
}
