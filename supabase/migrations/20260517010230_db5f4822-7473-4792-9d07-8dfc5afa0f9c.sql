
-- Questions table
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('short_text', 'multiple_choice', 'rating')),
  label TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_questions_form_id_position ON public.questions(form_id, position);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Owner full management
CREATE POLICY "Owners can view their form questions"
  ON public.questions FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.forms f WHERE f.id = form_id AND f.user_id = auth.uid()));

CREATE POLICY "Owners can insert their form questions"
  ON public.questions FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.forms f WHERE f.id = form_id AND f.user_id = auth.uid()));

CREATE POLICY "Owners can update their form questions"
  ON public.questions FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.forms f WHERE f.id = form_id AND f.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.forms f WHERE f.id = form_id AND f.user_id = auth.uid()));

CREATE POLICY "Owners can delete their form questions"
  ON public.questions FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.forms f WHERE f.id = form_id AND f.user_id = auth.uid()));

-- Public read so respondents can render the form
CREATE POLICY "Anyone can read questions to fill forms"
  ON public.questions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read of forms so respondents can fetch title/description
CREATE POLICY "Anyone can read a form to fill it out"
  ON public.forms FOR SELECT
  TO anon, authenticated
  USING (true);

-- Responses table
CREATE TABLE public.responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_responses_form_id ON public.responses(form_id);

ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a response
CREATE POLICY "Anyone can submit a response"
  ON public.responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only the form owner can read responses to their forms
CREATE POLICY "Owners can view responses to their forms"
  ON public.responses FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.forms f WHERE f.id = form_id AND f.user_id = auth.uid()));
