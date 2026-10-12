<!-- git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   README.md
        new file:   eslint.config.js
        new file:   index.html
        new file:   package-lock.json
        new file:   package.json
        new file:   postcss.config.js
        new file:   public/favicon.svg
        new file:   public/robots.txt
        new file:   public/sitemap.xml
        new file:   src/App.tsx
        new file:   src/assets/logo.jpg
        new file:   src/components/common/ConfirmDialog.tsx
        new file:   src/components/common/EmptyState.tsx
        new file:   src/components/common/LoadingSkeleton.tsx
        new file:   src/components/common/SEO.tsx
        new file:   src/components/layout/AdminLayout.tsx
        new file:   src/components/layout/Footer.tsx
        new file:   src/components/layout/Header.tsx
        new file:   src/components/layout/ProtectedRoute.tsx
        new file:   src/components/layout/PublicLayout.tsx
        new file:   src/components/vehicles/VehicleCard.tsx
        new file:   src/components/vehicles/VehicleFilters.tsx
        new file:   src/components/vehicles/VehicleGallery.tsx
        new file:   src/components/vehicles/VehicleGrid.tsx
        new file:   src/hooks/useAuth.tsx
        new file:   src/hooks/useVehicles.ts
        new file:   src/i18n/LanguageContext.tsx
        new file:   src/i18n/translations.ts
        new file:   src/index.css
        new file:   src/lib/supabase/client.ts
        new file:   src/main.tsx
        new file:   src/pages/About/About.tsx
        new file:   src/pages/Admin/Dashboard.tsx
        new file:   src/pages/Admin/Login.tsx
        new file:   src/pages/Admin/VehicleForm.tsx
        new file:   src/pages/Admin/VehicleList.tsx
        new file:   src/pages/Contact/Contact.tsx
        new file:   src/pages/Home/Home.tsx
        new file:   src/pages/NotFound.tsx
        new file:   src/pages/Services/Services.tsx
        new file:   src/pages/VehicleDetails/VehicleDetails.tsx
        new file:   src/pages/VehicleDetails/VehicleNotFound.tsx
        new file:   src/pages/Vehicles/Vehicles.tsx
        new file:   src/schemas/vehicleSchema.ts
        new file:   src/types/database.ts
        new file:   src/types/language.ts
        new file:   src/types/vehicle.ts
        new file:   src/utils/format.ts
        new file:   src/utils/seo.ts
        new file:   src/utils/whatsapp.ts
        new file:   src/vite-env.d.ts
        new file:   supabase/migrations/001_initial_schema.sql
        new file:   supabase/migrations/002_rls_policies.sql
        new file:   tailwind.config.ts
        new file:   tsconfig.app.json
        new file:   tsconfig.json
        new file:   tsconfig.node.json
        new file:   vite.config.ts

PS C:\Users\alireza\Desktop\swift-auto-gallery> git commit -m "Initial commit - Swift Auto Gallery"
[main (root-commit) 8074ea9] Initial commit - Swift Auto Gallery
 60 files changed, 7977 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 eslint.config.js
 create mode 100644 index.html
 create mode 100644 package-lock.json
 create mode 100644 package.json
 create mode 100644 postcss.config.js
 create mode 100644 public/favicon.svg
 create mode 100644 public/robots.txt
 create mode 100644 public/sitemap.xml
 create mode 100644 src/App.tsx
 create mode 100644 src/assets/logo.jpg
 create mode 100644 src/components/common/ConfirmDialog.tsx
 create mode 100644 src/components/common/EmptyState.tsx
 create mode 100644 src/components/common/LoadingSkeleton.tsx
 create mode 100644 src/components/common/SEO.tsx
 create mode 100644 src/components/layout/AdminLayout.tsx
 create mode 100644 src/components/layout/Footer.tsx
 create mode 100644 src/components/layout/Header.tsx
 create mode 100644 src/components/layout/ProtectedRoute.tsx
 create mode 100644 src/components/layout/PublicLayout.tsx
 create mode 100644 src/components/vehicles/VehicleCard.tsx
 create mode 100644 src/components/vehicles/VehicleFilters.tsx
 create mode 100644 src/components/vehicles/VehicleGallery.tsx
 create mode 100644 src/components/vehicles/VehicleGrid.tsx
 create mode 100644 src/hooks/useAuth.tsx
 create mode 100644 src/hooks/useVehicles.ts
 create mode 100644 src/i18n/LanguageContext.tsx
 create mode 100644 src/i18n/translations.ts
 create mode 100644 src/index.css
 create mode 100644 src/lib/supabase/client.ts
 create mode 100644 src/main.tsx
 create mode 100644 src/pages/About/About.tsx
 create mode 100644 src/pages/Admin/Dashboard.tsx
 create mode 100644 src/pages/Admin/Login.tsx
 create mode 100644 src/pages/Admin/VehicleForm.tsx
 create mode 100644 src/pages/Admin/VehicleList.tsx
 create mode 100644 src/pages/Contact/Contact.tsx
 create mode 100644 src/pages/Home/Home.tsx
 create mode 100644 src/pages/NotFound.tsx
 create mode 100644 src/pages/Services/Services.tsx
 create mode 100644 src/pages/VehicleDetails/VehicleDetails.tsx
 create mode 100644 src/pages/VehicleDetails/VehicleNotFound.tsx
 create mode 100644 src/pages/Vehicles/Vehicles.tsx
 create mode 100644 src/schemas/vehicleSchema.ts
 create mode 100644 src/types/database.ts
 create mode 100644 src/types/language.ts
 create mode 100644 src/types/vehicle.ts
 create mode 100644 src/utils/format.ts
 create mode 100644 src/utils/seo.ts
 create mode 100644 src/utils/whatsapp.ts
 create mode 100644 src/vite-env.d.ts
 create mode 100644 supabase/migrations/001_initial_schema.sql
 create mode 100644 supabase/migrations/003_storage.sql
 create mode 100644 tsconfig.json
 create mode 100644 tsconfig.node.json
