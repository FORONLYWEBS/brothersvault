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
