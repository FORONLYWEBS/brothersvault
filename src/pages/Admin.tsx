import { useState, useEffect } from "react";
import { getOrders, type Order } from "@/lib/store";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Package, Trash2 } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (authenticated) {
      setOrders(getOrders().sort((a, b) => b.timestamp - a.timestamp));
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

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <img src={logo} alt="Brothers Vault" className="h-12 mx-auto mb-6" />
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
        </div>
        <div className="flex items-center gap-3">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-oswald tracking-wider text-muted-foreground">
            {orders.length} ORDERS
          </span>
        </div>
      </div>

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
                <div className="flex-1 space-y-1">
                  <p className="font-oswald font-semibold tracking-wide">{order.productName}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-sm text-muted-foreground font-oswald">
                    <p>Name: <span className="text-foreground">{order.name}</span></p>
                    <p>Phone: <span className="text-foreground">{order.phone}</span></p>
                    <p>Age: <span className="text-foreground">{order.age}</span></p>
                    <p>Size: <span className="text-foreground font-semibold">{order.size}</span></p>
                  </div>
                  <p className="text-xs text-muted-foreground/60 font-oswald mt-1">
                    {new Date(order.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
