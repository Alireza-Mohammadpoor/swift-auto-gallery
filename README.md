# Swift Auto Gallery — اتو گالری سوییفت

Production-ready website for **Swift Auto Gallery**, an automotive dealership and
import business on Kish Island. Built with React + Vite + TypeScript and Supabase
(Auth, Postgres, Storage). Bilingual (Persian RTL / English LTR), black + gold
premium design, no fake data, no external vehicle APIs.

- **Location:** جنب پمپ بنزین گلدیس، جزیره کیش
- **Phone / WhatsApp:** 09347699899
- **Instagram:** [@swift.autogallery](https://instagram.com/swift.autogallery)

---

## 1. Requirements

- Node.js 18+ and npm
- A free [Supabase](https://supabase.com) account

## 2. Install dependencies

```bash
npm install
```

## 3. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Choose a name/region and wait for provisioning to finish.

## 4–5. Get your Project URL and publishable key

In the Supabase dashboard: **Project Settings → API**.

- Copy the **Project URL**
- Copy the **anon / publishable** key (⚠️ never use the `service_role` key here)

## 6–7. Create your environment file

```bash
cp .env.example .env
```

Fill in:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
```

## 8. Apply database migrations

Migrations live in `supabase/migrations/`:

- `001_initial_schema.sql` — creates the `vehicles` table, indexes, and the
  `updated_at` trigger
- `002_rls_policies.sql` — enables Row Level Security: the public can only
  read **published** vehicles; only authenticated users (the admin) can
  insert/update/delete
- `003_storage.sql` — creates the `vehicle-images` Storage bucket and its
  access policies

Apply them with the Supabase CLI (recommended):

```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-ref
supabase db push
```

Or paste each file's contents, in order, into the Supabase Dashboard →
**SQL Editor** and run them one by one.

## 9. Configure Storage

Migration `003_storage.sql` already creates the `vehicle-images` bucket
(public read, admin-only write) — no manual step needed if you ran the
migrations. If you prefer to do it by hand: **Storage → New bucket** →
name it `vehicle-images` → make it **public**, then copy the policies from
that migration file into **Storage → Policies**.

## 10. Create the first admin user

There is intentionally **no hardcoded admin account or password**. Create
the one administrator account yourself:

1. Supabase Dashboard → **Authentication → Users → Add user**
2. Enter a real email and a strong password
3. (Optional but recommended) Confirm the email or disable email
   confirmation requirement in **Authentication → Providers → Email** for a
   single-admin setup

This project treats **every** authenticated Supabase Auth user as an admin
(see the comment at the bottom of `002_rls_policies.sql`). Since only one
admin account should exist, do not create additional Auth users unless you
also add role-based restrictions.

## 11. Start the dev server

```bash
npm run dev
```

## 12–13. Log in

Open `http://localhost:5173/admin/login` and sign in with the account you
created in step 10.

## 14–17. Add your first real vehicle

1. Go to **Vehicle Management → Add Vehicle**
2. Enter real vehicle details (brand, model, year, price in AED, etc.)
3. Upload real photos of the vehicle — the first upload becomes the primary
   image automatically; click any thumbnail's star to change it
4. Save, then toggle **Publish** from the vehicle list
5. Visit `/vehicles` on the public site to confirm it appears, then open its
   detail page to verify the Call / WhatsApp buttons work

## 18. Build for production

```bash
npm run build
npm run preview   # optional local check of the production build
```

Deploy the contents of `dist/` to any static host (Vercel, Netlify,
Cloudflare Pages, etc.). This is a client-side SPA using React Router, so
configure your host to rewrite all routes to `index.html`.

> **Note:** this project was authored in an environment without npm
> registry / network access, so `npm install` and `npm run build` were not
> executed here. Please run them locally after downloading the project to
> confirm the build passes and pull in exact dependency versions.

---

## Architecture

```
src/
  assets/            Logo and static images
  components/
    layout/           Header, Footer, PublicLayout, AdminLayout, ProtectedRoute
    vehicles/          VehicleCard, VehicleGrid, VehicleFilters, VehicleGallery
    common/            SEO, EmptyState, LoadingSkeleton, ConfirmDialog
  pages/
    Home, Vehicles, VehicleDetails, Services, About, Contact, Admin/*
  hooks/               useAuth, useVehicles (TanStack Query hooks)
  lib/supabase/        Supabase client (publishable key only)
  i18n/                Persian/English translations + LanguageContext (RTL/LTR)
  schemas/             Zod validation for the vehicle form
  utils/               WhatsApp/phone links, formatting, SEO helpers
  types/               Vehicle, database, language types

supabase/migrations/   001 schema · 002 RLS · 003 storage
public/                robots.txt, sitemap.xml, favicon
```

## Security

- **RLS is enforced at the database level**, not just in the frontend.
  Anonymous users can only `select` vehicles where `is_published = true`.
  Only authenticated requests can insert/update/delete.
- The **Supabase `service_role` key is never used in the frontend** — only
  the browser-safe publishable/anon key, read from `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Storage policies restrict uploads/deletes to authenticated users; reads
  are public since vehicle photos are meant to be publicly visible.
- Vehicle deletion in the admin UI requires an explicit confirmation dialog.
- Admin routes (`/admin/*` except `/admin/login`) are wrapped in
  `ProtectedRoute`, which redirects unauthenticated visitors to
  `/admin/login`. This is a UX convenience — the real authorization boundary
  is the RLS policies above.

## Bilingual / RTL-LTR

`src/i18n/LanguageContext.tsx` sets `document.documentElement.dir` to `rtl`
or `ltr` based on the selected language and persists the choice in
`localStorage`. All layout spacing in the app uses logical Tailwind
utilities (`ps-`, `pe-`, `start-`, `end-`) rather than `left`/`right`, so the
UI mirrors correctly rather than just having translated strings.

## SEO

- Per-page `<title>`, meta description, canonical URL and Open Graph tags
  via `react-helmet-async` (see `src/components/common/SEO.tsx`)
- `AutomotiveBusiness` structured data on Home/Contact, `Vehicle` structured
  data on each vehicle detail page (only when real data exists)
- `public/robots.txt` disallows `/admin`
- `public/sitemap.xml` includes the static public routes. Published vehicle
  detail pages are dynamic, so extend the sitemap with a small script that
  queries `vehicles` where `is_published = true` and writes their URLs — for
  example a Node script run at deploy time, or a Supabase Edge Function
  serving `/sitemap.xml` dynamically.

## What's intentionally NOT included

Per the project requirements: no external vehicle/marketplace APIs, no
AED→IRR currency conversion, no PWA/service worker, no customer
request/quote forms, no seeded/fake vehicles, no hardcoded admin
credentials. The vehicle inventory starts empty and is populated only
through the admin dashboard.
