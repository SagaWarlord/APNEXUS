"use client";

import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="game-card p-8 sm:p-10">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <Shield className="w-9 h-9 text-[#1A1A1A] fill-[#1A1A1A]" />
              </div>
              <h1 className="font-display text-3xl font-black text-[#FFD700] mb-1">JOBREADY</h1>
              <p className="text-[#A5C8A8] text-sm">Sign in to your account</p>
            </div>

            {/* Supabase auth integration notice */}
            <div className="mb-6 p-4 rounded-lg bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.2)] text-center">
              <p className="text-[#F5A623] text-xs font-semibold tracking-wide mb-1">
                Authentication Setup Required
              </p>
              <p className="text-[#6B8F6E] text-xs">
                Connect your Supabase project by adding environment variables to enable login.
              </p>
            </div>

            {/* Form placeholder */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="game-input"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="game-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <div className="flex items-center justify-end">
                <Link href="/reset-password" className="text-xs text-[#F5A623] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn-gold w-full justify-center py-3.5">
                Sign In to Your Base
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#6B8F6E] text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#F5A623] hover:underline font-semibold">
                  Register your team
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#6B8F6E] hover:text-[#A5C8A8] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to event site
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

