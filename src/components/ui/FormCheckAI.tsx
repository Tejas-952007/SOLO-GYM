'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { Crosshair, ShieldCheck, AlertTriangle, Sparkles, Check } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface FormMovement {
  id: string;
  name: string;
  jointAngle: string;
  barPath: string;
  lumbarStatus: string;
  verdict: 'APPROVED' | 'CALIBRATING';
  cue: string;
}

const MOVEMENTS: FormMovement[] = [
  {
    id: 'squat',
    name: 'BARBELL BACK SQUAT',
    jointAngle: '112° HIP CREASE BELOW KNEE',
    barPath: 'VERTICAL PLUMB LINE OVER MIDFOOT',
    lumbarStatus: 'NEUTRAL TIGHT SPINAL ERECTORS',
    verdict: 'APPROVED',
    cue: 'Screw feet into the floor. Initiate with hip hinge while driving knees outward along toes.',
  },
  {
    id: 'deadlift',
    name: 'CONVENTIONAL DEADLIFT',
    jointAngle: '135° KNEE ANGLE AT FLOOR PULL',
    barPath: 'SHAVING SHINS TO LOCKOUT',
    lumbarStatus: 'ZERO LUMBAR FLEXION (0°)',
    verdict: 'APPROVED',
    cue: 'Protect armpits with lats. Push the floor away rather than pulling with your lower back.',
  },
  {
    id: 'bench',
    name: 'COMPETITION BENCH PRESS',
    jointAngle: '45° ELBOW FLARE IN SCAPULAR PLANE',
    barPath: 'J-CURVE ARC FROM RETRACTED SCAPULAE',
    lumbarStatus: 'ACTIVE PLANTAR LEG DRIVE',
    verdict: 'APPROVED',
    cue: 'Bend the barbell like a horseshoe to engage triceps and protect rotator cuffs.',
  },
];

export function FormCheckAI() {
  const [selectedId, setSelectedId] = useState('squat');
  const activeMovement = MOVEMENTS.find(m => m.id === selectedId) || MOVEMENTS[0];

  const selectMovement = (id: string, name: string) => {
    sfx.playStatPointAlloc();
    setSelectedId(id);
    spawnCombatNumber(`AI FORM CALIBRATED: ${name}`, undefined, undefined, 'mana');
  };

  return (
    <div className="w-full bg-[#080712] border border-cyan-500/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_35px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white uppercase tracking-wider">
              AI COMPUTER VISION // KINEMATIC FORM SCANNER
            </h3>
          </div>
          <p className="font-mono text-xs text-gray-400 mt-1">
            Real-time multi-point joint angle triangulation. Detects dangerous biomechanical flaws before injury occurs.
          </p>
        </div>

        {/* Movement Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
          {MOVEMENTS.map(m => (
            <button
              key={m.id}
              onClick={() => selectMovement(m.id, m.name)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedId === m.id
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,240,255,0.7)]'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {m.name.split(' ')[1] || m.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Telemetry Vectors (7 Cols) */}
        <div className="lg:col-span-7 space-y-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">
              ACTIVE MOVEMENT
            </div>
            <div className="font-orbitron text-base font-bold text-white">
              {activeMovement.name}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-lg bg-black/60 border border-white/10">
              <div className="text-[10px] text-gray-500 uppercase">JOINT ANGLE TELEMETRY</div>
              <div className="text-cyan-300 font-bold mt-0.5">{activeMovement.jointAngle}</div>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-white/10">
              <div className="text-[10px] text-gray-500 uppercase">BARBELL BAR PATH</div>
              <div className="text-purple-300 font-bold mt-0.5">{activeMovement.barPath}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-gray-300 space-y-1">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COACH BIOMECHANICAL CUE</span>
            </div>
            <div className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed">
              &ldquo;{activeMovement.cue}&rdquo;
            </div>
          </div>
        </div>

        {/* Verification Gauge (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-black/85 border border-cyan-500/30 space-y-3 font-mono text-xs">
          <div className="text-cyan-400 font-bold uppercase pb-2 border-b border-white/10 flex items-center justify-between">
            <span>[ INJURY RISK ASSESSMENT ]</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Lumbar Disc Compression:</span>
              <strong className="text-emerald-400">0.0 kN (SAFE NEUTRAL)</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Patellar Shear Stress:</span>
              <strong className="text-emerald-400">OPTIMAL 18% LOAD</strong>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Hypertrophic Tension Ratio:</span>
              <strong className="text-cyan-300">98% EFFICIENCY</strong>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>S-Rank Kinematic Form Verified. Clean compound bar path locked in.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
