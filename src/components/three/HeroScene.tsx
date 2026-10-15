"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * WebGL hero centrepiece: a chrome dumbbell orbited by loose plates and a
 * kettlebell, drifting through a field of embers. Built entirely from
 * primitives + a procedural studio environment, so it needs no model or HDR
 * downloads. Rendering pauses whenever the canvas scrolls out of view.
 */

const CRIMSON = "#ff2d2d";
const GOLD = "#f5c518";

/**
 * Deterministic PRNG (mulberry32). Keeps render pure — the ember field and
 * float phases are identical on every render instead of reshuffling.
 */
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Shared pointer position in normalised device coords (-1..1). */
const pointer = { x: 0, y: 0 };

/** Bakes a procedural studio room into an env map for metal reflections. */
function createStudioEnvironment(gl: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(gl);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return env;
}

function useMaterials() {
  return useMemo(
    () => ({
      chrome: new THREE.MeshStandardMaterial({
        color: "#e8edf5",
        metalness: 1,
        roughness: 0.16,
      }),
      knurl: new THREE.MeshStandardMaterial({
        color: "#b8c2d1",
        metalness: 1,
        roughness: 0.42,
      }),
      rubber: new THREE.MeshPhysicalMaterial({
        color: "#11151d",
        metalness: 0.35,
        roughness: 0.38,
        clearcoat: 1,
        clearcoatRoughness: 0.25,
      }),
      crimson: new THREE.MeshStandardMaterial({
        color: CRIMSON,
        emissive: CRIMSON,
        emissiveIntensity: 0.55,
        metalness: 0.6,
        roughness: 0.3,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: GOLD,
        emissive: "#7a5d00",
        emissiveIntensity: 0.25,
        metalness: 1,
        roughness: 0.22,
      }),
    }),
    [],
  );
}

type Materials = ReturnType<typeof useMaterials>;

/** A bumper plate: rubber disc, chrome hub, glowing crimson rim. */
function Plate({
  radius,
  width,
  materials,
  rim = "crimson",
}: {
  radius: number;
  width: number;
  materials: Materials;
  rim?: "crimson" | "gold";
}) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh material={materials.rubber}>
        <cylinderGeometry args={[radius, radius, width, 64]} />
      </mesh>
      <mesh material={materials.chrome}>
        <cylinderGeometry args={[radius * 0.32, radius * 0.32, width * 1.08, 48]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={materials[rim]}>
        <torusGeometry args={[radius * 0.995, width * 0.12, 16, 96]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.knurl}>
        <torusGeometry args={[radius * 0.62, width * 0.06, 12, 80]} />
      </mesh>
    </group>
  );
}

