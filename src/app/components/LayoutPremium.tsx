import { NavLink, Outlet, useNavigate, useLocation } from "react-router";
import { Building2, Menu, X, Bell, MessageSquare } from "lucide-react";
import { NavigationMenu } from "./NavigationMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TrialBanner } from "./TrialBanner";
import { GlobalAIAssistant } from "./GlobalAIAssistant";
import { AICommandPalette } from "./AICommandPalette";
import { AIFeatureAnnouncement } from "./AIFeatureAnnouncement";
import { useState } from "react";

export function LayoutPremium() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get page context for AI assistant
  const getPageContext = () => {
    const path = location.pathname;
    if (path.includes('applications')) return 'Tenant Applications';
    if (path.includes('properties')) return 'Properties Management';
    if (path.includes('ltb-forms')) return 'LTB Forms & Notices';
    if (path.includes('tenants')) return 'Tenant Management';
    if (path.includes('payments') || path.includes('financial')) return 'Payments & Financial';
    if (path.includes('maintenance')) return 'Maintenance Requests';
    if (path.includes('analytics') || path.includes('reports')) return 'Analytics & Reports';
    if (path.includes('ai-assistant')) return 'AI Assistant';
    if (path === '/app') return 'Dashboard';
    return 'KAYA Platform';
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      {/* Global AI Components - Always available */}
      <GlobalAIAssistant 
        pageContext={getPageContext()}
        userContext="Premium landlord platform user"
        userId="demo-landlord"
      />
      <AICommandPalette userId="demo-landlord" />
      <AIFeatureAnnouncement />

      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden size-12 rounded-xl bg-[#0E0F0C] flex items-center justify-center shadow-lg hover:bg-[#0E0F0C]/90 transition-colors"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? (
          <X className="size-6 text-white" strokeWidth={2.5} />
        ) : (
          <Menu className="size-6 text-white" strokeWidth={2.5} />
        )}
      </button>

      {/* Backdrop - Only visible on mobile when menu is open */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Premium Minimal Sidebar */}
      <aside className={`
        w-72 sm:w-80 lg:w-64 border-r border-[rgba(0,0,0,0.07)] bg-white flex flex-col
        lg:relative lg:translate-x-0
        fixed inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="px-4 sm:px-6 py-6 sm:py-8 border-b border-[rgba(0,0,0,0.07)]">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}
          >
            <div className="size-10 sm:size-12 rounded-xl bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
              <Building2 className="size-5 sm:size-6 text-white relative z-10" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-normal text-[#0E0F0C] tracking-tight" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Kaya<span className="text-[#0A7A52]">.</span>
              </h2>
              <p className="text-[10px] sm:text-[11px] text-[#767570] font-medium uppercase tracking-wider" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>Property Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation - Using new NavigationMenu */}
        <div className="flex-1 overflow-y-auto">
          <NavigationMenu basePath="/app" onNavigate={() => setMobileMenuOpen(false)} />
        </div>

        {/* User Profile */}
        <div className="px-3 sm:px-4 py-4 sm:py-6 border-t border-[rgba(0,0,0,0.07)]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7F4] transition-colors cursor-pointer">
            <div className="size-9 sm:size-10 rounded-full bg-gradient-to-br from-[#0A7A52] to-[#085D3D] flex items-center justify-center text-white font-semibold text-[13px] sm:text-[14px]">
              JM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] sm:text-[14px] font-semibold text-[#0E0F0C] truncate">Justin Mafie</p>
              <p className="text-[11px] sm:text-[12px] text-[#767570] truncate">justin@kaya.ca</p>
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="px-3 sm:px-4 py-4 sm:py-6 border-t border-[rgba(0,0,0,0.07)]">
          <LanguageSwitcher />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto lg:ml-0 pt-16 lg:pt-0">
        <TrialBanner />
        <Outlet />
      </main>
    </div>
  );
}