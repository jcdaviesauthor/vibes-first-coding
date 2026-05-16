import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function Nav() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setIsAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setIsAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] -rotate-6 note-shadow font-hand text-[20px] font-bold text-foreground"
            style={{ background: "var(--note-yellow)" }}
            aria-hidden
          >
            B
          </span>
          <span className="font-display text-2xl font-medium text-foreground tracking-tight">Buddy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-muted-foreground">
          <a href="#why" className="hover:text-foreground transition-colors">Why Buddy</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
          {isAuthed && (
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {isAuthed ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2 font-sans text-sm font-semibold tracking-tight hover:bg-foreground/90 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center rounded-full border border-foreground/80 bg-background text-foreground px-5 py-2 font-sans text-sm font-semibold tracking-tight hover:bg-foreground/5 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2 font-sans text-sm font-semibold tracking-tight hover:bg-foreground/90 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
