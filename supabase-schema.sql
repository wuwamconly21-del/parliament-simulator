-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PLAYER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.player_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  character_name TEXT NOT NULL,
  party_name TEXT NOT NULL,
  ideology TEXT DEFAULT 'Social Democracy',
  bio TEXT,
  portrait_url TEXT,
  base_state TEXT DEFAULT 'Selangor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.player_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.player_profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.player_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.player_profiles FOR UPDATE USING (auth.uid() = user_id);

-- 2. GAME STATE TABLE
CREATE TABLE IF NOT EXISTS public.game_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  political_power NUMERIC DEFAULT 50.0,
  liquid_capital NUMERIC DEFAULT 500000,
  party_power NUMERIC DEFAULT 220,
  reputation NUMERIC DEFAULT 68.5,
  btc NUMERIC DEFAULT 0,
  econ_position INT DEFAULT 4,
  social_position INT DEFAULT 5,
  candidates JSONB,
  states JSONB,
  lobbies JSONB,
  bills JSONB,
  roster JSONB,
  last_midnight_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.game_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own game state" 
  ON public.game_state FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game state" 
  ON public.game_state FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own game state" 
  ON public.game_state FOR UPDATE USING (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE ON public.player_profiles TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.game_state TO anon, authenticated;