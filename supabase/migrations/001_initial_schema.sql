-- Swift Auto Gallery — initial schema
-- Creates the vehicles table with sensible constraints and indexes.

create extension if not exists "pgcrypto";

create table if not exists public.vehicles (
  id                      uuid primary key default gen_random_uuid(),
  brand                   text not null,
  model                   text not null,
  trim                    text,
  year                    integer not null check (year between 1970 and extract(year from now())::int + 1),
  price_aed               numeric(12, 2) not null check (price_aed >= 0),
  mileage                 integer check (mileage is null or mileage >= 0),
  fuel_type               text,
  transmission            text,
  engine                  text,
  engine_size             text,
  body_type               text,
  color                   text,
  regional_specification  text,
  country                 text,
  description_fa          text,
  description_en          text,
  images                  jsonb not null default '[]'::jsonb,
  is_available            boolean not null default true,
  is_featured             boolean not null default false,
  is_published            boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

comment on table public.vehicles is 'Swift Auto Gallery vehicle inventory. Single source of vehicle data for the site.';
comment on column public.vehicles.images is 'Array of {url, path, isPrimary, sortOrder} objects referencing Supabase Storage objects.';

-- Indexes for the common public queries and admin filtering
create index if not exists idx_vehicles_published on public.vehicles (is_published);
create index if not exists idx_vehicles_featured on public.vehicles (is_featured) where is_featured = true;
create index if not exists idx_vehicles_brand on public.vehicles (brand);
create index if not exists idx_vehicles_body_type on public.vehicles (body_type);
create index if not exists idx_vehicles_created_at on public.vehicles (created_at desc);
create index if not exists idx_vehicles_price on public.vehicles (price_aed);

-- Keep updated_at current on every row update
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_vehicles_updated_at on public.vehicles;
create trigger trg_vehicles_updated_at
  before update on public.vehicles
  for each row
  execute function public.set_updated_at();
