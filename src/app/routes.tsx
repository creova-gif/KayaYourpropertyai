import { createBrowserRouter, Navigate } from "react-router";
import { DashboardPremium } from "./pages/DashboardPremium";
import { AIAssistantPremium } from "./pages/AIAssistantPremium";
import { Applications } from "./pages/Applications";
import { ApplicationsPremium } from "./pages/ApplicationsPremium";
import { ApplicationDetailPremium } from "./pages/ApplicationDetailPremium";
import { TenantPassportPremium } from "./pages/TenantPassportPremium";
import { RentalIntelligencePremium } from "./pages/RentalIntelligencePremium";
import { PropertyOnboardingWizard } from "./pages/PropertyOnboardingWizard";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Tenants } from "./pages/Tenants";
import { Payments } from "./pages/Payments";
import { RentCollection } from "./pages/RentCollection";
import { FinancialDashboard } from "./pages/FinancialDashboard";
import { InvoiceGenerator } from "./pages/InvoiceGenerator";
import { Maintenance } from "./pages/Maintenance";
import { Documents } from "./pages/Documents";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { Messages } from "./pages/Messages";
import { NoticesManagement } from "./pages/NoticesManagement";
import { AdminDashboard } from "./pages/AdminDashboard";
import { LayoutPremium } from "./components/LayoutPremium";
import { TenantPortalPremium } from "./pages/TenantPortalPremium";
import { PropertyListings } from "./pages/PropertyListings";
import { LTBForms } from "./pages/LTBForms";
import { TaxTracker } from "./pages/TaxTracker";
import { ProvinceLeaseTemplates } from "./pages/ProvinceLeaseTemplates";
import { TenantScreening } from "./pages/TenantScreening";

export const router = createBrowserRouter([
  // Redirect old /premium routes to root
  {
    path: "/premium/*",
    element: <Navigate to="/" replace />,
  },
  // Property Listings (Public)
  {
    path: "/listings",
    Component: PropertyListings,
  },
  // Premium Black & White Design (Default)
  {
    path: "/",
    Component: LayoutPremium,
    children: [
      { index: true, Component: DashboardPremium },
      { path: "applications", Component: ApplicationsPremium },
      { path: "applications/:id", Component: ApplicationDetailPremium },
      { path: "tenant-passport", Component: TenantPassportPremium },
      { path: "rental-intelligence", Component: RentalIntelligencePremium },
      { path: "properties", Component: Properties },
      { path: "properties/add", Component: PropertyOnboardingWizard },
      { path: "properties/:id", Component: PropertyDetail },
      { path: "tenants", Component: Tenants },
      { path: "payments", Component: Payments },
      { path: "rent-collection", Component: RentCollection },
      { path: "financial", Component: FinancialDashboard },
      { path: "invoices", Component: InvoiceGenerator },
      { path: "maintenance", Component: Maintenance },
      { path: "documents", Component: Documents },
      { path: "analytics", Component: Analytics },
      { path: "ltb-forms", Component: LTBForms },
      { path: "settings", Component: Settings },
      { path: "messages", Component: Messages },
      { path: "notices", Component: NoticesManagement },
      { path: "admin", Component: AdminDashboard },
      { path: "ai-assistant", Component: AIAssistantPremium },
      { path: "tax-tracker", Component: TaxTracker },
      { path: "province-lease-templates", Component: ProvinceLeaseTemplates },
      { path: "tenant-screening", Component: TenantScreening },
    ],
  },
  // Premium Tenant Portal
  {
    path: "/tenant",
    children: [
      { index: true, Component: TenantPortalPremium },
    ],
  },
]);