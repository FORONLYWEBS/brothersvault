import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts } from "@/lib/products";
import { addOrder } from "@/lib/store";
import { toast } from "sonner";
import { Check, Upload, CreditCard, Truck } from "lucide-react";
import fonepayQr from "@/assets/fonepay-qr.jpg";
import SpiderWebDecor from "./SpiderWebDecor";
import FloatingParticles from "./FloatingParticles";
import GhostFog from "./GhostFog";

interface OrderSectionProps {
  selectedProductId?: string | null;
}

const sizes = ["S", "M", "L", "XL", "XXL"];

const OrderSection = ({ selectedProductId }: OrderSectionProps = {}) => {
  const products = getAllProducts();
  const [searchParams] = useSearchParams();
  const initialProduct = selectedProductId || searchParams.get("product");
  const [selected, setSelected] = useState<string | null>(initialProduct || null);
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
    setName(""); setPhone(""); setAge(""); setSize(""); setAddress("");
    setPaymentMethod(""); setPaymentProof(""); setProofFileName(""); setSelected(null);
  };

  return (
    <section id="order" className="relative py-24 px-4 md:px-8 bg-card overflow-hidden">
      <GhostFog />
      <FloatingParticles count={12} />
      <SpiderWebDecor position="top-left" size={200} opacity={0.1} withSpider />
      <SpiderWebDecor position="top-right" size={160} opacity={0.07} />
      <SpiderWebDecor position="bottom-right" size={140} opacity={0.05} />

      {/* Top & bottom atmospheric borders */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] font-oswald text-primary/70 mb-2"
          >
            🕸️ PLACE YOUR
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bebas tracking-wider"
          >
            <motion.span
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-b from-foreground via-foreground to-primary/60 bg-clip-text text-transparent"
            >
              ORDER NOW
            </motion.span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4"
          />
          <p className="mt-4 text-sm text-muted-foreground font-oswald tracking-wide">
            Select your T-shirt, fill in your details & choose payment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* T-shirt selection */}
          <div>
            <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-4">SELECT T-SHIRT</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {products.map((p) => (
                <motion.button
                  type="button"
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-all ${
                    selected === p.id ? "border-primary ring-2 ring-primary/50 shadow-[0_0_20px_hsl(270_60%_55%/0.3)]" : "border-border hover:border-primary/40"
                  }`}
                >
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  {selected === p.id && (
                    <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                      <Check className="w-6 h-6 text-primary-foreground" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
            {selectedProduct && (
              <p className="mt-2 text-sm font-oswald tracking-wide">
                Selected: <span className="font-semibold text-primary">{selectedProduct.name}</span> — NRs {selectedProduct.price}
              </p>
            )}
          </div>

          {/* Form fields */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "YOUR NAME", value: name, onChange: setName, type: "text", placeholder: "Enter your full name" },
              { label: "PHONE NUMBER", value: phone, onChange: setPhone, type: "tel", placeholder: "Enter your phone number" },
              { label: "AGE", value: age, onChange: setAge, type: "number", placeholder: "Your age" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-background border border-border text-sm font-oswald focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(270_60%_55%/0.2)] transition-all"
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">SIZE</label>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <motion.button
                    type="button"
                    key={s}
                    onClick={() => setSize(s)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 py-3 text-sm font-oswald tracking-wider border transition-all ${
                      size === s
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsl(270_60%_55%/0.3)]"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    {s}
                  </motion.button>
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
              className="w-full px-4 py-3 bg-background border border-border text-sm font-oswald focus:outline-none focus:border-primary focus:shadow-[0_0_15px_hsl(270_60%_55%/0.2)] transition-all resize-none"
              required
            />
          </div>

          {/* Payment method */}
          <div>
            <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-4">PAYMENT METHOD</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { method: "fonepay" as const, icon: CreditCard, label: "FONEPAY", sub: "ONLINE PAYMENT" },
                { method: "cod" as const, icon: Truck, label: "CASH ON DELIVERY", sub: "PAY WHEN RECEIVED" },
              ].map(({ method, icon: Icon, label, sub }) => (
                <motion.button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 25px hsl(270 60% 55% / 0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center gap-3 p-6 border-2 transition-all ${
                    paymentMethod === method
                      ? "border-primary bg-primary/10 shadow-[0_0_25px_hsl(270_60%_55%/0.2)]"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <Icon className="w-8 h-8" />
                  <span className="font-oswald text-sm tracking-wider font-semibold">{label}</span>
                  <span className="text-[11px] font-oswald text-muted-foreground tracking-wide">{sub}</span>
                </motion.button>
              ))}
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
                <div className="flex flex-col items-center gap-4 p-6 border border-primary/20 bg-background rounded-sm">
                  <p className="text-xs font-oswald tracking-[0.2em] text-primary/70">SCAN QR TO PAY</p>
                  <img src={fonepayQr} alt="Fonepay QR Code" className="w-56 h-56 object-contain rounded" />
                  <p className="text-xs font-oswald text-muted-foreground tracking-wide text-center">
                    Scan with your Fonepay-supported app and upload proof below
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-3">UPLOAD PAYMENT PROOF</label>
                  <label className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-primary/20 hover:border-primary/50 cursor-pointer transition-colors bg-background">
                    {paymentProof ? (
                      <>
                        <img src={paymentProof} alt="Payment proof" className="w-32 h-32 object-contain rounded" />
                        <p className="text-xs font-oswald tracking-wide text-muted-foreground">{proofFileName}</p>
                        <p className="text-[11px] font-oswald tracking-wider text-primary/60">CLICK TO CHANGE</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm font-oswald tracking-wider">CLICK TO UPLOAD SCREENSHOT</p>
                        <p className="text-[11px] font-oswald text-muted-foreground tracking-wide">PNG, JPG — MAX 5MB</p>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleProofUpload} className="hidden" />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px hsl(270 60% 55% / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-primary text-primary-foreground font-oswald text-sm tracking-[0.3em] hover:bg-primary/90 transition-all relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">
              {paymentMethod === "cod" ? "🕸️ PLACE ORDER — CASH ON DELIVERY" : paymentMethod === "fonepay" ? "🕸️ PLACE ORDER — FONEPAY" : "🕸️ PLACE ORDER"}
            </span>
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default OrderSection;
