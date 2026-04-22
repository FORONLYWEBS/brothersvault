ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER TABLE public.custom_products REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.custom_products;