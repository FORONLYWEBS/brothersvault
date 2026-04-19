import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import OrderSection from "@/components/OrderSection";
import BrandFooter from "@/components/BrandFooter";
import CursorAura from "@/components/CursorAura";

const Order = () => {
  return (
    <div className="min-h-screen bg-background text-foreground haunted-cursor">
      <CursorAura />

      {/* Minimal header */}
      <div className="border-b border-primary/10 bg-background/80 backdrop-blur-md px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-oswald tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO STORE
        </Link>
        <h1 className="text-xl font-bebas tracking-[0.2em]">ORDER</h1>
        <span className="w-20" />
      </div>

      <OrderSection />
      <BrandFooter />
    </div>
  );
};

export default Order;
