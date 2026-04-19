import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Menu, X, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "COLLECTION", href: "#collection" },
];

const BrandNavbar = () => {
  const [open, setOpen] = useState(false);
  const orderBtnRef = useRef<HTMLAnchorElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  const handleMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = orderBtnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setMagnet({ x: x * 0.25, y: y * 0.35 });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-primary/10 overflow-hidden">
      {/* Aurora glow */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-10 left-1/4 w-64 h-32 bg-primary/30 blur-3xl rounded-full animate-aurora" />
        <div className="absolute -top-10 right-1/4 w-64 h-32 bg-primary/20 blur-3xl rounded-full animate-aurora" style={{ animationDelay: "4s" }} />
      </div>

      {/* Animated bottom border trace */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent animate-[border-trace_4s_linear_infinite]"
          style={{ animation: "shimmer 4s linear infinite" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground hover:text-primary transition-colors">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="group relative text-xs font-oswald tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary via-foreground to-primary group-hover:w-full transition-all duration-500" />
              <span className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded bg-primary/0 group-hover:bg-primary/10 blur-md transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Glitchy animated wordmark */}
        <a href="#home" className="absolute left-1/2 -translate-x-1/2 group">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            {/* Glitch layers */}
            <span aria-hidden className="absolute inset-0 text-base sm:text-lg font-bebas tracking-[0.3em] text-primary/60 mix-blend-screen animate-glitch" style={{ transform: "translate(1px, 0)" }}>
              XYPHER WEARS
            </span>
            <span aria-hidden className="absolute inset-0 text-base sm:text-lg font-bebas tracking-[0.3em] text-destructive/40 mix-blend-screen animate-glitch" style={{ transform: "translate(-1px, 0)", animationDelay: "0.5s" }}>
              XYPHER WEARS
            </span>
            <span className="relative text-base sm:text-lg font-bebas tracking-[0.3em] animate-shimmer">
              XYPHER WEARS
            </span>
            {/* Orbiting sparkle */}
            <motion.span
              className="absolute -top-1 -right-3 text-primary"
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
            >
              <Sparkles className="w-2.5 h-2.5" />
            </motion.span>
          </motion.div>
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            ref={orderBtnRef}
            to="/order"
            onMouseMove={handleMagnet}
            onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
            className="relative px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-oswald tracking-[0.2em] text-foreground bg-primary/15 border border-primary/50 hover:border-primary transition-all font-medium overflow-hidden animate-magnetic-pulse"
            style={{ transform: `translate(${magnet.x}px, ${magnet.y}px)`, transition: "transform 0.2s ease-out" }}
          >
            {/* Shine sweep */}
            <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent animate-shine-sweep pointer-events-none" />
            <span className="relative z-10">ORDER NOW</span>
          </Link>
          <Link
            to="/admin"
            className="group flex items-center gap-1.5 text-xs font-oswald tracking-[0.15em] text-muted-foreground hover:text-primary transition-all font-medium"
          >
            <motion.span whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
              <ShieldCheck className="w-4 h-4" />
            </motion.span>
            <span className="hidden sm:inline relative">
              ADMIN
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </span>
          </Link>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b border-primary/10 bg-background/95 backdrop-blur-md px-4 py-4 space-y-3 relative z-10"
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="block text-sm font-oswald tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default BrandNavbar;
