import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Soft glowing supernatural aura that follows the cursor.
 * Uses requestAnimationFrame for buttery smooth, lagged following.
 */
const CursorAura = () => {
  const auraRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const coreCurrent = useRef({ x: -200, y: -200 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);

    let raf = 0;
    const tick = () => {
      // Lagged aura
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      // Tighter core
      coreCurrent.current.x += (target.current.x - coreCurrent.current.x) * 0.35;
      coreCurrent.current.y += (target.current.y - coreCurrent.current.y) * 0.35;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${current.current.x - 120}px, ${current.current.y - 120}px, 0)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${coreCurrent.current.x - 8}px, ${coreCurrent.current.y - 8}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={auraRef}
        className="fixed top-0 left-0 w-[240px] h-[240px] rounded-full pointer-events-none z-[60] mix-blend-screen will-change-transform"
        style={{
          background:
            "radial-gradient(circle, hsl(270 80% 65% / 0.35) 0%, hsl(270 80% 60% / 0.15) 30%, transparent 70%)",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />
      <div
        ref={coreRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[61] will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(0 0% 100% / 0.9), hsl(270 80% 70% / 0.4) 60%, transparent)",
          boxShadow: "0 0 20px hsl(270 80% 65% / 0.8), 0 0 40px hsl(190 80% 60% / 0.4)",
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default CursorAura;
