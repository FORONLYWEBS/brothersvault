import { useState, useEffect } from "react";
import { getOrders, deleteOrder, addCustomProduct, getCustomProducts, deleteCustomProduct, type Order, type Product } from "@/lib/store";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Package, Trash2, CreditCard, Truck, ImageIcon, Plus, Upload, X } from "lucide-react";


const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [proofModal, setProofModal] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newImageName, setNewImageName] = useState("");
  const [customProducts, setCustomProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (authenticated) {
      setOrders(getOrders().sort((a, b) => b.timestamp - a.timestamp));
      setCustomProducts(getCustomProducts());
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === "SAHILKING" && password === "SAHILDADA") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleDelete = (id: string) => {
    deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => {
      setNewImage(reader.result as string);
      setNewImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newImage) return;
    const product = addCustomProduct({
      name: newName,
      price: Number(newPrice),
      image: newImage,
      tag: newTag || undefined,
    });
    setCustomProducts((prev) => [...prev, product]);
    setNewName("");
    setNewPrice("");
    setNewTag("");
    setNewImage("");
    setNewImageName("");
    setShowAddProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    deleteCustomProduct(id);
    setCustomProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bebas tracking-[0.3em] bg-gradient-to-b from-foreground to-primary/60 bg-clip-text text-transparent mb-6">XYPHER WEARS</h2>
            <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bebas tracking-wider">ADMIN ACCESS</h1>
            <p className="text-xs text-muted-foreground font-oswald tracking-wider mt-1">AUTHORIZED PERSONNEL ONLY</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 bg-secondary border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors"
                placeholder="Enter your ID"
              />
            </div>
            <div>
              <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-secondary border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-destructive text-xs font-oswald tracking-wider">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-foreground text-primary-foreground font-oswald text-sm tracking-[0.3em] hover:bg-foreground/90 transition-colors"
            >
              LOGIN
            </button>
          </form>

          <Link to="/" className="flex items-center justify-center gap-2 text-xs font-oswald tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3 h-3" /> BACK TO STORE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <div className="border-b border-border px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bebas tracking-wider">ADMIN PANEL</h1>
          <button
            onClick={() => setShowAddProduct(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-primary-foreground text-xs font-oswald tracking-[0.15em] hover:bg-foreground/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> ADD T-SHIRT
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-oswald tracking-wider text-muted-foreground">
            {orders.length} ORDERS
          </span>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4" onClick={() => setShowAddProduct(false)}>
          <div className="bg-background border border-border p-6 w-full max-w-md space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bebas tracking-wider">ADD NEW T-SHIRT</h2>
              <button onClick={() => setShowAddProduct(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">T-SHIRT NAME</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors"
                  placeholder="e.g. Vault Graphic Tee"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">PRICE (NRs)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors"
                    placeholder="1499"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">TAG (OPTIONAL)</label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary border border-border text-sm font-oswald focus:outline-none focus:border-foreground transition-colors"
                    placeholder="e.g. NEW, HOT"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-2">T-SHIRT IMAGE</label>
                <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-border hover:border-foreground/50 cursor-pointer transition-colors bg-secondary">
                  {newImage ? (
                    <>
                      <img src={newImage} alt="Preview" className="w-24 h-24 object-cover rounded-sm" />
                      <p className="text-xs font-oswald tracking-wide text-muted-foreground">{newImageName}</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <p className="text-xs font-oswald tracking-wider">UPLOAD IMAGE</p>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-foreground text-primary-foreground font-oswald text-sm tracking-[0.3em] hover:bg-foreground/90 transition-colors"
              >
                ADD T-SHIRT
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Proof Modal */}
      {proofModal && (
        <div className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4" onClick={() => setProofModal(null)}>
          <div className="bg-background p-2 rounded max-w-lg max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img src={proofModal} alt="Payment proof" className="max-w-full max-h-[75vh] object-contain" />
            <button onClick={() => setProofModal(null)} className="w-full mt-2 py-2 text-xs font-oswald tracking-wider bg-secondary hover:bg-secondary/80 transition-colors">
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Custom Products Section */}
      {customProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 border-b border-border">
          <p className="text-xs font-oswald tracking-[0.2em] text-muted-foreground mb-4">CUSTOM ADDED T-SHIRTS</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {customProducts.map((p) => (
              <div key={p.id} className="relative group border border-border p-2">
                <img src={p.image} alt={p.name} className="w-full aspect-square object-cover rounded-sm" />
                <p className="text-xs font-oswald tracking-wide mt-1 truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground font-oswald">NRs {p.price}</p>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground font-oswald tracking-wider">NO ORDERS YET</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-border p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-20 h-20 object-cover rounded-sm bg-secondary flex-shrink-0"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <p className="font-oswald font-semibold tracking-wide">{order.productName}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-oswald tracking-wider ${
                      order.paymentMethod === "fonepay"
                        ? "bg-green-500/10 text-green-600 border border-green-500/20"
                        : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                    }`}>
                      {order.paymentMethod === "fonepay" ? <CreditCard className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                      {order.paymentMethod === "fonepay" ? "FONEPAY" : "COD"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 text-sm text-muted-foreground font-oswald">
                    <p>Name: <span className="text-foreground">{order.name}</span></p>
                    <p>Phone: <span className="text-foreground">{order.phone}</span></p>
                    <p>Age: <span className="text-foreground">{order.age}</span></p>
                    <p>Size: <span className="text-foreground font-semibold">{order.size}</span></p>
                    <p className="col-span-2">Address: <span className="text-foreground">{order.address}</span></p>
                  </div>
                  {order.paymentProof && (
                    <button
                      onClick={() => setProofModal(order.paymentProof!)}
                      className="inline-flex items-center gap-2 text-xs font-oswald tracking-wider text-foreground/70 hover:text-foreground border border-border px-3 py-1.5 transition-colors"
                    >
                      <ImageIcon className="w-3 h-3" /> VIEW PAYMENT PROOF
                    </button>
                  )}
                  <p className="text-xs text-muted-foreground/60 font-oswald mt-1">
                    {new Date(order.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-2"
                  title="Delete order"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
