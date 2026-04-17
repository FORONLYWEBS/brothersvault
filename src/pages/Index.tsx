import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandNavbar from "@/components/BrandNavbar";
import HeroBanner from "@/components/HeroBanner";
import MarqueeBanner from "@/components/MarqueeBanner";
import ProductGrid from "@/components/ProductGrid";
import OrderSection from "@/components/OrderSection";
import BrandFooter from "@/components/BrandFooter";
import CrawlingSpider from "@/components/CrawlingSpider";
import CursorAura from "@/components/CursorAura";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  const handleOrder = (productId: string) => {
    setSelectedProduct(productId);
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  // Hide the floating button as soon as the user scrolls past the hero
  useEffect(() => {
    const onScroll = () => {
      setShowFloatingBtn(window.scrollY < 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground haunted-cursor">
      <CursorAura />
      <CrawlingSpider />
      <BrandNavbar />
      <HeroBanner />
      <MarqueeBanner />
      <ProductGrid onOrder={handleOrder} />
      <MarqueeBanner />
      <OrderSection selectedProductId={selectedProduct} />
      <BrandFooter />

      {/* Floating Order Now — only visible at the top (hero); hides on scroll */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.button
            key="order-floating"
            onClick={scrollToOrder}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[55] group"
            aria-label="Order Now"
          >
            <span className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-oswald tracking-[0.25em] text-xs sm:text-sm text-foreground bg-background/40 backdrop-blur-md border border-primary/50 shadow-[0_0_25px_hsl(270_80%_60%/0.4),inset_0_0_15px_hsl(270_80%_60%/0.15)] hover:border-primary hover:shadow-[0_0_40px_hsl(270_80%_60%/0.7),inset_0_0_20px_hsl(270_80%_60%/0.25)] transition-all duration-500 animate-flicker">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(270_80%_65%)] animate-pulse" />
              ORDER NOW
            </span>
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10 group-hover:bg-primary/40 transition-all duration-500" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
