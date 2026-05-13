const steps = [
  { n: "01", title: "Build", desc: "Drag fields onto the canvas. Add logic, themes, and a welcome screen in minutes." },
  { n: "02", title: "Share", desc: "Copy a link, embed on your site, or send via email. Every form is mobile-perfect." },
  { n: "03", title: "Analyze", desc: "Watch responses land in real time. Export to CSV or pipe into your tools." },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display text-4xl md:text-5xl font-semibold max-w-xl leading-tight">
            From idea to insights in three steps.
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-background/60">The process</p>
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-background/20 pt-6">
              <span className="font-mono text-sm text-primary">{s.n}</span>
              <h3 className="font-display mt-3 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-background/70 leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}