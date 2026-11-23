'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sfx } from '@/lib/audio-sfx';
import { Swords, Sparkles, RotateCw, Shield, Zap, Eye, Trophy } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

interface DaggerPreset {
  id: string;
  name: string;
  koreanName: string;
  rank: 'S-RANK' | 'A-RANK' | 'B-RANK';
  attack: string;
  effect: string;
  description: string;
  bladeColor: number;
  glowColor: number;
  rimColor: number;
  particleColor: string;
  bladeScale: [number, number, number];
}

const WEAPONS: DaggerPreset[] = [
  {
    id: 'casaka',
    name: "CASAKA'S POISON FANG",
    koreanName: '카사카의 독니',
    rank: 'A-RANK',
    attack: '+135 ATK // +25kg 1RM BUFF',
    effect: 'PARALYSIS // 35% SLOW ON SQUAT RECOVERY',
    description: 'Forged from the translucent blue venomous bone of the Blue Venom-Fanged Casaka. Emits a chilling bio-luminescent mist.',
    bladeColor: 0x0ea5e9,
    glowColor: 0x38bdf8,
    rimColor: 0x8b5cf6,
    particleColor: '#38bdf8',
    bladeScale: [1, 1.1, 1],
  },
  {
    id: 'knight-killer',
    name: 'KNIGHT KILLER',
    koreanName: '나이트 킬러',
    rank: 'B-RANK',
    attack: '+75 ATK // +15kg BENCH DRIVE',
    effect: '+25% DAMAGE AGAINST HEAVILY ARMORED BOSSES',
    description: 'Jagged serrated steel blade designed specifically to puncture knight plate armor in Cartenon dungeons.',
    bladeColor: 0x64748b,
    glowColor: 0xef4444,
    rimColor: 0xf59e0b,
    particleColor: '#ef4444',
    bladeScale: [1.1, 1.2, 1],
  },
  {
    id: 'demon-king',
    name: "DEMON KING'S BARUKA DAGGER",
    koreanName: '바루카의 단검',
    rank: 'S-RANK',
    attack: '+220 ATK // +40kg DEADLIFT OVERLOAD',
    effect: 'WIND WHIRLWIND // +15 AGI SPEED CADENCE',
    description: 'Ice-cold ceremonial dagger left behind by Lord Baruka of the White Walkers. Slashes leave freezing razor rifts in the air.',
    bladeColor: 0xa855f7,
    glowColor: 0xc084fc,
    rimColor: 0x06b6d4,
    particleColor: '#a855f7',
    bladeScale: [0.95, 1.35, 0.95],
  },
  {
    id: 'monarch-wrath',
    name: "KAMISH'S WRATH (MONARCH VOID)",
    koreanName: '카미쉬의 분노',
    rank: 'S-RANK',
    attack: '+380 ATK // MAXIMUM HYPERTROPHY',
    effect: 'SHADOW MONARCH DECAY // UNLIMITED RECOVERY',
    description: 'Short blade carved from the supreme dragon Kamish. Radiates absolute darkness and sovereign purple mana flames.',
    bladeColor: 0x1e1b4b,
    glowColor: 0x7c3aed,
    rimColor: 0xec4899,
    particleColor: '#9333ea',
    bladeScale: [1.2, 1.4, 1.1],
  },
];

