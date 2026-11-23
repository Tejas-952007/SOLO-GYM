'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Image from 'next/image';
import { sfx } from '@/lib/audio-sfx';
import { RotateCw, Zap, Eye, Flame, Shield, Swords, Sparkles, Check } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export interface HunterCharacter {
  id: 'jinwoo' | 'igris' | 'beru' | 'iron';
  name: string;
  title: string;
  koreanName: string;
  rank: 'SHADOW MONARCH' | 'COMMANDER' | 'MARSHAL' | 'VANGUARD';
  image: string;
  auraColor: number;
  rimColor: number;
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
    image: '/assets/09-arise/jinwoo-srank-stage.png',
    auraColor: 0x8b5cf6,
    rimColor: 0x38bdf8,
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
    title: 'THE BLOOD-RED KNIGHT',
    koreanName: '핏빛의 기사단장 이그리트',
    rank: 'COMMANDER',
    image: '/assets/09-arise/igris-stage.png',
    auraColor: 0xef4444,
    rimColor: 0xf87171,
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
    image: '/assets/09-arise/beru-stage.png',
    auraColor: 0xa855f7,
    rimColor: 0xe879f9,
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
    image: '/assets/09-arise/iron-stage.png',
    auraColor: 0xf59e0b,
    rimColor: 0xfbbf24,
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
  const [textureLoaded, setTextureLoaded] = useState(false);

  // Three.js object references for dynamic animation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const stageGroupRef = useRef<THREE.Group | null>(null);
  const characterCardRef = useRef<THREE.Mesh | null>(null);
  const auraParticlesRef = useRef<THREE.Points | null>(null);
  const shockwaveRef = useRef<THREE.Mesh | null>(null);
  const auraPillarRef = useRef<THREE.Mesh | null>(null);
  const innerRingRef = useRef<THREE.Mesh | null>(null);
  const outerRingRef = useRef<THREE.Mesh | null>(null);
  const eyeLightRef = useRef<THREE.PointLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Cinematic Volumetric Lighting
    const ambientLight = new THREE.AmbientLight(0x0e0e1a, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(activeChar.auraColor, 4.8);
    rimLight.position.set(-3, 3, -2);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const eyeLight = new THREE.PointLight(activeChar.eyeColor, 4.0, 5.0);
    eyeLight.position.set(0, 0.6, 0.6);
    scene.add(eyeLight);
    eyeLightRef.current = eyeLight;

    // 3. Stage Container Group
    const stageGroup = new THREE.Group();
    stageGroupRef.current = stageGroup;
    scene.add(stageGroup);

    // 4. Pedestal Runic Circles
    const ringMatInner = new THREE.MeshBasicMaterial({
      color: activeChar.auraColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const ringInnerGeo = new THREE.RingGeometry(0.85, 0.95, 48);
    ringInnerGeo.rotateX(-Math.PI / 2);
    const innerRing = new THREE.Mesh(ringInnerGeo, ringMatInner);
    innerRing.position.y = -1.45;
    stageGroup.add(innerRing);
    innerRingRef.current = innerRing;

    const ringMatOuter = new THREE.MeshBasicMaterial({
      color: activeChar.rimColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const ringOuterGeo = new THREE.RingGeometry(1.2, 1.35, 48);
    ringOuterGeo.rotateX(-Math.PI / 2);
    const outerRing = new THREE.Mesh(ringOuterGeo, ringMatOuter);
    outerRing.position.y = -1.47;
    stageGroup.add(outerRing);
    outerRingRef.current = outerRing;

    // Ground Shadow Disc
    const groundDiscGeo = new THREE.CircleGeometry(1.5, 32);
    groundDiscGeo.rotateX(-Math.PI / 2);
    const groundDiscMat = new THREE.MeshBasicMaterial({
      color: 0x030307,
      transparent: true,
      opacity: 0.85,
    });
    const groundDisc = new THREE.Mesh(groundDiscGeo, groundDiscMat);
    groundDisc.position.y = -1.49;
    stageGroup.add(groundDisc);

    // 5. Cylindrical Volumetric Aura Pillar
    const pillarGeo = new THREE.CylinderGeometry(0.9, 1.3, 3.4, 32, 1, true);
    const pillarMat = new THREE.MeshBasicMaterial({
      color: activeChar.auraColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const auraPillar = new THREE.Mesh(pillarGeo, pillarMat);
    auraPillar.position.y = 0.1;
    stageGroup.add(auraPillar);
    auraPillarRef.current = auraPillar;

    // 6. 4K Authentic Anime Holographic Character Card (Curved 3D Plane)
    const textureLoader = new THREE.TextureLoader();
    setTextureLoaded(false);

    textureLoader.load(activeChar.image, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Curved plane geometry for high-fidelity 3D anime perspective
      const cardGeo = new THREE.PlaneGeometry(2.1, 2.8, 32, 32);
      const posAttr = cardGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        // Subtle concave IMAX curvature
        posAttr.setZ(i, -(x * x) * 0.08);
      }
      cardGeo.computeVertexNormals();

      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.25,
        metalness: 0.1,
        emissive: new THREE.Color(activeChar.auraColor),
        emissiveIntensity: 0.15,
        side: THREE.DoubleSide,
      });

      const characterCard = new THREE.Mesh(cardGeo, cardMat);
      characterCard.position.y = 0.05;
      stageGroup.add(characterCard);
      characterCardRef.current = characterCard;

      // Glowing Neon Framing Outline
      const frameGeo = new THREE.EdgesGeometry(cardGeo);
      const frameMat = new THREE.LineBasicMaterial({
        color: activeChar.rimColor,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const frameWire = new THREE.LineSegments(frameGeo, frameMat);
      characterCard.add(frameWire);

      setTextureLoaded(true);
    });

    // 7. Summoning Shockwave Ring (For "ARISE" activation)
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.4, 48);
    shockwaveGeo.rotateX(-Math.PI / 2);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: activeChar.auraColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwave.position.y = -1.43;
    stageGroup.add(shockwave);
    shockwaveRef.current = shockwave;

    // 8. Volumetric 3D Shadow Monarch Particles
    const particleCount = 550;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pVel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.4 + Math.random() * 1.6;
      const angle = Math.random() * Math.PI * 2;
      const y = -1.45 + Math.random() * 3.4;

      pPos[i * 3] = Math.cos(angle) * radius;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = Math.sin(angle) * radius;

      pVel[i * 3] = (Math.random() - 0.5) * 0.012;
      pVel[i * 3 + 1] = 0.015 + Math.random() * 0.035; // Vertical dark smoke tendril ascent
      pVel[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: activeChar.auraColor,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    auraParticlesRef.current = particles;
    stageGroup.add(particles);

    // 9. Interactive Touch & Mouse Orbit / Tilt Handling
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = cx;
      prevY = cy;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!stageGroupRef.current) return;
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const dx = cx - prevX;
        const dy = cy - prevY;
        targetRotY += dx * 0.01;
        targetRotX += dy * 0.006;
        targetRotX = Math.max(-0.35, Math.min(0.35, targetRotX));
        prevX = cx;
        prevY = cy;
      } else {
        // Parallax mouse tilt
        const rect = container.getBoundingClientRect();
        const normX = ((cx - rect.left) / rect.width) * 2 - 1;
        const normY = -(((cy - rect.top) / rect.height) * 2 - 1);
        targetRotY = normX * 0.35;
        targetRotX = normY * 0.2;
      }
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

    // 10. Animation Render Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Stage Inertia & Bobbing
      if (stageGroupRef.current) {
        if (isAutoRotating && !isDragging) {
          targetRotY += 0.005;
        }
        stageGroupRef.current.rotation.y += (targetRotY - stageGroupRef.current.rotation.y) * 0.08;
        stageGroupRef.current.rotation.x += (targetRotX - stageGroupRef.current.rotation.x) * 0.08;
        stageGroupRef.current.position.y = Math.sin(elapsed * 1.8) * 0.04;
      }

      // Pedestal Ring Counter-Rotations
      if (innerRingRef.current) {
        innerRingRef.current.rotation.z += 0.012;
      }
      if (outerRingRef.current) {
        outerRingRef.current.rotation.z -= 0.008;
      }

      // Aura Pillar Breath Pulse
      if (auraPillarRef.current) {
        const pMat = auraPillarRef.current.material as THREE.MeshBasicMaterial;
        pMat.opacity = 0.12 + Math.sin(elapsed * 3) * 0.06;
      }

      // Swirling Upward Particle Tendrils
      if (auraParticlesRef.current) {
        const pos = auraParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] += pVel[i * 3 + 1];
          pos[i * 3] += Math.sin(elapsed * 1.5 + i) * 0.002;
          pos[i * 3 + 2] += Math.cos(elapsed * 1.5 + i) * 0.002;

          if (pos[i * 3 + 1] > 2.2) {
            pos[i * 3 + 1] = -1.45;
          }
        }
        auraParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Eye light pulse intensity
      if (eyeLightRef.current) {
        eyeLightRef.current.intensity = 3.5 + Math.sin(elapsed * 4.5) * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Viewport Resize Handler
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
    if (isPoweringUp || !shockwaveRef.current || !eyeLightRef.current) return;
    setIsPoweringUp(true);
    sfx.playDemonRoar();
    spawnCombatNumber('ARISE // DOMAIN EXPANDED', undefined, undefined, 'mana');

    const wave = shockwaveRef.current;
    const light = eyeLightRef.current;
    const waveMat = wave.material as THREE.MeshBasicMaterial;
    const startTime = performance.now();

    const doExpand = (now: number) => {
      const progress = (now - startTime) / 900;
      if (progress < 1) {
        const scale = 1 + progress * 5.5;
        wave.scale.set(scale, scale, scale);
        waveMat.opacity = (1 - progress) * 0.9;
        light.intensity = 4.0 + (1 - progress) * 8.0;
        requestAnimationFrame(doExpand);
      } else {
        wave.scale.set(1, 1, 1);
        waveMat.opacity = 0;
        light.intensity = 4.0;
        setIsPoweringUp(false);
      }
    };

    requestAnimationFrame(doExpand);
  };

  return (
    <div className="w-full rounded-2xl bg-[#05050A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] font-mono overflow-hidden">
      {/* Cinematic Top Header */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/25 via-black to-slate-950/25">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-system-cyan animate-pulse shadow-[0_0_10px_#38bdf8]" />
            <span className="text-[10px] text-system-muted font-bold tracking-widest uppercase">
              4K ANIME MONARCH & S-RANK ROSTER
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
              {activeChar.koreanName}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-cinzel font-black text-white tracking-wider uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {activeChar.name}
          </h2>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAutoRotating((prev) => !prev)}
            onMouseEnter={() => sfx.playHover()}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
              isAutoRotating
                ? 'bg-purple-950/70 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-black/50 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
            <span>{isAutoRotating ? 'ORBIT [ON]' : 'ORBIT [OFF]'}</span>
          </button>

          <button
            onClick={triggerPowerUp}
            disabled={isPoweringUp}
            onMouseEnter={() => sfx.playHover()}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>ARISE [SUMMON AURA]</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* 3D Holographic Character Stage */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[460px] md:h-[520px] bg-radial from-purple-950/20 via-[#05050A] to-[#020205] flex items-center justify-center overflow-hidden">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Loading Indicator */}
          {!textureLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm pointer-events-none">
              <span className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-purple-300 font-bold tracking-widest uppercase">
                SYNCHRONIZING 4K VISUAL MATRIX...
              </span>
            </div>
          )}

          {/* Interactive Hint */}
          <div className="absolute bottom-4 left-4 text-[10px] text-system-muted flex items-center gap-2 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-none backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5 text-system-cyan animate-pulse" />
            <span>TOUCH / DRAG TO TILT 3D HOLOGRAPHIC STAGE</span>
          </div>

          {/* Rank Badge */}
          <div className="absolute top-4 right-4 text-[10px] text-yellow-300 font-bold bg-yellow-950/60 px-3 py-1 rounded-full border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            ⭐ {activeChar.rank}
          </div>
        </div>

        {/* Character Selector & Biometric Terminal */}
        <div className="lg:col-span-4 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#07060F]/60 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-system-muted font-bold tracking-wider uppercase">
                COMMANDER DECK // SELECT HUNTER:
              </span>
              <span className="text-[9px] text-purple-400 font-mono">4 S-RANKS ONLINE</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              {CHARACTERS.map((c) => {
                const isSelected = c.id === activeChar.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => selectCharacter(c)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`p-2.5 sm:p-3 rounded-xl text-left transition-all border flex items-center justify-between group ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-purple-500/40 hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/15 shrink-0 bg-black">
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          className="object-cover object-top"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight group-hover:text-white transition-colors">
                          {c.name}
                        </div>
                        <div className="text-[9px] text-system-muted leading-tight mt-0.5">
                          {c.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 pl-2">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-yellow-300/90 font-bold">
                        {c.rank.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Biometrics & Buff Details */}
          <div className="space-y-3.5">
            <p className="text-xs text-gray-300 font-sans italic border-l-2 border-purple-500/60 pl-3 py-1 bg-purple-950/15 rounded-r">
              {activeChar.quote}
            </p>

            <div className="p-3.5 rounded-xl bg-black/70 border border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-system-cyan" />
                  <span>STRENGTH [STR]:</span>
                </span>
                <span className="text-system-cyan font-bold">{activeChar.statStr} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statStr}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>VITALITY [VIT]:</span>
                </span>
                <span className="text-purple-400 font-bold">{activeChar.statVit} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statVit}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>AGILITY [AGI]:</span>
                </span>
                <span className="text-yellow-400 font-bold">{activeChar.statAgi} / 100</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeChar.statAgi}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[10px] text-purple-200 flex items-start gap-2 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold mb-0.5">ACTIVE SOVEREIGN BUFF:</strong>
                <span>{activeChar.buff}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
