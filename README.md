# FABRI — Personal Portfolio & Private OS

> Cinematic portfolio + private life-dashboard for Anthony Fabri.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tonyasnaran/fabri)

---

## Overview

FABRI.com is two things in one codebase:

| Layer | Description |
|---|---|
| **Public site** | Cinematic portfolio with scroll-driven case studies, project cards, and contact form |
| **Private dashboard** | Founder OS — finance, credit cards, social media, and Travel AI |

The public site is open to everyone. The dashboard is auth-gated via Supabase and only accessible after login.

---

## Tech Stack

| Category | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Auth + DB | Supabase (@supabase/ssr) |
| State | Zustand |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/tonyasnaran/fabri.git
cd fabri

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
# Fill in your values — see Environment Variables section below

# 4. Run
npm run dev
```

App runs at **http://localhost:3000**

> **No Supabase yet?** Add `BYPASS_AUTH=true` to `.env.local` and navigate directly to `/dashboard`. All pages work with mock data out of the box.

---

## Environment Variables

Copy `.env.example` → `.env.local` and populate:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-only, never exposed) |
| `BYPASS_AUTH` | Dev only | Set `true` to skip auth guard locally |
| `ANTHROPIC_API_KEY` | Travel AI | Anthropic Claude API key |
| `AMADEUS_CLIENT_ID` | Travel AI | Amadeus flight data client ID |
| `AMADEUS_CLIENT_SECRET` | Travel AI | Amadeus flight data secret |
| `GOOGLE_CLIENT_ID` | Calendar | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Calendar | Google OAuth secret |

**Never commit `.env.local` or any file containing real keys.**

---

## Supabase Setup

```bash
# 1. Create a project at https://supabase.com
# 2. Copy URL + keys into .env.local
# 3. Run the schema in the Supabase SQL editor:
supabase/schema.sql
```

The schema creates 7 tables with Row Level Security:

- `profiles` — linked to auth.users, auto-created on signup
- `contact_submissions` — public contact form entries
- `finance_entries` — income and expense records
- `credit_cards` — card details and limits
- `point_balances` — rewards program balances
- `social_accounts` — platform follower snapshots
- `travel_searches` — AI chat history

---

## Project Structure

```
fabri/
├── app/
│   ├── (public)/           # Marketing site — no auth required
│   │   ├── page.tsx        # Homepage: hero + DEROS case study
│   │   ├── projects/       # Project cards (DEROS, IPO, FLUX)
│   │   ├── about/          # Bio + Builder/Connector/Operator/Creative
│   │   └── contact/        # Contact form → /api/contact
│   ├── (auth)/             # Auth pages
│   │   ├── login/          # Supabase email/password login
│   │   └── signup/         # Account creation
│   ├── (dashboard)/        # Protected — requires Supabase session
│   │   └── dashboard/
│   │       ├── page.tsx    # Overview — key stats
│   │       ├── finance/    # Income, expenses, Recharts
│   │       ├── credit/     # Cards, points, utilization gauge
│   │       ├── social/     # IG/TikTok/YouTube stats
│   │       ├── travel/     # Travel AI chatbot + flight deals
│   │       └── settings/   # Profile + integrations
│   ├── api/
│   │   ├── contact/        # POST — Zod validation → Supabase
│   │   ├── finance/        # GET — mock data (swap for Plaid)
│   │   ├── social/         # GET — mock data (swap for platform APIs)
│   │   └── travel/chat/    # POST — mock AI (swap for Anthropic SDK)
│   ├── globals.css
│   └── layout.tsx
│
├── components/             # Shared UI components
│   ├── SiteNav.tsx         # Sticky public nav
│   ├── Hero.tsx            # Parallax hero + floating thought bubbles
│   ├── ThoughtBubble.tsx   # Interactive hover/click bubbles
│   ├── CaseStudySection.tsx
│   ├── ProjectCard.tsx
│   ├── AnimatedSection.tsx # Scroll-triggered reveal wrapper
│   ├── DashboardShell.tsx  # Sidebar + layout for dashboard
│   ├── DashboardCard.tsx
│   ├── StatCard.tsx
│   ├── ContactForm.tsx     # React Hook Form + Zod
│   └── ChatInterface.tsx   # Travel AI chat UI
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser client (createBrowserClient)
│   │   └── server.ts       # Server client (createServerClient + cookies)
│   └── utils.ts            # cn(), formatCurrency(), formatNumber()
│
├── store/
│   └── dashboardStore.ts   # Zustand — sidebar open/active section
│
├── supabase/
│   └── schema.sql          # Full DB schema + RLS policies
│
├── middleware.ts            # Route protection — redirects /dashboard to /login
├── .env.example             # Variable template (safe to commit)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Pages

| Route | Auth | Description |
|---|---|---|
| `/` | Public | Homepage — parallax hero, DEROS case study, project teaser |
| `/projects` | Public | Project cards: DEROS, IPO, FLUX CULTURE |
| `/about` | Public | Bio — Builder, Connector, Operator, Creative pillars |
| `/contact` | Public | Contact form + Cal.com scheduling CTA |
| `/login` | Public | Supabase login page |
| `/signup` | Public | Account creation |
| `/dashboard` | **Auth** | Overview — income, expenses, credit, social, travel |
| `/dashboard/finance` | **Auth** | Charts: income vs expenses, categories, trends |
| `/dashboard/credit` | **Auth** | Cards, points, utilization gauge, redemption ideas |
| `/dashboard/social` | **Auth** | Follower growth, engagement, content recs |
| `/dashboard/travel` | **Auth** | Travel AI chat, date scanner, flight deals |
| `/dashboard/settings` | **Auth** | Profile, integrations, danger zone |

---

## Deployment

### Vercel (recommended)

```bash
# Push to GitHub first, then:
# 1. Go to vercel.com/new
# 2. Import tonyasnaran/fabri
# 3. Add all environment variables from .env.example
# 4. Deploy
```

Vercel auto-detects Next.js. The `middleware.ts` runs at the edge and protects all dashboard routes.

### Manual build

```bash
npm run build   # type-check + compile
npm run start   # production server
```

---

## Connecting Real APIs

All API routes are structured to accept real integrations:

| Feature | File | Integration |
|---|---|---|
| Travel AI | `app/api/travel/chat/route.ts` | `@anthropic-ai/sdk` |
| Flight data | same route | Amadeus SDK |
| Calendar | same route | Google Calendar API |
| Finance | `app/api/finance/route.ts` | Plaid / manual entry |
| Social stats | `app/api/social/route.ts` | Instagram / TikTok / YouTube APIs |

---

## Scripts

```bash
npm run dev     # development server (localhost:3000)
npm run build   # production build + type check
npm run start   # serve production build
npm run lint    # ESLint
```

---

## License

Private — all rights reserved. © 2026 Anthony Fabri.