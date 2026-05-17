import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/landing/Nav";

type Form = { id: string; title: string; description: string | null; user_id: string };
type Question = { id: string; type: string; label: string; options: string[]; position: number };
type Response = { id: string; submitted_at: string; answers: Record<string, any> };

export const Route = createFileRoute("/forms/$formId/responses")({
  head: () => ({ meta: [{ title: "Responses — Buddy" }] }),
  component: ResponsesPage,
});

function ResponsesPage() {
  const { formId } = Route.useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/login" });
        return;
      }
      const { data: f, error: fe } = await supabase
        .from("forms").select("*").eq("id", formId).maybeSingle();
      if (fe || !f) {
        setError(fe?.message ?? "Form not found");
        setLoading(false);
        return;
      }
      setForm(f as Form);
      const [{ data: qs }, { data: rs, error: re }] = await Promise.all([
        supabase.from("questions").select("*").eq("form_id", formId).order("position", { ascending: true }),
        supabase.from("responses").select("*").eq("form_id", formId).order("submitted_at", { ascending: false }),
      ]);
      setQuestions((qs ?? []).map((q: any) => ({ ...q, options: q.options ?? [] })));
      if (re) setError(re.message);
      else setResponses((rs as Response[]) ?? []);
      setLoading(false);
    })();
  }, [formId, navigate]);

  const renderAnswer = (q: Question, val: any) => {
    if (val === undefined || val === null || val === "") return <span className="text-foreground/40 italic">No answer</span>;
    if (q.type === "rating") return <span>{"★".repeat(Number(val))}<span className="text-foreground/30">{"☆".repeat(Math.max(0, 5 - Number(val)))}</span></span>;
    return <span>{String(val)}</span>;
  };

  const exportCsv = () => {
    const headers = ["submitted_at", ...questions.map((q) => q.label.replace(/"/g, '""'))];
    const rows = responses.map((r) => [
      new Date(r.submitted_at).toISOString(),
      ...questions.map((q) => {
        const v = r.answers?.[q.id];
        return v == null ? "" : String(v).replace(/"/g, '""');
      }),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form?.title ?? "form"}-responses.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main className="mx-auto max-w-5xl px-6 py-16 font-sans text-sm text-muted-foreground">Loading…</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <Link to="/dashboard" className="font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground">← Dashboard</Link>
        <header className="mt-4 mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">Responses</p>
            <h1 className="font-display text-5xl md:text-6xl tracking-tight mt-1">{form?.title}</h1>
            <p className="mt-2 font-sans text-sm text-foreground/70">{responses.length} {responses.length === 1 ? "response" : "responses"}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/forms/$formId/edit"
              params={{ formId }}
              className="rounded-full border border-foreground/20 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.12em] hover:bg-foreground hover:text-background transition-colors"
            >
              Edit form
            </Link>
            <button
              onClick={exportCsv}
              disabled={responses.length === 0}
              className="rounded-full bg-foreground text-background px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.12em] disabled:opacity-40"
            >
              Export CSV
            </button>
          </div>
        </header>

        {error && <p className="mb-4 font-sans text-sm text-destructive">{error}</p>}

        {responses.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-foreground/20 p-10 text-center">
            <p className="font-display text-2xl tracking-tight">No responses yet</p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">Share your form link to start collecting answers.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((r, i) => (
              <div key={r.id} className="rounded-2xl border border-foreground/10 bg-background/60 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                    #{responses.length - i} · {new Date(r.submitted_at).toLocaleString()}
                  </span>
                </div>
                <dl className="space-y-3">
                  {questions.map((q) => (
                    <div key={q.id}>
                      <dt className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-foreground/60">{q.label}</dt>
                      <dd className="mt-1 font-sans text-sm text-foreground">{renderAnswer(q, r.answers?.[q.id])}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}