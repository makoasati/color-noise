-- ============================================================
-- Color&Noise — Supabase Schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- ── Profiles table (extends auth.users) ──────────────────────
create table if not exists profiles (
  id        uuid references auth.users on delete cascade primary key,
  username  text unique not null,
  role      text not null default 'writer' check (role in ('admin', 'writer')),
  created_at timestamptz default now()
);

-- Auto-create profile row when a new auth user signs up
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into profiles (id, username, role)
  values (new.id, split_part(new.email, '@', 1), 'writer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── Articles table ────────────────────────────────────────────
create table if not exists articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  category     text not null check (category in ('review', 'news', 'spotlight')),
  author_id    uuid references profiles(id) on delete set null,
  author_name  text,
  date         text,
  venue        text,
  neighborhood text,
  excerpt      text not null,
  body         text,
  cover_image  text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Auto-update updated_at
create or replace function touch_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_updated_at on articles;
create trigger articles_updated_at
  before update on articles
  for each row execute procedure touch_updated_at();

-- ── Row Level Security ────────────────────────────────────────
alter table profiles enable row level security;
alter table articles enable row level security;

-- Helper: check if current user is admin
create or replace function is_admin()
returns boolean language sql security definer stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- ── Profiles policies ────────────────────────────────────────
drop policy if exists "Profiles viewable by all authenticated" on profiles;
create policy "Profiles viewable by all authenticated" on profiles
  for select using (auth.uid() is not null);

drop policy if exists "Users update own profile" on profiles;
create policy "Users update own profile" on profiles
  for update using (auth.uid() = id);

-- ── Articles policies ─────────────────────────────────────────

-- Public: anyone can read published articles (no auth needed)
drop policy if exists "Published articles are public" on articles;
create policy "Published articles are public" on articles
  for select using (status = 'published');

-- Authenticated: users can read their own articles (including drafts)
drop policy if exists "Authors read own articles" on articles;
create policy "Authors read own articles" on articles
  for select using (auth.uid() = author_id);

-- Admin: can read all articles
drop policy if exists "Admins read all articles" on articles;
create policy "Admins read all articles" on articles
  for select using (is_admin());

-- Writers: can insert their own articles
drop policy if exists "Writers insert articles" on articles;
create policy "Writers insert articles" on articles
  for insert with check (auth.uid() = author_id);

-- Writers: can update their own articles
drop policy if exists "Authors update own articles" on articles;
create policy "Authors update own articles" on articles
  for update using (auth.uid() = author_id);

-- Admin: can update any article
drop policy if exists "Admins update all articles" on articles;
create policy "Admins update all articles" on articles
  for update using (is_admin());

-- Admin: can delete any article
drop policy if exists "Admins delete articles" on articles;
create policy "Admins delete articles" on articles
  for delete using (is_admin());

-- Writers: can delete their own articles
drop policy if exists "Authors delete own articles" on articles;
create policy "Authors delete own articles" on articles
  for delete using (auth.uid() = author_id);
