export interface Order {
  id: string;
  productName: string;
  productImage: string;
  name: string;
  phone: string;
  age: string;
  size: string;
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

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
}
