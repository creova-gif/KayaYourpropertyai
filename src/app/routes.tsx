import { createBrowserRouter, Navigate } from "react-router";
import { DashboardPremium } from "./pages/DashboardPremium";
import { DashboardIntegrated } from "./pages/DashboardIntegrated";
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
import { TenantLayout } from "./pages/tenant-portal/TenantLayout";
import { TenantPayments } from "./pages/tenant-portal/TenantPayments";
import { TenantDocuments } from "./pages/tenant-portal/TenantDocuments";
import { TenantMaintenance } from "./pages/tenant-portal/TenantMaintenance";
import { TenantApplications } from "./pages/tenant-portal/TenantApplications";
import { TenantLeaseSigning } from "./pages/tenant-portal/TenantLeaseSigning";
import { TenantReceipts } from "./pages/tenant-portal/TenantReceipts";
import { TenantChecklist } from "./pages/tenant-portal/TenantChecklist";
import { TenantNotices } from "./pages/tenant-portal/TenantNotices";
import { TenantLeaseRenewal } from "./pages/tenant-portal/TenantLeaseRenewal";
import { TenantDispute } from "./pages/tenant-portal/TenantDispute";
import { TenantProfile } from "./pages/tenant-portal/TenantProfile";
import { TenantOnboarding } from "./pages/tenant-portal/TenantOnboarding";
import { PropertyListingsRedesign } from "./pages/PropertyListingsRedesign";
import { LandingPage } from "./pages/LandingPage";
import { LTBForms } from "./pages/LTBForms";
import { TaxTracker } from "./pages/TaxTracker";
import { ProvinceLeaseTemplates } from "./pages/ProvinceLeaseTemplates";
import { TenantScreening } from "./pages/TenantScreening";
import { PaymentDemo } from "./pages/PaymentDemo";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ContractorMarketplace } from "./pages/ContractorMarketplace";
import { NotificationCenter } from "./pages/NotificationCenter";
import { MessagingCenter } from "./pages/MessagingCenter";
import { Reports } from "./pages/Reports";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import { FAQPage } from "./pages/FAQPage";
import { AIFeaturesDemo } from "./pages/AIFeaturesDemo";
import { PublicSearch } from "./pages/PublicSearch";
import { AISearch } from "./pages/AISearch";
import { RoommateFinder } from "./pages/RoommateFinder";
import { SmartHomeHub } from "./pages/SmartHomeHub";
import { MaintenanceEscrow } from "./pages/MaintenanceEscrow";
import { SustainabilityDashboard } from "./pages/SustainabilityDashboard";
import { InvestorHub } from "./pages/InvestorHub";
import { AccessibilityHub } from "./pages/AccessibilityHub";
import { MultilingualPlatform } from "./pages/MultilingualPlatform";
import { MoveInCoordinator } from "./pages/MoveInCoordinator";
import { NeighbourhoodInsights } from "./pages/NeighbourhoodInsights";
import { BuildingCommunity } from "./pages/BuildingCommunity";
import { ListingSyndication } from "./pages/ListingSyndication";
import { DepositFree } from "./pages/DepositFree";
import { VendorMarketplace } from "./pages/VendorMarketplace";
import { RentCreditBuilding } from "./pages/RentCreditBuilding";
import LTBWorkflow from "./pages/LTBWorkflow";
import T776Report from "./pages/T776Report";
import ComplianceCenter from "./pages/ComplianceCenter";
import IncomeVerification from "./pages/IncomeVerification";
import InsuranceMarketplace from "./pages/InsuranceMarketplace";
import ParalegalMarketplace from "./pages/ParalegalMarketplace";
import { ListProperty } from "./pages/ListProperty";
import { CommercialPortfolio } from "./pages/CommercialPortfolio";
import { VacancyMarketing } from "./pages/VacancyMarketing";
import { OwnerPortal } from "./pages/OwnerPortal";
import { PropertyInspection } from "./pages/PropertyInspection";

