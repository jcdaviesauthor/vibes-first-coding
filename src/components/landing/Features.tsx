import { Ruler, Filter, Users, Tags, FileText, Microscope } from "lucide-react";

const features = [
  {
    icon: Ruler,
    title: "Research-native question types",
    desc: "SUS, NPS, Likert, semantic differential. The scales you actually use, ready out of the box.",
    color: "var(--note-yellow)",
    rot: "-2deg",
  },
  {
    icon: Filter,
    title: "Screener mode with quotas",
    desc: "Set the cells you need. Buddy auto-closes segments and lets the rest down politely.",
    color: "var(--note-mint)",
    rot: "1.5deg",
  },
  {
    icon: Users,
    title: "Participant memory",
    desc: "Buddy remembers Jessica from study #4. Build a panel by doing your job, not a spreadsheet.",
    color: "var(--note-sky)",
    rot: "-1deg",
  },
  {
    icon: Tags,
    title: "Auto-tagged open text",
    desc: "Themes surface as responses come in. \"3 mentioned 'confusing checkout'\" before you've read one.",
    color: "var(--note-coral)",
    rot: "2deg",
  },
  {
    icon: FileText,
    title: "Templates that match the work",
    desc: "Screener, post-session debrief, diary day 1, concept test, competitive benchmark. Not 'contact form.'",
    color: "var(--note-pink)",
    rot: "-2.5deg",
  },
  {
    icon: Microscope,
    title: "The researcher is the user",
    desc: "Every choice optimized for the person collecting and synthesizing — not the marketing team next door.",
    color: "var(--note-yellow)",
    rot: "1deg",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">What makes Buddy different</p>
        <h2 className="font-display mt-3 text-4xl md:text-5xl text-foreground leading-[1.05]">
          Built around how research<br />actually works.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Not generic form fields with a UXR sticker on top. Every primitive here exists because a researcher
          asked for it at 11pm the night before fielding.
        </p>
      </div>

      <div className="mt-16 grid gap-y-14 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc, color, rot }) => (
          <div
            key={title}
            className="relative note-shadow rounded-[3px] p-6 pb-7 transition-transform hover:-translate-y-1"
            style={{ background: color, transform: `rotate(${rot})` }}
          >
            <span
              aria-hidden
              className="absolute -top-3 left-6 h-5 w-20 rounded-[1px] rotate-[-3deg]"
              style={{ background: "var(--tape)" }}
            />
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display mt-4 text-2xl leading-tight text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
