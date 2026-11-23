'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sfx } from '@/lib/audio-sfx';
import { Crown, Sparkles, RotateCw, Shield, Swords, Zap, Eye, Flame } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export interface HunterCharacter {
  id: 'jinwoo' | 'igris' | 'beru' | 'iron';
  name: string;
  title: string;
  koreanName: string;
  rank: 'SHADOW MONARCH' | 'COMMANDER' | 'MARSHAL' | 'VANGUARD';
  auraColor: number;
  armorColor: number;
  eyeColor: number;
  quote: string;
  buff: string;
  statStr: number;
  statAgi: number;
  statVit: number;
}

const CHARACTERS: HunterCharacter[] = [
  {
    id: 'jinwoo',
    name: 'SUNG JIN-WOO',
    title: 'THE SHADOW MONARCH',
    koreanName: '성진우 // 그림자 군주',
    rank: 'SHADOW MONARCH',
    auraColor: 0x8b5cf6,
    armorColor: 0x090915,
    eyeColor: 0x38bdf8,
    quote: '"I am the hunter who conquered death itself. Arise."',
    buff: '+50% COMPOUND 1RM // MAXIMUM AMINO RETENTION',
    statStr: 99,
    statAgi: 99,
    statVit: 98,
  },
  {
    id: 'igris',
    name: 'COMMANDER IGRIS',
    title: 'THE RED BLOOD KNIGHT',
    koreanName: '핏빛의 기사단장 이그리트',
    rank: 'COMMANDER',
    auraColor: 0xef4444,
    armorColor: 0x1e1b2e,
    eyeColor: 0xef4444,
    quote: '"My blade exists solely to cleave your enemies."',
    buff: '+35% BARBELL SQUAT INTENSITY // ZERO PLATEAU',
    statStr: 94,
    statAgi: 88,
    statVit: 92,
  },
  {
    id: 'beru',
    name: 'MARSHAL BERU',
    title: 'THE PREDATOR KING',
    koreanName: '포식자 군단장 베르',
    rank: 'MARSHAL',
    auraColor: 0xa855f7,
    armorColor: 0x140f28,
    eyeColor: 0xe879f9,
    quote: '"My king, permit me to feast upon your weakness."',
    buff: '+45g RAPID LEUCINE METABOLISM // REPAIR BURST',
    statStr: 91,
    statAgi: 98,
    statVit: 89,
  },
  {
    id: 'iron',
    name: 'VANGUARD IRON',
    title: 'THE FORTRESS TITAN',
    koreanName: '철벽의 거인 아이언',
    rank: 'VANGUARD',
    auraColor: 0xf59e0b,
    armorColor: 0x1c1917,
    eyeColor: 0xf59e0b,
    quote: '"A shield that never shatters under 200kg load."',
    buff: '+40% SPINAL INTEGRITY & CNS TANK PROTECTION',
    statStr: 97,
    statAgi: 72,
    statVit: 99,
  },
];

