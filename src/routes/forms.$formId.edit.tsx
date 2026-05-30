import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/landing/Nav";
import type { Form, Question, QType } from "@/types";

export const Route = createFileRoute("/forms/$formId/edit")({
  head: () => ({ meta: [{ title: "Edit form — Buddy" }] }),
  component: EditForm,
});

function EditForm() {
  const { formId } = Route.useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/login" });
        return;
      }
      const { data: f, error: fe } = await supabase
        .from("forms")
        .select("*")
        .eq("id", formId)
        .maybeSingle();
      if (fe || !f) {
        setError(fe?.message ?? "Form not found");
        setLoading(false);
        return;
      }
      if (f.user_id !== sess.session.user.id) {
        setError("You don't have access to this form.");
        setLoading(false);
        return;
      }
      setForm(f as Form);
      const { data: qs, error: qe } = await supabase
        .from("questions")
        .select("*")
        .eq("form_id", formId)
        .order("position", { ascending: true });
      if (qe) setError(qe.message);
      else setQuestions((qs ?? []).map((q) => ({ ...q, options: Array.isArray(q.options) ? q.options as string[] : [] })));
      setLoading(false);
    })();
  }, [formId, navigate]);

  const addQuestion = async (type: QType) => {
    if (!form) return;
    const position = questions.length;
    const defaults: Record<QType, { label: string; options: string[] }> = {
      short_text: { label: "Untitled question", options: [] },
      multiple_choice: { label: "Untitled question", options: ["Option 1", "Option 2"] },
      rating: { label: "How would you rate this?", options: [] },
    };
    const { data, error } = await supabase
      .from("questions")
      .insert({ form_id: form.id, type, label: defaults[type].label, options: defaults[type].options, position })
      .select()
      .single();
    if (error) return setError(error.message);
    setQuestions((qs) => [...qs, { ...data, options: Array.isArray(data.options) ? data.options as string[] : [] } as Question]);
  };

  const updateQuestion = (id: string, patch: Partial<Question>) => {
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
    setDirty(true);
    setJustSaved(false);
  };

  const deleteQuestion = async (id: string) => {
    const prev = questions;
    const next = questions.filter((q) => q.id !== id).map((q, i) => ({ ...q, position: i }));
    setQuestions(next);
    const { error } = await supabase.from("questions").delete().eq("id", id);
    if (error) {
      setError(error.message);
      setQuestions(prev);
      return;
    }
    await supabase.from("questions").upsert(
      next.map((q) => ({ id: q.id, form_id: q.form_id, type: q.type, label: q.label, options: q.options, position: q.position }))
    );
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = questions.findIndex((q) => q.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= questions.length) return;
    const next = [...questions];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    const reordered = next.map((q, i) => ({ ...q, position: i }));
    setQuestions(reordered);
    const a = reordered[idx];
    const b = reordered[swap];
    await Promise.all([
      supabase.from("questions").update({ position: a.position }).eq("id", a.id),
      supabase.from("questions").update({ position: b.position }).eq("id", b.id),
    ]);
  };

  const saveChanges = async () => {
    if (!dirty || !form) return;
    setSaving(true);
    setError(null);
    const { error: firstError } = await supabase.from("questions").upsert(
      questions.map((q) => ({ id: q.id, form_id: q.form_id, type: q.type, label: q.label, options: q.options, position: q.position }))
    );
    if (firstError) setError(firstError.message);
    setSaving(false);
    setDirty(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const publicUrl = typeof window !== "undefined" && form ? `${window.location.origin}/f/${form.id}` : "";

  const copyLink = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="mx-auto max-w-4xl px-6 py-16 space-y-4 animate-pulse">
          <div className="h-10 w-1/2 rounded-lg bg-foreground/10" />
          <div className="h-4 w-1/3 rounded bg-foreground/10" />
          {[1, 2, 3].map((n) => <div key={n} className="h-24 rounded-2xl bg-foreground/10" />)}
        </main>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="mx-auto max-w-4xl px-6 py-16">
          <p className="font-sans text-sm text-destructive">{error}</p>
          <Link to="/dashboard" className="mt-4 inline-block font-sans text-sm underline">← Back to dashboard</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <Link to="/dashboard" className="font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground">← Dashboard</Link>
        <header className="mt-4 mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-5xl md:text-6xl tracking-tight">{form?.title}</h1>
            {form?.description && <p className="mt-2 font-sans text-sm text-foreground/70 max-w-2xl">{form.description}</p>}
          </div>
          <div className="flex gap-2">
            <Link
              to="/forms/$formId/responses"
              params={{ formId: form!.id }}
              className="rounded-full border border-foreground/20 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.12em] hover:bg-foreground hover:text-background transition-colors"
            >
              Responses
            </Link>
            <button
              onClick={() => setPreview((p) => !p)}
              className="rounded-full border border-foreground/20 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.12em] hover:bg-foreground hover:text-background transition-colors"
            >
              {preview ? "Edit" : "Preview"}
            </button>
            <button
              onClick={copyLink}
              className="rounded-full bg-foreground text-background px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.12em]"
            >
              {copied ? "Copied!" : "Copy share link"}
            </button>
          </div>
        </header>

        {error && <p className="mb-4 font-sans text-sm text-destructive">{error}</p>}

        {preview ? (
          <PreviewPane form={form!} questions={questions} />
        ) : (
          <>
            <section className="space-y-4">
              {questions.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-foreground/20 p-10 text-center">
                  <p className="font-display text-2xl tracking-tight">No questions yet</p>
                  <p className="mt-2 font-sans text-sm text-muted-foreground">Add your first question below.</p>
                </div>
              ) : (
                questions.map((q, i) => (
                  <QuestionEditor
                    key={q.id}
                    q={q}
                    index={i}
                    total={questions.length}
                    onChange={(patch) => updateQuestion(q.id, patch)}
                    onDelete={() => deleteQuestion(q.id)}
                    onMove={(dir) => move(q.id, dir)}
                  />
                ))
              )}
            </section>

            <section className="mt-8 rounded-2xl border border-foreground/10 p-6">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.12em] mb-3">Add a question</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => addQuestion("short_text")} className="rounded-full border border-foreground/20 px-4 py-2 font-sans text-sm hover:bg-foreground hover:text-background transition-colors">+ Short text</button>
                <button onClick={() => addQuestion("multiple_choice")} className="rounded-full border border-foreground/20 px-4 py-2 font-sans text-sm hover:bg-foreground hover:text-background transition-colors">+ Multiple choice</button>
                <button onClick={() => addQuestion("rating")} className="rounded-full border border-foreground/20 px-4 py-2 font-sans text-sm hover:bg-foreground hover:text-background transition-colors">+ Rating</button>
              </div>
            </section>

            {questions.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={saveChanges}
                  disabled={saving}
                  className={`rounded-full px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
                    justSaved || !dirty
                      ? "border border-foreground/20 hover:bg-foreground hover:text-background"
                      : "bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40"
                  }`}
                >
                  {saving ? "Saving…" : justSaved ? "Saved ✓" : "Save changes"}
                </button>
                {!dirty && !justSaved && (
                  <span className="font-sans text-xs text-muted-foreground">All changes saved</span>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function QuestionEditor({
  q, index, total, onChange, onDelete, onMove,
}: {
  q: Question;
  index: number;
  total: number;
  onChange: (patch: Partial<Question>) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const typeLabel = q.type === "short_text" ? "Short text" : q.type === "multiple_choice" ? "Multiple choice" : "Rating";
  return (
    <div className="rounded-2xl border border-foreground/10 bg-background/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
          {String(index + 1).padStart(2, "0")} · {typeLabel}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => onMove(-1)} disabled={index === 0} className="rounded-md border border-foreground/15 px-2 py-1 text-xs disabled:opacity-30">↑</button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} className="rounded-md border border-foreground/15 px-2 py-1 text-xs disabled:opacity-30">↓</button>
          <button onClick={onDelete} className="ml-2 rounded-md px-2 py-1 text-xs text-destructive hover:bg-destructive/10">Delete</button>
        </div>
      </div>
      <input
        value={q.label}
        onChange={(e) => onChange({ label: e.target.value })}
        className="mt-3 w-full bg-transparent border-b border-foreground/20 px-1 py-2 font-sans text-base font-medium focus:outline-none focus:border-foreground/70 transition-colors"
        placeholder="Question text"
      />
      {q.type === "multiple_choice" && (
        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-mono text-xs text-foreground/40 w-4">{i + 1}.</span>
              <input
                value={opt}
                onChange={(e) => {
                  const next = [...q.options];
                  next[i] = e.target.value;
                  onChange({ options: next });
                }}
                className="flex-1 bg-transparent border-b border-foreground/10 px-1 py-1 font-sans text-sm focus:outline-none focus:border-foreground/70"
              />
              <button
                onClick={() => onChange({ options: q.options.filter((_, j) => j !== i) })}
                className="text-xs text-foreground/40 hover:text-destructive"
                disabled={q.options.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange({ options: [...q.options, `Option ${q.options.length + 1}`] })}
            className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-foreground/60 hover:text-foreground"
          >
            + Add option
          </button>
        </div>
      )}
      {q.type === "rating" && (
        <div className="mt-4 flex gap-1 text-2xl text-foreground/30">★★★★★</div>
      )}
    </div>
  );
}

function PreviewPane({ form, questions }: { form: Form; questions: Question[] }) {
  return (
    <div className="rounded-2xl border border-foreground/10 p-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 mb-4">Preview</p>
      <h2 className="font-display text-4xl tracking-tight">{form.title}</h2>
      {form.description && <p className="mt-2 font-sans text-sm text-foreground/70">{form.description}</p>}
      <div className="mt-8 space-y-6">
        {questions.map((q, i) => (
          <div key={q.id}>
            <p className="font-sans text-sm font-semibold">{i + 1}. {q.label}</p>
            {q.type === "short_text" && (
              <input disabled className="mt-2 w-full bg-transparent border-b border-foreground/20 py-2" placeholder="Your answer" />
            )}
            {q.type === "multiple_choice" && (
              <div className="mt-2 space-y-1">
                {q.options.map((o, j) => (
                  <label key={j} className="flex items-center gap-2 font-sans text-sm">
                    <input type="radio" disabled name={q.id} /> {o}
                  </label>
                ))}
              </div>
            )}
            {q.type === "rating" && <div className="mt-2 text-3xl text-foreground/30">☆☆☆☆☆</div>}
          </div>
        ))}
        {questions.length === 0 && <p className="font-sans text-sm text-muted-foreground">No questions yet.</p>}
        <button disabled className="rounded-full bg-foreground text-background px-6 py-3 font-sans text-sm font-bold opacity-60">Submit</button>
      </div>
    </div>
  );
}