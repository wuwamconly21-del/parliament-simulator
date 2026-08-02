-- DB schema suggestions for Supabase
-- Run in SQL editor on your Supabase project

-- players table (store basic profile)
CREATE TABLE IF NOT EXISTS public.players (
  id text PRIMARY KEY,
  email text,
  name text,
  created_at timestamptz DEFAULT now()
);

-- games table (store game state as JSON)
CREATE TABLE IF NOT EXISTS public.games (
  id text PRIMARY KEY,
  state jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Grant basic RLS-free access for development (ONLY for dev). For production, setup RLS policies.
-- Uncomment and adapt if you want anon role to read/write during development
-- GRANT SELECT, INSERT, UPDATE ON public.games TO anon;
-- GRANT INSERT, UPDATE ON public.players TO anon;
