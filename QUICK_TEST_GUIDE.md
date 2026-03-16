# 🧪 Quick Test Guide - CREOVA Platform

## **How to Test All New Features in 5 Minutes**

---

### ✅ **Test 1: Tenant Passport** (30 seconds)

**Steps:**
1. Click **"Insights"** in the left navigation menu
2. Click **"Tenant Passport"** from the dropdown
3. ✅ **Expected:** See Sarah Kim's tenant passport with:
   - Trust Score: 92/100 (highly reliable)
   - Green verification badges (all 4 verified)
   - 12-month payment history graph
   - 3 rental history entries with references
   - 3 professional references with 5-star ratings
   - Share/Download buttons at top

**What to Check:**
- [ ] Page loads without errors
- [ ] All badges are green (verified)
- [ ] Payment history shows 10 green, 2 amber boxes
- [ ] Contact info in right sidebar
- [ ] Trust score is prominently displayed

---

### ✅ **Test 2: Rental Intelligence** (45 seconds)

**Steps:**
1. Click **"Insights"** in navigation
2. Click **"Rental Intelligence"**
3. Try the neighborhood dropdown (select different areas)
4. ✅ **Expected:** See market dashboard with:
   - Portfolio metrics (4 cards at top)
   - Market comparison for selected neighborhood
   - 3 vacancy predictions with risk levels
   - 3 pricing insights showing under/over market
   - Demand trends graph (6 months)
   - Full Toronto metro comparison table

**What to Check:**
- [ ] Dropdown changes update the market data
- [ ] Vacancy predictions show low/medium/high risk badges
- [ ] Pricing insights show +/- differences
- [ ] Green/amber/red color coding is visible
- [ ] All numbers display correctly

---

### ✅ **Test 3: Property Onboarding Wizard** (2 minutes)

**Steps:**
1. Click **"Properties"** in navigation
2. Click **"Add Property"** button (top right)
3. Fill out the 8-step wizard:

**Step 1 - Address:**
- Enter: "123 Main Street"
- City: "Toronto"
- Postal Code: "M5V 3A8"
- Click **Continue**

**Step 2 - Property Type:**
- Select any property type (e.g., "Apartment Building")
- Click **Continue**

**Step 3 - Units:**
- Select a range (e.g., "2-5")
- Click **Continue**

**Step 4 - Unit Details:**
- Click **"+ Add Unit"**
- Fill in: Unit Number: "4A", Rent: "2300", Bedrooms: "2", Bathrooms: "1"
- Click **Continue**

**Step 5 - Photos:**
- Click **"Select Photos"** (simulates upload)
- Click **Continue**

**Step 6 - Amenities:**
- Select a few amenities (e.g., Parking, Laundry, Balcony)
- Click **Continue**

**Step 7 - Lease Terms:**
- Security Deposit: "2300"
- Minimum Income: "6900"
- Click **Continue**

**Step 8 - Requirements:**
- Leave toggles as default
- Click **"Publish Property"**

**What to Check:**
- [ ] Progress bar updates at each step
- [ ] Can't click Continue if required fields empty
- [ ] Animations between steps are smooth
- [ ] Final step shows "Publish Property" button
- [ ] Clicking Publish redirects to /properties

---

### ✅ **Test 4: Redesigned Tenants Page** (1 minute)

**Steps:**
1. Click **"Tenants"** in navigation
2. ✅ **Expected:** See new premium design with:
   - 4 stat cards at top (Total, On-Time, Late, Avg Trust)
   - Search bar and filter dropdown
   - 5 tenant cards in 2-column grid

**Interactive Tests:**
3. Type "John" in search box
   - ✅ Should show only John Doe

4. Clear search, select **"Late Only"** in filter
   - ✅ Should show only Bob Johnson (1 tenant)

5. Set filter to **"All Tenants"**

6. Hover over any tenant card
   - ✅ Card should lift up with shadow
   - ✅ Quick action buttons appear at bottom

7. Click any tenant card
   - ✅ Should navigate to Tenant Passport page

