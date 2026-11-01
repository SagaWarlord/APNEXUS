"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Medal, Award, Filter } from "lucide-react";

const FILTER_TABS = ["Overall", "Round 1", "Round 2", "Round 3"] as const;
type FilterTab = typeof FILTER_TABS[number];

// Development-mode sample data only
const SAMPLE_DATA = {
  "Overall": [
    { rank: 1, team: "Code Crusaders", id: "JR26-0001", r1: 87, r2: 83, r3: 90, total: 86.7, qualified: true },
    { rank: 2, team: "Binary Builders", id: "JR26-0002", r1: 82, r2: 88, r3: 85, total: 85.0, qualified: true },
    { rank: 3, team: "Stack Spartans", id: "JR26-0003", r1: 79, r2: 85, r3: 88, total: 83.7, qualified: true },
    { rank: 4, team: "Debug Dragons", id: "JR26-0004", r1: 75, r2: 78, r3: 82, total: 78.3, qualified: true },
    { rank: 5, team: "Pixel Pirates", id: "JR26-0005", r1: 70, r2: 72, r3: 75, total: 72.3, qualified: false },
  ],
  "Round 1": [
    { rank: 1, team: "Code Crusaders", id: "JR26-0001", score: 87, qualified: true },
    { rank: 2, team: "Binary Builders", id: "JR26-0002", score: 82, qualified: true },
    { rank: 3, team: "Stack Spartans", id: "JR26-0003", score: 79, qualified: true },
    { rank: 4, team: "Debug Dragons", id: "JR26-0004", score: 75, qualified: true },
    { rank: 5, team: "Pixel Pirates", id: "JR26-0005", score: 70, qualified: false },
  ],
  "Round 2": [
    { rank: 1, team: "Binary Builders", id: "JR26-0002", score: 88, qualified: true },
    { rank: 2, team: "Stack Spartans", id: "JR26-0003", score: 85, qualified: true },
    { rank: 3, team: "Code Crusaders", id: "JR26-0001", score: 83, qualified: true },
    { rank: 4, team: "Debug Dragons", id: "JR26-0004", score: 78, qualified: true },
    { rank: 5, team: "Pixel Pirates", id: "JR26-0005", score: 72, qualified: false },
  ],
  "Round 3": [
    { rank: 1, team: "Code Crusaders", id: "JR26-0001", score: 90, qualified: true },
    { rank: 2, team: "Stack Spartans", id: "JR26-0003", score: 88, qualified: true },
    { rank: 3, team: "Binary Builders", id: "JR26-0002", score: 85, qualified: true },
    { rank: 4, team: "Debug Dragons", id: "JR26-0004", score: 82, qualified: true },
    { rank: 5, team: "Pixel Pirates", id: "JR26-0005", score: 75, qualified: false },
  ],
};

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-[#FFD700]" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-[#C0C0C0]" />;
  if (rank === 3) return <Award className="w-5 h-5 text-[#CD7F32]" />;
  return <span className="text-sm text-[#6B8F6E] font-bold w-5 text-center">{rank}</span>;
};

export default function LeaderboardSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("Overall");
  const isPublished = false; // set to true when admin publishes results

  return (
    <section id="leaderboard" className="relative py-24 section-bg-forest overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge-gold inline-flex mb-4">🏆 Rankings</div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-[#FFF8E1] mb-4">
            <span className="gradient-text-gold">LEADERBOARD</span>
          </h2>
          <p className="text-[#A5C8A8] text-base">
            Live rankings across all three rounds.
          </p>
        </div>

        {/* Published / Not published state */}
        {!isPublished ? (
          <div className="game-card p-12 text-center">
            <div className="text-5xl mb-4">⚔️</div>
            <h3 className="font-display text-2xl font-bold text-[#FFD700] mb-3">
              THE BATTLE IS UNDERWAY.
            </h3>
            <p className="text-[#A5C8A8] text-base">
              RESULTS WILL BE REVEALED SOON.
            </p>
            <p className="text-[#6B8F6E] text-sm mt-2">
              Scores are published by the organiser after each round concludes.
            </p>

            {/* Dev preview note */}
            <div className="mt-8 p-4 rounded-lg bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.2)]">
              <p className="text-[#F5A623] text-xs font-bold tracking-wider uppercase mb-2">
                Development Preview (not real data)
              </p>

              {/* Filter tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                      activeTab === tab
                        ? "bg-[#F5A623] text-[#1A1A1A]"
                        : "text-[#F5A623] border border-[rgba(245,166,35,0.3)] hover:bg-[rgba(245,166,35,0.08)]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[#6B8F6E] text-xs tracking-wider uppercase border-b border-[rgba(45,90,48,0.3)]">
                      <th className="text-left pb-3 pl-2">Rank</th>
                      <th className="text-left pb-3">Team</th>
                      <th className="text-left pb-3">ID</th>
                      {activeTab === "Overall" ? (
                        <>
                          <th className="text-center pb-3">R1</th>
                          <th className="text-center pb-3">R2</th>
                          <th className="text-center pb-3">R3</th>
                          <th className="text-right pb-3 pr-2">Total</th>
                        </>
                      ) : (
                        <th className="text-right pb-3 pr-2">Score</th>
                      )}
                      <th className="text-center pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(45,90,48,0.2)]">
                    {(SAMPLE_DATA[activeTab] as any[]).map((entry) => (
                      <tr key={entry.id} className="leaderboard-row">
                        <td className="py-3 pl-2">
                          <div className="flex items-center gap-1">
                            <RankIcon rank={entry.rank} />
                          </div>
                        </td>
                        <td className="py-3 font-semibold text-[#FFF8E1]">{entry.team}</td>
                        <td className="py-3 text-[#6B8F6E] font-mono text-xs">{entry.id}</td>
                        {activeTab === "Overall" ? (
                          <>
                            <td className="py-3 text-center text-[#A5C8A8]">{entry.r1}</td>
                            <td className="py-3 text-center text-[#A5C8A8]">{entry.r2}</td>
                            <td className="py-3 text-center text-[#A5C8A8]">{entry.r3}</td>
                            <td className="py-3 text-right pr-2 font-bold text-[#FFD700]">{entry.total}</td>
                          </>
                        ) : (
                          <td className="py-3 text-right pr-2 font-bold text-[#FFD700]">{entry.score}</td>
                        )}
                        <td className="py-3 text-center">
                          <span className={`badge-${entry.qualified ? "emerald" : "gold"} text-xs`}>
                            {entry.qualified ? "Qualified" : "Eliminated"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          // Real published leaderboard goes here (populated from Supabase)
          <div className="text-center text-[#6B8F6E]">Loading published results...</div>
        )}
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

