"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeManaCanvasProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

export function ThreeManaCanvas({
  className = "fixed inset-0 pointer-events-none z-0",
  particleCount = 1200,
  interactive = true,
}: ThreeManaCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Geometry & Attributes
    const count = window.innerWidth < 768 ? Math.floor(particleCount / 2.5) : particleCount;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const angles = new Float32Array(count);
    const speeds = new Float32Array(count);
    const radii = new Float32Array(count);

    const cyan = new THREE.Color("#38BDF8");
    const violet = new THREE.Color("#8B5CF6");
    const purpleGlow = new THREE.Color("#A78BFA");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 10 + Math.pow(Math.random(), 1.5) * 85;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 60;

      radii[i] = radius;
      angles[i] = angle;
      speeds[i] = (0.2 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius * 0.4;

      // Color distribution (Vortices of Cyan & Violet)
      const mixRatio = Math.random();
      const mixedColor = mixRatio > 0.6 ? cyan : mixRatio > 0.2 ? violet : purpleGlow;
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = 1.0 + Math.random() * 2.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Particle Shader / Material
    // Create a circular glowing texture for particles
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(167, 139, 250, 0.8)");
      grad.addColorStop(0.7, "rgba(56, 189, 248, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 2.4,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Tracking Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (interactive) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // Scroll parallax sync
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Rotate whole particle vortex
      particles.rotation.y = time * 0.05 + targetX * 0.3;
      particles.rotation.x = targetY * 0.2;

      // Scroll-driven camera parallax
      camera.position.y = -scrollY * 0.025;

      // Individual particle pulsation
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        angles[i] += speeds[i] * delta * 0.4;
        const i3 = i * 3;
        pos[i3] = Math.cos(angles[i]) * radii[i];
        pos[i3 + 2] = Math.sin(angles[i]) * radii[i] * 0.4 + Math.sin(time + i) * 2;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      if (interactive) {
        window.removeEventListener("mousemove", onMouseMove);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, interactive]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
