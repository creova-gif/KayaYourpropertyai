import { NavLink, Outlet } from "react-router";
import { Building2, Menu, X } from "lucide-react";
import { NavigationMenu } from "./NavigationMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState } from "react";

export function LayoutPremium() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden size-12 rounded-xl bg-[#0A0A0A] flex items-center justify-center shadow-lg hover:bg-[#1C1C1C] transition-colors"
      >
        {mobileMenuOpen ? (
          <X className="size-6 text-white" />
        ) : (
          <Menu className="size-6 text-white" />
        )}
      </button>

      {/* Backdrop - Only visible on mobile when menu is open */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Premium Minimal Sidebar */}
      <aside className={`
        w-64 border-r border-black/[0.08] bg-white flex flex-col
        lg:relative lg:translate-x-0
        fixed inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="px-6 py-8 border-b border-black/[0.08]">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
              <Building2 className="size-6 text-white relative z-10" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#0A0A0A] tracking-tight">KAYA</h2>
              <p className="text-[11px] text-[#6B7280] font-medium">Canadian Property Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation - Using new NavigationMenu */}
        <div className="flex-1 overflow-y-auto">
          <NavigationMenu basePath="/" />
        </div>

        {/* User Profile */}
        <div className="px-4 py-6 border-t border-black/[0.08]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F5F5F5] transition-colors cursor-pointer">
            <div className="size-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-semibold text-[14px]">
              JM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#0A0A0A] truncate">Justin Mafie</p>
              <p className="text-[12px] text-[#9CA3AF] truncate">justin@kaya.ca</p>
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="px-4 py-6 border-t border-black/[0.08]">
          <LanguageSwitcher />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto lg:ml-0">
        <Outlet />
      </main>
    </div>
  );
}