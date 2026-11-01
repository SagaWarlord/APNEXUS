"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is JOBREADY?",
    a: "JOBREADY is a three-round website development challenge where participants build a complete web product — from an interactive frontend to a fully deployed full-stack application — in a single day at MMMUT, Gorakhpur.",
  },
  {
    q: "Who can participate?",
    a: "Any student passionate about web development can participate. Individuals and teams of up to three members are welcome.",
  },
  {
    q: "What is the maximum team size?",
    a: "A maximum of three members per team, including the team leader. You may also participate as an individual.",
  },
  {
    q: "What are the three competition rounds?",
    a: "Round 1 (9 AM–12 PM): Build a responsive frontend. Round 2 (12 PM–6 PM): Extend it with backend, database and APIs. Round 3 (6 PM–9 PM): Physically present your project to the judges at MMMUT.",
  },
  {
    q: "What must participants submit?",
    a: "Round 1: Live frontend URL. Round 2: Deployed website URL + GitHub repository URL + PPT/PDF presentation. Round 3: Live demonstration and Q&A at the venue.",
  },
  {
    q: "Where will the final presentations take place?",
    a: "Round 3 is held physically at the Multi Purpose Hall, Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur, Uttar Pradesh.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 section-dark overflow-hidden">
      <div className="gold-divider absolute top-0 left-0 right-0" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="wood-banner text-base sm:text-lg">FAQ</div>
          <p className="text-sm sm:text-base mt-6" style={{ color: "#9B7A40" }}>
            Everything you need to know about JOBREADY.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="faq-item cursor-pointer"
                style={{ borderColor: isOpen ? "rgba(255,215,0,0.5)" : "rgba(200,160,40,0.25)" }}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {/* Question */}
                <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-5">
                  <h3
                    className="font-cinzel font-semibold text-sm sm:text-base leading-snug"
                    style={{ color: isOpen ? "#FFD700" : "#F5E6C8" }}
                  >
                    {q}
                  </h3>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-250"
                    style={{
                      color: "#C87A00",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </div>

                {/* Answer */}
                {isOpen && (
                  <div
                    className="px-5 sm:px-6 pb-5 border-t"
                    style={{ borderColor: "rgba(200,160,40,0.15)" }}
                  >
                    <p className="text-sm sm:text-base leading-relaxed pt-4" style={{ color: "#C4A878" }}>
                      {a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
