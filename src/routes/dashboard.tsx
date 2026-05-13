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
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-10">
          <span
            className="inline-block note-shadow px-3 py-1.5 -rotate-2 font-hand text-base text-foreground"
            style={{ background: "var(--note-yellow)" }}
          >
            Your research wall
          </span>
          <h1 className="font-display mt-5 text-5xl md:text-6xl leading-[1.02]">
            Dashboard
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Spin up a new form, then watch the wall fill up.
          </p>
        </header>

        <form
          onSubmit={handleSave}
          className="relative rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-sm p-6 md:p-8 mb-12 shadow-sm"
        >
          <label className="block">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-foreground/60">Form title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Checkout screener"
              className="mt-2 w-full bg-transparent border-b border-foreground/20 rounded-none px-1 py-2.5 font-sans text-xl font-medium tracking-tight text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/70 transition-colors"
              required
            />
          </label>
          <label className="block mt-5">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-foreground/60">Description (optional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What are you trying to learn?"
              className="mt-2 w-full bg-transparent border-b border-foreground/20 rounded-none px-1 py-2.5 font-sans text-base text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/70 transition-colors resize-none"
            />
          </label>
          {error && (
            <p className="mt-4 font-hand text-base text-destructive">{error}</p>
          )}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 font-sans text-base font-medium tracking-tight hover:-translate-y-0.5 transition-transform disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save form"}
            </button>
          </div>
        </form>

        <section>
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="font-display text-3xl">Saved forms</h2>
            <p className="italic text-sm text-muted-foreground">
              {forms.length} total
            </p>
          </div>
          {forms.length === 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { rot: "-1.2deg" },
                { rot: "1.4deg" },
                { rot: "-0.8deg" },
                { rot: "1.1deg" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="rounded-[3px] border-2 border-dashed border-foreground/20 p-5 h-32 flex items-center justify-center"
                  style={{ transform: `rotate(${p.rot})` }}
                >
                  {i === 0 && (
                    <p className="font-hand text-base text-foreground/40">
                      your first form goes here →
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {forms.map((f, i) => {
                const tints = [
                  "var(--note-yellow)",
                  "var(--note-coral)",
                  "var(--note-mint)",
                  "var(--note-sky)",
                ];
                const rot = i % 2 === 0 ? "-1.2deg" : "1.4deg";
                return (
                  <li
                    key={f.id}
                    className="note-shadow rounded-[3px] p-5"
                    style={{ background: tints[i % tints.length], transform: `rotate(${rot})` }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                      {new Date(f.created_at).toLocaleString()}
                    </p>
                    <h3 className="font-sans text-xl font-semibold tracking-tight mt-1 text-foreground">{f.title}</h3>
                    {f.description && (
                      <p className="mt-2 font-sans text-sm text-foreground/80 leading-relaxed">{f.description}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}