const tools = ["Typeform", "Calendly", "Airtable", "Sheets", "Slack"];

export function ToolPile() {
  return (
    <section id="why" className="border-y border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          The current research stack
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12">
          {tools.map((t, i) => (
            <span
              key={t}
              className="relative font-display text-2xl md:text-3xl text-foreground/40"
              style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 1.5}deg)` }}
            >
              {t}
              <svg
                aria-hidden
                viewBox="0 0 120 14"
                className="absolute left-[-4px] top-1/2 w-[110%] h-3 -translate-y-1/2"
                preserveAspectRatio="none"
              >
                <path
                  d={`M2 ${6 + (i % 2)} C 30 ${2 + i}, 80 ${10 - (i % 3)}, 118 ${5 + (i % 2)}`}
                  fill="none"
                  stroke="var(--marker)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </svg>
            </span>
          ))}
          <span
            className="inline-flex items-center note-shadow px-4 py-2 font-hand text-2xl text-foreground"
            style={{ background: "var(--note-yellow)", transform: "rotate(-3deg)" }}
          >
            → just Buddy
          </span>
        </div>
        <p className="mt-9 text-center font-display text-2xl md:text-3xl text-foreground max-w-2xl mx-auto leading-snug">
          Five tools. One job. Finally built for the researcher.
        </p>
      </div>
    </section>
  );
}
