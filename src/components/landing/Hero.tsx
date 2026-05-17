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
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-3xl animate-fade-up">
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
        <div className="mt-20 -mx-6 px-6 overflow-x-auto animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="flex items-start gap-5 min-w-max py-6">
            {/* Screener question */}
            <Note color="var(--note-yellow)" rot="-4deg" className="shrink-0 w-60 p-5 animate-wobble">
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
            <Note color="var(--note-mint)" rot="5deg" className="shrink-0 w-44 p-4 mt-12 -ml-8" tape>
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">Quota</p>
              <p className="font-display text-2xl text-foreground">iPhone 7/10</p>
              <p className="font-display text-2xl text-foreground">Android 3/10</p>
              <p className="mt-2 font-sans text-xs text-foreground/60">closing soon ✓</p>
            </Note>

            {/* SUS scale */}
            <Note color="var(--note-sky)" rot="-2deg" className="shrink-0 w-64 p-5 animate-wobble -ml-4 mt-2">
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
            <Note color="var(--note-coral)" rot="4deg" className="shrink-0 w-64 p-5 mt-10 -ml-6">
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

            {/* NPS */}
            <Note color="var(--note-pink)" rot="-3deg" className="shrink-0 w-56 p-5 animate-wobble mt-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">NPS</p>
              <p className="mt-2 font-display text-lg leading-snug text-foreground">
                How likely to recommend?
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {[0,1,2,3,4,5,6,7,8,9,10].map((n) => (
                  <span
                    key={n}
                    className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] ${
                      n === 9
                        ? "bg-foreground text-background"
                        : "border border-foreground/30 text-foreground/70"
                    }`}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </Note>

            {/* Participant card */}
            <Note color="var(--note-yellow)" rot="3deg" className="shrink-0 w-52 p-4 mt-14 -ml-10" tape>
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">Participant</p>
              <p className="mt-1 font-display text-xl text-foreground">Jessica M.</p>
              <p className="font-sans text-xs text-foreground/60">Study #4 · Android user</p>
              <p className="mt-2 font-hand text-base text-foreground/80">"loved the new flow!"</p>
            </Note>

            {/* Theme tag */}
            <Note color="var(--note-mint)" rot="-5deg" className="shrink-0 w-48 p-4 mt-4 -ml-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">Theme</p>
              <p className="mt-2 font-display text-2xl leading-tight text-foreground">trust signals</p>
              <p className="mt-2 font-sans text-xs text-foreground/60">7 mentions · rising</p>
            </Note>
          </div>
        </div>
      </div>
    </section>
  );
}
