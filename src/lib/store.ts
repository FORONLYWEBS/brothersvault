export interface Order {
  id: string;
  productName: string;
  productImage: string;
  name: string;
  phone: string;
  age: string;
  size: string;
  address: string;
  paymentMethod: "fonepay" | "cod";
  paymentProof?: string; // base64 data URL for fonepay proof
  timestamp: number;
}

export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem("bv_orders") || "[]");
  } catch {
    return [];
  }
}

export function addOrder(order: Omit<Order, "id" | "timestamp">): Order {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  orders.push(newOrder);
  localStorage.setItem("bv_orders", JSON.stringify(orders));
  return newOrder;
}

export function deleteOrder(id: string): void {
  const orders = getOrders().filter((o) => o.id !== id);
  localStorage.setItem("bv_orders", JSON.stringify(orders));
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
}

// Custom products (admin-added)
export function getCustomProducts(): Product[] {
  try {
    return JSON.parse(localStorage.getItem("bv_custom_products") || "[]");
  } catch {
    return [];
  }
}

export function addCustomProduct(product: Omit<Product, "id">): Product {
  const products = getCustomProducts();
  const newProduct: Product = { ...product, id: `custom-${Date.now()}` };
  products.push(newProduct);
  localStorage.setItem("bv_custom_products", JSON.stringify(products));
  return newProduct;
}

export function deleteCustomProduct(id: string): void {
  const products = getCustomProducts().filter((p) => p.id !== id);
  localStorage.setItem("bv_custom_products", JSON.stringify(products));
}
