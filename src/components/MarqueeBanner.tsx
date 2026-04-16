import { motion } from "framer-motion";

const items = ["FREE SHIPPING", "COD AVAILABLE", "PREMIUM QUALITY", "BUILT BY BROTHERHOOD", "EXCLUSIVE DROPS"];

const MarqueeBanner = () => (
  <div className="relative bg-primary/10 border-y border-primary/20 py-3 overflow-hidden">
    {/* Glow line */}
    <motion.div
      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <div className="flex animate-marquee whitespace-nowrap">
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-xs tracking-[0.25em] font-oswald text-foreground/70">
          🕷️ {item}
        </span>
      ))}
    </div>
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </div>
);

export default MarqueeBanner;
