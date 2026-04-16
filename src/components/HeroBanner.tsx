import { motion } from "framer-motion";
import heroMan from "@/assets/hero-man.jpg";
import SpiderWebDecor from "./SpiderWebDecor";
import FloatingParticles from "./FloatingParticles";

const HeroBanner = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroMan}
          alt="Brothers Vault"
          className="w-full h-full object-cover opacity-20 object-bottom"
        />
        {/* Dark overlay with purple tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      </div>

      {/* Animated purple glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 animate-pulse-glow"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/15 animate-pulse-glow"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <FloatingParticles count={30} />
      <SpiderWebDecor position="top-left" size={250} opacity={0.12} withSpider />
      <SpiderWebDecor position="top-right" size={200} opacity={0.1} />
      <SpiderWebDecor position="bottom-left" size={150} opacity={0.08} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base tracking-[0.4em] font-oswald text-primary/80 mb-4"
        >
          EST. 2025
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, type: "spring" }}
          className="text-6xl sm:text-8xl md:text-9xl font-bebas leading-none tracking-wider animate-flicker"
        >
          <span className="bg-gradient-to-b from-foreground via-foreground to-primary/50 bg-clip-text text-transparent">
            BROTHERS
          </span>
          <br />
          <span className="bg-gradient-to-b from-primary/60 via-foreground to-foreground bg-clip-text text-transparent">
            VAULT
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-sm md:text-base tracking-[0.3em] font-oswald text-muted-foreground"
        >
          BUILT BY BROTHERHOOD
        </motion.p>
        <motion.a
          href="#collection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(270 60% 55% / 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-10 px-10 py-3 border border-primary/40 text-xs tracking-[0.3em] font-oswald text-foreground hover:bg-primary/20 hover:border-primary transition-all duration-300"
        >
          SHOP NOW
        </motion.a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroBanner;
