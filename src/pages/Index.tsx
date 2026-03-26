import { useState, useEffect } from "react";
import BrandNavbar from "@/components/BrandNavbar";
import HeroBanner from "@/components/HeroBanner";
import MarqueeBanner from "@/components/MarqueeBanner";
import ProductGrid from "@/components/ProductGrid";
import OrderSection from "@/components/OrderSection";
import BrandFooter from "@/components/BrandFooter";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleOrder = (productId: string) => {
    setSelectedProduct(productId);
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrandNavbar />
      <HeroBanner />
      <MarqueeBanner />
      <ProductGrid onOrder={handleOrder} />
      <OrderSection selectedProductId={selectedProduct} />
      <BrandFooter />
    </div>
  );
};

export default Index;
