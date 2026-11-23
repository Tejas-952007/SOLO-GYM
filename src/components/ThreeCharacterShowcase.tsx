'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { sfx } from '@/lib/audio-sfx';
import {
  RotateCw,
  Zap,
  Eye,
  Swords,
  Shield,
  Sparkles,
  Camera,
  Flame,
  Crosshair,
  Maximize2,
  Volume2,
} from 'lucide-react';
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
  accentColor: number;
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
    thumbnail: '/assets/09-arise/jinwoo-stage.png',
    bodyColor: 0x070712,
    visorColor: 0x38bdf8, // Piercing Neon Cyan Eyes
    auraColor: 0x8b5cf6, // Monarch Violet
    accentColor: 0x06b6d4, // Cyan Rune Glint
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
    thumbnail: '/assets/09-arise/igris-stage.png',
    bodyColor: 0x24060d,
    visorColor: 0xef4444, // Blood Crimson Visage
    auraColor: 0xef4444, // Blood Knight Red
    accentColor: 0xfca5a5,
    quote: '"My blade exists solely to cleave your enemies."',
    buff: '+35% BARBELL SQUAT INTENSITY // ZERO PLATEAU',
    weaponName: 'TWO-HANDED DEMONIC BLOOD GREATSWORD',
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
    thumbnail: '/assets/09-arise/beru-stage.png',
    bodyColor: 0x160829,
    visorColor: 0xe879f9, // Royal Violet Gaze
    auraColor: 0xa855f7, // Royal Purple
    accentColor: 0xd946ef,
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
    thumbnail: '/assets/09-arise/iron-stage.png',
    bodyColor: 0x221e1a,
    visorColor: 0xf59e0b, // Radiant Amber Eye Core
    auraColor: 0xf59e0b, // Golden Amber
    accentColor: 0xfcd34d,
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
  const [cameraMode, setCameraMode] = useState<'orbit' | 'hero' | 'weapons'>('orbit');
  const [isLoading, setIsLoading] = useState(true);
  const [isPoweringUp, setIsPoweringUp] = useState(false);
  const [isSlashing, setIsSlashing] = useState(false);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<{ [key: string]: THREE.AnimationAction }>({});
  const characterModelRef = useRef<THREE.Group | null>(null);
  const accessoriesRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const shockwaveRef = useRef<THREE.Mesh | null>(null);
  const slashArcRef = useRef<THREE.Mesh | null>(null);
  const eyeLightRef = useRef<THREE.PointLight | null>(null);
  const coatTailsRef = useRef<THREE.Mesh | null>(null);
  const plumeRef = useRef<THREE.Mesh | null>(null);

  // Target Camera Interpolation
  const targetCamPos = useRef(new THREE.Vector3(0, 1.4, 3.8));
  const targetCamLook = useRef(new THREE.Vector3(0, 0.95, 0));

  // Build authentic 3D manhwa accessories & attach to bones
  const buildCharacterAccessories = (char: HunterCharacter, model: THREE.Group) => {
    const accGroup = new THREE.Group();
    accGroup.name = 'accessoriesGroup';

    // Locate Skeletal Bones
    const headBone =
      model.getObjectByName('mixamorig:Head') ||
      model.getObjectByName('mixamorigHead') ||
      model.getObjectByName('Head');
    const spine2Bone =
      model.getObjectByName('mixamorig:Spine2') ||
      model.getObjectByName('mixamorigSpine2') ||
      model.getObjectByName('Spine2');
    const rHandBone =
      model.getObjectByName('mixamorig:RightHand') ||
      model.getObjectByName('mixamorigRightHand') ||
      model.getObjectByName('RightHand');
    const lHandBone =
      model.getObjectByName('mixamorig:LeftHand') ||
      model.getObjectByName('mixamorigLeftHand') ||
      model.getObjectByName('LeftHand');
    const lShoulder =
      model.getObjectByName('mixamorig:LeftShoulder') ||
      model.getObjectByName('mixamorigLeftShoulder');
    const rShoulder =
      model.getObjectByName('mixamorig:RightShoulder') ||
      model.getObjectByName('mixamorigRightShoulder');

    if (char.id === 'jinwoo') {
      // 1. Sung Jin-Woo Anime Hair Strands (Head Bone)
      if (headBone) {
        const hairGroup = new THREE.Group();
        const hairMat = new THREE.MeshStandardMaterial({
          color: 0x05050b,
          roughness: 0.35,
          metalness: 0.2,
        });

        // Layered spiky strands
        const strandOffsets = [
          { pos: [0, 0.16, 0.04], rot: [-0.3, 0, 0], scale: [0.08, 0.22, 0.08] },
          { pos: [-0.07, 0.14, 0.02], rot: [-0.2, 0.3, 0.4], scale: [0.07, 0.2, 0.07] },
          { pos: [0.07, 0.14, 0.02], rot: [-0.2, -0.3, -0.4], scale: [0.07, 0.2, 0.07] },
          { pos: [-0.04, 0.15, -0.06], rot: [0.4, 0, 0.2], scale: [0.07, 0.24, 0.07] },
          { pos: [0.04, 0.15, -0.06], rot: [0.4, 0, -0.2], scale: [0.07, 0.24, 0.07] },
          // Front messy bangs over brow
          { pos: [0, 0.1, 0.12], rot: [-0.6, 0, 0], scale: [0.05, 0.15, 0.05] },
          { pos: [-0.05, 0.09, 0.11], rot: [-0.5, 0.2, 0.2], scale: [0.04, 0.14, 0.04] },
          { pos: [0.05, 0.09, 0.11], rot: [-0.5, -0.2, -0.2], scale: [0.04, 0.14, 0.04] },
        ];

        strandOffsets.forEach(({ pos, rot, scale }) => {
          const strand = new THREE.Mesh(new THREE.ConeGeometry(scale[0], scale[1], 4), hairMat);
          strand.position.set(pos[0], pos[1], pos[2]);
          strand.rotation.set(rot[0], rot[1], rot[2]);
          hairGroup.add(strand);
        });

        // Glowing Blue Eye Flares
        const eyeMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.95,
        });
        const lEyeFlare = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), eyeMat);
        lEyeFlare.position.set(-0.04, 0.08, 0.11);
        hairGroup.add(lEyeFlare);

        const rEyeFlare = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), eyeMat);
        rEyeFlare.position.set(0.04, 0.08, 0.11);
        hairGroup.add(rEyeFlare);

        headBone.add(hairGroup);
      }

      // 2. Flowing Shadow Monarch Trenchcoat Tails (Spine2 Bone)
      if (spine2Bone) {
        const coatGeo = new THREE.PlaneGeometry(0.55, 1.3, 6, 8);
        const coatMat = new THREE.MeshStandardMaterial({
          color: 0x05040d,
          side: THREE.DoubleSide,
          roughness: 0.7,
          metalness: 0.1,
        });
        const coat = new THREE.Mesh(coatGeo, coatMat);
        coat.position.set(0, -0.35, -0.15);
        coat.rotation.x = 0.15;
        coat.castShadow = true;
        spine2Bone.add(coat);
        coatTailsRef.current = coat;
      }

      // 3. Kamish's Wrath (Right Hand) - Jagged Dragon Crystal Dagger
      if (rHandBone) {
        const rDaggerGroup = new THREE.Group();
        const bladeGeo = new THREE.ConeGeometry(0.045, 0.55, 4);
        bladeGeo.scale(1, 1, 0.2);
        const bladeMat = new THREE.MeshStandardMaterial({
          color: 0x8b5cf6,
          emissive: 0x8b5cf6,
          emissiveIntensity: 2.0,
          metalness: 0.95,
          roughness: 0.1,
        });
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(0, 0.28, 0);

        const guard = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.02, 0.04),
          new THREE.MeshStandardMaterial({ color: 0x181822, metalness: 0.8 })
        );
        guard.position.set(0, 0.02, 0);

        const hilt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.015, 0.015, 0.16, 8),
          new THREE.MeshStandardMaterial({ color: 0x09090f })
        );
        hilt.position.set(0, -0.06, 0);

        rDaggerGroup.add(blade);
        rDaggerGroup.add(guard);
        rDaggerGroup.add(hilt);
        rDaggerGroup.position.set(0.04, -0.08, 0.06);
        rDaggerGroup.rotation.x = Math.PI / 2;
        rHandBone.add(rDaggerGroup);
      }

      // 4. Knight Killer (Left Hand) - Curved Azure Shadow Dagger
      if (lHandBone) {
        const lDaggerGroup = new THREE.Group();
        const bladeGeo = new THREE.ConeGeometry(0.04, 0.48, 4);
        bladeGeo.scale(1, 1, 0.2);
        const bladeMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x38bdf8,
          emissiveIntensity: 2.0,
          metalness: 0.95,
          roughness: 0.1,
        });
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(0, 0.24, 0);

        const guard = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.02, 0.04),
          new THREE.MeshStandardMaterial({ color: 0x181822, metalness: 0.8 })
        );
        guard.position.set(0, 0.02, 0);

        const hilt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.015, 0.015, 0.15, 8),
          new THREE.MeshStandardMaterial({ color: 0x09090f })
        );
        hilt.position.set(0, -0.05, 0);

        lDaggerGroup.add(blade);
        lDaggerGroup.add(guard);
        lDaggerGroup.add(hilt);
        lDaggerGroup.position.set(-0.04, -0.08, 0.06);
        lDaggerGroup.rotation.x = Math.PI / 2;
        lHandBone.add(lDaggerGroup);
      }
    } else if (char.id === 'igris') {
      // 1. Flowing Crimson Knight Plume (Head Bone)
      if (headBone) {
        const plumeGeo = new THREE.CylinderGeometry(0.04, 0.14, 0.9, 6);
        const plumeMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          roughness: 0.8,
        });
        const plume = new THREE.Mesh(plumeGeo, plumeMat);
        plume.position.set(0, 0.28, -0.15);
        plume.rotation.x = -0.45;
        headBone.add(plume);
        plumeRef.current = plume;
      }

      // 2. Heavy Spiked Pauldrons (Shoulders)
      const pauldronMat = new THREE.MeshStandardMaterial({
        color: 0x550a14,
        metalness: 0.85,
        roughness: 0.25,
      });
      if (lShoulder) {
        const lSpike = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 4), pauldronMat);
        lSpike.position.set(0, 0.12, 0);
        lSpike.rotation.z = Math.PI / 4;
        lShoulder.add(lSpike);
      }
      if (rShoulder) {
        const rSpike = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 4), pauldronMat);
        rSpike.position.set(0, 0.12, 0);
        rSpike.rotation.z = -Math.PI / 4;
        rShoulder.add(rSpike);
      }

      // 3. Demonic Two-Handed Blood Greatsword (Right Hand)
      if (rHandBone) {
        const swordGroup = new THREE.Group();
        const bladeGeo = new THREE.BoxGeometry(0.09, 1.35, 0.025);
        const bladeMat = new THREE.MeshStandardMaterial({
          color: 0xd4d4d8,
          emissive: 0xef4444,
          emissiveIntensity: 1.2,
          metalness: 0.95,
          roughness: 0.1,
        });
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(0, 0.68, 0);

        const guard = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.04, 0.05),
          new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8 })
        );
        guard.position.set(0, 0.02, 0);

        const hilt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8),
          new THREE.MeshStandardMaterial({ color: 0x09090b })
        );
        hilt.position.set(0, -0.17, 0);

        swordGroup.add(blade);
        swordGroup.add(guard);
        swordGroup.add(hilt);
        swordGroup.position.set(0.06, -0.12, 0.12);
        swordGroup.rotation.x = Math.PI / 3;
        rHandBone.add(swordGroup);
      }
    } else if (char.id === 'beru') {
      // 1. Insectoid Antennae (Head Bone)
      if (headBone) {
        const antGroup = new THREE.Group();
        const antMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          metalness: 0.9,
        });
        const lAnt = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.02, 0.35, 6), antMat);
        lAnt.position.set(-0.06, 0.22, 0.05);
        lAnt.rotation.set(-0.3, 0, -0.4);
        antGroup.add(lAnt);

        const rAnt = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.02, 0.35, 6), antMat);
        rAnt.position.set(0.06, 0.22, 0.05);
        rAnt.rotation.set(-0.3, 0, 0.4);
        antGroup.add(rAnt);

        headBone.add(antGroup);
      }

      // 2. Twin Chitin Scythes (Hands)
      const scytheMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xa855f7,
        emissiveIntensity: 1.5,
        metalness: 0.9,
      });
      if (rHandBone) {
        const rScythe = new THREE.Mesh(
          new THREE.TorusGeometry(0.28, 0.03, 6, 16, Math.PI * 0.95),
          scytheMat
        );
        rScythe.position.set(0.08, 0.12, 0.05);
        rScythe.rotation.z = Math.PI / 4;
        rHandBone.add(rScythe);
      }
      if (lHandBone) {
        const lScythe = new THREE.Mesh(
          new THREE.TorusGeometry(0.28, 0.03, 6, 16, Math.PI * 0.95),
          scytheMat
        );
        lScythe.position.set(-0.08, 0.12, 0.05);
        lScythe.rotation.z = -Math.PI / 4;
        lHandBone.add(lScythe);
      }
    } else if (char.id === 'iron') {
      // 1. Horned Titan Helmet (Head Bone)
      if (headBone) {
        const hornMat = new THREE.MeshStandardMaterial({ color: 0x44403c, metalness: 0.8 });
        const lHorn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.35, 6), hornMat);
        lHorn.position.set(-0.14, 0.14, 0);
        lHorn.rotation.z = Math.PI / 3;
        headBone.add(lHorn);

        const rHorn = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.35, 6), hornMat);
        rHorn.position.set(0.14, 0.14, 0);
        rHorn.rotation.z = -Math.PI / 3;
        headBone.add(rHorn);
      }

      // 2. Tower Bastion Shield (Left Hand)
      if (lHandBone) {
        const shield = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 0.85, 0.05),
          new THREE.MeshStandardMaterial({
            color: 0x292524,
            emissive: 0xf59e0b,
            emissiveIntensity: 0.3,
            metalness: 0.9,
            roughness: 0.2,
          })
        );
        shield.position.set(-0.18, 0.08, 0.18);
        shield.rotation.y = Math.PI / 5;
        lHandBone.add(shield);
      }

      // 3. Executioner Cleaver (Right Hand)
      if (rHandBone) {
        const cleaver = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.6, 0.025),
          new THREE.MeshStandardMaterial({ color: 0x78716c, metalness: 0.95 })
        );
        cleaver.position.set(0.08, 0, 0.12);
        cleaver.rotation.x = Math.PI / 4;
        rHandBone.add(cleaver);
      }
    }

    return accGroup;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.copy(targetCamPos.current);
    cameraRef.current = camera;

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
    renderer.toneMappingExposure = 1.4;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Interactive OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.copy(targetCamLook.current);
    controls.minDistance = 1.6;
    controls.maxDistance = 5.8;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 1.4;
    controlsRef.current = controls;

    // 3. Cinematic Anime Lighting Grid
    const ambientLight = new THREE.AmbientLight(0x222238, 2.5);
    scene.add(ambientLight);

    // Key front light illuminating the face, armor, and weapons
    const frontKeyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    frontKeyLight.position.set(0, 2.6, 4.0);
    frontKeyLight.castShadow = true;
    frontKeyLight.shadow.mapSize.width = 1024;
    frontKeyLight.shadow.mapSize.height = 1024;
    scene.add(frontKeyLight);

    const rimLight = new THREE.DirectionalLight(activeChar.auraColor, 6.2);
    rimLight.position.set(-3, 3, -2.5);
    scene.add(rimLight);

    const cyanGlintLight = new THREE.DirectionalLight(activeChar.accentColor, 2.5);
    cyanGlintLight.position.set(3, 1.8, 2.5);
    scene.add(cyanGlintLight);

    const eyeLight = new THREE.PointLight(activeChar.visorColor, 4.2, 5.0);
    eyeLight.position.set(0, 1.7, 0.4);
    scene.add(eyeLight);
    eyeLightRef.current = eyeLight;

    // 4. Dual Runic Summoning Pedestal Circles
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const innerRingGeo = new THREE.RingGeometry(0.75, 0.88, 48);
    innerRingGeo.rotateX(-Math.PI / 2);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: activeChar.auraColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    ringGroup.add(innerRing);

    const outerRingGeo = new THREE.RingGeometry(1.15, 1.3, 48);
    outerRingGeo.rotateX(-Math.PI / 2);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: activeChar.visorColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    ringGroup.add(outerRing);

    // Dark Pedestal Base Disc
    const discGeo = new THREE.CircleGeometry(1.5, 32);
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

    // 6. Blade Slash Crescent Arc Mesh
    const slashGeo = new THREE.RingGeometry(0.55, 0.85, 32, 1, 0, Math.PI * 0.75);
    const slashMat = new THREE.MeshBasicMaterial({
      color: activeChar.visorColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const slashArc = new THREE.Mesh(slashGeo, slashMat);
    slashArc.position.set(0, 1.1, 0.4);
    slashArc.rotation.set(0.3, 0.2, -0.4);
    scene.add(slashArc);
    slashArcRef.current = slashArc;

    // 7. Volumetric 3D Shadow Monarch Particle Vortex (650 particles)
    const pCount = 650;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVel = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      const radius = 0.3 + Math.random() * 1.6;
      const angle = Math.random() * Math.PI * 2;
      const y = Math.random() * 3.0;

      pPos[i * 3] = Math.cos(angle) * radius;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = Math.sin(angle) * radius;

      pVel[i * 3] = (Math.random() - 0.5) * 0.012;
      pVel[i * 3 + 1] = 0.014 + Math.random() * 0.032; // Vertical shadow smoke ascent
      pVel[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: activeChar.auraColor,
      size: 0.042,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Load Real 3D Rigged Model (.glb)
    setIsLoading(true);
    const loader = new GLTFLoader();

    loader.load(
      '/models/Soldier.glb',
      (gltf) => {
        const model = gltf.scene;
        model.rotation.y = Math.PI; // Face forward (+Z towards user)
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
                emissiveIntensity: 4.0,
                roughness: 0.1,
                metalness: 0.9,
              });
            } else {
              // Deep Obsidian Shadow Armor
              child.material = new THREE.MeshStandardMaterial({
                color: activeChar.bodyColor,
                emissive: new THREE.Color(activeChar.auraColor),
                emissiveIntensity: 0.22,
                roughness: 0.25,
                metalness: 0.88,
              });
            }
          }
        });

        // Attach Custom Manhwa Accessories (Hair, Cape, Plume, Dual Daggers)
        const acc = buildCharacterAccessories(activeChar, model);
        accessoriesRef.current = acc;

        // Setup AnimationMixer & Actions
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        gltf.animations.forEach((clip) => {
          actionsRef.current[clip.name] = mixer.clipAction(clip);
        });

        // Start Default Stance Animation
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

    // 9. Animation Render Loop
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

      // Smooth Camera Positioning towards target mode
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.05);
        controlsRef.current.target.lerp(targetCamLook.current, 0.05);
        controlsRef.current.update();
      }

      // Runic Pedestal Counter-Rotations
      innerRing.rotation.z += 0.012;
      outerRing.rotation.z -= 0.008;

      // Dynamic Cloth Wind Physics on Trenchcoat Tails
      if (coatTailsRef.current) {
        coatTailsRef.current.rotation.x = 0.15 + Math.sin(elapsed * 4.0) * 0.1;
        coatTailsRef.current.rotation.y = Math.cos(elapsed * 2.5) * 0.05;
      }

      // Dynamic Plume Flutter on Igris
      if (plumeRef.current) {
        plumeRef.current.rotation.z = Math.sin(elapsed * 5.0) * 0.08;
      }

      // Swirling Upward Particle Tendrils
      if (particlesRef.current) {
        const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < pCount; i++) {
          pos[i * 3 + 1] += pVel[i * 3 + 1];
          pos[i * 3] += Math.sin(elapsed * 2 + i) * 0.002;
          pos[i * 3 + 2] += Math.cos(elapsed * 2 + i) * 0.002;

          if (pos[i * 3 + 1] > 3.0) {
            pos[i * 3 + 1] = 0.05;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Eye flare light pulse
      if (eyeLightRef.current) {
        eyeLightRef.current.intensity = 3.5 + Math.sin(elapsed * 5.0) * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize Handling
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

  // Toggle Camera View Mode
  const setCameraPreset = (mode: 'orbit' | 'hero' | 'weapons') => {
    sfx.playHover();
    setCameraMode(mode);

    if (mode === 'hero') {
      // Menacing low hero angle looking up
      targetCamPos.current.set(0, 0.45, 2.7);
      targetCamLook.current.set(0, 1.25, 0);
      setIsAutoRotating(false);
      if (controlsRef.current) controlsRef.current.autoRotate = false;
    } else if (mode === 'weapons') {
      // Zoom into dual glowing shadow daggers
      targetCamPos.current.set(0.45, 0.95, 1.8);
      targetCamLook.current.set(0.1, 0.85, 0);
      setIsAutoRotating(false);
      if (controlsRef.current) controlsRef.current.autoRotate = false;
    } else {
      // Full 360 orbit view
      targetCamPos.current.set(0, 1.4, 3.8);
      targetCamLook.current.set(0, 0.95, 0);
      setIsAutoRotating(true);
      if (controlsRef.current) controlsRef.current.autoRotate = true;
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

  // Trigger Combat Dagger Slash Move
  const triggerDaggerSlash = () => {
    if (isSlashing || !slashArcRef.current || !characterModelRef.current) return;
    setIsSlashing(true);
    sfx.playBladeSlash();
    spawnCombatNumber('CRITICAL // DAGGER COMBO: +48,920 DMG', undefined, undefined, 'damage');

    // Crossfade to Run/Attack stance temporarily
    if (actionsRef.current['Run']) {
      actionsRef.current[activeAnimation]?.fadeOut(0.15);
      actionsRef.current['Run'].reset().fadeIn(0.15).play();
    }

    const arc = slashArcRef.current;
    const arcMat = arc.material as THREE.MeshBasicMaterial;
    const startTime = performance.now();

    const doSlash = (now: number) => {
      const progress = (now - startTime) / 450;
      if (progress < 1) {
        arc.rotation.z = -0.4 + progress * Math.PI * 1.5;
        arcMat.opacity = Math.sin(progress * Math.PI) * 0.95;
        requestAnimationFrame(doSlash);
      } else {
        arcMat.opacity = 0;
        setIsSlashing(false);
        // Return to Idle
        if (actionsRef.current['Idle']) {
          actionsRef.current['Run']?.fadeOut(0.35);
          actionsRef.current['Idle'].reset().fadeIn(0.35).play();
          setActiveAnimation('Idle');
        }
      }
    };

    requestAnimationFrame(doSlash);
  };

  // Trigger "ARISE" Summoning Domain Expansion
  const triggerPowerUp = () => {
    if (isPoweringUp || !shockwaveRef.current || !characterModelRef.current) return;
    setIsPoweringUp(true);
    sfx.playDemonRoar();
    spawnCombatNumber('DOMAIN EXPANSION // "ARISE"', undefined, undefined, 'mana');

    // Crossfade to Battle Stance
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
              3D GLTF SKELETAL S-RANK HUNTER ENGINE
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

          {/* Camera Angles */}
          <div className="flex items-center p-0.5 rounded-lg bg-black/60 border border-white/10">
            <button
              onClick={() => setCameraPreset('orbit')}
              title="Full 360 Orbit"
              className={`px-2 py-1 text-[11px] font-bold rounded transition-all flex items-center gap-1 ${
                cameraMode === 'orbit'
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3 h-3" />
              <span className="hidden md:inline">360°</span>
            </button>
            <button
              onClick={() => setCameraPreset('hero')}
              title="Menacing Hero View"
              className={`px-2 py-1 text-[11px] font-bold rounded transition-all flex items-center gap-1 ${
                cameraMode === 'hero' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span className="hidden md:inline">HERO</span>
            </button>
            <button
              onClick={() => setCameraPreset('weapons')}
              title="Weapons Close-Up"
              className={`px-2 py-1 text-[11px] font-bold rounded transition-all flex items-center gap-1 ${
                cameraMode === 'weapons'
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Crosshair className="w-3 h-3" />
              <span className="hidden md:inline">BLADES</span>
            </button>
          </div>

          {/* Dagger Slash Attack Move */}
          <button
            onClick={triggerDaggerSlash}
            disabled={isSlashing}
            onMouseEnter={() => sfx.playHover()}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Swords className="w-3.5 h-3.5 text-white" />
            <span>SLASH</span>
          </button>

          {/* Arise Summoning Surge */}
          <button
            onClick={triggerPowerUp}
            disabled={isPoweringUp}
            onMouseEnter={() => sfx.playHover()}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>ARISE</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Real 3D WebGL Canvas */}
        <div className="lg:col-span-8 relative h-[400px] sm:h-[480px] md:h-[550px] bg-radial from-purple-950/20 via-[#05050A] to-[#020205] flex items-center justify-center overflow-hidden">
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
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.thumbnail}
                          alt={c.name}
                          className="w-full h-full object-cover object-top"
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
