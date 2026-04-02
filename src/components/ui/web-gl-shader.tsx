import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type SceneRefs = {
  scene: THREE.Scene | null;
  camera: THREE.OrthographicCamera | null;
  renderer: THREE.WebGLRenderer | null;
  mesh: THREE.Mesh | null;
  uniforms: {
    resolution: { value: THREE.Vector2 };
    time: { value: number };
    xScale: { value: number };
    yScale: { value: number };
    distortion: { value: number };
  } | null;
};

export function WebGLShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const refs = sceneRef.current;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 res = resolution;
        vec2 p = (gl_FragCoord.xy * 2.0 - res) / min(res.x, res.y);

        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        vec3 rgb = vec3(r, g, b);
        rgb *= vec3(0.14, 0.16, 0.42);
        gl_FragColor = vec4(rgb, 1.0);
      }
    `;

    const initScene = () => {
      refs.scene = new THREE.Scene();
      refs.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.setClearColor(new THREE.Color(0x050709), 1);

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      refs.uniforms = {
        resolution: { value: new THREE.Vector2(1, 1) },
        time: { value: 0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      };

      const position = new Float32Array([
        -1, -1, 0, 1, -1, 0, -1, 1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0,
      ]);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(position, 3));

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      });

      refs.mesh = new THREE.Mesh(geometry, material);
      refs.scene.add(refs.mesh);

      handleResize();
    };

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (refs.uniforms) refs.uniforms.time.value += 0.01;
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
    };

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      refs.renderer.setSize(w, h, false);
      refs.uniforms.resolution.value.set(w, h);
    };

    initScene();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh);
        refs.mesh.geometry.dispose();
        const mat = refs.mesh.material;
        if (mat instanceof THREE.Material) mat.dispose();
      }
      refs.renderer?.dispose();
      refs.scene = null;
      refs.camera = null;
      refs.renderer = null;
      refs.mesh = null;
      refs.uniforms = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed left-0 top-0 block h-full w-full", className)}
    />
  );
}

/** Calque plein écran pour la landing (pointer-events désactivés côté parent). */
export function WebGLShaderBackdrop({ className }: { className?: string }) {
  return <WebGLShader className={cn("min-h-dvh", className)} />;
}
