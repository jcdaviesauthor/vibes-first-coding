import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/landing/Nav";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(1, "Enter your password").max(72),
});

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Buddy" },
      { name: "description", content: "Log in to your Buddy account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
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
            className="inline-block note-shadow px-4 py-2 -rotate-2 font-hand text-xl text-foreground"
            style={{ background: "var(--note-mint)" }}
          >
            Welcome back
          </span>
          <h1 className="font-display mt-6 text-6xl leading-[1.02] tracking-tight">Log in</h1>
          <p className="mt-3 text-muted-foreground text-base">
            Pick up where you left off.
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="your password"
                required
                maxLength={72}
                className="mt-2 w-full bg-transparent border-b border-foreground/20 rounded-none px-1 py-2.5 pr-10 font-sans text-lg font-medium tracking-tight text-foreground placeholder:font-display placeholder:font-normal placeholder:italic placeholder:text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/70 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-1 top-1/2 -translate-y-1/2 mt-1 p-1.5 text-foreground/50 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          {error && (
            <p className="mt-4 font-sans text-sm font-medium text-destructive">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 font-sans text-sm font-bold tracking-tight hover:-translate-y-0.5 transition-transform disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="text-foreground font-medium underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </main>
    </div>
  );
}