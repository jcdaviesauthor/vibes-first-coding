import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Form, Question } from "@/types";

export const Route = createFileRoute("/f/$formId")({
  head: () => ({ meta: [{ title: "Fill out form" }] }),
  component: FillForm,
});

function FillForm() {
  const { formId } = Route.useParams();
  const [form, setForm] = useState<Form | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [{ data: f, error: fe }, { data: qs, error: qe }] = await Promise.all([
        supabase.from("forms").select("id, title, description").eq("id", formId).maybeSingle(),
        supabase.from("questions").select("*").eq("form_id", formId).order("position", { ascending: true }),
      ]);
      if (fe || !f) setError(fe?.message ?? "Form not found");
      else setForm(f as Form);
      if (qe) setError(qe.message);
      else setQuestions((qs ?? []).map((q) => ({ ...q, options: Array.isArray(q.options) ? q.options as string[] : [] })));
      setLoading(false);
    })();
  }, [formId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const payload = questions.map((q) => ({
      question_id: q.id,
      type: q.type,
      label: q.label,
      answer: answers[q.id] ?? null,
    }));
    const { error } = await supabase.from("responses").insert({ form_id: formId, answers: payload });
    setSubmitting(false);
    if (error) return setError(error.message);
    setDone(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground paper-grain">
        <div className="mx-auto max-w-2xl px-6 py-16 space-y-6 animate-pulse">
          <div className="h-10 w-2/3 rounded-lg bg-foreground/10" />
          <div className="h-4 w-1/2 rounded bg-foreground/10" />
          <div className="space-y-4 mt-8">
            {[1, 2, 3].map((n) => <div key={n} className="h-16 rounded-xl bg-foreground/10" />)}
          </div>
        </div>
      </main>
    );
  }

  if (!form) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl tracking-tight">Form not found</h1>
          <p className="mt-2 font-sans text-sm text-muted-foreground">This link may be broken or the form was deleted.</p>
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-6xl md:text-7xl tracking-tight">Thank you</h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-widest text-foreground/50">Response saved</p>
          <p className="mt-3 font-sans text-sm text-foreground/70">Thanks for filling out “{form.title}”. You can close this tab.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground paper-grain">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-10">
          <h1 className="font-display text-5xl md:text-6xl tracking-tight">{form.title}</h1>
          {form.description && <p className="mt-3 font-sans text-base text-foreground/70">{form.description}</p>}
        </header>

        {questions.length === 0 ? (
          <p className="font-sans text-sm text-muted-foreground">This form has no questions yet.</p>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            {questions.map((q, i) => (
              <div key={q.id}>
                <label className="font-sans text-base font-semibold">
                  {i + 1}. {q.label}
                </label>
                {q.type === "short_text" && (
                  <input
                    value={(answers[q.id] as string) ?? ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    className="mt-2 w-full bg-transparent border-b border-foreground/20 px-1 py-2 font-sans text-sm focus:outline-none focus:border-foreground/70"
                    placeholder="Your answer"
                  />
                )}
                {q.type === "multiple_choice" && (
                  <div className="mt-3 space-y-2">
                    {q.options.map((o, j) => (
                      <label key={j} className="flex items-center gap-2 font-sans text-sm cursor-pointer">
                        <input
                          type="radio"
                          name={q.id}
                          value={o}
                          checked={answers[q.id] === o}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: o }))}
                        />
                        {o}
                      </label>
                    ))}
                  </div>
                )}
                {q.type === "rating" && (
                  <div className="mt-3 flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => {
                      const active = (answers[q.id] as number) >= n;
                      return (
                        <button
                          type="button"
                          key={n}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: n }))}
                          className={`text-3xl leading-none transition-colors ${active ? "text-foreground" : "text-foreground/25 hover:text-foreground/50"}`}
                          aria-label={`${n} star${n > 1 ? "s" : ""}`}
                        >
                          ★
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {error && <p className="font-sans text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 font-sans text-sm font-bold tracking-tight hover:-translate-y-0.5 transition-transform disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}