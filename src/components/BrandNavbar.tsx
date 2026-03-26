import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "COLLECTION", href: "#collection" },
  { label: "ORDER", href: "#order" },
];

const BrandNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-oswald tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Center logo */}
        <a href="#home" className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="Brothers Vault" className="h-10 w-auto object-contain" />
        </a>

        {/* Admin button */}
        <Link
          to="/admin"
          className="flex items-center gap-1.5 text-xs font-oswald tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden sm:inline">ADMIN</span>
        </Link>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-oswald tracking-[0.15em] text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default BrandNavbar;
