DELETE FROM public.forms;
ALTER TABLE public.forms ADD COLUMN user_id UUID NOT NULL;

DROP POLICY IF EXISTS "Anyone can view forms" ON public.forms;
DROP POLICY IF EXISTS "Anyone can create forms" ON public.forms;

CREATE POLICY "Users can view their own forms"
ON public.forms FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own forms"
ON public.forms FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own forms"
ON public.forms FOR UPDATE TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own forms"
ON public.forms FOR DELETE TO authenticated
USING (auth.uid() = user_id);