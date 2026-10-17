-- Swift Auto Gallery — Editorial CMS (articles + categories)
-- Incremental migration. Does NOT touch vehicles tables/policies/buckets.
-- Idempotent where practical.

-- ---------------------------------------------------------------------
-- Admin authorization for editorial content.
-- Existing vehicle policies treat any authenticated user as admin. For the
-- new tables we use an explicit allow-list so a stray Auth user can never
-- publish content. After applying, add YOUR admin user (see README):
--   insert into public.admin_users (user_id) values ('<your-auth-user-uuid>');
-- ---------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
-- No policies on admin_users: clients cannot read or write it at all.
revoke all on public.admin_users from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------
create table if not exists public.article_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[^\s/]+$'),
  name_fa     text not null,
  name_en     text not null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Articles
-- ---------------------------------------------------------------------
create table if not exists public.articles (
  id                    uuid primary key default gen_random_uuid(),
  title                 text not null check (length(trim(title)) > 0),
  slug                  text not null check (slug ~ '^[^\s/]+$'),
  language              text not null check (language in ('fa', 'en')),
  excerpt               text,
  content               jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  cover_image_path      text,
  cover_image_alt       text,
  author_name           text,
  category_id           uuid references public.article_categories(id) on delete set null,
  translation_group_id  uuid,
  status                text not null default 'draft'
                          check (status in ('draft', 'review', 'published', 'archived')),
  is_featured           boolean not null default false,
  published_at          timestamptz,
  seo_title             text,
  seo_description       text,
  canonical_url         text check (canonical_url is null or canonical_url ~ '^https://'),
  social_image_path     text,
  source_urls           text[] not null default '{}',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  created_by            uuid references auth.users(id) on delete set null,
  updated_by            uuid references auth.users(id) on delete set null,
  -- published articles must carry a publication timestamp
  constraint articles_published_has_date check (status <> 'published' or published_at is not null)
);

-- URL uniqueness strategy: slug is unique PER LANGUAGE (fa/en may reuse a slug).
create unique index if not exists uq_articles_language_slug on public.articles (language, slug);
-- One article per language inside a translation group.
create unique index if not exists uq_articles_group_language
  on public.articles (translation_group_id, language) where translation_group_id is not null;

create index if not exists idx_articles_listing
  on public.articles (language, published_at desc) where status = 'published';
create index if not exists idx_articles_category on public.articles (category_id);
create index if not exists idx_articles_status on public.articles (status);
create index if not exists idx_articles_featured on public.articles (is_featured) where is_featured;
create index if not exists idx_articles_group on public.articles (translation_group_id);

-- ---------------------------------------------------------------------
-- Triggers: timestamps + audit columns (server-side, not client-trusted)
-- ---------------------------------------------------------------------
create or replace function public.articles_audit()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  if tg_op = 'INSERT' then
    new.created_by := auth.uid();
  else
    new.created_by := old.created_by;
  end if;
  -- stamp the first publication date automatically if the admin left it blank
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_articles_audit on public.articles;
create trigger trg_articles_audit
  before insert or update on public.articles
  for each row execute function public.articles_audit();

drop trigger if exists trg_article_categories_updated_at on public.article_categories;
create trigger trg_article_categories_updated_at
  before update on public.article_categories
  for each row execute function public.set_updated_at();   -- defined in 001

-- ---------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------
alter table public.article_categories enable row level security;
alter table public.articles enable row level security;

-- Categories: public read, admin write
drop policy if exists "public_read_categories" on public.article_categories;
create policy "public_read_categories" on public.article_categories
  for select to anon, authenticated using (true);

drop policy if exists "admin_manage_categories" on public.article_categories;
create policy "admin_manage_categories" on public.article_categories
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Articles: public sees only published AND already-due articles
drop policy if exists "public_read_published_articles" on public.articles;
create policy "public_read_published_articles" on public.articles
  for select to anon, authenticated
  using (status = 'published' and published_at <= now());

drop policy if exists "admin_manage_articles" on public.articles;
create policy "admin_manage_articles" on public.articles
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- Storage: dedicated bucket for article media (vehicle bucket untouched)
-- 5 MB limit, images only.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('article-media', 'article-media', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

drop policy if exists "public_read_article_media" on storage.objects;
create policy "public_read_article_media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'article-media');

drop policy if exists "admin_insert_article_media" on storage.objects;
create policy "admin_insert_article_media" on storage.objects
  for insert to authenticated with check (bucket_id = 'article-media' and public.is_admin());

drop policy if exists "admin_update_article_media" on storage.objects;
create policy "admin_update_article_media" on storage.objects
  for update to authenticated
  using (bucket_id = 'article-media' and public.is_admin())
  with check (bucket_id = 'article-media' and public.is_admin());

drop policy if exists "admin_delete_article_media" on storage.objects;
create policy "admin_delete_article_media" on storage.objects
  for delete to authenticated using (bucket_id = 'article-media' and public.is_admin());

-- ---------------------------------------------------------------------
-- Initial category suggestions (idempotent; NOT articles)
-- ---------------------------------------------------------------------
insert into public.article_categories (slug, name_fa, name_en, sort_order) values
  ('automotive-news', 'اخبار خودرو', 'Automotive News', 1),
  ('buying-guides', 'راهنمای خرید خودرو', 'Buying Guides', 2),
  ('vehicle-import', 'واردات خودرو', 'Vehicle Import', 3),
  ('regulations', 'قوانین و مقررات', 'Regulations', 4),
  ('luxury-cars', 'خودروهای لوکس', 'Luxury Cars', 5),
  ('maintenance-reviews', 'نگهداری و بررسی خودرو', 'Car Reviews and Maintenance', 6)
on conflict (slug) do nothing;
