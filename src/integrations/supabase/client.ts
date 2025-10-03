import { createClient } from '@supabase/supabase-js';

export interface ProdutoCatalogo {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: string | null;
  preco_diario: number | null;
  preco_semanal: number | null;
  preco_mensal: number | null;
  imagem_url: string | null;
  especificacoes: string | null;
  disponivel: boolean;
  destaque: boolean;
  created_at: string;
  updated_at: string;
  preco_normal: number | null;
}

const SUPABASE_URL = "https://kxrwibjymytjihvhsbtq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cndpYmp5bXl0amlodmhzYnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1ODQ0OTYsImV4cCI6MjA3NDE2MDQ5Nn0.LdA-4HbABxyqVM2UHWP6Q6FhiDABgxeYqmCu89qadpg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
