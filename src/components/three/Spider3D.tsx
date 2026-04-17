import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Spider3DProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

const Spider3D = ({ position, scale = 1, speed = 1, mouse }: Spider3DProps) => {
  const group = useRef<THREE.Group>(null);
  const legsRef = useRef<THREE.Group[]>([]);
  const basePos = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * speed;

    // Smooth cursor follow with parallax
    const targetX = basePos.current.x + mouse.current.x * 0.6;
    const targetY = basePos.current.y + mouse.current.y * 0.4 + Math.sin(t * 0.5) * 0.15;
    group.current.position.x += (targetX - group.current.position.x) * 0.02;
    group.current.position.y += (targetY - group.current.position.y) * 0.02;

    // Subtle body sway
    group.current.rotation.z = Math.sin(t * 0.4) * 0.08;
    group.current.rotation.y = mouse.current.x * 0.3;

    // Animate legs
    legsRef.current.forEach((leg, i) => {
      if (leg) {
        const phase = i * 0.5;
        leg.rotation.z = Math.sin(t * 2 + phase) * 0.25;
      }
    });
  });

  // 8 legs in 4 pairs
  const legs = Array.from({ length: 8 }, (_, i) => {
    const side = i % 2 === 0 ? 1 : -1;
    const row = Math.floor(i / 2);
    const baseAngle = (row - 1.5) * 0.35;
    return { side, row, baseAngle, index: i };
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Hanging thread */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 4, 4]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} />
      </mesh>

      {/* Abdomen */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.4}
          metalness={0.3}
          emissive="#3b0764"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.4}
          metalness={0.3}
          emissive="#4c1d95"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Glowing eyes */}
      <mesh position={[0.05, 0.15, 0.1]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color="#c084fc" />
      </mesh>
      <mesh position={[-0.05, 0.15, 0.1]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color="#c084fc" />
      </mesh>

      {/* Legs */}
      {legs.map((l) => (
        <group
          key={l.index}
          ref={(el) => el && (legsRef.current[l.index] = el)}
          position={[l.side * 0.12, 0, 0]}
          rotation={[0, 0, l.side * (Math.PI / 2.5) + l.baseAngle * l.side]}
        >
          <mesh position={[l.side * 0.18, 0.05, 0]}>
            <cylinderGeometry args={[0.012, 0.008, 0.4, 6]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
          </mesh>
          <mesh position={[l.side * 0.36, -0.05, 0]} rotation={[0, 0, l.side * -0.6]}>
            <cylinderGeometry args={[0.008, 0.005, 0.35, 6]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default Spider3D;
