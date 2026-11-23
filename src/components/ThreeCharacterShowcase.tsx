'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Image from 'next/image';
import { sfx } from '@/lib/audio-sfx';
import { RotateCw, Zap, Eye, Swords, Shield, Sparkles, Play, Pause, Activity } from 'lucide-react';
import { spawnCombatNumber } from '@/components/effects/FloatingDamageNumbers';

export interface HunterCharacter {
  id: 'jinwoo' | 'igris' | 'beru' | 'iron';
  name: string;
  title: string;
  koreanName: string;
  rank: 'SHADOW MONARCH' | 'COMMANDER' | 'MARSHAL' | 'VANGUARD';
  thumbnail: string;
  bodyColor: number;
  visorColor: number;
  auraColor: number;
  quote: string;
  buff: string;
  weaponName: string;
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
    thumbnail: '/assets/09-arise/jinwoo4.jpg',
    bodyColor: 0x080814,
    visorColor: 0x38bdf8, // Piercing Neon Blue Visor / Eyes
    auraColor: 0x8b5cf6, // Shadow Monarch Purple
    quote: '"I am the hunter who conquered death itself. Arise."',
    buff: '+50% COMPOUND 1RM // MAXIMUM AMINO RETENTION',
    weaponName: "DUAL SHADOW DAGGERS [KAMISH'S WRATH & KNIGHT KILLER]",
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
    thumbnail: '/assets/09-arise/igris22.jpeg',
    bodyColor: 0x22050b,
    visorColor: 0xef4444, // Blood Crimson Flare
    auraColor: 0xef4444, // Blood Knight Red
    quote: '"My blade exists solely to cleave your enemies."',
    buff: '+35% BARBELL SQUAT INTENSITY // ZERO PLATEAU',
    weaponName: 'TWO-HANDED BLOOD DEMONIC GREATSWORD',
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
    thumbnail: '/assets/09-arise/beru0.jpg',
    bodyColor: 0x160829,
    visorColor: 0xe879f9, // Royal Violet Core
    auraColor: 0xa855f7, // Royal Purple
    quote: '"My king, permit me to feast upon your weakness."',
    buff: '+45g RAPID LEUCINE METABOLISM // REPAIR BURST',
    weaponName: 'TWIN PREDATORY CHITIN SCYTHES',
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
    thumbnail: '/assets/09-arise/iron_3.jpeg',
    bodyColor: 0x24201c,
    visorColor: 0xf59e0b, // Radiant Amber Visor
    auraColor: 0xf59e0b, // Golden Amber
    quote: '"A shield that never shatters under 200kg load."',
    buff: '+40% SPINAL INTEGRITY & CNS TANK PROTECTION',
    weaponName: 'AEGIS TOWER SHIELD & TITAN CLEAVER',
    statStr: 97,
    statAgi: 72,
    statVit: 99,
  },
];