export const router = createBrowserRouter([
  // Landing Page - Default home page for visitors
  {
    path: "/",
    Component: LandingPage,
  },
  // Auth Pages (Public - redirect to dashboard if already logged in)
  {
    path: "/login",
    element: <PublicRoute><LoginPage /></PublicRoute>,
  },
  {
    path: "/signup",
    element: <PublicRoute><SignupPage /></PublicRoute>,
  },
  {
    path: "/reset-password",
    element: <PublicRoute><PasswordResetPage /></PublicRoute>,
  },
  // Marketing Pages (Public)
  {
    path: "/features",
    Component: FeaturesPage,
  },
  {
    path: "/pricing",
    Component: PricingPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
  {
    path: "/faq",
    Component: FAQPage,
  },
  // Property Listings (Public)
  {
    path: "/listings",
    Component: PropertyListingsRedesign,
  },
  // Public Search & Community (Public)
  {
    path: "/search",
    Component: PublicSearch,
  },
  {
    path: "/search/ai",
    Component: AISearch,
  },
  {
    path: "/roommates",
    Component: RoommateFinder,
  },
  {
    path: "/move-in",
    Component: MoveInCoordinator,
  },
  {
    path: "/neighbourhood-insights",
    Component: NeighbourhoodInsights,
  },
  {
    path: "/community",
    Component: BuildingCommunity,
  },
  // Accessibility & Multilingual (Public)
  {
    path: "/accessibility",
    Component: AccessibilityHub,
  },
  {
    path: "/multilingual",
    Component: MultilingualPlatform,
  },
  // Payment Demo (Public)
  {
    path: "/payment-demo",
    Component: PaymentDemo,
  },
  // Main App (Premium Design) - Protected Routes
  {
    path: "/app",
    element: <ProtectedRoute><LayoutPremium /></ProtectedRoute>,
    children: [
      { index: true, Component: DashboardPremium },
      { path: "dashboard-integrated", Component: DashboardIntegrated },
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
      { path: "contractor-marketplace", Component: ContractorMarketplace },
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
      { path: "notification-center", Component: NotificationCenter },
      { path: "messaging-center", Component: MessagingCenter },
      { path: "reports", Component: Reports },
      { path: "listing-syndication", Component: ListingSyndication },
      { path: "deposit-free", Component: DepositFree },
      { path: "vendors", Component: VendorMarketplace },
      { path: "rent-credit", Component: RentCreditBuilding },
      { path: "ltb-workflow", Component: LTBWorkflow },
      { path: "t776", Component: T776Report },
      { path: "compliance", Component: ComplianceCenter },
      { path: "income-verify", Component: IncomeVerification },
      { path: "insurance", Component: InsuranceMarketplace },
      { path: "smart-home", Component: SmartHomeHub },
      { path: "escrow", Component: MaintenanceEscrow },
      { path: "sustainability", Component: SustainabilityDashboard },
      { path: "investor", Component: InvestorHub },
      { path: "paralegal", Component: ParalegalMarketplace },
      { path: "list-property", Component: ListProperty },
      { path: "commercial", Component: CommercialPortfolio },
      { path: "vacancy-marketing", Component: VacancyMarketing },
      { path: "owner-portal", Component: OwnerPortal },
      { path: "inspection", Component: PropertyInspection },
    ],
  },
  // Tenant Onboarding (Public — invite flow, no auth required)
  {
    path: "/tenant-setup",
    Component: TenantOnboarding,
  },
  // Premium Tenant Portal (Protected) — nested under TenantLayout
  {
    path: "/tenant",
    element: <ProtectedRoute><TenantLayout /></ProtectedRoute>,
    children: [
      { index: true, Component: TenantPortalPremium },
      { path: "payments", Component: TenantPayments },
      { path: "documents", Component: TenantDocuments },
      { path: "maintenance", Component: TenantMaintenance },
      { path: "applications", Component: TenantApplications },
      { path: "lease-signing", Component: TenantLeaseSigning },
      { path: "receipts", Component: TenantReceipts },
      { path: "checklist", Component: TenantChecklist },
      { path: "notices", Component: TenantNotices },
      { path: "renewal", Component: TenantLeaseRenewal },
      { path: "dispute", Component: TenantDispute },
      { path: "profile", Component: TenantProfile },
    ],
  },
  // AI Features Demo
  {
    path: "/ai-demo",
    Component: AIFeaturesDemo,
  },
  // Legacy routes
  {
    path: "/property-listings-redesign",
    Component: PropertyListingsRedesign,
  },
]);