function Dumbbell({ materials }: { materials: Materials }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    group.rotation.y += delta * 0.35;
    // Ease toward the pointer for a responsive but weighty feel.
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      -0.35 + pointer.y * 0.35,
      0.05,
    );
    group.rotation.z = THREE.MathUtils.lerp(
      group.rotation.z,
      0.38 - pointer.x * 0.3,
      0.05,
    );
    group.position.y = Math.sin(t * 0.9) * 0.12;
  });

  const side = (dir: 1 | -1) => (
    <group position={[dir * 1.25, 0, 0]}>
      <group position={[dir * -0.12, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={materials.chrome}>
          <cylinderGeometry args={[0.26, 0.26, 0.12, 40]} />
        </mesh>
      </group>
      <group position={[dir * 0.08, 0, 0]}>
        <Plate radius={1.05} width={0.24} materials={materials} />
      </group>
      <group position={[dir * 0.36, 0, 0]}>
        <Plate radius={0.82} width={0.2} materials={materials} rim="gold" />
      </group>
      <group position={[dir * 0.6, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={materials.chrome}>
          <cylinderGeometry args={[0.2, 0.2, 0.16, 40]} />
        </mesh>
      </group>
      {/* Loading sleeve running through the plates */}
      <group position={[dir * 0.3, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={materials.chrome}>
          <cylinderGeometry args={[0.14, 0.14, 1.0, 32]} />
        </mesh>
      </group>
    </group>
  );

  return (
    <group ref={ref} rotation={[-0.35, 0.6, 0.38]} scale={1.05}>
      {/* Knurled handle */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={materials.knurl}>
        <cylinderGeometry args={[0.11, 0.11, 2.2, 32]} />
      </mesh>
      {[-0.55, -0.18, 0.18, 0.55].map((x) => (
        <mesh
          key={x}
          position={[x, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.chrome}
        >
          <cylinderGeometry args={[0.122, 0.122, 0.04, 32]} />
        </mesh>
      ))}
      {side(1)}
      {side(-1)}
    </group>
  );
}

function Kettlebell({ materials }: { materials: Materials }) {
  return (
    <group>
      <mesh material={materials.rubber}>
        <sphereGeometry args={[0.5, 48, 48]} />
      </mesh>
      <mesh position={[0, -0.42, 0]} material={materials.rubber}>
        <cylinderGeometry args={[0.32, 0.36, 0.12, 40]} />
      </mesh>
      <mesh position={[0, 0.38, 0]} material={materials.chrome}>
        <torusGeometry args={[0.3, 0.07, 20, 64, Math.PI]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.crimson}>
        <torusGeometry args={[0.5, 0.025, 12, 80]} />
      </mesh>
    </group>
  );
}

/** Slow orbiting/bobbing wrapper for the satellite objects. */
function Floater({
  children,
  position,
  speed = 1,
  spin = 0.4,
  phase = 0,
}: {
  children: ReactNode;
  position: [number, number, number];
  speed?: number;
  spin?: number;
  /** Offsets the bob cycle so satellites don't move in lockstep. */
  phase?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    const t = state.clock.elapsedTime * speed + phase;
    group.position.y = position[1] + Math.sin(t) * 0.25;
    group.position.x = position[0] + pointer.x * 0.25;
    group.rotation.x += delta * spin * 0.6;
    group.rotation.y += delta * spin;
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

function Embers({ count = 380 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const random = seeded(count);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const red = new THREE.Color(CRIMSON);
    const gold = new THREE.Color(GOLD);
    const white = new THREE.Color("#ffffff");
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() - 0.5) * 14;
      positions[i * 3 + 1] = (random() - 0.5) * 9;
      positions[i * 3 + 2] = (random() - 0.5) * 8 - 1;
      const roll = random();
      const c = roll < 0.55 ? red : roll < 0.85 ? gold : white;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    const points = ref.current;
    if (!points) return;
    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const y = (arr[i * 3 + 1] ?? 0) + delta * (0.15 + (i % 7) * 0.03);
      arr[i * 3 + 1] = y > 4.5 ? -4.5 : y;
    }
    attr.needsUpdate = true;
    points.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/** Pulls the camera gently toward the pointer for a parallax feel. */
function CameraRig() {
  useFrame((state) => {
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, pointer.x * 0.6, 0.04);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, pointer.y * 0.4, 0.04);
    cam.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  const materials = useMaterials();
  const { size } = useThree();
  const compact = size.width < 640;

  useEffect(
    () => () => Object.values(materials).forEach((m) => m.dispose()),
    [materials],
  );

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-5, -1, 3]} intensity={30} color={CRIMSON} />
      <pointLight position={[5, 2, -2]} intensity={18} color={GOLD} />

      <group scale={compact ? 0.72 : 1}>
        <Dumbbell materials={materials} />

        <Floater position={[-2.9, 1.6, -1.2]} speed={0.8} spin={0.5}>
          <group scale={0.55}>
            <Plate radius={1} width={0.22} materials={materials} />
          </group>
        </Floater>
        <Floater position={[2.8, -1.7, -0.6]} speed={1.1} spin={0.3} phase={2.1}>
          <group scale={0.8}>
            <Kettlebell materials={materials} />
          </group>
        </Floater>
        <Floater position={[2.6, 1.9, -2.4]} speed={0.6} spin={0.7} phase={4.2}>
          <group scale={0.4}>
            <Plate radius={1} width={0.22} materials={materials} rim="gold" />
          </group>
        </Floater>
      </group>

      <Embers count={compact ? 180 : 380} />
      <CameraRig />
    </>
  );
}

export default function HeroScene({ className }: { className?: string }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const envMap = useRef<THREE.Texture | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => () => envMap.current?.dispose(), []);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry?.isIntersecting ?? true),
    );
    observer.observe(el);

    const onMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapper} className={className}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
          envMap.current = createStudioEnvironment(gl);
          scene.environment = envMap.current;
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
