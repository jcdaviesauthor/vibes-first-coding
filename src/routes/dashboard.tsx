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
          className="relative note-shadow rounded-[3px] p-6 md:p-8 mb-12"
          style={{ background: "var(--note-sky)", transform: "rotate(-0.4deg)" }}
        >
          <label className="block">
            <span className="font-hand text-base text-foreground/70">Form title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Checkout screener"
              className="mt-1 w-full bg-background/70 border border-foreground/15 rounded-[2px] px-3 py-2.5 font-display text-xl text-foreground focus:outline-none focus:border-foreground/60"
              required
            />
          </label>
          <label className="block mt-5">
            <span className="font-hand text-base text-foreground/70">Description (optional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What are you trying to learn?"
              className="mt-1 w-full bg-background/70 border border-foreground/15 rounded-[2px] px-3 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground/60"
            />
          </label>
          {error && (
            <p className="mt-4 font-hand text-base text-destructive">{error}</p>
          )}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 text-base font-medium hover:-translate-y-0.5 transition-transform disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save form"}
            </button>
            <span className="font-hand text-base text-foreground/60">
              {forms.length} {forms.length === 1 ? "form" : "forms"} saved
            </span>
          </div>
        </form>

        <section>
          <h2 className="font-display text-3xl mb-5">Saved forms</h2>
          {forms.length === 0 ? (
            <p className="font-hand text-lg text-muted-foreground">
              Nothing pinned to the wall yet. Save your first form above.
            </p>
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
                    <h3 className="font-display text-2xl mt-1 text-foreground">{f.title}</h3>
                    {f.description && (
                      <p className="mt-2 text-foreground/80">{f.description}</p>
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