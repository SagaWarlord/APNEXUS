import Link from "next/link";
import { Shield, Mail, MapPin, Calendar } from "lucide-react";
import { EVENT, NAV_LINKS } from "@/lib/constants";

// Inline SVG icons — lucide-react in this version doesn't ship Twitter/Instagram/Github/LinkedIn
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Stable constant — avoids Next.js 16 prerender date restriction
const CURRENT_YEAR = 2026;

export default function Footer() {

  return (
    <footer className="relative bg-[#080F09] border-t border-[rgba(245,166,35,0.15)]">
      {/* Gold top line */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-[#1A1A1A] fill-[#1A1A1A]" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-white">JOBREADY</div>
                <div className="text-[0.6rem] text-white tracking-[0.2em] uppercase">A Tech Event</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed mb-6 max-w-sm">
              BUILD YOUR BASE. CONQUER THE CODE. A three-round website development challenge
              where creativity meets engineering.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F5A623]" />
                <span>{EVENT.dateLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F5A623]" />
                <span>{EVENT.venue}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-bold text-white tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/register" className="text-white text-sm hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white text-sm hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold text-white tracking-wider uppercase mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-sm text-white">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-[#F5A623] flex-shrink-0" />
                <span className="italic text-white opacity-70">[Contact email — to be confirmed]</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#F5A623] flex-shrink-0" />
                <span className="text-xs text-white leading-relaxed">{EVENT.venueFull}</span>
              </div>
            </div>

            {/* Social placeholders */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: TwitterIcon, label: "Twitter" },
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: LinkedInIcon, label: "LinkedIn" },
                { Icon: GithubIcon, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  title={`${label} — coming soon`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(245,166,35,0.2)] text-white hover:text-white hover:border-[rgba(245,166,35,0.5)] transition-all hover:bg-[rgba(245,166,35,0.05)]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(45,90,48,0.3)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white">
          <p>© {CURRENT_YEAR} JOBREADY. All rights reserved. MMMUT, Gorakhpur.</p>
          <p className="italic">
            JobReady is an independent student tech event. Not affiliated with or endorsed by Supercell.
          </p>
        </div>
      </div>
    </footer>
  );
}
