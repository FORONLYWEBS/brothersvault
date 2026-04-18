import { motion } from "framer-motion";
import heroMan from "@/assets/hero-man.jpg";
import SpiderWebDecor from "./SpiderWebDecor";
import FloatingParticles from "./FloatingParticles";
import GhostFog from "./GhostFog";
import HauntedScene from "./three/HauntedScene";

const HeroBanner = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroMan}
          alt="Xypher Wears"
          className="w-full h-full object-cover opacity-15 object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      </div>

      {/* Immersive 3D haunted layer */}
      <HauntedScene />

      <GhostFog />

      {/* Pulsing glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/15 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <FloatingParticles count={35} />
      <SpiderWebDecor position="top-left" size={280} opacity={0.15} withSpider />
      <SpiderWebDecor position="top-right" size={220} opacity={0.12} />
      <SpiderWebDecor position="bottom-left" size={180} opacity={0.08} />
      <SpiderWebDecor position="bottom-right" size={150} opacity={0.06} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base tracking-[0.4em] font-oswald text-primary/80 mb-4"
        >
          EST. 2025
        </motion.p>

        {/* Ghostly title with flicker */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, type: "spring" }}
          className="text-6xl sm:text-8xl md:text-9xl font-bebas leading-none tracking-wider"
        >
          <motion.span
            className="bg-gradient-to-b from-foreground via-foreground to-primary/50 bg-clip-text text-transparent inline-block"
            animate={{ opacity: [1, 0.7, 1, 0.9, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            XYPHER
          </motion.span>
          <br />
          <motion.span
            className="bg-gradient-to-b from-primary/70 via-foreground to-foreground/80 bg-clip-text text-transparent inline-block"
            animate={{ opacity: [0.9, 1, 0.8, 1, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            WEARS
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-sm md:text-base tracking-[0.3em] font-oswald text-muted-foreground"
        >
          WEAR THE MYSTERY
        </motion.p>

        <motion.a
          href="#collection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(270 60% 55% / 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-10 px-10 py-3 border border-primary/40 text-xs tracking-[0.3em] font-oswald text-foreground hover:bg-primary/20 hover:border-primary transition-all duration-300 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">SHOP NOW</span>
        </motion.a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroBanner;
