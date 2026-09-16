# Codizzz Admin Panel Setup

The admin panel is available at `/admin`. Complete these one-time steps to enable editing.

## 1. Create the database

Open the Supabase project at `https://supabase.com/dashboard/project/coxptjvzdwdphcpdnrsg`, go to **SQL Editor**, paste the full contents of:

`supabase/migrations/202609160001_content_admin.sql`

Then select **Run**. This creates the Services, Careers and Team tables, their security rules, seed content and the private admin allow-list.

If the original migration was already run, also run `supabase/migrations/202609160002_service_icons.sql` once. It enables custom SVG, PNG and WebP uploads for service icons.

## 2. Create the admin login

In Supabase, open **Authentication → Users → Add user** and create a password login for:

`teamcodizzz@gmail.com`

Only an authenticated email that also exists in `public.admin_users` can edit content. Do not put a Supabase service-role key in the website.

## 3. Add environment variables

Copy **Project Settings → API → Project URL** and the **publishable/anon key** into local `.env.local` and the production host:

```text
NEXT_PUBLIC_SUPABASE_URL=https://coxptjvzdwdphcpdnrsg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_or_anon_key
ADMIN_EMAIL=teamcodizzz@gmail.com
```

Redeploy after adding production environment variables. Visit `/admin`, sign in, and manage Services, Careers and Team content. Published changes are reflected on the public site; drafts remain visible only inside the admin panel.

## Images

Team portraits accept JPG, PNG or WebP files up to 5 MB. A portrait is required before a team member can be published.
