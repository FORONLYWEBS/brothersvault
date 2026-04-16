import { motion } from "framer-motion";

const items = ["FREE SHIPPING", "COD AVAILABLE", "PREMIUM QUALITY", "BUILT BY BROTHERHOOD", "EXCLUSIVE DROPS", "DARK AESTHETIC"];

const MarqueeBanner = () => (
  <div className="relative bg-primary/5 border-y border-primary/15 py-3 overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <div className="flex animate-marquee whitespace-nowrap">
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 text-xs tracking-[0.25em] font-oswald text-foreground/60">
          🕷️ {item}
        </span>
      ))}
    </div>
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      animate={{ opacity: [0.8, 0.2, 0.8] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </div>
);

export default MarqueeBanner;
