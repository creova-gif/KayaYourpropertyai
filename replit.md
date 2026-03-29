# Kaya Housing

## Overview
KAYA is an AI-powered, bilingual property management platform for Ontario landlords and tenants. It provides tenant screening, rent collection, LTB-compliant form generation, and a full renter-facing tenant portal with Tenant Passport, credit builder, maintenance requests, and document management. Supports 5 languages (English, French, Spanish, Mandarin, Punjabi).

## Tech Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4, Emotion, MUI
- **Routing:** React Router 7
- **UI Components:** Radix UI, shadcn-style components
- **Backend/DB:** Supabase (auth + database + Edge Functions via Deno + Hono)
- **Payments:** Stripe
- **Charts:** Recharts
- **Drag & Drop:** React DnD
- **Animations:** Motion (Framer Motion)
- **Forms:** React Hook Form

## Compliance Module (PIPEDA + Ontario RTA)
Implemented in `supabase/functions/server/index.tsx` with frontend client at `src/app/services/compliance.service.ts`.

| Feature | Backend Endpoint | Notes |
|---|---|---|
| Rate Limiting | Middleware on all routes | 100 req/min general; 10/min for auth routes |
| Audit Logging | `GET/POST /compliance/audit-log` | Append-only, 500 entries per user, IP-tagged |
| Consent Management | `GET/POST/DELETE /compliance/consent` | 5 PIPEDA consent types tracked with timestamps |
| Right to Erasure | `DELETE /compliance/users/:id/data` | Anonymizes PII; retains financial trail (CRA 7yr) |
| Rent Increase Validation | `GET /compliance/rent-increase/validate` | Ontario guideline table 2022–2026; Form N1 notice logic |
| Notice Delivery Tracking | `GET/POST /compliance/notices/track` | LTB-admissible receipts with method + timestamp |
| Soft Delete | `softDelete()` utility | Never hard-deletes; sets `deletedAt` + audit log |
| Compliance Health | `GET /compliance/health` | Status check, module list, data residency |

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
- **Insurance Marketplace** (`/app/insurance`) — Tabbed view: Landlord Insurance (5 Canadian insurer profiles: Square One, Aviva, Intact, BrokerLink, Wawanesa; quote CTAs, coverage education) + Renters Insurance (3 plan tiers: Basic/Plus/Premium; per-tenant coverage table; add-on toggles; landlord benefits panel)
- **Paralegal Marketplace** (`/app/paralegal`) — 5 Ontario-licensed paralegals with LSO badge, ratings, success rates, booking modal, how-it-works flow
- **List Property** (`/app/list-property`) — 6-step landlord listing wizard: type selector, address/location, beds/baths/parking, amenities multi-select, pricing/availability with Ontario rent rules, review & publish. Builds Kaya's native listing network.
- **Commercial Portfolio** (`/app/commercial`) — Enterprise commercial property management with Portfolio/Lease Tracker/Team tabs for large companies managing multiple commercial properties.
- **Smart Home Hub** (`/app/smart-home`) — IoT device control centre: thermostat sliders, lock/light/camera/EV charger device grid, temp-pass modal for guests, energy savings panel
- **Maintenance Escrow** (`/app/escrow`) — Escrow deposit management: hold/release/dispute flow, per-tenant breakdown table, audit log, fund status cards
- **Sustainability Dashboard** (`/app/sustainability`) — Energy grade cards per property, monthly CO₂ tracking, ESG report generator, Kaya Green certification badge
- **Investor Hub** (`/app/investor`) — Live ROI calculator (inputs: price/rent/down/vacancy), AI market signal cards, portfolio performance table with IRR, cap rate, cash-on-cash
- **Vacancy Marketing / AI Marketing** (`/app/vacancy-marketing`) — Per-vacant-unit cards with AI-generated listing copy, AI listing score meter, pricing analysis vs market avg, platform syndication pills (Zumper/Realtor.ca/PadMapper/Kijiji/Rentals.ca), Publish Now CTA, inline copy editor, price editor
- **Owner Portal** (`/app/owner-portal`) — Read-only view for property owners using a property manager: owner identity card, 4 KPI cards (properties/units/occupancy/net income), expandable monthly statements with PDF download + breakdown, portfolio summary with per-property occupancy bars + YTD panel, recent activity feed
- **Property Inspection** (`/app/inspection`) — Move-in/move-out/routine inspection workflow: tabbed New Inspection (form + interactive checklist across 6 rooms) and Inspection History (expandable past inspection cards with condition scores, PDF export, inspector notes)

## Public Routes (additional)
- `/accessibility` — Accessibility Hub: 8-filter sidebar (wheelchair, elevator, grab bars, etc.), accessible listing cards with verified badges, Book Tour / Save actions
- `/multilingual` — Multilingual Platform: 8 language selector, translation accuracy stats (98.4%), per-language newcomer support resources, Apply Language CTA

