import { motion } from "framer-motion";
import tshirtBrotherhood from "@/assets/tshirt-brotherhood.png";

const HeroBanner = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-foreground text-primary-foreground overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={tshirtBrotherhood}
          alt="Brothers Vault"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base tracking-[0.4em] font-oswald text-primary-foreground/70 mb-4"
        >
          EST. 2025
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-8xl md:text-9xl font-bebas leading-none tracking-wider"
        >
          BROTHERS
          <br />
          VAULT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-sm md:text-base tracking-[0.3em] font-oswald text-primary-foreground/60"
        >
          BUILT BY BROTHERHOOD
        </motion.p>
        <motion.a
          href="#collection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-block mt-10 px-10 py-3 border border-primary-foreground/40 text-xs tracking-[0.3em] font-oswald hover:bg-primary-foreground hover:text-foreground transition-all duration-300"
        >
          SHOP NOW
        </motion.a>
      </div>
    </section>
  );
};

export default HeroBanner;
