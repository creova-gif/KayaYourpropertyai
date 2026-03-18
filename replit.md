# Kaya Housing

## Overview
KAYA is an AI-powered property management platform for Ontario landlords. It provides tenant screening, rent collection, and LTB-compliant form generation. The platform is bilingual (English/French) and targets Ontario's rental housing market.

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
