"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Cloud, OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Fantasy Castle (Town Hall inspired) ──────────────────────────
function Castle() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Main tower base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3, 2.5, 3]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Stone pattern overlay */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.02, 2.52, 3.02]} />
        <meshStandardMaterial color="#6D4C41" roughness={0.9} wireframe={false} transparent opacity={0} />
      </mesh>

      {/* Central tall tower */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <cylinderGeometry args={[0.9, 1.1, 4, 8]} />
        <meshStandardMaterial color="#4E342E" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Tower cone roof */}
      <mesh position={[0, 6.2, 0]} castShadow>
        <coneGeometry args={[1.2, 2, 8]} />
        <meshStandardMaterial color="#1A237E" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Gold crown on tower */}
      <mesh position={[0, 7.4, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.5, 6]} />
        <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.9} emissive="#F5A623" emissiveIntensity={0.5} />
      </mesh>

      {/* Flag */}
      <mesh position={[0, 8.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.8, 4]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
      <mesh position={[0.3, 8.6, 0]}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshStandardMaterial color="#FFD700" side={THREE.DoubleSide} />
      </mesh>

      {/* Side turrets */}
      {[[-1.8, 0], [1.8, 0], [0, -1.8], [0, 1.8]].map(([x, z], i) => (
        <group key={i} position={[x as number, 2, z as number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.55, 0.65, 2.5, 6]} />
            <meshStandardMaterial color="#4E342E" roughness={0.7} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <coneGeometry args={[0.7, 1.2, 6]} />
            <meshStandardMaterial color="#1565C0" roughness={0.5} metalness={0.2} />
          </mesh>
          {/* Merlon battlements */}
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <mesh key={j} position={[
              Math.cos((j / 6) * Math.PI * 2) * 0.5,
              1.4,
              Math.sin((j / 6) * Math.PI * 2) * 0.5
            ]}>
              <boxGeometry args={[0.18, 0.35, 0.18]} />
              <meshStandardMaterial color="#5D4037" roughness={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Walls connecting turrets */}
      {[
        { pos: [-0.9, 1.2, -1.8], rot: 0 },
        { pos: [0.9, 1.2, -1.8], rot: 0 },
        { pos: [-1.8, 1.2, -0.9], rot: Math.PI / 2 },
        { pos: [-1.8, 1.2, 0.9], rot: Math.PI / 2 },
        { pos: [0.9, 1.2, 1.8], rot: 0 },
        { pos: [-0.9, 1.2, 1.8], rot: 0 },
        { pos: [1.8, 1.2, 0.9], rot: Math.PI / 2 },
        { pos: [1.8, 1.2, -0.9], rot: Math.PI / 2 },
      ].map(({ pos, rot }, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, rot, 0]}>
          <boxGeometry args={[0.9, 1.2, 0.3]} />
          <meshStandardMaterial color="#5D4037" roughness={0.8} />
        </mesh>
      ))}

      {/* Gate arch */}
      <mesh position={[0, 0.5, 1.55]}>
        <boxGeometry args={[1, 1.5, 0.2]} />
        <meshStandardMaterial color="#3E2723" roughness={0.9} />
      </mesh>

      {/* Windows (glowing) */}
      {[[0.8, 1.2, 1.51], [-0.8, 1.2, 1.51], [0, 4.2, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.35, 0.5, 0.05]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#F5A623"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Floating Island ────────────────────────────────────────────────
function FloatingIsland() {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Main grass top */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[6, 5.5, 0.8, 16]} />
        <meshStandardMaterial color="#2D7A3A" roughness={0.9} />
      </mesh>
      {/* Stone bottom */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[5.5, 3, 2.5, 12]} />
        <meshStandardMaterial color="#5D4037" roughness={0.95} />
      </mesh>
      {/* Rocky bottom tip */}
      <mesh position={[0, -3.2, 0]}>
        <coneGeometry args={[3, 2, 8]} />
        <meshStandardMaterial color="#4E342E" roughness={0.9} />
      </mesh>

      {/* Trees */}
      {[
        [-3.5, 0.7, 1.5],
        [3.2, 0.7, 1],
        [-2.8, 0.7, -2.5],
        [3.8, 0.7, -2],
        [-4.2, 0.7, -0.5],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.18, 0.9, 6]} />
            <meshStandardMaterial color="#5D4037" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.5 + Math.random() * 0.2, 1.2, 6]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#2D7A3A" : "#388E3C"} roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[0.35, 1, 6]} />
            <meshStandardMaterial color="#43A047" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Rocks */}
      {[
        [2.5, 0.3, 2.8, 0.4, 0.25, 0.35],
        [-2, 0.3, 3, 0.35, 0.22, 0.3],
        [4.5, 0.25, 1.5, 0.3, 0.18, 0.25],
      ].map(([x, y, z, sx, sy, sz], i) => (
        <mesh key={i} position={[x, y, z] as [number,number,number]}>
          <dodecahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.9} />
        </mesh>
      ))}

      {/* Defensive wall segment */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.6, 3.5]}>
          <boxGeometry args={[1.05, 0.9, 0.3]} />
          <meshStandardMaterial color="#5D4037" roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

