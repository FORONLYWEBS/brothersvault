import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHISPERS = [
  "🕸️ they're watching...",
  "🔮 the vault remembers you",
  "🕷️ something stirs in the dark",
  "🌑 step closer...",
  "💀 you've been chosen",
  "🕯️ the brotherhood whispers",
];

/**
 * Whispers
 * Occasionally surfaces a faint mysterious phrase in the corner.
 * Subtle — appears every 25-45s, fades after 4s.
 */
const Whispers = () => {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const schedule = () => {
      const delay = 25000 + Math.random() * 20000;
      setTimeout(() => {
        if (cancelled) return;
        const next = WHISPERS[Math.floor(Math.random() * WHISPERS.length)];
        setText(next);
        setTimeout(() => {
          if (!cancelled) setText(null);
          schedule();
        }, 4200);
      }, delay);
    };
    // first whisper a bit later than load
    const initial = setTimeout(schedule, 8000);
    return () => {
      cancelled = true;
      clearTimeout(initial);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[55] pointer-events-none">
      <AnimatePresence>
        {text && (
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 0.85, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
            transition={{ duration: 0.8 }}
            className="px-4 py-2 bg-card/70 backdrop-blur-md border border-primary/20 rounded-sm text-xs font-oswald tracking-[0.3em] text-primary/80 shadow-[0_0_20px_hsl(270_60%_55%/0.2)]"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Whispers;
