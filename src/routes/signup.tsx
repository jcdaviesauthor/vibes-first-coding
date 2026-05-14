import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/landing/Nav";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(72),
});

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — Buddy" },
      { name: "description", content: "Create your Buddy account." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground paper-grain">
      <Nav />
      <main className="mx-auto max-w-md px-6 py-16">
        <header className="mb-8">
          <span
            className="inline-block note-shadow px-3 py-1.5 -rotate-2 font-hand text-base text-foreground"
            style={{ background: "var(--note-yellow)" }}
          >
            Welcome to the wall
          </span>
          <h1 className="font-display mt-5 text-5xl leading-[1.02]">Sign up</h1>
          <p className="mt-3 text-muted-foreground text-base">
            Create an account to start pinning forms.
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-sm p-6 md:p-8 shadow-sm"
        >
          <label className="block">
            <span className="font-sans text-base font-bold uppercase tracking-[0.12em] text-foreground">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              required
              maxLength={255}
              className="mt-2 w-full bg-transparent border-b border-foreground/20 rounded-none px-1 py-2.5 font-sans text-lg font-medium tracking-tight text-foreground placeholder:font-display placeholder:font-normal placeholder:italic placeholder:text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/70 transition-colors"
            />
          </label>
          <label className="block mt-5">
            <span className="font-sans text-base font-bold uppercase tracking-[0.12em] text-foreground">
              Password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="at least 8 characters"
              required
              minLength={8}
              maxLength={72}
              className="mt-2 w-full bg-transparent border-b border-foreground/20 rounded-none px-1 py-2.5 font-sans text-lg font-medium tracking-tight text-foreground placeholder:font-display placeholder:font-normal placeholder:italic placeholder:text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/70 transition-colors"
            />
          </label>
          {error && (
            <p className="mt-4 font-hand text-base text-destructive">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 font-sans text-sm font-bold tracking-tight hover:-translate-y-0.5 transition-transform disabled:opacity-50"
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground font-medium underline underline-offset-4">
            Log in
          </Link>
        </p>
      </main>
    </div>
  );
}