"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeManaCanvasProps {
  className?: string;
  particleCount?: number;
}

export function ThreeManaCanvas({
  className = "fixed inset-0 pointer-events-none z-0",
  particleCount = 1400,
}: ThreeManaCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Dynamic Swirling Mana Particles
    const count = window.innerWidth < 768 ? Math.floor(particleCount / 2.5) : particleCount;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const velocities = new Float32Array(count * 3);

    const colorBlue = new THREE.Color("#38BDF8"); // Cold E-rank cyan
    const colorPurple = new THREE.Color("#8B5CF6"); // Awakening violet
    const colorGold = new THREE.Color("#F5C542"); // S-rank sovereign gold

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Cylinder / vortex distribution
      const radius = 20 + Math.random() * 85;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 160;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      velocities[i3] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 1] = 0.08 + Math.random() * 0.18; // Upward mana drift
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

      // Color temperature blend based on height
      const t = Math.random();
      const mixedColor = t < 0.6 ? colorBlue.clone().lerp(colorPurple, t / 0.6) : colorPurple.clone().lerp(colorGold, (t - 0.6) / 0.4);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = 1.2 + Math.random() * 2.8;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Circular particle texture generator
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.25, "rgba(237,233,254,0.85)");
      grad.addColorStop(0.6, "rgba(139,92,246,0.35)");
      grad.addColorStop(1, "rgba(7,6,13,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Dimensional Mana Rift Rings in the background
    const ringGeo = new THREE.TorusGeometry(38, 0.4, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
    });
    const riftRing1 = new THREE.Mesh(ringGeo, ringMat);
    riftRing1.rotation.x = Math.PI / 3;
    scene.add(riftRing1);

    const riftRing2 = riftRing1.clone();
    riftRing2.scale.set(1.4, 1.4, 1.4);
    riftRing2.rotation.y = Math.PI / 4;
    scene.add(riftRing2);

    // Mouse & Scroll Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;
    let shockwaveIntensity = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onClick = () => {
      shockwaveIntensity = 1.0;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Rotate whole mana vortex with scroll acceleration and shockwave pulse
      const boost = 1 + Math.min(scrollSpeed * 0.05, 4) + shockwaveIntensity * 3;
      particles.rotation.y = elapsedTime * 0.08 * boost + targetX * 0.4;
      particles.rotation.x = targetY * 0.3;

      riftRing1.rotation.z += 0.003 * boost;
      riftRing2.rotation.z -= 0.002 * boost;

      if (shockwaveIntensity > 0) {
        riftRing1.scale.setScalar(1 + shockwaveIntensity * 0.4);
        riftRing2.scale.setScalar(1 + shockwaveIntensity * 0.3);
      }

      // Particle vertical flow and shockwave radial push
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3 + 1] += velocities[i3 + 1] * boost;

        if (shockwaveIntensity > 0.05) {
          pos[i3] += (Math.random() - 0.5) * shockwaveIntensity * 1.5;
          pos[i3 + 2] += (Math.random() - 0.5) * shockwaveIntensity * 1.5;
        }

        // Reset if passed top
        if (pos[i3 + 1] > 80) {
          pos[i3 + 1] = -80;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Decay scroll boost and shockwave
      scrollSpeed *= 0.94;
      shockwaveIntensity *= 0.92;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [particleCount]);

  return <div ref={mountRef} className={className} />;
}
