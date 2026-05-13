export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-[3px] -rotate-6 note-shadow font-hand text-[15px] font-bold text-foreground"
              style={{ background: "var(--note-yellow)" }}
              aria-hidden
            >
              B
            </span>
            <span className="font-display text-2xl text-foreground">Buddy</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            The research buddy for UXRs. One tool for screening, fielding, and making sense of what people tell you.
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Product</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#templates" className="hover:text-foreground">Templates</a></li>
            <li><a href="#" className="hover:text-foreground">Demo</a></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Field notes</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Buddy</span>
          <span className="font-hand text-sm">made for researchers, by researchers.</span>
        </div>
      </div>
    </footer>
  );
}
