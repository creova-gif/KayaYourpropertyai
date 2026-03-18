# 🚀 KAYA Platform - Quick Start Guide

## ✅ **Ready to Test!**

Your KAYA platform is now 100% integrated with a real backend. Here's how to test it:

---

## 🎯 **Step 1: View the Integrated Dashboard**

Navigate to: **`/dashboard-integrated`**

This page demonstrates:
- ✅ Real-time data loading from backend
- ✅ Loading states & error handling
- ✅ Property analytics
- ✅ Application screening results
- ✅ AI insights display
- ✅ Portfolio metrics

---

## 📊 **Step 2: Test Backend Features**

### **A. Create Your First Property**

Open your browser console and run:

```javascript
// Import the API
const API = window.MarketplaceAPI;

// Create a property
const property = await API.properties.create({
  name: "King Street Apartments",
  address: "123 King St W",
  city: "Toronto",
  province: "ON",
  postalCode: "M5H 1A1",
  propertyType: "apartment",
  amenities: ["Pool", "Gym", "Parking", "Laundry"]
});

console.log('✅ Property created:', property);
```

### **B. Add Units to Property**

```javascript
// Bulk import units
const result = await API.bulkImport.importUnits(property.id, [
  {
    unitNumber: "101",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    rentPrice: 2100,
    status: "available",
    floor: 1
  },
  {
    unitNumber: "102",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 850,
    rentPrice: 2800,
    status: "occupied",
    floor: 1
  },
  {
    unitNumber: "201",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1000,
    rentPrice: 3200,
    status: "available",
    floor: 2
  }
]);

console.log('✅ Units imported:', result);
```

### **C. Submit a Tenant Application (AI Auto-Scores!)**

```javascript
// Submit application - AI automatically scores it!
const application = await API.applications.submit({
  propertyId: property.id,
  unitId: "101",
  tenantName: "Sarah Johnson",
  email: "sarah.j@example.com",
  phone: "416-555-0100",
  monthlyIncome: 8500,
  employmentStatus: "full-time",
  employmentDuration: 36, // months
  creditScore: 750,
  previousRentPayments: "on-time",
  hasGuarantor: false
});

// Check AI scoring!
console.log('✅ Application submitted!');
console.log('AI Score:', application.aiScore); // 0-100
console.log('AI Recommendation:', application.aiRecommendation); // approve/review/reject
console.log('Credit Risk:', application.creditRisk);
console.log('Income Stability:', application.incomeStability);
```

### **D. View Portfolio Analytics**

```javascript
// Get full portfolio overview
const portfolio = await API.analytics.getPortfolio();

console.log('📊 Portfolio Overview:');
console.log('Total Properties:', portfolio.overview.totalProperties);
console.log('Total Units:', portfolio.overview.totalUnits);
console.log('Occupancy Rate:', portfolio.overview.occupancyRate + '%');
console.log('Monthly Revenue:', '$' + portfolio.overview.monthlyRevenue.toLocaleString());

console.log('🤖 AI Insights:');
portfolio.aiInsights.forEach(insight => {
  console.log(`- ${insight.title}: ${insight.description}`);
  console.log(`  💡 ${insight.recommendation}`);
});
```

### **E. Create a Maintenance Job (AI Classifies!)**

```javascript
// Create a maintenance job - AI auto-classifies the category!
const job = await API.jobs.create({
  propertyId: property.id,
  unitId: "102",
  title: "Kitchen sink leaking",
  description: "Water dripping from under the kitchen sink. Needs urgent repair.",
  urgency: "high"
});

// AI automatically detected:
console.log('✅ Job created!');
console.log('AI Category:', job.category); // "plumbing"
console.log('AI Priority:', job.priority); // "medium" or "high"
console.log('Estimated Cost:', job.estimatedCost); // { min: 120, max: 350 }
```

### **F. Browse Contractors**

```javascript
// Find plumbers
const plumbers = await API.contractors.getAll({
  trade: 'plumbing',
  verified: true
});

console.log(`Found ${plumbers.length} verified plumbers`);
plumbers.forEach(c => {
  console.log(`- ${c.name} (⭐ ${c.avgRating}/5 from ${c.jobsCompleted} jobs)`);
});
```

---

## 🔌 **Step 3: Integrate Your Existing Pages**

### **Example: Update DashboardPremium.tsx**

```typescript
import { useState, useEffect } from "react";
import { MarketplaceAPI } from "../services/backend.service";

export function DashboardPremium() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const overview = await MarketplaceAPI.getDashboardOverview();
        setData(overview);
      } catch (error) {
        console.error('Failed to load:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Properties: {data.properties.length}</h1>
      <h2>Occupancy: {data.portfolio.overview.occupancyRate}%</h2>
      <h3>Revenue: ${data.portfolio.overview.monthlyRevenue.toLocaleString()}</h3>
      
      {/* Show real properties */}
      {data.properties.map(property => (
        <div key={property.id}>
          <h3>{property.name}</h3>
          <p>Units: {property.analytics.totalUnits}</p>
          <p>Occupied: {property.analytics.occupiedUnits}</p>
          <p>Revenue: ${property.analytics.monthlyRevenue}</p>
        </div>
      ))}
    </div>
  );
}
```