export function ThreeCharacterShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeChar, setActiveChar] = useState<HunterCharacter>(CHARACTERS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isPoweringUp, setIsPoweringUp] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const auraParticlesRef = useRef<THREE.Points | null>(null);
  const eyeLightRef = useRef<THREE.PointLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Cinematic Minimalist Lighting
    const ambientLight = new THREE.AmbientLight(0x0f0f1c, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(activeChar.auraColor, 5.0);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const eyeLight = new THREE.PointLight(activeChar.eyeColor, 3.5, 3);
    eyeLight.position.set(0, 1.9, 0.4);
    scene.add(eyeLight);
    eyeLightRef.current = eyeLight;

    // Pedestal Ground Ring
    const ringGeo = new THREE.RingGeometry(0.8, 1.2, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: activeChar.auraColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const pedestalRing = new THREE.Mesh(ringGeo, ringMat);
    pedestalRing.position.y = -1.2;
    scene.add(pedestalRing);

    // 3. Procedural Stylized 3D Character Model
    const charGroup = new THREE.Group();
    characterGroupRef.current = charGroup;
    scene.add(charGroup);

    // Character Base Material (Deep Obsidian Armor)
    const armorMat = new THREE.MeshStandardMaterial({
      color: activeChar.armorColor,
      metalness: 0.8,
      roughness: 0.25,
    });

    const glowAccentMat = new THREE.MeshBasicMaterial({
      color: activeChar.eyeColor,
    });

    // Torso / Athletic Chest V-Taper
    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.26, 0.95, 8);
    const torso = new THREE.Mesh(torsoGeo, armorMat);
    torso.position.y = 0.55;
    charGroup.add(torso);

    // Shoulders / Pauldrons
    const lPauldron = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.35, 6), armorMat);
    lPauldron.position.set(-0.46, 0.95, 0);
    lPauldron.rotation.z = Math.PI / 3;
    charGroup.add(lPauldron);

    const rPauldron = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.35, 6), armorMat);
    rPauldron.position.set(0.46, 0.95, 0);
    rPauldron.rotation.z = -Math.PI / 3;
    charGroup.add(rPauldron);

    // Head / Face Mask / Helmet
    let headGeo: THREE.BufferGeometry = new THREE.DodecahedronGeometry(0.25, 1);
    if (activeChar.id === 'igris') {
      headGeo = new THREE.ConeGeometry(0.26, 0.55, 6);
    } else if (activeChar.id === 'beru') {
      headGeo = new THREE.OctahedronGeometry(0.28, 1);
    }
    const head = new THREE.Mesh(headGeo, armorMat);
    head.position.y = 1.35;
    charGroup.add(head);

    // Glowing Eyes Flare (Jin-Woo / Monarch signature)
    const lEye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), glowAccentMat);
    lEye.position.set(-0.09, 1.38, 0.24);
    charGroup.add(lEye);

    const rEye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), glowAccentMat);
    rEye.position.set(0.09, 1.38, 0.24);
    charGroup.add(rEye);

    // Character Specific Accessories:
    if (activeChar.id === 'jinwoo') {
      // Flowing Trenchcoat Tails
      const coatGeo = new THREE.PlaneGeometry(0.7, 1.5, 4, 8);
      const coatMat = new THREE.MeshStandardMaterial({
        color: 0x05050e,
        side: THREE.DoubleSide,
        roughness: 0.9,
      });
      const coat = new THREE.Mesh(coatGeo, coatMat);
      coat.position.set(0, -0.2, -0.22);
      coat.rotation.x = 0.15;
      charGroup.add(coat);

      // Dual Daggers in Hands
      const daggerMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.8,
      });
      const lDagger = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.65, 0.08), daggerMat);
      lDagger.position.set(-0.55, 0.35, 0.25);
      lDagger.rotation.x = Math.PI / 4;
      charGroup.add(lDagger);

      const rDagger = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.65, 0.08), daggerMat);
      rDagger.position.set(0.55, 0.35, 0.25);
      rDagger.rotation.x = -Math.PI / 4;
      charGroup.add(rDagger);
    } else if (activeChar.id === 'igris') {
      // Crimson Knight Plume
      const plumeGeo = new THREE.CylinderGeometry(0.05, 0.18, 0.9, 6);
      const plumeMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.7,
      });
      const plume = new THREE.Mesh(plumeGeo, plumeMat);
      plume.position.set(0, 1.8, -0.2);
      plume.rotation.x = -0.4;
      charGroup.add(plume);

      // Massive Greatsword Plunged Into Ground
      const swordMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        metalness: 0.95,
        roughness: 0.1,
      });
      const sword = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.2, 0.06), swordMat);
      sword.position.set(0, -0.1, 0.4);
      charGroup.add(sword);
    } else if (activeChar.id === 'beru') {
      // Insectoid Scythe Arms
      const scytheMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.8,
      });
      const lScythe = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.05, 6, 12, Math.PI), scytheMat);
      lScythe.position.set(-0.6, 0.6, 0.2);
      lScythe.rotation.z = Math.PI / 3;
      charGroup.add(lScythe);

      const rScythe = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.05, 6, 12, Math.PI), scytheMat);
      rScythe.position.set(0.6, 0.6, 0.2);
      rScythe.rotation.z = -Math.PI / 3;
      charGroup.add(rScythe);
    } else if (activeChar.id === 'iron') {
      // Giant Tower Fortress Shield
      const shieldMat = new THREE.MeshStandardMaterial({
        color: 0x44403c,
        metalness: 0.9,
      });
      const shield = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.12), shieldMat);
      shield.position.set(0, 0.2, 0.45);
      charGroup.add(shield);
    }

    // Legs / Greaves
    const lLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 1.1, 8), armorMat);
    lLeg.position.set(-0.2, -0.5, 0);
    charGroup.add(lLeg);

    const rLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 1.1, 8), armorMat);
    rLeg.position.set(0.2, -0.5, 0);
    charGroup.add(rLeg);

    // 4. Shadow Aura Particle Vortex System
    const particleCount = 450;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pVel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.3 + Math.random() * 1.4;
      const angle = Math.random() * Math.PI * 2;
      const y = -1.2 + Math.random() * 3.2;

      pPos[i * 3] = Math.cos(angle) * radius;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = Math.sin(angle) * radius;

      pVel[i * 3] = (Math.random() - 0.5) * 0.015;
      pVel[i * 3 + 1] = 0.012 + Math.random() * 0.025; // Drift upwards
      pVel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: activeChar.auraColor,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    auraParticlesRef.current = particles;
    scene.add(particles);

    // 5. Mouse/Touch Orbit Handling
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = cx;
      prevY = cy;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !characterGroupRef.current) return;
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const dx = cx - prevX;
      const dy = cy - prevY;

      characterGroupRef.current.rotation.y += dx * 0.015;
      characterGroupRef.current.rotation.x += dy * 0.01;

      prevX = cx;
      prevY = cy;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    dom.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 6. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Idle breathing torso motion
      if (characterGroupRef.current && isAutoRotating && !isDragging) {
        characterGroupRef.current.rotation.y += 0.008;
        characterGroupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.04;
      }

      // Swirling Shadow Aura Particles
      if (auraParticlesRef.current) {
        const pos = auraParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] += pVel[i * 3 + 1];
          pos[i * 3] += Math.sin(elapsed + i) * 0.002;
          pos[i * 3 + 2] += Math.cos(elapsed + i) * 0.002;

          if (pos[i * 3 + 1] > 2.2) {
            pos[i * 3 + 1] = -1.2;
          }
        }
        auraParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Eye flare pulsing
      if (eyeLightRef.current) {
        eyeLightRef.current.intensity = 2.5 + Math.sin(elapsed * 5) * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onPointerDown);
      dom.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      dom.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeChar, isAutoRotating]);

  const selectCharacter = (c: HunterCharacter) => {
    sfx.playBladeSlash();
    setActiveChar(c);
    spawnCombatNumber(`SHADOW AWAKENING: ${c.name}`, undefined, undefined, 'stat');
  };

  const triggerPowerUp = () => {
    if (isPoweringUp || !characterGroupRef.current) return;
    setIsPoweringUp(true);
    sfx.playDemonRoar();
    spawnCombatNumber('ARISE // DOMAIN EXPANDED', undefined, undefined, 'mana');

    const group = characterGroupRef.current;
    const startY = group.rotation.y;
    const startTime = performance.now();

    const doSpin = (now: number) => {
      const elapsed = (now - startTime) / 450;
      if (elapsed < 1) {
        group.rotation.y = startY + Math.PI * 4 * elapsed;
        requestAnimationFrame(doSpin);
      } else {
        group.rotation.y = startY;
        setIsPoweringUp(false);
      }
    };

    requestAnimationFrame(doSpin);
  };

  return (
    <div className="w-full rounded-2xl bg-[#05050A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] font-mono overflow-hidden">
      {/* Minimalist Top Header */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/20 via-black to-slate-950/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-system-cyan animate-pulse" />
            <span className="text-[10px] text-system-muted font-bold tracking-widest uppercase">
              3D SHADOW MONARCH & S-RANK ROSTER
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
              {activeChar.koreanName}
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-cinzel font-bold text-white tracking-wider uppercase">
            {activeChar.name}
          </h2>
        </div>

        {/* Minimal Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoRotating(prev => !prev)}
            onMouseEnter={() => sfx.playHover()}
            className={`px-3 py-1.5 rounded text-xs font-bold border transition-all flex items-center gap-1.5 ${
              isAutoRotating
                ? 'bg-purple-950/60 border-purple-400 text-purple-200'
                : 'bg-black/40 border-white/10 text-gray-400'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ORBIT</span>
          </button>

          <button
            onClick={triggerPowerUp}
            disabled={isPoweringUp}
            onMouseEnter={() => sfx.playHover()}
            className="px-4 py-1.5 rounded bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>ARISE [SUMMON AURA]</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* 3D Character Canvas */}
        <div className="lg:col-span-8 relative h-[360px] sm:h-[440px] md:h-[500px] bg-radial from-purple-950/15 via-black to-black flex items-center justify-center">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Minimal Drag Hint */}
          <div className="absolute bottom-4 left-4 text-[10px] text-system-muted flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-white/10 pointer-events-none">
            <Eye className="w-3 h-3 text-system-cyan" />
            <span>TOUCH / DRAG TO ROTATE 3D CHARACTER</span>
          </div>

          <div className="absolute top-4 right-4 text-[10px] text-yellow-300 font-bold bg-yellow-950/40 px-2.5 py-1 rounded border border-yellow-500/30">
            {activeChar.rank}
          </div>
        </div>

        {/* Character Selector & Essential Biometrics */}
        <div className="lg:col-span-4 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/40 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] text-system-muted font-bold tracking-wider uppercase block mb-2.5">
              SELECT COMMANDER / S-RANK:
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {CHARACTERS.map((c) => {
                const isSelected = c.id === activeChar.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => selectCharacter(c)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`p-3 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-950/50 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold leading-tight">{c.name}</div>
                      <div className="text-[9px] text-system-muted">{c.title}</div>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                      {c.rank.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimalist Stats & Bio Card */}
          <div className="space-y-3">
            <p className="text-xs text-gray-300 font-sans italic border-l border-purple-500/40 pl-3 py-1">
              {activeChar.quote}
            </p>

            <div className="p-3 rounded-lg bg-black/60 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">STRENGTH [STR]:</span>
                <span className="text-system-cyan font-bold">{activeChar.statStr} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statStr}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">VITALITY [VIT]:</span>
                <span className="text-purple-400 font-bold">{activeChar.statVit} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statVit}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">AGILITY [AGI]:</span>
                <span className="text-yellow-400 font-bold">{activeChar.statAgi} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statAgi}%` }}
                />
              </div>
            </div>

            <div className="p-2.5 rounded bg-purple-950/30 border border-purple-500/20 text-[10px] text-purple-200">
              <strong className="text-white">Active Army Buff:</strong> {activeChar.buff}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
