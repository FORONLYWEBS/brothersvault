import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Spider3D from "./Spider3D";
import Ghost3D from "./Ghost3D";
import WebMesh from "./WebMesh";
import FogLayer from "./FogLayer";
import { useIsMobile } from "@/hooks/use-mobile";

const HauntedScene = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Lighter scene on mobile
  const spiderCount = isMobile ? 1 : 3;
  const ghostCount = isMobile ? 2 : 4;

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#a78bfa" />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color="#22d3ee" />

        {/* Fog layers (parallax depth) */}
        <FogLayer z={-4} color="#4c1d95" speed={0.04} opacity={0.18} />
        <FogLayer z={-2.5} color="#0e7490" speed={0.07} opacity={0.08} />

        {/* Distorting web/particle field */}
        {!isMobile && <WebMesh mouse={mouse} />}

        {/* Ghost spirits — soft glowing forms following cursor */}
        {Array.from({ length: ghostCount }).map((_, i) => {
          const angle = (i / ghostCount) * Math.PI * 2;
          return (
            <Ghost3D
              key={`ghost-${i}`}
              position={[Math.cos(angle) * 3, Math.sin(angle) * 2, -1 - i * 0.5]}
              color={i % 2 === 0 ? "#a78bfa" : "#67e8f9"}
              scale={0.7 + (i % 2) * 0.3}
              speed={0.6 + i * 0.15}
              followStrength={0.5 + i * 0.2}
              mouse={mouse}
            />
          );
        })}

        {/* 3D Spiders */}
        {Array.from({ length: spiderCount }).map((_, i) => (
          <Spider3D
            key={`spider-${i}`}
            position={[(i - 1) * 2.2, 1.5 - i * 0.8, -0.5 + i * 0.3]}
            scale={0.9 + i * 0.1}
            speed={0.6 + i * 0.2}
            mouse={mouse}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default HauntedScene;
