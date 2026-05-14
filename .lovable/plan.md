## Goal

Add email + password authentication using Lovable Cloud auth, lock down `/dashboard` so only signed-in users can reach it, and make the form list personal to each user. Form creation UI stays as-is (title + description only).

## What gets built

### 1. Auth pages (match the dashboard's clean card style — same modern sans + serif italic placeholders, no post-its)

- **`/signup`** — email + password, "Create account" button. On success → user is auto-logged-in → redirect to `/dashboard`. Link to `/login` for existing users.
- **`/login`** — email + password, "Sign in" button. On success → redirect to `/dashboard` (or back to original destination if they were redirected from a protected route). Link to `/signup`.
- Both pages reuse the existing `Nav` for consistency and show inline errors (wrong password, email already in use, etc.).

### 2. Auto-confirm email signup

- Turn on auto-confirm so new signups skip the email-verification step and are signed in immediately (per your spec).

### 3. Protected dashboard

- Move `src/routes/dashboard.tsx` into a pathless layout group: `src/routes/_authenticated.tsx` + `src/routes/_authenticated/dashboard.tsx`.
- The `_authenticated` layout checks the Supabase session in `beforeLoad` — if not signed in, redirects to `/login` (with a `redirect=` param so we can send them back after login).
- Update the landing page nav links (`Nav.tsx`, `Hero.tsx`) so the existing "Dashboard" / "Try the demo" / "Go to dashboard" links still resolve to `/dashboard` (the URL stays the same).

### 4. Personalized dashboard

- Welcome message at the top: "Welcome back, {email}" right under "The Intel" heading, replacing the current static tagline. Keep "Ask. Collect. Know." as a smaller eyebrow.
- **Sign out** button in the top-right of the dashboard (small, modern).
- Form list query gets a `.eq("user_id", user.id)` filter — each person sees only their own post-its.
- Empty state copy slightly tweaked for the personal context ("you haven't pinned any forms yet").

### 5. Database changes (migration)

- Add `user_id uuid not null` column to `forms`, referencing the auth user. Existing rows in the table (test data from earlier) will be deleted as part of the migration since they have no owner — you mentioned only test forms are there.
- Replace the current open RLS policies with user-scoped ones:
  - SELECT: only rows where `user_id = auth.uid()`
  - INSERT: only when `user_id = auth.uid()` (the client will pass the user's id explicitly on insert)
  - UPDATE / DELETE: same scope (so the table is ready for tomorrow's edit/delete features without another migration)

### 6. Dashboard insert change

- When saving a form, include `user_id: user.id` in the insert payload so the RLS check passes.

## Out of scope (per your note)

- No question editor — form creation stays as title + description.
- No profile table, no display name, no avatar — we just use the email from the auth user.
- No Google/social login — email + password only for now (can add later).
- No password reset flow yet (can add when you need it).

## Technical notes

- Browser Supabase client (`@/integrations/supabase/client`) handles signup, login, logout, and reads the current session in components and route guards.
- Session listener (`onAuthStateChange`) wired in `__root.tsx` so the router invalidates when the user signs in or out — UI updates immediately, no stale data.
- All routes still use the existing TanStack file-based routing; `routeTree.gen.ts` regenerates automatically.
- RLS is the security backstop — even if client code forgot to filter by `user_id`, the database would still refuse to return another user's rows.

## Files touched

```text
new   src/routes/signup.tsx
new   src/routes/login.tsx
new   src/routes/_authenticated.tsx
move  src/routes/dashboard.tsx → src/routes/_authenticated/dashboard.tsx (edited for welcome + filter + sign out)
edit  src/routes/__root.tsx (auth state listener)
edit  src/components/landing/Nav.tsx (no URL change, but optional "Sign in" link if signed out)
mig   forms table: add user_id, replace RLS policies, drop existing test rows
auth  enable auto-confirm email signups
```
