import { RouterProvider } from 'react-router';
import { router } from './routes';
import { InstantFeedback } from './components/InstantFeedback';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { TrialProvider } from './contexts/TrialContext';
import { MarketplaceAPI } from './services/backend.service';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { LiveChatWidget } from './components/LiveChatWidget';
import { TrialUpgradeModal } from './components/TrialUpgradeModal';

// Expose API to browser console for easy testing
if (typeof window !== 'undefined') {
  (window as any).MarketplaceAPI = MarketplaceAPI;
  console.log('✅ KAYA API ready! Try: window.MarketplaceAPI.getDashboardOverview()');
}

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>KAYA - AI-Powered Property Management for Ontario Landlords</title>
        <meta 
          name="description" 
          content="Screen tenants in 5 minutes, collect rent automatically, and generate LTB-compliant forms. Canada's only bilingual landlord platform trusted by 500+ Ontario property managers." 
        />
        <meta 
          name="keywords" 
          content="Ontario landlord software, tenant screening Canada, LTB forms, property management Ontario, rent collection, AI tenant screening, bilingual property management, Ontario RTA compliance, HST GST tracker, landlord platform" 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KAYA - AI-Powered Property Management for Ontario" />
        <meta 
          property="og:description" 
          content="Screen tenants, collect rent, stay LTB-compliant. Trusted by 500+ Ontario landlords. Try free for 14 days." 
        />
        <meta property="og:site_name" content="KAYA" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KAYA - Property Management for Ontario Landlords" />
        <meta 
          name="twitter:description" 
          content="AI-powered tenant screening, automated rent collection, LTB-compliant forms. Canada's only bilingual landlord platform." 
        />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, French" />
        <meta name="author" content="KAYA - Creova" />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Ontario, Canada" />
        
        {/* Canonical URL (will be set by individual pages) */}
        <link rel="canonical" href="https://kaya.creova.one" />
      </Helmet>
      
      <AuthProvider>
        <LanguageProvider>
          <NotificationProvider>
            <TrialProvider>
              <RouterProvider router={router} />
              <InstantFeedback />
              <LiveChatWidget />
              <Toaster 
                position="top-right"
                expand={true}
                richColors
                closeButton
              />
              <TrialUpgradeModal />
            </TrialProvider>
          </NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}