create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

insert into public.admin_users (email)
values ('teamcodizzz@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_codizzz_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 100),
  summary text not null check (char_length(summary) between 10 and 500),
  icon_key text not null default 'web' check (icon_key in ('agent', 'automation', 'fte', 'software', 'mobile', 'web')),
  icon_path text not null default '',
  position integer not null default 0 check (position >= 0),
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.career_roles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 120),
  focus text not null check (char_length(focus) between 2 and 160),
  description text not null check (char_length(description) between 10 and 600),
  position integer not null default 0 check (position >= 0),
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 120),
  role text not null check (char_length(role) between 2 and 160),
  summary text not null check (char_length(summary) between 10 and 800),
  image_path text not null default '',
  skills text[] not null default '{}',
  linkedin_url text not null default '',
  x_url text not null default '',
  position integer not null default 0 check (position >= 0),
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members drop constraint if exists team_members_published_image_check;
alter table public.team_members add constraint team_members_published_image_check
check (not published or image_path <> '');
alter table public.team_members drop constraint if exists team_members_linkedin_url_check;
alter table public.team_members add constraint team_members_linkedin_url_check
check (linkedin_url = '' or linkedin_url ~* '^https://([a-z0-9-]+\.)*linkedin\.com/');
alter table public.team_members drop constraint if exists team_members_x_url_check;
alter table public.team_members add constraint team_members_x_url_check
check (x_url = '' or x_url ~* '^https://([a-z0-9-]+\.)*(x\.com|twitter\.com)/');

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists services_touch_updated_at on public.services;
create trigger services_touch_updated_at before update on public.services
for each row execute function public.touch_updated_at();
drop trigger if exists career_roles_touch_updated_at on public.career_roles;
create trigger career_roles_touch_updated_at before update on public.career_roles
for each row execute function public.touch_updated_at();
drop trigger if exists team_members_touch_updated_at on public.team_members;
create trigger team_members_touch_updated_at before update on public.team_members
for each row execute function public.touch_updated_at();

alter table public.admin_users enable row level security;
alter table public.services enable row level security;
alter table public.career_roles enable row level security;
alter table public.team_members enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.services, public.career_roles, public.team_members to anon, authenticated;
grant select on public.admin_users to authenticated;
grant insert, update, delete on public.services, public.career_roles, public.team_members to authenticated;
grant execute on function public.is_codizzz_admin() to anon, authenticated;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users" on public.admin_users for select to authenticated
using (public.is_codizzz_admin());

drop policy if exists "Published services are public" on public.services;
create policy "Published services are public" on public.services for select to anon, authenticated
using (published or public.is_codizzz_admin());
drop policy if exists "Admins manage services" on public.services;
create policy "Admins manage services" on public.services for all to authenticated
using (public.is_codizzz_admin()) with check (public.is_codizzz_admin());

drop policy if exists "Published careers are public" on public.career_roles;
create policy "Published careers are public" on public.career_roles for select to anon, authenticated
using (published or public.is_codizzz_admin());
drop policy if exists "Admins manage careers" on public.career_roles;
create policy "Admins manage careers" on public.career_roles for all to authenticated
using (public.is_codizzz_admin()) with check (public.is_codizzz_admin());

drop policy if exists "Published team members are public" on public.team_members;
create policy "Published team members are public" on public.team_members for select to anon, authenticated
using (published or public.is_codizzz_admin());
drop policy if exists "Admins manage team members" on public.team_members;
create policy "Admins manage team members" on public.team_members for all to authenticated
using (public.is_codizzz_admin()) with check (public.is_codizzz_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('team-images', 'team-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Team images are public" on storage.objects;
create policy "Team images are public" on storage.objects for select to public
using (bucket_id = 'team-images');
drop policy if exists "Admins upload team images" on storage.objects;
create policy "Admins upload team images" on storage.objects for insert to authenticated
with check (bucket_id = 'team-images' and public.is_codizzz_admin());
drop policy if exists "Admins update team images" on storage.objects;
create policy "Admins update team images" on storage.objects for update to authenticated
using (bucket_id = 'team-images' and public.is_codizzz_admin())
with check (bucket_id = 'team-images' and public.is_codizzz_admin());
drop policy if exists "Admins delete team images" on storage.objects;
create policy "Admins delete team images" on storage.objects for delete to authenticated
using (bucket_id = 'team-images' and public.is_codizzz_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('service-icons', 'service-icons', true, 1048576, array['image/svg+xml', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

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

insert into public.services (slug, title, summary, icon_key, position, published) values
  ('ai-agents', 'AI Agents', 'Agents that reason, coordinate tools and carry work forward with human oversight.', 'agent', 1, true),
  ('ai-automation', 'AI Automation', 'Connected workflows that remove repetitive handoffs and manual operations.', 'automation', 2, true),
  ('digital-fte', 'Digital FTE', 'Dedicated digital teammates shaped around a defined operational role.', 'fte', 3, true),
  ('custom-software', 'Custom Software', 'Purpose-built systems designed around your process, data and business logic.', 'software', 4, true),
  ('mobile-app-development', 'Mobile App Development', 'Mobile products designed for the people and context in which they are used.', 'mobile', 5, true),
  ('custom-web-development', 'Custom Web Development', 'Fast, responsive web platforms built around your audience and operation.', 'web', 6, true)
on conflict (slug) do nothing;

insert into public.career_roles (slug, title, focus, description, position, published) values
  ('mobile-app-developer', 'Mobile App Developer', 'Mobile product engineering', 'Help turn product requirements into reliable, polished mobile experiences.', 1, true),
  ('n8n-ai-automation', 'n8n AI Automation', 'Workflows and integrations', 'Design and build n8n workflows that connect tools and remove repetitive work.', 2, true),
  ('backend-developer', 'Backend Developer', 'Python and FastAPI', 'Build clear, dependable backend services and APIs with Python and FastAPI.', 3, true)
on conflict (slug) do nothing;

insert into public.team_members (slug, name, role, summary, image_path, skills, linkedin_url, x_url, position, published) values
  ('umer-ali', 'Umer Ali', 'Co-founder & AI Engineer', 'Builds agentic products and full-stack experiences with a focus on dependable, practical AI Automation.', '/brand/team-umer-ali.jpg', array['Next.js', 'React', 'Python', 'TypeScript', 'AI Agents', 'Claude Code'], 'https://www.linkedin.com/in/umer-ali-a962252ba/', 'https://x.com/Umerali_4', 1, true),
  ('muhammad-anzal', 'Muhammad Anzal', 'AI Developer', 'Develops AI systems grounded in Python, retrieval workflows and production-ready model integrations.', '/brand/team-muhammad-anzal.jpg', array['Python', 'Claude Code', 'RAG'], 'https://www.linkedin.com/in/muhammad-anzal-035705348/', '', 2, true)
on conflict (slug) do nothing;
