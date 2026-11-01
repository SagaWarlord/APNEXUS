"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { EVENT } from "@/lib/constants";

export default function RegistrationCTA() {
  return (
    <section id="register" className="relative py-24 section-bg-emerald overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgba(245,166,35,0.06)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Main heading */}
        <div className="mb-8">
          <div className="badge-gold inline-flex mb-6">⚔ Join the Battle</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF8E1] leading-tight mb-6">
            YOUR TEAM.{" "}
            <span className="gradient-text-gold">YOUR STRATEGY.</span>
            {" "}YOUR VICTORY.
          </h2>
          <p className="text-[#A5C8A8] text-lg max-w-2xl mx-auto leading-relaxed">
            Assemble your squad, sharpen your code and prepare for the ultimate web development challenge.
            The arena awaits.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: Users, label: "Max Team Size", value: "3 Members" },
            { icon: Calendar, label: "Event Date", value: EVENT.dateLabel },
            { icon: MapPin, label: "Venue", value: "MMMUT, Gorakhpur" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="game-card px-6 py-4 flex items-center gap-3 min-w-[180px]"
            >
              <Icon className="w-6 h-6 text-[#F5A623] flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-[#6B8F6E] tracking-wider uppercase">{label}</p>
                <p className="font-display font-bold text-[#FFF8E1] text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register" className="btn-gold text-lg px-10 py-5 gap-3">
            <span>⚔ Register Your Team</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/login" className="btn-outline-gold text-base px-8 py-4">
            Already have an account? Login
          </Link>
        </div>

        {/* Trust note */}
        <p className="text-[#6B8F6E] text-sm mt-8">
          Free to participate. Open to all students. Maximum 3 members per team.
        </p>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

