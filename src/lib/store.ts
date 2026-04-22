import { supabase } from "@/integrations/supabase/client";

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
  paymentProof?: string;
  timestamp: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
}

// ===== Orders (cloud) =====

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getOrders error", error);
    return [];
  }
  return (data || []).map((r: any) => ({
    id: r.id,
    productName: r.product_name,
    productImage: r.product_image,
    name: r.customer_name,
    phone: r.phone,
    age: r.age,
    size: r.size,
    address: r.address,
    paymentMethod: r.payment_method,
    paymentProof: r.payment_proof || undefined,
    timestamp: new Date(r.created_at).getTime(),
  }));
}

export async function addOrder(order: Omit<Order, "id" | "timestamp">): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      product_name: order.productName,
      product_image: order.productImage,
      customer_name: order.name,
      phone: order.phone,
      age: order.age,
      size: order.size,
      address: order.address,
      payment_method: order.paymentMethod,
      payment_proof: order.paymentProof ?? null,
    })
    .select()
    .single();
  if (error || !data) {
    console.error("addOrder error", error);
    return null;
  }
  return {
    id: data.id,
    productName: data.product_name,
    productImage: data.product_image,
    name: data.customer_name,
    phone: data.phone,
    age: data.age,
    size: data.size,
    address: data.address,
    paymentMethod: data.payment_method as "fonepay" | "cod",
    paymentProof: data.payment_proof || undefined,
    timestamp: new Date(data.created_at).getTime(),
  };
}

export async function deleteOrder(id: string): Promise<void> {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) console.error("deleteOrder error", error);
}

// ===== Custom Products (cloud) =====

export async function getCustomProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("custom_products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("getCustomProducts error", error);
    return [];
  }
  return (data || []).map((r: any) => ({
    id: r.id,
    name: r.name,
    price: Number(r.price),
    image: r.image,
    tag: r.tag || undefined,
  }));
}

export async function addCustomProduct(product: Omit<Product, "id">): Promise<Product | null> {
  const { data, error } = await supabase
    .from("custom_products")
    .insert({
      name: product.name,
      price: product.price,
      image: product.image,
      tag: product.tag ?? null,
    })
    .select()
    .single();
  if (error || !data) {
    console.error("addCustomProduct error", error);
    return null;
  }
  return {
    id: data.id,
    name: data.name,
    price: Number(data.price),
    image: data.image,
    tag: data.tag || undefined,
  };
}

export async function deleteCustomProduct(id: string): Promise<void> {
  const { error } = await supabase.from("custom_products").delete().eq("id", id);
  if (error) console.error("deleteCustomProduct error", error);
}

// ===== Hidden default products (cloud) =====

export async function getHiddenProductIds(): Promise<string[]> {
  const { data, error } = await supabase.from("hidden_products").select("product_id");
  if (error) {
    console.error("getHiddenProductIds error", error);
    return [];
  }
  return (data || []).map((r: any) => r.product_id);
}

export async function hideDefaultProduct(productId: string): Promise<void> {
  const { error } = await supabase
    .from("hidden_products")
    .insert({ product_id: productId });
  if (error) console.error("hideDefaultProduct error", error);
}

export async function unhideDefaultProduct(productId: string): Promise<void> {
  const { error } = await supabase
    .from("hidden_products")
    .delete()
    .eq("product_id", productId);
  if (error) console.error("unhideDefaultProduct error", error);
}
