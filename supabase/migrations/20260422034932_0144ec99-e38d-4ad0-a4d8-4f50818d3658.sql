
-- Orders table (shared across all devices)
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  age TEXT NOT NULL,
  size TEXT NOT NULL,
  address TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('fonepay','cod')),
  payment_proof TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can place an order
CREATE POLICY "Anyone can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- Anyone can read orders (admin uses hardcoded creds, no auth system)
CREATE POLICY "Anyone can view orders"
  ON public.orders FOR SELECT
  USING (true);

-- Anyone can delete orders (admin only in UI; gated by login screen)
CREATE POLICY "Anyone can delete orders"
  ON public.orders FOR DELETE
  USING (true);

-- Custom products table (admin-added t-shirts, shared)
CREATE TABLE public.custom_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT NOT NULL,
  tag TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view custom products"
  ON public.custom_products FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert custom products"
  ON public.custom_products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete custom products"
  ON public.custom_products FOR DELETE
  USING (true);

CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
