
CREATE TABLE public.forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forms" ON public.forms FOR SELECT USING (true);
CREATE POLICY "Anyone can create forms" ON public.forms FOR INSERT WITH CHECK (true);
