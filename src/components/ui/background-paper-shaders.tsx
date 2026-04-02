import { useMemo, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;
    
    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity * 0.35);
    
    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = pow(max(glow, 0.0), 2.0);
    
    gl_FragColor = vec4(color * glow, glow * 0.75);
  }
`;

export function ShaderPlane({
  position,
  scale = [2.8, 2.8, 1],
  color1 = "#6366f1",
  color2 = "#0b1220",
}: {
  position: [number, number, number];
  scale?: [number, number, number];
  color1?: string;
  color2?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2],
  );

  useFrame((state) => {
    uniforms.time.value = state.clock.elapsedTime;
    uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.25;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <planeGeometry args={[2, 2, 48, 48]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function EnergyRing({
  radius = 1,
  position = [0, 0, 0],
}: {
  radius?: number;
  position?: [number, number, number];
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.z = state.clock.elapsedTime * 0.35;
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.82, radius, 64]} />
      <meshBasicMaterial color="#818cf8" transparent opacity={0.45} side={THREE.DoubleSide} />
    </mesh>
  );
}

function R3FScene() {
  return (
    <>
      <ShaderPlane position={[0, 0, 0]} color1="#6366f1" color2="#121a2c" />
      <EnergyRing radius={1.35} position={[0, 0, -0.15]} />
    </>
  );
}

/** Fond R3F (plan shader + anneau) — pour comparaison / démo. */
export function PaperR3FBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("h-full min-h-dvh w-full", className)}>
      <Canvas
        camera={{ position: [0, 0, 2.4], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <R3FScene />
      </Canvas>
    </div>
  );
}

/** Fond @paper-design (mesh gradient) — couleurs Webmo, défaut pour la landing. */
export function PaperMeshGradientBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full min-h-dvh w-full overflow-hidden bg-ink-900", className)}>
      <MeshGradient
        className="pointer-events-none absolute inset-0 h-full w-full min-h-full"
        speed={0.34}
        colors={["#020203", "#030406", "#050709", "#070b10", "#0a0f16", "#0c121a"]}
        distortion={0.52}
        swirl={0.07}
        grainMixer={0.05}
        grainOverlay={0.03}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/58 via-black/48 to-black/62"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-ink-900/30" aria-hidden />
    </div>
  );
}