export function ThreeDaggerArmory() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeWeapon, setActiveWeapon] = useState<DaggerPreset>(WEAPONS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isSlashing, setIsSlashing] = useState(false);

  // Three.js object references for dynamic updating
  const sceneRef = useRef<THREE.Scene | null>(null);
  const daggerGroupRef = useRef<THREE.Group | null>(null);
  const bladeMeshRef = useRef<THREE.Mesh | null>(null);
  const fullerLightRef = useRef<THREE.PointLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);

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

    // 2. Solo Leveling Lighting (Monarch Purple Rim + Blue Key)
    const ambientLight = new THREE.AmbientLight(0x181828, 1.8);
    scene.add(ambientLight);

    const purpleRimLight = new THREE.DirectionalLight(activeWeapon.rimColor, 4.0);
    purpleRimLight.position.set(-3, 3.5, -2);
    scene.add(purpleRimLight);
    rimLightRef.current = purpleRimLight;

    const blueKeyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    blueKeyLight.position.set(3, 2, 3);
    scene.add(blueKeyLight);

    const fullerLight = new THREE.PointLight(activeWeapon.glowColor, 3, 5);
    fullerLight.position.set(0, 0.3, 0.2);
    scene.add(fullerLight);
    fullerLightRef.current = fullerLight;

    // 3. Procedural 3D Dagger Construction
    const daggerGroup = new THREE.Group();
    daggerGroupRef.current = daggerGroup;
    scene.add(daggerGroup);

    // Dagger Blade Shape
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, -0.2);
    bladeShape.lineTo(0.22, 0.1);
    bladeShape.lineTo(0.18, 1.4);
    bladeShape.quadraticCurveTo(0.25, 1.9, 0, 2.3); // Curved organic piercing tip
    bladeShape.quadraticCurveTo(-0.15, 1.8, -0.16, 1.3);
    bladeShape.lineTo(-0.2, 0.1);
    bladeShape.closePath();

    const extrudeSettings = {
      steps: 2,
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 4,
    };

    const bladeGeometry = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings);
    bladeGeometry.center();

    // Cel-Shaded Metallic Blade Material
    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: activeWeapon.bladeColor,
      metalness: 0.85,
      roughness: 0.2,
      emissive: activeWeapon.glowColor,
      emissiveIntensity: 0.35,
    });

    const bladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
    bladeMesh.position.y = 0.5;
    bladeMeshRef.current = bladeMesh;
    daggerGroup.add(bladeMesh);

    // Glowing Central Fuller / Rune Channel
    const runeGeometry = new THREE.BoxGeometry(0.04, 1.5, 0.08);
    const runeMaterial = new THREE.MeshBasicMaterial({
      color: activeWeapon.glowColor,
    });
    const runeMesh = new THREE.Mesh(runeGeometry, runeMaterial);
    runeMesh.position.y = 0.5;
    daggerGroup.add(runeMesh);

    // Crossguard
    const guardGeometry = new THREE.CylinderGeometry(0.32, 0.28, 0.08, 6);
    guardGeometry.rotateZ(Math.PI / 2);
    const guardMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.3,
    });
    const guardMesh = new THREE.Mesh(guardGeometry, guardMaterial);
    guardMesh.position.y = -0.55;
    daggerGroup.add(guardMesh);

    // Hilt / Grip with Wrap Rings
    const hiltGeometry = new THREE.CylinderGeometry(0.065, 0.075, 0.75, 12);
    const hiltMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.2,
    });
    const hiltMesh = new THREE.Mesh(hiltGeometry, hiltMaterial);
    hiltMesh.position.y = -0.95;
    daggerGroup.add(hiltMesh);

    // Pommel (Faceted Gothic Skull Gem)
    const pommelGeometry = new THREE.DodecahedronGeometry(0.12, 1);
    const pommelMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      emissive: activeWeapon.glowColor,
      emissiveIntensity: 0.5,
      metalness: 0.8,
    });
    const pommelMesh = new THREE.Mesh(pommelGeometry, pommelMaterial);
    pommelMesh.position.y = -1.4;
    daggerGroup.add(pommelMesh);

    // 4. Shadow Aura Particle Vortex System
    const particleCount = 350;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.2 + Math.random() * 0.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3;

      pPositions[i * 3] = Math.cos(angle) * radius;
      pPositions[i * 3 + 1] = y;
      pPositions[i * 3 + 2] = Math.sin(angle) * radius;

      pVelocities[i * 3] = (Math.random() - 0.5) * 0.015;
      pVelocities[i * 3 + 1] = 0.015 + Math.random() * 0.025; // Drift upwards
      pVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(activeWeapon.particleColor),
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeometry, pMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Initial slight diagonal hero pose
    daggerGroup.rotation.z = -0.2;
    daggerGroup.rotation.y = 0.4;

    // 5. Mouse / Touch Orbit Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !daggerGroupRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      daggerGroupRef.current.rotation.y += deltaX * 0.015;
      daggerGroupRef.current.rotation.x += deltaY * 0.015;

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    dom.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation when idle
      if (daggerGroupRef.current && isAutoRotating && !isDragging) {
        daggerGroupRef.current.rotation.y += 0.01;
        daggerGroupRef.current.position.y = Math.sin(elapsedTime * 2) * 0.08;
      }

      // Update particle positions (Shadow aura drifting up)
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += pVelocities[i * 3 + 1];
          // Swirling vortex angle
          positions[i * 3] += Math.sin(elapsedTime + i) * 0.003;
          positions[i * 3 + 2] += Math.cos(elapsedTime + i) * 0.003;

          // Reset when floated too high
          if (positions[i * 3 + 1] > 2.5) {
            positions[i * 3 + 1] = -1.5;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Pulse fuller light
      if (fullerLightRef.current) {
        fullerLightRef.current.intensity = 2.5 + Math.sin(elapsedTime * 4) * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', handlePointerDown);
      dom.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      dom.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeWeapon, isAutoRotating]);

  // Handle Weapon Switch
  const switchWeapon = (weapon: DaggerPreset) => {
    sfx.playBladeSlash();
    setActiveWeapon(weapon);
    spawnCombatNumber(`ARMORY: ${weapon.name.split(' ')[0]}`, undefined, undefined, 'stat');
  };

  // Trigger high speed 360-degree slash attack
  const triggerSlash = () => {
    if (isSlashing || !daggerGroupRef.current) return;
    setIsSlashing(true);
    sfx.playBladeSlash();
    spawnCombatNumber('1,450 CRITICAL SLASH', undefined, undefined, 'mana');

    const group = daggerGroupRef.current;
    const startY = group.rotation.y;
    const startTime = performance.now();

    const doSlash = (now: number) => {
      const elapsed = (now - startTime) / 350; // 350ms duration
      if (elapsed < 1) {
        group.rotation.y = startY + Math.PI * 4 * elapsed;
        group.rotation.x = Math.sin(elapsed * Math.PI) * 0.8;
        requestAnimationFrame(doSlash);
      } else {
        group.rotation.y = startY;
        group.rotation.x = 0;
        setIsSlashing(false);
      }
    };

    requestAnimationFrame(doSlash);
  };

  return (
    <div className="w-full rounded-2xl bg-black/85 border border-purple-500/40 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.2)] font-mono overflow-hidden">
      {/* Armory Header */}
      <div className="p-4 sm:p-5 border-b border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-purple-950/40 via-black to-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-950/80 border border-purple-500/50 text-purple-400">
            <Swords className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-system-cyan font-bold tracking-widest uppercase">
                THREE.JS SHADOW ARMORY // 3D INSPECT
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300 border border-purple-500/40">
                {activeWeapon.koreanName}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              {activeWeapon.name}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsAutoRotating(prev => !prev)}
            onMouseEnter={() => sfx.playHover()}
            className={`px-2.5 py-1.5 rounded text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
              isAutoRotating
                ? 'bg-purple-950/80 border-purple-400 text-purple-200'
                : 'bg-black/60 border-white/20 text-gray-400'
            }`}
            title="Toggle 3D Orbit Auto-Rotation"
          >
            <RotateCw className="w-3 h-3" />
            <span className="hidden sm:inline">ORBIT</span>
          </button>

          <button
            onClick={triggerSlash}
            disabled={isSlashing}
            onMouseEnter={() => sfx.playHover()}
            className="px-3.5 py-1.5 rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>SWING BLADE</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* 3D WebGL Canvas Container */}
        <div className="lg:col-span-8 relative h-[320px] sm:h-[400px] md:h-[440px] bg-radial from-purple-950/20 via-black to-black flex items-center justify-center">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* 3D Interaction Hint Overlay */}
          <div className="absolute bottom-3 left-4 text-[10px] text-system-muted flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 pointer-events-none">
            <Eye className="w-3 h-3 text-system-cyan" />
            <span>DRAG TO ROTATE 360° // SCROLL TO ZOOM</span>
          </div>

          <div className="absolute top-3 right-4 text-[10px] text-purple-300 font-bold bg-purple-950/60 px-2.5 py-1 rounded border border-purple-500/30">
            {activeWeapon.rank}
          </div>
        </div>

        {/* Weapons Selector & Live Biometric Specs */}
        <div className="lg:col-span-4 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-purple-500/20 bg-slate-950/60 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
              EQUIP SHADOW MONARCH WEAPON:
            </span>
            <div className="space-y-1.5">
              {WEAPONS.map((w) => {
                const isSelected = w.id === activeWeapon.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => switchWeapon(w)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`w-full p-2.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-purple-500/30 hover:text-gray-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold leading-tight">{w.name}</div>
                      <div className="text-[9px] text-system-muted">{w.attack}</div>
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      w.rank === 'S-RANK'
                        ? 'bg-yellow-950 text-yellow-300 border border-yellow-500/40'
                        : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                    }`}>
                      {w.rank}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weapon Description & Stats Card */}
          <div className="p-3.5 rounded-xl bg-black/80 border border-purple-500/30 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="text-[10px] text-purple-300 font-bold">BIOMECHANICAL BENEFIT:</span>
              <span className="text-[9px] text-system-cyan">{activeWeapon.koreanName}</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
              {activeWeapon.description}
            </p>
            <div className="p-2 rounded bg-purple-950/40 border border-purple-500/20 text-[10px] text-purple-200">
              <strong className="text-white">Active Buff:</strong> {activeWeapon.effect}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
