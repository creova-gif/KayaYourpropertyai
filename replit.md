# Kaya Housing

## Overview
KAYA is an AI-powered, bilingual property management platform for Ontario landlords. It provides tenant screening, rent collection, LTB-compliant form generation, and a full renter-facing community portal. Supports 5 languages (English, French, Spanish, Mandarin, Punjabi).

## Tech Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4, Emotion, MUI
- **Routing:** React Router 7
- **UI Components:** Radix UI, shadcn-style components
- **Backend/DB:** Supabase (auth + database)
- **Payments:** Stripe
- **Charts:** Recharts
- **Drag & Drop:** React DnD
- **Animations:** Motion (Framer Motion)
- **Forms:** React Hook Form

## Project Structure
```
src/
  app/
    App.tsx           # Root app component with providers
    routes.tsx        # React Router route definitions
    components/       # Shared UI components
    contexts/         # React contexts (Auth, Language, Notifications, Trial)
    hooks/            # Custom React hooks
    pages/            # Page-level components
    services/         # API/backend service layer
    types/            # App-specific TypeScript types
    utils/            # Utility functions
  imports/            # Imported HTML/TSX designs
  lib/
    supabase.ts       # Supabase client
    mock-data.ts      # Mock data for development
    ai-screening.ts   # AI tenant screening logic
  styles/             # Global CSS files
  types/              # Shared TypeScript types
  main.tsx            # Entry point
```

## Development
- **Port:** 5000 (Vite dev server)
- **Start:** `npm run dev`
- **Build:** `npm run build`

## Deployment
- **Type:** Static site
- **Build command:** `npm run build`
- **Output directory:** `dist`

## Key Configuration
- `vite.config.ts`: Configured for Replit with `host: '0.0.0.0'`, `port: 5000`, `allowedHosts: true`
- `src/lib/supabase.ts`: Supabase client configuration (requires env vars)

## Authentication
- **Demo account:** `demo@kaya.ca` / `demo1234` — bypasses Supabase, sets a mock Pro-tier landlord session
- **Trial context:** `TrialContext` handles subscription enforcement; demo users get mocked `pro` / `active` status
- **Sign out:** Always clears local state first; skips Supabase call for demo accounts

## Language Support
- **Languages:** English (EN), French (FR), Spanish (ES), Mandarin (ZH), Punjabi (PA)
- **Switcher:** Globe-icon dropdown in the nav (landing + sidebar in LayoutPremium)
- **Persistence:** Language preference saved to `localStorage` key `kaya-language`
- **Fallback:** Missing keys fall back to English

## Stripe / Payments
- **Account:** CREOVA (acct_1REJ8ERHjGbBU1sF)
- **Products & Prices (CAD/month):**
  - Starter $29 — `price_1TDDgORHjGbBU1sF4a1VFjtR`
  - Pro $69 — `price_1TDDgSRHjGbBU1sFNfQrAhhb`
  - Scale $149 — `price_1TDDgXRHjGbBU1sFzWCrFge6`
- HST/GST applied at checkout based on province

## Public Routes (no auth)
- `/` — Landing page (auth-aware nav: shows Dashboard when logged in, Sign In when not)
- `/search` — Property search with emoji previews, badges, save/apply
- `/search/ai` — Natural language AI search
- `/roommates` — Roommate finder & listing board
- `/move-in` — Move-in coordinator with checklist
- `/neighbourhood-insights` — Toronto walkability/safety scores
- `/community` — Building community board
- `/listings` — Property listings
- `/pricing`, `/features`, `/about`, `/contact`, `/faq`

## Protected App Routes (/app/*)
- Dashboard, Properties, Applications, Tenants, Rent Collection, Financial Dashboard
- HST/GST Tracker, Invoices, Maintenance, Contractor Marketplace
- **Vendors** (`/app/vendors`) — Vetted vendor marketplace
- **Listing Syndication** (`/app/listing-syndication`) — One-click multi-platform publish
- **Deposit-Free / Kaya Shield** (`/app/deposit-free`) — Deposit-free leasing
- **Rent Credit Building** (`/app/rent-credit`) — Tenant credit reporting
- Documents, LTB Forms, Lease Templates, Notices, Reports, Settings, Messages, Admin
- **LTB Workflow Engine** (`/app/ltb-workflow`) — 8-step guided eviction flow, N4/L1 form generator, case tracker sidebar, paralegal CTA
- **CRA T776 Report** (`/app/t776`) — Auto-generated Statement of Real Estate Rentals from Kaya rent data; tabs for income, expenses, CCA; PDF export
- **Compliance Centre** (`/app/compliance`) — PIPEDA, Human Rights Code, CASL, LTB compliance dashboard with scoring, action items, and legal references
- **Income Verification** (`/app/income-verify`) — AI fraud detection, bank verification status, pay stub AI analysis, fraud signal flagging per applicant
- **Insurance Marketplace** (`/app/insurance`) — 5 Canadian insurer profiles (Square One, Aviva, Intact, BrokerLink, Wawanesa), quote CTAs, coverage education
- **Paralegal Marketplace** (`/app/paralegal`) — 5 Ontario-licensed paralegals with LSO badge, ratings, success rates, booking modal, how-it-works flow
