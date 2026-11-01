-- JOBREADY Database Schema — Migration 001
-- Run this in your Supabase SQL Editor or via Supabase CLI (supabase db push)

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'participant' CHECK (role IN ('participant', 'judge', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'participant')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- EVENT SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.event_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_open BOOLEAN NOT NULL DEFAULT TRUE,
  round1_open BOOLEAN NOT NULL DEFAULT FALSE,
  round2_open BOOLEAN NOT NULL DEFAULT FALSE,
  round3_active BOOLEAN NOT NULL DEFAULT FALSE,
  leaderboard_published BOOLEAN NOT NULL DEFAULT FALSE,
  max_team_size INT NOT NULL DEFAULT 3 CHECK (max_team_size BETWEEN 1 AND 3),
  round1_deadline TIMESTAMPTZ NOT NULL DEFAULT '2026-11-06T12:00:00+05:30',
  round2_deadline TIMESTAMPTZ NOT NULL DEFAULT '2026-11-06T18:00:00+05:30',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed one row
INSERT INTO public.event_settings DEFAULT VALUES
  ON CONFLICT DO NOTHING;

-- ============================================================
-- TEAMS
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS teams_sequence START 1;

CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id TEXT UNIQUE NOT NULL DEFAULT ('JR26-' || LPAD(NEXTVAL('teams_sequence')::TEXT, 4, '0')),
  name TEXT NOT NULL,
  description TEXT,
  leader_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'disqualified')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT teams_name_unique UNIQUE (name)
);

-- ============================================================
-- TEAM MEMBERS (max 3 enforced by constraint + application logic)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  college TEXT NOT NULL,
  branch TEXT NOT NULL,
  year TEXT NOT NULL,
  is_leader BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT team_members_unique_email UNIQUE (team_id, email)
);

-- Enforce max 3 members per team at database level
CREATE OR REPLACE FUNCTION check_team_size()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  member_count INT;
  max_size INT;
BEGIN
  SELECT COUNT(*) INTO member_count FROM public.team_members WHERE team_id = NEW.team_id;
  SELECT max_team_size INTO max_size FROM public.event_settings LIMIT 1;
  IF member_count >= max_size THEN
    RAISE EXCEPTION 'Team already has the maximum number of members (%).' , max_size;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_team_size ON public.team_members;
CREATE TRIGGER enforce_team_size
  BEFORE INSERT ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION check_team_size();

-- ============================================================
-- SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  round_id INT NOT NULL CHECK (round_id IN (1, 2, 3)),
  website_url TEXT,
  github_url TEXT,
  presentation_path TEXT,       -- Supabase Storage path
  presentation_filename TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT submissions_unique_team_round UNIQUE (team_id, round_id)
);

-- ============================================================
-- SUBMISSION VERSIONS (audit trail)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.submission_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  snapshot JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- JUDGING SCORES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.judging_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  round_id INT NOT NULL CHECK (round_id IN (1, 2, 3)),
  judge_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  criteria JSONB NOT NULL DEFAULT '{}',  -- {criterion: score}
  total_score NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (total_score >= 0 AND total_score <= 100),
  comment TEXT,
  is_final BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT judging_scores_unique UNIQUE (team_id, round_id, judge_id)
);

-- ============================================================
-- JUDGE ASSIGNMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.judge_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judge_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  round_id INT NOT NULL CHECK (round_id IN (1, 2, 3)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT judge_assignments_unique UNIQUE (judge_id, team_id, round_id)
);

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SPONSORS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  tier TEXT NOT NULL DEFAULT 'Technology Partner',
  is_placeholder BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed placeholder sponsors
INSERT INTO public.sponsors (name, tier, is_placeholder, sort_order)
VALUES
  ('[Sponsor Name]', 'Technology Partner', TRUE, 1),
  ('[Sponsor Name]', 'Community Partner', TRUE, 2),
  ('[Sponsor Name]', 'Innovation Partner', TRUE, 3)
ON CONFLICT DO NOTHING;

