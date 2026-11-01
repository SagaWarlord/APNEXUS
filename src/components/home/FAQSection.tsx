"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/constants";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 section-bg-forest overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="badge-gold inline-flex mb-4">❓ Questions</div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-[#FFF8E1] mb-4">
            FREQUENTLY ASKED{" "}
            <span className="gradient-text-gold">QUESTIONS</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="game-card overflow-hidden cursor-pointer"
                style={{ borderColor: isOpen ? "rgba(245,166,35,0.4)" : "rgba(245,166,35,0.1)" }}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between p-5 sm:p-6 gap-4">
                  <h3 className="font-semibold text-[#FFF8E1] text-base leading-snug pr-2">{q}</h3>
                  <ChevronDown
                    className="w-5 h-5 text-[#F5A623] flex-shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "" }}
                  />
                </div>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-0 border-t border-[rgba(45,90,48,0.4)]">
                    <p className="text-[#A5C8A8] text-sm leading-relaxed pt-4">{a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

