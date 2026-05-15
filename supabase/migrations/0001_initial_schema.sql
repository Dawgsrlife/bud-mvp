-- 0001_initial_schema.sql
-- BUD initial database schema. Wikipedia-style self-healing crowdsourced product database.
-- Run via: supabase db push, or pasted into the Supabase SQL editor.
-- All tables RLS-enabled. Service role bypasses for Edge Function writes.

-- ============================================================
-- products: the canonical product record. Self-heals via scans.
-- ============================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),

  -- Identity
  normalized_name text not null,        -- lowercase, trimmed, hyphenated. eg "wonder-bread-classic-white-675g"
  display_name text not null,            -- "Wonder Bread Classic White 675g"
  brand text,                            -- "Wonder"
  category text,                         -- "bread", "cereal", "snack"

  -- Locale + retail context
  source_country text not null default 'CA',
  retailer_hint text,                    -- if scanned at known retailer (loblaws, walmart). null otherwise

  -- OCR + verdict aggregate
  ocr_text_consensus text,               -- the merged OCR text from N high-confidence scans
  ocr_confidence_avg real,               -- rolling average confidence
  scan_count int not null default 0,
  verified_at timestamptz,               -- nullable. set when scan_count >= consensus threshold

  -- Allergen flags (the canonical answer)
  contains_allergens text[] default '{}',         -- ['peanut', 'soy']
  may_contain_allergens text[] default '{}',      -- ['tree-nuts']

  -- Status
  status text not null default 'pending'
    check (status in ('pending', 'verified', 'quarantined', 'rejected')),

  -- Truth signals (Phase 2)
  truth_score real default 0.5,          -- 0..1 trust score

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_normalized_name on public.products (normalized_name);
create index if not exists idx_products_status on public.products (status) where status != 'rejected';
create index if not exists idx_products_country on public.products (source_country);

-- ============================================================
-- product_scans: every scan attempt. The raw history.
-- ============================================================
create table if not exists public.product_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,

  -- What was scanned
  ocr_raw_text text not null,
  ocr_confidence real not null check (ocr_confidence >= 0 and ocr_confidence <= 1),
  image_hash text,                       -- perceptual hash of capture, for dedupe + abuse detection
  capture_locale text default 'en-CA',

  -- What we told the user
  verdict_kind text not null
    check (verdict_kind in ('compatible', 'avoid', 'caution', 'unknown')),
  verdict_reason text not null,
  triggered_allergens text[] default '{}',
  may_contain_allergens text[] default '{}',
  verdict_confidence real not null,

  -- Profile snapshot at scan time (for analytics)
  profile_allergens text[] default '{}',

  -- Counted toward consensus?
  contributed_to_consensus boolean default false,

  -- Model used (for cost analysis + A/B routing in Phase 2)
  llm_model text default 'claude-haiku-4-5',

  scanned_at timestamptz not null default now()
);

create index if not exists idx_scans_user on public.product_scans (user_id, scanned_at desc);
create index if not exists idx_scans_product on public.product_scans (product_id) where product_id is not null;
create index if not exists idx_scans_recent on public.product_scans (scanned_at desc);

-- ============================================================
-- product_reports: Wikipedia-style flags for bad data.
-- ============================================================
create table if not exists public.product_reports (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,

  report_kind text not null
    check (report_kind in ('wrong-ingredients', 'wrong-allergens', 'wrong-product', 'spam', 'other')),
  notes text,

  resolved boolean default false,
  resolved_at timestamptz,
  resolved_action text,                  -- 'quarantined' | 'corrected' | 'dismissed'

  created_at timestamptz not null default now()
);

create index if not exists idx_reports_unresolved on public.product_reports (product_id) where not resolved;
create unique index if not exists idx_reports_one_per_user_product on public.product_reports (product_id, user_id, report_kind);

-- ============================================================
-- product_aliases: ["Trader Joe's Cereal", "TJ's Cereal", "Trader Joes Cereal"] -> same product.
-- ============================================================
create table if not exists public.product_aliases (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  alias text not null,
  source text default 'auto',            -- 'auto' (LLM merged) | 'user' | 'admin'
  created_at timestamptz not null default now()
);

create index if not exists idx_aliases_alias on public.product_aliases (alias);

-- ============================================================
-- truth_signals: Phase 2. Aggregated consumer feedback from web sources.
-- ============================================================
create table if not exists public.truth_signals (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  source_kind text not null
    check (source_kind in ('youtube', 'reddit', 'instagram', 'tiktok', 'forum', 'news', 'other')),
  source_url text,
  signal_text text not null,
  sentiment text check (sentiment in ('positive', 'negative', 'neutral', 'mixed')),
  confidence real,
  created_at timestamptz not null default now()
);

create index if not exists idx_signals_product on public.truth_signals (product_id, created_at desc);

-- ============================================================
-- user_reputation: trust score per user. Mal's anti-poisoning rule.
-- ============================================================
create table if not exists public.user_reputation (
  user_id uuid primary key references auth.users(id) on delete cascade,
  trust_score real not null default 0.5,  -- 0..1, starts neutral
  scans_count int not null default 0,
  scans_high_confidence int not null default 0,
  reports_filed int not null default 0,
  reports_validated int not null default 0,
  reports_invalidated int not null default 0,    -- frivolous reports = trust down
  last_active_at timestamptz default now()
);

-- ============================================================
-- RLS policies.
-- Mobile client uses anon key + auth.uid(). Service role bypasses.
-- ============================================================
alter table public.products enable row level security;
alter table public.product_scans enable row level security;
alter table public.product_reports enable row level security;
alter table public.product_aliases enable row level security;
alter table public.truth_signals enable row level security;
alter table public.user_reputation enable row level security;

-- Products: anyone can read 'verified' or 'pending'. Only service role writes (via Edge Function).
create policy "Products readable by all authed users"
  on public.products for select
  using (status in ('verified', 'pending'));

-- Scans: users see only their own scans.
create policy "Scans readable by owner"
  on public.product_scans for select
  using (auth.uid() = user_id);

create policy "Scans insertable by owner"
  on public.product_scans for insert
  with check (auth.uid() = user_id);

-- Reports: users can file + see their own. Anyone can read aggregate count via a view (TBD).
create policy "Reports readable by reporter"
  on public.product_reports for select
  using (auth.uid() = user_id);

create policy "Reports insertable by user"
  on public.product_reports for insert
  with check (auth.uid() = user_id);

-- Aliases + truth_signals: read-only for clients. Service role writes.
create policy "Aliases readable by authed"
  on public.product_aliases for select
  using (true);

create policy "Truth signals readable by authed"
  on public.truth_signals for select
  using (true);

-- User reputation: each user sees their own.
create policy "Reputation readable by self"
  on public.user_reputation for select
  using (auth.uid() = user_id);

-- ============================================================
-- updated_at trigger for products
-- ============================================================
create or replace function public.tg_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.tg_set_updated_at();
