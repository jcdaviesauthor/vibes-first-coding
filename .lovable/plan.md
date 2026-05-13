## Landing page for a Typeform-style form builder

A single, visually intentional landing page at `/` — no other routes, no backend, no auth.

### Brand & tone
- Product name: **Flowform** (placeholder — easy to rename)
- Positioning: "Forms that feel like conversations." Beautiful, one-question-at-a-time forms anyone can build in minutes.
- Aesthetic: editorial + soft-modern. Warm off-white background, deep ink text, a single confident accent (electric coral). Generous whitespace, large serif display headline paired with a clean sans body. Subtle motion on the hero.

### Sections (top to bottom)
1. **Nav bar** — wordmark left; "Features", "Pricing" (anchor links, non-functional), and a primary "Try the demo" button right.
2. **Hero**
   - Eyebrow: "Form builder, reimagined"
   - H1 (large serif): "Forms people actually want to fill out."
   - Sub: 1–2 sentence value prop.
   - Primary CTA button: "Try the demo" (placeholder href `#`, to be wired later).
   - Secondary text link: "See an example →"
   - Visual: stylized mock of a single-question form card floating with a soft shadow, gentle float animation.
3. **Social proof strip** — small muted line of fictional logos / "Trusted by teams at…" as plain wordmarks.
4. **Features** — 6 benefit cards in a 3×2 grid, each with an icon (lucide-react), a short title, and one-line description. Examples:
   - One question at a time
   - Drag-and-drop builder
   - Logic jumps
   - Beautiful by default
   - Real-time analytics
   - Share anywhere
5. **How it works** — 3 numbered steps (Build → Share → Analyze) in a clean horizontal layout.
6. **Final CTA band** — full-width tinted block with a closing headline and the same "Try the demo" button.
7. **Footer** — wordmark, copyright, and a few non-functional links (Product, Company, Legal).

### Technical details
- New file: `src/routes/index.tsx` replaces the placeholder.
- Components split into `src/components/landing/` (Nav, Hero, Features, HowItWorks, CTA, Footer) for readability.
- Design tokens: extend `src/styles.css` with a warm light palette (background, foreground, accent coral, muted) using `oklch`. All colors via semantic tokens — no raw hex in components.
- Fonts: load Fraunces (display serif) + Inter (body) via Google Fonts `<link>` in `__root.tsx` head.
- Icons: `lucide-react` (already available).
- Subtle hero animation via Tailwind keyframes (no new deps).
- SEO: update `__root.tsx` head with title "Flowform — Forms people actually want to fill out", matching meta description, og tags. Single H1 on the page. Semantic `<header>`, `<main>`, `<section>`, `<footer>`.
- Responsive: mobile-first; grid collapses to 1 column on small screens.
- CTA button is a styled `<a href="#">` — to be wired to a real route in a later step.

### Out of scope (per your instructions)
No additional routes, no Lovable Cloud, no auth, no database, no demo form yet.
