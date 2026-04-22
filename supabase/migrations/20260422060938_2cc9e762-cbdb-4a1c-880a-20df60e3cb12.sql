CREATE TABLE public.hidden_products (
  product_id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hidden_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hidden products"
ON public.hidden_products FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert hidden products"
ON public.hidden_products FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can delete hidden products"
ON public.hidden_products FOR DELETE TO public USING (true);

ALTER TABLE public.hidden_products REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.hidden_products;