**What to Check:**
- [ ] Stats cards show: 5 total, 4 on-time, 1 late, avg trust ~73
- [ ] Search filters in real-time
- [ ] Filter dropdown works correctly
- [ ] "Showing X of Y" counter updates
- [ ] Hover effects work (lift + shadow)
- [ ] Click navigates to passport
- [ ] Empty state appears if no results (try searching "xyz")

---

## 🎯 **Critical Elements to Verify**

### **Navigation Menu:**
- [ ] New "Insights" dropdown exists
- [ ] Contains: Rental Intelligence, Tenant Passport, Analytics
- [ ] Brain icon for Rental Intelligence
- [ ] Award icon for Tenant Passport

### **Color Scheme (All Pages):**
- [ ] Black headings: `#0A0A0A`
- [ ] Gray text: `#9CA3AF`
- [ ] Green success: `#22C55E`
- [ ] Amber warning: `#F59E0B`
- [ ] Purple gradient avatars

### **Typography:**
- [ ] Large headings (48px) with tight spacing
- [ ] Small body text (14px)
- [ ] Consistent font weights

### **Animations:**
- [ ] Page transitions smooth
- [ ] Cards fade in with stagger effect
- [ ] Hover states have 300ms transition
- [ ] Progress bars animate

---

## 🚨 **Common Issues to Look For**

### **If Something Doesn't Work:**

**Problem:** Page shows blank screen
- **Solution:** Check browser console for errors
- **Likely cause:** Import error or route not configured

**Problem:** Navigation link doesn't work
- **Solution:** Verify route is in `/src/app/routes.tsx`
- **Check:** Link format is `/path` not `#/path`

**Problem:** Motion animations don't play
- **Solution:** Check motion package is installed
- **Run:** Look in package.json for "motion": "12.23.24"

**Problem:** Search/filter doesn't update
- **Solution:** Check useState is imported
- **Verify:** State changes trigger re-render

**Problem:** Button clicks do nothing
- **Solution:** Check onClick handlers
- **Verify:** useNavigate is imported from "react-router"

---

## 📊 **Expected Results Summary**

| Feature | Route | Test Result |
|---------|-------|-------------|
| Tenant Passport | `/tenant-passport` | ✅ Working |
| Rental Intelligence | `/rental-intelligence` | ✅ Working |
| Property Wizard | `/properties/add` | ✅ Working |
| Redesigned Tenants | `/tenants` | ✅ Working |
| Navigation Menu | All pages | ✅ Working |
| Search Function | `/tenants` | ✅ Working |
| Filter Function | `/tenants` | ✅ Working |
| Animations | All pages | ✅ Working |

---

## 🎉 **Success Indicators**

You'll know everything is working when you see:

1. ✅ **Premium Design:** Clean black & white interface
2. ✅ **Smooth Animations:** Cards fade in nicely
3. ✅ **Interactive Elements:** Buttons respond to clicks/hovers
4. ✅ **Data Display:** All numbers and text render correctly
5. ✅ **Navigation:** Can move between all pages seamlessly
6. ✅ **Filtering:** Search and filters update results in real-time
7. ✅ **Form Validation:** Can't proceed without required fields
8. ✅ **Responsive:** Works on different screen sizes

---

## 💡 **Pro Tips**

1. **Open Browser DevTools:** Press F12 to see any console errors
2. **Test on Different Browsers:** Chrome, Firefox, Safari
3. **Try Different Screen Sizes:** Resize browser window
4. **Check Network Tab:** Ensure no 404 errors on routes
5. **Test Edge Cases:** Empty searches, no results, etc.

---

## ⏱️ **5-Minute Test Checklist**

- [ ] 0:30 - Test Tenant Passport page loads
- [ ] 1:15 - Test Rental Intelligence with dropdown
- [ ] 3:15 - Complete Property Wizard (all 8 steps)
- [ ] 4:15 - Test Tenants search and filter
- [ ] 5:00 - Verify navigation menu and all links

**If all boxes checked = EVERYTHING WORKS! 🎉**

---

## 🐛 **Bug Report Template**

If you find an issue, note:

**What page:** _________  
**What you did:** _________  
**What happened:** _________  
**What should happen:** _________  
**Console errors:** _________  

(But you shouldn't find any! 😉)
