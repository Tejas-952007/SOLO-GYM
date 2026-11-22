'use client';

import React, { useState } from 'react';
import { sfx } from '@/lib/audio-sfx';
import { GitBranch, AlertTriangle, CheckCircle, ArrowRight, RefreshCw, Zap, ShieldAlert } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface DiagnosticStep {
  id: number;
  question: string;
  category: 'SLEEP' | 'NUTRITION' | 'VOLUME' | 'TECHNIQUE';
  explanation: string;
}

const QUESTIONS: DiagnosticStep[] = [
  {
    id: 1,
    question: 'Are you averaging 7.5+ hours of uninterrupted sleep per night?',
    category: 'SLEEP',
    explanation: 'Growth hormone and muscle protein synthesis peak during deep NREM sleep cycles.',
  },
  {
    id: 2,
    question: 'Are you consuming at least 1.6g protein per kg bodyweight daily?',
    category: 'NUTRITION',
    explanation: 'Without sufficient amino acid pool (leucine threshold), muscle myofibrillar repair halts.',
  },
  {
    id: 3,
    question: 'Have you attempted micro-loading with 1.25kg or 0.5kg fractional plates?',
    category: 'VOLUME',
    explanation: 'Jumping by 5kg every week fails the neurological law of progressive overload adaptation.',
  },
  {
    id: 4,
    question: 'Have you incorporated 2-3 second pause reps or tempo eccentrics to eliminate momentum?',
    category: 'TECHNIQUE',
    explanation: 'Bar path deceleration and tendon stretch reflex often disguise mechanical weak points.',
  },
];

export function PlateauBreakerFlowchart() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const handleAnswer = (id: number, val: boolean) => {
    sfx.playClick();
    setAnswers(prev => ({ ...prev, [id]: val }));
    if (!val) {
      sfx.playDungeonAlarm();
      spawnCombatNumber('BOTTLENECK IDENTIFIED', undefined, undefined, 'alert');
    } else {
      sfx.playItemPickup();
    }
  };

  const resetFlow = () => {
    sfx.playClick();
    setAnswers({ 1: null, 2: null, 3: null, 4: null });
  };

  // Determine prescription
  const hasNo = Object.entries(answers).find(([_, val]) => val === false);
  const allAnswered = Object.values(answers).every(v => v !== null);

  let prescription = {
    title: 'ALL BIOMECHANICAL GATES VALIDATED',
    desc: 'Your fundamentals are locked. Your body requires a programmed 1-week CNS Deload (-40% volume, maintaining 85% intensity) followed by a 5x3 cluster wave.',
    badge: 'DELOAD & WAVE CYCLE',
    color: 'emerald',
  };

  if (answers[1] === false) {
    prescription = {
      title: 'CRITICAL BOTTLENECK: HORMONAL SLEEP DEPRIVATION',
      desc: 'No amount of lifting intensity can compensate for suppressed testosterone and elevated cortisol. Enforce cold-room sleep and magnesium glycinate before increasing barbell weight.',
      badge: 'FIX CNS RECOVERY FIRST',
      color: 'red',
    };
  } else if (answers[2] === false) {
    prescription = {
      title: 'CRITICAL BOTTLENECK: CELLULAR AMINO ACID DEFICIT',
      desc: 'Your muscle fibers are in a catabolic nitrogen deficit. Inject 2 scoops of whey or 150g boiled soya chunks into your daily intake before next heavy session.',
      badge: 'SURPLUS +30g PROTEIN',
      color: 'amber',
    };
  } else if (answers[3] === false) {
    prescription = {
      title: 'TACTICAL ADJUSTMENT: IMPLEMENT FRACTIONAL MICRO-LOADING',
      desc: 'Acquire 0.5kg or 1.25kg magnetic plates. An addition of 1kg per week compounds to 52kg on your squat in a single year of training.',
      badge: 'BUY 1.25KG PLATES',
      color: 'cyan',
    };
  } else if (answers[4] === false) {
    prescription = {
      title: 'BIOMECHANICAL TACTIC: ECCENTRIC TEMPO & PAUSE REPS',
      desc: 'Drop load by 15% and enforce a 3-second negative and 2-second dead-stop at bottom of movement to build tendon stiffness and eliminate bounce.',
      badge: '3-0-2-0 TEMPO WAVE',
      color: 'purple',
    };
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-slate-950/80 border border-purple-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.15)] font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-purple-500/20 gap-2">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-400 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300">
              [ STRENGTH PLATEAU BREAKER & DELOAD ALGORITHM ]
            </h3>
            <p className="text-[11px] text-system-muted">
              Barbell stuck at the same weight for 2+ weeks? Diagnose the root cause systematically.
            </p>
          </div>
        </div>

        <button
          onClick={resetFlow}
          onMouseEnter={() => sfx.playHover()}
          className="px-2.5 py-1 rounded bg-black/60 border border-white/20 hover:border-purple-400 text-gray-300 text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Audit
        </button>
      </div>

      {/* Decision Tree Steps */}
      <div className="space-y-3">
        {QUESTIONS.map((q) => {
          const currentVal = answers[q.id];
          return (
            <div
              key={q.id}
              className={`p-3 rounded-lg border transition-all ${
                currentVal === false
                  ? 'bg-red-950/30 border-red-500/50'
                  : currentVal === true
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-black/40 border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 font-bold">
                      GATE 0{q.id} // {q.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-200">{q.question}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 ml-1">{q.explanation}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      currentVal === true
                        ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                        : 'bg-black/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/50'
                    }`}
                  >
                    YES
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      currentVal === false
                        ? 'bg-red-500 text-black shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                        : 'bg-black/60 border border-red-500/30 text-red-400 hover:bg-red-950/50'
                    }`}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prescription Result Box */}
      {(hasNo || allAnswered) && (
        <div className="mt-4 p-4 rounded-lg bg-black/80 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white uppercase">[ SYSTEM DIAGNOSTIC PRESCRIPTION ]</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500 text-black font-bold uppercase tracking-wider">
              {prescription.badge}
            </span>
          </div>

          <h4 className="text-xs font-bold text-purple-300 mb-1">{prescription.title}</h4>
          <p className="text-[11px] text-gray-300 leading-relaxed">{prescription.desc}</p>
        </div>
      )}
    </div>
  );
}