PS C:\Users\alireza\Desktop\swift-auto-gallery> git branch -M main
PS C:\Users\alireza\Desktop\swift-auto-gallery> git remote add origin https://github.com/Alireza-Mohammadpoor/swift-auto-gallery.git
PS C:\Users\alireza\Desktop\swift-auto-gallery> git remote -v
origin  https://github.com/Alireza-Mohammadpoor/swift-auto-gallery.git (fetch)
origin  https://github.com/Alireza-Mohammadpoor/swift-auto-gallery.git (push)
PS C:\Users\alireza\Desktop\swift-auto-gallery> git push -u origin main
To https://github.com/Alireza-Mohammadpoor/swift-auto-gallery.git
error: failed to push some refs to 'https://github.com/Alireza-Mohammadpoor/swift-auto-gallery.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
PS C:\Users\alireza\Desktop\swift-auto-gallery> git pull origin main --allow-unrelated-histories
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 6 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
From https://github.com/Alireza-Mohammadpoor/swift-auto-gallery
 * branch            main       -> FETCH_HEAD
 * [new branch]      main       -> origin/main
Auto-merging README.md
CONFLICT (add/add): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
PS C:\Users\alireza\Desktop\swift-auto-gallery> git status
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both added:      README.md

no changes added to commit (use "git add" and/or "git commit -a")
PS C:\Users\alireza\Desktop\swift-auto-gallery>  -->










# Swift Auto Gallery — اتوگالری سوییفت

A bilingual automotive dealership website for **Swift Auto Gallery**, based on Kish Island, Iran. Built with React, Vite, TypeScript, Tailwind CSS, and Supabase.

The platform includes a vehicle inventory, an admin dashboard, SEO features, and a bilingual editorial CMS for publishing Persian and English automotive articles and news.

## Features

- Persian (RTL) and English (LTR) interface
- Premium black-and-gold visual design
- Vehicle inventory with detailed listings and galleries
- Admin dashboard for managing vehicle listings
- Supabase authentication, PostgreSQL, and Storage
- Row Level Security (RLS) policies
- Blog and news CMS with article categories
- Rich-text article editor powered by Tiptap
- Draft, review, published, and archived article statuses
- Persian and English article translations
- SEO metadata, canonical URLs, Open Graph, and structured data
- Sitemap generation during production builds
- Responsive layout for desktop and mobile

## Business Information

