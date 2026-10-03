alter table public.career_roles
add column if not exists application_status text not null default 'open';

alter table public.career_roles
drop constraint if exists career_roles_application_status_check;

alter table public.career_roles
add constraint career_roles_application_status_check
check (application_status in ('open', 'upcoming'));
