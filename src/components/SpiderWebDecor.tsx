import { motion } from "framer-motion";

interface SpiderWebDecorProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
  withSpider?: boolean;
}

const SpiderWebDecor = ({ position = "top-right", size = 200, opacity = 0.15, withSpider = false }: SpiderWebDecorProps) => {
  const posClasses: Record<string, string> = {
    "top-left": "top-0 left-0 -rotate-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180",
  };

  return (
    <div className={`absolute ${posClasses[position]} pointer-events-none z-10`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        className="animate-web-sway"
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 2 }}
      >
        {/* Radial lines */}
        {[0, 30, 60, 90].map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="0"
            x2={200 * Math.cos((angle * Math.PI) / 180)}
            y2={200 * Math.sin((angle * Math.PI) / 180)}
            stroke="hsl(270 30% 50%)"
            strokeWidth="0.5"
          />
        ))}
        {/* Concentric arcs */}
        {[40, 80, 120, 160].map((r) => (
          <path
            key={r}
            d={`M 0 ${r} Q ${r * 0.5} ${r * 0.5} ${r} 0`}
            stroke="hsl(270 30% 50%)"
            strokeWidth="0.5"
            fill="none"
          />
        ))}
        {/* Extra web strands */}
        {[15, 45, 75].map((angle) => (
          <line
            key={`extra-${angle}`}
            x1="0"
            y1="0"
            x2={180 * Math.cos((angle * Math.PI) / 180)}
            y2={180 * Math.sin((angle * Math.PI) / 180)}
            stroke="hsl(270 30% 50%)"
            strokeWidth="0.3"
          />
        ))}
        {[60, 100, 140].map((r) => (
          <path
            key={`arc2-${r}`}
            d={`M 0 ${r} Q ${r * 0.4} ${r * 0.6} ${r} 0`}
            stroke="hsl(270 30% 50%)"
            strokeWidth="0.3"
            fill="none"
          />
        ))}
      </motion.svg>

      {withSpider && (
        <motion.div
          className="absolute"
          style={{
            top: position.includes("top") ? size * 0.4 : "auto",
            bottom: position.includes("bottom") ? size * 0.4 : "auto",
            left: position.includes("left") ? size * 0.3 : "auto",
            right: position.includes("right") ? size * 0.3 : "auto",
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5, type: "spring", bounce: 0.4 }}
        >
          {/* Spider thread */}
          <div className="w-px h-8 bg-gradient-to-b from-purple-500/40 to-transparent mx-auto" />
          {/* Spider body */}
          <div className="relative">
            <div className="w-3 h-4 bg-foreground/80 rounded-full mx-auto" />
            <div className="w-2 h-2 bg-foreground/80 rounded-full mx-auto -mt-1" />
            {/* Legs */}
            {[-1, 1].map((dir) => (
              <div key={dir} className="absolute top-1" style={{ [dir === -1 ? "right" : "left"]: "100%" }}>
                <div className={`w-3 h-px bg-foreground/60 ${dir === 1 ? "rotate-12" : "-rotate-12"}`} />
                <div className={`w-3 h-px bg-foreground/60 mt-1 ${dir === 1 ? "-rotate-12" : "rotate-12"}`} />
                <div className={`w-2.5 h-px bg-foreground/60 mt-1 ${dir === 1 ? "rotate-6" : "-rotate-6"}`} />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpiderWebDecor;
