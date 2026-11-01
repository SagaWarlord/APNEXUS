"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Code2, Gift, Users, HelpCircle, Menu, X, Crown } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";

const NAV_ITEMS = [
  { label: "Home",     href: "#home",     icon: Home },
  { label: "About",   href: "#about",    icon: Trophy },
  { label: "Rules",   href: "#rounds",   icon: Code2 },
  { label: "Prizes",  href: "#prizes",   icon: Gift },
  { label: "Register",href: "/register", icon: Users },
  { label: "FAQ",     href: "#faq",      icon: HelpCircle },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]       = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      return;
    }
    const id = href.replace("#", "");
    setActive(id);
    if (pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "var(--theme-nav-bg)"
            : "rgba(10, 6, 2, 0.75)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
          borderBottom: `1px solid var(--theme-nav-border)`,
          boxShadow: scrolled ? "0 4px 24px rgba(0, 0, 0, 0.6)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer shrink-0">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, var(--gold-bright), var(--gold-medium), var(--gold-dark))",
                    boxShadow: "0 0 0 2px var(--brown-dark), 0 6px 18px rgba(0,0,0,0.6), 0 0 24px rgba(255,180,0,0.35)",
                  }}
                />
                <Crown className="relative w-7 h-7 text-[#2D0E00]" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }} />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-lilita text-xl sm:text-2xl font-normal leading-none"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "-2px -2px 0 var(--brown-dark), 2px -2px 0 var(--brown-dark), -2px 2px 0 var(--brown-dark), 2px 2px 0 var(--brown-dark), 0 2px 0 var(--brown-dark), 0 -2px 0 var(--brown-dark), 0 4px 10px rgba(0,0,0,0.7)",
                    letterSpacing: "0.06em",
                  }}
                >
                  JOBREADY
                </span>
                <span
                  className="text-[0.55rem] tracking-[0.3em] uppercase font-cinzel font-semibold"
                  style={{ color: "#FFFFFF", textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                >
                  A Tech Event
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                const isRoute = href.startsWith("/");
                const isActive = isRoute ? pathname === href : active === href.replace("#", "") && pathname === "/";
                
                if (isRoute) {
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-left cursor-pointer transition-all group relative overflow-hidden"
                      style={{
                        color: "#FFFFFF",
                        border: isActive ? `1px solid var(--border-gold)` : "transparent",
                        background: isActive ? "rgba(255, 215, 0, 0.08)" : "transparent",
                      }}
                    >
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" style={{ color: isActive ? "var(--gold-primary)" : "var(--text-dim)" }} />
                      <span className="text-sm font-medium tracking-wide font-cinzel transition-colors group-hover:text-white">
                        {label}
                      </span>
                      {/* Golden glow underline */}
                      <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-transform duration-300 origin-center ${isActive ? "scale-x-100 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent shadow-[0_0_8px_#FFD700]" : "scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"}`} />
                    </Link>
                  );
                }

                return (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-left cursor-pointer transition-all group relative overflow-hidden"
                    style={{
                      color: "#FFFFFF",
                      border: isActive ? `1px solid var(--border-gold)` : "transparent",
                      background: isActive ? "rgba(255, 215, 0, 0.08)" : "transparent",
                    }}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" style={{ color: isActive ? "var(--gold-primary)" : "var(--text-dim)" }} />
                    <span className="text-sm font-medium tracking-wide font-cinzel transition-colors group-hover:text-white">
                      {label}
                    </span>
                    {/* Golden glow underline */}
                    <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-transform duration-300 origin-center ${isActive ? "scale-x-100 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent shadow-[0_0_8px_#FFD700]" : "scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"}`} />
                  </button>
                );
              })}
            </div>

            {/* ── Register Now CTA -> /register ── */}
            <div className="hidden lg:block">
              <MagneticButton strength={0.3} glowRadius={110}>
                <Link href="/register" className="btn-game text-sm px-7 py-3 inline-block">
                  Register Now &nbsp;›
                </Link>
              </MagneticButton>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl transition-colors shrink-0"
              style={{
                color: "var(--gold-primary)",
                background: mobileOpen ? "rgba(200, 130, 0, 0.15)" : "transparent",
                border: `1px solid ${mobileOpen ? "var(--border-gold)" : "transparent"}`,
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className="fixed inset-x-0 top-0 z-40 transition-all duration-300 lg:hidden"
        style={{
          transform: mobileOpen ? "translateY(0)" : "translateY(-100%)",
          background: "linear-gradient(180deg, rgba(18, 12, 6, 0.97) 0%, rgba(26, 18, 8, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "2px solid var(--border-gold)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="pt-[72px] pb-8 px-6">
          <div className="flex flex-col gap-1.5 mb-6">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const isRoute = href.startsWith("/");
              const isActive = isRoute ? pathname === href : active === href.replace("#", "") && pathname === "/";
              
              if (isRoute) {
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3.5 w-full px-5 py-3.5 rounded-xl text-left cursor-pointer transition-all group"
                    style={{
                      color: "#FFFFFF",
                      background: isActive ? "rgba(255, 215, 0, 0.1)" : "transparent",
                      border: isActive ? `1px solid var(--border-gold)` : "transparent",
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: isActive ? "var(--gold-primary)" : "var(--text-dim)" }} />
                    <span className="font-cinzel font-semibold tracking-wide">{label}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className="flex items-center gap-3.5 w-full px-5 py-3.5 rounded-xl text-left cursor-pointer transition-all group"
                  style={{
                    color: "#FFFFFF",
                    background: isActive ? "rgba(255, 215, 0, 0.1)" : "transparent",
                    border: isActive ? `1px solid var(--border-gold)` : "transparent",
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: isActive ? "var(--gold-primary)" : "var(--text-dim)" }} />
                  <span className="font-cinzel font-semibold tracking-wide">{label}</span>
                </button>
              );
            })}
          </div>
          <Link
            href="/register"
            onClick={() => setMobileOpen(false)}
            className="btn-game w-full py-3.5 text-sm inline-block text-center"
          >
            Register Now &nbsp;›
          </Link>
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "rgba(0, 0, 0, 0.65)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
