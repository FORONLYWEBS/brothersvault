import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "bv_intro_seen";

const MysteryIntro = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setShow(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Curtains */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-background border-r border-primary/20"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ delay: 1.6, duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-background border-l border-primary/20"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ delay: 1.6, duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          />

          {/* Glow halo */}
          <motion.div
            className="absolute w-[60vmin] h-[60vmin] rounded-full bg-primary/20 blur-[80px]"
            animate={{ scale: [0.6, 1.2, 0.9], opacity: [0.3, 0.7, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />

          {/* Descending spider on web */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              className="w-px bg-gradient-to-b from-transparent via-primary/40 to-primary/60"
              initial={{ height: 0 }}
              animate={{ height: "40vh" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
            <motion.div
              initial={{ y: -200, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: [0, -8, 8, -4, 0] }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="text-4xl drop-shadow-[0_0_15px_hsl(270_60%_55%/0.8)]"
              aria-hidden
            >
              🕷️
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: 2.4, times: [0, 0.3, 0.75, 1] }}
          >
            <p className="text-[10px] tracking-[0.5em] font-oswald text-primary/70 mb-2">
              ENTER THE
            </p>
            <h1 className="text-6xl md:text-8xl font-bebas tracking-[0.15em] bg-gradient-to-b from-foreground to-primary/60 bg-clip-text text-transparent">
              VAULT
            </h1>
            <motion.div
              className="mt-3 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MysteryIntro;
