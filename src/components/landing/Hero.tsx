import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const Note = ({
  children,
  color = "var(--note-yellow)",
  rot = "-3deg",
  className = "",
  tape = false,
}: {
  children: React.ReactNode;
  color?: string;
  rot?: string;
  className?: string;
  tape?: boolean;
}) => (
  <div
    className={`relative note-shadow rounded-[2px] ${className}`}
    style={{ background: color, transform: `rotate(${rot})` }}
  >
    {tape && (
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-16 rounded-[1px] rotate-[-4deg]"
        style={{ background: "var(--tape)" }}
      />
    )}
    {children}
  </div>
);

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden paper-grain">
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <span
            className="inline-block note-shadow px-4 py-2 -rotate-2 font-hand text-2xl text-foreground"
            style={{ background: "var(--note-yellow)" }}
          >
            A form tool for researchers
          </span>
          <h1 className="font-display mt-8 text-5xl md:text-6xl leading-[1.05] text-foreground tracking-tight">
            Rigorous research<br />that feels like recess.
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            You're cobbling Typeform, Calendly, Airtable, Sheets, and Slack into something that almost works.
            Buddy is one tool, built around how research actually happens.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3 font-sans text-sm font-semibold tracking-tight hover:-translate-y-0.5 transition-transform"
            >
              Try the demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-full border border-foreground/80 bg-background text-foreground px-7 py-3 font-sans text-sm font-semibold tracking-tight hover:bg-foreground/5 transition-colors"
            >
              Go to dashboard
            </Link>
          </div>
        </div>

        {/* Sticky-note collage */}
        <div className="lg:col-span-5 relative h-[480px] md:h-[520px] animate-fade-up" style={{ animationDelay: "120ms" }}>
          {/* Screener question */}
          <Note
            color="var(--note-yellow)"
            rot="-4deg"
            className="absolute top-2 left-2 w-60 p-5 animate-wobble"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">Screener · Q2</p>
            <p className="mt-2 font-display text-xl leading-snug text-foreground">
              Which phone do you use most days?
            </p>
            <ul className="mt-3 space-y-1.5 font-sans text-sm text-foreground/80">
              <li>○ iPhone</li>
              <li className="text-foreground">● Android</li>
              <li>○ Both / switch</li>
            </ul>
          </Note>

          {/* Quota chip */}
          <Note
            color="var(--note-mint)"
            rot="5deg"
            className="absolute top-4 right-2 w-44 p-4"
            tape
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">Quota</p>
            <p className="font-display text-2xl text-foreground">iPhone 7/10</p>
            <p className="font-display text-2xl text-foreground">Android 3/10</p>
            <p className="mt-2 font-sans text-xs text-foreground/60">closing soon ✓</p>
          </Note>

          {/* SUS scale */}
          <Note
            color="var(--note-sky)"
            rot="3deg"
            className="absolute top-[230px] right-0 w-64 p-5 animate-wobble"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">SUS · 4 of 10</p>
            <p className="mt-2 font-display text-lg leading-snug text-foreground">
              I found the system unnecessarily complex.
            </p>
            <div className="mt-4 flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs ${
                    n === 2
                      ? "bg-foreground text-background"
                      : "border border-foreground/30 text-foreground/70"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </Note>

          {/* Tagged quote */}
          <Note
            color="var(--note-coral)"
            rot="-6deg"
            className="absolute bottom-2 left-4 w-72 p-5"
          >
            <p className="font-display text-lg italic text-foreground leading-snug">
              "...and then I just gave up at the checkout."
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["confusing checkout (3)", "trust", "drop-off"].map((t) => (
                <span
                  key={t}
                  className="font-sans text-xs font-medium bg-background/60 text-foreground px-2.5 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </Note>

          {/* Hand arrow */}
          <svg
            aria-hidden
            className="absolute top-[150px] left-[160px] w-32 h-20 hidden md:block"
            viewBox="0 0 140 90"
          >
            <path
              d="M10 20 C 40 10, 80 60, 120 50"
              fill="none"
              stroke="var(--marker)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M120 50 L 110 42 M 120 50 L 113 60"
              fill="none"
              stroke="var(--marker)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
