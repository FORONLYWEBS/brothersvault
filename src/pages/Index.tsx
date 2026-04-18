import BrandNavbar from "@/components/BrandNavbar";
import HeroBanner from "@/components/HeroBanner";
import MarqueeBanner from "@/components/MarqueeBanner";
import ProductGrid from "@/components/ProductGrid";
import BrandFooter from "@/components/BrandFooter";
import CrawlingSpider from "@/components/CrawlingSpider";
import CursorAura from "@/components/CursorAura";
import StyleAssistant from "@/components/StyleAssistant";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleOrder = (productId: string) => {
    navigate(`/order?product=${productId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground haunted-cursor">
      <CursorAura />
      <CrawlingSpider />
      <BrandNavbar />
      <HeroBanner />
      <MarqueeBanner />
      <ProductGrid onOrder={handleOrder} />
      <MarqueeBanner />
      <BrandFooter />
      <StyleAssistant />
    </div>
  );
};

export default Index;
