'use client';

import React, { useEffect, useRef } from 'react';
import { sfx } from '@/lib/audio-sfx';

export function AudioVisualizerCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      phase += 0.08;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isMuted = sfx.getMuted();
      const numBars = 16;
      const barWidth = 3;
      const gap = 2;
      const totalWidth = numBars * (barWidth + gap);
      const startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < numBars; i++) {
        // Calculate dynamic height based on sound state & sine phase
        let h = 2;
        if (!isMuted) {
          const sine = Math.sin(phase + i * 0.45);
          const cosine = Math.cos(phase * 0.8 + i * 0.3);
          h = Math.max(3, Math.abs(sine * cosine) * (canvas.height - 4) + 2);
        }

        const x = startX + i * (barWidth + gap);
        const y = canvas.height - h;

        // Gradient color: Cyan to Violet
        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        grad.addColorStop(0, '#00f0ff');
        grad.addColorStop(1, '#8b5cf6');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, h);

        // Subtle top glow cap
        if (!isMuted && h > 8) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, y, barWidth, 1.5);
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={90}
      height={24}
      className={`rounded cursor-pointer ${className}`}
      title="Audio Frequency Visualizer (Click to Toggle Audio)"
      onClick={() => sfx.toggle()}
    />
  );
}
