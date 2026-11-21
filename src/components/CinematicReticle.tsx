"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Crosshair } from "lucide-react";

export function CinematicReticle() {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Only show on desktop pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mouseX, mouseY, visible]);

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
      {/* Outer Reticle Ring */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-system-cyan/30 animate-spin-slow" />
        <div className="w-1.5 h-1.5 rounded-full bg-system-cyan shadow-[0_0_8px_#38bdf8]" />
        <Crosshair className="w-6 h-6 text-system-cyan/40 stroke-[1.5]" />

        {/* Live HUD Coordinates Badge */}
        <div className="absolute left-7 top-7 whitespace-nowrap bg-black/80 border border-system-cyan/30 px-2 py-0.5 rounded text-[9px] font-mono text-system-cyan backdrop-blur-sm space-y-0.5">
          <div className="flex gap-2">
            <span>X:{coords.x}</span>
            <span>Y:{coords.y}</span>
          </div>
          <div className="text-[8px] text-system-muted tracking-wider">
            [ HUNTER SENSOR ]
          </div>
        </div>
      </div>
    </motion.div>
  );
}
