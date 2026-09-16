alter table public.services
add column if not exists icon_path text not null default '';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('service-icons', 'service-icons', true, 1048576, array['image/svg+xml', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Service icons are public" on storage.objects;
create policy "Service icons are public" on storage.objects for select to public
using (bucket_id = 'service-icons');

drop policy if exists "Admins upload service icons" on storage.objects;
create policy "Admins upload service icons" on storage.objects for insert to authenticated
with check (bucket_id = 'service-icons' and public.is_codizzz_admin());

drop policy if exists "Admins update service icons" on storage.objects;
create policy "Admins update service icons" on storage.objects for update to authenticated
using (bucket_id = 'service-icons' and public.is_codizzz_admin())
with check (bucket_id = 'service-icons' and public.is_codizzz_admin());

drop policy if exists "Admins delete service icons" on storage.objects;
create policy "Admins delete service icons" on storage.objects for delete to authenticated
using (bucket_id = 'service-icons' and public.is_codizzz_admin());
