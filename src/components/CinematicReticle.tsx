"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Crosshair, Lock } from "lucide-react";
import { sfx } from "@/lib/audio-sfx";

export function CinematicReticle() {
  const [visible, setVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    // Only show on desktop mouse pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      if (!visible) setVisible(true);

      // Check if target is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("button, a, input, [role='button'], .cursor-pointer");
        if (interactive && !isLocked) {
          setIsLocked(true);
        } else if (!interactive && isLocked) {
          setIsLocked(false);
        }
      }
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mouseX, mouseY, visible, isLocked]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50 select-none hidden lg:block"
      style={{
        left: springX,
        top: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Runic Ring */}
        <motion.div
          animate={{
            scale: isLocked ? 1.4 : 1,
            rotate: isLocked ? 90 : 360,
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.2 },
          }}
          className={`w-14 h-14 rounded-full border transition-colors duration-200 ${
            isLocked
              ? "border-yellow-400/80 shadow-[0_0_20px_rgba(245,197,66,0.8)]"
              : "border-system-cyan/35"
          }`}
        >
          {/* 4 Cardinal Tick Marks */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-system-cyan" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-0.5 bg-system-cyan" />
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-system-cyan" />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-system-cyan" />
        </motion.div>

        {/* Center Target Dot or Lock Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isLocked ? (
            <Lock className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-system-cyan shadow-[0_0_10px_#38bdf8]" />
              <Crosshair className="w-5 h-5 text-system-cyan/30 stroke-[1.5]" />
            </>
          )}
        </div>

        {/* Live HUD Coordinate & Lock Tag */}
        <div
          className={`absolute left-8 top-8 whitespace-nowrap px-2.5 py-1 rounded text-[9px] font-mono backdrop-blur-md space-y-0.5 border transition-all duration-200 ${
            isLocked
              ? "bg-black/90 border-yellow-500/60 text-yellow-400 shadow-[0_0_15px_rgba(245,197,66,0.4)]"
              : "bg-black/80 border-system-cyan/30 text-system-cyan"
          }`}
        >
          <div className="flex gap-2">
            <span>X:{coords.x}</span>
            <span>Y:{coords.y}</span>
          </div>
          <div className="text-[8px] font-bold tracking-wider">
            {isLocked ? "[ TARGET LOCKED ]" : "[ HUNTER SENSOR: ACTIVE ]"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