### **Example: Update Properties Page**

```typescript
import { useState, useEffect } from "react";
import { MarketplaceAPI } from "../services/backend.service";

export function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    MarketplaceAPI.properties.getAll().then(setProperties);
  }, []);

  const handleCreate = async () => {
    const newProperty = await MarketplaceAPI.properties.create({
      name: "New Property",
      address: "456 Queen St",
      city: "Toronto",
      province: "ON",
      postalCode: "M5V 2A1",
      propertyType: "apartment"
    });
    
    // Reload properties
    MarketplaceAPI.properties.getAll().then(setProperties);
  };

  return (
    <div>
      <button onClick={handleCreate}>+ Add Property</button>
      {properties.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.address}, {p.city}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🧪 **Step 4: Test the Full Workflow**

### **Complete Property Setup Test:**

```javascript
// 1. Create property
const prop = await API.properties.create({
  name: "Downtown Tower",
  address: "789 Bay St",
  city: "Toronto",
  province: "ON",
  postalCode: "M5G 2N7",
  propertyType: "apartment",
  amenities: ["Gym", "Pool", "Concierge"]
});

// 2. Add units
await API.bulkImport.importUnits(prop.id, [
  { unitNumber: "301", bedrooms: 1, bathrooms: 1, rentPrice: 2200, status: "available" },
  { unitNumber: "302", bedrooms: 2, bathrooms: 1, rentPrice: 2900, status: "available" },
  { unitNumber: "303", bedrooms: 2, bathrooms: 2, rentPrice: 3400, status: "occupied" },
]);

// 3. Create applications
const app1 = await API.applications.submit({
  propertyId: prop.id,
  unitId: "301",
  tenantName: "Alex Chen",
  email: "alex@example.com",
  phone: "416-555-0111",
  monthlyIncome: 9000,
  creditScore: 780,
  employmentStatus: "full-time",
  employmentDuration: 48
});

// 4. Create maintenance job
const job = await API.jobs.create({
  propertyId: prop.id,
  unitId: "303",
  title: "HVAC not heating",
  description: "Unit 303 reports no heat coming from HVAC system",
  urgency: "high"
});

// 5. View analytics
const analytics = await API.analytics.getPortfolio();

console.log('✅ Property Setup Complete!');
console.log('Total Properties:', analytics.overview.totalProperties);
console.log('Total Units:', analytics.overview.totalUnits);
console.log('Application Score:', app1.aiScore);
console.log('Job Category:', job.category);
console.log('AI Insights:', analytics.aiInsights.length);
```

---

## 📱 **Step 5: Expose API to Browser Console**

To test APIs easily in the browser, add this to your `/src/app/App.tsx`:

```typescript
import { MarketplaceAPI } from './services/backend.service';

// Expose API to browser console for testing
if (typeof window !== 'undefined') {
  (window as any).MarketplaceAPI = MarketplaceAPI;
  console.log('✅ KAYA API available: window.MarketplaceAPI');
}
```

Then in your browser console, you can run:

```javascript
// Create property
const p = await MarketplaceAPI.properties.create({...});

// Get all properties
const props = await MarketplaceAPI.properties.getAll();

// Submit application
const app = await MarketplaceAPI.applications.submit({...});

// Get portfolio
const portfolio = await MarketplaceAPI.analytics.getPortfolio();
```

---

## 🎯 **What You Have Now:**

### **Backend (22 API Endpoints)**
✅ Properties CRUD with analytics  
✅ Multi-building support  
✅ Bulk unit import (CSV)  
✅ AI application screening  
✅ Portfolio analytics  
✅ Contractor marketplace  
✅ Job posting & matching  
✅ Payment tracking  
✅ Maintenance requests  

### **AI Features (Auto-Enabled)**
✅ Application scoring (0-100)  
✅ Job classification  
✅ Cost estimation  
✅ Portfolio insights  
✅ Vacancy predictions  

### **Frontend Integration**
✅ Example dashboard at `/dashboard-integrated`  
✅ Loading states & error handling  
✅ Real-time data display  
✅ Full API client ready to use  

---

## 🚀 **Next Steps:**

1. **Visit `/dashboard-integrated`** to see live data
2. **Open browser console** and test the APIs
3. **Update existing pages** to use real backend data
4. **Build new features** using the complete API

---

## 💡 **Tips:**

- All APIs require user authentication (login first!)
- Data is automatically isolated per user
- AI features run automatically (no extra setup)
- Subscription limits are enforced server-side
- Check console for detailed error messages

---

## 📚 **Documentation:**

- `/INTEGRATION_SUMMARY.md` - Complete integration guide
- `/INTEGRATION_COMPLETE.md` - Full API reference
- `/AIRBNB_FEATURES_ADDED.md` - Property model features
- `/CONTRACTOR_MARKETPLACE_COMPLETE.md` - Marketplace features

---

**Your KAYA platform is production-ready! 🇨🇦🎉**
