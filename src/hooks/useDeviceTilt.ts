'use client';

import { useState, useEffect } from 'react';

interface DeviceTilt {
  tiltX: number; // Beta (-180 to 180) -> normalized
  tiltY: number; // Gamma (-90 to 90) -> normalized
  isSupported: boolean;
}

export function useDeviceTilt(): DeviceTilt {
  const [tilt, setTilt] = useState<DeviceTilt>({ tiltX: 0, tiltY: 0, isSupported: false });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) {
      return;
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // Clamp and normalize tilt
        const normalizedBeta = Math.max(-30, Math.min(30, e.beta - 45)) / 30; // Front/Back tilt
        const normalizedGamma = Math.max(-30, Math.min(30, e.gamma)) / 30; // Left/Right tilt

        setTilt({
          tiltX: normalizedBeta,
          tiltY: normalizedGamma,
          isSupported: true,
        });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return tilt;
}
