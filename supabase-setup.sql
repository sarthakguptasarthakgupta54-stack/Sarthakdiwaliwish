-- Run this entire script in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.diwali_visitors (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  created_at timestamptz not null default now()
);

create index if not exists diwali_visitors_created_at_idx
  on public.diwali_visitors (created_at desc);

alter table public.diwali_visitors enable row level security;

-- No public table policies are created intentionally.
-- The Vercel API uses the Supabase service-role key server-side.
-- Never expose the service-role key in index.html or any NEXT_PUBLIC variable.

-- Create a Storage bucket named "diwali-gallery" in Supabase Storage.
-- Set the bucket to PUBLIC so uploaded gallery photos can be viewed by visitors.
-- Upload/delete operations are performed only by the protected Vercel API.
