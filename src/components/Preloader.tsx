"use client";

import { useEffect, useState } from "react";
import { MOTION_CONFIG } from "@/config/motion";

export function Preloader({ onLoaded }: { onLoaded?: () => void }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const total = MOTION_CONFIG.preloader.criticalImages.length;

  useEffect(() => {
    let active = true;
    let loaded = 0;

    MOTION_CONFIG.preloader.criticalImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      const onLoadOrError = () => {
        if (!active) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= total && onLoaded) {
          onLoaded();
        }
      };
      img.onload = onLoadOrError;
      img.onerror = onLoadOrError;
    });

    return () => {
      active = false;
    };
  }, [total, onLoaded]);

  return (
    <div className="sr-only" aria-hidden="true">
      Preloaded {loadedCount}/{total} assets
    </div>
  );
}