export function ThreeCharacterShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeChar, setActiveChar] = useState<HunterCharacter>(CHARACTERS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeAnimation, setActiveAnimation] = useState<'Idle' | 'Walk' | 'Run'>('Idle');
  const [isLoading, setIsLoading] = useState(true);
  const [isPoweringUp, setIsPoweringUp] = useState(false);

  // References for Three.js instance
  const controlsRef = useRef<OrbitControls | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<{ [key: string]: THREE.AnimationAction }>({});
  const characterModelRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const shockwaveRef = useRef<THREE.Mesh | null>(null);
  const eyeLightRef = useRef<THREE.PointLight | null>(null);
  const weaponGroupRef = useRef<THREE.Group | null>(null);

  // Helper to build character weapons
  const createWeaponForChar = (charId: string) => {
    const group = new THREE.Group();

    if (charId === 'jinwoo') {
      // Dagger 1: Kamish's Wrath (Right Hand)
      const blade1Geo = new THREE.ConeGeometry(0.04, 0.45, 4);
      blade1Geo.scale(1, 1, 0.25);
      const blade1Mat = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x8b5cf6,
        emissiveIntensity: 1.5,
        metalness: 0.9,
        roughness: 0.1,
      });
      const blade1 = new THREE.Mesh(blade1Geo, blade1Mat);
      blade1.position.set(0, 0.22, 0);

      const hilt1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.15, 8),
        new THREE.MeshStandardMaterial({ color: 0x111116 })
      );
      hilt1.position.set(0, -0.05, 0);

      const rDagger = new THREE.Group();
      rDagger.add(blade1);
      rDagger.add(hilt1);
      rDagger.name = 'rightWeapon';
      rDagger.position.set(0.04, -0.05, 0.05);
      rDagger.rotation.x = Math.PI / 2;
      group.add(rDagger);

      // Dagger 2: Knight Killer (Left Hand)
      const blade2Geo = new THREE.ConeGeometry(0.04, 0.42, 4);
      blade2Geo.scale(1, 1, 0.25);
      const blade2Mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 1.5,
        metalness: 0.9,
        roughness: 0.1,
      });
      const blade2 = new THREE.Mesh(blade2Geo, blade2Mat);
      blade2.position.set(0, 0.2, 0);

      const hilt2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.14, 8),
        new THREE.MeshStandardMaterial({ color: 0x111116 })
      );
      hilt2.position.set(0, -0.05, 0);

      const lDagger = new THREE.Group();
      lDagger.add(blade2);
      lDagger.add(hilt2);
      lDagger.name = 'leftWeapon';
      lDagger.position.set(-0.04, -0.05, 0.05);
      lDagger.rotation.x = Math.PI / 2;
      group.add(lDagger);
    } else if (charId === 'igris') {
      // Massive 2-Handed Blood Greatsword
      const bladeGeo = new THREE.BoxGeometry(0.08, 1.1, 0.02);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        emissive: 0xef4444,
        emissiveIntensity: 0.8,
        metalness: 0.95,
        roughness: 0.15,
      });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.set(0, 0.55, 0);

      const guard = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.03, 0.04),
        new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8 })
      );
      guard.position.set(0, 0.01, 0);

      const hilt = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8),
        new THREE.MeshStandardMaterial({ color: 0x09090b })
      );
      hilt.position.set(0, -0.15, 0);

      const sword = new THREE.Group();
      sword.add(blade);
      sword.add(guard);
      sword.add(hilt);
      sword.name = 'rightWeapon';
      sword.position.set(0.05, -0.1, 0.1);
      sword.rotation.x = Math.PI / 3;
      group.add(sword);
    } else if (charId === 'beru') {
      // Twin Chitin Curved Scythes
      const scytheGeo = new THREE.TorusGeometry(0.25, 0.025, 6, 16, Math.PI * 0.9);
      const scytheMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xa855f7,
        emissiveIntensity: 1.2,
        metalness: 0.85,
      });
      const rScythe = new THREE.Mesh(scytheGeo, scytheMat);
      rScythe.name = 'rightWeapon';
      rScythe.position.set(0.08, 0.1, 0.05);
      rScythe.rotation.z = Math.PI / 4;
      group.add(rScythe);

      const lScythe = new THREE.Mesh(scytheGeo, scytheMat);
      lScythe.name = 'leftWeapon';
      lScythe.position.set(-0.08, 0.1, 0.05);
      lScythe.rotation.z = -Math.PI / 4;
      group.add(lScythe);
    } else if (charId === 'iron') {
      // Massive Fortress Tower Shield (Left Hand)
      const shieldGeo = new THREE.BoxGeometry(0.38, 0.75, 0.04);
      const shieldMat = new THREE.MeshStandardMaterial({
        color: 0x262626,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.2,
      });
      const shield = new THREE.Mesh(shieldGeo, shieldMat);
      shield.name = 'leftWeapon';
      shield.position.set(-0.15, 0.05, 0.15);
      shield.rotation.y = Math.PI / 6;
      group.add(shield);

      // Cleaver (Right Hand)
      const cleaver = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.5, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x737373, metalness: 0.9 })
      );
      cleaver.name = 'rightWeapon';
      cleaver.position.set(0.08, 0, 0.1);
      cleaver.rotation.x = Math.PI / 4;
      group.add(cleaver);
    }

    return group;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 3.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Interactive OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0.95, 0);
    controls.minDistance = 1.8;
    controls.maxDistance = 5.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 1.5;
    controlsRef.current = controls;

    // 3. Cinematic Anime Lighting
    const ambientLight = new THREE.AmbientLight(0x0e0e1a, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(activeChar.auraColor, 5.0);
    rimLight.position.set(-3, 3, -2.5);
    scene.add(rimLight);

    const eyeLight = new THREE.PointLight(activeChar.visorColor, 3.5, 4.0);
    eyeLight.position.set(0, 1.7, 0.4);
    scene.add(eyeLight);
    eyeLightRef.current = eyeLight;

    // 4. Ground Pedestal Runic Circles
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const innerRingGeo = new THREE.RingGeometry(0.75, 0.85, 48);
    innerRingGeo.rotateX(-Math.PI / 2);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: activeChar.auraColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    ringGroup.add(innerRing);

    const outerRingGeo = new THREE.RingGeometry(1.1, 1.25, 48);
    outerRingGeo.rotateX(-Math.PI / 2);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: activeChar.visorColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    ringGroup.add(outerRing);

    // Dark Pedestal Base Disc
    const discGeo = new THREE.CircleGeometry(1.4, 32);
    discGeo.rotateX(-Math.PI / 2);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x05050d,
      roughness: 0.8,
      metalness: 0.2,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.y = -0.01;
    disc.receiveShadow = true;
    ringGroup.add(disc);

    // 5. Summoning Shockwave Ring
    const shockwaveGeo = new THREE.RingGeometry(0.2, 0.5, 48);
    shockwaveGeo.rotateX(-Math.PI / 2);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: activeChar.auraColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwave.position.y = 0.02;
    scene.add(shockwave);
    shockwaveRef.current = shockwave;

    // 6. Volumetric 3D Shadow Monarch Particles
    const pCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVel = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      const radius = 0.3 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const y = Math.random() * 2.8;

      pPos[i * 3] = Math.cos(angle) * radius;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = Math.sin(angle) * radius;

      pVel[i * 3] = (Math.random() - 0.5) * 0.01;
      pVel[i * 3 + 1] = 0.012 + Math.random() * 0.028; // Upward drift
      pVel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: activeChar.auraColor,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 7. Load Real 3D Rigged Model (.glb)
    setIsLoading(true);
    const loader = new GLTFLoader();

    loader.load(
      '/models/Soldier.glb',
      (gltf) => {
        const model = gltf.scene;
        characterModelRef.current = model;
        scene.add(model);

        // Customize Shaders & Materials to Match Shadow Monarch Archetype
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.name.toLowerCase().includes('visor')) {
              // Glowing Visor / Piercing Anime Eye Mask
              child.material = new THREE.MeshStandardMaterial({
                color: activeChar.visorColor,
                emissive: new THREE.Color(activeChar.visorColor),
                emissiveIntensity: 3.5,
                roughness: 0.1,
                metalness: 0.9,
              });
            } else {
              // Deep Obsidian Armor with Signature Rim Glint
              child.material = new THREE.MeshStandardMaterial({
                color: activeChar.bodyColor,
                emissive: new THREE.Color(activeChar.auraColor),
                emissiveIntensity: 0.2,
                roughness: 0.25,
                metalness: 0.85,
              });
            }
          }
        });

        // Attach Weapons to Rigged Hand Bones
        const rightHand =
          model.getObjectByName('mixamorig:RightHand') ||
          model.getObjectByName('mixamorigRightHand');
        const leftHand =
          model.getObjectByName('mixamorig:LeftHand') ||
          model.getObjectByName('mixamorigLeftHand');

        const weaponGroup = createWeaponForChar(activeChar.id);
        weaponGroupRef.current = weaponGroup;

        const rWeapon = weaponGroup.getObjectByName('rightWeapon');
        if (rWeapon && rightHand) {
          rightHand.add(rWeapon);
        }

        const lWeapon = weaponGroup.getObjectByName('leftWeapon');
        if (lWeapon && leftHand) {
          leftHand.add(lWeapon);
        }

        // Setup AnimationMixer & Actions
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        gltf.animations.forEach((clip) => {
          actionsRef.current[clip.name] = mixer.clipAction(clip);
        });

        // Start Default Idle Animation
        const defaultAction = actionsRef.current[activeAnimation] || actionsRef.current['Idle'];
        if (defaultAction) {
          defaultAction.play();
        }

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D GLB model:', error);
        setIsLoading(false);
      }
    );

    // 8. Animation Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update Skeletal Animations
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Update Controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Rotate Runic Rings
      innerRing.rotation.z += 0.01;
      outerRing.rotation.z -= 0.007;

      // Swirling Upward Particle Tendrils
      if (particlesRef.current) {
        const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pCount; i++) {
          pos[i * 3 + 1] += pVel[i * 3 + 1];
          pos[i * 3] += Math.sin(elapsed * 2 + i) * 0.0015;
          pos[i * 3 + 2] += Math.cos(elapsed * 2 + i) * 0.0015;

          if (pos[i * 3 + 1] > 2.8) {
            pos[i * 3 + 1] = 0.05;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Eye flare light pulse
      if (eyeLightRef.current) {
        eyeLightRef.current.intensity = 3.0 + Math.sin(elapsed * 4.5) * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeChar]);

  // Handle Animation Change with Smooth Crossfade
  const switchAnimation = (animName: 'Idle' | 'Walk' | 'Run') => {
    if (activeAnimation === animName || !mixerRef.current) return;
    sfx.playClick();

    const prevAction = actionsRef.current[activeAnimation];
    const newAction = actionsRef.current[animName];

    if (newAction) {
      if (prevAction) {
        prevAction.fadeOut(0.35);
      }
      newAction.reset().fadeIn(0.35).play();
      setActiveAnimation(animName);
    }
  };

  // Toggle Auto-Orbit
  const toggleOrbit = () => {
    sfx.playHover();
    setIsAutoRotating((prev) => {
      const next = !prev;
      if (controlsRef.current) {
        controlsRef.current.autoRotate = next;
      }
      return next;
    });
  };

  // Switch Character Roster
  const selectCharacter = (c: HunterCharacter) => {
    sfx.playBladeSlash();
    setActiveChar(c);
    spawnCombatNumber(`SHADOW AWAKENING: ${c.name}`, undefined, undefined, 'stat');
  };

  // Trigger "ARISE" Summoning Surge
  const triggerPowerUp = () => {
    if (isPoweringUp || !shockwaveRef.current || !characterModelRef.current) return;
    setIsPoweringUp(true);
    sfx.playDemonRoar();
    spawnCombatNumber('ARISE // DOMAIN EXPANDED', undefined, undefined, 'mana');

    // Crossfade to Run/Battle Stance temporarily
    if (actionsRef.current['Run']) {
      actionsRef.current[activeAnimation]?.fadeOut(0.2);
      actionsRef.current['Run'].reset().fadeIn(0.2).play();
    }

    const wave = shockwaveRef.current;
    const waveMat = wave.material as THREE.MeshBasicMaterial;
    const startTime = performance.now();

    const doExpand = (now: number) => {
      const progress = (now - startTime) / 1000;
      if (progress < 1) {
        const scale = 1 + progress * 6;
        wave.scale.set(scale, scale, scale);
        waveMat.opacity = (1 - progress) * 0.95;
        requestAnimationFrame(doExpand);
      } else {
        wave.scale.set(1, 1, 1);
        waveMat.opacity = 0;
        setIsPoweringUp(false);
        // Crossfade back to Idle
        if (actionsRef.current['Idle']) {
          actionsRef.current['Run']?.fadeOut(0.4);
          actionsRef.current['Idle'].reset().fadeIn(0.4).play();
          setActiveAnimation('Idle');
        }
      }
    };

    requestAnimationFrame(doExpand);
  };

  return (
    <div className="w-full rounded-2xl bg-[#05050A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] font-mono overflow-hidden">
      {/* 3D Model Top Control Console */}
      <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/25 via-black to-slate-950/25">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-system-cyan animate-pulse shadow-[0_0_10px_#38bdf8]" />
            <span className="text-[10px] text-system-muted font-bold tracking-widest uppercase">
              3D GLTF SKELETAL CHARACTER MODEL
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
              {activeChar.koreanName}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-cinzel font-black text-white tracking-wider uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {activeChar.name}
          </h2>
        </div>

        {/* Dynamic Animation & Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Animation Stance Toggles */}
          <div className="flex items-center p-0.5 rounded-lg bg-black/60 border border-white/10">
            {(['Idle', 'Walk', 'Run'] as const).map((anim) => (
              <button
                key={anim}
                onClick={() => switchAnimation(anim)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded transition-all ${
                  activeAnimation === anim
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {anim === 'Idle' ? 'STANCE' : anim === 'Walk' ? 'PATROL' : 'COMBAT'}
              </button>
            ))}
          </div>

          {/* Auto Orbit Toggle */}
          <button
            onClick={toggleOrbit}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
              isAutoRotating
                ? 'bg-purple-950/70 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-black/50 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
            <span>360° ORBIT</span>
          </button>

          {/* Arise Summoning Surge */}
          <button
            onClick={triggerPowerUp}
            disabled={isPoweringUp}
            onMouseEnter={() => sfx.playHover()}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>ARISE [SHOCKWAVE]</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Real 3D WebGL Canvas */}
        <div className="lg:col-span-8 relative h-[400px] sm:h-[480px] md:h-[540px] bg-radial from-purple-950/20 via-[#05050A] to-[#020205] flex items-center justify-center overflow-hidden">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/75 backdrop-blur-sm pointer-events-none">
              <span className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-purple-300 font-bold tracking-widest uppercase">
                LOADING 3D GLTF SKELETON & TEXTURES...
              </span>
            </div>
          )}

          {/* Orbit Navigation Hint */}
          <div className="absolute bottom-4 left-4 text-[10px] text-system-muted flex items-center gap-2 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-none backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5 text-system-cyan animate-pulse" />
            <span>DRAG / PINCH TO ROTATE 3D SKELETAL MODEL 360°</span>
          </div>

          {/* Active Weapon Indicator */}
          <div className="absolute top-4 left-4 text-[10px] text-purple-300 font-bold bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/40 backdrop-blur-sm flex items-center gap-1.5">
            <Swords className="w-3 h-3 text-purple-400" />
            <span>{activeChar.weaponName}</span>
          </div>

          {/* Rank Badge */}
          <div className="absolute top-4 right-4 text-[10px] text-yellow-300 font-bold bg-yellow-950/60 px-3 py-1 rounded-full border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            ⭐ {activeChar.rank}
          </div>
        </div>

        {/* Character Roster Deck & Biometrics */}
        <div className="lg:col-span-4 p-4 sm:p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#07060F]/70 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-system-muted font-bold tracking-wider uppercase">
                SHADOW COMMANDER ROSTER:
              </span>
              <span className="text-[9px] text-purple-400 font-mono">SELECT 3D AVATAR</span>
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
                          src={c.thumbnail}
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

          {/* Manhwa Quote & RPG Stat Matrix */}
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
