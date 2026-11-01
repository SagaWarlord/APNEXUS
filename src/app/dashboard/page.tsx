import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { Shield, Lock, Trophy, ClipboardList, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="badge-gold inline-flex mb-4">🏰 Participant Portal</div>
            <h1 className="font-display text-4xl font-black text-[#FFD700] mb-2">YOUR BASE</h1>
            <p className="text-[#A5C8A8]">
              Sign in to access your participant dashboard, manage your team and submit your work.
            </p>
          </div>

          {/* Auth required notice */}
          <div className="game-card p-10 text-center mb-8">
            <Lock className="w-16 h-16 text-[#F5A623] mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-[#FFF8E1] mb-3">
              Authentication Required
            </h2>
            <p className="text-[#A5C8A8] mb-6 max-w-md mx-auto">
              You need to be logged in to access the participant dashboard.
              Register your team or sign in to continue.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login" className="btn-gold px-8 py-3">
                Sign In
              </Link>
              <Link href="/register" className="btn-outline-gold px-8 py-3">
                Register Your Team
              </Link>
            </div>
          </div>

          {/* Dashboard preview */}
          <h3 className="font-display text-lg text-[#A5C8A8] mb-4 text-center">
            What you'll access after login:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: LayoutDashboard, label: "Team Overview", desc: "Registration ID, status, members" },
              { icon: ClipboardList, label: "Submissions", desc: "Submit Round 1 & 2 work" },
              { icon: Trophy, label: "Leaderboard", desc: "Your team's live ranking" },
              { icon: Shield, label: "Progress Tracker", desc: "Frontend → Full-Stack → Final Arena" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="game-card p-5 text-center opacity-60">
                <Icon className="w-8 h-8 text-[#F5A623] mx-auto mb-3" />
                <p className="font-display font-bold text-[#FFF8E1] text-sm mb-1">{label}</p>
                <p className="text-[#6B8F6E] text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

