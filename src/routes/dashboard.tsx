import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/landing/Nav";
import { FileText, Plus, Sparkles } from "lucide-react";

type Form = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
};

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Buddy" },
      { name: "description", content: "Create and manage your research forms." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadForms = async () => {
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setForms((data as Form[]) ?? []);
  };

  useEffect(() => {
    loadForms();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from("forms")
      .insert({ title: title.trim(), description: description.trim() || null });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setTitle("");
    setDescription("");
    await loadForms();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {/* Header: count is the hero */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-8 border-b border-foreground/10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Dashboard
            </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Your forms
            </h1>
            <p className="font-serif-modern mt-3 text-lg italic text-muted-foreground">
              A quiet place to draft, review, and ship research.
            </p>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-6xl leading-none text-foreground tabular-nums">
              {forms.length}
            </span>
            <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              {forms.length === 1 ? "form total" : "forms total"}
            </span>
          </div>
        </header>

        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          {/* Create form — sticky on desktop */}
          <section className="md:sticky md:top-24 md:self-start">
            <div className="flex items-center gap-2 mb-5">
              <Plus className="h-4 w-4 text-foreground/60" strokeWidth={2.5} />
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/80">
                New form
              </h2>
            </div>
            <form
              onSubmit={handleSave}
              className="rounded-xl border border-foreground/10 bg-card p-6 shadow-[0_1px_0_oklch(0.16_0.02_60/0.04),0_8px_24px_-12px_oklch(0.16_0.02_60/0.18)]"
            >
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Title
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Checkout screener"
                  className="mt-2 w-full bg-transparent border-0 border-b border-foreground/15 px-0 py-2 text-2xl font-semibold tracking-tight text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-foreground/60 transition-colors"
                  required
                />
              </label>
              <label className="block mt-6">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Description
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="What are you trying to learn?"
                  className="mt-2 w-full bg-transparent border-0 border-b border-foreground/15 px-0 py-2 font-serif-modern text-lg italic text-foreground placeholder:text-foreground/25 placeholder:italic focus:outline-none focus:border-foreground/60 transition-colors resize-none"
                />
              </label>
              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Saving…" : "Save form"}
              </button>
            </form>
          </section>

          {/* Form list */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/80">
                All forms
              </h2>
              <span className="text-xs text-muted-foreground">Newest first</span>
            </div>

            {forms.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="space-y-3">
                {forms.map((f) => (
                  <li
                    key={f.id}
                    className="group rounded-xl border border-foreground/10 bg-card p-5 transition-all hover:border-foreground/25 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_oklch(0.16_0.02_60/0.25)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-semibold tracking-tight text-foreground truncate">
                          {f.title}
                        </h3>
                        {f.description && (
                          <p className="font-serif-modern mt-2 text-base italic text-foreground/75 line-clamp-2">
                            {f.description}
                          </p>
                        )}
                      </div>
                      <FileText className="h-4 w-4 mt-1.5 text-foreground/30 group-hover:text-foreground/60 transition-colors shrink-0" />
                    </div>
                    <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {formatDate(f.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function EmptyState() {
  return (
    <div className="relative rounded-2xl border border-dashed border-foreground/20 bg-card/40 px-8 py-14 text-center overflow-hidden">
      {/* Decorative stacked sticky notes */}
      <div className="relative mx-auto mb-6 h-24 w-28">
        <div
          className="absolute inset-0 rounded-[3px] note-shadow"
          style={{ background: "var(--note-mint)", transform: "rotate(-8deg) translate(-10px, 4px)" }}
        />
        <div
          className="absolute inset-0 rounded-[3px] note-shadow"
          style={{ background: "var(--note-coral)", transform: "rotate(5deg) translate(8px, 2px)" }}
        />
        <div
          className="absolute inset-0 rounded-[3px] note-shadow flex items-center justify-center"
          style={{ background: "var(--note-yellow)", transform: "rotate(-1deg)" }}
        >
          <Sparkles className="h-6 w-6 text-foreground/70" strokeWidth={1.75} />
        </div>
      </div>
      <h3 className="font-display text-3xl text-foreground">A blank wall — for now.</h3>
      <p className="font-serif-modern mt-2 text-base italic text-muted-foreground max-w-sm mx-auto">
        Draft your first form on the left. It'll show up here the moment you hit save.
      </p>
      <p className="mt-6 font-hand text-lg text-foreground/50">
        ↖ start over there
      </p>
    </div>
  );
}