## Landing page for a UXR-native form tool

A single, intentional landing page at `/` — no other routes, no backend, no auth. Replaces the current "Flowform" page with a research-focused product positioned as the form tool built for UX researchers.

### Brand & tone
- **Working name:** **Buddy** (warm, conversational; tagline: "The research buddy for UXRs"). Easy to swap later — kept in one config constant.
- **Aesthetic:** IDEO studio meets sticky-note wall. Warm, human, intentionally a little chaotic. Hand-placed post-it notes at slight rotations, scribbled marker arrows, masking-tape labels, photocopied texture, sharpie-style annotations. Not childish — it should feel like a smart studio's research wall, not a kindergarten.
- **Palette:** off-white paper background, deep ink for text, classic post-it yellow as the hero accent, plus muted coral, sky, and mint as secondary sticky colors. One bold ink-black for buttons.
- **Type:** a confident editorial sans for body (Inter or similar) paired with a slightly imperfect display (Caveat or Kalam used sparingly for handwritten accents, plus a strong sans like Instrument Serif or Fraunces for the H1). All loaded via Google Fonts.

### Sections (top to bottom)
1. **Nav** — wordmark with a small post-it sticker, anchor links (Why Buddy, Features, Templates), primary "Try the demo" button (placeholder href, wired later).
2. **Hero**
   - Eyebrow on a tilted post-it: "A form tool for researchers."
   - H1: **"Surveys that feel like research, not marketing."**
   - Sub: one short paragraph naming the pain — researchers cobbling together Typeform + Calendly + Airtable + Sheets + Slack — and the promise of one tool built for them.
   - Primary CTA: "Try the demo" · secondary text link: "See a sample study →"
   - Visual: a loose collage of 4–5 post-its at slight rotations showing real research artifacts — a screener question, a SUS scale, a tagged open-text quote ("3 mentioned 'confusing checkout'"), a quota chip ("iPhone 7/10 ✓"). Subtle float animation on one or two notes.
3. **The mess we're replacing** — short visual band: five faded tool labels (Typeform, Calendly, Airtable, Sheets, Slack) struck through with a marker, replaced by one Buddy sticker. Single line: "Five tools. One job. Finally built for you."
4. **What makes Buddy different** — 6 feature cards styled as pinned index cards / post-its with masking tape. Each: small icon, title, one-line description.
   - Research-native question types (SUS, NPS, Likert, semantic differential)
   - Screener mode with quotas (auto-close segments, polite rejection)
   - Participant memory (panel that remembers across studies)
   - Auto-tagged open text (themes surface without reading every response)
   - Templates researchers actually use (screener, post-session debrief, diary study, concept test)
   - Built for the researcher, not the respondent
5. **How it works** — 3 sticky notes connected by hand-drawn marker arrows: **Draft → Field → Synthesize**. One line per step in researcher language.
6. **Templates strip** — horizontal row of 5 tilted template cards (Screener · Post-session debrief · Diary study · Concept test · Competitive benchmark). Visual only — no links.
7. **Final CTA band** — warm tinted block, a single closing line ("Stop wrangling tools. Start doing research."), the same primary CTA, and a tiny "no signup, no credit card" microcopy.
8. **Footer** — wordmark, a one-liner positioning, copyright, three non-functional column links (Product, Templates, Company).

### Technical details
- Replace `src/routes/index.tsx` content; keep the file. Update `__root.tsx` head: title, description, og tags rewritten for Buddy / UXR positioning. Swap the Google Fonts link to load Fraunces + Inter + Caveat.
- Components live in `src/components/landing/` — reuse the existing filenames (`Nav.tsx`, `Hero.tsx`, `Features.tsx`, `HowItWorks.tsx`, `CTA.tsx`, `Footer.tsx`), rewrite their contents. Replace `SocialProof.tsx` with a new `ToolPile.tsx` (the "five tools struck through" band) and add a new `Templates.tsx`.
- Rewrite the palette in `src/styles.css` using `oklch` semantic tokens: `--background` (warm paper), `--foreground` (deep ink), `--primary` (post-it yellow's ink-friendly partner — actually deep ink for buttons), `--accent` (post-it yellow), plus token additions for `--note-coral`, `--note-sky`, `--note-mint`, `--tape`. Add `@keyframes wobble` and `@keyframes pin` for tasteful micro-motion. All colors via tokens, no raw hex in components.
- Post-it cards rendered as styled divs with `rotate-[-2deg]` / `rotate-[1.5deg]` utility classes, soft layered shadows, and a subtle paper-grain background via CSS gradient. Marker arrows drawn as inline SVG with a slightly wobbly stroke. No image assets needed.
- Icons via existing `lucide-react`. Single H1, semantic `<header>`/`<main>`/`<section>`/`<footer>`. Mobile-first; collages restack vertically with reduced rotation on small screens (respecting current 730px viewport). `prefers-reduced-motion` disables the float/wobble.

### Out of scope
No additional routes, no Lovable Cloud, no auth, no database, no real form builder. CTAs remain placeholder `#` links to be wired later.
