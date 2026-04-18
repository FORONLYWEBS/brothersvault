import { useEffect, useRef } from "react";

/**
 * MysterySpotlight
 * A soft, lagged radial spotlight that follows the cursor.
 * Sits above content but below interactive UI. Disabled on touch devices.
 */
const MysterySpotlight = () => {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.4 });
  const current = useRef({ x: 0.5, y: 0.4 });
  const raf = useRef<number>();

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      if (ref.current) {
        const x = (current.current.x * 100).toFixed(2);
        const y = (current.current.y * 100).toFixed(2);
        ref.current.style.background = `radial-gradient(circle 480px at ${x}% ${y}%, transparent 0%, hsl(var(--background) / 0.35) 55%, hsl(var(--background) / 0.85) 100%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 pointer-events-none z-30 mix-blend-multiply"
      style={{
        background:
          "radial-gradient(circle 480px at 50% 40%, transparent 0%, hsl(var(--background) / 0.35) 55%, hsl(var(--background) / 0.85) 100%)",
      }}
    />
  );
};

export default MysterySpotlight;
