import { motion } from "framer-motion";

/**
 * Realistic SVG spider that crawls across the screen on a thread.
 * - Segmented body (cephalothorax + abdomen with subtle highlight)
 * - 8 jointed legs (femur + tibia + tarsus) with proper articulation
 * - 8 eyes arranged in 2 rows, 2 fangs (chelicerae)
 * - Pedipalps near mouth
 */
const RealisticSpider = ({ size = 56 }: { size?: number }) => {
  // Helper: render one jointed leg via 3 line segments
  const Leg = ({
    side,
    rowAngle,
    swing = 12,
    delay = 0,
    length = 1,
  }: {
    side: 1 | -1;
    rowAngle: number;
    swing?: number;
    delay?: number;
    length?: number;
  }) => {
    // Femur extends out and slightly down, then tibia bends back up and out (knee), then tarsus drops down
    const femurLen = 14 * length;
    const tibiaLen = 13 * length;
    const tarsusLen = 9 * length;

    return (
      <motion.g
        style={{ transformOrigin: "0px 0px", transformBox: "fill-box" } as React.CSSProperties}
        animate={{ rotate: [rowAngle - swing, rowAngle + swing, rowAngle - swing] }}
        transition={{ duration: 0.55, repeat: Infinity, delay, ease: "easeInOut" }}
      >
        {/* Femur (upper leg) */}
        <line
          x1="0"
          y1="0"
          x2={side * femurLen}
          y2={-4}
          stroke="hsl(0 0% 6%)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Knee joint */}
        <circle cx={side * femurLen} cy={-4} r="0.9" fill="hsl(0 0% 4%)" />
        {/* Tibia (mid leg, bends upward at knee) */}
        <line
          x1={side * femurLen}
          y1={-4}
          x2={side * (femurLen + tibiaLen * 0.85)}
          y2={-4 + tibiaLen * 0.6}
          stroke="hsl(0 0% 6%)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Ankle joint */}
        <circle
          cx={side * (femurLen + tibiaLen * 0.85)}
          cy={-4 + tibiaLen * 0.6}
          r="0.7"
          fill="hsl(0 0% 4%)"
        />
        {/* Tarsus (foot, points downward) */}
        <line
          x1={side * (femurLen + tibiaLen * 0.85)}
          y1={-4 + tibiaLen * 0.6}
          x2={side * (femurLen + tibiaLen * 0.85 + tarsusLen * 0.5)}
          y2={-4 + tibiaLen * 0.6 + tarsusLen}
          stroke="hsl(0 0% 5%)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </motion.g>
    );
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="-30 -30 60 60"
      style={{ overflow: "visible", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.6))" }}
    >
      <defs>
        <radialGradient id="abdomenGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="hsl(270 25% 18%)" />
          <stop offset="55%" stopColor="hsl(0 0% 5%)" />
          <stop offset="100%" stopColor="hsl(0 0% 0%)" />
        </radialGradient>
        <radialGradient id="cephalGrad" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="hsl(270 30% 22%)" />
          <stop offset="100%" stopColor="hsl(0 0% 4%)" />
        </radialGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(270 100% 80%)" />
          <stop offset="60%" stopColor="hsl(270 80% 50%)" />
          <stop offset="100%" stopColor="hsl(270 60% 25%)" />
        </radialGradient>
      </defs>

      {/* LEGS — render behind body. 4 per side, distinct angles */}
      {/* Left side */}
      <Leg side={-1} rowAngle={-50} delay={0} length={0.95} />
      <Leg side={-1} rowAngle={-15} delay={0.12} length={1} />
      <Leg side={-1} rowAngle={20} delay={0.24} length={1} />
      <Leg side={-1} rowAngle={55} delay={0.36} length={0.9} />
      {/* Right side */}
      <Leg side={1} rowAngle={50} delay={0.06} length={0.95} />
      <Leg side={1} rowAngle={15} delay={0.18} length={1} />
      <Leg side={1} rowAngle={-20} delay={0.3} length={1} />
      <Leg side={1} rowAngle={-55} delay={0.42} length={0.9} />

      {/* ABDOMEN (rear, larger) */}
      <ellipse cx="0" cy="6" rx="9" ry="11" fill="url(#abdomenGrad)" />
      {/* Subtle abdomen pattern */}
      <path
        d="M 0 -2 Q 2 4 0 12 Q -2 4 0 -2 Z"
        fill="hsl(270 40% 25% / 0.35)"
      />
      <ellipse cx="-2.5" cy="2" rx="1" ry="2" fill="hsl(0 0% 100% / 0.06)" />

      {/* CEPHALOTHORAX (head/thorax fused) */}
      <ellipse cx="0" cy="-5" rx="6" ry="6.5" fill="url(#cephalGrad)" />
      <ellipse cx="-1.5" cy="-7" rx="1.2" ry="1.6" fill="hsl(0 0% 100% / 0.08)" />

      {/* PEDIPALPS (small leg-like appendages near mouth) */}
      <line x1="-2" y1="-9" x2="-5" y2="-13" stroke="hsl(0 0% 5%)" strokeWidth="1" strokeLinecap="round" />
      <line x1="2" y1="-9" x2="5" y2="-13" stroke="hsl(0 0% 5%)" strokeWidth="1" strokeLinecap="round" />

      {/* CHELICERAE / FANGS */}
      <path d="M -1.5 -8 Q -2 -11 -1 -12" stroke="hsl(0 0% 3%)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 1.5 -8 Q 2 -11 1 -12" stroke="hsl(0 0% 3%)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* 8 EYES (2 rows, classic spider arrangement) — top row larger */}
      <motion.g animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        {/* Anterior median eyes (large central pair) */}
        <circle cx="-1.4" cy="-7.2" r="0.95" fill="url(#eyeGlow)" />
        <circle cx="1.4" cy="-7.2" r="0.95" fill="url(#eyeGlow)" />
        {/* Anterior lateral eyes */}
        <circle cx="-3.2" cy="-6.8" r="0.7" fill="url(#eyeGlow)" />
        <circle cx="3.2" cy="-6.8" r="0.7" fill="url(#eyeGlow)" />
        {/* Posterior median eyes (smaller, slightly above) */}
        <circle cx="-1" cy="-8.4" r="0.55" fill="url(#eyeGlow)" />
        <circle cx="1" cy="-8.4" r="0.55" fill="url(#eyeGlow)" />
        {/* Posterior lateral eyes */}
        <circle cx="-3" cy="-8" r="0.5" fill="url(#eyeGlow)" />
        <circle cx="3" cy="-8" r="0.5" fill="url(#eyeGlow)" />
      </motion.g>
    </svg>
  );
};

const CrawlingSpider = () => {
  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{ x: "-10vw", y: "20vh" }}
      animate={{
        x: ["110vw", "60vw", "30vw", "-15vw"],
        y: ["20vh", "50vh", "10vh", "75vh"],
      }}
      transition={{
        duration: 28,
        repeat: Infinity,
        repeatDelay: 12,
        ease: "linear",
      }}
    >
      {/* Silk thread trailing behind */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-40 w-px bg-gradient-to-b from-transparent via-foreground/15 to-foreground/40"
        animate={{ height: [140, 80, 140] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative">
        <RealisticSpider size={56} />
      </div>
    </motion.div>
  );
};

export default CrawlingSpider;