-- ============================================================
-- PRIZES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.prizes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rank TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '[Prize details to be announced by the organiser]',
  is_placeholder BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed placeholder prizes
INSERT INTO public.prizes (rank, title, is_placeholder, sort_order)
VALUES
  ('Champion', '1st Place Award', TRUE, 1),
  ('Runner-up', '2nd Place Award', TRUE, 2),
  ('Best Innovation', 'Special Innovation Award', TRUE, 3)
ON CONFLICT DO NOTHING;

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON public.team_members(email);
CREATE INDEX IF NOT EXISTS idx_submissions_team_round ON public.submissions(team_id, round_id);
CREATE INDEX IF NOT EXISTS idx_judging_scores_team_round ON public.judging_scores(team_id, round_id);
CREATE INDEX IF NOT EXISTS idx_judge_assignments_judge ON public.judge_assignments(judge_id);
CREATE INDEX IF NOT EXISTS idx_judge_assignments_team ON public.judge_assignments(team_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- teams
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams are publicly viewable" ON public.teams FOR SELECT USING (TRUE);
CREATE POLICY "Leader can update own team" ON public.teams FOR UPDATE USING (leader_id = auth.uid());
CREATE POLICY "Authenticated users can insert team" ON public.teams FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can do everything on teams" ON public.teams USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team members are viewable by team" ON public.team_members FOR SELECT USING (
  team_id IN (SELECT id FROM public.teams WHERE leader_id = auth.uid())
  OR user_id = auth.uid()
  OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'judge'))
);
CREATE POLICY "Leader can insert members" ON public.team_members FOR INSERT WITH CHECK (
  team_id IN (SELECT id FROM public.teams WHERE leader_id = auth.uid())
);
CREATE POLICY "Admins can manage members" ON public.team_members USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- submissions
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own team can view submissions" ON public.submissions FOR SELECT USING (
  team_id IN (SELECT id FROM public.teams WHERE leader_id = auth.uid())
  OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'judge'))
);
CREATE POLICY "Leader can insert/update submissions" ON public.submissions FOR INSERT WITH CHECK (
  team_id IN (SELECT id FROM public.teams WHERE leader_id = auth.uid())
);
CREATE POLICY "Leader can update own submissions" ON public.submissions FOR UPDATE USING (
  team_id IN (SELECT id FROM public.teams WHERE leader_id = auth.uid())
);
CREATE POLICY "Admins can manage submissions" ON public.submissions USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- judging_scores
ALTER TABLE public.judging_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Judges can manage own scores" ON public.judging_scores USING (judge_id = auth.uid());
CREATE POLICY "Admins can manage all scores" ON public.judging_scores USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);
CREATE POLICY "Teams can view published scores" ON public.judging_scores FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.event_settings WHERE leaderboard_published = TRUE)
  OR team_id IN (SELECT id FROM public.teams WHERE leader_id = auth.uid())
);

-- judge_assignments
ALTER TABLE public.judge_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Judges see own assignments" ON public.judge_assignments FOR SELECT USING (judge_id = auth.uid());
CREATE POLICY "Admins manage assignments" ON public.judge_assignments USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published announcements are public" ON public.announcements FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins manage announcements" ON public.announcements USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- event_settings
ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Event settings are public" ON public.event_settings FOR SELECT USING (TRUE);
CREATE POLICY "Admins can update settings" ON public.event_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- sponsors
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sponsors are public" ON public.sponsors FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage sponsors" ON public.sponsors USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- prizes
ALTER TABLE public.prizes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Prizes are public" ON public.prizes FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage prizes" ON public.prizes USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);

-- submission_versions
ALTER TABLE public.submission_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view all versions" ON public.submission_versions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
);
CREATE POLICY "Leaders view own versions" ON public.submission_versions FOR SELECT USING (
  submission_id IN (
    SELECT s.id FROM public.submissions s
    JOIN public.teams t ON t.id = s.team_id
    WHERE t.leader_id = auth.uid()
  )
);

