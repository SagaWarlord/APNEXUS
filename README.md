# JOBREADY — Build Your Base. Conquer the Code.

A premium, production-ready event website and competition management platform for **JOBREADY**, a three-round website development challenge hosted at MMMUT, Gorakhpur.

**Event Date:** 6 November 2026  
**Venue:** Multi Purpose Hall, Madan Mohan Malaviya University of Technology, Gorakhpur, UP, India

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| 3D | React Three Fiber / Three.js |
| Database | Supabase (PostgreSQL + Auth + Storage) |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd JobReady
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials in `.env.local`. **Never commit `.env.local`.**

### 3. Set Up Supabase Database

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. In the Supabase Dashboard → SQL Editor, run:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
3. Create a Storage bucket named `presentations` with appropriate RLS policies.

### 4. Set Up Admin Account

1. Register a user through the app or Supabase Dashboard.
2. In Supabase SQL Editor, grant admin role:
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
   ```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── login/              # Auth pages
│   ├── register/
│   ├── dashboard/          # Participant portal
│   ├── admin/              # Admin dashboard
│   └── judge/              # Judge dashboard
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Homepage sections
│   └── three/              # 3D scene components
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── constants.ts        # Event data, rounds, FAQ
│   └── utils.ts            # Shared utilities
├── types/                  # TypeScript types
└── middleware.ts            # Auth middleware
supabase/
└── migrations/             # Database schema SQL files
```

---

## Competition Structure

| Round | Name | Time | Submission |
|---|---|---|---|
| 1 | Frontend Clash | 9:00 AM – 12:00 PM IST | Live frontend URL |
| 2 | Full-Stack Forge | 12:00 PM – 6:00 PM IST | Website URL + GitHub URL + PPT/PDF |
| 3 | The Final Arena | 6:00 PM – 9:00 PM IST | Physical presentation at MMMUT |

---

## Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. Add all environment variables from `.env.example` in the Vercel dashboard.
3. Deploy — Vercel will auto-detect Next.js.

```bash
npm run build   # Verify build passes locally first
```

---

## Security Notes

- The Supabase service-role key is **never** exposed to the browser.
- All protected routes use server-side session validation via middleware.
- Row Level Security (RLS) is enabled on all tables.
- Team size limit (max 3) is enforced at the database trigger level.
- File uploads are validated server-side for type and size.

---

## Phase Status

- [x] Phase 0 — Project foundation, architecture, schema
- [x] Phase 1 — 3D Hero, Navbar, homepage structure  
- [x] Phase 2 — All public sections
- [ ] Phase 3 — Full auth + participant portal (Supabase integration)
- [ ] Phase 4 — Complete backend + real data persistence
- [ ] Phase 5 — Admin + Judge dashboards + Leaderboard engine
- [ ] Phase 6 — Security audit + deployment
