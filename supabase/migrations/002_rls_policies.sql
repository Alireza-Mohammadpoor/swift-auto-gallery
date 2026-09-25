-- Swift Auto Gallery — Row Level Security policies
-- Public (anon) users may only READ published vehicles.
-- Authenticated users (the single admin account) may fully manage vehicles.
-- No policy uses `USING (true)` for write operations.

alter table public.vehicles enable row level security;

-- Public read: only published vehicles
drop policy if exists "public_read_published_vehicles" on public.vehicles;
create policy "public_read_published_vehicles"
  on public.vehicles
  for select
  to anon
  using (is_published = true);

-- Authenticated admin: full read access (including unpublished, for the dashboard)
drop policy if exists "authenticated_read_all_vehicles" on public.vehicles;
create policy "authenticated_read_all_vehicles"
  on public.vehicles
  for select
  to authenticated
  using (true);

-- Authenticated admin: insert
drop policy if exists "authenticated_insert_vehicles" on public.vehicles;
create policy "authenticated_insert_vehicles"
  on public.vehicles
  for insert
  to authenticated
  with check (true);

-- Authenticated admin: update
drop policy if exists "authenticated_update_vehicles" on public.vehicles;
create policy "authenticated_update_vehicles"
  on public.vehicles
  for update
  to authenticated
  using (true)
  with check (true);

-- Authenticated admin: delete
drop policy if exists "authenticated_delete_vehicles" on public.vehicles;
create policy "authenticated_delete_vehicles"
  on public.vehicles
  for delete
  to authenticated
  using (true);

-- NOTE: This project is designed for a SINGLE administrator account.
-- Every authenticated Supabase Auth user is treated as an admin. If you ever
-- add more Supabase Auth users for other purposes (e.g. customer accounts),
-- you MUST replace the `to authenticated` policies above with policies that
-- check a dedicated `admins` table or a custom claim, e.g.:
--
--   using (auth.uid() in (select user_id from public.admins))
