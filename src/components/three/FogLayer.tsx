import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FogLayerProps {
  z?: number;
  color?: string;
  speed?: number;
  opacity?: number;
}

const FogLayer = ({ z = -2, color = "#4c1d95", speed = 0.05, opacity = 0.15 }: FogLayerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.x = Math.sin(t * speed) * 3;
    meshRef.current.position.y = Math.cos(t * speed * 0.7) * 1.5;
    meshRef.current.rotation.z = t * speed * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, z]}>
      <planeGeometry args={[20, 12, 1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

export default FogLayer;
