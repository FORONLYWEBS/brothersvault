import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "COLLECTION", href: "#collection" },
];

const BrandNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ color: "hsl(270, 60%, 55%)" }}
              className="text-xs font-oswald tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <a href="#home" className="absolute left-1/2 -translate-x-1/2">
          <motion.img
            src={logo}
            alt="Xypher Wears"
            className="h-10 w-auto object-contain invert"
            whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px hsl(270 60% 55% / 0.5))" }}
          />
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/order"
            className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-oswald tracking-[0.2em] text-foreground bg-primary/15 border border-primary/50 hover:bg-primary/25 hover:border-primary hover:shadow-[0_0_15px_hsl(270_80%_60%/0.5)] transition-all font-medium"
          >
            ORDER NOW
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-xs font-oswald tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">ADMIN</span>
          </Link>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b border-primary/10 bg-background/95 backdrop-blur-md px-4 py-4 space-y-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-oswald tracking-[0.15em] text-muted-foreground hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default BrandNavbar;
