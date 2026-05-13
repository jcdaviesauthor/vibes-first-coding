const logos = ["NORTHWIND", "Lumen&Co", "PARALLAX", "Hearth", "Fieldnotes", "OAKMONT"];

export function SocialProof() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Trusted by curious teams at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {logos.map((l) => (
            <span key={l} className="font-display text-xl text-foreground/60 hover:text-foreground/90 transition-colors">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}