"use client";

import { useState, useEffect } from "react";

export interface FloatingItem {
  id: string;
  text: string;
  x: number;
  y: number;
  type: "xp" | "damage" | "stat" | "mana" | "alert";
}

let emitter: ((item: Omit<FloatingItem, "id">) => void) | null = null;

export function spawnCombatNumber(
  text: string,
  x?: number,
  y?: number,
  type: "xp" | "damage" | "stat" | "mana" | "alert" = "xp"
) {
  if (emitter && typeof window !== "undefined") {
    const finalX = x !== undefined ? x : window.innerWidth / 2 + (Math.random() - 0.5) * 160;
    const finalY = y !== undefined ? y : window.innerHeight / 2 + (Math.random() - 0.5) * 120;
    emitter({ text, x: finalX, y: finalY, type });
  }
}

export function FloatingDamageNumbers() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    emitter = (newItem) => {
      const id = `${Date.now()}-${Math.random()}`;
      setItems((prev) => [...prev.slice(-15), { ...newItem, id }]);

      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, 1200);
    };

    return () => {
      emitter = null;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[48] overflow-hidden">
      {items.map((item) => {
        const typeClasses = {
          xp: "text-system-cyan shadow-[0_0_15px_rgba(56,189,248,0.8)] border-system-cyan/50",
          damage: "text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.9)] border-red-500/50 scale-110",
          stat: "text-yellow-400 shadow-[0_0_15px_rgba(245,197,66,0.8)] border-yellow-500/50",
          mana: "text-purple-300 shadow-[0_0_15px_rgba(167,139,250,0.8)] border-purple-400/50",
          alert: "text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.9)] border-rose-500/60",
        }[item.type];

        return (
          <div
            key={item.id}
            style={{ left: item.x, top: item.y }}
            className={`absolute font-orbitron font-black text-sm sm:text-base tracking-widest px-2.5 py-0.5 rounded bg-black/85 border backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 animate-float-damage select-none ${typeClasses}`}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
}
