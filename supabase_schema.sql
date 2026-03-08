-- COPIE E COLE ESTE CÓDIGO NO EDITOR SQL DO SUPABASE
-- Link: https://supabase.com/dashboard/project/uhsedujkzkprogsvfpjj/sql

-- 1. Cria a tabela de configurações
CREATE TABLE IF NOT EXISTS public.hotel_settings (
    key TEXT PRIMARY KEY,
    value TEXT
);

-- 2. Insere os dados iniciais (Anúncio e Velocidade)
INSERT INTO public.hotel_settings (key, value)
VALUES 
    ('announcement', 'Bem-vindo ao Alpha Plaza Hotel. Sua experiência de elite começa agora.'),
    ('ticker_speed', '20')
ON CONFLICT (key) DO NOTHING;

-- 3. Habilita segurança (Row Level Security)
ALTER TABLE public.hotel_settings ENABLE ROW LEVEL SECURITY;

-- 4. Permite leitura pública (Qualquer pessoa pode ler o anúncio)
CREATE POLICY "Allow public read access"
ON public.hotel_settings
FOR SELECT
TO public
USING (true);

-- 5. Permite atualização pública (Para o Painel Admin funcionar sem login complexo)
-- Nota: Em produção, você deve restringir isso a usuários autenticados.
CREATE POLICY "Allow public update access"
ON public.hotel_settings
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- 6. Permite inserção pública (Caso precise criar novas chaves via Admin)
CREATE POLICY "Allow public insert access"
ON public.hotel_settings
FOR INSERT
TO public
WITH CHECK (true);

-- 7. Adiciona a tabela à publicação em tempo real (Realtime)
-- Isso permite que os terminais recebam atualizações instantâneas.
alter publication supabase_realtime add table hotel_settings;
