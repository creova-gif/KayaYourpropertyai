import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  Users, 
  CreditCard, 
  Settings as SettingsIcon,
  Menu,
  X,
  MessageSquare,
  Wrench,
  FolderOpen,
  BarChart3,
  Mic
} from "lucide-react";
import { useState } from "react";
import { AIAssistant } from "./AIAssistant";
import { RoleSwitcher } from "./RoleSwitcher";
import { VoiceCommandPanel } from "./VoiceCommandPanel";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/colorful", icon: LayoutDashboard },
    { name: "Applications", href: "/colorful/applications", icon: FileText },
    { name: "Properties", href: "/colorful/properties", icon: Building2 },
    { name: "Tenants", href: "/colorful/tenants", icon: Users },
    { name: "Payments", href: "/colorful/payments", icon: CreditCard },
    { name: "Maintenance", href: "/colorful/maintenance", icon: Wrench },
    { name: "Documents", href: "/colorful/documents", icon: FolderOpen },
    { name: "Messages", href: "/colorful/messages", icon: MessageSquare },
    { name: "Analytics", href: "/colorful/analytics", icon: BarChart3 },
    { name: "Settings", href: "/colorful/settings", icon: SettingsIcon },
  ];

  const isActive = (path: string) => {
    if (path === "/colorful") {
      return location.pathname === "/colorful";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 hidden lg:block">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <Building2 className="size-8 text-indigo-600" />
            <span className="ml-3 text-xl font-semibold text-slate-900">LandlordOS</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="size-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* AI Assistant Button */}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={() => setVoiceOpen(true)}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-200 mb-3"
            >
              <Mic className="size-5 mr-2" />
              Voice AI
            </button>
            <button
              onClick={() => setAssistantOpen(true)}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
            >
              <MessageSquare className="size-5 mr-2" />
              AI Chat
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Building2 className="size-7 text-indigo-600" />
            <span className="ml-2 text-lg font-semibold text-slate-900">LandlordOS</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-white pt-16">
          <nav className="px-4 py-6 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="size-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 mt-4">
            <button
              onClick={() => {
                setVoiceOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium mb-3"
            >
              <Mic className="size-5 mr-2" />
              Voice AI
            </button>
            <button
              onClick={() => {
                setAssistantOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium"
            >
              <MessageSquare className="size-5 mr-2" />
              AI Chat
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <Outlet />
      </main>

      {/* AI Assistant Panel */}
      <AIAssistant isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />
      
      {/* Voice Command Panel */}
      <VoiceCommandPanel isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
      
      {/* Role Switcher */}
      <RoleSwitcher />
    </div>
  );
}