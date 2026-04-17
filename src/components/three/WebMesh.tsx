import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WebMeshProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

/**
 * A subtly distorting plane mesh of points/lines that warps toward the cursor,
 * giving a haunting "web threads in the dark" feel.
 */
const WebMesh = ({ mouse }: WebMeshProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const SIZE = 30;
  const SPACING = 0.55;

  const { positions, original } = useMemo(() => {
    const pos: number[] = [];
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        pos.push((x - SIZE / 2) * SPACING, (y - SIZE / 2) * SPACING, -3);
      }
    }
    const arr = new Float32Array(pos);
    return { positions: arr, original: new Float32Array(arr) };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    const mx = mouse.current.x * 5;
    const my = mouse.current.y * 3;

    for (let i = 0; i < arr.length; i += 3) {
      const ox = original[i];
      const oy = original[i + 1];
      const dx = ox - mx;
      const dy = oy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ripple = Math.sin(dist * 1.5 - t * 2) * 0.15;
      const pull = Math.max(0, 1 - dist / 4) * 0.5;
      arr[i] = ox + (dx / (dist + 0.001)) * pull * 0.3;
      arr[i + 1] = oy + (dy / (dist + 0.001)) * pull * 0.3 + ripple * 0.2;
      arr[i + 2] = -3 + ripple;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default WebMesh;
