import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/landing/Nav";

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
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Header */}
        <header className="flex items-end justify-between border-b border-foreground/15 pb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
              Buddy / Workspace
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.95]">
              Forms
            </h1>
          </div>
          <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50">
            {String(forms.length).padStart(2, "0")} total
          </p>
        </header>

        {/* New form composer */}
        <section className="mt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/50 mb-5">
            New form
          </p>
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label htmlFor="form-title" className="block text-sm font-medium tracking-tight text-foreground/70">
                Title
              </label>
              <input
                id="form-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Checkout screener"
                className="mt-2 w-full bg-transparent border-0 border-b border-foreground/25 px-0 py-3 font-display text-3xl md:text-4xl text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-foreground transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="form-desc" className="block text-sm font-medium tracking-tight text-foreground/70">
                Description <span className="text-foreground/40 font-normal">— optional</span>
              </label>
              <textarea
                id="form-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="What are you trying to learn?"
                className="mt-2 w-full bg-transparent border-0 border-b border-foreground/25 px-0 py-3 font-display text-xl text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex items-center gap-5 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-full bg-foreground text-background px-7 py-3 text-sm font-medium tracking-tight hover:-translate-y-0.5 transition-transform disabled:opacity-50"
              >
                {loading ? "Saving…" : "Save form"}
              </button>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40">
                Enter to save
              </span>
            </div>
          </form>
        </section>

        {/* Saved forms */}
        <section className="mt-24">
          <div className="flex items-baseline justify-between border-b border-foreground/15 pb-4 mb-2">
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.03em]">
              Saved forms
            </h2>
            <p className="text-xs text-foreground/50 tabular-nums">
              {forms.length} {forms.length === 1 ? "form" : "forms"} · newest first
            </p>
          </div>

          {forms.length === 0 ? (
            <div className="mt-12 border border-dashed border-foreground/20 rounded-sm py-20 px-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/40">
                Empty wall
              </p>
              <p className="mt-4 font-display text-3xl text-foreground/80 leading-snug max-w-md mx-auto">
                Nothing here yet. The first form you save will land at the top of this list.
              </p>
            </div>
          ) : (
            <ul>
              {forms.map((f) => (
                <li
                  key={f.id}
                  className="group grid grid-cols-[auto_1fr] gap-x-8 py-6 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors -mx-2 px-2"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/40 pt-2 tabular-nums">
                    {new Date(f.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "2-digit",
                    })}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-2xl md:text-[28px] font-medium tracking-[-0.025em] text-foreground leading-tight">
                      {f.title}
                    </h3>
                    {f.description && (
                      <p className="mt-2 font-display text-lg text-foreground/65 leading-snug">
                        {f.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}