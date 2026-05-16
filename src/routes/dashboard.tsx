import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
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
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      setEmail(data.session.user.email ?? null);
      loadForms();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) {
        navigate({ to: "/login" });
        return;
      }
      setEmail(session.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError(null);
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) {
      setLoading(false);
      setError("You must be signed in to save a form.");
      return;
    }
    const { error } = await supabase
      .from("forms")
      .insert({ title: title.trim(), description: description.trim() || null, user_id: uid });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setTitle("");
    setDescription("");
    await loadForms();
  };

  const focusTitle = () => {
    const el = document.getElementById("form-title-input") as HTMLInputElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el?.focus(), 300);
  };

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <span
              className="inline-block note-shadow px-4 py-2 -rotate-2 font-hand text-2xl text-foreground"
              style={{ background: "var(--note-yellow)" }}
            >
              Your research wall
            </span>
            {email && (
              <button
                type="button"
                onClick={handleSignOut}
                className="shrink-0 rounded-full border border-foreground/20 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Sign out
              </button>
            )}
          </div>
          <h1 className="font-display mt-6 text-6xl md:text-7xl leading-[1.02] tracking-tight">
            The Intel
          </h1>
          {email && (
            <p className="mt-4 font-sans text-2xl md:text-3xl text-foreground/80">
              Welcome {email.split("@")[0].replace(/[._-].*$/, "").replace(/^./, (c) => c.toUpperCase())}, let’s get researching.
            </p>
          )}
        </header>

        <h2 className="font-sans text-3xl font-bold tracking-tight mb-5 normal-case">Create new form</h2>
        <form
          onSubmit={handleSave}
          className="relative rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-sm p-6 md:p-8 mb-12 shadow-sm"
        >
          <label className="block">
            <span className="font-sans text-base font-bold uppercase tracking-[0.12em] text-foreground">Form title</span>
            <input
              type="text"
              id="form-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. research shit."
              className="mt-2 w-full bg-transparent border-b border-foreground/20 rounded-none px-1 py-2.5 font-sans text-sm font-medium tracking-tight text-foreground placeholder:font-display placeholder:font-normal placeholder:italic placeholder:text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/70 transition-colors"
              required
            />
          </label>
          <label className="block mt-5">
            <span className="font-sans text-base font-bold uppercase tracking-[0.12em] text-foreground">Description (optional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What are you trying to learn?"
              className="mt-2 w-full bg-transparent border-b border-foreground/20 rounded-none px-1 py-2.5 font-sans text-sm text-foreground placeholder:font-display placeholder:italic placeholder:text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/70 transition-colors resize-none"
            />
          </label>
          {error && (
            <p className="mt-4 font-sans text-sm font-medium text-destructive">{error}</p>
          )}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 font-sans text-sm font-bold tracking-tight hover:-translate-y-0.5 transition-transform disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save form"}
            </button>
          </div>
        </form>

        <section>
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="font-display text-4xl tracking-tight">My forms</h2>
            <p className="italic text-sm text-muted-foreground">
              {forms.length} total
            </p>
          </div>
          {forms.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-foreground/20 p-10 md:p-14 text-center">
              <p className="font-display text-3xl text-foreground tracking-tight">
                Your wall’s empty. Let’s pin something up.
              </p>
              <p className="mt-2 font-sans text-sm text-muted-foreground">
                You haven’t created any forms yet — start with one question, see what people say.
              </p>
              <button
                type="button"
                onClick={focusTitle}
                className="mt-6 inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 font-sans text-sm font-bold tracking-tight hover:-translate-y-0.5 transition-transform"
              >
                Create your first form
              </button>
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