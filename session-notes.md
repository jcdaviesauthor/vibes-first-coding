# 7-Day GitHub and Claude Code HW

## Session Notes

---

### Project
**Buddy** — a form builder for UX researchers, built in Lovable.
Located at: `~/vibes-first-coding`

---

### Code Audit Summary (Session 1)

#### What Buddy Does
- Users create forms on a dashboard
- Share a public link for respondents to fill out
- View and export responses

#### Tech Stack
- **Framework:** TanStack Start (React 19)
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS + Radix UI (shadcn/ui)
- **Deployment:** Cloudflare

#### Issues Found

**🔴 Security**
- Authorization check for editing forms is client-side only — needs to be backed by Supabase Row-Level Security (RLS) policies in the database

**🟠 Performance**
- Dashboard fires one database query per form just to get response counts (N+1 problem)
- Forms load twice on every dashboard visit due to a double-trigger in the auth listener

**🟡 Code Quality**
- `Form` and `Question` types are copy-pasted across 3 files instead of shared
- Old and new responses are stored in different formats — code works around both
- React Query is installed but never used — all data fetching is manual

**🟢 Minor**
- "Loading…" text only, no visual loading states
- A deprecated browser copy method still in the code
- Several unused server files left over from Lovable scaffolding

#### Priority Fix Order
1. Verify Supabase RLS security rules
2. Fix double-load on dashboard
3. Fix N+1 response count queries
4. Extract shared types into one file
5. Plug in React Query

---

### Decisions & Notes

- All work scoped to `~/vibes-first-coding`
- Google Drive MCP connected (read + create only, no edit)
- No Google Docs MCP available — using this local file to track session, will upload to Drive at end

---

### Fix Plan

| Step | What | Why |
|------|------|-----|
| 1 | Create shared `src/types.ts` | Three files define the same types independently — unify them |
| 2 | Fix `any` casts | Replace unsafe casts with proper generated types |
| 3 | Fix N+1 response count query | 10 forms = 11 DB requests → always 2 requests |
| 4 | Fix bulk write inefficiency in save/delete | 10 questions = 10 writes → batched |
| 5 | Fix dual `answers` format | Make old/new response format handling explicit and safe |
| 6 | Remove dead files | `auth-middleware.ts`, `auth-attacher.ts`, `client.server.ts` unused |
| 7 | Fix `getElementById` + deprecated clipboard | Replace with `useRef`, remove deprecated `execCommand` |
| 8 | Add proper loading states | Replace plain "Loading…" text with skeleton placeholders |
| 9 | Flag OG image URL | Hardcoded Lovable CDN URL needs replacing with a permanent asset |

**Already done:** Security check ✅, Dashboard double-load ✅

---

### Future Tasks

| Priority | Task | Why |
|----------|------|-----|
| High | Migrate data fetching to React Query | Currently every page re-fetches everything from scratch on each visit. React Query adds caching, deduplication, and background refresh — makes the app feel faster and reduces DB load |
| Medium | Replace hardcoded Lovable CDN OG image with a permanent hosted asset | Current URL may expire, breaking social share previews silently |

---

### Progress Log

| Date | Action |
|------|--------|
| 2026-05-30 | Full code audit completed |
| 2026-05-30 | Session notes file created |
| 2026-05-30 | Security check passed — RLS policies confirmed in place for all 3 tables |
| 2026-05-30 | Fixed dashboard double-load — removed redundant `loadForms` call from auth state change listener |
| 2026-05-30 | Step 1: Created shared `src/types.ts` with Form, Question, QType, AnswerItem, Response |
| 2026-05-30 | Step 2: Removed all `any` casts — all routes now import shared types |
| 2026-05-30 | Step 3: Fixed N+1 response count — dashboard now uses 2 DB queries regardless of form count |
| 2026-05-30 | Step 4: Replaced per-question UPDATE loops with single `upsert` in saveChanges and deleteQuestion |
| 2026-05-30 | Step 5: Made dual answers format explicit with typed guard and explanatory comment |
| 2026-05-30 | Step 6: Deleted dead files — auth-middleware.ts, auth-attacher.ts, client.server.ts |
| 2026-05-30 | Step 7: Replaced getElementById with useRef, removed deprecated execCommand clipboard fallback |
| 2026-05-30 | Step 8: Added animated skeleton loading states to all three routes |
| 2026-05-30 | Step 9: Added TODO comment on hardcoded Lovable CDN OG image URL |

