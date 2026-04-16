import { motion } from "framer-motion";

const GhostFog = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Drifting fog layers */}
      <motion.div
        className="absolute -left-1/4 top-0 w-[150%] h-full opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, hsl(270 60% 55%), transparent 70%)",
        }}
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 top-0 w-[150%] h-full opacity-[0.03]"
        style={{
          background: "radial-gradient(ellipse at 70% 60%, hsl(270 40% 40%), transparent 60%)",
        }}
        animate={{ x: ["10%", "-15%", "10%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bottom mist */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 opacity-[0.06]"
        style={{
          background: "linear-gradient(to top, hsl(270 60% 55%), transparent)",
        }}
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Ghostly orbs that float slowly */}
      {[
        { left: "10%", top: "30%", size: 200, delay: 0 },
        { left: "70%", top: "50%", size: 150, delay: 4 },
        { left: "40%", top: "70%", size: 180, delay: 8 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            background: "radial-gradient(circle, hsl(270 60% 55% / 0.08), transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 15, -10],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 12,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GhostFog;
