import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/products";
import { addOrder } from "@/lib/store";
import { toast } from "sonner";
import { Check, Upload, CreditCard, Truck, ImageIcon } from "lucide-react";
import fonepayQr from "@/assets/fonepay-qr.jpg";

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
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"fonepay" | "cod" | "">("");
  const [paymentProof, setPaymentProof] = useState<string>("");
  const [proofFileName, setProofFileName] = useState("");

  const selectedProduct = products.find((p) => p.id === selected);

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPaymentProof(reader.result as string);
      setProofFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !name || !phone || !age || !size || !paymentMethod) {
      toast.error("Please fill all fields, select a T-shirt, and choose payment method");
      return;
    }
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!address) {
      toast.error("Please enter your delivery address");
      return;
    }
    if (paymentMethod === "fonepay" && !paymentProof) {
      toast.error("Please upload your payment proof screenshot");
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
      address,
      paymentMethod,
      paymentProof: paymentMethod === "fonepay" ? paymentProof : undefined,
    });

    toast.success("Order placed successfully! We'll contact you soon.");
    setName("");
    setPhone("");
    setAge("");
    setSize("");
    setAddress("");
    setPaymentMethod("");
    setPaymentProof("");
    setProofFileName("");
    setSelected(null);
  };

  return (
    <section id="order" className="py-20 px-4 md:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] font-oswald text-muted-foreground mb-2">PLACE YOUR</p>
          <h2 className="text-4xl md:text-5xl font-bebas tracking-wider">ORDER NOW</h2>
          <p className="mt-3 text-sm text-muted-foreground font-oswald tracking-wide">
            Select your T-shirt, fill in your details & choose payment
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
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">YOUR NAME</label>
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
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">PHONE NUMBER</label>
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
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">AGE</label>
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
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">SIZE</label>
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

          {/* Address */}
          <div>
            <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">DELIVERY ADDRESS</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full delivery address"
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors resize-none"
              required
            />
          </div>

          {/* Payment method */}
          <div>
            <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-4">PAYMENT METHOD</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("fonepay")}
                className={`flex flex-col items-center gap-3 p-6 border-2 transition-all ${
                  paymentMethod === "fonepay"
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                <CreditCard className="w-8 h-8" />
                <span className="font-oswald text-sm tracking-wider font-semibold">FONEPAY</span>
                <span className="text-[11px] font-oswald text-muted-foreground tracking-wide">ONLINE PAYMENT</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex flex-col items-center gap-3 p-6 border-2 transition-all ${
                  paymentMethod === "cod"
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                <Truck className="w-8 h-8" />
                <span className="font-oswald text-sm tracking-wider font-semibold">CASH ON DELIVERY</span>
                <span className="text-[11px] font-oswald text-muted-foreground tracking-wide">PAY WHEN RECEIVED</span>
              </button>
            </div>
          </div>

          {/* Fonepay QR + Proof */}
          <AnimatePresence>
            {paymentMethod === "fonepay" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 overflow-hidden"
              >
                <div className="flex flex-col items-center gap-4 p-6 border border-border bg-background">
                  <p className="text-xs font-oswald tracking-[0.2em] text-muted-foreground">SCAN QR TO PAY</p>
                  <img src={fonepayQr} alt="Fonepay QR Code" className="w-56 h-56 object-contain rounded" />
                  <p className="text-xs font-oswald text-muted-foreground tracking-wide text-center">
                    Scan with your Fonepay-supported app and upload proof below
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-3">
                    UPLOAD PAYMENT PROOF
                  </label>
                  <label className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-border hover:border-foreground/50 cursor-pointer transition-colors bg-background">
                    {paymentProof ? (
                      <>
                        <img src={paymentProof} alt="Payment proof" className="w-32 h-32 object-contain rounded" />
                        <p className="text-xs font-oswald tracking-wide text-muted-foreground">{proofFileName}</p>
                        <p className="text-[11px] font-oswald tracking-wider text-foreground/60">CLICK TO CHANGE</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm font-oswald tracking-wider">CLICK TO UPLOAD SCREENSHOT</p>
                        <p className="text-[11px] font-oswald text-muted-foreground tracking-wide">PNG, JPG — MAX 5MB</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProofUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-foreground text-primary-foreground font-oswald text-sm tracking-[0.3em] hover:bg-foreground/90 transition-colors"
          >
            {paymentMethod === "cod" ? "PLACE ORDER — CASH ON DELIVERY" : paymentMethod === "fonepay" ? "PLACE ORDER — FONEPAY" : "PLACE ORDER"}
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default OrderSection;