- **Business:** Swift Auto Gallery
- **Location:** Next to Goldis Gas Station, Kish Island, Iran
- **Phone / WhatsApp:** 09347699899
- **Instagram:** [@swift.autogallery](https://instagram.com/swift.autogallery)
- **Website:** https://swiftautogallery.com

## Technology Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack React Query
- Supabase Auth, PostgreSQL, and Storage
- React Helmet Async
- Tiptap rich-text editor
- Zod
- Lucide React

## Requirements

- Node.js 18 or newer
- npm
- A Supabase project

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Alireza-Mohammadpoor/swift-auto-gallery.git
cd swift-auto-gallery
npm install
```

Create a `.env` file in the project root. Use `.env.example` as a reference if available.

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Use only the browser-safe Supabase publishable/anon key in frontend environment variables. **Never expose the Supabase `service_role` key in client-side code.**

## Supabase Setup

### 1. Configure the project

Create a project in the [Supabase Dashboard](https://supabase.com/) and retrieve its Project URL and publishable key from the project settings.

### 2. Apply database migrations

The migration files are located in `supabase/migrations/`.

- `001_initial_schema.sql` — initial database schema, including vehicle data.
- `002_rls_policies.sql` — vehicle access policies, if present in the project.
- `003_storage.sql` — storage setup and policies for vehicle images.
- `004_editorial_cms.sql` — article categories, articles, administrator allow-list, and editorial media storage.

Check the actual files in your repository before applying migrations. Apply each migration only once and in the correct order. You can use the Supabase CLI or run the SQL in the Supabase Dashboard's SQL Editor.

If using the CLI:

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Back up your database or use a staging project before applying migrations to a production database.

### 3. Configure the administrator

Create an administrator account under **Supabase Dashboard → Authentication → Users**.

The editorial CMS uses the `admin_users` table to authorize article management. After applying migration `004_editorial_cms.sql`, register the authenticated user's UUID in that table using the SQL Editor:

```sql
INSERT INTO public.admin_users (user_id)
VALUES ('YOUR_AUTH_USER_UUID');
```

Replace the placeholder with the UUID of your actual administrator account.

The vehicle-management policies and editorial CMS policies may use different authorization rules. Review the applicable RLS policies before creating additional accounts.

### 4. Configure Storage

The vehicle-image and editorial-media buckets serve different purposes:

- `vehicle-images` — vehicle listing photos.
- `article-media` — article images, with a 5 MB limit and support for JPEG, PNG, WebP, and AVIF.

Migration `004_editorial_cms.sql` is intended to configure the editorial media bucket and its policies. Verify the bucket and policies in Supabase after applying the migration.

## Running the Project

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, typically:

```text
http://localhost:5173
```

Run the TypeScript check:

```bash
npm run typecheck
```

Run ESLint:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The production build runs the sitemap-generation script before TypeScript compilation and Vite bundling. Ensure the required environment variables and script are available before building.

## Vehicle Management

1. Sign in through the admin login page.
2. Open vehicle management.
3. Add the vehicle's details, including brand, model, year, price in AED, and photos.
4. Save the listing and publish it when ready.
5. Check the public vehicle listing and detail page.

Vehicle inventory should be populated with verified, real vehicle information. Do not add fake inventory or hardcode administrator credentials.

## Blog and News CMS

### Public Routes

- `/blog` — article listing
- `/blog/:slug` — article detail
- `/blog/category/:slug` — category listing

### Admin Routes

- `/admin/articles` — manage articles
- `/admin/articles/new` — create an article
- `/admin/articles/:id/edit` — edit an article
- `/admin/categories` — manage article categories

Access to administrative pages should be protected by authentication and the appropriate Supabase RLS policies.

### Editorial Workflow

1. Create an article.
2. Select its language and category.
3. Write and format the content in the rich-text editor.
4. Save it as a draft.
5. Preview the article.
6. Publish it when the content is ready.

Supported statuses include draft, review, published, and archived.

Persian and English versions can be linked using a shared translation-group ID. Verify both versions are published before expecting language alternates to appear.

### Scheduled Publication

Articles assigned a future publication date can remain hidden until their publication time if the database policies enforce the publication-date condition.

This does not automatically convert drafts into published articles. Sitemap updates for newly published content also depend on a subsequent build and deployment.

## SEO

The project includes SEO utilities intended to support:

- Page titles and meta descriptions
- Canonical URLs
- Open Graph metadata
- Structured data for relevant business, vehicle, and article pages
- Language alternates for linked translations
- `robots.txt`
- XML sitemap generation

Before deployment, verify the canonical domain configured in `src/utils/seo.ts` and ensure `public/robots.txt` references the correct sitemap URL.

The sitemap generator uses the Supabase environment variables and retrieves eligible published content during the build. If generation fails or the required environment variables are missing, verify the build output and sitemap rather than assuming new URLs were added.

### SEO Limitations

This project uses a client-rendered React application. Search engines that execute JavaScript may process dynamically generated metadata, but some social-preview crawlers may not see the same article-specific metadata.

Unknown article URLs may render a not-found page while still returning HTTP 200 from the static application. Reliable HTTP-level status codes and metadata for non-JavaScript crawlers may require prerendering or server-side handling.

## Security

- Keep the Supabase `service_role` key out of frontend code.
- Enable and review Row Level Security on database tables.
- Restrict editorial content management to authorized administrators.
- Review Storage policies for both vehicle and article images.
- Keep administrative routes protected.
- Use confirmation dialogs for destructive actions.
- Never commit real credentials or private environment files to Git.

Frontend route protection is not a substitute for database authorization. Supabase RLS policies must enforce access independently.

## Deployment

The project can be deployed to Vercel or another compatible static host.

Before deploying:

1. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the hosting environment.
2. Configure the correct production domain in the SEO utilities.
3. Verify the SPA fallback rewrite configuration.
4. Run `npm run build` and resolve any errors.
5. Confirm that Supabase migrations, administrator access, and Storage policies are configured.
6. Verify vehicle listings, article publishing, canonical URLs, and sitemap output on the deployed site.

After publishing new articles, trigger a new build and deployment if the sitemap is generated at build time.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── blog/
│   ├── common/
│   ├── layout/
│   └── vehicles/
├── hooks/
├── i18n/
├── lib/
│   └── supabase/
├── pages/
│   ├── About/
│   ├── Admin/
│   ├── Blog/
│   ├── Contact/
│   ├── Home/
│   ├── Services/
│   ├── VehicleDetails/
│   └── Vehicles/
├── schemas/
├── types/
└── utils/

scripts/
supabase/
└── migrations/

public/
```

The exact structure may vary as the project evolves. Check the repository for the current files and migrations.

## License

No license has been specified. Contact the repository owner before redistributing or reusing the project.