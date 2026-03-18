# KAYA Platform - Design System Audit Report
**Date:** March 16, 2026  
**Audit Scope:** Full Application - Desktop & Mobile Web

## Executive Summary
Comprehensive audit identified **multiple design system inconsistencies** across components and pages. Critical issues include outdated color tokens, inconsistent typography, and legacy Tailwind classes that don't match the refined Kaya design system.

---

## Design System Standards (Target)

### Colors
- **Primary Green:** `#0A7A52` (refined, darker)
- **Green Light:** `#E5F4EE` (backgrounds, tags)
- **Green Muted:** `#9FD8C0` (secondary elements)
- **Background Primary:** `#F8F7F4` (warm off-white)
- **Background Card:** `#FFFFFF`
- **Text Primary:** `#0E0F0C` (refined black)
- **Text Secondary:** `#767570` (refined gray)
- **Border:** `rgba(0,0,0,0.07)` (subtle)

### Typography
- **Headings:** `'Instrument Serif', Georgia, serif`
- **Body/UI:** `'DM Sans', system-ui, sans-serif`
- **Letter Spacing:** Tight (-0.5px to -1px for large headings)

### Border Radius
- **Small:** 8px
- **Medium:** 10-12px
- **Large:** 14-16px
- **XL:** 20px

---

## Critical Issues Found

### 🔴 Priority 1: Color Token Inconsistencies

#### Old Green (#1D9E75) Found In:
- ❌ NavigationMenu.tsx - FIXED ✅
- ❌ Other components TBD

#### Slate/Gray Colors (Should use refined palette)
- ❌ Layout.tsx (bg-slate-50, slate-200, slate-700, slate-900)
- ❌ Properties.tsx (extensive slate usage)
- ❌ AIAssistant.tsx (slate-50, slate-100, slate-200, etc.)
- ❌ ApplicationCard.tsx (slate colors throughout)
- ❌ ImageWithFallback.tsx (gray-100)
- ❌ Dashboard.tsx (likely has slate/gray)
- ❌ Multiple page files

#### Indigo/Purple Colors (Should use Kaya green)
- ❌ Layout.tsx (indigo-600, purple-600, pink-600)
- ❌ AIAssistant.tsx (indigo-600, purple-600 gradients)
- ❌ Properties.tsx (indigo-600 buttons)
- ❌ Dashboard.tsx (indigo stats)

### 🟡 Priority 2: Typography Inconsistencies

#### Missing Font Families
- ❌ Many components not specifying Instrument Serif for headings
- ❌ Body text not consistently using DM Sans
- ❌ Inconsistent letter-spacing on large text

### 🟡 Priority 3: Component Consistency

#### Buttons
- Inconsistent hover states
- Mix of gradient and solid backgrounds
- Varying border radius (should standardize)

#### Cards
- Inconsistent padding
- Varying border radius
- Mixed shadow usage

#### Forms/Inputs
- Inconsistent focus ring colors (using indigo instead of green)
- Varying input styles

### 🟢 Priority 4: Responsive Design
- Most components need mobile testing
- Ensure touch targets are 44px minimum
- Check spacing on mobile (reduce padding where needed)

---

## Files Requiring Updates

### 🔥 Critical (Shared Components)
1. **Layout.tsx** - Complete redesign needed
2. **AIAssistant.tsx** - Color system overhaul
3. **ApplicationCard.tsx** - Color updates
4. **NavigationMenu.tsx** - ✅ COMPLETE

### 📄 High Priority (Core Pages)
1. **Dashboard.tsx**
2. **Properties.tsx**
3. **Applications.tsx** (and variants)
4. **TenantScreening.tsx**
5. **Messages.tsx** - Recently updated but verify
6. **Settings.tsx** - Recently updated but verify

### 📋 Medium Priority
1. **Payments.tsx**
2. **RentCollection.tsx**
3. **FinancialDashboard.tsx** - Verified good ✅
4. **Analytics.tsx** - Fixed charts ✅
5. **AdminDashboard.tsx** - Fixed charts ✅
6. **Maintenance.tsx**
7. **Documents.tsx**
8. **LTBForms.tsx**

### 🎯 Lower Priority
1. **ProvinceLeaseTemplates.tsx**
2. **NoticesManagement.tsx**
3. **TaxTracker.tsx**
4. **PropertyOnboardingWizard.tsx**

---

## Recommended Action Plan

### Phase 1: Foundation (Immediate)
1. ✅ Update NavigationMenu.tsx - COMPLETE
2. ⏳ Update Layout.tsx - Full redesign with Kaya system
3. ⏳ Update LayoutPremium.tsx header/branding
4. ⏳ Create/update shared button components
5. ⏳ Create/update shared card components

### Phase 2: Core Experience (Next)
1. Update all Dashboard variants
2. Update Properties.tsx
3. Update Applications pages
4. Update TenantScreening.tsx

### Phase 3: Feature Pages
1. Financial pages
2. Analytics pages
3. Admin pages
4. Settings & Utility pages

### Phase 4: Polish
1. Ensure all micro-interactions use consistent timing (200-300ms)
2. Add consistent hover/focus states
3. Verify all touch targets for mobile
4. Test responsive breakpoints

---

## Mobile Checklist

### Must-Have for Mobile
- [ ] Touch targets minimum 44x44px
- [ ] Readable text (minimum 14px body)
- [ ] Proper spacing (reduce desktop padding by 25-50%)
- [ ] Hamburger menu functional
- [ ] Bottom navigation consideration for key actions
- [ ] Forms work well on mobile keyboards
- [ ] Cards stack properly
- [ ] Tables convert to cards on mobile
- [ ] Modals/dialogs fit on small screens

---

## Design Tokens to Use

```css
/* Always use these tokens */
--kaya-green: #0A7A52
--kaya-green-light: #E5F4EE
--color-text-primary: #0E0F0C
--color-text-secondary: #767570
--color-background-tertiary: #F8F7F4
--color-border-tertiary: rgba(0, 0, 0, 0.07)

/* Typography */
font-family: 'Instrument Serif', Georgia, serif  /* Headings */
font-family: 'DM Sans', system-ui, sans-serif    /* Body */
```

---

## Next Steps

1. Approve this audit report
2. Systematically update files in priority order
3. Test each update on both desktop and mobile
4. Verify consistency across all pages
5. Final QA pass on entire platform
