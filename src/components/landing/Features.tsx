import { MessageCircle, MousePointerClick, GitBranch, Sparkles, BarChart3, Share2 } from "lucide-react";

const features = [
  { icon: MessageCircle, title: "One question at a time", desc: "Conversational flow that respects attention and lifts completion rates." },
  { icon: MousePointerClick, title: "Drag-and-drop builder", desc: "Compose forms visually. No code, no fiddly settings panels." },
  { icon: GitBranch, title: "Logic jumps", desc: "Branch the journey based on answers so every respondent sees only what matters." },
  { icon: Sparkles, title: "Beautiful by default", desc: "Typography-first design system. Looks polished without a designer." },
  { icon: BarChart3, title: "Real-time analytics", desc: "See completion, drop-off, and trends as responses arrive." },
  { icon: Share2, title: "Share anywhere", desc: "Public link, embed, or full-screen popover. Works on every device." },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Why Flowform</p>
        <h2 className="font-display mt-3 text-4xl md:text-5xl font-semibold text-foreground leading-tight">
          Everything you need.<br />Nothing you don't.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A small set of well-designed primitives that snap together into elegant, high-converting forms.
        </p>
      </div>

      <div className="mt-14 grid gap-px bg-border rounded-3xl overflow-hidden border border-border md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-background p-8 group hover:bg-secondary/40 transition-colors">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display mt-5 text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}