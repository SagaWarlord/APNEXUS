"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#0F1E10]/95 backdrop-blur-md border-b border-[rgba(245,166,35,0.2)] shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="JobReady Home">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-lg shadow-lg group-hover:shadow-[0_0_16px_rgba(245,166,35,0.5)] transition-shadow" />
                <Shield className="relative w-6 h-6 text-[#1A1A1A] fill-[#1A1A1A]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold text-[#FFD700] tracking-wide">JOBREADY</span>
                <span className="text-[0.55rem] text-[#A5C8A8] tracking-[0.2em] uppercase">A Tech Event</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-medium text-[#A5C8A8] hover:text-[#FFD700] rounded-md hover:bg-[rgba(245,166,35,0.08)] transition-all duration-150 cursor-pointer tracking-wide"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Auth buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#F5A623] border border-[rgba(245,166,35,0.4)] rounded-md hover:bg-[rgba(245,166,35,0.1)] transition-all duration-150 tracking-wide"
              >
                Login
              </Link>
              <Link href="/register" className="btn-gold text-sm px-5 py-2.5">
                Register Now →
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#F5A623] hover:bg-[rgba(245,166,35,0.1)] rounded-md transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="bg-[#0F1E10]/98 backdrop-blur-xl border-b border-[rgba(245,166,35,0.2)] pt-20 pb-6 px-4 shadow-2xl">
          <div className="flex flex-col gap-1 mb-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 text-base font-medium text-[#A5C8A8] hover:text-[#FFD700] hover:bg-[rgba(245,166,35,0.08)] rounded-lg transition-all cursor-pointer tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 px-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-outline-gold w-full justify-center text-sm py-3"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="btn-gold w-full justify-center text-sm py-3"
            >
              Register Your Team →
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

