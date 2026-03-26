import { motion } from "framer-motion";
import { products } from "@/lib/products";

interface ProductGridProps {
  onOrder: (productId: string) => void;
}

const ProductGrid = ({ onOrder }: ProductGridProps) => {
  return (
    <section id="collection" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] font-oswald text-muted-foreground mb-2">EXCLUSIVE</p>
        <h2 className="text-4xl md:text-5xl font-bebas tracking-wider">PREMIUM COLLECTION</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
              {product.tag && (
                <span className="absolute top-2 left-2 z-10 bg-foreground text-primary-foreground text-[10px] font-oswald tracking-widest px-2 py-1">
                  {product.tag}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => onOrder(product.id)}
                  className="bg-primary-foreground text-foreground text-xs font-oswald tracking-[0.2em] px-6 py-2.5 hover:bg-primary-foreground/90 transition-colors"
                >
                  ORDER NOW
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium font-oswald tracking-wide truncate">{product.name}</p>
              <p className="text-sm text-muted-foreground font-oswald">₹{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
