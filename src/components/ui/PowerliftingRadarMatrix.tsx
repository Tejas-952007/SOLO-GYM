'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { sfx } from '@/lib/audio-sfx';
import { Dumbbell, Trophy, ShieldAlert, Zap } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export function PowerliftingRadarMatrix() {
  const [squat, setSquat] = useState(140);
  const [bench, setBench] = useState(100);
  const [deadlift, setDeadlift] = useState(180);
  const [ohp, setOhp] = useState(65);

  const total = squat + bench + deadlift;

  const rankData = useMemo(() => {
    if (total >= 650) return { rank: 'S-RANK', title: 'SHADOW MONARCH', color: 'text-amber-400 border-amber-500/50 bg-amber-950/20', dots: '520+ DOTS' };
    if (total >= 540) return { rank: 'A-RANK', title: 'NATIONAL VANGUARD', color: 'text-purple-400 border-purple-500/50 bg-purple-950/20', dots: '440-519 DOTS' };
    if (total >= 430) return { rank: 'B-RANK', title: 'DUNGEON JUGGERNAUT', color: 'text-blue-400 border-blue-500/50 bg-blue-950/20', dots: '360-439 DOTS' };
    if (total >= 320) return { rank: 'C-RANK', title: 'AWAKENED STRIKER', color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/20', dots: '280-359 DOTS' };
    if (total >= 220) return { rank: 'D-RANK', title: 'IRON INITIATE', color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/20', dots: '200-279 DOTS' };
    return { rank: 'E-RANK', title: 'WEAKEST HUNTER', color: 'text-gray-400 border-gray-600/50 bg-gray-900/20', dots: '<200 DOTS' };
  }, [total]);

  // Compute 5 polygon vertices for SVG Radar Chart (Center: 100, 100, Radius: 70)
  // Axes: 0: Squat (Top), 1: Bench (Top-Right), 2: Deadlift (Bottom-Right), 3: OHP (Bottom-Left), 4: Core/Willpower (Top-Left)
  const polygonPoints = useMemo(() => {
    const cx = 100;
    const cy = 100;
    const maxRadius = 70;

    // Normalization factors
    const sRatio = Math.min(1, squat / 220);
    const bRatio = Math.min(1, bench / 160);
    const dRatio = Math.min(1, deadlift / 260);
    const oRatio = Math.min(1, ohp / 100);
    const wRatio = Math.min(1, total / 640); // Willpower / System Mastery

    const ratios = [sRatio, bRatio, dRatio, oRatio, wRatio];
    const points = ratios.map((r, i) => {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const radius = Math.max(15, r * maxRadius);
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return points.join(' ');
  }, [squat, bench, deadlift, ohp, total]);

  const handleSliderChange = (setter: (v: number) => void, val: number, name: string) => {
    sfx.playHover();
    setter(val);
  };

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              TELEMETRY // 1RM RADAR MATRIX
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Real-time Wilks / DOTS Compound Projection against National Powerlifting Standards
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 ${rankData.color}`}>
          <Trophy className="w-4 h-4" />
          <span>{rankData.rank}: {rankData.title}</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Area (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Squat */}
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-cyan-400 font-bold">1RM BARBELL SQUAT</span>
              <span className="font-bold text-white">{squat} KG ({(squat * 2.20462).toFixed(0)} LBS)</span>
            </div>
            <input
              type="range"
              min="40"
              max="240"
              step="2.5"
              value={squat}
              onChange={(e) => handleSliderChange(setSquat, Number(e.target.value), 'Squat')}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Bench */}
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-purple-400 font-bold">1RM BENCH PRESS</span>
              <span className="font-bold text-white">{bench} KG ({(bench * 2.20462).toFixed(0)} LBS)</span>
            </div>
            <input
              type="range"
              min="30"
              max="180"
              step="2.5"
              value={bench}
              onChange={(e) => handleSliderChange(setBench, Number(e.target.value), 'Bench')}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          {/* Deadlift */}
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-amber-400 font-bold">1RM CONVENTIONAL DEADLIFT</span>
              <span className="font-bold text-white">{deadlift} KG ({(deadlift * 2.20462).toFixed(0)} LBS)</span>
            </div>
            <input
              type="range"
              min="50"
              max="280"
              step="2.5"
              value={deadlift}
              onChange={(e) => handleSliderChange(setDeadlift, Number(e.target.value), 'Deadlift')}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* OHP */}
          <div>
            <div className="flex justify-between font-mono text-xs text-gray-300 mb-1">
              <span className="text-emerald-400 font-bold">1RM STANDING OVERHEAD PRESS</span>
              <span className="font-bold text-white">{ohp} KG ({(ohp * 2.20462).toFixed(0)} LBS)</span>
            </div>
            <input
              type="range"
              min="20"
              max="110"
              step="2.5"
              value={ohp}
              onChange={(e) => handleSliderChange(setOhp, Number(e.target.value), 'OHP')}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Total & Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3">
            <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono">
              <div className="text-[10px] text-gray-400 uppercase">BIG 3 TOTAL</div>
              <div className="text-lg font-bold text-white mt-0.5">{total} KG</div>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono">
              <div className="text-[10px] text-gray-400 uppercase">DOTS RATING</div>
              <div className="text-lg font-bold text-cyan-300 mt-0.5">{rankData.dots}</div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-black/60 border border-white/10 font-mono flex items-center justify-between">
              <div>
                <div className="text-[10px] text-gray-400 uppercase">SYSTEM XP</div>
                <div className="text-lg font-bold text-amber-400 mt-0.5">+{total * 5} XP</div>
              </div>
              <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Radar Spider Chart Canvas (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              {/* Concentric Web Pentagons */}
              {[0.25, 0.5, 0.75, 1.0].map((scale) => {
                const r = 70 * scale;
                const pts = [0, 1, 2, 3, 4].map((i) => {
                  const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                  return `${(100 + r * Math.cos(angle)).toFixed(1)},${(100 + r * Math.sin(angle)).toFixed(1)}`;
                }).join(' ');
                return (
                  <polygon
                    key={scale}
                    points={pts}
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="0.75"
                    strokeOpacity={0.25}
                  />
                );
              })}

              {/* Axis lines */}
              {[0, 1, 2, 3, 4].map((i) => {
                const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={(100 + 70 * Math.cos(angle)).toFixed(1)}
                    y2={(100 + 70 * Math.sin(angle)).toFixed(1)}
                    stroke="#00f0ff"
                    strokeWidth="0.75"
                    strokeOpacity={0.25}
                  />
                );
              })}

              {/* Dynamic Filled Polygon */}
              <polygon
                points={polygonPoints}
                fill="url(#radarGradient)"
                stroke="#00f0ff"
                strokeWidth="2"
                className="transition-all duration-300"
              />

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Axis Text Labels */}
              <text x="100" y="20" fill="#00f0ff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">SQUAT</text>
              <text x="180" y="75" fill="#c084fc" fontSize="8" fontWeight="bold" textAnchor="start" fontFamily="monospace">BENCH</text>
              <text x="160" y="185" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">DEADLIFT</text>
              <text x="40" y="185" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">OHP</text>
              <text x="15" y="75" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="monospace">WILLPOWER</text>
            </svg>
          </div>
          <span className="font-mono text-[10px] text-gray-500 uppercase mt-2">
            POLYMETRIC RADAR TELEMETRY MATRIX
          </span>
        </div>
      </div>
    </div>
  );
}
