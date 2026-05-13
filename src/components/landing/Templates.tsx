const templates = [
  { name: "Screener", meta: "8 questions · with quotas", color: "var(--note-yellow)", rot: "-4deg" },
  { name: "Post-session debrief", meta: "5 questions · 2 min", color: "var(--note-mint)", rot: "2deg" },
  { name: "Diary study · Day 1", meta: "Daily prompt · 5 days", color: "var(--note-sky)", rot: "-2deg" },
  { name: "Concept test", meta: "Stimulus + reactions", color: "var(--note-coral)", rot: "3deg" },
  { name: "Competitive benchmark", meta: "SUS + open text", color: "var(--note-pink)", rot: "-1.5deg" },
];

export function Templates() {
  return (
    <section id="templates" className="paper-grain border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Starting points</p>
            <h2 className="font-display mt-3 text-4xl md:text-5xl text-foreground leading-[1.05]">
              Templates a researcher would actually pick.
            </h2>
          </div>
          <p className="font-hand text-xl text-foreground/70 max-w-xs">
            no "blank form" or "contact form" in sight.
          </p>
        </div>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-6 -mx-6 px-6 snap-x">
          {templates.map((t) => (
            <div
              key={t.name}
              className="snap-start shrink-0 w-60 h-56 note-shadow rounded-[3px] p-5 flex flex-col justify-between"
              style={{ background: t.color, transform: `rotate(${t.rot})` }}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/55">Template</p>
                <p className="font-display mt-2 text-2xl leading-tight text-foreground">{t.name}</p>
              </div>
              <p className="font-hand text-base text-foreground/70">{t.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
