-- Create produtos_catalogo table
CREATE TABLE public.produtos_catalogo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT,
  preco_diario NUMERIC(10, 2),
  preco_semanal NUMERIC(10, 2),
  preco_mensal NUMERIC(10, 2),
  preco_normal NUMERIC(10, 2),
  imagem_url TEXT,
  especificacoes TEXT,
  disponivel BOOLEAN NOT NULL DEFAULT true,
  destaque BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.produtos_catalogo ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view available products
CREATE POLICY "Anyone can view available products" 
ON public.produtos_catalogo 
FOR SELECT 
USING (disponivel = true);

-- Allow authenticated users to view all products
CREATE POLICY "Authenticated users can view all products" 
ON public.produtos_catalogo 
FOR SELECT 
TO authenticated
USING (true);

-- Allow authenticated users to insert products
CREATE POLICY "Authenticated users can insert products" 
ON public.produtos_catalogo 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update products
CREATE POLICY "Authenticated users can update products" 
ON public.produtos_catalogo 
FOR UPDATE 
TO authenticated
USING (true);

-- Allow authenticated users to delete products
CREATE POLICY "Authenticated users can delete products" 
ON public.produtos_catalogo 
FOR DELETE 
TO authenticated
USING (true);

-- Create index for better performance
CREATE INDEX idx_produtos_catalogo_categoria ON public.produtos_catalogo(categoria);
CREATE INDEX idx_produtos_catalogo_disponivel ON public.produtos_catalogo(disponivel);
CREATE INDEX idx_produtos_catalogo_destaque ON public.produtos_catalogo(destaque);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_produtos_catalogo_updated_at
BEFORE UPDATE ON public.produtos_catalogo
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.produtos_catalogo;