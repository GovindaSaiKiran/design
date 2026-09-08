"use client";

import React, { useRef, useMemo, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MayaCoreProps {
  isAnswering?: boolean;
  scale?: number;
  interactive?: boolean;
}

// 1. Generate high-contrast, ultra-crisp holographic HUD cards
function createHudCardTexture(
  type: "understanding" | "education" | "students" | "hostel" | "calls",
  title: string
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 440;
  canvas.height = 220;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Card background: Solid glossy white with light cyan tint
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bgGrad.addColorStop(0, "#ffffff");
  bgGrad.addColorStop(0.6, "#f0f9ff");
  bgGrad.addColorStop(1, "#e0f2fe");

  ctx.fillStyle = bgGrad;
  ctx.beginPath();
  ctx.roundRect(12, 12, canvas.width - 24, canvas.height - 24, 26);
  ctx.fill();

  // Thick Vibrant Blue Border
  ctx.strokeStyle = "#0284c7";
  ctx.lineWidth = 6;
  ctx.stroke();

  // Inner Cyan Highlight
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(18, 18, canvas.width - 36, canvas.height - 36, 20);
  ctx.stroke();

  // Draw Icon in circle badge
  const iconX = 72;
  const iconY = 82;
  const iconR = 36;

  const iconGrad = ctx.createLinearGradient(iconX - iconR, iconY - iconR, iconX + iconR, iconY + iconR);
  iconGrad.addColorStop(0, "#0284c7");
  iconGrad.addColorStop(1, "#0369a1");
  ctx.fillStyle = iconGrad;
  ctx.beginPath();
  ctx.arc(iconX, iconY, iconR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.fillStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (type === "understanding") {
    ctx.strokeRect(iconX - 14, iconY - 17, 28, 34);
    ctx.beginPath();
    ctx.moveTo(iconX - 8, iconY - 8);
    ctx.lineTo(iconX + 8, iconY - 8);
    ctx.moveTo(iconX - 8, iconY);
    ctx.lineTo(iconX + 8, iconY);
    ctx.moveTo(iconX - 8, iconY + 8);
    ctx.lineTo(iconX + 3, iconY + 8);
    ctx.stroke();
  } else if (type === "education") {
    ctx.beginPath();
    ctx.moveTo(iconX, iconY - 16);
    ctx.lineTo(iconX + 20, iconY - 6);
    ctx.lineTo(iconX + 6, iconY + 6);
    ctx.lineTo(iconX - 20, iconY - 6);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(iconX - 13, iconY - 1);
    ctx.lineTo(iconX - 13, iconY + 11);
    ctx.bezierCurveTo(iconX - 13, iconY + 17, iconX + 13, iconY + 17, iconX + 13, iconY + 11);
    ctx.lineTo(iconX + 13, iconY - 1);
    ctx.stroke();
  } else if (type === "students") {
    ctx.beginPath();
    ctx.arc(iconX, iconY - 7, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(iconX, iconY + 17, 16, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(iconX - 16, iconY - 4, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(iconX + 16, iconY - 4, 6, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === "hostel") {
    ctx.strokeRect(iconX - 15, iconY - 17, 30, 34);
    ctx.fillRect(iconX - 10, iconY - 12, 6, 6);
    ctx.fillRect(iconX + 4, iconY - 12, 6, 6);
    ctx.fillRect(iconX - 10, iconY - 3, 6, 6);
    ctx.fillRect(iconX + 4, iconY - 3, 6, 6);
    ctx.fillRect(iconX - 4, iconY + 7, 8, 10);
  } else if (type === "calls") {
    ctx.save();
    ctx.translate(iconX, iconY);
    ctx.rotate(-Math.PI / 4);
    ctx.beginPath();
    ctx.moveTo(-10, -12);
    ctx.lineTo(-4, -12);
    ctx.lineTo(-1, -5);
    ctx.lineTo(-6, -3);
    ctx.bezierCurveTo(-3, 4, 4, 11, 10, 13);
    ctx.lineTo(12, 9);
    ctx.lineTo(19, 11);
    ctx.lineTo(19, 17);
    ctx.bezierCurveTo(19, 20, 16, 20, 11, 18);
    ctx.bezierCurveTo(2, 14, -10, 3, -13, -8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Card Title
  ctx.fillStyle = "#0369a1";
  ctx.font = "900 34px 'Space Grotesk', system-ui, sans-serif";
  ctx.fillText(title, 126, 92);

  // Subtitle
  ctx.fillStyle = "#0284c7";
  ctx.font = "700 15px 'Space Grotesk', monospace";
  ctx.letterSpacing = "2.5px";
  ctx.fillText("AI VERIFIED", 128, 126);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// 2. Generate smooth flowing soundwave ribbon texture
function createWaveRibbonTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const numBars = 64;
  const barWidth = canvas.width / numBars;

  for (let i = 0; i < numBars; i++) {
    const x = i * barWidth;
    const progress = i / numBars;
    const envelope = Math.sin(progress * Math.PI);
    const waveH = (Math.sin(progress * Math.PI * 4) * 0.45 + 0.55) * envelope * 210 + 24;

    const grad = ctx.createLinearGradient(0, (256 - waveH) / 2, 0, (256 + waveH) / 2);
    grad.addColorStop(0, "rgba(0, 240, 255, 0.95)");
    grad.addColorStop(0.3, "rgba(56, 189, 248, 0.85)");
    grad.addColorStop(0.7, "rgba(99, 102, 241, 0.75)");
    grad.addColorStop(1, "rgba(168, 85, 247, 0.9)");

    ctx.fillStyle = grad;
    ctx.fillRect(x + 3, (256 - waveH) / 2, barWidth - 6, waveH);

    // Glowing cyan/white peak dots
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x + barWidth / 2, (256 - waveH) / 2, 3, 0, Math.PI * 2);
    ctx.arc(x + barWidth / 2, (256 + waveH) / 2, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export default function MayaCore({
  isAnswering = false,
  scale = 0.76,
  interactive = true,
}: MayaCoreProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const soundWaveGroupRef = useRef<THREE.Group>(null);
  const ribbonMeshRef = useRef<THREE.Mesh>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  // 5 Electron Cards Refs
  const electronRefs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
  ];

  const mouseTarget = useRef({ x: 0, y: 0 });
  const lastFaceUpdate = useRef(0);

  // 1. Visor Face Canvas (High-Res 512x512 with cute glowing eyes)
  const faceCanvas = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    return canvas;
  }, []);

  const faceTexture = useMemo(() => {
    if (!faceCanvas) return null;
    const tex = new THREE.CanvasTexture(faceCanvas);
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [faceCanvas]);

  // Face Drawing function
  const renderFace = useCallback((t: number, answering: boolean) => {
    if (!faceCanvas || !faceTexture) return;
    const ctx = faceCanvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 512, 512);

    // Deep Midnight Screen Background
    const bgGrad = ctx.createRadialGradient(256, 256, 20, 256, 256, 254);
    bgGrad.addColorStop(0, "#08193d");
    bgGrad.addColorStop(0.65, "#020919");
    bgGrad.addColorStop(1, "#00030a");
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(256, 256, 254, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Ambient Neon Halo
    const haloGrad = ctx.createRadialGradient(256, 170, 10, 256, 170, 190);
    haloGrad.addColorStop(0, answering ? "rgba(0, 240, 255, 0.38)" : "rgba(0, 240, 255, 0.22)");
    haloGrad.addColorStop(1, "rgba(0, 240, 255, 0)");
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();

    // Blink animation
    const blinkCycle = t % 4.2;
    const isBlinking = blinkCycle > 4.02 && blinkCycle < 4.16;

    // Glowing Cyan Smiling Eyes (^  ^)
    ctx.save();
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = "#00f0ff";
    ctx.shadowBlur = answering ? 36 : 24;
    ctx.lineWidth = 18;
    ctx.lineCap = "round";

    const eyeY = 150 + Math.sin(t * 2) * 1.5;
    const eyeSpread = 88;
    const eyeRadius = 40;

    if (isBlinking) {
      ctx.beginPath();
      ctx.moveTo(256 - eyeSpread - eyeRadius, eyeY + 12);
      ctx.lineTo(256 - eyeSpread + eyeRadius, eyeY + 12);
      ctx.moveTo(256 + eyeSpread - eyeRadius, eyeY + 12);
      ctx.lineTo(256 + eyeSpread + eyeRadius, eyeY + 12);
      ctx.stroke();
    } else {
      // Left Eye (^ smiling inverted arc)
      ctx.beginPath();
      ctx.arc(256 - eyeSpread, eyeY + 14, eyeRadius, Math.PI * 1.15, Math.PI * 1.85, false);
      ctx.stroke();

      // Right Eye (^ smiling inverted arc)
      ctx.beginPath();
      ctx.arc(256 + eyeSpread, eyeY + 14, eyeRadius, Math.PI * 1.15, Math.PI * 1.85, false);
      ctx.stroke();

      // Inner Core Glow
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 8;
      ctx.stroke();
    }
    ctx.restore();

    // Text: M A Y A
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#00f0ff";
    ctx.shadowBlur = 20;
    ctx.font = "900 48px 'Space Grotesk', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "8px";
    ctx.fillText("M A Y A", 256, 252);

    // Subtext: LISTENING... / SPEAKING...
    ctx.font = "700 17px 'Space Grotesk', monospace";
    ctx.fillStyle = answering ? "#a3e635" : "#38bdf8";
    ctx.shadowColor = answering ? "#a3e635" : "#00f0ff";
    ctx.shadowBlur = 14;
    ctx.letterSpacing = "4px";
    ctx.fillText(answering ? "SPEAKING..." : "LISTENING...", 256, 295);
    ctx.restore();

    // Equalizer Soundwave Mouth
    ctx.save();
    ctx.shadowColor = "#00f0ff";
    ctx.shadowBlur = 16;

    const mouthY = 360;
    const barW = 7;
    const barGap = 9;
    const numBars = 11;
    const totalW = numBars * barW + (numBars - 1) * barGap;
    const startX = 256 - totalW / 2;

    for (let i = 0; i < numBars; i++) {
      const x = startX + i * (barW + barGap);
      const centerDist = Math.abs(i - (numBars - 1) / 2) / ((numBars - 1) / 2);
      const bell = Math.cos(centerDist * Math.PI * 0.45);
      const wave = Math.sin(t * (answering ? 16 : 8) + i * 0.8) * 0.5 + 0.5;
      const amp = answering ? 36 : 16;
      const barH = Math.max(7, (wave * amp + 7) * bell);

      const grad = ctx.createLinearGradient(0, mouthY - barH / 2, 0, mouthY + barH / 2);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.5, "#00f0ff");
      grad.addColorStop(1, "#0284c7");
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.roundRect(x, mouthY - barH / 2, barW, barH, 4);
      ctx.fill();
    }
    ctx.restore();

    faceTexture.needsUpdate = true;
  }, [faceCanvas, faceTexture]);

  // Initial draw on mount
  useEffect(() => {
    renderFace(0, isAnswering);
  }, [renderFace, isAnswering]);

  // 2. Pre-generate HUD Card Textures
  const hudTextures = useMemo(() => {
    if (typeof document === "undefined") return null;
    return {
      understanding: createHudCardTexture("understanding", "UNDERSTANDING"),
      education: createHudCardTexture("education", "EDUCATION"),
      students: createHudCardTexture("students", "STUDENTS"),
      hostel: createHudCardTexture("hostel", "HOSTEL"),
      calls: createHudCardTexture("calls", "CALLS"),
    };
  }, []);

  // 3. Soundwave Ribbon Texture
  const waveTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createWaveRibbonTexture();
  }, []);

  // 4. Floating Capability Cards Positions & Gentle Speeds
  const floatingCards = useMemo(() => {
    return [
      { id: "understanding", radius: 2.15, euler: new THREE.Euler(0.25, 0.35, 0.10, "XYZ"), speed: 0.28, phase: 0.0, key: "understanding" as const },
      { id: "education", radius: 2.30, euler: new THREE.Euler(-0.28, -0.40, 0.18, "XYZ"), speed: 0.24, phase: 1.25, key: "education" as const },
      { id: "students", radius: 2.20, euler: new THREE.Euler(0.40, -0.42, -0.22, "XYZ"), speed: 0.30, phase: 2.51, key: "students" as const },
      { id: "hostel", radius: 2.35, euler: new THREE.Euler(-0.16, 0.55, 0.28, "XYZ"), speed: 0.26, phase: 3.77, key: "hostel" as const },
      { id: "calls", radius: 2.10, euler: new THREE.Euler(-0.38, 0.22, -0.32, "XYZ"), speed: 0.29, phase: 5.02, key: "calls" as const },
    ];
  }, []);

  const tempVec = useMemo(() => new THREE.Vector3(), []);

  // Floating Satellites
  const satellites = useMemo(() => [
    { r: 2.35, angle: 0.5, y: 0.75, size: 0.065, type: "chrome" },
    { r: 2.50, angle: 2.0, y: -0.45, size: 0.055, type: "cyan" },
    { r: 2.20, angle: 3.5, y: 0.90, size: 0.075, type: "glass" },
    { r: 2.55, angle: 4.9, y: -0.65, size: 0.050, type: "chrome" },
    { r: 2.30, angle: 5.8, y: 0.30, size: 0.060, type: "cyan" },
  ], []);

  // Frame animation loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speedMult = isAnswering ? 1.35 : 1.0;

    // Interactive Head Tracking
    if (interactive && rootGroupRef.current) {
      const pointer = state.pointer;
      mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, pointer.x * 0.22, 0.06);
      mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, -pointer.y * 0.15, 0.06);
      rootGroupRef.current.position.y = Math.sin(t * 1.5) * 0.03;
    }

    if (headGroupRef.current) {
      headGroupRef.current.rotation.y = mouseTarget.current.x + Math.sin(t * 0.5) * 0.02;
      headGroupRef.current.rotation.x = mouseTarget.current.y + Math.cos(t * 0.8) * 0.02;
      headGroupRef.current.rotation.z = -mouseTarget.current.x * 0.05;
    }

    // 1. Throttled Smooth Face Rendering (every 30ms)
    if (t - lastFaceUpdate.current > 0.030) {
      lastFaceUpdate.current = t;
      renderFace(t, isAnswering);
    }

    // 2. Soundwave Ribbon Animation
    if (waveTexture && ribbonMeshRef.current) {
      waveTexture.offset.x = (t * 0.15 * speedMult) % 1;
      ribbonMeshRef.current.rotation.y = t * 0.18 * speedMult;
    }

    // 3. Smooth Floating Capability Cards
    floatingCards.forEach((card, idx) => {
      const ref = electronRefs[idx];
      if (ref && ref.current) {
        const angle = t * card.speed * speedMult + card.phase;
        tempVec.set(Math.cos(angle) * card.radius, 0, Math.sin(angle) * card.radius);
        tempVec.applyEuler(card.euler);
        ref.current.position.copy(tempVec);

        // Billboard facing camera
        ref.current.quaternion.copy(state.camera.quaternion);

        // Depth scale
        const depthRatio = (tempVec.z + card.radius) / (card.radius * 2);
        const cardScale = 0.58 + depthRatio * 0.16;
        ref.current.scale.set(cardScale, cardScale, cardScale);
      }
    });

    // 4. Floating Satellites
    if (satellitesRef.current) satellitesRef.current.rotation.y = -t * 0.08;
  });

  return (
    <group ref={rootGroupRef} scale={scale} position={[0, -0.05, 0]}>
      {/* ----------------- MAYA ROBOT (HEAD & CHASSIS) ----------------- */}
      <group ref={headGroupRef} position={[0, 0, 0]}>
        {/* Main Porcelain White Glossy Sphere Helmet (Radius 0.88) */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.88, 64, 64]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.10}
            metalness={0.05}
          />
        </mesh>

        {/* OLED Visor Screen Assembly (Mounted cleanly on front surface at z = 0.89) */}
        {faceTexture && (
          <group position={[0, 0.04, 0.89]}>
            {/* Dark Screen Surface Disc */}
            <mesh>
              <circleGeometry args={[0.55, 64]} />
              <meshBasicMaterial
                map={faceTexture}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Metallic Electric Blue Bezel Frame */}
            <mesh position={[0, 0, 0.005]}>
              <torusGeometry args={[0.555, 0.032, 20, 64]} />
              <meshStandardMaterial
                color="#0284c7"
                emissive="#00f0ff"
                emissiveIntensity={0.6}
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>

            {/* Glowing Neon Cyan Inner Bezel Ring */}
            <mesh position={[0, 0, 0.01]}>
              <torusGeometry args={[0.53, 0.010, 16, 64]} />
              <meshStandardMaterial
                color="#00f0ff"
                emissive="#00f0ff"
                emissiveIntensity={2.4}
              />
            </mesh>

            {/* Visor Bezel Chamfer Collar (bridges screen back to helmet, properly rotated along Z) */}
            <mesh position={[0, 0, -0.07]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.55, 0.57, 0.14, 48, 1, true]} />
              <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
        )}

        {/* Forehead Brow Visor Hood Accent (Symmetric centered arc) */}
        <mesh position={[0, 0.44, 0.66]} rotation={[-0.15, 0, 0.2 * Math.PI]}>
          <torusGeometry args={[0.56, 0.036, 16, 48, Math.PI * 0.6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.10} metalness={0.05} />
        </mesh>

        {/* Curved Chin Microphone Boom (Symmetric centered arc) */}
        <mesh position={[0, -0.52, 0.65]} rotation={[Math.PI * 0.35, 0, 1.2 * Math.PI]}>
          <torusGeometry args={[0.42, 0.020, 16, 32, Math.PI * 0.6]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#00f0ff"
            emissiveIntensity={0.8}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>
        {/* Chin Mic Glowing Tip Accent */}
        <mesh position={[0, -0.66, 0.72]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3.2} />
        </mesh>

        {/* ----------------- LEFT AUDIO POD / HEADPHONE (Oriented along X-axis) ----------------- */}
        <group position={[-0.88, 0.04, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.32, 0.20, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.10} metalness={0.08} />
          </mesh>
          <mesh position={[-0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.12, 32]} />
            <meshStandardMaterial color="#0284c7" roughness={0.18} metalness={0.95} />
          </mesh>
          <mesh position={[-0.12, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.20, 0.020, 16, 32]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={isAnswering ? 2.5 : 1.8}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[-0.12, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.2} />
          </mesh>
        </group>

        {/* ----------------- RIGHT AUDIO POD / HEADPHONE (Oriented along X-axis) ----------------- */}
        <group position={[0.88, 0.04, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.32, 0.20, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.10} metalness={0.08} />
          </mesh>
          <mesh position={[0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.12, 32]} />
            <meshStandardMaterial color="#0284c7" roughness={0.18} metalness={0.95} />
          </mesh>
          <mesh position={[0.12, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.20, 0.020, 16, 32]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={isAnswering ? 2.5 : 1.8}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0.12, 0, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.2} />
          </mesh>
        </group>

        {/* Overhead Headband Metallic Arch (Tilted backward over top of helmet, completely clear of brow) */}
        <mesh position={[0, 0.04, -0.08]} rotation={[-0.22, 0, 0]}>
          <torusGeometry args={[0.89, 0.036, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.04, -0.08]} rotation={[-0.22, 0, 0]}>
          <torusGeometry args={[0.90, 0.010, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* ----------------- FLOWING GLOWING SOUNDWAVE RIBBON ----------------- */}
      {waveTexture && (
        <group ref={soundWaveGroupRef} position={[0, -0.45, 0]} rotation={[0.22, 0, -0.05]}>
          {/* Main Translucent Wave Ribbon */}
          <mesh ref={ribbonMeshRef}>
            <cylinderGeometry args={[1.40, 1.40, 0.34, 64, 1, true]} />
            <meshStandardMaterial
              map={waveTexture}
              emissiveMap={waveTexture}
              emissive="#00f0ff"
              emissiveIntensity={isAnswering ? 2.2 : 1.5}
              transparent
              opacity={0.88}
              side={THREE.DoubleSide}
              roughness={0.1}
            />
          </mesh>

          {/* Top & Bottom Glowing Ring Guides */}
          <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.40, 0.007, 16, 80]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.0} />
          </mesh>
          <mesh position={[0, -0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.40, 0.007, 16, 80]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.8} />
          </mesh>
        </group>
      )}

      {/* ----------------- 5 FLOATING CAPABILITY HUD CARDS (Clean, Orbit-Free) ----------------- */}
      {hudTextures && floatingCards.map((card, idx) => (
        <group key={card.id} ref={electronRefs[idx]}>
          {/* Glowing Particle Bead */}
          <mesh position={[-0.42, 0, 0.02]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3.5} />
          </mesh>
          {/* High-Contrast Frosted HUD Card */}
          <mesh>
            <planeGeometry args={[0.84, 0.44]} />
            <meshBasicMaterial map={hudTextures[card.key]} transparent opacity={0.98} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* ----------------- FLOATING GLOSSY SATELLITES ----------------- */}
      <group ref={satellitesRef}>
        {satellites.map((sat, idx) => {
          const x = Math.cos(sat.angle) * sat.r;
          const z = Math.sin(sat.angle) * sat.r;
          return (
            <mesh key={idx} position={[x, sat.y, z]}>
              <sphereGeometry args={[sat.size, 20, 20]} />
              {sat.type === "chrome" ? (
                <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
              ) : sat.type === "cyan" ? (
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.5} />
              ) : (
                <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.9} metalness={0.8} roughness={0.2} transparent opacity={0.85} />
              )}
            </mesh>
          );
        })}
      </group>

      {/* ----------------- FLOOR HOLOGRAPHIC RIPPLE RINGS ----------------- */}
      <group position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[0.85, 0.89, 48]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.35, 1.38, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.22} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
