-- ── Savored: add the fourth article category ──────────────────
--
-- schema.sql uses `create table if not exists`, so editing the inline
-- check constraint there does nothing to an existing database. Run this
-- against the live Supabase project once.
--
-- The constraint is declared inline in schema.sql and therefore carries
-- Postgres's auto-generated name, `articles_category_check`.
--
--   review    → Heard
--   news      → Around
--   spotlight → Seen
--   food      → Savored   (new — matches the `food` key already used by the
--                          events table, the calendar, and the savored→food
--                          normalisation in app/api/admin/events/route.js)

alter table articles drop constraint if exists articles_category_check;

alter table articles add constraint articles_category_check
  check (category in ('review', 'news', 'spotlight', 'food'));
