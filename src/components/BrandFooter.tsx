import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";
import SpiderWebDecor from "./SpiderWebDecor";

const BrandFooter = () => (
  <footer className="relative bg-card border-t border-primary/10 py-16 px-4 md:px-8 overflow-hidden">
    <SpiderWebDecor position="bottom-right" size={180} opacity={0.06} />
    <SpiderWebDecor position="bottom-left" size={120} opacity={0.04} />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col items-center text-center gap-6">
        <motion.img
          src={logo}
          alt="Brothers Vault"
          className="h-14 w-auto invert"
          whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 12px hsl(270 60% 55% / 0.4))" }}
        />
        <p className="text-xs tracking-[0.35em] font-oswald text-muted-foreground">
          BUILT BY BROTHERHOOD • EST. 2025
        </p>
        <p className="text-xs tracking-wider font-oswald text-muted-foreground/60">
          LOYALTY • RESPECT • TRUST
        </p>
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent my-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <p className="text-[11px] text-muted-foreground/40 font-oswald tracking-wider">
          © {new Date().getFullYear()} BROTHERS VAULT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  </footer>
);

export default BrandFooter;
