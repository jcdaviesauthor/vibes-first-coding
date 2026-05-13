import { ArrowRight, Check } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background ornament */}
      <div
        className="pointer-events-none absolute -top-32 right-1/2 translate-x-1/2 h-[600px] w-[1100px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 35%, transparent), transparent)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Form builder, reimagined
          </span>
          <h1 className="font-display mt-6 text-5xl md:text-7xl font-semibold leading-[1.02] text-foreground">
            Forms people<br />
            <em className="not-italic text-primary">actually</em> want to fill out.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Flowform turns dull surveys into calm, one-question-at-a-time conversations.
            Build in minutes, share anywhere, and watch responses pour in.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-base font-medium shadow-[0_8px_30px_-10px_color-mix(in_oklab,var(--primary)_60%,transparent)] hover:shadow-[0_12px_40px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:-translate-y-0.5 transition-all"
            >
              Try the demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-foreground underline-offset-4 hover:underline">
              See an example →
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["No credit card", "Free forever plan", "Setup in 60 seconds"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Mock form card */}
        <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative mx-auto max-w-md animate-float">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/40 blur-2xl" aria-hidden />
            <div className="rounded-3xl bg-card border border-border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="text-primary">02</span>
                <span className="h-px w-8 bg-border" />
                <span>of 05</span>
              </div>
              <p className="mt-5 font-display text-2xl text-foreground leading-snug">
                What kind of forms do you build most often?
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { k: "A", v: "Customer feedback", sel: false },
                  { k: "B", v: "Lead capture", sel: true },
                  { k: "C", v: "Job applications", sel: false },
                ].map((o) => (
                  <div
                    key={o.k}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                      o.sel
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background"
                    }`}
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-mono font-semibold ${
                      o.sel ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {o.k}
                    </span>
                    <span className="text-sm text-foreground">{o.v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>Press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Enter</kbd> to continue</span>
                <button className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-3 py-1.5 font-medium">
                  OK <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}