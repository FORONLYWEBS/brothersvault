import { motion } from "framer-motion";

/**
 * MysteryVignette
 * Static atmospheric overlay: corner darkening + faint scanline + noise.
 * Pointer-events disabled.
 */
const MysteryVignette = () => {
  return (
    <>
      {/* Corner vignette */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(var(--background) / 0.6) 100%)",
        }}
      />

      {/* Subtle SVG noise */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-20 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Slow horizontal flicker line */}
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 h-px bg-primary/20 pointer-events-none z-20"
        initial={{ top: "10%", opacity: 0 }}
        animate={{ top: ["10%", "90%", "10%"], opacity: [0, 0.4, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
};

export default MysteryVignette;
