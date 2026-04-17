import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Ghost3DProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
  speed?: number;
  followStrength?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

const Ghost3D = ({
  position,
  color = "#a78bfa",
  scale = 1,
  speed = 1,
  followStrength = 0.3,
  mouse,
}: Ghost3DProps) => {
  const group = useRef<THREE.Group>(null);
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);
  const offsetSeed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime * speed + offsetSeed;

    const targetX = basePos.x + mouse.current.x * followStrength + Math.sin(t * 0.3) * 0.4;
    const targetY = basePos.y + mouse.current.y * followStrength * 0.7 + Math.cos(t * 0.4) * 0.3;
    const targetZ = basePos.z + Math.sin(t * 0.2) * 0.5;

    group.current.position.x += (targetX - group.current.position.x) * 0.015;
    group.current.position.y += (targetY - group.current.position.y) * 0.015;
    group.current.position.z += (targetZ - group.current.position.z) * 0.015;

    // Pulse opacity
    const mat = (group.current.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
    if (mat) mat.opacity = 0.18 + Math.sin(t * 1.2) * 0.08;

    group.current.rotation.z = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Soft glowing core */}
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} depthWrite={false} />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} />
      </mesh>
      {/* Bright center */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} depthWrite={false} />
      </mesh>
    </group>
  );
};

export default Ghost3D;
