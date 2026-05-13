import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div
        className="relative overflow-hidden rounded-[4px] note-shadow p-12 md:p-20"
        style={{ background: "var(--note-yellow)", transform: "rotate(-0.6deg)" }}
      >
        <span
          aria-hidden
          className="absolute -top-4 left-12 h-7 w-28 rounded-[1px] rotate-[-3deg]"
          style={{ background: "var(--tape)" }}
        />
        <span
          aria-hidden
          className="absolute -top-4 right-16 h-7 w-24 rounded-[1px] rotate-[4deg]"
          style={{ background: "var(--tape)" }}
        />
        <div className="relative max-w-2xl">
          <p className="font-hand text-lg text-foreground/70">finally,</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-foreground mt-2">
            Stop wrangling tools.<br />Start doing research.
          </h2>
          <p className="mt-5 text-lg text-foreground/75 max-w-xl">
            Try the live demo. Build a screener in five minutes. Send it to ten people by lunch.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-base font-semibold hover:-translate-y-0.5 transition-transform"
            >
              Try the demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="font-hand text-base text-foreground/70">no signup, no credit card.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
