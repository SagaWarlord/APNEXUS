// Shared TypeScript types across the entire platform

export type UserRole = "participant" | "judge" | "admin";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface Team {
  id: string;
  registration_id: string; // JR26-XXXX
  name: string;
  description?: string;
  leader_id: string;
  status: "pending" | "confirmed" | "disqualified";
  created_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id?: string;
  full_name: string;
  email: string;
  mobile: string;
  college: string;
  branch: string;
  year: string;
  is_leader: boolean;
  created_at: string;
}

export interface Round {
  id: number;
  name: string;
  slug: string;
  is_open: boolean;
  deadline: string;
  created_at: string;
}

export interface Submission {
  id: string;
  team_id: string;
  round_id: number;
  website_url?: string;
  github_url?: string;
  presentation_url?: string;
  presentation_filename?: string;
  submitted_at: string;
  updated_at: string;
  status: "draft" | "submitted";
}

export interface SubmissionVersion {
  id: string;
  submission_id: string;
  snapshot: Record<string, unknown>;
  created_at: string;
}

export interface JudgingScore {
  id: string;
  team_id: string;
  round_id: number;
  judge_id: string;
  criteria: Record<string, number>;
  total_score: number;
  comment?: string;
  is_final: boolean;
  created_at: string;
  updated_at: string;
}

export interface JudgeAssignment {
  id: string;
  judge_id: string;
  team_id: string;
  round_id: number;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  is_published: boolean;
  created_at: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  tier: string; // "Technology Partner" | "Community Partner" | "Innovation Partner"
  is_placeholder: boolean;
}

export interface Prize {
  id: string;
  rank: string; // "Champion" | "Runner-up" | "Best Innovation"
  title: string;
  description: string;
  is_placeholder: boolean;
  sort_order: number;
}

export interface EventSettings {
  id: string;
  registration_open: boolean;
  round1_open: boolean;
  round2_open: boolean;
  round3_active: boolean;
  leaderboard_published: boolean;
  max_team_size: number;
  round1_deadline: string;
  round2_deadline: string;
  updated_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  team_id: string;
  team_name: string;
  registration_id: string;
  round1_score?: number;
  round2_score?: number;
  round3_score?: number;
  total_score: number;
  is_qualified: boolean;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

