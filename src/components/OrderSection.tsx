import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { addOrder } from "@/lib/store";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface OrderSectionProps {
  selectedProductId?: string | null;
}

const sizes = ["S", "M", "L", "XL", "XXL"];

const OrderSection = ({ selectedProductId }: OrderSectionProps) => {
  const [selected, setSelected] = useState<string | null>(selectedProductId || null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");

  const selectedProduct = products.find((p) => p.id === selected);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !name || !phone || !age || !size) {
      toast.error("Please fill all fields and select a T-shirt");
      return;
    }
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const product = products.find((p) => p.id === selected)!;
    addOrder({
      productName: product.name,
      productImage: product.image,
      name,
      phone,
      age,
      size,
    });

    toast.success("Order placed successfully! We'll contact you soon.");
    setName("");
    setPhone("");
    setAge("");
    setSize("");
    setSelected(null);
  };

  return (
    <section id="order" className="py-20 px-4 md:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] font-oswald text-muted-foreground mb-2">PLACE YOUR</p>
          <h2 className="text-4xl md:text-5xl font-bebas tracking-wider">ORDER NOW</h2>
          <p className="mt-3 text-sm text-muted-foreground font-oswald tracking-wide">
            Select your T-shirt and fill in your details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* T-shirt selection */}
          <div>
            <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-4">
              SELECT T-SHIRT
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {products.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-all ${
                    selected === p.id ? "border-foreground ring-2 ring-foreground" : "border-border hover:border-foreground/40"
                  }`}
                >
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  {selected === p.id && (
                    <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                      <Check className="w-6 h-6 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            {selectedProduct && (
              <p className="mt-2 text-sm font-oswald tracking-wide">
                Selected: <span className="font-semibold">{selectedProduct.name}</span> — ₹{selectedProduct.price}
              </p>
            )}
          </div>

          {/* Form fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">
                YOUR NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-background border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 bg-background border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">
                AGE
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Your age"
                min="10"
                max="80"
                className="w-full px-4 py-3 bg-background border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">
                SIZE
              </label>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-3 text-sm font-oswald tracking-wider border transition-all ${
                      size === s
                        ? "bg-foreground text-primary-foreground border-foreground"
                        : "bg-background border-border hover:border-foreground/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-foreground text-primary-foreground font-oswald text-sm tracking-[0.3em] hover:bg-foreground/90 transition-colors"
          >
            PLACE ORDER
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default OrderSection;
