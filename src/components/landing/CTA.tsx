import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground p-12 md:p-20">
        <div
          className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full opacity-30 blur-3xl bg-accent"
          aria-hidden
        />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
            Your next form should feel like a conversation.
          </h2>
          <p className="mt-5 text-lg text-primary-foreground/80 max-w-xl">
            Try the live demo. No signup. No commitment. Just see how good a form can feel.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-3.5 text-base font-semibold hover:-translate-y-0.5 transition-transform"
          >
            Try the demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}