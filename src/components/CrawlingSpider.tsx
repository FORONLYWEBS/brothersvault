import { motion } from "framer-motion";

const CrawlingSpider = () => {
  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{ x: "-10vw", y: "20vh" }}
      animate={{
        x: ["110vw", "60vw", "30vw", "-10vw"],
        y: ["20vh", "50vh", "10vh", "80vh"],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        repeatDelay: 15,
        ease: "linear",
      }}
    >
      {/* Thread trailing behind */}
      <motion.div
        className="absolute left-1/2 -top-32 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-primary/40"
        animate={{ height: [120, 60, 120] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Spider body */}
      <div className="relative">
        <div className="w-4 h-5 bg-foreground/70 rounded-full shadow-[0_0_12px_hsl(270_80%_60%/0.4)]" />
        <div className="w-3 h-3 bg-foreground/70 rounded-full mx-auto -mt-1.5" />
        {/* Eyes */}
        <div className="absolute top-0.5 left-0.5 flex gap-0.5">
          <motion.div
            className="w-1 h-1 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-1 h-1 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
        {/* Legs */}
        {[-1, 1].map((dir) => (
          <div
            key={dir}
            className="absolute top-1"
            style={{ [dir === -1 ? "right" : "left"]: "100%" }}
          >
            <motion.div
              className={`w-5 h-px bg-foreground/50 origin-${dir === -1 ? "right" : "left"}`}
              animate={{ rotate: [dir * 15, dir * -5, dir * 15] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            <motion.div
              className={`w-5 h-px bg-foreground/50 mt-1.5 origin-${dir === -1 ? "right" : "left"}`}
              animate={{ rotate: [dir * -10, dir * 10, dir * -10] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
            />
            <motion.div
              className={`w-4 h-px bg-foreground/50 mt-1.5 origin-${dir === -1 ? "right" : "left"}`}
              animate={{ rotate: [dir * 5, dir * -15, dir * 5] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className={`w-4 h-px bg-foreground/40 mt-1.5 origin-${dir === -1 ? "right" : "left"}`}
              animate={{ rotate: [dir * -8, dir * 12, dir * -8] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.15 }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CrawlingSpider;