// ── Characters ────────────────────────────────────────────────────
function Warrior({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.05;
    }
  });
  return (
    <group ref={ref} position={position} scale={0.5}>
      {/* Body */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 1.2, 8]} />
        <meshStandardMaterial color="#B71C1C" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.32, 8, 8]} />
        <meshStandardMaterial color="#FFCCBC" roughness={0.5} />
      </mesh>
      {/* Helmet */}
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.34, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#B8860B" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Sword */}
      <mesh position={[0.55, 1.2, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.08, 1.2, 0.06]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

function Wizard({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6) * 0.07;
    if (orbRef.current) {
      (orbRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.5 + Math.sin(clock.elapsedTime * 3) * 0.8;
    }
  });

  return (
    <group ref={ref} position={position} scale={0.5}>
      {/* Robe */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 1.6, 8]} />
        <meshStandardMaterial color="#1A237E" roughness={0.7} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#FFCCBC" roughness={0.5} />
      </mesh>
      {/* Hat */}
      <mesh position={[0, 2.35, 0]}>
        <coneGeometry args={[0.32, 0.7, 8]} />
        <meshStandardMaterial color="#311B92" roughness={0.6} />
      </mesh>
      {/* Magic orb */}
      <mesh ref={orbRef} position={[0.7, 1.5, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial
          color="#42A5F5"
          emissive="#1565C0"
          emissiveIntensity={2}
          transparent
          opacity={0.85}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function Archer({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.7 + 1.5) * 0.04;
    }
  });
  return (
    <group ref={ref} position={position} scale={0.48}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 1.2, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.28, 8, 8]} />
        <meshStandardMaterial color="#FFCCBC" roughness={0.5} />
      </mesh>
      {/* Bow */}
      <mesh position={[0.5, 1.3, 0]} rotation={[0, 0, 0.2]}>
        <torusGeometry args={[0.4, 0.04, 8, 16, Math.PI * 1.4]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ── Floating Particles ────────────────────────────────────────────
function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFD700"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// ── Main Scene ────────────────────────────────────────────────────
function Scene3D() {
  return (
    <Float speed={0.4} rotationIntensity={0} floatIntensity={0.3}>
      <FloatingIsland />
      <Castle />
      <Warrior position={[-3.8, 0.2, 2.5]} />
      <Archer position={[3.5, 0.2, 2]} />
      <Wizard position={[4.5, 0.5, -1.5]} />
      <Warrior position={[-4.8, 0.2, -1]} />
    </Float>
  );
}

// ── WebGL Fallback ────────────────────────────────────────────────
export function SceneFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Stylised static castle illustration */}
      <div className="relative">
        <div className="w-40 h-40 mx-auto bg-gradient-to-b from-[#4E342E] to-[#3E2723] rounded-lg shadow-2xl flex items-center justify-center border-2 border-[rgba(245,166,35,0.3)]">
          <div className="text-6xl select-none">🏰</div>
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3 text-3xl select-none">
          <span>⚔️</span><span>🧙</span><span>🏹</span>
        </div>
      </div>
    </div>
  );
}

// ── Exported Canvas Component ─────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 4, 14], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      shadows
      aria-label="3D fantasy castle scene"
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#FFF5CC"
      />
      <pointLight position={[-6, 6, 4]} intensity={1.2} color="#42A5F5" />
      <pointLight position={[0, 8, 0]} intensity={0.8} color="#FFD700" distance={20} />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#F5A623" distance={8} />

      {/* Background */}
      <color attach="background" args={["#0F1E10"]} />
      <fog attach="fog" args={["#0F1E10", 18, 40]} />

      {/* Stars */}
      <Stars radius={60} depth={30} count={1000} factor={3} saturation={0.2} fade speed={0.5} />

      {/* Clouds */}
      <Cloud position={[-8, 6, -5]} speed={0.2} opacity={0.15} scale={2} />
      <Cloud position={[8, 7, -6]} speed={0.15} opacity={0.12} scale={1.5} />

      {/* Main scene */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Particles */}
      <Particles />

      {/* Subtle orbit for cinematic feel - disabled to avoid distraction */}
    </Canvas>
  );
}

