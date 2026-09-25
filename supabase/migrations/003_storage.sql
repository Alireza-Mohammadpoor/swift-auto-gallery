-- Swift Auto Gallery — Storage bucket + policies for vehicle images

insert into storage.buckets (id, name, public)
values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do nothing;

-- Public can view images (bucket is public, but we also scope a read policy)
drop policy if exists "public_read_vehicle_images" on storage.objects;
create policy "public_read_vehicle_images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'vehicle-images');

-- Only authenticated admin can upload
drop policy if exists "authenticated_upload_vehicle_images" on storage.objects;
create policy "authenticated_upload_vehicle_images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'vehicle-images');

-- Only authenticated admin can update (e.g. overwrite) images
drop policy if exists "authenticated_update_vehicle_images" on storage.objects;
create policy "authenticated_update_vehicle_images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'vehicle-images')
  with check (bucket_id = 'vehicle-images');

-- Only authenticated admin can delete images
drop policy if exists "authenticated_delete_vehicle_images" on storage.objects;
create policy "authenticated_delete_vehicle_images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'vehicle-images');
