export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-[3px] -rotate-6 note-shadow font-hand text-[15px] font-bold text-foreground"
            style={{ background: "var(--note-yellow)" }}
            aria-hidden
          >
            B
          </span>
          <span className="font-display text-2xl font-medium text-foreground tracking-tight">Buddy</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#why" className="hover:text-foreground transition-colors">Why Buddy</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
        </nav>
        <a
          href="#"
          className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Try the demo
        </a>
      </div>
    </header>
  );
}
