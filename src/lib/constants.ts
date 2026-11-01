// Central constants — event info, palette, round config
export const EVENT = {
  name: "JOBREADY",
  tagline: "BUILD YOUR BASE. CONQUER THE CODE.",
  date: new Date("2026-11-06T09:00:00+05:30"),
  dateLabel: "6 November 2026",
  venue: "Multi Purpose Hall, MMMUT, Gorakhpur",
  venueFull: "Multi Purpose Hall, Madan Mohan Malaviya University of Technology, Gorakhpur, Uttar Pradesh, India",
  timezone: "Asia/Kolkata",
  maxTeamSize: 3,
  registrationIdPrefix: "JR26",
} as const;

export const ROUNDS = [
  {
    id: 1,
    slug: "frontend-clash",
    name: "FRONTEND CLASH",
    label: "ROUND 01",
    startTime: "9:00 AM",
    endTime: "12:00 PM",
    startIso: "2026-11-06T09:00:00+05:30",
    endIso: "2026-11-06T12:00:00+05:30",
    tagline: "Build your foundation.",
    description:
      "Build the foundation of your website. Transform your ideas into a visually impressive, responsive and interactive frontend.",
    submission: "Live frontend website URL",
    criteria: ["UI/UX", "Creativity", "Visual Design", "Responsiveness", "Frontend Functionality"],
    color: "emerald",
  },
  {
    id: 2,
    slug: "fullstack-forge",
    name: "FULL-STACK FORGE",
    label: "ROUND 02",
    startTime: "12:00 PM",
    endTime: "6:00 PM",
    startIso: "2026-11-06T12:00:00+05:30",
    endIso: "2026-11-06T18:00:00+05:30",
    tagline: "Power your creation.",
    description:
      "Bring your website to life. Connect your frontend with backend services, APIs and databases. Implement the essential functionalities and prepare a complete deployable product.",
    submission: "Final website URL + GitHub URL + PPT/PDF presentation",
    criteria: [
      "Backend Functionality",
      "Database Integration",
      "Code Quality",
      "Reliability & Security",
      "Product Completeness",
    ],
    color: "blue",
  },
  {
    id: 3,
    slug: "final-arena",
    name: "THE FINAL ARENA",
    label: "ROUND 03",
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    startIso: "2026-11-06T18:00:00+05:30",
    endIso: "2026-11-06T21:00:00+05:30",
    tagline: "Defend your creation.",
    description:
      "The final battle is fought through demonstration and presentation. Qualified participants physically showcase their projects before the judges, demonstrate working features, explain their architecture and answer technical questions.",
    submission: "Physical presentation at MMMUT",
    criteria: [
      "Live Demonstration",
      "Technical Understanding",
      "Problem-Solving",
      "Innovation",
      "Presentation Quality",
    ],
    color: "gold",
  },
] as const;

export const TRACKS = [
  {
    id: "frontend-craft",
    name: "FRONTEND CRAFT",
    description: "Interface design, responsiveness and user experience.",
    icon: "🎨",
  },
  {
    id: "fullstack-engineering",
    name: "FULL-STACK ENGINEERING",
    description: "Backend logic, databases, APIs and integration.",
    icon: "⚙️",
  },
  {
    id: "product-innovation",
    name: "PRODUCT INNOVATION",
    description: "Originality, practical usefulness and product thinking.",
    icon: "💡",
  },
] as const;

export const SCHEDULE = [
  { time: "9:00 AM – 12:00 PM", label: "Round 1 — Frontend Clash", sub: "Build your frontend", round: 1 },
  { time: "12:00 PM – 6:00 PM", label: "Round 2 — Full-Stack Forge", sub: "Backend, APIs, DB + Final Submission", round: 2 },
  {
    time: "6:00 PM – 9:00 PM",
    label: "Round 3 — The Final Arena",
    sub: "Live demo · Technical Q&A · Judges' evaluation",
    round: 3,
  },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Rounds", href: "#rounds" },
  { label: "Schedule", href: "#schedule" },
  { label: "Prizes", href: "#prizes" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FAQ = [
  {
    q: "What is JobReady?",
    a: "JobReady is a three-round website development challenge designed to take participants through the complete journey of building a real-world web product — from frontend to full-stack to live presentation.",
  },
  {
    q: "What are the three rounds?",
    a: "Round 1 (Frontend Clash, 9 AM–12 PM): Build a responsive frontend. Round 2 (Full-Stack Forge, 12 PM–6 PM): Add backend, APIs and a database. Round 3 (Final Arena, 6 PM–9 PM): Present your working project to the judges at MMMUT.",
  },
  {
    q: "What is the maximum team size?",
    a: "A maximum of three members per team, including the team leader. You may also participate individually.",
  },
  {
    q: "What must be submitted in Round 1?",
    a: "A live, publicly accessible frontend website URL. The site must be responsive and functional.",
  },
  {
    q: "What must be submitted in Round 2?",
    a: "Three mandatory submissions: (1) Final deployed website URL, (2) GitHub repository URL, (3) Project presentation as PPT or PDF.",
  },
  {
    q: "Where will Round 3 take place?",
    a: "Round 3 is a physical event at the Multi Purpose Hall, Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur, Uttar Pradesh.",
  },
  {
    q: "How will the winners be decided?",
    a: "Each round is evaluated by judges using a configurable scoring rubric. The overall champion is determined by a weighted combination of scores across all three rounds.",
  },
] as const;

