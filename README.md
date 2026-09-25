git status
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
PS C:\Users\alireza\Desktop\swift-auto-gallery> 