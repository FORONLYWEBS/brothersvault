import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Spider3DProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

/**
 * Realistic 3D spider:
 * - Two-segment body (cephalothorax + flattened abdomen with subtle pattern)
 * - 8 jointed legs, each with coxa, femur, tibia, tarsus (4 segments) connected via pivot groups
 * - Chelicerae (fangs) and pedipalps near mouth
 * - 8 emissive eyes (2 rows, classic spider arrangement)
 */
const Spider3D = ({ position, scale = 1, speed = 1, mouse }: Spider3DProps) => {
  const group = useRef<THREE.Group>(null);
  const coxaRefs = useRef<THREE.Group[]>([]);
  const tibiaRefs = useRef<THREE.Group[]>([]);
  const basePos = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * speed;

    // Smooth cursor follow w/ subtle bob
    const targetX = basePos.current.x + mouse.current.x * 0.6;
    const targetY = basePos.current.y + mouse.current.y * 0.4 + Math.sin(t * 0.5) * 0.12;
    group.current.position.x += (targetX - group.current.position.x) * 0.025;
    group.current.position.y += (targetY - group.current.position.y) * 0.025;

    group.current.rotation.z = Math.sin(t * 0.4) * 0.06;
    group.current.rotation.y = mouse.current.x * 0.25;

    // Animate coxa (shoulder swing) and tibia (knee bend) for walking gait
    coxaRefs.current.forEach((coxa, i) => {
      if (!coxa) return;
      const phase = i * 0.6;
      coxa.rotation.z = Math.sin(t * 2.2 + phase) * 0.18;
      coxa.rotation.y = Math.cos(t * 2.2 + phase) * 0.1;
    });
    tibiaRefs.current.forEach((tibia, i) => {
      if (!tibia) return;
      const phase = i * 0.6;
      // Knee flexes — never goes "wrong way"
      tibia.rotation.z = -0.6 + Math.sin(t * 2.2 + phase) * 0.25;
    });
  });

  // 8 legs: 4 per side, fanned around the cephalothorax
  const legConfigs = Array.from({ length: 8 }, (_, i) => {
    const side: 1 | -1 = i % 2 === 0 ? 1 : -1;
    const row = Math.floor(i / 2); // 0..3
    // Spread legs from front (-) to back (+)
    const yawDeg = -55 + row * 35; // -55, -20, 15, 50
    const yaw = (yawDeg * Math.PI) / 180;
    return { side, row, yaw, index: i };
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Hanging silk thread */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 4, 4]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
      </mesh>

      {/* ABDOMEN — flattened ellipsoid, rear */}
      <mesh position={[0, -0.22, 0]} scale={[0.95, 1.1, 0.85]} castShadow>
        <sphereGeometry args={[0.26, 24, 20]} />
        <meshStandardMaterial
          color="#070707"
          roughness={0.55}
          metalness={0.25}
          emissive="#2a0a4a"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Abdomen highlight stripe (dorsal pattern) */}
      <mesh position={[0, -0.12, 0.18]} scale={[0.04, 0.18, 0.02]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#5b21b6" emissive="#5b21b6" emissiveIntensity={0.4} />
      </mesh>

      {/* CEPHALOTHORAX — slightly raised, in front of abdomen */}
      <mesh position={[0, 0.05, 0.05]} scale={[0.85, 0.7, 0.9]} castShadow>
        <sphereGeometry args={[0.18, 20, 18]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.45}
          metalness={0.35}
          emissive="#3b0764"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* CHELICERAE / FANGS — two small downward-pointing cones at front */}
      <mesh position={[0.04, -0.02, 0.18]} rotation={[Math.PI * 0.55, 0, 0.15]}>
        <coneGeometry args={[0.018, 0.07, 8]} />
        <meshStandardMaterial color="#020202" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-0.04, -0.02, 0.18]} rotation={[Math.PI * 0.55, 0, -0.15]}>
        <coneGeometry args={[0.018, 0.07, 8]} />
        <meshStandardMaterial color="#020202" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* PEDIPALPS — small "mini-legs" beside fangs */}
      {[1, -1].map((s) => (
        <mesh
          key={`palp-${s}`}
          position={[s * 0.07, -0.02, 0.16]}
          rotation={[0.6, 0, s * 0.5]}
        >
          <cylinderGeometry args={[0.008, 0.005, 0.1, 6]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
        </mesh>
      ))}

      {/* 8 EYES — 2 rows, classic arrangement, glowing */}
      {/* Anterior median (largest central pair) */}
      <mesh position={[0.03, 0.08, 0.18]}>
        <sphereGeometry args={[0.022, 10, 10]} />
        <meshBasicMaterial color="#d8b4fe" />
      </mesh>
      <mesh position={[-0.03, 0.08, 0.18]}>
        <sphereGeometry args={[0.022, 10, 10]} />
        <meshBasicMaterial color="#d8b4fe" />
      </mesh>
      {/* Anterior lateral */}
      <mesh position={[0.07, 0.07, 0.16]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#c084fc" />
      </mesh>
      <mesh position={[-0.07, 0.07, 0.16]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#c084fc" />
      </mesh>
      {/* Posterior median (slightly higher/back) */}
      <mesh position={[0.025, 0.13, 0.14]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      <mesh position={[-0.025, 0.13, 0.14]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      {/* Posterior lateral */}
      <mesh position={[0.075, 0.12, 0.13]}>
        <sphereGeometry args={[0.011, 8, 8]} />
        <meshBasicMaterial color="#9333ea" />
      </mesh>
      <mesh position={[-0.075, 0.12, 0.13]}>
        <sphereGeometry args={[0.011, 8, 8]} />
        <meshBasicMaterial color="#9333ea" />
      </mesh>

      {/* LEGS — each with coxa pivot at body, femur out, knee pivot, tibia + tarsus */}
      {legConfigs.map((cfg) => {
        const femurLen = 0.32;
        const tibiaLen = 0.28;
        const tarsusLen = 0.18;
        return (
          <group
            key={cfg.index}
            position={[cfg.side * 0.14, 0.02, 0]}
            rotation={[0, cfg.yaw * cfg.side, 0]}
          >
            {/* Coxa pivot — animated swing */}
            <group ref={(el) => el && (coxaRefs.current[cfg.index] = el)}>
              {/* Femur — extends outward, slightly angled up */}
              <group rotation={[0, 0, cfg.side * 0.4]}>
                <mesh position={[cfg.side * femurLen * 0.5, femurLen * 0.18, 0]} rotation={[0, 0, cfg.side * 0.35]}>
                  <cylinderGeometry args={[0.014, 0.011, femurLen, 8]} />
                  <meshStandardMaterial color="#0d0d0d" roughness={0.55} metalness={0.2} />
                </mesh>
                {/* Knee joint */}
                <mesh position={[cfg.side * femurLen * 0.95, femurLen * 0.32, 0]}>
                  <sphereGeometry args={[0.016, 10, 10]} />
                  <meshStandardMaterial color="#050505" roughness={0.4} />
                </mesh>

                {/* Tibia + tarsus group, pivoting at knee */}
                <group
                  position={[cfg.side * femurLen * 0.95, femurLen * 0.32, 0]}
                  ref={(el) => el && (tibiaRefs.current[cfg.index] = el)}
                  rotation={[0, 0, -0.6]}
                >
                  {/* Tibia — bends back outward and down */}
                  <mesh position={[cfg.side * tibiaLen * 0.5, -tibiaLen * 0.35, 0]} rotation={[0, 0, cfg.side * -0.7]}>
                    <cylinderGeometry args={[0.011, 0.008, tibiaLen, 8]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
                  </mesh>
                  {/* Ankle */}
                  <mesh position={[cfg.side * tibiaLen * 0.95, -tibiaLen * 0.7, 0]}>
                    <sphereGeometry args={[0.012, 8, 8]} />
                    <meshStandardMaterial color="#050505" roughness={0.4} />
                  </mesh>
                  {/* Tarsus (foot) — points down */}
                  <mesh
                    position={[cfg.side * (tibiaLen * 0.95 + tarsusLen * 0.25), -tibiaLen * 0.7 - tarsusLen * 0.45, 0]}
                    rotation={[0, 0, cfg.side * -1.1]}
                  >
                    <cylinderGeometry args={[0.008, 0.004, tarsusLen, 8]} />
                    <meshStandardMaterial color="#080808" roughness={0.7} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        );
      })}
    </group>
  );
};

export default Spider3D;