## Sidebar (LayoutPremium)
- **Dark design:** Near-black (#0C0D0A) sidebar with white Kaya. wordmark and green dot
- **List Property CTA:** Green button prominently at top of sidebar
- **Quick strip:** Alerts + Search quick-access buttons
- **AI nudge card:** Zap icon card linking to Kaya AI assistant
- **User profile:** Avatar + name + PRO badge + language switcher (dark-mode adapted)
- **Mobile:** Hamburger button at top-left, full-height slide-in sidebar with backdrop blur
- **NavigationMenu:** Accepts `dark` prop — dark mode uses white text variants, green active tint, section headers
- **Sticky topbar:** 48px bar below TrialBanner in main content area; shows page context label (uppercase) + Sparkles AI button that fires `openAIWithQuery` event to open AICommandPalette

## Tenant Portal (TenantPortalPremium — `/tenant`)
- Standalone page (not inside LayoutPremium), rendered directly for the Tenant Demo flow
- **Nav bar:** Sticky dark bar with Kaya. logo, "Tenant Portal" label, green AI⌘K button, Sign-out link
- **AI:** GlobalAIAssistant (floating chat) + AICommandPalette (⌘K) both mounted; fires `openAIWithQuery` event
- Pays rent, views documents, lease info, payment history; Pay Now + Schedule Payment modals

## TenantLayout (sub-routes under `/tenant/*`)
- **Sidebar:** Dark (#0E0F0C) with Kaya. brand, tenant avatar/unit info, green-accented active nav, AI nudge card (⌘K)
- **Bottom nav:** Mobile-only bottom tab bar with Kaya green active states
- **Topbar:** Sticky 48px topbar with current page label + Sparkles AI button
- **AI:** GlobalAIAssistant + AICommandPalette included

## Dashboard (`/app`)
- **Onboarding checklist:** Dismissible card at top (hidden after localStorage key `kaya_onboarding_dismissed`=true); shows 5 pill-style steps with green progress bar; clicking "Ask Kaya AI" fires `openAIWithQuery`; step completion persisted to `kaya_onboarding_steps` in localStorage

## FeaturesPage (`/features`)
- Each of the 12 feature cards now has an inline mini UI mockup preview rendered as code-based JSX (no images):
  - AI Screening: score meter with 3 progress bars + LOW RISK badge
  - Rent Intelligence: bar chart with 6-month trend + recommended rent
  - Rent Collection: 3 tenant payment rows with PAID/PENDING badges
  - LTB Compliance: form list (N4/N5/N12/L1) with check indicators
  - Document Management: 3 file rows with PDF icons
  - Financial Tracking: 3-stat grid (Revenue/Expenses/NOI) + CRA badge
  - Maintenance: 3 request rows with HIGH/MED/LOW priority badges
  - Tenant Portal: dark mini portal card with Pay Now/Schedule buttons
  - Multi-Language: language pill grid (6 flags + names)
  - Messaging: 2-bubble chat mockup (landlord/tenant exchange)
  - Automations: 3 trigger→action workflow rules
  - Guarantor: 4-step progress checklist with checkmarks

## PublicSearch (/search)
- **Residential / Commercial toggle** at hero — switches entire listing experience
- **Residential mode:** 12 verified Ontario listings (Toronto, Ottawa, Hamilton, Kitchener, London, Windsor); tour modal, apply modal (income + PIPEDA notice), CMHC 2024 market banner, type/sort/rent filters, save/heart
- **Commercial mode:** 10 verified commercial spaces (office, retail, industrial/warehouse, flex, mixed-use); class A/B/C filter, sqft slider, lease type, per-sqft pricing, 2-step inquiry modal (company → headcount/timeline), broker confirmation

## CommercialPortfolio (/app/commercial)
- Enterprise multi-property management for large companies with commercial real estate
- 3 demo properties: King Street Commerce Centre (Toronto), Queensway Industrial Park (Mississauga), Rideau Commerce Plaza (Ottawa)
- Commercial unit types: Office Suites, Retail Units, Warehouse Bays, Flex Spaces
- Unit data: sqft, base rent, CAM charges, lease type (NNN/gross/modified gross), status (leased/vacant/pending/holdover), tenant business name
- **Portfolio Tab:** Expandable property cards with unit grid, amenities, per-property KPIs
- **Lease Tracker Tab:** Full lease table across all properties; expiry alerts within 12 months; status summary
- **Team Tab:** Team member cards with roles + assigned properties; property access matrix
- KPI strip: total properties, portfolio sqft, occupancy %, monthly revenue, vacant units
- Add property modal; tenant inquiry modal; "Invite Team Member" placeholder
- Sidebar nav: Properties → Residential Portfolio + Commercial Portfolio

## NeighbourhoodInsights (/neighbourhood-insights)
- 9 neighbourhoods across Toronto, Ottawa (Westboro, Centretown), Hamilton (Dundas St W)
- City filter tabs: All / Toronto / Ottawa / Hamilton
- Real CMHC 2024 data panel per city (vacancy, avg rent, annual change)
- Walk Score API integration note (requires VITE_WALKSCORE_API_KEY, free 5k/day)
- Dynamic AI verdicts referencing actual CMHC vacancy rates

## Listing Network Roadmap
- **Phase 1 (now):** Native Kaya listings — landlords post directly via /app/list-property
- **Phase 2:** CREA DDF partnership (~$500-2k/yr, realtor license or data agreement)
- **Phase 3:** Rentals.ca / Zumper commercial data-sharing agreements (revenue share)
