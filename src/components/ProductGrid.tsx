import { motion } from "framer-motion";
import { getAllProducts } from "@/lib/products";
import SpiderWebDecor from "./SpiderWebDecor";
import FloatingParticles from "./FloatingParticles";

interface ProductGridProps {
  onOrder: (productId: string) => void;
}

const ProductGrid = ({ onOrder }: ProductGridProps) => {
  const products = getAllProducts();
  return (
    <section id="collection" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <FloatingParticles count={12} />
      <SpiderWebDecor position="top-right" size={160} opacity={0.06} />

      <div className="text-center mb-16 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] font-oswald text-primary/70 mb-2"
        >
          EXCLUSIVE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bebas tracking-wider"
        >
          PREMIUM COLLECTION
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-sm border border-border/50 hover:border-primary/30 transition-colors duration-500">
              {product.tag && (
                <span className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[10px] font-oswald tracking-widest px-2 py-1">
                  {product.tag}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <motion.button
                  onClick={() => onOrder(product.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground text-xs font-oswald tracking-[0.2em] px-6 py-2.5 hover:shadow-[0_0_20px_hsl(270_60%_55%/0.4)] transition-all"
                >
                  ORDER NOW
                </motion.button>
              </div>
              {/* Subtle corner glow on hover */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/0 group-hover:bg-primary/10 rounded-full blur-xl transition-all duration-500" />
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium font-oswald tracking-wide truncate">{product.name}</p>
              <p className="text-sm text-primary/70 font-oswald">₹{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
