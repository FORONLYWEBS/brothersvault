import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Secret = {
  id: string;
  // position as viewport percentages
  x: number;
  y: number;
  symbol: string;
  phrase: string;
};

const SECRETS: Secret[] = [
  { id: "s1", x: 12, y: 22, symbol: "☥", phrase: "the key was always yours" },
  { id: "s2", x: 86, y: 18, symbol: "🜏", phrase: "brothers never sleep" },
  { id: "s3", x: 8, y: 72, symbol: "✶", phrase: "look closer..." },
  { id: "s4", x: 78, y: 80, symbol: "𓁹", phrase: "the vault sees you" },
  { id: "s5", x: 50, y: 55, symbol: "⛧", phrase: "you are one of us" },
];

const REVEAL_RADIUS = 90; // px

/**
 * SecretSpots
 * Hidden symbols across the page that fade in only when the cursor (spotlight)
 * is near them. Pairs with MysterySpotlight for a "reveal in the dark" feel.
 */
const SecretSpots = () => {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [activePhrase, setActivePhrase] = useState<string | null>(null);
  const phraseTimeout = useRef<number>();

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Compute proximity per secret
  const withProximity = SECRETS.map((s) => {
    if (!cursor) return { s, near: false, dist: Infinity };
    const sx = (s.x / 100) * window.innerWidth;
    const sy = (s.y / 100) * window.innerHeight;
    const dx = cursor.x - sx;
    const dy = cursor.y - sy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return { s, near: dist < REVEAL_RADIUS, dist };
  });

  // When user lingers very close (<40px), trigger phrase + mark found
  useEffect(() => {
    const close = withProximity.find((p) => p.dist < 40);
    if (close && !found.has(close.s.id)) {
      setFound((prev) => new Set(prev).add(close.s.id));
      setActivePhrase(close.s.phrase);
      if (phraseTimeout.current) window.clearTimeout(phraseTimeout.current);
      phraseTimeout.current = window.setTimeout(() => setActivePhrase(null), 3500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

  return (
    <>
      {/* Hidden symbols */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-[31]">
        {withProximity.map(({ s, near, dist }) => {
          const intensity = cursor ? Math.max(0, 1 - dist / REVEAL_RADIUS) : 0;
          return (
            <motion.div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              animate={{
                opacity: intensity * 0.9,
                scale: 0.8 + intensity * 0.5,
                filter: `blur(${(1 - intensity) * 6}px) drop-shadow(0 0 ${
                  intensity * 16
                }px hsl(var(--primary) / ${intensity * 0.8}))`,
              }}
              transition={{ duration: 0.25 }}
            >
              <span
                className={`font-bebas text-3xl md:text-4xl tracking-widest ${
                  found.has(s.id) ? "text-primary" : "text-foreground/80"
                }`}
              >
                {s.symbol}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Whispered phrase reveal */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
        <AnimatePresence>
          {activePhrase && (
            <motion.div
              initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -4, filter: "blur(8px)" }}
              transition={{ duration: 0.7 }}
              className="px-5 py-2 bg-card/70 backdrop-blur-md border border-primary/30 rounded-sm text-xs font-oswald tracking-[0.4em] text-primary shadow-[0_0_30px_hsl(270_60%_55%/0.35)]"
            >
              {activePhrase}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SecretSpots;
