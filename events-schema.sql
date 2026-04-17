-- ============================================================
-- Color&Noise — Events Schema
-- Run this in Supabase SQL Editor AFTER running schema.sql
-- ============================================================

-- ── Events table ──────────────────────────────────────────────
create table if not exists events (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  date                date not null,
  time                text,
  end_date            date,
  venue               text,
  neighborhood        text,
  category            text not null check (category in ('music', 'art', 'food', 'nightlife')),
  description         text,
  primary_source_url  text not null,
  primary_source_name text not null,
  additional_sources  jsonb default '[]'::jsonb,
  image_url           text,
  status              text not null default 'approved' check (status in ('approved', 'pending')),
  created_at          timestamptz default now(),
  updated_at          timestamptz default now(),
  first_seen_at       timestamptz default now()
);

create index if not exists events_date_idx      on events(date);
create index if not exists events_category_idx  on events(category);
create index if not exists events_status_idx    on events(status);
create index if not exists events_venue_idx     on events(venue);

-- Reuse touch_updated_at function defined in schema.sql
drop trigger if exists events_updated_at on events;
create trigger events_updated_at
  before update on events
  for each row execute procedure touch_updated_at();

-- ── Event sources table ───────────────────────────────────────
create table if not exists event_sources (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  url             text not null,
  category_hint   text not null default 'music' check (category_hint in ('music', 'art', 'food', 'nightlife')),
  active          boolean not null default true,
  last_scraped_at timestamptz
);

-- ── Row Level Security ────────────────────────────────────────
alter table events enable row level security;
alter table event_sources enable row level security;

-- Approved events are publicly readable
drop policy if exists "Approved events are public" on events;
create policy "Approved events are public" on events
  for select using (status = 'approved');

-- Admins can read all events (including pending)
drop policy if exists "Admins read all events" on events;
create policy "Admins read all events" on events
  for select using (is_admin());

-- Anyone can insert events (public submissions land as pending; scraper uses service role)
drop policy if exists "Anyone can insert events" on events;
create policy "Anyone can insert events" on events
  for insert with check (true);

-- Admins can update events (approve, edit)
drop policy if exists "Admins update events" on events;
create policy "Admins update events" on events
  for update using (is_admin());

-- Admins can delete events
drop policy if exists "Admins delete events" on events;
create policy "Admins delete events" on events
  for delete using (is_admin());

-- Event sources: anyone can read
drop policy if exists "Event sources are public" on event_sources;
create policy "Event sources are public" on event_sources
  for select using (true);

-- Event sources: admins manage (insert/update/delete)
drop policy if exists "Admins insert event sources" on event_sources;
create policy "Admins insert event sources" on event_sources
  for insert with check (is_admin());

drop policy if exists "Admins update event sources" on event_sources;
create policy "Admins update event sources" on event_sources
  for update using (is_admin());

drop policy if exists "Admins delete event sources" on event_sources;
create policy "Admins delete event sources" on event_sources
  for delete using (is_admin());

-- ── Seed event sources ────────────────────────────────────────
insert into event_sources (name, url, category_hint) values
  ('Chicago Reader',           'https://chicagoreader.com/events/',                   'music'),
  ('DIY Chicago',              'https://www.diychi.org/',                              'music'),
  ('TimeOut Chicago',          'https://www.timeout.com/chicago/things-to-do',        'nightlife'),
  ('Block Club Chicago',       'https://blockclubchicago.org/category/events/',       'art'),
  ('Resident Advisor Chicago', 'https://ra.co/events/us/chicago',                    'nightlife'),
  ('Chicago Gallery News',     'https://www.chicagogallerynews.com/',                 'art'),
  ('Eater Chicago',            'https://chicago.eater.com/',                          'food')
on conflict do nothing;
