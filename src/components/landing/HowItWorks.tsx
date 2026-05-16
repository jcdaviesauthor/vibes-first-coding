const steps = [
  { n: "01", title: "Draft", desc: "Pick a research template, drop in your questions, add screener quotas if you need them.", color: "var(--note-yellow)", rot: "-3deg" },
  { n: "02", title: "Field", desc: "Share a link. Buddy handles routing, screening, and politely turning away the wrong fits.", color: "var(--note-coral)", rot: "2deg" },
  { n: "03", title: "Synthesize", desc: "Themes auto-surface. Filter, tag, export to CSV, or share a live read-out with your team.", color: "var(--note-sky)", rot: "-1.5deg" },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display text-4xl md:text-5xl max-w-xl leading-[1.05]">
            From kickoff<br />to read-out.
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/60">The process</p>
        </div>

        <div className="mt-16 grid gap-y-12 md:gap-y-0 md:grid-cols-3 md:gap-8 relative">
          {steps.map((s, i) => (
            <div key={s.n} className="relative flex flex-col items-start">
              <div
                className="note-shadow rounded-[3px] p-6 w-full max-w-xs"
                style={{ background: s.color, transform: `rotate(${s.rot})` }}
              >
                <p className="font-mono text-[11px] text-foreground/60">{s.n}</p>
                <h3 className="font-display mt-2 text-2xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <svg
                  aria-hidden
                  className="hidden md:block absolute top-1/2 -right-6 w-16 h-12 -translate-y-1/2 text-background/70"
                  viewBox="0 0 80 60"
                >
                  <path
                    d="M5 30 C 25 10, 55 50, 75 28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M75 28 L 65 22 M 75 28 L 67 36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
